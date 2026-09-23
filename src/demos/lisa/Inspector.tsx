import { InfoIcon } from '../../components/Info'
import { fmt } from '../../components/format'
import { OBJ, P, PRED, SP, TYPE_NAMES } from '../../models/lisa/engine/network'
import type { LisaRun } from '../../models/lisa/engine/run'
import { palette } from '../../theme/theme'
import styles from './LisaDemo.module.css'

export function Inspector({ run, id, tick, onClose, onInfo }: { run: LisaRun; id: number; tick: number; onClose: () => void; onInfo: (id: string) => void }) {
  void tick
  const { net, sim } = run
  const u = net.units[id]
  if (!u) return null
  const inputs = run.unitInputs(id)
  const parts: [string, number, string][] = [
    ['bu', inputs.bu, palette.ok],
    ['td', inputs.td, palette.accent],
    ['lat', inputs.lat, palette.warn],
    ['hebb×bias', inputs.hebb, palette.unitSem],
  ]
  const scale = Math.max(1, ...parts.map(([, v]) => Math.abs(v)))
  const conns = run.connectionsOf(id).sort((a, b) => b.weight - a.weight || b.hypothesis - a.hypothesis)
  const role = u.analog === sim.driver ? 'driver' : sim.recips.includes(u.analog) ? 'recipient' : 'dormant'

  return (
    <div className={styles.inspector}>
      <div className={styles.inspHead}>
        <span className={styles.inspTitle}>
          {u.name} <span className={styles.muted}>{TYPE_NAMES[u.type]} · {net.analogs[u.analog].name} ({role})</span>
        </span>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close" title="Close (Esc)">
          ×
        </button>
      </div>
      <div className={styles.inspBody}>
        <div className={styles.kv}>
          <span>activation</span>
          <b className={styles.mono}>{fmt(sim.act[id], 3)}</b>
          <span>retrieved</span>
          <b className={styles.mono}>{sim.retrieved[id] ? 'yes' : 'no'}</b>
          {u.type === P && (
            <>
              <span>
                mode <InfoIcon id="insp.mode" onOpen={onInfo} label="mode" />
              </span>
              <b className={styles.mono}>{sim.mode[id] === 1 ? 'parent ▲' : sim.mode[id] === -1 ? 'child ▼' : 'neutral'}</b>
              <span>
                importance / readiness / support <InfoIcon id="insp.support" onOpen={onInfo} label="priority" />
              </span>
              <b className={styles.mono}>
                {fmt(u.importance, 2)} / {fmt(sim.readiness[id], 2)} / {fmt(sim.support[id], 2)}
              </b>
            </>
          )}
          {u.type === SP && (
            <>
              <span>
                inhibitor / sti <InfoIcon id="insp.inhibitor" onOpen={onInfo} label="inhibitor" />
              </span>
              <b className={styles.mono}>
                {fmt(sim.inhibitor[id], 3)} / {fmt(sim.sti[id], 3)}
              </b>
              <span>times fired (code counter)</span>
              <b className={styles.mono}>{sim.timesFired[id]}</b>
            </>
          )}
        </div>

        <h4>
          Net input, last iteration <InfoIcon id="insp.inputs" onOpen={onInfo} label="net input" />
        </h4>
        <div className={styles.bars}>
          {parts.map(([label, v, color]) => (
            <div key={label} className={styles.barRow}>
              <span className={styles.barLabel}>{label}</span>
              <span className={styles.barTrack}>
                <span className={styles.barZero} />
                <span className={styles.barFill} style={{ background: color, left: v < 0 ? `${50 + (50 * v) / scale}%` : '50%', width: `${(50 * Math.abs(v)) / scale}%` }} />
              </span>
              <span className={`${styles.mono} ${styles.barVal}`}>{fmt(v, 3)}</span>
            </div>
          ))}
          <div className={styles.barRow}>
            <span className={styles.barLabel}>net</span>
            <span />
            <b className={`${styles.mono} ${styles.barVal}`}>{fmt(inputs.net, 3)}</b>
          </div>
        </div>

        {(u.type === PRED || u.type === OBJ) && (
          <>
            <h4>Semantic weights</h4>
            <div className={styles.chips}>
              {u.sem.map((s, k) => {
                const name = u.type === PRED ? net.predSem[s] : net.objSem[s]
                const act = u.type === PRED ? sim.predSemAct[s] : sim.objSemAct[s]
                return (
                  <span key={s} className={styles.chip} title={`weight ${fmt(u.semW[k], 2)}, activation ${fmt(act, 3)}`} style={{ opacity: 0.45 + 0.55 * Math.min(1, Math.abs(act)) }}>
                    {name}
                    {u.semW[k] !== 1 ? ` (${fmt(u.semW[k], 2)})` : ''}
                  </span>
                )
              })}
            </div>
          </>
        )}

        <h4>
          Mapping connections <InfoIcon id="insp.connections" onOpen={onInfo} label="mapping connections" />
        </h4>
        {conns.length === 0 ? (
          <p className={styles.muted}>none yet</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>to</th>
                <th>analog</th>
                <th>weight</th>
                <th>hypothesis</th>
              </tr>
            </thead>
            <tbody>
              {conns.slice(0, 12).map((c) => (
                <tr key={c.other}>
                  <td className={styles.mono}>{net.units[c.other].name}</td>
                  <td className={styles.muted}>{net.analogs[c.analog].name}</td>
                  <td className={styles.mono}>{fmt(c.weight, 3)}</td>
                  <td className={styles.mono}>{fmt(c.hypothesis, 2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
