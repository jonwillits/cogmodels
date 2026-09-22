/**
 * The one source of randomness in every model engine.
 *
 * A run must be reproducible from its seed: the acceptance tests batch a
 * scenario over fixed seeds and assert rates, and the demo's "same seed,
 * change one setting, compare" workflow is only honest if everything random
 * about a run comes from one stream. So nothing under `src/models/` may call
 * `Math.random()` (a test walks the tree and fails if it finds one). An engine
 * takes an `Rng`, and every draw — firing order, SP sensitivity, semantic
 * noise, semantic death — goes through it.
 *
 * Copied from bcogapp's `src/sim/random.ts` (mulberry32).
 */

export interface Rng {
  /** Uniform in [0, 1). */
  next(): number
  /** Uniform in [min, max). */
  range(min: number, max: number): number
  /** Uniform integer in [0, n). */
  int(n: number): number
  /** Standard normal (mean 0, sd 1). */
  normal(): number
  /** A fresh independent stream, for sub-runs that must not disturb this one. */
  fork(): Rng
}

/**
 * mulberry32: small, fast, dependency-free, and deterministic across browsers
 * and Node, which is what makes the headless tests mean anything about what a
 * user sees. Integer-only state, so it is bit-identical across architectures
 * (`normal()` is not, because it uses Math.log/sin/cos; avoid it in anything
 * a fixture depends on).
 */
export function makeRng(seed: number): Rng {
  let a = seed >>> 0

  const next = (): number => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  let spare: number | null = null
  const normal = (): number => {
    if (spare !== null) {
      const v = spare
      spare = null
      return v
    }
    const u = 1 - next()
    const v = next()
    const r = Math.sqrt(-2 * Math.log(u))
    const theta = 2 * Math.PI * v
    spare = r * Math.sin(theta)
    return r * Math.cos(theta)
  }

  return {
    next,
    normal,
    range: (min, max) => min + next() * (max - min),
    int: (n) => Math.floor(next() * n),
    fork: () => makeRng(Math.floor(next() * 0xffffffff)),
  }
}

/**
 * A seed for a fresh run. The only place randomness is allowed to be
 * unreproducible, and it happens once, in the UI, before the stream starts.
 */
export function randomSeed(): number {
  return Math.floor(Math.random() * 0xffffffff) >>> 0
}
