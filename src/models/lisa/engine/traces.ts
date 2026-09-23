/**
 * Fixed-length ring buffers of activation over iterations, for the Synchrony
 * plot (spec §9.5: nothing grows with run length). Records a chosen set of
 * structure units and semantic units after every iteration, plus event
 * markers (phase-set starts, top-down release, mapping updates).
 */
import type { LisaRun } from './run'

export type TraceKind = 'unit' | 'predSem' | 'objSem'

export interface TraceKey {
  kind: TraceKind
  index: number
}

export interface TraceEvent {
  /** Global iteration count at which the event happened. */
  at: number
  kind: 'phaseSet' | 'topDown' | 'mapping'
  label: string
}

export class TraceRecorder {
  readonly length: number
  /** Global iteration count of the most recent sample. */
  total = 0
  private keys: TraceKey[] = []
  private buffers: Float32Array[] = []
  private head = 0
  readonly events: TraceEvent[] = []
  private lastPhase = -1
  private lastTopDown = false
  private topDownSeenThisPhase = false

  constructor(length = 2000) {
    this.length = length
  }

  setKeys(keys: TraceKey[]): void {
    this.keys = keys
    this.buffers = keys.map(() => new Float32Array(this.length))
    this.head = 0
    this.total = 0
    this.events.length = 0
    this.lastPhase = -1
    this.lastTopDown = false
    this.topDownSeenThisPhase = false
  }

  get trackedKeys(): TraceKey[] {
    return this.keys
  }

  /** Call once after each `run.step()`. */
  record(run: LisaRun): void {
    const sim = run.sim
    const ph = sim.phase
    this.total++
    if (ph && ph.index !== this.lastPhase) {
      this.lastPhase = ph.index
      this.lastTopDown = false
      this.topDownSeenThisPhase = false
      this.events.push({ at: this.total, kind: 'phaseSet', label: run.records[run.records.length - 1].props.join(' ') })
    }
    if (sim.topDownOK && !this.lastTopDown) {
      this.lastTopDown = true
      // Label the first release in a phase set; later ones (the gate reopening after each transition) are bare ticks.
      this.events.push({ at: this.total, kind: 'topDown', label: this.topDownSeenThisPhase ? '' : 'top-down on' })
      this.topDownSeenThisPhase = true
    }
    if (!sim.topDownOK && this.lastTopDown) this.lastTopDown = false
    if (ph === null && this.lastPhase >= 0 && run.records[run.records.length - 1]?.updateMapping) {
      this.events.push({ at: this.total, kind: 'mapping', label: 'mapping update' })
      this.lastPhase = -1
    }
    for (let k = 0; k < this.keys.length; k++) {
      const key = this.keys[k]
      const v = key.kind === 'unit' ? sim.act[key.index] : key.kind === 'predSem' ? sim.predSemAct[key.index] : sim.objSemAct[key.index]
      this.buffers[k][this.head] = v
    }
    this.head = (this.head + 1) % this.length
    // Drop events that have scrolled out of the window.
    while (this.events.length && this.events[0].at < this.total - this.length) this.events.shift()
  }

  /** Samples for track k, oldest first, up to `length` (fewer before the buffer fills). */
  samples(k: number): Float32Array {
    const n = Math.min(this.total, this.length)
    const out = new Float32Array(n)
    const buf = this.buffers[k]
    const start = (this.head - n + this.length) % this.length
    for (let i = 0; i < n; i++) out[i] = buf[(start + i) % this.length]
    return out
  }

  /** Global iteration count of the oldest sample currently held. */
  get windowStart(): number {
    return this.total - Math.min(this.total, this.length)
  }
}
