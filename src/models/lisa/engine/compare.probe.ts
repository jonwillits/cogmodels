/**
 * Run a built-in scenario under a preset for N seeds and print a summary in
 * the same shape as reference/pylisa/analyze.py, for side-by-side comparison
 * with Hummel's code.
 *
 *   PROBE=1 SCENARIO=lovetri9 PRESET=HummelSuite03 SEEDS=10 npx vitest run --disable-console-intercept src/models/lisa/engine/compare.probe.ts
 */
import { it } from 'vitest'
import { parseSymOrThrow } from '../input/symParser'
import { builtInScenario } from '../scenarios'
import { configFor } from './presets'
import type { PresetId } from './config'
import { LisaRun, applyScenarioParameters } from './run'
import { OBJ, P, type UnitType } from './network'

it('probe: compare', () => {
  const id = process.env.SCENARIO ?? 'lovetri9'
  const preset = (process.env.PRESET ?? 'Hummel2007') as PresetId
  const seeds = parseInt(process.env.SEEDS ?? '10', 10)
  const from = parseInt(process.env.FROM ?? '0', 10)
  const to = parseInt(process.env.TO ?? '1', 10)
  const sc = parseSymOrThrow(builtInScenario(id).sym)
  const cfg = applyScenarioParameters(configFor(preset), sc)
  const tds: number[] = []
  const rounds: number[] = []
  console.log(`=== ${id} ${preset} (cogmodels engine) ===`)
  for (let seed = 1; seed <= seeds; seed++) {
    const run = new LisaRun(sc, cfg, seed)
    run.runToEnd()
    const parts: string[] = []
    for (const [label, t] of [
      ['Obj', OBJ],
      ['P', P],
    ] as [string, UnitType][]) {
      const best = new Map<string, { to: string; weight: number }>()
      for (const e of run.mappings(from, to, t)) {
        const b = best.get(e.from)
        if (!b || e.weight > b.weight) best.set(e.from, { to: e.to, weight: e.weight })
      }
      parts.push(
        `${label}:{${[...best.entries()]
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([u, v]) => `${u}->${v.to}(${v.weight.toFixed(3)})`)
          .join(', ')}}`,
      )
    }
    console.log(`run ${String(seed).padStart(2)}  ${parts.join(' ')}`)
    for (const r of run.records) {
      tds.push(r.topDownAt)
      if (r.settleRounds !== undefined) rounds.push(r.settleRounds)
    }
  }
  const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : NaN)
  console.log(`topDownAt mean ${mean(tds).toFixed(0)} min ${Math.min(...tds)} max ${Math.max(...tds)}; settle rounds mean ${mean(rounds).toFixed(0)}`)
})
