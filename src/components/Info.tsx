import type { ReactNode } from 'react'
import styles from './Info.module.css'

/**
 * The ⓘ icon that opens an explanation, and the panel that shows it. The
 * demo owns which entry is open; these components are presentation only.
 * Explanatory text lives in data (`demos/<demo>/info.ts`), never inline.
 */
export function InfoIcon({ id, onOpen, label }: { id: string; onOpen: (id: string) => void; label?: string }) {
  return (
    <button
      type="button"
      className={styles.icon}
      onClick={(e) => {
        e.stopPropagation()
        onOpen(id)
      }}
      aria-label={label ? `About ${label}` : 'Explain'}
      title={label ? `About ${label}` : 'Explain'}
    >
      ⓘ
    </button>
  )
}

export interface InfoEntry {
  title: string
  /** What the element is. */
  what: ReactNode
  /** What it does in the model. */
  model?: ReactNode
  /** Where it comes from: page citations and the function in the authors' code. */
  source?: ReactNode
  /** A link into the Claims tab, when the element is part of an audited claim. */
  claim?: { id: string; label: string }
}

export function InfoPanel({ entry, onClose, onOpenClaim }: { entry: InfoEntry; onClose: () => void; onOpenClaim?: (claimId: string) => void }) {
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.title}>{entry.title}</span>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close" title="Close (Esc)">
          ×
        </button>
      </div>
      <div className={styles.body}>
        <p>{entry.what}</p>
        {entry.model && (
          <>
            <h4>In the model</h4>
            <p>{entry.model}</p>
          </>
        )}
        {entry.source && (
          <>
            <h4>Source</h4>
            <p className={styles.source}>{entry.source}</p>
          </>
        )}
        {entry.claim && (
          <p className={styles.claim}>
            Part of an audited claim:{' '}
            <button type="button" className={styles.link} onClick={() => onOpenClaim?.(entry.claim!.id)}>
              {entry.claim.label}
            </button>
          </p>
        )}
      </div>
    </div>
  )
}
