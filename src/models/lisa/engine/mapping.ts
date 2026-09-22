/**
 * Mapping connections and the mapping algorithms (spec §7.8, §7.9).
 *
 * A connection links two units of the same type in different analogs. It is
 * stored once and used in both directions. Each has a weight, a hypothesis
 * buffer (`h`) and, under Vers142, a settling activation. Hummel calls these
 * "hebbs"; his per-unit, per-target-analog lists ("hebb sets") become the
 * `byUnit` lists here, filtered by the other end's analog when the algorithm
 * needs a row or column.
 */
import type { LisaConfig } from './config'
import { P, SP, type Network } from './network'

const KEY_BASE = 1 << 20

export class Connections {
  u: number[] = []
  v: number[] = []
  w: number[] = []
  h: number[] = []
  act: number[] = []
  input: number[] = []
  private keyIndex = new Map<number, number>()
  byUnit: number[][] = []
  /** Largest weight on any connection from unit i to analog a: `maxW[i * nAnalogs + a]`. */
  maxW: Float64Array
  private nAnalogs: number
  private net: Network

  constructor(net: Network) {
    this.net = net
    this.nAnalogs = net.analogs.length
    this.byUnit = net.units.map(() => [])
    this.maxW = new Float64Array(net.units.length * this.nAnalogs)
  }

  get count(): number {
    return this.u.length
  }

  /** Call after units are added to the network. */
  grow(): void {
    while (this.byUnit.length < this.net.units.length) this.byUnit.push([])
    if (this.maxW.length < this.net.units.length * this.nAnalogs) {
      const next = new Float64Array(this.net.units.length * this.nAnalogs)
      next.set(this.maxW)
      this.maxW = next
    }
  }

  private key(a: number, b: number): number {
    return a < b ? a * KEY_BASE + b : b * KEY_BASE + a
  }

  find(a: number, b: number): number {
    const c = this.keyIndex.get(this.key(a, b))
    return c === undefined ? -1 : c
  }

  /** Get or create the connection between two units; new ones start at weight 0. */
  connect(a: number, b: number, weight = 0): number {
    const k = this.key(a, b)
    let c = this.keyIndex.get(k)
    if (c !== undefined) return c
    c = this.u.length
    const lo = Math.min(a, b)
    const hi = Math.max(a, b)
    this.u.push(lo)
    this.v.push(hi)
    this.w.push(weight)
    this.h.push(0)
    this.act.push(0)
    this.input.push(0)
    this.keyIndex.set(k, c)
    this.byUnit[lo].push(c)
    this.byUnit[hi].push(c)
    if (weight > 0) this.recomputeMaxWeights()
    return c
  }

  other(c: number, unit: number): number {
    return this.u[c] === unit ? this.v[c] : this.u[c]
  }

  maxWeightTo(unit: number, analog: number): number {
    return this.maxW[unit * this.nAnalogs + analog]
  }

  recomputeMaxWeights(): void {
    this.maxW.fill(0)
    const an = this.net.units
    for (let c = 0; c < this.u.length; c++) {
      const a = this.u[c]
      const b = this.v[c]
      const w = this.w[c]
      const ia = a * this.nAnalogs + an[b].analog
      const ib = b * this.nAnalogs + an[a].analog
      if (w > this.maxW[ia]) this.maxW[ia] = w
      if (w > this.maxW[ib]) this.maxW[ib] = w
    }
  }

  /** Reset everything but the weights (start of a phase set). */
  resetBuffers(): void {
    this.h.fill(0)
    this.act.fill(0)
    this.input.fill(0)
  }

  /**
   * "Inconsistent" connections: those sharing an endpoint with c and pointing
   * at the same other analog, i.e. c's row and column. Following Hummel's
   * find_inconsistent_hebbs, only the hebb sets of *retrieved* units count,
   * so a connection with one unretrieved endpoint sees only half its cross.
   */
  inconsistentOf(c: number, retrieved: Uint8Array): number[] {
    const out: number[] = []
    const an = this.net.units
    const ends = [this.u[c], this.v[c]]
    for (let e = 0; e < 2; e++) {
      const x = ends[e]
      if (!retrieved[x]) continue
      const target = an[ends[1 - e]].analog
      for (const d of this.byUnit[x]) {
        if (d !== c && an[this.other(d, x)].analog === target) out.push(d)
      }
    }
    return out
  }

