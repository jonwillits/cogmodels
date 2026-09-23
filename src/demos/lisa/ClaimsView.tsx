import { useState } from 'react'
import { Button } from '../../components/controls'
import type { BatchResult } from '../../models/lisa/batch'
import { claims, type Claim, type ClaimSwitch } from '../../models/lisa/claims'
import type { LisaConfig } from '../../models/lisa/engine/config'
import { builtInScenario } from '../../models/lisa/scenarios'
import type { BatchWorker } from './useBatchWorker'
import styles from './LisaDemo.module.css'

interface CompareResult {
  label: string
  paper: BatchResult
  code: BatchResult
}

function summary(r: BatchResult, measure: Claim['measure']): string {
  if (measure === 'timeSharing') {
    const spreads = r.runs.flatMap((x) => x.firingSpread)
    const clean = spreads.filter((s) => s <= 1).length
    return `clean time-sharing in ${clean}/${spreads.length} phase sets (mean spread ${(spreads.reduce((a, b) => a + b, 0) / spreads.length).toFixed(2)})`
  }
  return r.correct === null ? 'no reference outcome' : `${r.correct}/${r.runs.length} correct`
}

export function ClaimsView({ scenarioId, cfg, worker, openId }: { scenarioId: string; cfg: LisaConfig; worker: BatchWorker; openId: string | null }) {
  const [open, setOpen] = useState<Set<string>>(new Set(openId ? [openId] : []))
  const [n, setN] = useState(10)
  const [results, setResults] = useState<Record<string, CompareResult>>({})
  const [running, setRunning] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  if (openId && !open.has(openId)) setOpen(new Set([...open, openId]))

  const compare = async (claim: Claim, switches: ClaimSwitch[], label: string) => {
    const key = `${claim.id}:${label}`
    setRunning(key)
    setError(null)
    const seeds = Array.from({ length: n }, (_, i) => i + 1)
    const sym = builtInScenario(claim.scenario).sym
    const paperCfg = { ...cfg } as Record<string, unknown>
    const codeCfg = { ...cfg } as Record<string, unknown>
    for (const s of switches) {
      paperCfg[s.key] = s.paper
      codeCfg[s.key] = s.code
    }
    try {
      const paper = await worker.run({ scenarioId: claim.scenario, sym, cfg: paperCfg as unknown as LisaConfig, seeds })
      const code = await worker.run({ scenarioId: claim.scenario, sym, cfg: codeCfg as unknown as LisaConfig, seeds })
      setResults((r) => ({ ...r, [key]: { label, paper, code } }))
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setRunning(null)
    }
  }

  return (
    <div className={styles.claimsWrap}>
      <div className={styles.viewBar}>
        <span className={styles.muted}>Compare runs the claim’s scenario ({claims.map((c) => c.scenario).filter((v, i, a) => a.indexOf(v) === i).join(', ')}) under both settings, everything else as currently configured.</span>
        <label className={styles.check}>
          seeds{' '}
          <input type="number" min={1} max={200} value={n} onChange={(e) => setN(Math.max(1, parseInt(e.target.value, 10) || 1))} className={styles.numInput} />
        </label>
        {error && <span className={styles.error}>{error}</span>}
      </div>
      {claims.map((c) => {
        const isOpen = open.has(c.id)
        return (
          <div key={c.id} className={styles.claim} id={`claim-${c.id}`}>
            <button
              type="button"
              className={styles.claimHead}
              onClick={() =>
                setOpen((s) => {
                  const next = new Set(s)
                  if (next.has(c.id)) next.delete(c.id)
                  else next.add(c.id)
                  return next
                })
              }
            >
              <span className={styles.tierBadge}>{c.audit ? `audit ${c.audit}` : 'finding'} · tier {c.tier}</span>
              <span className={styles.claimTitle}>{c.title}</span>
              <span className={styles.muted}>{isOpen ? '▾' : '▸'}</span>
            </button>
            {isOpen && (
              <div className={styles.claimBody}>
                <p>
                  <strong>The claim.</strong> {c.claim} <span className={styles.muted}>({c.cite})</span>
                </p>
                <p>
                  <strong>What the code does.</strong> {c.codeDoes}
                </p>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>switch</th>
                      <th>paper</th>
                      <th>code</th>
                      <th>now</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {c.switches.map((s) => {
                      const key = `${c.id}:${s.key}`
                      const r = results[key]
                      return (
                        <tr key={s.key}>
                          <td className={styles.mono}>{s.key}</td>
                          <td>{s.paperLabel}</td>
                          <td>{s.codeLabel}</td>
                          <td className={styles.mono}>{String(cfg[s.key])}</td>
                          <td>
                            <Button onClick={() => compare(c, [s], s.key)} disabled={worker.busy}>
                              {running === key ? 'running…' : 'Compare'}
                            </Button>
                            {r && (
                              <span className={styles.compareResult}>
                                paper: <b>{summary(r.paper, c.measure)}</b> · code: <b>{summary(r.code, c.measure)}</b>
                              </span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                    {c.switches.length > 1 && (
                      <tr>
                        <td className={styles.mono} colSpan={4}>
                          all of the above together
                        </td>
                        <td>
                          <Button onClick={() => compare(c, c.switches, 'all')} disabled={worker.busy}>
                            {running === `${c.id}:all` ? 'running…' : 'Compare all'}
                          </Button>
                          {results[`${c.id}:all`] && (
                            <span className={styles.compareResult}>
                              paper: <b>{summary(results[`${c.id}:all`].paper, c.measure)}</b> · code: <b>{summary(results[`${c.id}:all`].code, c.measure)}</b>
                            </span>
                          )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {c.scenario !== scenarioId && <p className={styles.muted}>Compare uses the {c.scenario} scenario, not the one loaded in the demo.</p>}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
