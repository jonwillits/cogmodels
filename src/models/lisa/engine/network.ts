/**
 * The LISA network: structure units (P, SP, predicate, object) grouped into
 * analogs, over two shared pools of semantic units (spec §5).
 *
 * Topology lives in small per-unit arrays; the hot per-iteration state lives
 * in typed arrays in `LisaSim`, indexed by unit id. Self-supervised learning
 * adds units during a run, so every structural change goes through `addUnit`.
 */
import type { Scenario } from '../input/schema'

export const P = 0
export const SP = 1
export const PRED = 2
export const OBJ = 3
export type UnitType = 0 | 1 | 2 | 3
export const TYPE_NAMES = ['P', 'SP', 'Pred', 'Obj'] as const

export interface Unit {
  id: number
  type: UnitType
  analog: number
  name: string
  importance: number
  inferred: boolean
  // P units
  /** SPs below (this proposition's role bindings). */
  sps: number[]
  /** SPs above (SPs that take this proposition as their argument). */
  parentSPs: number[]
  supports: { to: number; w: number }[]
  // SP units (-1 when absent)
  parent: number
  pred: number
  obj: number
  child: number
  // predicate and object units
  /** SPs above (the SPs this unit serves). */
  spsAbove: number[]
  /** Indices into the unit's semantic pool, with weights. */
  sem: number[]
  semW: number[]
}

export interface AnalogInfo {
  index: number
  name: string
  units: number[]
  p: number[]
  sp: number[]
  pred: number[]
  obj: number[]
}

export class Network {
  units: Unit[] = []
  analogs: AnalogInfo[] = []
  predSem: string[] = []
  objSem: string[] = []
  private predSemIndex = new Map<string, number>()
  private objSemIndex = new Map<string, number>()
  /** Length of each predicate/object unit's semantic weight vector (for the cosine rule). */
  weightLength: number[] = []
  /** 1 + Σ|w| over each unit's semantics (for the Weber rule). */
  weberSum: number[] = []

  addAnalog(name: string): AnalogInfo {
    const a: AnalogInfo = { index: this.analogs.length, name, units: [], p: [], sp: [], pred: [], obj: [] }
    this.analogs.push(a)
    return a
  }

  addUnit(type: UnitType, analog: number, name: string, importance = 1, inferred = false): Unit {
    const u: Unit = {
      id: this.units.length,
      type,
      analog,
      name,
      importance,
      inferred,
      sps: [],
      parentSPs: [],
      supports: [],
      parent: -1,
      pred: -1,
      obj: -1,
      child: -1,
      spsAbove: [],
      sem: [],
      semW: [],
    }
    this.units.push(u)
    this.weightLength.push(0)
    this.weberSum.push(1)
    const a = this.analogs[analog]
    a.units.push(u.id)
    ;[a.p, a.sp, a.pred, a.obj][type].push(u.id)
    return u
  }

  semanticIndex(pool: 'pred' | 'obj', name: string): number {
    const idx = pool === 'pred' ? this.predSemIndex : this.objSemIndex
    const list = pool === 'pred' ? this.predSem : this.objSem
    let i = idx.get(name)
    if (i === undefined) {
      i = list.length
      list.push(name)
      idx.set(name, i)
    }
    return i
  }

  /** Attach a semantic to a predicate or object unit (or update its weight). */
  linkSemantic(unitId: number, semIndex: number, weight: number): void {
    const u = this.units[unitId]
    const k = u.sem.indexOf(semIndex)
    if (k >= 0) u.semW[k] = weight
    else {
      u.sem.push(semIndex)
      u.semW.push(weight)
    }
    this.updateSemanticStats(unitId)
  }

  updateSemanticStats(unitId: number): void {
    const u = this.units[unitId]
    let sq = 0
    let abs = 0
    for (const w of u.semW) {
      sq += w * w
      abs += Math.abs(w)
    }
    this.weightLength[unitId] = Math.sqrt(sq)
    this.weberSum[unitId] = 1 + abs
  }

  poolOf(type: UnitType): 'pred' | 'obj' {
    return type === PRED ? 'pred' : 'obj'
  }

  findUnit(analog: number, name: string, type?: UnitType): Unit | undefined {
    for (const id of this.analogs[analog].units) {
      const u = this.units[id]
      if (u.name === name && (type === undefined || u.type === type)) return u
    }
    return undefined
  }
}

/** Build a network from a parsed scenario. Names are already upper-cased by the parser. */
export function buildNetwork(scenario: Scenario): Network {
  const net = new Network()
  for (const def of scenario.analogs) {
    const analog = net.addAnalog(def.name)
    const ai = analog.index

    // Predicates: one unit per role, named NAME1, NAME2, …
    for (const pred of def.preds) {
      pred.roles.forEach((role, i) => {
        const u = net.addUnit(PRED, ai, pred.name + (i + 1), pred.importance ?? 1)
        for (const s of role) net.linkSemantic(u.id, net.semanticIndex('pred', s.name), s.weight)
      })
    }

    for (const obj of def.objs) {
      const u = net.addUnit(OBJ, ai, obj.name)
      for (const s of obj.semantics) net.linkSemantic(u.id, net.semanticIndex('obj', s.name), s.weight)
    }

    // Propositions are created first so that a proposition can take a later one as an argument.
    for (const prop of def.props) net.addUnit(P, ai, prop.name, prop.importance ?? 1)

    for (const prop of def.props) {
      const p = net.findUnit(ai, prop.name, P)!
      prop.args.forEach((arg, i) => {
        const roleName = prop.pred + (i + 1)
        const pred = net.findUnit(ai, roleName, PRED)
        if (!pred) throw new Error(`analog ${def.name}: ${prop.name} needs predicate role ${roleName}`)
        const sp = net.addUnit(SP, ai, 'S' + prop.name + '.' + (i + 1))
        sp.parent = p.id
        p.sps.push(sp.id)
        sp.pred = pred.id
        pred.spsAbove.push(sp.id)
        const obj = net.findUnit(ai, arg, OBJ)
        if (obj) {
          sp.obj = obj.id
          obj.spsAbove.push(sp.id)
        } else {
          const child = net.findUnit(ai, arg, P)
          if (!child) throw new Error(`analog ${def.name}: ${prop.name}: "${arg}" is neither an object nor a proposition`)
          sp.child = child.id
          child.parentSPs.push(sp.id)
        }
      })
    }

    for (const sup of def.supports) {
      const from = net.findUnit(ai, sup.from, P)
      const to = net.findUnit(ai, sup.to, P)
      if (from && to) from.supports.push({ to: to.id, w: sup.weight })
    }
  }
  return net
}