  /**
   * Structurally parallel ("consistent") connections for Vers142, computed
   * from the topology rather than by comparing all pairs. Returns the list
   * with the doubled entries Hummel's code produces: an SP connection counts
   * twice for its P connection, and a predicate/object connection counts
   * twice for its SP connection.
   */
  consistentOf(c: number, isRetrievedConn: (d: number) => boolean): number[] {
    const out: number[] = []
    const units = this.net.units
    const x = units[this.u[c]]
    const y = units[this.v[c]]
    const add = (a: number, b: number, times: number) => {
      if (a < 0 || b < 0) return
      const d = this.find(a, b)
      if (d < 0 || d === c || !isRetrievedConn(d)) return
      for (let t = 0; t < times; t++) out.push(d)
    }
    if (x.type === P) {
      // SPs below this proposition, paired: counted twice.
      for (const s of x.sps) for (const t of y.sps) add(s, t, 2)
      // SPs above (this proposition as argument): counted twice.
      for (const s of x.parentSPs) for (const t of y.parentSPs) add(s, t, 2)
    } else if (x.type === SP) {
      // The parent P connection, once.
      add(x.parent, y.parent, 1)
      // The child P connection, once.
      add(x.child, y.child, 1)
      // Sibling SPs under the same pair of parents, sharing no endpoint, once.
      for (const s of units[x.parent].sps) {
        if (s === x.id) continue
        for (const t of units[y.parent].sps) {
          if (t === y.id) continue
          add(s, t, 1)
        }
      }
      // Predicate and object connections: counted twice.
      add(x.pred, y.pred, 2)
      add(x.obj, y.obj, 2)
    } else {
      // Predicate or object: the SP connections above, once each.
      for (const s of x.spsAbove) for (const t of y.spsAbove) add(s, t, 1)
    }
    return out
  }
}

/** Hypothesis accumulation (2003 Eq. 6): every iteration while topDownOK. */
export function updateHypotheses(conns: Connections, act: Float64Array, retrieved: Uint8Array): void {
  const { u, v, h } = conns
  for (let c = 0; c < u.length; c++) {
    if (retrieved[u[c]] && retrieved[v[c]]) h[c] += act[u[c]] * act[v[c]]
  }
}

/**
 * The published algorithm (2003 A17; hebbs.original_update_hebb_weights).
 * Applied to every connection, as in the code.
 */
export function updateWeightsHH2003(conns: Connections, cfg: LisaConfig, retrieved: Uint8Array): void {
  const n = conns.count
  const inc: number[][] = new Array(n)
  for (let c = 0; c < n; c++) inc[c] = conns.inconsistentOf(c, retrieved)
  const h = conns.h
  // Divisive normalization by the largest hypothesis in the row and column (or 1),
  // or by the largest anywhere under the `global` reading of 2003 p. 233.
  const norm = new Float64Array(n)
  if (cfg.hypothesisNormalization === 'global') {
    let g = 1
    for (let c = 0; c < n; c++) if (h[c] > g) g = h[c]
    norm.fill(g)
  } else {
    for (let c = 0; c < n; c++) {
      let m = h[c] > 1 ? h[c] : 1
      for (const d of inc[c]) if (h[d] > m) m = h[d]
      norm[c] = m
    }
  }
  for (let c = 0; c < n; c++) h[c] /= norm[c]
  // Subtractive normalization by the largest *other* hypothesis in the row and column.
  for (let c = 0; c < n; c++) {
    let m = 0
    for (const d of inc[c]) if (h[d] > m) m = h[d]
    norm[c] = m
  }
  for (let c = 0; c < n; c++) h[c] -= norm[c]
  const eta = cfg.mappingLearningRate
  for (let c = 0; c < n; c++) {
    let w = conns.w[c] + (1.1 - conns.w[c]) * h[c] * eta
    if (w > 1) w = 1
    if (w < 0) w = 0
    conns.w[c] = w
  }
  conns.h.fill(0)
  conns.recomputeMaxWeights()
}

