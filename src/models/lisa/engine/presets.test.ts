import { describe, expect, it } from 'vitest'
import { resolve } from './config'
import { Hummel2007, HH2003, HH1997, Hummel2015, HummelSuite03, presetIds, presets } from './presets'

const keys = Object.keys(Hummel2007.settings)

describe('presets', () => {
  it('every preset defines every setting with a provenance mark', () => {
    for (const id of presetIds) {
      const p = presets[id]
      expect(p.id).toBe(id)
      for (const k of keys) {
        const s = (p.settings as Record<string, { value: unknown; provenance: string }>)[k]
        expect(s, `${id}.${k}`).toBeDefined()
        expect(['stated', 'inferred', 'borrowed', 'ours']).toContain(s.provenance)
        expect(s.value, `${id}.${k} has no value`).not.toBeUndefined()
      }
      expect(Object.keys(p.settings).sort()).toEqual([...keys].sort())
    }
  })

  it('stated settings carry a citation', () => {
    for (const id of presetIds) {
      for (const [k, s] of Object.entries(presets[id].settings)) {
        if (s.provenance === 'stated') expect(s.cite, `${id}.${k}`).toBeTruthy()
        if (s.provenance !== 'stated') expect(s.note, `${id}.${k}`).toBeTruthy()
      }
    }
  })

  it('resolves to a flat config with the witnesses’ headline differences', () => {
    const c07 = resolve(Hummel2007)
    expect(c07.mappingAlgorithm).toBe('vers142')
    expect(c07.mappingLearningRate).toBe(1.0)
    expect(c07.recipInhibition).toBe(1.0)
    expect(resolve(HummelSuite03).mappingAlgorithm).toBe('hh2003')
    expect(resolve(HummelSuite03).mappingLearningRate).toBe(0.9)
    expect(resolve(Hummel2015).recipInhibition).toBe(0.5)
    expect(resolve(Hummel2015).outPropSPToObj).toBe(-0.5)
    const c03 = resolve(HH2003)
    expect(c03.gammaActive).toBe(0.3)
    expect(c03.minSTI).toBe(3)
    expect(c03.retrievalThreshold).toBe(0.5)
    expect(c03.driverLateralRule).toBe('normalizedSum2003')
    expect(resolve(HH1997).mappingAlgorithm).toBe('hh1997')
    expect(resolve(HH1997).spNoise).toBe(0.1)
  })
})
