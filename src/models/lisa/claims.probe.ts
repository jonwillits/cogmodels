/**
 * Runs every claim's switches, one at a time and all together, over N seeds
 * on the code preset, and prints the outcome rates. Also times the demo's
 * per-step bookkeeping (trace recording) against the bare engine.
 *
 *   PROBE=1 SEEDS=20 npx vitest run --disable-console-intercept src/models/lisa/claims.probe.ts
 */
import { it } from 'vitest'
import { runBatch } from './batch'
import { claims } from './claims'
import type { LisaConfig } from './engine/config'
import { configFor } from './engine/presets'
import { LisaRun, applyScenarioParameters } from './engine/run'
import { TraceRecorder, type TraceKey } from './engine/traces'
import { parseSymOrThrow } from './input/symParser'
import { builtInScenario } from './scenarios'

it('probe: claims', () => {
  const seeds = Array.from({ length: parseInt(process.env.SEEDS ?? '20', 10) }, (_, i) => i + 1)
  const base = configFor('Hummel2007')
  const summary = (r: ReturnType<typeof runBatch>, measure: string) => {
    if (measure === 'timeSharing') {
      const spreads = r.runs.flatMap((x) => x.firingSpread)
      return `clean ${spreads.filter((s) => s <= 1).length}/${spreads.length} phase sets`
    }
    return `${r.correct}/${r.runs.length}`
  }
  for (const c of claims) {
    const sym = builtInScenario(c.scenario).sym
    const lines: string[] = []
    const variants: [string, Partial<LisaConfig>][] = c.switches.map((s) => [s.key, { [s.key]: s.paper } as Partial<LisaConfig>])
    if (c.switches.length > 1) variants.push(['ALL', Object.fromEntries(c.switches.map((s) => [s.key, s.paper])) as Partial<LisaConfig>])
    for (const [label, over] of variants) {
      const r = runBatch({ scenarioId: c.scenario, sym, cfg: { ...base, ...over }, seeds })
      lines.push(`${label}=paper → ${summary(r, c.measure)}`)
    }
    const code = runBatch({ scenarioId: c.scenario, sym, cfg: base, seeds })
    console.log(`[claim ${c.id}] (${c.scenario}, code: ${summary(code, c.measure)}) ${lines.join('; ')}`)
  }

  // Cost of the demo's per-step bookkeeping.
  const sc = parseSymOrThrow(builtInScenario('lovetri9').sym)
  const cfg = applyScenarioParameters(base, sc)
  let run = new LisaRun(sc, cfg, 1)
  let t0 = performance.now()
  while (run.step()) {
    /* bare */
  }
  const bare = performance.now() - t0
  run = new LisaRun(sc, cfg, 1)
  const traces = new TraceRecorder(2000)
  const keys: TraceKey[] = []
  run.net.units.forEach((u) => keys.push({ kind: 'unit', index: u.id }))
  run.net.predSem.forEach((_, i) => keys.push({ kind: 'predSem', index: i }))
  run.net.objSem.forEach((_, i) => keys.push({ kind: 'objSem', index: i }))
  traces.setKeys(keys)
  t0 = performance.now()
  while (run.step()) traces.record(run)
  const withTraces = performance.now() - t0
  t0 = performance.now()
  for (let k = 0; k < keys.length; k++) traces.samples(k)
  const sampleAll = performance.now() - t0
  console.log(`[ui cost] lovetri9 full run: bare ${bare.toFixed(1)} ms, with trace recording ${withTraces.toFixed(1)} ms; reading all ${keys.length} tracks once: ${sampleAll.toFixed(2)} ms`)
})
