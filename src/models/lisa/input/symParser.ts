/**
 * Parser for Hummel's `.sym` scenario format (spec §9.1; grammar from
 * `build.py` and LISA_Instructions.pdf pp. 9–19).
 *
 * The format is whitespace-tokenized. `{` starts a comment that runs to the
 * end of the line. Everything except `Note:` text and analog names is
 * case-insensitive. Hummel's parser crashes silently on malformed input; this
 * one returns line-numbered errors and keeps going where it can.
 */
import type {
  AnalogDef,
  ObjDef,
  ParseMessage,
  ParseResult,
  PhaseSetDef,
  PredDef,
  PropDef,
  Scenario,
  ScenarioParameters,
  SemanticRef,
  SslMode,
} from './schema'

interface Tok {
  text: string
  up: string
  line: number
}

/** Tokenize, dropping comments. `Note:` lines are kept whole as one token pair. */
function tokenize(src: string): { toks: Tok[]; notes: { line: number; text: string }[] } {
  const toks: Tok[] = []
  const notes: { line: number; text: string }[] = []
  const lines = src.split(/\r?\n/)
  lines.forEach((raw, i) => {
    const line = i + 1
    const trimmed = raw.trim()
    if (/^note:/i.test(trimmed)) {
      notes.push({ line, text: trimmed.replace(/^note:\s*/i, '') })
      toks.push({ text: 'NOTE:', up: 'NOTE:', line })
      return
    }
    for (const w of trimmed.split(/\s+/)) {
      if (w === '') continue
      if (w.startsWith('{')) break
      toks.push({ text: w, up: w.toUpperCase(), line })
    }
  })
  return { toks, notes }
}

class Reader {
  i = 0
  readonly toks: Tok[]
  readonly errors: ParseMessage[]
  readonly warnings: ParseMessage[]
  constructor(toks: Tok[], errors: ParseMessage[], warnings: ParseMessage[]) {
    this.toks = toks
    this.errors = errors
    this.warnings = warnings
  }
  get done(): boolean {
    return this.i >= this.toks.length
  }
  peek(): Tok | undefined {
    return this.toks[this.i]
  }
  next(): Tok | undefined {
    return this.toks[this.i++]
  }
  lastLine(): number {
    return this.toks[Math.min(this.i, this.toks.length) - 1]?.line ?? 1
  }
  error(line: number, message: string): void {
    this.errors.push({ line, message })
  }
  warn(line: number, message: string): void {
    this.warnings.push({ line, message })
  }
  /** Skip tokens until one of `ends` (consumed) or EOF. */
  skipTo(...ends: string[]): void {
    while (!this.done) {
      const t = this.next()!
      if (ends.includes(t.up)) return
    }
  }
}

const isEnd = (up: string) => up === 'END' || up === 'END;'
const isDone = (up: string) => up === 'DONE' || up === 'DONE;' || up === 'DONE.'
const isNumber = (s: string) => /^-?\d+(\.\d+)?$/.test(s)

function semantic(tok: Tok): SemanticRef {
  if (tok.up.startsWith('-') && tok.up.length > 1) return { name: tok.up.slice(1), weight: -1 }
  return { name: tok.up, weight: 1 }
}

