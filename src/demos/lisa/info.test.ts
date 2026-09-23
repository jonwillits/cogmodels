import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { infoFor } from './info'
import { Hummel2007 } from '../../models/lisa/engine/presets'
import type { LisaConfigKey } from '../../models/lisa/engine/config'

const here = dirname(fileURLToPath(import.meta.url))

describe('info panels', () => {
  it('cover every ⓘ id used in the demo', () => {
    const ids = new Set<string>()
    for (const f of readdirSync(here)) {
      if (!f.endsWith('.tsx')) continue
      const src = readFileSync(join(here, f), 'utf8')
      for (const m of src.matchAll(/InfoIcon id="([^"]+)"/g)) ids.add(m[1])
      for (const m of src.matchAll(/\['[a-z]+', '[A-Za-z]+', '(tab\.[a-z]+)'\]/g)) ids.add(m[1])
      for (const m of src.matchAll(/\['[A-Za-z]+', (?:P|SP|PRED|OBJ), '(unit\.[a-zA-Z]+)'\]/g)) ids.add(m[1])
    }
    expect(ids.size).toBeGreaterThan(15)
    const missing = [...ids].filter((id) => !infoFor(id))
    expect(missing).toEqual([])
  })

  it('cover every setting', () => {
    for (const k of Object.keys(Hummel2007.settings) as LisaConfigKey[]) {
      const e = infoFor(`setting.${k}`)
      expect(e, k).toBeDefined()
      expect(String(e!.source)).toMatch(/Hummel2007/)
    }
  })
})
