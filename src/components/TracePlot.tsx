import { useEffect, useRef } from 'react'
import { palette } from '../theme/theme'

export interface TraceTrack {
  label: string
  color: string
  /** Samples oldest first, values in [−1, 1] (activations are [0, 1]). */
  samples: Float32Array
  /** Draw a thin separator above this track (start of a group). */
  group?: string
}

export interface TraceMarker {
  /** Sample index (0 = oldest sample shown). */
  at: number
  kind: 'phaseSet' | 'topDown' | 'mapping'
  label: string
}

interface TracePlotProps {
  tracks: TraceTrack[]
  markers: TraceMarker[]
  /** Number of samples the x axis spans (the ring-buffer length). */
  window: number
  /** Pixel height of one track. */
  trackHeight?: number
  labelWidth?: number
}

/**
 * Stacked activation-over-time strips on a canvas, like 2003 Figure 3B.
 * Redraws whenever its props change; the parent passes fresh samples each
 * animation frame.
 */
export function TracePlot({ tracks, markers, window, trackHeight = 16, labelWidth = 150 }: TracePlotProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  const height = tracks.length * trackHeight + 18

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const dpr = globalThis.devicePixelRatio || 1
    const width = canvas.clientWidth
    if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, width, height)
    const plotX = labelWidth
    const plotW = width - labelWidth - 8
    const top = 14
    const xOf = (i: number) => plotX + (i / window) * plotW

    // Markers first, so traces draw over them.
    for (const m of markers) {
      const x = xOf(m.at)
      ctx.strokeStyle = m.kind === 'phaseSet' ? palette.textMuted : m.kind === 'topDown' ? palette.ok : palette.accent
      ctx.lineWidth = 1
      ctx.setLineDash(m.kind === 'topDown' ? [3, 3] : [])
      ctx.beginPath()
      ctx.moveTo(x, m.label ? top - 2 : top + 4)
      ctx.lineTo(x, height)
      ctx.stroke()
      ctx.setLineDash([])
      if (m.label) {
        ctx.fillStyle = ctx.strokeStyle
        ctx.font = '10px ui-monospace, Menlo, monospace'
        ctx.fillText(m.label, x + 3, 10)
      }
    }

    tracks.forEach((t, k) => {
      const y0 = top + k * trackHeight
      if (t.group) {
        ctx.strokeStyle = palette.border
        ctx.beginPath()
        ctx.moveTo(0, y0)
        ctx.lineTo(width, y0)
        ctx.stroke()
      }
      ctx.fillStyle = palette.textMuted
      ctx.font = '11px ui-monospace, Menlo, monospace'
      ctx.fillText(t.label, 4, y0 + trackHeight - 4, labelWidth - 8)
      const n = t.samples.length
      if (n === 0) return
      const base = y0 + trackHeight - 1
      const h = trackHeight - 3
      ctx.fillStyle = t.color
      ctx.globalAlpha = 0.85
      ctx.beginPath()
      ctx.moveTo(xOf(window - n), base)
      for (let i = 0; i < n; i++) {
        const v = t.samples[i]
        ctx.lineTo(xOf(window - n + i), base - Math.max(0, Math.min(1, v)) * h)
      }
      ctx.lineTo(xOf(window), base)
      ctx.closePath()
      ctx.fill()
      // Negative values (semantics can go negative) drawn as a red underline.
      let anyNeg = false
      for (let i = 0; i < n; i++) if (t.samples[i] < 0) anyNeg = true
      if (anyNeg) {
        ctx.strokeStyle = palette.bad
        ctx.beginPath()
        for (let i = 0; i < n; i++) {
          const v = t.samples[i]
          if (v < 0) {
            ctx.moveTo(xOf(window - n + i), base)
            ctx.lineTo(xOf(window - n + i), base + Math.min(1, -v) * 2)
          }
        }
        ctx.stroke()
      }
      ctx.globalAlpha = 1
    })
  }, [tracks, markers, window, trackHeight, labelWidth, height])

  return <canvas ref={ref} style={{ width: '100%', height, display: 'block' }} />
}
