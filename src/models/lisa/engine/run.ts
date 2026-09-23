/**
 * A LISA run: a scenario executed under a configuration from a seed
 * (spec §6). `step()` advances one iteration and handles phase-set
 * boundaries, so the UI can drive it from an animation frame and the tests
 * can run it headless.
 */
import { makeRng, type Rng } from '../../random'
import type { Scenario } from '../input/schema'
import type { LisaConfig } from './config'
import { updateNetwork } from './dynamics'
import { randomPropSelect, spreadSupportToRecipients, updatePriorities } from './firing'
import { mappingQuality, updateWeightsHH2003, updateWeightsVers142 } from './mapping'
import { buildNetwork, P, TYPE_NAMES, type Network, type UnitType } from './network'
import { LisaSim, type PhaseSet } from './sim'

export interface MappingEntry {
  from: string
  to: string
  weight: number
}

export interface PhaseSetRecord {
  index: number
  driver: string
  recips: string[]
  props: string[]
  updateMapping: boolean
  /** Iteration (within the phase set) at which topDownOK first became true, or -1. */
  topDownAt: number
  /** Hummel's times_fired counter per SP (it counts fast-growth iterations, about five per firing). */
  timesFired: Record<string, number>
  /** Firings per phase-set SP: rising edges of activation through 0.5. */
  firings: Record<string, number>
  /** Vers142 settling rounds, when that algorithm ran. */
  settleRounds?: number
  mappingQuality?: Record<string, number>
}

export interface RunOptions {
  /** Called when a scenario uses something the engine does not support yet. */
  onWarning?: (message: string) => void
}

export class LisaRun {
  readonly net: Network
  readonly sim: LisaSim
  readonly rng: Rng
  readonly records: PhaseSetRecord[] = []
  private seqIndex = -1
  private finished = false
  private deadLinks: { unit: number; k: number; w: number }[] = []
  private warned = new Set<string>()

  readonly scenario: Scenario
  readonly cfg: LisaConfig
  readonly seed: number
  private opts: RunOptions
  /** Which active SPs were above 0.5 last iteration, for counting firings. */
  private spOn = new Uint8Array(0)

  constructor(scenario: Scenario, cfg: LisaConfig, seed: number, opts: RunOptions = {}) {
    this.scenario = scenario
    this.cfg = cfg
    this.seed = seed
    this.opts = opts
    this.rng = makeRng(seed)
    this.net = buildNetwork(scenario)
    this.sim = new LisaSim(this.net, cfg, this.rng)
    this.checkSupported()
    this.applySemanticDeath()
    // Prime readiness and priorities in every analog.
    for (const a of this.net.analogs) {
      for (const p of a.p) this.sim.readiness[p] = cfg.readinessMax
      updatePriorities(this.sim, a.index, -1)
    }
    if (scenario.sequence.some((s) => s.ssl !== 'off')) this.warn('self-supervised learning is not implemented yet (phase 3); SSL_ON/SSL_OK are ignored')
  }

  private warn(message: string): void {
    if (this.warned.has(message)) return
    this.warned.add(message)
    this.opts.onWarning?.(message)
  }

  private checkSupported(): void {
    const c = this.cfg
    const bad = (k: string, v: string) => {
      throw new Error(`${k} = "${v}" is not implemented yet (it belongs to a later build phase)`)
    }
    if (c.driverRule !== 'hh2003') bad('driverRule', c.driverRule)
    if (c.mappingAlgorithm === 'hh1997') bad('mappingAlgorithm', c.mappingAlgorithm)
    if (c.recipientWithinClassInhibition === 'divisive1997') bad('recipientWithinClassInhibition', c.recipientWithinClassInhibition)
    if (c.recipientPInput !== 'current') bad('recipientPInput', c.recipientPInput)
    if (c.semanticInputRule === 'fanInNormalized1997') bad('semanticInputRule', c.semanticInputRule)
    if (c.dormantCompetition !== 'lucePostHoc') bad('dormantCompetition', c.dormantCompetition)
  }

  private applySemanticDeath(): void {
    const p = this.cfg.semanticDeath
    if (p <= 0) return
    for (const u of this.net.units) {
      for (let k = 0; k < u.semW.length; k++) {
        if (this.rng.next() < p) {
          this.deadLinks.push({ unit: u.id, k, w: u.semW[k] })
          u.semW[k] = 0
        }
      }
      if (u.semW.length) this.net.updateSemanticStats(u.id)
    }
  }