function parseParameters(r: Reader, params: ScenarioParameters): void {
  const numeric = (t: Tok, key: keyof ScenarioParameters, name: string) => {
    const v = r.next()
    if (!v || !isNumber(v.text)) {
      r.error(t.line, `${name} needs a number`)
      return
    }
    ;(params as Record<string, unknown>)[key] = parseFloat(v.text)
  }
  const boolean = (t: Tok, name: string): boolean | undefined => {
    const v = r.next()
    if (!v || (v.up !== 'TRUE' && v.up !== 'FALSE')) {
      r.error(t.line, `${name} needs True or False`)
      return undefined
    }
    return v.up === 'TRUE'
  }
  while (!r.done) {
    const t = r.next()!
    if (isDone(t.up)) return
    switch (t.up) {
      case 'UNLIMITEDWM': {
        const b = boolean(t, 'UnlimitedWM')
        if (b !== undefined) params.wmMode = b ? 'unlimited' : 'normal'
        break
      }
      case 'SEMANTICNOISE':
        numeric(t, 'semanticNoise', 'SemanticNoise')
        break
      case 'SEMANTICDEATH':
        numeric(t, 'semanticDeath', 'SemanticDeath')
        break
      case 'ATTENTION':
        numeric(t, 'attention', 'Attention')
        break
      case 'DRIVERINHIBITION':
        numeric(t, 'driverInhibition', 'DriverInhibition')
        break
      case 'RECIPINHIBITION':
        numeric(t, 'recipInhibition', 'RecipInhibition')
        break
      case 'HEBBLEARNINGRATE':
        numeric(t, 'mappingLearningRate', 'HebbLearningRate')
        break
      case 'MAPPINGALGORITHM': {
        const v = r.next()
        if (v?.up === 'H&H9703') params.mappingAlgorithm = 'hh2003'
        else if (v?.up === 'VERS142') params.mappingAlgorithm = 'vers142'
        else r.error(t.line, 'MappingAlgorithm must be H&H9703 or Vers142')
        break
      }
      case 'BAILUPONSETTLING':
        boolean(t, 'BailUponSettling')
        r.warn(t.line, 'BailUponSettling is not supported and is ignored')
        break
      case 'WITHINGROUPSUPPORT':
        r.next()
        r.warn(t.line, 'WithinGroupSupport concerns groups, which are not supported; ignored')
        break
      case 'SAVEGROUPHEBBS':
      case 'SAVEPROPHEBBS':
      case 'SAVESPHEBBS':
      case 'SAVEOPHEBBS':
        r.next()
        break
      default:
        r.error(t.line, `"${t.text}" is not a parameter name`)
    }
  }
  r.error(r.lastLine(), 'Parameters block is missing its Done')
}

function parsePreds(r: Reader, analog: AnalogDef): void {
  while (!r.done) {
    const nameTok = r.next()!
    if (isEnd(nameTok.up)) return
    if (nameTok.up === ';') continue
    const word2 = r.next()
    if (!word2) break
    const pred: PredDef = { name: nameTok.up, roles: [], line: nameTok.line }
    if (/^\d+$/.test(word2.text) && word2.text !== '0') {
      // Auto-coded: `Loves 2 f1 f2 ;` → LOVES1 gets F11 F21, LOVES2 gets F12 F22.
      const n = parseInt(word2.text, 10)
      for (let i = 0; i < n; i++) pred.roles.push([])
      for (;;) {
        const t = r.next()
        if (!t) {
          r.error(nameTok.line, `predicate ${pred.name} is missing its ;`)
          break
        }
        if (t.up === ';') break
        if (isEnd(t.up)) {
          r.error(t.line, `predicate ${pred.name} is missing its ; before End`)
          r.i--
          break
        }
        const sem = semantic(t)
        for (let i = 0; i < n; i++) pred.roles[i].push({ name: sem.name + (i + 1), weight: sem.weight })
      }
    } else if (word2.up === '[' || word2.text === '0') {
      // Hand-coded: `f [ a b ] [ c d ] 2 ;`
      let open = word2.up === '['
      if (open) pred.roles.push([])
      for (;;) {
        const t = r.next()
        if (!t) {
          r.error(nameTok.line, `predicate ${pred.name} is missing its ;`)
          break
        }
        if (t.up === ';') break
        if (isEnd(t.up)) {
          r.error(t.line, `predicate ${pred.name} is missing its ; before End`)
          r.i--
          break
        }
        if (t.up === '[') {
          open = true
          pred.roles.push([])
        } else if (t.up === ']') {
          open = false
        } else if (t.text.startsWith('=')) {
          const w = parseFloat(t.text.slice(1))
          const role = pred.roles[pred.roles.length - 1]
          if (Number.isNaN(w) || Math.abs(w) > 1) r.error(t.line, `bad semantic weight ${t.text}`)
          else if (!role || role.length === 0) r.error(t.line, `weight ${t.text} has no semantic before it`)
          else role[role.length - 1].weight = w
        } else if (!open && isNumber(t.text)) {
          pred.importance = parseFloat(t.text)
        } else if (open) {
          pred.roles[pred.roles.length - 1].push(semantic(t))
        } else {
          r.error(t.line, `unexpected "${t.text}" in predicate ${pred.name}`)
        }
      }
      if (pred.roles.length === 0) r.error(nameTok.line, `predicate ${pred.name} has no roles`)
    } else {
      r.error(nameTok.line, `predicate ${pred.name}: expected a role count or "[", got "${word2.text}"`)
      r.skipTo(';')
      continue
    }
    analog.preds.push(pred)
  }
  r.error(r.lastLine(), 'DefPreds is missing its End')
}

