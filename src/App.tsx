import { Suspense } from 'react'
import { AppShell } from './shell/AppShell'
import { Home } from './shell/Home'
import { TopicPage } from './shell/TopicPage'
import { parseRoute, useHashRoute } from './shell/useHashRoute'
import { findDemo, findTopic, topicsForDemo } from './site/registry'

export default function App() {
  const parsed = parseRoute(useHashRoute())

  if (parsed.kind === 'home') {
    return (
      <AppShell>
        <Home />
      </AppShell>
    )
  }

  if (parsed.kind === 'topic') {
    const topic = findTopic(parsed.id)
    return (
      <AppShell title={topic?.title}>
        {topic ? <TopicPage topic={topic} /> : <NotFound what="topic" id={parsed.id} />}
      </AppShell>
    )
  }

  if (parsed.kind === 'model') {
    const demo = findDemo(parsed.id)
    return (
      <AppShell title={demo?.title} tags={demo ? topicsForDemo(demo) : undefined}>
        {demo ? (
          <Suspense fallback={<Loading />}>
            <demo.Component />
          </Suspense>
        ) : (
          <NotFound what="model" id={parsed.id} />
        )}
      </AppShell>
    )
  }

  return (
    <AppShell>
      <NotFound what="page" id={parsed.route} />
    </AppShell>
  )
}

function Loading() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        placeItems: 'center',
        color: 'var(--text-muted)',
      }}
    >
      Loading…
    </div>
  )
}

function NotFound({ what, id }: { what: string; id: string }) {
  return (
    <div style={{ padding: 'var(--space)', maxWidth: 640, margin: '0 auto' }}>
      <h2>Not found</h2>
      <p style={{ color: 'var(--text-muted)' }}>
        There is no {what} at <code>{id}</code>.
      </p>
      <p>
        <a href="#/">← All models</a>
      </p>
    </div>
  )
}
