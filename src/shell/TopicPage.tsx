import styles from './Home.module.css'
import { demosForTopic, type Topic } from '../site/registry'
import { DemoLink } from './Home'

/** One topic's page: its blurb and every demo tagged with it, with blurbs. */
export function TopicPage({ topic }: { topic: Topic }) {
  const list = demosForTopic(topic.id)
  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <h1>{topic.title}</h1>
        <p className={styles.lede}>{topic.blurb}</p>
      </div>
      {list.length === 0 ? (
        <p className={styles.empty}>No demos yet.</p>
      ) : (
        <div className={styles.grid}>
          {list.map((d) => (
            <section className={styles.card} key={d.id}>
              <DemoLink demo={d} />
              <p className={styles.blurb}>{d.blurb}</p>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
