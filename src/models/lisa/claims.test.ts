import { describe, expect, it } from 'vitest'
import { claims } from './claims'
import { Hummel2007, HH2003, configFor } from './engine/presets'
import { builtInScenarios } from './scenarios'

describe('claims data', () => {
  it('names real switches with distinct paper and code values', () => {
    const cfg = configFor('Hummel2007')
    for (const c of claims) {
      expect(c.switches.length).toBeGreaterThan(0)
      for (const s of c.switches) {
        expect(s.key in cfg, `${c.id}: ${s.key}`).toBe(true)
        expect(s.paper, `${c.id}: ${s.key} paper === code`).not.toEqual(s.code)
        expect(typeof s.paper).toBe(typeof cfg[s.key])
        // The code value is what the code preset uses.
        expect(Hummel2007.settings[s.key].value, `${c.id}: ${s.key} code value`).toEqual(s.code)
      }
      expect(builtInScenarios.some((b) => b.id === c.scenario), `${c.id}: scenario ${c.scenario}`).toBe(true)
      expect(new Set(claims.map((x) => x.id)).size).toBe(claims.length)
    }
  })

  it('paper values agree with the HH2003 preset where that preset states them', () => {
    for (const c of claims) {
      for (const s of c.switches) {
        const st = HH2003.settings[s.key]
        if (st.provenance === 'stated' && c.id !== 'table2-normalization' && c.id !== 'capacity') {
          expect(st.value, `${c.id}: ${s.key}`).toEqual(s.paper)
        }
      }
    }
  })
})
