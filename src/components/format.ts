/** Format for display: a real minus sign, 2dp, and no "−0.00". */
export function fmt(n: number, dp = 2): string {
  const eps = 0.5 * 10 ** -dp
  const v = Math.abs(n) < eps ? 0 : n
  return (v < 0 ? '−' : '') + Math.abs(v).toFixed(dp)
}
