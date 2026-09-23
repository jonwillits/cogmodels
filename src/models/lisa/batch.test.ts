import { describe, expect, it } from 'vitest'
import { runBatch } from './batch'
import { configFor } from './engine/presets'
import { builtInScenario } from './scenarios'

describe('runBatch', () => {
  it('is deterministic and reports the love-triangle outcome', () => {
    const req = { scenarioId: 'lovetri9', sym: builtInScenario('lovetri9').sym, cfg: configFor('Hummel2007'), seeds: [1, 2, 3, 4, 5] }
    const progress: number[] = []
    const a = runBatch(req, (d) => progress.push(d))
    const b = runBatch(req)
    expect(progress).toEqual([1, 2, 3, 4, 5])
    expect(a.correct).toBe(5)
    expect(a.runs).toEqual(b.runs)
    expect(a.distributions['0>1>3']).toEqual({ AMY: { ABE: 5 }, BILL: { BETH: 5 }, CAT: { CHAD: 5 } })
    expect(a.reference).toMatch(/Amy→Abe/)
  })

  it('reports null for a scenario without a reference outcome', () => {
    const r = runBatch({ scenarioId: 'hierarchy1', sym: builtInScenario('hierarchy1').sym, cfg: configFor('Hummel2007'), seeds: [1] })
    expect(r.correct).toBeNull()
    expect(Object.keys(r.distributions).length).toBeGreaterThan(0)
  })

  it('fails the love triangle under the H&H 03 suite, as Hummel’s code does', () => {
    const r = runBatch({ scenarioId: 'lovetri9', sym: builtInScenario('lovetri9').sym, cfg: configFor('HummelSuite03'), seeds: [1, 2, 3] })
    expect(r.correct).toBe(0)
  })
})
