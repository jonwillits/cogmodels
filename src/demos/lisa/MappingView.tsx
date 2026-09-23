import { useState } from 'react'
import { InfoIcon } from '../../components/Info'
import { Matrix } from '../../components/Matrix'
import { mappingQuality } from '../../models/lisa/engine/mapping'
import { TYPE_NAMES, type UnitType } from '../../models/lisa/engine/network'
import type { LisaRun } from '../../models/lisa/engine/run'
import type { MappingSnapshot } from './useLisaController'
import { palette } from '../../theme/theme'
import styles from './LisaDemo.module.css'

const TYPE_COLOR = [palette.unitP, palette.unitSP, palette.unitPred, palette.unitObj]

export function MappingView({ run, history, tick, onInfo }: { run: LisaRun; history: MappingSnapshot[]; tick: number; onInfo: (id: string) => void }) {
  const [at, setAt] = useState<number | 'live'>('live')
  const [hyp, setHyp] = useState(false)
  const [pairIdx, setPairIdx] = useState(0)
  void tick
  const { net, sim } = run
  const live = at === 'live' || at >= history.length
  const snap = live ? null : history[at as number]
  // Before the first phase set, show the pair that is about to run.
  const upcoming = sim.driver < 0 ? run.scenario.sequence[run.sequenceIndex + 1] : null
  const driver = upcoming ? upcoming.driver : sim.driver
  const others = upcoming ? net.analogs.map((a) => a.index).filter((i) => i !== upcoming.driver) : [...sim.recips, ...sim.dormant]
  const pairs: { from: number; to: number }[] = snap ? snap.pairs : driver >= 0 ? others.map((to) => ({ from: driver, to })) : []
  const pair = pairs[Math.min(pairIdx, Math.max(0, pairs.length - 1))]

  return (
    <div className={styles.mappingWrap}>
      <div className={styles.viewBar}>
        <label className={styles.check}>
          history{' '}
          <input type="range" min={0} max={history.length} value={live ? history.length : (at as number)} onChange={(e) => setAt(parseInt(e.target.value, 10) >= history.length ? 'live' : parseInt(e.target.value, 10))} />{' '}
          <span className={styles.mono}>{live ? 'live' : `after phase set ${snap!.label}`}</span>
        </label>
        {live && (
          <label className={styles.check}>
            <input type="checkbox" checked={hyp} onChange={(e) => setHyp(e.target.checked)} /> show hypotheses (this phase set)
          </label>
        )}
        {pairs.length > 1 && (
          <label className={styles.check}>
            pair{' '}
            <select value={pairIdx} onChange={(e) => setPairIdx(parseInt(e.target.value, 10))}>
              {pairs.map((p, i) => (
                <option key={i} value={i}>
                  {net.analogs[p.from].name} → {net.analogs[p.to].name}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
      {!pair ? (
        <p className={styles.muted}>No driver–recipient pair yet.</p>
      ) : (
        <div>
          {([0, 1, 2, 3] as UnitType[]).map((t) => {
            const m = snap ? snap.matrices[`${pair.from}>${pair.to}>${t}`] : run.matrix(pair.from, pair.to, t, hyp && live ? 'h' : 'w')
            if (!m) return null
            const max = hyp && live ? Math.max(1, ...m.values) : 1
            const bestInRow = new Map<number, number>()
            m.rows.forEach((_, r) => {
              let best = -1
              let bv = 0
              m.cols.forEach((__, c) => {
                const v = m.values[r * m.cols.length + c]
                if (v > bv) {
                  bv = v
                  best = c
                }
              })
              bestInRow.set(r, best)
            })
            return <Matrix key={t} title={`${TYPE_NAMES[t]} units${hyp && live ? ' (hypotheses)' : ''}`} rows={m.rows} cols={m.cols} values={m.values} max={max} color={TYPE_COLOR[t]} rowLabel={net.analogs[pair.from].name} colLabel={net.analogs[pair.to].name} highlight={(r, c, v) => v > 0 && bestInRow.get(r) === c} />
          })}
          <div className={styles.qualityRow}>
            <strong>
              Mapping quality <InfoIcon id="map.quality" onOpen={onInfo} label="mapping quality" />
            </strong>
            {sim.recips.map((ai) => {
              const q = mappingQuality(net, sim.conns, ai, sim.driver)
              const empty = net.analogs[ai].units.length === 0
              return (
                <span key={ai} className={styles.mono}>
                  {net.analogs[ai].name}: {q.toFixed(3)} {empty ? '(empty analog: always licensed)' : q >= run.cfg.sslThreshold ? '≥ threshold, learning licensed' : '< threshold'}
                </span>
              )
            })}
            {sim.recips.length === 0 && <span className={styles.muted}>no recipients in this phase set</span>}
          </div>
        </div>
      )}
    </div>
  )
}
