import type { ReactNode } from 'react'
import styles from './AppShell.module.css'
import type { Topic } from '../site/registry'

interface AppShellProps {
  children: ReactNode
  /** Title of the current demo or topic page, if any. */
  title?: string
  /** Topic tags of the current demo, shown beside its title. */
  tags?: Topic[]
}

/**
 * The persistent frame: a top bar with the site title (linking home), the
 * current page's title and, for a demo, its topic tags. No accounts, no
 * server, no analytics.
 */
export function AppShell({ children, title, tags }: AppShellProps) {
  return (
    <div className={styles.shell}>
      <header className={styles.bar}>
        <a className={styles.brand} href="#/">
          <img src="app-icon.svg" alt="" />
          <span>cogmodels</span>
        </a>
        {title && (
          <>
            <span className={styles.sep}>/</span>
            <span className={styles.title}>{title}</span>
          </>
        )}
        {tags && tags.length > 0 && (
          <span className={styles.tags}>
            {tags.map((t) => (
              <a key={t.id} className={styles.tag} href={`#/topics/${t.id}`}>
                {t.title}
              </a>
            ))}
          </span>
        )}
        <span className={styles.spacer} />
        {title && (
          <a className={styles.barBtn} href="#/">
            ← All models
          </a>
        )}
      </header>
      <div className={styles.main}>{children}</div>
    </div>
  )
}
