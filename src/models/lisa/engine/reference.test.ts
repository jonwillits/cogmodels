/**
 * Distribution-level comparison against Hummel's own code, run through the
 * harness in reference/pylisa (spec §9.3). The random streams differ, so
 * nothing matches draw for draw; outcomes, final weights and the iteration at
 * which top-down input is released should.
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { parseSymOrThrow } from '../input/symParser'
import { builtInScenario } from '../scenarios'
import type { PresetId } from './config'
import { configFor } from './presets'
import { LisaRun, applyScenarioParameters } from './run'
import { OBJ, P, PRED, SP, type UnitType } from './network'

interface RefMapping {
  from: string
  fromUnit: string
  to: string
  toUnit: string
  type: string
  weight: number
}
interface RefRun {
  records: { topDownAt: number; settleRounds: number | null }[]
  mappings: RefMapping[]
}
interface RefDoc {
  preset: string
  results: RefRun[]
}

const here = dirname(fileURLToPath(import.meta.url))
const expectedDir = join(here, '..', '..', '..', '..', 'reference', 'expected')
const load = (name: string): RefDoc => JSON.parse(readFileSync(join(expectedDir, name), 'utf8'))

/** Best target per driver-analog unit of a type, orientation-agnostic. */
function refBest(run: RefRun, from: string, to: string, type: string): Map<string, { to: string; weight: number }> {
  const out = new Map<string, { to: string; weight: number }>()
  for (const m of run.mappings) {
    if (m.type !== type) continue
    let u: string
    let v: string
    if (m.from === from && m.to === to) [u, v] = [m.fromUnit, m.toUnit]
    else if (m.from === to && m.to === from) [u, v] = [m.toUnit, m.fromUnit]
    else continue
    const b = out.get(u)
    if (!b || m.weight > b.weight) out.set(u, { to: v, weight: m.weight })
  }
  return out
}

function ourBest(run: LisaRun, from: number, to: number, type: UnitType): Map<string, { to: string; weight: number }> {
  const out = new Map<string, { to: string; weight: number }>()
  for (const e of run.mappings(from, to, type)) {
    const b = out.get(e.from)
    if (!b || e.weight > b.weight) out.set(e.from, { to: e.to, weight: e.weight })
  }
  return out
}

const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length

function compare(scenarioId: string, preset: PresetId, file: string, from: string, to: string, seeds: number) {
  const ref = load(file)
  expect(ref.preset).toBe(preset)
  const sc = parseSymOrThrow(builtInScenario(scenarioId).sym)
  const fromIdx = sc.analogs.findIndex((a) => a.name === from)
  const toIdx = sc.analogs.findIndex((a) => a.name === to)
  const cfg = applyScenarioParameters(configFor(preset), sc)
  const ours: LisaRun[] = []
  for (let seed = 1; seed <= seeds; seed++) {
    const r = new LisaRun(sc, cfg, seed)
    r.runToEnd()
    ours.push(r)
  }
  return { ref, ours, fromIdx, toIdx }
}

const TYPES: [string, UnitType][] = [
  ['P', P],
  ['SP', SP],
  ['Pred', PRED],
  ['Obj', OBJ],
]

