import { useEffect, useMemo, useState } from 'react'
import { InfoIcon, InfoPanel } from '../../components/Info'
import { StepControls } from '../../components/StepControls'
import { presetIds, presets } from '../../models/lisa/engine/presets'
import type { PresetId } from '../../models/lisa/engine/config'
import { builtInScenarios } from '../../models/lisa/scenarios'
import { AdvancedPanel } from './AdvancedPanel'
import { BatchView } from './BatchView'
import { ClaimsView } from './ClaimsView'
import { Inspector } from './Inspector'
import { MappingView } from './MappingView'
import { NetworkView } from './NetworkView'
import { SynchronyView } from './SynchronyView'
import { infoFor } from './info'
import { useBatchWorker } from './useBatchWorker'
import { useLisaController } from './useLisaController'
import styles from './LisaDemo.module.css'

type Tab = 'network' | 'synchrony' | 'mapping' | 'batch' | 'claims'
type Side = { kind: 'none' } | { kind: 'unit'; id: number } | { kind: 'info'; id: string } | { kind: 'advanced' }

const TABS: [Tab, string, string][] = [
  ['network', 'Network', 'tab.network'],
  ['synchrony', 'Synchrony', 'tab.synchrony'],
  ['mapping', 'Mapping', 'tab.mapping'],
  ['batch', 'Batch', 'tab.batch'],
  ['claims', 'Claims', 'tab.claims'],
]

