import { useState } from 'react'
import { Button } from '../../components/controls'
import type { BatchResult } from '../../models/lisa/batch'
import type { LisaConfig } from '../../models/lisa/engine/config'
import { TYPE_NAMES } from '../../models/lisa/engine/network'
import { builtInScenario } from '../../models/lisa/scenarios'
import type { BatchWorker } from './useBatchWorker'
import styles from './LisaDemo.module.css'

export function BatchView({ scenarioId, cfg, worker, analogNames }: { scenarioId: string; cfg: LisaConfig; worker: BatchWorker; analogNames: string[] }) {
  const [n, setN] = useState(20)
  const [progress, setProgress] = useState<[number, number] | null>(null)
  const [result, setResult] = useState<BatchResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const start = async () => {
    setError(null)
    setResult(null)
    setProgress([0, n])
    try {
      const r = await worker.run({ scenarioId, sym: builtInScenario(scenarioId).sym, cfg, seeds: Array.from({ length: n }, (_, i) => i + 1) }, (d, t) => setProgress([d, t]))
      setResult(r)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setProgress(null)
    }
  }

  return (
    <div className={styles.batchWrap}>
      <div className={styles.viewBar}>
        <label className={styles.check}>
          seeds 1…
          <input type="number" min={1} max={500} value={n} onChange={(e) => setN(Math.max(1, parseInt(e.target.value, 10) || 1))} className={styles.numInput} />
        </label>
        <Button variant="primary" onClick={start} disabled={worker.busy}>
          Run batch
        </Button>
        {progress && (
          <span className={styles.progress}>
            <span className={styles.progressBar} style={{ width: `${(100 * progress[0]) / progress[1]}%` }} />
            <span className={styles.progressText}>
              {progress[0]} / {progress[1]}
            </span>
          </span>
        )}
        {error && <span className={styles.error}>{error}</span>}
      </div>
      {result && (
        <div>
          <p>
            <strong>Outcome:</strong>{' '}
            {result.correct === null ? 'no reference outcome for this scenario' : `${result.correct} / ${result.runs.length} runs (${Math.round((100 * result.correct) / result.runs.length)}%)`}
            <span className={styles.muted}> · {result.reference}</span>
            <span className={styles.muted}> · {result.ms.toFixed(0)} ms in the worker</span>
          </p>
          <p className={styles.muted}>
            Top-down released at iteration (mean over phase sets): {mean(result.runs.flatMap((r) => r.topDownAt.filter((x) => x >= 0))).toFixed(0)} · firing spread (max − min firings per phase set): {mean(result.runs.flatMap((r) => r.firingSpread)).toFixed(2)}
            {result.runs.some((r) => r.settleRounds.some((x) => x >= 0)) && <> · Vers142 settle rounds: {mean(result.runs.flatMap((r) => r.settleRounds.filter((x) => x >= 0))).toFixed(0)}</>}
          </p>
          {Object.entries(result.distributions)
            .sort()
            .map(([k, byUnit]) => {
              const [from, to, t] = k.split('>').map(Number)
              return (
                <div key={k} className={styles.distBlock}>
                  <div className={styles.distTitle}>
                    {analogNames[from]} → {analogNames[to]}: {TYPE_NAMES[t]} units
                  </div>
                  <table className={styles.table}>
                    <tbody>
                      {Object.entries(byUnit).map(([u, targets]) => (
                        <tr key={u}>
                          <td className={styles.mono}>{u}</td>
                          <td>
                            {Object.entries(targets)
                              .sort((a, b) => b[1] - a[1])
                              .map(([tgt, c]) => (
                                <span key={tgt} className={styles.chip}>
                                  {tgt} <b>{c}</b>
                                </span>
                              ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}

function mean(xs: number[]): number {
  return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : NaN
}