describe('against Hummel’s code (reference/expected)', () => {
  it('lovetri9 under Hummel2007: same outcomes, same weights, same top-down timing', () => {
    const { ref, ours, fromIdx, toIdx } = compare('lovetri9', 'Hummel2007', 'lovetri9_Hummel2007.json', 'Amy&Bill', 'Abe&Beth', 20)
    // Outcome: every run in both engines maps the objects cross-gender.
    const refCorrect = ref.results.filter((r) => {
      const b = refBest(r, 'Amy&Bill', 'Abe&Beth', 'Obj')
      return b.get('AMY')?.to === 'ABE' && b.get('BILL')?.to === 'BETH' && b.get('CAT')?.to === 'CHAD'
    }).length
    const ourCorrect = ours.filter((r) => {
      const b = ourBest(r, fromIdx, toIdx, OBJ)
      return b.get('AMY')?.to === 'ABE' && b.get('BILL')?.to === 'BETH' && b.get('CAT')?.to === 'CHAD'
    }).length
    // His code got 19 of 20 (run 16 swapped the propositions: Amy→Chad, Bill→Abe, Cat→Beth); ours 20 of 20. Compare rates, not runs.
    expect(refCorrect / ref.results.length).toBeGreaterThanOrEqual(0.9)
    expect(ourCorrect / ours.length).toBeGreaterThanOrEqual(0.9)
    expect(Math.abs(refCorrect / ref.results.length - ourCorrect / ours.length)).toBeLessThanOrEqual(0.1)
    // Final weights by type, within 0.005 of his.
    for (const [name, t] of TYPES) {
      const rw = mean(ref.results.flatMap((r) => [...refBest(r, 'Amy&Bill', 'Abe&Beth', name).values()].map((v) => v.weight)))
      const ow = mean(ours.flatMap((r) => [...ourBest(r, fromIdx, toIdx, t).values()].map((v) => v.weight)))
      expect(Math.abs(rw - ow), `${name}: ref ${rw} ours ${ow}`).toBeLessThan(0.005)
    }
    // Iteration at which top-down input is released, per phase set, within 10%.
    for (let k = 0; k < 3; k++) {
      const rt = mean(ref.results.map((r) => r.records[k].topDownAt))
      const ot = mean(ours.map((r) => r.records[k].topDownAt))
      expect(Math.abs(rt - ot) / rt, `phase set ${k}: ref ${rt} ours ${ot}`).toBeLessThan(0.1)
    }
  })

  it('lovetri9 under HummelSuite03: both engines fail the love triangle with the published rule', () => {
    const { ref, ours, fromIdx, toIdx } = compare('lovetri9', 'HummelSuite03', 'lovetri9_HummelSuite03.json', 'Amy&Bill', 'Abe&Beth', 10)
    const correct = (b: Map<string, { to: string }>) => b.get('AMY')?.to === 'ABE' && b.get('BILL')?.to === 'BETH' && b.get('CAT')?.to === 'CHAD'
    const refCorrect = ref.results.filter((r) => correct(refBest(r, 'Amy&Bill', 'Abe&Beth', 'Obj'))).length
    const ourCorrect = ours.filter((r) => correct(ourBest(r, fromIdx, toIdx, OBJ))).length
    expect(refCorrect).toBe(0)
    expect(ourCorrect).toBeLessThanOrEqual(1)
  })

  it('stjohn4 without inference under Hummel2007: the same mapping, including P3→P5', () => {
    const { ref, ours, fromIdx, toIdx } = compare('stjohn4', 'Hummel2007', 'stjohn4_noSSL_Hummel2007.json', 'Target-Joan', 'Source-Bill', 5)
    for (const r of ref.results) {
      const b = refBest(r, 'Target-Joan', 'Source-Bill', 'P')
      expect(b.get('P3')?.to).toBe('P5')
    }
    for (const r of ours) {
      const b = ourBest(r, fromIdx, toIdx, P)
      expect(b.get('P1')?.to).toBe('P1')
      expect(b.get('P2')?.to).toBe('P2')
      expect(b.get('P3')?.to).toBe('P5')
      const o = ourBest(r, fromIdx, toIdx, OBJ)
      expect(o.get('JOAN')?.to).toBe('BILL')
      expect(o.get('CIVIC')?.to).toBe('JEEP')
      expect(o.get('LAX')?.to).toBe('BEACH')
    }
    const rw = mean(ref.results.flatMap((r) => [...refBest(r, 'Target-Joan', 'Source-Bill', 'Obj').values()].map((v) => v.weight)))
    const ow = mean(ours.flatMap((r) => [...ourBest(r, fromIdx, toIdx, OBJ).values()].map((v) => v.weight)))
    expect(Math.abs(rw - ow)).toBeLessThan(0.005)
  })
})
