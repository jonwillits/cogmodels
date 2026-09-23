import { useMemo, useState } from 'react'
import { TracePlot, type TraceMarker, type TraceTrack } from '../../components/TracePlot'
import type { LisaRun } from '../../models/lisa/engine/run'
import type { TraceRecorder } from '../../models/lisa/engine/traces'
import { OBJ, P, PRED, SP, type UnitType } from '../../models/lisa/engine/network'
import { palette } from '../../theme/theme'
import styles from './LisaDemo.module.css'

const TYPE_COLOR: Record<UnitType, string> = { [P]: palette.unitP, [SP]: palette.unitSP, [PRED]: palette.unitPred, [OBJ]: palette.unitObj }

type SemMode = 'none' | 'active' | 'all'

export function SynchronyView({ run, traces, tick }: { run: LisaRun; traces: TraceRecorder; tick: number }) {
  const [semMode, setSemMode] = useState<SemMode>('active')
  const [onlyPhaseSet, setOnlyPhaseSet] = useState(true)
  void tick
  const { net, sim } = run
  const keys = traces.trackedKeys
  const keyIndex = useMemo(() => {
    const m = new Map<string, number>()
    keys.forEach((k, i) => m.set(`${k.kind}:${k.index}`, i))
    return m
  }, [keys])

  const tracks: TraceTrack[] = []
  const add = (label: string, color: string, kind: 'unit' | 'predSem' | 'objSem', index: number, group?: string) => {
    const k = keyIndex.get(`${kind}:${index}`)
    if (k === undefined) return
    tracks.push({ label, color, samples: traces.samples(k), group })
  }
  const ph = sim.phase
  const driverUnits = (() => {
    if (sim.driver < 0) return []
    if (onlyPhaseSet && ph) return [...ph.props, ...ph.sps, ...ph.preds, ...ph.objs, ...ph.childProps]
    const a = net.analogs[sim.driver]
    return [...a.p, ...a.sp, ...a.pred, ...a.obj]
  })()
  driverUnits.forEach((id, i) => {
    const u = net.units[id]
    add(`${u.name}`, TYPE_COLOR[u.type], 'unit', id, i === 0 ? `driver ${net.analogs[sim.driver]?.name}` : undefined)
  })
  for (const ai of [...sim.recips, ...sim.dormant]) {
    const a = net.analogs[ai]
    ;[...a.p, ...a.sp, ...a.pred, ...a.obj].forEach((id, i) => {
      const u = net.units[id]
      add(u.name, TYPE_COLOR[u.type], 'unit', id, i === 0 ? a.name : undefined)
    })
  }
  if (semMode !== 'none') {
    let first = true
    const consider = (kind: 'predSem' | 'objSem', names: string[]) => {
      names.forEach((name, i) => {
        const k = keyIndex.get(`${kind}:${i}`)
        if (k === undefined) return
        const s = traces.samples(k)
        if (semMode === 'active') {
          let mx = 0
          for (let j = 0; j < s.length; j++) if (Math.abs(s[j]) > mx) mx = Math.abs(s[j])
          if (mx < 0.1) return
        }
        tracks.push({ label: name, color: palette.unitSem, samples: s, group: first ? 'semantics' : undefined })
        first = false
      })
    }
    consider('predSem', net.predSem)
    consider('objSem', net.objSem)
  }
  const markers: TraceMarker[] = traces.events.map((e) => ({ at: e.at - traces.windowStart, kind: e.kind, label: e.label }))

  return (
    <div className={styles.synchronyWrap}>
      <div className={styles.viewBar}>
        <label className={styles.check}>
          <input type="checkbox" checked={onlyPhaseSet} onChange={(e) => setOnlyPhaseSet(e.target.checked)} /> driver: phase-set units only
        </label>
        <label className={styles.check}>
          semantics{' '}
          <select value={semMode} onChange={(e) => setSemMode(e.target.value as SemMode)}>
            <option value="none">none</option>
            <option value="active">active in window</option>
            <option value="all">all</option>
          </select>
        </label>
        <span className={styles.muted}>
          window: last {traces.length} iterations · {tracks.length} tracks
        </span>
      </div>
      <TracePlot tracks={tracks} markers={markers} window={traces.length} />
    </div>
  )
}
