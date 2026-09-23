import { InfoIcon } from '../../components/Info'
import { Button } from '../../components/controls'
import type { LisaConfig, LisaConfigKey, Preset } from '../../models/lisa/engine/config'
import { settingGroups } from './settingGroups'
import styles from './LisaDemo.module.css'

const ENUMS: Partial<Record<LisaConfigKey, string[]>> = {
  wmMode: ['normal', 'unlimited'],
  driverRule: ['hh2003', 'hh1997'],
  driverLateralRule: ['maxSecondMax', 'normalizedSum2003'],
  batchedSPOrder: ['interleaved', 'grouped'],
  recipientPInput: ['current', 'maxSinceSelection'],
  recipientWithinClassInhibition: ['code', 'normalizedSum2003', 'divisive1997'],
  outOfPropositionRule: ['maxSecondMax', 'summed2003'],
  semanticInputRule: ['cosine', 'weber2003', 'fanInNormalized1997'],
  semanticNormalization: ['signedMax', 'absMax', 'none'],
  mappingAlgorithm: ['hh2003', 'vers142', 'hh1997'],
  hypothesisNormalization: ['rowColumn', 'global'],
  inferenceGuards: ['code', 'cueOnly'],
  inferredWiring: ['firstAbove0.5', 'hebbian'],
  dormantCompetition: ['lucePostHoc', 'network'],
  refreshScope: ['allAnalogs', 'nonDriver'],
}

const MARK: Record<string, string> = { stated: 'S', inferred: 'I', borrowed: 'B', ours: 'O' }

export function AdvancedPanel({ preset, cfg, overrides, onChange, onClear, onClose, onInfo }: { preset: Preset; cfg: LisaConfig; overrides: Partial<LisaConfig>; onChange: <K extends LisaConfigKey>(k: K, v: LisaConfig[K]) => void; onClear: () => void; onClose: () => void; onInfo: (id: string) => void }) {
  const listed = new Set(settingGroups.flatMap((g) => g.keys))
  const groups = [...settingGroups, { title: 'Other (1997 constants)', keys: (Object.keys(cfg) as LisaConfigKey[]).filter((k) => !listed.has(k)) }]
  const nOver = Object.keys(overrides).length
  return (
    <div className={styles.inspector}>
      <div className={styles.inspHead}>
        <span className={styles.inspTitle}>
          Advanced <span className={styles.muted}>{preset.label}</span>
        </span>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close" title="Close (Esc)">
          ×
        </button>
      </div>
      <div className={styles.inspBody}>
        <p className={styles.muted}>{preset.witness}</p>
        <p className={styles.advBar}>
          <span>
            Marks <InfoIcon id="adv.provenance" onOpen={onInfo} label="provenance marks" />
          </span>
          {nOver > 0 ? (
            <>
              <span className={styles.modified}>modified from {preset.id} ({nOver})</span>
              <Button onClick={onClear}>Reset to preset</Button>
            </>
          ) : (
            <span className={styles.muted}>unmodified</span>
          )}
        </p>
        {groups.map((g) => (
          <div key={g.title} className={styles.advGroup}>
            <h4>{g.title}</h4>
            {g.keys.map((k) => {
              const s = preset.settings[k]
              const v = cfg[k]
              const isOver = k in overrides
              const hint = `${s.provenance}${s.cite ? ' · ' + s.cite : ''}${s.note ? ' · ' + s.note : ''}`
              return (
                <div key={k} className={`${styles.advRow} ${isOver ? styles.advRowMod : ''}`}>
                  <span className={styles.advKey} title={hint}>
                    <span className={`${styles.mark} ${styles['mark_' + s.provenance]}`}>{MARK[s.provenance]}</span>
                    {k}
                    <InfoIcon id={`setting.${k}`} onOpen={onInfo} label={k} />
                  </span>
                  {typeof v === 'boolean' ? (
                    <input type="checkbox" checked={v} onChange={(e) => onChange(k, e.target.checked as LisaConfig[typeof k])} />
                  ) : typeof v === 'number' ? (
                    <input type="number" step="any" value={v} className={styles.numInput} onChange={(e) => onChange(k, parseFloat(e.target.value) as LisaConfig[typeof k])} />
                  ) : (
                    <select value={String(v)} onChange={(e) => onChange(k, e.target.value as LisaConfig[typeof k])}>
                      {(ENUMS[k] ?? [String(v)]).map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