  private restoreSemanticDeath(): void {
    for (const d of this.deadLinks) this.net.units[d.unit].semW[d.k] = d.w
    for (const d of this.deadLinks) this.net.updateSemanticStats(d.unit)
    this.deadLinks = []
  }

  // ---- status ----

  get done(): boolean {
    return this.finished
  }

  get phase(): PhaseSet | null {
    return this.sim.phase
  }

  /** Iteration within the current phase set. */
  get iteration(): number {
    return this.sim.iteration
  }

  get sequenceIndex(): number {
    return this.seqIndex
  }

  /** The most active SP among those receiving attention, or -1. */
  get firingSP(): number {
    const ph = this.sim.phase
    if (!ph) return -1
    let best = -1
    for (const sp of ph.activeSPs) if (best < 0 || this.sim.act[sp] > this.sim.act[best]) best = sp
    return best
  }

  // ---- stepping ----

  /** Advance one iteration. Returns false once the run is complete. */
  step(): boolean {
    if (this.finished) return false
    if (this.sim.phase === null) {
      if (!this.beginNextPhaseSet()) return false
    }
    const sim = this.sim
    const ph = sim.phase!
    if (this.cfg.wmMode === 'normal' && ph.groups.length > 1 && sim.iteration === ph.groupEnd) {
      ph.groupIndex++
      ph.activeSPs = ph.groups[ph.groupIndex]
      ph.groupEnd += this.cfg.iterationsPerSP * ph.activeSPs.length
    }
    updateNetwork(sim)
    sim.iteration++
    const rec = this.records[this.records.length - 1]
    for (const sp of ph.sps) {
      const on = sim.act[sp] > 0.5 ? 1 : 0
      if (on && !this.spOn[sp]) rec.firings[this.net.units[sp].name]++
      this.spOn[sp] = on
    }
    if (rec.topDownAt < 0 && sim.topDownOK) rec.topDownAt = sim.iteration
    if (sim.iteration >= ph.duration) this.endPhaseSet()
    return !this.finished
  }

  /** Run to the end of the current phase set (or the next one, if between phase sets). */
  runPhaseSet(): void {
    const target = this.sim.phase ? this.sim.phase.index : this.seqIndex + 1
    while (!this.finished && (this.sim.phase === null ? this.seqIndex < target : this.sim.phase.index === target)) {
      if (!this.step()) break
    }
  }

  runToEnd(): void {
    while (this.step()) {
      /* keep going */
    }
  }

  private beginNextPhaseSet(): boolean {
    this.seqIndex++
    if (this.seqIndex >= this.scenario.sequence.length) {
      this.finished = true
      this.restoreSemanticDeath()
      return false
    }
    const def = this.scenario.sequence[this.seqIndex]
    const sim = this.sim
    const net = this.net
    const cfg = this.cfg
    sim.driver = def.driver
    sim.recips = [...def.recips]
    sim.dormant = net.analogs.map((a) => a.index).filter((i) => i !== def.driver && !def.recips.includes(i))

    // Choose the propositions.
    const props: number[] = []
    if (def.props) {
      for (const name of def.props) {
        const u = net.findUnit(def.driver, name, P)
        if (!u) throw new Error(`phase set ${this.seqIndex}: no proposition ${name} in analog ${def.driver}`)
        props.push(u.id)
        updatePriorities(sim, def.driver, u.id)
      }
    } else if (def.random !== undefined) {
      const candidates = net.analogs[def.driver].p
      for (let k = 0; k < def.random; k++) {
        const p = randomPropSelect(sim, candidates)
        props.push(p)
        updatePriorities(sim, def.driver, p)
      }
    }

    const sps: number[] = []
    const preds: number[] = []
    const objs: number[] = []
    const childProps: number[] = []
    const objsAndChilds: number[] = []
    const groups: number[][] = []
    for (const p of props) {
      const g: number[] = []
      for (const s of net.units[p].sps) {
        sps.push(s)
        g.push(s)
      }
      groups.push(g)
    }
    for (const s of sps) {
      const u = net.units[s]
      if (!preds.includes(u.pred)) preds.push(u.pred)
    }
    for (const s of sps) {
      const u = net.units[s]
      if (u.obj >= 0) {
        if (!objs.includes(u.obj)) objs.push(u.obj)
        if (!objsAndChilds.includes(u.obj)) objsAndChilds.push(u.obj)
      }
    }
    for (const s of sps) {
      const u = net.units[s]
      if (u.child >= 0) {
        if (!childProps.includes(u.child)) childProps.push(u.child)
        if (!objsAndChilds.includes(u.child)) objsAndChilds.push(u.child)
      }
    }
    const duration = cfg.wmMode === 'unlimited' ? cfg.phaseDuration * 3 * sps.length : cfg.iterationsPerSP * sps.length

    sim.resetNetworkState()
    for (const id of [...props, ...sps, ...preds, ...objs, ...childProps]) sim.retrieved[id] = 1

    const grouped = cfg.wmMode === 'normal' && cfg.batchedSPOrder === 'grouped' && groups.length > 1
    const phase: PhaseSet = {
      index: this.seqIndex,
      props,
      sps,
      preds,
      objs,
      childProps,
      objsAndChilds,
      activeSPs: grouped ? groups[0] : [...sps],
      groups: grouped ? groups : [sps],
      groupIndex: 0,
      groupEnd: grouped ? cfg.iterationsPerSP * groups[0].length : duration,
      duration,
      updateMapping: def.updateMapping,
    }
    if (cfg.wmMode === 'normal') {
      // Symmetry breaking: randomize each phase-set SP's sensitivity to inhibition.
      for (const s of sps) sim.sti[s] = cfg.minSTI + sim.rng.next() * (cfg.maxSTI - cfg.minSTI)
    }
    sim.phase = phase
    sim.iteration = 0
    sim.phaseIteration = 0
    this.spOn = new Uint8Array(net.units.length)
    this.records.push({
      index: this.seqIndex,
      driver: net.analogs[def.driver].name,
      recips: def.recips.map((i) => net.analogs[i].name),
      props: props.map((p) => net.units[p].name),
      updateMapping: def.updateMapping,
      topDownAt: -1,
      timesFired: {},
      firings: Object.fromEntries(sps.map((s) => [net.units[s].name, 0])),
    })
    return true
  }