function parseObjs(r: Reader, analog: AnalogDef): void {
  let cur: ObjDef | null = null
  while (!r.done) {
    const t = r.next()!
    if (isEnd(t.up)) return
    if (t.up === ';') {
      cur = null
      continue
    }
    if (t.text.startsWith('=')) {
      const w = parseFloat(t.text.slice(1))
      if (Number.isNaN(w) || Math.abs(w) > 1) r.error(t.line, `bad semantic weight ${t.text}`)
      else if (!cur || cur.semantics.length === 0) r.error(t.line, `weight ${t.text} has no semantic before it`)
      else cur.semantics[cur.semantics.length - 1].weight = w
      continue
    }
    if (cur === null) {
      cur = { name: t.up, semantics: [], line: t.line }
      analog.objs.push(cur)
    } else {
      cur.semantics.push(semantic(t))
    }
  }
  r.error(r.lastLine(), 'DefObjs is missing its End')
}

function parseSupport(r: Reader, analog: AnalogDef): void {
  let p1: string | null = null
  let p2: string | null = null
  let dir: '->' | '<-' | '<->' | null = null
  while (!r.done) {
    const t = r.next()!
    if (isEnd(t.up)) return
    if (t.up === '-->' || t.up === '->') dir = '->'
    else if (t.up === '<--' || t.up === '<-') dir = '<-'
    else if (t.up === '<-->' || t.up === '<->') dir = '<->'
    else if (isNumber(t.text) && p1 && p2) {
      const w = parseFloat(t.text)
      if (dir === '->' || dir === '<->') analog.supports.push({ from: p1, to: p2, weight: w })
      if (dir === '<-' || dir === '<->') analog.supports.push({ from: p2, to: p1, weight: w })
      if (!dir) r.error(t.line, 'support relation has no arrow')
      p1 = p2 = null
      dir = null
    } else if (p1 === null) p1 = t.up
    else if (p2 === null) p2 = t.up
    else r.error(t.line, `unexpected "${t.text}" in Support block`)
  }
  r.error(r.lastLine(), 'Support block is missing its End')
}

function parseProps(r: Reader, analog: AnalogDef): void {
  while (!r.done) {
    const nameTok = r.next()!
    if (isEnd(nameTok.up)) return
    if (nameTok.up === 'SUPPORT:') {
      parseSupport(r, analog)
      continue
    }
    if (nameTok.up === ';') continue
    const predTok = r.next()
    if (!predTok) break
    const prop: PropDef = { name: nameTok.up, pred: predTok.up, args: [], line: nameTok.line }
    let open = false
    let closed = false
    for (;;) {
      const t = r.next()
      if (!t) {
        r.error(nameTok.line, `proposition ${prop.name} is missing its ;`)
        break
      }
      if (t.up === ';') break
      if (isEnd(t.up)) {
        r.error(t.line, `proposition ${prop.name} is missing its ; before End`)
        r.i--
        break
      }
      if (t.up === '(') open = true
      else if (t.up === ')') {
        open = false
        closed = true
      } else if (open) prop.args.push(t.up)
      else if (closed) {
        if (isNumber(t.text)) prop.importance = parseFloat(t.text)
        else r.error(t.line, `expected an importance after ")" in ${prop.name}, got "${t.text}"`)
      } else r.error(t.line, `unexpected "${t.text}" in proposition ${prop.name}`)
    }
    if (!closed) r.error(nameTok.line, `proposition ${prop.name} has no ( arguments )`)
    analog.props.push(prop)
  }
  r.error(r.lastLine(), 'DefProps is missing its End')
}

