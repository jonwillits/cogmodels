import { Panel } from '../../components/Panel'

/**
 * Placeholder for the LISA demo (phase 0). The real demo arrives in phase 2,
 * once the engine under src/models/lisa/ exists and passes its tests.
 */
export default function LisaDemo() {
  return (
    <div style={{ padding: 'var(--space)', display: 'grid', placeItems: 'start' }}>
      <Panel title="LISA" style={{ width: 'min(560px, 100%)', maxWidth: 'none' }}>
        <p style={{ margin: 0, color: 'var(--text-muted)' }}>
          The engine is being built. This page will let you load a pair of analogs, step LISA
          one iteration at a time, and watch it map them one role binding at a time.
        </p>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 13 }}>
          Build phase: <strong>0 of 5</strong> (site shell). Next: the engine core.
        </p>
      </Panel>
    </div>
  )
}
