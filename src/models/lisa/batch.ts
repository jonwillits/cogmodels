/**
 * Batch runs: N seeds of one scenario under one configuration, summarized
 * per run (spec §10 Batch tab, §9.4). Plain TS, used on the main thread by
 * the tests and inside the Web Worker by the demo.
 */
import type { LisaConfig } from './engine/config'
import { LisaRun, applyScenarioParameters } from './engine/run'
import { parseSymOrThrow } from './input/symParser'
import type { UnitType } from './engine/network'
import { key, outcomeFor, type BestMap, type RunSummary } from './scenarios/outcomes'

export interface BatchRequest {
  /** A built-in scenario id, used to pick the outcome test. */
  scenarioId: string
  sym: string
  cfg: LisaConfig
  seeds: number[]
}

export interface BatchResult {
  scenarioId: string
  runs: RunSummary[]
  /** Runs whose outcome test passed, or null when the scenario has no test. */
  correct: number | null
  reference: string
  /** Per `${from}>${to}>${type}`, per unit, how often each target was the best mapping. */
  distributions: Record<string, Record<string, Record<string, number>>>
  ms: number
}

export function summarize(run: LisaRun): RunSummary {
  const best: Record<string, BestMap> = {}
  const n = run.net.analogs.length
  for (let a = 0; a < n; a++) {
    for (let b = 0; b < n; b++) {
      if (a === b) continue
      for (let t = 0 as UnitType; t <= 3; t = (t + 1) as UnitType) {
        const m: BestMap = {}
        for (const e of run.mappings(a, b, t)) {
          if (!m[e.from] || e.weight > m[e.from].weight) m[e.from] = { to: e.to, weight: e.weight }
        }
        if (Object.keys(m).length) best[key(a, b, t)] = m
      }
    }
  }
  return {
    seed: run.seed,
    best,
    topDownAt: run.records.map((r) => r.topDownAt),
    firingSpread: run.records.map((r) => {
      const f = Object.values(r.firings)
      return f.length ? Math.max(...f) - Math.min(...f) : 0
    }),
    settleRounds: run.records.map((r) => r.settleRounds ?? -1),
    mappingQuality: run.records.map((r) => r.mappingQuality ?? {}),
  }
}

export function runBatch(req: BatchRequest, onProgress?: (done: number, total: number) => void): BatchResult {
  const t0 = performance.now()
  const scenario = parseSymOrThrow(req.sym)
  const cfg = applyScenarioParameters(req.cfg, scenario)
  const outcome = outcomeFor(req.scenarioId)
  const runs: RunSummary[] = []
  let correct = 0
  req.seeds.forEach((seed, i) => {
    const run = new LisaRun(scenario, cfg, seed)
    run.runToEnd()
    const s = summarize(run)
    runs.push(s)
    if (outcome.test && outcome.test(s)) correct++
    onProgress?.(i + 1, req.seeds.length)
  })
  const distributions: BatchResult['distributions'] = {}
  for (const s of runs) {
    for (const [k, m] of Object.entries(s.best)) {
      const d = (distributions[k] ??= {})
      for (const [u, v] of Object.entries(m)) {
        const du = (d[u] ??= {})
        du[v.to] = (du[v.to] ?? 0) + 1
      }
    }
  }
  return {
    scenarioId: req.scenarioId,
    runs,
    correct: outcome.test ? correct : null,
    reference: outcome.reference,
    distributions,
    ms: performance.now() - t0,
  }
}

export type BatchMessage = { type: 'progress'; done: number; total: number } | { type: 'done'; result: BatchResult } | { type: 'error'; message: string }