function parseAnalog(r: Reader, first: Tok): AnalogDef {
  // The name is the rest of the `Analog` line; Hummel takes the second word.
  const nameTok = r.peek()
  let name = ''
  if (nameTok && nameTok.line === first.line && !['DEFPREDS', 'DEFOBJS', 'DEFPROPS', 'DEFGROUPS', 'NOTE:'].includes(nameTok.up) && !isDone(nameTok.up)) {
    name = nameTok.text
    r.next()
  }
  const analog: AnalogDef = { name, preds: [], objs: [], props: [], supports: [] }
  while (!r.done) {
    const t = r.next()!
    if (isDone(t.up)) return analog
    switch (t.up) {
      case 'NOTE:':
        break
      case 'DEFPREDS':
        parsePreds(r, analog)
        break
      case 'DEFOBJS':
        parseObjs(r, analog)
        break
      case 'DEFPROPS':
        parseProps(r, analog)
        break
      case 'DEFGROUPS':
        r.warn(t.line, `DefGroups in analog "${name}" is not supported; the groups are ignored`)
        r.skipTo('END', 'END;')
        break
      case ';':
        break
      default:
        r.error(t.line, `unknown command "${t.text}" in analog "${name}"`)
    }
  }
  r.error(first.line, `analog "${name}" is missing its done`)
  return analog
}

function parseSequence(r: Reader, scenario: Scenario): void {
  let driver: number | null = null
  let recips: number[] = []
  let ssl: SslMode = 'off'
  let sim = false
  let current: PhaseSetDef | null = null
  const analogCount = scenario.analogs.length
  const propNames = (i: number) => new Set(scenario.analogs[i]?.props.map((p) => p.name) ?? [])

  const newPhaseSet = (line: number): PhaseSetDef | null => {
    if (driver === null) {
      r.error(line, 'Order given before Driver=[ ]')
      return null
    }
    const ps: PhaseSetDef = { driver, recips: [...recips], ssl, updateMapping: false, computeSimilarity: sim, line }
    scenario.sequence.push(ps)
    return ps
  }

  const readList = (t: Tok, what: string): number[] => {
    const out: number[] = []
    for (;;) {
      const v = r.next()
      if (!v) {
        r.error(t.line, `${what} is missing its ]`)
        return out
      }
      if (v.up === ']') return out
      if (!/^\d+$/.test(v.text)) {
        r.error(v.line, `${what} expects analog indices, got "${v.text}"`)
        continue
      }
      const idx = parseInt(v.text, 10)
      if (idx >= analogCount) r.error(v.line, `${what}: there is no analog ${idx} (the file defines ${analogCount})`)
      else out.push(idx)
    }
  }

  while (!r.done) {
    const t = r.next()!
    if (isDone(t.up)) return
    switch (t.up) {
      case 'DRIVER=[': {
        const list = readList(t, 'Driver=[')
        if (list.length !== 1) r.error(t.line, 'Driver=[ ] must name exactly one analog')
        else driver = list[0]
        current = null
        break
      }
      case 'RECIP=[':
        recips = readList(t, 'Recip=[')
        current = null
        break
      case 'SSL_ON':
        ssl = 'on'
        break
      case 'SSL_OFF':
        ssl = 'off'
        break
      case 'SSL_OK':
        ssl = 'auto'
        break
      case 'SIM_ON':
        sim = true
        r.warn(t.line, 'SIM_ON: similarity measures are not supported; ignored')
        if (current) current.computeSimilarity = true
        break
      case 'SIM_OFF':
        sim = false
        if (current) current.computeSimilarity = false
        break
      case 'ORDER=[': {
        for (;;) {
          const v = r.next()
          if (!v) {
            r.error(t.line, 'Order=[ is missing its ]')
            break
          }
          if (v.up === ']') break
          if (v.up === 'H') {
            if (current) {
              current.updateMapping = true
              current = null
            } else r.error(v.line, '"h" with no phase set before it')
          } else if (v.up === 'R') {
            const open = r.next()
            const n = r.next()
            const p = r.next()
            const close = r.next()
            if (open?.up !== '(' || close?.up !== ')' || !n || !p || !/^\d+$/.test(n.text) || !/^\d+$/.test(p.text)) {
              r.error(v.line, 'random firing must be written R ( n p )')
            } else {
              for (let k = 0; k < parseInt(n.text, 10); k++) {
                const ps = newPhaseSet(v.line)
                if (ps) {
                  ps.random = parseInt(p.text, 10)
                  ps.updateMapping = true
                }
              }
              current = null
            }
          } else if (v.up.startsWith('G') || v.up.startsWith('C')) {
            r.warn(v.line, `group-based firing "${v.text} ( n p )" is not supported; skipped`)
            r.skipTo(')')
            current = null
          } else {
            // A proposition name in the driver.
            if (driver === null) {
              r.error(v.line, 'Order given before Driver=[ ]')
              continue
            }
            if (!propNames(driver).has(v.up)) {
              r.error(v.line, `"${v.text}" is not a proposition in analog ${driver} ("${scenario.analogs[driver]?.name}")`)
              continue
            }
            if (!current) current = newPhaseSet(v.line)
            if (current) (current.props ??= []).push(v.up)
          }
        }
        break
      }
      default:
        r.error(t.line, `unknown command "${t.text}" in Sequence`)
    }
  }
  r.error(r.lastLine(), 'Sequence is missing its Done')
}