export default function LisaDemo() {
  const c = useLisaController()
  const worker = useBatchWorker()
  const [tab, setTab] = useState<Tab>('network')
  const [side, setSide] = useState<Side>({ kind: 'none' })
  const [claimToOpen, setClaimToOpen] = useState<string | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSide({ kind: 'none' })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const openInfo = (id: string) => setSide({ kind: 'info', id })
  const openClaim = (id: string) => {
    setClaimToOpen(id)
    setTab('claims')
    setSide({ kind: 'none' })
  }

  const run = c.run
  const status = useMemo(() => {
    if (!run) return null
    const ph = run.phase
    const rec = run.records[run.records.length - 1]
    const total = c.parseErrors.length ? 0 : run.scenario.sequence.length
    const f = run.firingSPOn
    return {
      seq: run.done ? `done (${total} phase sets)` : ph ? `phase set ${ph.index + 1} / ${total}` : `before phase set ${run.sequenceIndex + 2} / ${total}`,
      props: rec ? rec.props.join(' ') + (rec.updateMapping ? ' h' : '') : '',
      iter: ph ? `${run.iteration} / ${ph.duration}` : '',
      tdOK: run.sim.topDownOK,
      gi: run.sim.gi !== 0,
      firing: f >= 0 ? run.net.units[f].name : '—',
      driver: run.sim.driver >= 0 ? run.net.analogs[run.sim.driver].name : '',
      recips: run.sim.recips.map((i) => run.net.analogs[i].name).join(', '),
    }
  }, [run, c.tick, c.parseErrors.length]) // eslint-disable-line react-hooks/exhaustive-deps

  const analogNames = run ? run.net.analogs.map((a) => a.name) : []

  return (
    <div className={styles.demo}>
      <div className={styles.controlBar}>
        <label className={styles.field}>
          <span>
            scenario <InfoIcon id="ctl.scenario" onOpen={openInfo} label="scenario" />
          </span>
          <select
            value={c.scenarioId}
            onChange={(e) => {
              c.setScenarioId(e.target.value)
              setSide({ kind: 'none' })
            }}
          >
            {builtInScenarios.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          <span>
            preset <InfoIcon id="ctl.preset" onOpen={openInfo} label="preset" />
          </span>
          <select value={c.presetId} onChange={(e) => c.setPresetId(e.target.value as PresetId)}>
            {presetIds.map((id) => (
              <option key={id} value={id}>
                {presets[id].label}
              </option>
            ))}
          </select>
        </label>
        <button type="button" className={`${styles.advBtn} ${Object.keys(c.overrides).length ? styles.advBtnMod : ''}`} onClick={() => setSide(side.kind === 'advanced' ? { kind: 'none' } : { kind: 'advanced' })}>
          Advanced{Object.keys(c.overrides).length ? ` (${Object.keys(c.overrides).length} changed)` : ''}
        </button>
        <label className={styles.field}>
          <span>
            seed <InfoIcon id="ctl.seed" onOpen={openInfo} label="seed" />
          </span>
          <span className={styles.seedRow}>
            <input type="number" value={c.seed} min={0} className={styles.numInput} onChange={(e) => c.setSeed(parseInt(e.target.value, 10) || 0)} />
            <button type="button" className={styles.smallBtn} onClick={c.newSeed} title="Random seed">
              🎲
            </button>
          </span>
        </label>
        <StepControls
          playing={c.playing}
          onPlayPause={() => c.setPlaying(!c.playing)}
          onReset={c.reset}
          speed={c.speed}
          onSpeedChange={c.setSpeed}
          disabled={!run}
          steps={[
            { label: '1', title: 'One iteration', onClick: () => c.step(1) },
            { label: '10', title: 'Ten iterations', onClick: () => c.step(10) },
            { label: 'SP', title: 'Until a different SP is firing', onClick: c.stepToNextSP },
            { label: 'phase set', title: 'To the end of the phase set', onClick: c.stepToEndOfPhaseSet },
            { label: 'end', title: 'To the end of the run', onClick: c.runToEnd },
          ]}
          trailing={<InfoIcon id="ctl.steps" onOpen={openInfo} label="stepping" />}
        />
      </div>

      {status && (
        <div className={styles.status}>
          <span>
            <b>{status.seq}</b> {status.props && <span className={styles.mono}>[{status.props}]</span>}
          </span>
          {status.iter && (
            <span>
              iteration <span className={styles.mono}>{status.iter}</span>
            </span>
          )}
          <span>
            driver <b>{status.driver}</b>
            {status.recips && (
              <>
                {' '}
                → <b>{status.recips}</b>
              </>
            )}
          </span>
          <span>
            firing SP <span className={styles.mono}>{status.firing}</span> <InfoIcon id="status.firing" onOpen={openInfo} label="firing SP" />
          </span>
          <span className={status.tdOK ? styles.on : styles.off}>
            top-down {status.tdOK ? 'on' : 'off'} <InfoIcon id="status.topDown" onOpen={openInfo} label="top-down" />
          </span>
          <span className={status.gi ? styles.on : styles.off}>
            GI {status.gi ? 'on' : 'off'} <InfoIcon id="status.gi" onOpen={openInfo} label="global inhibitor" />
          </span>
        </div>
      )}
      {(c.error || c.runWarnings.length > 0 || c.parseWarnings.length > 0) && (
        <div className={styles.notices}>
          {c.error && <span className={styles.error}>{c.error}</span>}
          {c.parseWarnings.map((w, i) => (
            <span key={'p' + i} className={styles.warn}>
              line {w.line}: {w.message}
            </span>
          ))}
          {c.runWarnings.map((w, i) => (
            <span key={'r' + i} className={styles.warn}>
              {w}
            </span>
          ))}
        </div>
      )}

      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.tabs}>
            {TABS.map(([id, label, info]) => (
              <span key={id} className={`${styles.tab} ${tab === id ? styles.tabOn : ''}`}>
                <button type="button" className={styles.tabBtn} onClick={() => setTab(id)}>
                  {label}
                </button>
                <InfoIcon id={info} onOpen={openInfo} label={label} />
              </span>
            ))}
          </div>
          <div className={styles.tabBody}>
            {run && tab === 'network' && <NetworkView run={run} tick={c.tick} selected={side.kind === 'unit' ? side.id : null} onSelect={(id) => setSide(id === null ? { kind: 'none' } : { kind: 'unit', id })} onInfo={openInfo} />}
            {run && tab === 'synchrony' && <SynchronyView run={run} traces={c.traces} tick={c.tick} />}
            {run && tab === 'mapping' && <MappingView run={run} history={c.history} tick={c.tick} onInfo={openInfo} />}
            {tab === 'batch' && <BatchView scenarioId={c.scenarioId} cfg={c.cfg} worker={worker} analogNames={analogNames} />}
            {tab === 'claims' && <ClaimsView scenarioId={c.scenarioId} cfg={c.cfg} worker={worker} openId={claimToOpen} />}
            {!run && tab !== 'batch' && tab !== 'claims' && <p className={styles.muted}>No run.</p>}
          </div>
        </div>
        {side.kind !== 'none' && (
          <aside className={styles.side}>
            {side.kind === 'unit' && run && <Inspector run={run} id={side.id} tick={c.tick} onClose={() => setSide({ kind: 'none' })} onInfo={openInfo} />}
            {side.kind === 'info' && (infoFor(side.id) ? <InfoPanel entry={infoFor(side.id)!} onClose={() => setSide({ kind: 'none' })} onOpenClaim={openClaim} /> : <p className={styles.muted}>No entry for {side.id}.</p>)}
            {side.kind === 'advanced' && <AdvancedPanel preset={presets[c.presetId]} cfg={c.cfg} overrides={c.overrides} onChange={c.setOverride} onClear={c.clearOverrides} onClose={() => setSide({ kind: 'none' })} onInfo={openInfo} />}
          </aside>
        )}
      </div>
    </div>
  )
}