  private endPhaseSet(): void {
    const sim = this.sim
    const ph = sim.phase!
    const rec = this.records[this.records.length - 1]
    for (const s of ph.sps) rec.timesFired[this.net.units[s].name] = sim.timesFired[s]
    if (ph.updateMapping) {
      if (this.cfg.mappingAlgorithm === 'vers142') {
        const r = updateWeightsVers142(sim.conns, this.cfg, sim.retrieved)
        rec.settleRounds = r.rounds
      } else {
        updateWeightsHH2003(sim.conns, this.cfg, sim.retrieved)
      }
    }
    spreadSupportToRecipients(sim, ph.props)
    const def = this.scenario.sequence[this.seqIndex]
    if (def.ssl === 'auto') {
      rec.mappingQuality = {}
      for (const ai of sim.recips) {
        const q = mappingQuality(this.net, sim.conns, ai, sim.driver)
        rec.mappingQuality[this.net.analogs[ai].name] = q
        sim.readyToLearn[ai] = this.net.analogs[ai].units.length === 0 || q >= this.cfg.sslThreshold
      }
    }
    sim.phase = null
  }

  // ---- results ----

  /** Mapping weights from every unit of analog `from` to units of analog `to`, weight > 0, like Hummel's output files. */
  mappings(from: number, to: number, type?: UnitType): MappingEntry[] {
    const out: MappingEntry[] = []
    const { net } = this
    const conns = this.sim.conns
    for (const id of net.analogs[from].units) {
      const u = net.units[id]
      if (type !== undefined && u.type !== type) continue
      for (const c of conns.byUnit[id]) {
        const o = conns.other(c, id)
        if (net.units[o].analog !== to || conns.w[c] <= 0) continue
        out.push({ from: u.name, to: net.units[o].name, weight: conns.w[c] })
      }
    }
    return out
  }

  /** The best-mapped unit in analog `to` for the named unit of analog `from`, or null. */
  bestMapping(from: number, name: string, to: number): { to: string; weight: number } | null {
    const u = this.net.findUnit(from, name)
    if (!u) return null
    let best: { to: string; weight: number } | null = null
    const conns = this.sim.conns
    for (const c of conns.byUnit[u.id]) {
      const o = conns.other(c, u.id)
      if (this.net.units[o].analog !== to) continue
      if (!best || conns.w[c] > best.weight) best = { to: this.net.units[o].name, weight: conns.w[c] }
    }
    return best
  }

