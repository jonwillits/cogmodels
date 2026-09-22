/**
 * Palette tokens mirrored from theme.css for use where CSS variables are not
 * available (canvas drawing, SVG attributes computed in code). Keep in sync
 * with theme.css, which is the source of truth for the DOM.
 */
export const palette = {
  bg: '#0e1420',
  surface: '#161d2b',
  surface2: '#1e2738',
  border: '#2a3446',
  text: '#e7ecf3',
  textMuted: '#9aa6b8',
  accent: '#4f9cff',
  accentStrong: '#2f7de0',
  ok: '#34d399',
  warn: '#f0a94b',
  bad: '#f87171',
  unitP: '#f5d547',
  unitSP: '#5aa9ff',
  unitPred: '#4ade80',
  unitObj: '#f87171',
  unitSem: '#c4b5fd',
} as const

export type Palette = typeof palette
