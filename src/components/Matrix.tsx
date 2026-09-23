import { useState } from 'react'
import styles from './Matrix.module.css'

interface MatrixProps {
  title: string
  rows: string[]
  cols: string[]
  /** Row-major, rows × cols. */
  values: Float64Array | number[]
  /** Values map to color on [0, max]; default 1. */
  max?: number
  /** Cell color; intensity follows the value. */
  color?: string
  rowLabel?: string
  colLabel?: string
  /** Highlighted cells (row, col), e.g. the best mapping per row. */
  highlight?: (r: number, c: number, v: number) => boolean
  cell?: number
}

/** A small heatmap with hover readout, for mapping weights and hypotheses. */
export function Matrix({ title, rows, cols, values, max = 1, color = 'var(--accent)', rowLabel, colLabel, highlight, cell = 26 }: MatrixProps) {
  const [hover, setHover] = useState<{ r: number; c: number } | null>(null)
  if (rows.length === 0 || cols.length === 0) {
    return (
      <div className={styles.matrix}>
        <div className={styles.title}>{title}</div>
        <div className={styles.empty}>no units</div>
      </div>
    )
  }
  const v = (r: number, c: number) => values[r * cols.length + c] ?? 0
  const hv = hover ? v(hover.r, hover.c) : null
  return (
    <div className={styles.matrix}>
      <div className={styles.title}>
        {title}
        {hover && (
          <span className={styles.readout}>
            {rows[hover.r]} → {cols[hover.c]} = {hv!.toFixed(3)}
          </span>
        )}
      </div>
      <div className={styles.grid} style={{ gridTemplateColumns: `auto repeat(${cols.length}, ${cell}px)` }} onMouseLeave={() => setHover(null)}>
        <div className={styles.corner}>
          {rowLabel && <span>{rowLabel} ↓</span>}
          {colLabel && <span>{colLabel} →</span>}
        </div>
        {cols.map((c) => (
          <div key={c} className={styles.colHead} title={c}>
            <span>{c}</span>
          </div>
        ))}
        {rows.map((r, ri) => (
          <RowCells key={r} label={r} ri={ri} cols={cols} v={v} max={max} color={color} highlight={highlight} cell={cell} onHover={setHover} />
        ))}
      </div>
    </div>
  )
}

function RowCells({ label, ri, cols, v, max, color, highlight, cell, onHover }: { label: string; ri: number; cols: string[]; v: (r: number, c: number) => number; max: number; color: string; highlight?: (r: number, c: number, v: number) => boolean; cell: number; onHover: (h: { r: number; c: number }) => void }) {
  return (
    <>
      <div className={styles.rowHead} title={label}>
        {label}
      </div>
      {cols.map((c, ci) => {
        const val = v(ri, ci)
        const t = Math.max(0, Math.min(1, val / max))
        const hi = highlight?.(ri, ci, val)
        return (
          <div
            key={c}
            className={`${styles.cell} ${hi ? styles.hi : ''}`}
            style={{ width: cell, height: cell, background: `color-mix(in srgb, ${color} ${Math.round(t * 100)}%, var(--surface-2))` }}
            onMouseEnter={() => onHover({ r: ri, c: ci })}
          >
            {val !== 0 && cell >= 24 ? <span className={styles.val}>{val >= 0.995 ? '1' : val.toFixed(2).replace(/^0/, '')}</span> : null}
          </div>
        )
      })}
    </>
  )
}
