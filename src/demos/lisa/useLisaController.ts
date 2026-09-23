/**
 * Owns the LISA run for the demo: scenario, preset and overrides, seed, the
 * run itself, the trace recorder, the mapping history, and the animation
 * loop. The run, traces and history form one "session" object that is
 * rebuilt whenever its inputs change (or on reset); the session is mutated
 * in place by stepping and views re-render on `tick`. Nothing here imports
 * React components.
 */
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { LisaConfig, LisaConfigKey, PresetId } from '../../models/lisa/engine/config'
import { configFor } from '../../models/lisa/engine/presets'
import { LisaRun, applyScenarioParameters } from '../../models/lisa/engine/run'
import { TraceRecorder, type TraceKey } from '../../models/lisa/engine/traces'
import type { UnitType } from '../../models/lisa/engine/network'
import { parseSym } from '../../models/lisa/input/symParser'
import { builtInScenario } from '../../models/lisa/scenarios'
import { randomSeed } from '../../models/random'

export interface MappingSnapshot {
  /** Index of the phase set that just ended. */
  phase: number
  label: string
  pairs: { from: number; to: number }[]
  /** Keyed `${from}>${to}>${type}`. */
  matrices: Record<string, { rows: string[]; cols: string[]; values: Float64Array }>
}

interface Session {
  run: LisaRun | null
  traces: TraceRecorder
  history: MappingSnapshot[]
  warnings: string[]
  error: string | null
}

export interface LisaController {
  scenarioId: string
  setScenarioId: (id: string) => void
  presetId: PresetId
  setPresetId: (id: PresetId) => void
  overrides: Partial<LisaConfig>
  setOverride: <K extends LisaConfigKey>(key: K, value: LisaConfig[K]) => void
  clearOverrides: () => void
  cfg: LisaConfig
  seed: number
  setSeed: (s: number) => void
  newSeed: () => void
  parseErrors: { line: number; message: string }[]
  parseWarnings: { line: number; message: string }[]
  runWarnings: string[]
  error: string | null
  run: LisaRun | null
  traces: TraceRecorder
  history: MappingSnapshot[]
  tick: number
  playing: boolean
  setPlaying: (p: boolean) => void
  speed: number
  setSpeed: (s: number) => void
  reset: () => void
  step: (n: number) => void
  stepToNextSP: () => void
  stepToEndOfPhaseSet: () => void
  runToEnd: () => void
}

const MAX_STEPS = 500_000

function snapshot(run: LisaRun, history: MappingSnapshot[]): void {
  const rec = run.records[run.records.length - 1]
  const driver = run.net.analogs.findIndex((a) => a.name === rec.driver)
  const recips = rec.recips.map((n) => run.net.analogs.findIndex((a) => a.name === n))
  const matrices: MappingSnapshot['matrices'] = {}
  const pairs = recips.map((to) => ({ from: driver, to }))
  for (const { from, to } of pairs) {
    for (let t = 0 as UnitType; t <= 3; t = (t + 1) as UnitType) matrices[`${from}>${to}>${t}`] = run.matrix(from, to, t)
  }
  history.push({ phase: rec.index, label: `${rec.index + 1}: ${rec.props.join(' ')}${rec.updateMapping ? ' h' : ''}`, pairs, matrices })
}

/** One engine step with the demo's bookkeeping. Returns false when the run is done. */
function stepOnce(s: Session): boolean {
  const run = s.run!
  const alive = run.step()
  s.traces.record(run)
  if (run.phase === null && run.records.length > s.history.length) snapshot(run, s.history)
  return alive
}

function buildSession(parsed: ReturnType<typeof parseSym>, cfg: LisaConfig, seed: number): Session {
  const traces = new TraceRecorder(2000)
  if (parsed.errors.length) {
    const e = parsed.errors[0]
    return { run: null, traces, history: [], warnings: [], error: `scenario does not parse: line ${e.line}: ${e.message}` }
  }
  try {
    const warnings: string[] = []
    const run = new LisaRun(parsed.scenario, cfg, seed, { onWarning: (m) => warnings.push(m) })
    const keys: TraceKey[] = []
    run.net.units.forEach((u) => keys.push({ kind: 'unit', index: u.id }))
    run.net.predSem.forEach((_, i) => keys.push({ kind: 'predSem', index: i }))
    run.net.objSem.forEach((_, i) => keys.push({ kind: 'objSem', index: i }))
    traces.setKeys(keys)
    return { run, traces, history: [], warnings, error: null }
  } catch (e) {
    return { run: null, traces, history: [], warnings: [], error: e instanceof Error ? e.message : String(e) }
  }
}