export const VERS142 = {
  inhibWeight: 20,
  excitWeight: 3,
  tau: 0.1,
  gamma: 0.8,
  delta: 0.1,
  inhibitionStartsAfter: 19,
  maxRounds: 500,
} as const

/**
 * The Hummel & Green "Vers142" algorithm (hebbs.vers142_update_hebb_weights):
 * the retrieved connections settle as a constraint network, and the weights
 * move toward the settled activations.
 */
export function updateWeightsVers142(conns: Connections, cfg: LisaConfig, retrieved: Uint8Array): { rounds: number; settled: boolean } {
  const n = conns.count
  const isRetrievedConn = (c: number) => retrieved[conns.u[c]] === 1 && retrieved[conns.v[c]] === 1
  const list: number[] = []
  for (let c = 0; c < n; c++) if (isRetrievedConn(c)) list.push(c)
  const inc = new Map<number, number[]>()
  const con = new Map<number, number[]>()
  for (const c of list) {
    inc.set(c, conns.inconsistentOf(c, retrieved))
    con.set(c, conns.consistentOf(c, isRetrievedConn))
  }
  const h = conns.h
  const act = conns.act
  const input = conns.input
  // Divisive normalization (own buffer, or the largest in the row and column, or 1).
  const norm = new Map<number, number>()
  for (const c of list) {
    let m = h[c] > 1 ? h[c] : 1
    for (const d of inc.get(c)!) if (h[d] > m) m = h[d]
    norm.set(c, m)
  }
  for (const c of list) {
    h[c] /= norm.get(c)!
    input[c] = h[c]
  }
  const { inhibWeight, excitWeight, tau, gamma, delta, inhibitionStartsAfter, maxRounds } = VERS142
  let rounds = 0
  let settled = false
  while (!settled && rounds < maxRounds) {
    rounds++
    for (const c of list) {
      let inp = h[c]
      if (rounds > inhibitionStartsAfter) {
        let maxInh = 0
        for (const d of inc.get(c)!) if (act[d] > maxInh) maxInh = act[d]
        inp -= maxInh * inhibWeight
      }
      for (const d of con.get(c)!) inp += act[d] * excitWeight
      input[c] = inp
    }
    settled = true
    for (const c of list) {
      const dAct = gamma * input[c] * (1 - act[c]) - act[c] * delta
      const old = act[c]
      let a = old + tau * dAct
      if (a > 1) a = 1
      if (a < 0) a = 0
      act[c] = a
      if (Math.abs(a - old) > 0.01 * tau) settled = false
    }
  }
  const eta = cfg.mappingLearningRate
  for (const c of list) conns.w[c] += eta * (act[c] - conns.w[c])
  conns.h.fill(0)
  conns.recomputeMaxWeights()
  return { rounds, settled }
}

/**
 * Mapping quality of analog A to analog D (hebbs.assess_mapping_quality):
 * the importance-weighted mean over A's units of (largest − second largest)
 * weight to D. An analog with no units (a schema) scores 0 but is treated as
 * always ready to learn by the caller.
 */
export function mappingQuality(net: Network, conns: Connections, a: number, d: number): number {
  let num = 0
  let den = 0
  for (const id of net.analogs[a].units) {
    const u = net.units[id]
    let max = 0
    let second = 0
    for (const c of conns.byUnit[id]) {
      if (net.units[conns.other(c, id)].analog !== d) continue
      const w = conns.w[c]
      if (w >= max) {
        second = max
        max = w
      } else if (w > second) second = w
    }
    num += u.importance * (max - second)
    den += u.importance
  }
  return den > 0 ? num / den : 0
}

