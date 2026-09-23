import { it } from 'vitest'
import { runBatch } from './batch'
import { configFor } from './engine/presets'
import { builtInScenarios } from './scenarios'
it('probe: outcomes', () => {
  const seeds = Array.from({ length: 20 }, (_, i) => i + 1)
  for (const b of builtInScenarios) {
    const r = runBatch({ scenarioId: b.id, sym: b.sym, cfg: configFor('Hummel2007'), seeds })
    console.log(`[outcome ${b.id}] ${r.correct === null ? 'no test' : r.correct + '/20'} · ${r.ms.toFixed(0)} ms · P dist ${JSON.stringify(Object.fromEntries(Object.entries(r.distributions).filter(([k]) => k.endsWith('>0')).map(([k, v]) => [k, v])))}`)
  }
})