export function useLisaController(): LisaController {
  const [scenarioId, setScenarioId] = useState('lovetri9')
  const [presetId, setPresetId] = useState<PresetId>('Hummel2007')
  const [overrides, setOverrides] = useState<Partial<LisaConfig>>({})
  const [seed, setSeed] = useState(1)
  const [speed, setSpeed] = useState(8)
  const [playing, setPlaying] = useState(false)
  const [tick, setTick] = useState(0)
  const [resetNonce, setResetNonce] = useState(0)

  const sym = useMemo(() => builtInScenario(scenarioId).sym, [scenarioId])
  const parsed = useMemo(() => parseSym(sym), [sym])
  const cfg = useMemo(() => applyScenarioParameters({ ...configFor(presetId), ...overrides }, parsed.scenario), [presetId, overrides, parsed])
  // The session is rebuilt when any input changes; `resetNonce` forces a rebuild with the same inputs.
  const session = useMemo(() => buildSession(parsed, cfg, seed), [parsed, cfg, seed, resetNonce]) // eslint-disable-line react-hooks/exhaustive-deps

  const bump = useCallback(() => setTick((t) => t + 1), [])

  const reset = useCallback(() => {
    setPlaying(false)
    setResetNonce((n) => n + 1)
  }, [])

  const stepWhile = useCallback(
    (cont: (run: LisaRun) => boolean, cap = MAX_STEPS) => {
      const run = session.run
      if (!run || run.done) return
      for (let i = 0; i < cap; i++) {
        if (!stepOnce(session)) break
        if (!cont(run)) break
      }
      bump()
    },
    [session, bump],
  )

  const step = useCallback(
    (n: number) => {
      let left = n
      stepWhile(() => --left > 0, n)
    },
    [stepWhile],
  )

  const stepToNextSP = useCallback(() => {
    const run = session.run
    if (!run) return
    const phase = run.phase?.index ?? run.sequenceIndex + 1
    const start = run.firingSPOn
    stepWhile((r) => {
      if (r.phase === null || r.phase.index !== phase) return false
      const f = r.firingSPOn
      return !(f >= 0 && f !== start)
    })
  }, [session, stepWhile])

  const stepToEndOfPhaseSet = useCallback(() => stepWhile((r) => r.phase !== null), [stepWhile])
  const runToEnd = useCallback(() => stepWhile(() => true), [stepWhile])

  // The animation loop: `speed` iterations per frame, with a clamp on the time spent.
  useEffect(() => {
    if (!playing) return
    let raf = 0
    const frame = () => {
      const run = session.run
      if (!run || run.done) {
        setPlaying(false)
        return
      }
      const t0 = performance.now()
      for (let i = 0; i < speed; i++) {
        if (!stepOnce(session)) {
          setPlaying(false)
          break
        }
        if (performance.now() - t0 > 12) break
      }
      bump()
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [playing, speed, session, bump])

  const setOverride = useCallback(<K extends LisaConfigKey>(key: K, value: LisaConfig[K]) => {
    setOverrides((o) => ({ ...o, [key]: value }))
  }, [])

  return {
    scenarioId,
    setScenarioId,
    presetId,
    setPresetId: (id) => {
      setPresetId(id)
      setOverrides({})
    },
    overrides,
    setOverride,
    clearOverrides: () => setOverrides({}),
    cfg,
    seed,
    setSeed,
    newSeed: () => setSeed(randomSeed() % 100000),
    parseErrors: parsed.errors,
    parseWarnings: parsed.warnings,
    runWarnings: session.warnings,
    error: session.error,
    run: session.run,
    traces: session.traces,
    history: session.history,
    tick,
    playing,
    setPlaying,
    speed,
    setSpeed,
    reset,
    step,
    stepToNextSP,
    stepToEndOfPhaseSet,
    runToEnd,
  }
}
