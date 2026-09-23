/**
 * What counts as the reference outcome of each built-in scenario (spec §9.2),
 * as a function of a finished run's best mappings, so the Batch and Claims
 * tabs can report rates next to Hummel's numbers. Plain TS: the worker uses it.
 */
import type { UnitType } from '../engine/network'

/** Best mapping per unit for one ordered analog pair and type, as the batch runner records it. */
export interface BestMap {
  [unit: string]: { to: string; weight: number }
}

export interface RunSummary {
  seed: number
  /** Keyed `${from}>${to}>${type}` where type is 0..3. */
  best: Record<string, BestMap>
  topDownAt: number[]
  firingSpread: number[]
  settleRounds: number[]
  mappingQuality: Record<string, number>[]
}

export interface OutcomeDef {
  /** One line, shown beside the observed rate. */
  reference: string
  /** null when the scenario has no defined outcome. */
  test: ((s: RunSummary) => boolean) | null
}

export const key = (from: number, to: number, type: UnitType): string => `${from}>${to}>${type}`

const objs = (s: RunSummary, from: number, to: number) => s.best[key(from, to, 3)] ?? {}
const props = (s: RunSummary, from: number, to: number) => s.best[key(from, to, 0)] ?? {}

export const outcomes: Record<string, OutcomeDef> = {
  lovetri9: {
    reference: 'Amy→Abe, Bill→Beth, Cat→Chad (cross-gender, structurally correct). Hummel 2007: 10/10 in lovetri9.bat; 19/20 through the harness.',
    test: (s) => {
      const o = objs(s, 0, 1)
      return o.AMY?.to === 'ABE' && o.BILL?.to === 'BETH' && o.CAT?.to === 'CHAD'
    },
  },
  lovetri7: {
    reference: 'Mapping stage (target as driver): Abe→Amy, Beth→Bill, Chad→Cat. Inference is phase 3.',
    test: (s) => {
      const o = objs(s, 1, 0)
      return o.ABE?.to === 'AMY' && o.BETH?.to === 'BILL' && o.CHAD?.to === 'CAT'
    },
  },
  stjohn4: {
    reference: 'Joan→Bill, Civic→Jeep, LAX→Beach, P1→P1, P2→P2. Without inference both engines then map P3→P5; with inference (phase 3) P3→P3.',
    test: (s) => {
      const o = objs(s, 0, 1)
      const p = props(s, 0, 1)
      return o.JOAN?.to === 'BILL' && o.CIVIC?.to === 'JEEP' && o.LAX?.to === 'BEACH' && p.P1?.to === 'P1' && p.P2?.to === 'P2'
    },
  },
  hierarchy1: {
    reference: 'No reference. Record what happens.',
    test: null,
  },
}

export function outcomeFor(id: string): OutcomeDef {
  return outcomes[id] ?? { reference: 'No reference.', test: null }
}
