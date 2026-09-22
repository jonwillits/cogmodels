import { describe, expect, it } from 'vitest'
import { parseSym } from './symParser'
import { builtInScenarios } from '../scenarios'

describe('the .sym parser', () => {
  it('parses every built-in scenario without errors', () => {
    for (const s of builtInScenarios) {
      const res = parseSym(s.sym)
      expect(res.errors, s.id).toEqual([])
    }
  })

  it('reads the structural love triangle', () => {
    const { scenario, warnings } = parseSym(builtInScenarios[0].sym)
    expect(warnings).toEqual([])
    expect(scenario.analogs.map((a) => a.name)).toEqual(['Amy&Bill', 'Abe&Beth'])
    const a = scenario.analogs[0]
    expect(a.preds.map((p) => p.name)).toEqual(['LOVES', 'JEALOUS'])
    expect(a.preds[0].roles).toEqual([
      [
        { name: 'EMOTION1', weight: 1 },
        { name: 'POSITIVE1', weight: 1 },
        { name: 'STRONG1', weight: 1 },
        { name: 'LOVES1', weight: 1 },
      ],
      [
        { name: 'EMOTION2', weight: 1 },
        { name: 'POSITIVE2', weight: 1 },
        { name: 'STRONG2', weight: 1 },
        { name: 'LOVES2', weight: 1 },
      ],
    ])
    expect(a.objs.map((o) => o.name)).toEqual(['AMY', 'BILL', 'CAT'])
    expect(a.objs[0].semantics.map((s) => s.name)).toEqual(['HUMAN', 'ADULT', 'FEMALE', 'AMY'])
    expect(a.props).toMatchObject([
      { name: 'P1', pred: 'LOVES', args: ['AMY', 'BILL'] },
      { name: 'P2', pred: 'LOVES', args: ['BILL', 'CAT'] },
    ])
    expect(scenario.sequence).toMatchObject([
      { driver: 0, recips: [1], props: ['P1', 'P2'], updateMapping: true, ssl: 'off' },
      { driver: 0, recips: [1], props: ['P1'], updateMapping: true },
      { driver: 0, recips: [1], props: ['P2'], updateMapping: true },
    ])
  })

  it('handles hand-coded predicates, child propositions and groups', () => {
    const h = parseSym(builtInScenarios.find((s) => s.id === 'hierarchy1')!.sym).scenario
    expect(h.analogs[0].preds[0].roles[0].map((s) => s.name)).toEqual(['ROLE', 'F1', 'FF1', 'FFF1', 'ROLE1'])
    expect(h.analogs[0].props[1]).toMatchObject({ name: 'P2', pred: 'G', args: ['Z', 'P1'] })
    const j = parseSym(builtInScenarios.find((s) => s.id === 'lovetri7')!.sym)
    expect(j.errors).toEqual([])
    expect(j.warnings.some((w) => /DefGroups/.test(w.message))).toBe(true)
    expect(j.scenario.analogs[2]).toMatchObject({ name: 'Schema', props: [] })
    expect(j.scenario.sequence).toHaveLength(8)
    expect(j.scenario.sequence[4]).toMatchObject({ driver: 1, recips: [0], ssl: 'off', props: ['P2'], updateMapping: true })
    expect(j.scenario.sequence[5]).toMatchObject({ driver: 0, recips: [1, 2], ssl: 'auto', props: ['P1'], updateMapping: true })
  })

  it('parses random firing and negated semantics', () => {
    const src = `
Analog A
  DefPreds
    Big 1 size -small big ;
  end
  DefObjs
    X thing ;
  end
  DefProps
    P1 Big ( X ) 3 ;
  end
done
Sequence
  Driver=[ 0 ]
  Order=[ R ( 2 1 ) ]
Done.`
    const { scenario, errors } = parseSym(src)
    expect(errors).toEqual([])
    expect(scenario.analogs[0].preds[0].roles[0]).toEqual([
      { name: 'SIZE1', weight: 1 },
      { name: 'SMALL1', weight: -1 },
      { name: 'BIG1', weight: 1 },
    ])
    expect(scenario.analogs[0].props[0].importance).toBe(3)
    expect(scenario.sequence).toMatchObject([
      { random: 1, updateMapping: true, recips: [] },
      { random: 1, updateMapping: true, recips: [] },
    ])
  })

  it('reports malformed input with line numbers', () => {
    const src = `Analog A
  DefPreds
    Loves 2 a b ;
  end
  DefObjs
    X x ;
  end
  DefProps
    P1 Hates ( X Y ) ;
  end
done
Sequence
  Driver=[ 3 ]
  Order=[ P9 ]
Done.`
    const { errors } = parseSym(src)
    const msgs = errors.map((e) => `${e.line}: ${e.message}`)
    expect(msgs).toContainEqual(expect.stringMatching(/^9: P1: predicate "HATES" is not defined/))
    expect(msgs).toContainEqual(expect.stringMatching(/^9: P1: "Y" is neither an object nor a proposition/))
    expect(msgs).toContainEqual(expect.stringMatching(/^13: Driver=\[: there is no analog 3/))
    expect(msgs).toContainEqual(expect.stringMatching(/^14: Order given before Driver/))
    const eof = parseSym('Analog A\n  DefPreds\n    Loves 2 a b ;\n')
    expect(eof.errors.map((e) => e.message)).toContainEqual(expect.stringMatching(/DefPreds is missing its End/))
  })
})