  /**
   * Weight (or hypothesis) matrix between two analogs for one unit type:
   * rows are `from`'s units, columns `to`'s units, in analog order.
   */
  matrix(from: number, to: number, type: UnitType, field: 'w' | 'h' = 'w'): { rows: string[]; cols: string[]; values: Float64Array } {
    const { net } = this
    const conns = this.sim.conns
    const rowIds = [net.analogs[from].p, net.analogs[from].sp, net.analogs[from].pred, net.analogs[from].obj][type]
    const colIds = [net.analogs[to].p, net.analogs[to].sp, net.analogs[to].pred, net.analogs[to].obj][type]
    const values = new Float64Array(rowIds.length * colIds.length)
    const colIndex = new Map(colIds.map((id, i) => [id, i]))
    const src = field === 'w' ? conns.w : conns.h
    rowIds.forEach((r, i) => {
      for (const c of conns.byUnit[r]) {
        const j = colIndex.get(conns.other(c, r))
        if (j !== undefined) values[i * colIds.length + j] = src[c]
      }
    })
    return { rows: rowIds.map((id) => net.units[id].name), cols: colIds.map((id) => net.units[id].name), values }
  }

  /** The last iteration's input breakdown for one unit (the inspector's stacked bar). */
  unitInputs(id: number): { bu: number; td: number; lat: number; hebb: number; net: number } {
    const s = this.sim
    const hebb = s.hebb[id] * this.cfg.hebbBias
    return { bu: s.bu[id], td: s.td[id], lat: s.lat[id], hebb, net: s.bu[id] + s.td[id] + s.lat[id] + hebb }
  }

  /** Mapping connections of one unit: the other unit, its analog, weight and current hypothesis. */
  connectionsOf(id: number): { other: number; analog: number; weight: number; hypothesis: number }[] {
    const conns = this.sim.conns
    return conns.byUnit[id].map((c) => {
      const o = conns.other(c, id)
      return { other: o, analog: this.net.units[o].analog, weight: conns.w[c], hypothesis: conns.h[c] }
    })
  }

  /** The SP that is firing now (most active and above 0.5), or -1 during a transition. */
  get firingSPOn(): number {
    const f = this.firingSP
    return f >= 0 && this.sim.act[f] > 0.5 ? f : -1
  }

  /** Step until a different SP is firing (or the phase set ends). */
  stepToNextSP(maxSteps = 5000): void {
    const phase = this.sim.phase?.index ?? this.seqIndex + 1
    const start = this.firingSPOn
    for (let i = 0; i < maxSteps; i++) {
      if (!this.step()) return
      if (this.sim.phase === null || this.sim.phase.index !== phase) return
      const f = this.firingSPOn
      if (f >= 0 && f !== start) return
    }
  }

  /** A printable mapping table in the layout of Hummel's .run files. */
  mappingReport(): string {
    const lines: string[] = []
    const { net } = this
    for (const a of net.analogs) {
      for (const b of net.analogs) {
        if (a === b) continue
        const entries = this.mappings(a.index, b.index)
        if (entries.length === 0) continue
        lines.push(`From ${a.name} to ${b.name}:`)
        for (let t = 0 as UnitType; t <= 3; t = (t + 1) as UnitType) {
          lines.push(`  ${TYPE_NAMES[t]}s:`)
          for (const id of [a.p, a.sp, a.pred, a.obj][t]) {
            const es = entries.filter((e) => e.from === net.units[id].name)
            if (es.length === 0) continue
            lines.push(`    From ${net.units[id].name} to:` + es.map((e) => `    ${e.to} = ${e.weight.toFixed(3)}`).join(''))
          }
        }
      }
    }
    return lines.join('\n')
  }
}

/** Apply a scenario's `Parameters` block on top of a configuration (spec §9.1). */
export function applyScenarioParameters(cfg: LisaConfig, scenario: Scenario): LisaConfig {
  const p = scenario.parameters
  const out = { ...cfg }
  if (p.wmMode !== undefined) out.wmMode = p.wmMode
  if (p.semanticNoise !== undefined) out.semanticNoise = p.semanticNoise
  if (p.semanticDeath !== undefined) out.semanticDeath = p.semanticDeath
  if (p.attention !== undefined) out.attention = p.attention
  if (p.driverInhibition !== undefined) {
    // build.read_parameters also scales both sensitivity bounds by the driver inhibition.
    out.driverInhibition = p.driverInhibition
    out.minSTI = cfg.minSTI * p.driverInhibition
    out.maxSTI = cfg.maxSTI * p.driverInhibition
  }
  if (p.recipInhibition !== undefined) out.recipInhibition = p.recipInhibition
  if (p.mappingLearningRate !== undefined) out.mappingLearningRate = p.mappingLearningRate
  if (p.mappingAlgorithm !== undefined) out.mappingAlgorithm = p.mappingAlgorithm
  return out
}