export function parseSym(src: string): ParseResult {
  const { toks, notes } = tokenize(src)
  const errors: ParseMessage[] = []
  const warnings: ParseMessage[] = []
  const r = new Reader(toks, errors, warnings)
  const scenario: Scenario = { notes: notes.map((n) => n.text), parameters: {}, analogs: [], sequence: [] }

  while (!r.done) {
    const t = r.next()!
    switch (t.up) {
      case 'NOTE:':
        break
      case 'PARAMETERS':
        parseParameters(r, scenario.parameters)
        break
      case 'ANALOG':
        scenario.analogs.push(parseAnalog(r, t))
        break
      case 'SEQUENCE':
        parseSequence(r, scenario)
        break
      case ';':
        break
      default:
        r.error(t.line, `unknown command "${t.text}" at the top level (expected Note:, Parameters, Analog or Sequence)`)
    }
  }

  // Semantic checks the builder would otherwise trip over.
  scenario.analogs.forEach((a, ai) => {
    const preds = new Map(a.preds.map((p) => [p.name, p]))
    const objs = new Set(a.objs.map((o) => o.name))
    const props = new Set(a.props.map((p) => p.name))
    for (const p of a.props) {
      const pred = preds.get(p.pred)
      if (!pred) errors.push({ line: p.line, message: `${p.name}: predicate "${p.pred}" is not defined in analog ${ai}` })
      else if (pred.roles.length < p.args.length)
        errors.push({ line: p.line, message: `${p.name}: ${p.pred} has ${pred.roles.length} roles but ${p.args.length} arguments were given` })
      for (const arg of p.args) {
        if (!objs.has(arg) && !props.has(arg))
          errors.push({ line: p.line, message: `${p.name}: "${arg}" is neither an object nor a proposition in analog ${ai}` })
        if (arg === p.name) errors.push({ line: p.line, message: `${p.name} takes itself as an argument` })
      }
    }
    for (const sup of a.supports) {
      if (!props.has(sup.from) || !props.has(sup.to))
        errors.push({ line: 0, message: `support ${sup.from} -> ${sup.to}: unknown proposition in analog ${ai}` })
    }
  })
  if (scenario.sequence.length === 0 && errors.length === 0)
    errors.push({ line: r.lastLine(), message: 'the file has no Sequence, so there is nothing to run' })

  errors.sort((x, y) => x.line - y.line)
  return { scenario, errors, warnings }
}

/** Convenience: throw on the first error. */
export function parseSymOrThrow(src: string): Scenario {
  const res = parseSym(src)
  if (res.errors.length) {
    const e = res.errors[0]
    throw new Error(`.sym parse error, line ${e.line}: ${e.message}`)
  }
  return res.scenario
}

