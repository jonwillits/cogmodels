/**
 * Timing and behavior probe (spec §9.5). Asserts nothing; prints a table.
 *
 *   PROBE=1 npx vitest run --disable-console-intercept src/models/lisa
 *
 * Budgets, on the development Mac: one iteration of the love triangle under
 * 20 µs, one full headless run under 100 ms. Multiply by four for a student
 * laptop.
 */
import { it } from 'vitest'
import { parseSym, parseSymOrThrow } from '../input/symParser'
import { builtInScenario, builtInScenarios } from '../scenarios'
import { configFor } from './presets'
import { LisaRun, applyScenarioParameters } from './run'
import { OBJ, PRED, P, SP } from './network'

function now(): number {
  return performance.now()
}

it('probe: timing and reference comparison', () => {
  const sc = parseSymOrThrow(builtInScenario('lovetri9').sym)
  const cfg = applyScenarioParameters(configFor('Hummel2007'), sc)

  // One iteration: average over a whole run.
  let run = new LisaRun(sc, cfg, 1)
  let iters = 0
  const t0 = now()
  while (run.step()) iters++
  const perRun = now() - t0
  console.log(`[timing] lovetri9: ${iters} iterations in ${perRun.toFixed(1)} ms → ${((perRun * 1000) / iters).toFixed(2)} µs/iteration`)

  // Batch of 20 seeds.
  const t1 = now()
  const rows: string[] = []
  let correct = 0
  const objW: number[] = []
  const propW: number[] = []
  const spW: number[] = []
  const predW: number[] = []
  const tdAt: number[] = []
  const rounds: number[] = []
  for (let seed = 1; seed <= 20; seed++) {
    run = new LisaRun(sc, cfg, seed)
    run.runToEnd()
    const amy = run.bestMapping(0, 'AMY', 1)
    const bill = run.bestMapping(0, 'BILL', 1)
    const cat = run.bestMapping(0, 'CAT', 1)
    const ok = amy?.to === 'ABE' && bill?.to === 'BETH' && cat?.to === 'CHAD'
    if (ok) correct++
    rows.push(`${seed}:${ok ? '✓' : '✗'} AMY→${amy?.to}(${amy?.weight.toFixed(3)}) BILL→${bill?.to}(${bill?.weight.toFixed(3)}) CAT→${cat?.to}(${cat?.weight.toFixed(3)})`)
    for (const e of run.mappings(0, 1, OBJ)) objW.push(e.weight)
    for (const e of run.mappings(0, 1, P)) propW.push(e.weight)
    for (const e of run.mappings(0, 1, SP)) spW.push(e.weight)
    for (const e of run.mappings(0, 1, PRED)) predW.push(e.weight)
    for (const r of run.records) {
      tdAt.push(r.topDownAt)
      if (r.settleRounds !== undefined) rounds.push(r.settleRounds)
    }
  }
  const batch = now() - t1
  const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : NaN)
  const max = (xs: number[]) => Math.max(...xs)
  console.log(`[timing] 20 seeds in ${batch.toFixed(0)} ms`)
  console.log(`[lovetri9] correct ${correct}/20 (Hummel 2007: 10/10)`)
  console.log(`[lovetri9] mean final weights: P ${mean(propW).toFixed(3)} (ref .990), SP ${mean(spW).toFixed(3)} (ref .993), pred ${mean(predW).toFixed(3)} (ref .968), obj ${mean(objW).toFixed(3)} (ref .968); max obj ${max(objW).toFixed(3)}`)
  console.log(`[lovetri9] topDownOK first true at iteration: mean ${mean(tdAt).toFixed(0)}, min ${Math.min(...tdAt)}, max ${Math.max(...tdAt)}; Vers142 settle rounds mean ${mean(rounds).toFixed(0)}`)
  console.log('[lovetri9] ' + rows.join('\n[lovetri9] '))
  run = new LisaRun(sc, cfg, 1)
  run.runToEnd()
  console.log('[lovetri9 seed 1]\n' + run.mappingReport())
  console.log('[lovetri9 seed 1] phase sets: ' + JSON.stringify(run.records.map((r) => ({ props: r.props, tdAt: r.topDownAt, firings: r.firings, rounds: r.settleRounds }))))

  // The other built-ins: run once each, report warnings and the driver→recipient mapping.
  for (const b of builtInScenarios) {
    if (b.id === 'lovetri9') continue
    const res = parseSym(b.sym)
    const c = applyScenarioParameters(configFor('Hummel2007'), res.scenario)
    const warnings: string[] = []
    const t = now()
    const r = new LisaRun(res.scenario, c, 1, { onWarning: (m) => warnings.push(m) })
    r.runToEnd()
    console.log(`[${b.id}] ${(now() - t).toFixed(0)} ms; parse warnings: ${res.warnings.map((w) => w.message).join('; ') || 'none'}; run warnings: ${warnings.join('; ') || 'none'}`)
    console.log(`[${b.id}]\n` + r.mappingReport())
  }
})
