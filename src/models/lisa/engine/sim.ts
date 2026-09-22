/**
 * The simulation state: typed arrays over unit ids, the semantic pools, the
 * mapping connections, and the bookkeeping of the current phase set.
 * The per-iteration rules live in dynamics.ts; the run structure in run.ts.
 */
import type { Rng } from '../../random'
import type { LisaConfig } from './config'
import { Connections } from './mapping'
import type { Network } from './network'

export interface PhaseSet {
  /** Index into the scenario's sequence. */
  index: number
  props: number[]
  sps: number[]
  preds: number[]
  objs: number[]
  childProps: number[]
  objsAndChilds: number[]
  /** SPs currently receiving attention (all of `sps`, or one proposition's under grouped batching, or the rotating list under unlimited WM). */
  activeSPs: number[]
  /** Under grouped batching: the SPs of each proposition and the iteration at which the next group starts. */
  groups: number[][]
  groupIndex: number
  groupEnd: number
  duration: number
  updateMapping: boolean
}

export class LisaSim {
  act: Float64Array
  bu: Float64Array
  td: Float64Array
  lat: Float64Array
  hebb: Float64Array
  mode: Int8Array
  retrieved: Uint8Array
  inhibitor: Float64Array
  sti: Float64Array
  timesFired: Int32Array
  readiness: Float64Array
  support: Float64Array
  priority: Float64Array
  /** 1997 A7: the largest activation each SP has reached since the proposition was selected. */
  maxSince: Float64Array

  predSemAct: Float64Array
  predSemInput: Float64Array
  objSemAct: Float64Array
  objSemInput: Float64Array

  conns: Connections

  driver = -1
  recips: number[] = []
  dormant: number[] = []
  readyToLearn: boolean[]
  phase: PhaseSet | null = null
  iteration = 0
  /** Unlimited WM: iterations the current head SP has fired. */
  phaseIteration = 0
  gi = 0
  topDownOK = false

  net: Network
  cfg: LisaConfig
  rng: Rng

  constructor(net: Network, cfg: LisaConfig, rng: Rng) {
    this.net = net
    this.cfg = cfg
    this.rng = rng
    const n = net.units.length
    this.act = new Float64Array(n)
    this.bu = new Float64Array(n)
    this.td = new Float64Array(n)
    this.lat = new Float64Array(n)
    this.hebb = new Float64Array(n)
    this.mode = new Int8Array(n)
    this.retrieved = new Uint8Array(n)
    this.inhibitor = new Float64Array(n)
    this.sti = new Float64Array(n)
    this.timesFired = new Int32Array(n)
    this.readiness = new Float64Array(n)
    this.support = new Float64Array(n)
    this.priority = new Float64Array(n)
    this.maxSince = new Float64Array(n)
    this.predSemAct = new Float64Array(net.predSem.length)
    this.predSemInput = new Float64Array(net.predSem.length)
    this.objSemAct = new Float64Array(net.objSem.length)
    this.objSemInput = new Float64Array(net.objSem.length)
    this.conns = new Connections(net)
    this.readyToLearn = net.analogs.map((a) => a.units.length === 0)
  }

  /** Grow the state arrays after units were added to the network (self-supervised learning). */
  grow(): void {
    const n = this.net.units.length
    if (this.act.length >= n) return
    const growF = (a: Float64Array) => {
      const b = new Float64Array(n)
      b.set(a)
      return b
    }
    this.act = growF(this.act)
    this.bu = growF(this.bu)
    this.td = growF(this.td)
    this.lat = growF(this.lat)
    this.hebb = growF(this.hebb)
    this.inhibitor = growF(this.inhibitor)
    this.sti = growF(this.sti)
    this.readiness = growF(this.readiness)
    this.support = growF(this.support)
    this.priority = growF(this.priority)
    this.maxSince = growF(this.maxSince)
    const m = new Int8Array(n)
    m.set(this.mode)
    this.mode = m
    const r = new Uint8Array(n)
    r.set(this.retrieved)
    this.retrieved = r
    const t = new Int32Array(n)
    t.set(this.timesFired)
    this.timesFired = t
    this.conns.grow()
  }

  /** Reset every unit's state except the mapping weights (start of a phase set; spec §6). */
  resetNetworkState(): void {
    this.act.fill(0)
    this.bu.fill(0)
    this.td.fill(0)
    this.lat.fill(0)
    this.hebb.fill(0)
    this.mode.fill(0)
    this.retrieved.fill(0)
    this.inhibitor.fill(0)
    this.sti.fill(this.cfg.minSTI)
    this.timesFired.fill(0)
    this.maxSince.fill(0)
    this.predSemAct.fill(0)
    this.predSemInput.fill(0)
    this.objSemAct.fill(0)
    this.objSemInput.fill(0)
    this.conns.resetBuffers()
    this.topDownOK = false
    this.gi = 0
  }
}
