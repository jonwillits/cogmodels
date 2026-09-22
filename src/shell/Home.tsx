import styles from './Home.module.css'
import { demosForTopic, topics, type Demo } from '../site/registry'

/**
 * The landing page: a site title, one paragraph, and a grid of topic cards.
 * Each card lists every demo tagged with that topic. A topic is shown even
 * when it has no demos yet, so the structure of the site is visible.
 */
export function Home() {
  const ordered = [...topics].sort((a, b) => a.order - b.order)
  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <h1>cogmodels</h1>
        <p className={styles.lede}>
          Working, interactive implementations of cognitive models. Each model is rebuilt
          from its source papers and, where it exists, the authors’ code. Every demo exposes
          the model’s internal state, so you can watch what it does and ask why.
        </p>
      </div>

      <div className={styles.grid}>
        {ordered.map((t) => {
          const list = demosForTopic(t.id)
          return (
            <section className={styles.card} key={t.id}>
              <a className={styles.cardTitle} href={`#/topics/${t.id}`}>
                {t.title}
              </a>
              <p className={styles.blurb}>{t.blurb}</p>
              {list.length === 0 ? (
                <p className={styles.empty}>No demos yet.</p>
              ) : (
                <ul className={styles.demoList}>
                  {list.map((d) => (
                    <li key={d.id}>
                      <DemoLink demo={d} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}

export function DemoLink({ demo }: { demo: Demo }) {
  return (
    <a className={styles.demo} href={`#/models/${demo.id}`}>
      <span className={styles.demoTitle}>{demo.title}</span>
      <span className={`${styles.status} ${styles[`status_${demo.status}`]}`}>
        {demo.status}
      </span>
    </a>
  )
}
