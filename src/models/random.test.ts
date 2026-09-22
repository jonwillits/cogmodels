import { readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { makeRng } from './random'

describe('makeRng', () => {
  it('is reproducible from its seed', () => {
    const a = makeRng(12345)
    const b = makeRng(12345)
    const xs = Array.from({ length: 50 }, () => a.next())
    const ys = Array.from({ length: 50 }, () => b.next())
    expect(xs).toEqual(ys)
  })

  it('stays in [0, 1) and differs across seeds', () => {
    const r = makeRng(7)
    for (let i = 0; i < 1000; i++) {
      const v = r.next()
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThan(1)
    }
    expect(makeRng(1).next()).not.toBe(makeRng(2).next())
  })
})

/** Every file under src/models except random.ts itself. */
function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (/\.(ts|tsx)$/.test(name) && !/random\.(test\.)?ts$/.test(name)) out.push(p)
  }
  return out
}

describe('the models tree', () => {
  it('never calls Math.random()', () => {
    const offenders = walk(dirname(fileURLToPath(import.meta.url))).filter((p) =>
      /Math\.random\s*\(/.test(readFileSync(p, 'utf8')),
    )
    expect(offenders).toEqual([])
  })
})
