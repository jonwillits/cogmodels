import { useMemo, useState } from 'react'
import type { LisaRun } from '../../models/lisa/engine/run'
import { OBJ, P, PRED, SP, type UnitType } from '../../models/lisa/engine/network'
import { palette } from '../../theme/theme'
import { InfoIcon } from '../../components/Info'
import styles from './LisaDemo.module.css'

const W = 1200
const H = 620
const TYPE_COLOR: Record<UnitType, string> = { [P]: palette.unitP, [SP]: palette.unitSP, [PRED]: palette.unitPred, [OBJ]: palette.unitObj }
const R = 11

interface Pos {
  x: number
  y: number
}

interface Layout {
  pos: Map<number, Pos>
  predSem: Pos[]
  objSem: Pos[]
  bands: { analog: number; x: number; w: number; y: number; mirrored: boolean; name: string; role: string }[]
}

function computeLayout(run: LisaRun, driver: number, recips: number[]): Layout {
  const { net } = run
  const pos = new Map<number, Pos>()
  const bands: Layout['bands'] = []
  const others = net.analogs.map((a) => a.index).filter((i) => i !== driver)
  const rowsTop = { p: 40, sp: 110, op: 185 }
  const semY = 300
  const rowsBottom = { op: 415, sp: 490, p: 560 }

  const place = (ai: number, x0: number, w: number, mirrored: boolean) => {
    const a = net.analogs[ai]
    const rows = mirrored ? rowsBottom : rowsTop
    const spread = (ids: number[], y: number) => {
      const n = ids.length
      ids.forEach((id, i) => pos.set(id, { x: x0 + (w * (i + 0.5)) / n, y }))
    }
    spread(a.p, rows.p)
    spread(a.sp, rows.sp)
    // Predicates and objects ordered by first appearance in SP order, to reduce crossings.
    const op: number[] = []
    for (const s of a.sp) {
      const u = net.units[s]
      if (!op.includes(u.pred)) op.push(u.pred)
      if (u.obj >= 0 && !op.includes(u.obj)) op.push(u.obj)
    }
    for (const id of [...a.pred, ...a.obj]) if (!op.includes(id)) op.push(id)
    spread(op, rows.op)
  }

  if (driver >= 0) {
    place(driver, 0, W, false)
    bands.push({ analog: driver, x: 0, w: W, y: 14, mirrored: false, name: net.analogs[driver].name, role: 'driver' })
  }
  const n = Math.max(1, others.length)
  others.forEach((ai, k) => {
    const x0 = (W * k) / n
    place(ai, x0, W / n, true)
    bands.push({ analog: ai, x: x0, w: W / n, y: H - 8, mirrored: true, name: net.analogs[ai].name, role: recips.includes(ai) ? 'recipient' : 'dormant' })
  })
  const predSem = net.predSem.map((_, i) => ({ x: (W / 2) * ((i + 0.5) / net.predSem.length), y: semY }))
  const objSem = net.objSem.map((_, i) => ({ x: W / 2 + (W / 2) * ((i + 0.5) / net.objSem.length), y: semY }))
  return { pos, predSem, objSem, bands }
}

interface NetworkViewProps {
  run: LisaRun
  tick: number
  selected: number | null
  onSelect: (id: number | null) => void
  onInfo: (id: string) => void
}

export function NetworkView({ run, tick, selected, onSelect, onInfo }: NetworkViewProps) {
  const [showHypotheses, setShowHypotheses] = useState(false)
  const [showSemLinks, setShowSemLinks] = useState(true)
  // Before the first phase set begins, lay out for the phase set that is about to run.
  const upcoming = run.sim.driver < 0 ? run.scenario.sequence[run.sequenceIndex + 1] : null
  const driver = upcoming ? upcoming.driver : run.sim.driver
  const recipKey = (upcoming ? upcoming.recips : run.sim.recips).join(',')
  const layout = useMemo(() => computeLayout(run, driver, recipKey === '' ? [] : recipKey.split(',').map(Number)), [run, driver, recipKey])
  void tick
  const { net, sim } = run
  const conns = sim.conns
  const firing = run.firingSPOn

  const structureLines: { a: Pos; b: Pos; hot: boolean }[] = []
  for (const u of net.units) {
    const pa = layout.pos.get(u.id)
    if (!pa) continue
    if (u.type === SP) {
      for (const other of [u.parent, u.pred, u.obj, u.child]) {
        if (other < 0) continue
        const pb = layout.pos.get(other)
        if (pb) structureLines.push({ a: pa, b: pb, hot: sim.act[u.id] > 0.3 && sim.act[other] > 0.3 })
      }
    }
  }
  const semLines: { a: Pos; b: Pos; w: number; hot: boolean }[] = []
  if (showSemLinks) {
    for (const u of net.units) {
      if (u.type !== PRED && u.type !== OBJ) continue
      const pa = layout.pos.get(u.id)
      if (!pa) continue
      const pool = u.type === PRED ? layout.predSem : layout.objSem
      u.sem.forEach((s, k) => {
        const act = u.type === PRED ? sim.predSemAct[s] : sim.objSemAct[s]
        semLines.push({ a: pa, b: pool[s], w: u.semW[k], hot: sim.act[u.id] > 0.3 && Math.abs(act) > 0.3 })
      })
    }
  }
  const mapLines: { a: Pos; b: Pos; v: number; type: UnitType; hyp: boolean }[] = []
  for (let c = 0; c < conns.count; c++) {
    const v = showHypotheses ? conns.h[c] : conns.w[c]
    if (v <= 0.02) continue
    const pa = layout.pos.get(conns.u[c])
    const pb = layout.pos.get(conns.v[c])
    if (pa && pb) mapLines.push({ a: pa, b: pb, v, type: net.units[conns.u[c]].type, hyp: showHypotheses })
  }
  const maxHyp = showHypotheses ? Math.max(1, ...mapLines.map((l) => l.v)) : 1

  return (
    <div className={styles.networkWrap}>
      <div className={styles.viewBar}>
        <label className={styles.check}>
          <input type="checkbox" checked={showHypotheses} onChange={(e) => setShowHypotheses(e.target.checked)} /> show hypotheses instead of weights
        </label>
        <label className={styles.check}>
          <input type="checkbox" checked={showSemLinks} onChange={(e) => setShowSemLinks(e.target.checked)} /> semantic links
        </label>
        <span className={styles.legend}>
          {(
            [
              ['P', P, 'unit.P'],
              ['SP', SP, 'unit.SP'],
              ['pred', PRED, 'unit.pred'],
              ['obj', OBJ, 'unit.obj'],
            ] as [string, UnitType, string][]
          ).map(([label, t, id]) => (
            <span key={label} className={styles.legendItem}>
              <span className={styles.swatch} style={{ background: TYPE_COLOR[t] }} /> {label}
              <InfoIcon id={id} onOpen={onInfo} label={label} />
            </span>
          ))}
          <span className={styles.legendItem}>
            <span className={styles.swatch} style={{ background: palette.unitSem }} /> semantic
            <InfoIcon id="unit.sem" onOpen={onInfo} label="semantic units" />
          </span>
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.network} onClick={() => onSelect(null)}>
        {layout.bands.map((b) => (
          <g key={b.analog}>
            <text x={b.x + 8} y={b.y} fill={palette.textMuted} fontSize={12} fontFamily="ui-monospace, Menlo, monospace">
              {b.name} <tspan fill={b.role === 'driver' ? palette.unitP : b.role === 'recipient' ? palette.unitSP : palette.border}>({b.role})</tspan>
            </text>
            {b.mirrored && b.x > 0 && <line x1={b.x} y1={330} x2={b.x} y2={H} stroke={palette.border} strokeDasharray="4 4" />}
          </g>
        ))}
        <text x={8} y={semY_label} fill={palette.textMuted} fontSize={11}>
          predicate semantics
        </text>
        <text x={W / 2 + 8} y={semY_label} fill={palette.textMuted} fontSize={11}>
          object semantics
        </text>
        <g>
          {semLines.map((l, i) => (
            <line key={i} x1={l.a.x} y1={l.a.y} x2={l.b.x} y2={l.b.y} stroke={l.w < 0 ? palette.bad : palette.unitSem} strokeOpacity={l.hot ? 0.55 : 0.07} strokeWidth={l.hot ? 1.5 : 1} />
          ))}
        </g>
        <g>
          {structureLines.map((l, i) => (
            <line key={i} x1={l.a.x} y1={l.a.y} x2={l.b.x} y2={l.b.y} stroke={palette.text} strokeOpacity={l.hot ? 0.6 : 0.18} strokeWidth={l.hot ? 1.8 : 1} />
          ))}
        </g>
        <g>
          {mapLines.map((l, i) => (
            <line
              key={i}
              x1={l.a.x}
              y1={l.a.y}
              x2={l.b.x}
              y2={l.b.y}
              stroke={TYPE_COLOR[l.type]}
              strokeOpacity={0.55}
              strokeWidth={1 + 4 * (l.hyp ? l.v / maxHyp : l.v)}
              strokeDasharray={l.hyp ? '5 4' : undefined}
            />
          ))}
        </g>
        <g>
          {layout.predSem.map((p, i) => (
            <SemNode key={'ps' + i} p={p} name={net.predSem[i]} act={sim.predSemAct[i]} />
          ))}
          {layout.objSem.map((p, i) => (
            <SemNode key={'os' + i} p={p} name={net.objSem[i]} act={sim.objSemAct[i]} />
          ))}
        </g>
        <g>
          {net.units.map((u) => {
            const p = layout.pos.get(u.id)
            if (!p) return null
            const act = sim.act[u.id]
            const color = TYPE_COLOR[u.type]
            const isFiring = u.id === firing
            const mode = u.type === P ? sim.mode[u.id] : 0
            return (
              <g
                key={u.id}
                transform={`translate(${p.x},${p.y})`}
                onClick={(e) => {
                  e.stopPropagation()
                  onSelect(u.id)
                }}
                style={{ cursor: 'pointer' }}
              >
                <title>
                  {u.name} act {act.toFixed(3)}
                </title>
                {isFiring && <circle r={R + 6} fill="none" stroke={palette.unitP} strokeWidth={2} opacity={0.9} />}
                <circle r={R} fill={color} fillOpacity={0.12 + 0.88 * act} stroke={selected === u.id ? palette.text : sim.retrieved[u.id] ? palette.text : color} strokeWidth={selected === u.id ? 3 : sim.retrieved[u.id] ? 1.5 : 1} strokeOpacity={sim.retrieved[u.id] || selected === u.id ? 1 : 0.5} />
                {u.inferred && (
                  <text y={4} textAnchor="middle" fontSize={10} fill={palette.text}>
                    *
                  </text>
                )}
                <text y={R + 12} textAnchor="middle" fontSize={9} fill={palette.text} fontFamily="ui-monospace, Menlo, monospace">
                  {u.name}
                  {mode === 1 ? ' ▲' : mode === -1 ? ' ▼' : ''}
                </text>
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}

const semY_label = 268

function SemNode({ p, name, act }: { p: Pos; name: string; act: number }) {
  const neg = act < 0
  return (
    <g transform={`translate(${p.x},${p.y})`}>
      <title>
        {name} act {act.toFixed(3)}
      </title>
      <circle r={6} fill={neg ? palette.bad : palette.unitSem} fillOpacity={0.12 + 0.88 * Math.min(1, Math.abs(act))} stroke={palette.unitSem} strokeOpacity={0.5} />
      <text transform="translate(3,12) rotate(60)" fontSize={8} fill={palette.textMuted} fontFamily="ui-monospace, Menlo, monospace">
        {name}
      </text>
    </g>
  )
}
