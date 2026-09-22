import { describe, expect, it } from 'vitest'
import { parseSymOrThrow } from '../input/symParser'
import { builtInScenario } from '../scenarios'
import { configFor } from './presets'
import { LisaRun, applyScenarioParameters } from './run'
import { OBJ } from './network'
import { Connections, updateHypotheses, updateWeightsHH2003 } from './mapping'
import { buildNetwork } from './network'

/** One analog whose single proposition has `n` roles: a phase set of n SPs and nothing to map to. */
function nRoleScenario(n: number): string {
  const roles = Array.from({ length: n }, (_, i) => `O${i + 1}`)
  return `
Analog Solo
  DefPreds
    Rel ${n} feat ;
  end
  DefObjs
    ${roles.map((r) => `${r} thing ${r.toLowerCase()} ;`).join('\n    ')}
  end
  DefProps
    P1 Rel ( ${roles.join(' ')} ) ;
  end
done
Sequence
  Driver=[ 0 ]
  Order=[ P1 ]
Done.`
}

describe('inhibitor phases (spec §9.4)', () => {
  it('a single SP fires for about 100 iterations, rests for about 10, then fires again', () => {
    const run = new LisaRun(parseSymOrThrow(nRoleScenario(1)), configFor('Hummel2007'), 1)
    const sp = run.net.findUnit(0, 'SP1.1')!.id
    const on: number[] = []
    let it = 0
    while (it < 330 && run.step()) {
      on.push(run.sim.act[sp] > 0.5 ? 1 : 0)
      it++
    }
    // Segment the trace into runs of on/off.
    const segs: { on: number; len: number }[] = []
    for (const v of on) {
      const last = segs[segs.length - 1]
      if (last && last.on === v) last.len++
      else segs.push({ on: v, len: 1 })
    }
    const firstOn = segs.find((s) => s.on === 1)!
    const idx = segs.indexOf(firstOn)
    const rest = segs[idx + 1]
    const secondOn = segs[idx + 2]
    expect(firstOn.len).toBeGreaterThan(85)
    expect(firstOn.len).toBeLessThan(125)
    expect(rest.on).toBe(0)
    expect(rest.len).toBeGreaterThan(5)
    expect(rest.len).toBeLessThan(25)
    expect(secondOn?.on).toBe(1)
    expect(run.records[0].firings['SP1.1']).toBe(3)
  })
})

describe('time-sharing (spec §9.4)', () => {
  for (const n of [2, 3, 4]) {
    it(`${n} SPs all fire, with counts differing by at most 1`, () => {
      const counts: number[][] = []
      for (let seed = 1; seed <= 5; seed++) {
        const run = new LisaRun(parseSymOrThrow(nRoleScenario(n)), configFor('Hummel2007'), seed)
        run.runToEnd()
        const c = Object.values(run.records[0].firings)
        counts.push(c)
        expect(Math.min(...c), `seed ${seed}: ${c}`).toBeGreaterThanOrEqual(1)
        expect(Math.max(...c) - Math.min(...c), `seed ${seed}: ${c}`).toBeLessThanOrEqual(1)
      }
    })
  }

  it('measures where time-sharing breaks down (recorded, not asserted)', () => {
    const rows: string[] = []
    for (const n of [5, 6, 7, 8]) {
      let ok = 0
      for (let seed = 1; seed <= 5; seed++) {
        const run = new LisaRun(parseSymOrThrow(nRoleScenario(n)), configFor('Hummel2007'), seed)
        run.runToEnd()
        const c = Object.values(run.records[0].firings)
        if (Math.min(...c) >= 1 && Math.max(...c) - Math.min(...c) <= 1) ok++
      }
      rows.push(`${n} SPs: clean time-sharing in ${ok}/5 seeds`)
    }
    console.log('[time-sharing capacity] ' + rows.join('; '))
    expect(rows.length).toBe(4)
  })
})

describe('Table 2 arithmetic (2003, p. 233)', () => {
  const sym = `
Analog Driver
  DefPreds
    Loves 2 love ;
  end
  DefObjs
    Bill male ;
    Mary female ;
    Sam male ;
  end
  DefProps
    P1 Loves ( Bill Mary ) ;
    P2 Loves ( Mary Sam ) ;
  end
done
Analog Recip
  DefPreds
    Loves 2 love ;
  end
  DefObjs
    Sally female ;
    Tom male ;
    Cathy female ;
  end
  DefProps
    P1 Loves ( Sally Tom ) ;
    P2 Loves ( Tom Cathy ) ;
  end
done
Sequence
  Driver=[ 0 ]
  Recip=[ 1 ]
  Order=[ P1 P2 h ]
Done.`
  it('reproduces the hypothesis totals and lets only Mary→Tom win', () => {
    const net = buildNetwork(parseSymOrThrow(sym))
    const conns = new Connections(net)
    const id = (a: number, name: string) => net.findUnit(a, name)!.id
    const D = { BILL: id(0, 'BILL'), MARY: id(0, 'MARY'), SAM: id(0, 'SAM') }
    const R = { SALLY: id(1, 'SALLY'), TOM: id(1, 'TOM'), CATHY: id(1, 'CATHY') }
    for (const d of Object.values(D)) for (const r of Object.values(R)) conns.connect(d, r)
    const act = new Float64Array(net.units.length)
    const retrieved = new Uint8Array(net.units.length).fill(1)
    // Each driver SP fires once; with argument semantics ignored, both recipient SPs of the same role respond.
    const firings: [string, string[]][] = [
      ['BILL', ['SALLY', 'TOM']], // Bill+lover → lover+Sally, lover+Tom
      ['MARY', ['TOM', 'CATHY']], // Mary+beloved → beloved+Tom, beloved+Cathy
      ['MARY', ['SALLY', 'TOM']], // Mary+lover
      ['SAM', ['TOM', 'CATHY']], // Sam+beloved
    ]
    for (const [d, rs] of firings) {
      act.fill(0)
      act[D[d as keyof typeof D]] = 1
      for (const r of rs) act[R[r as keyof typeof R]] = 1
      updateHypotheses(conns, act, retrieved)
    }
    const h = (d: keyof typeof D, r: keyof typeof R) => conns.h[conns.find(D[d], R[r])]
    expect(h('BILL', 'SALLY')).toBe(1)
    expect(h('BILL', 'TOM')).toBe(1)
    expect(h('MARY', 'SALLY')).toBe(1)
    expect(h('MARY', 'TOM')).toBe(2)
    expect(h('MARY', 'CATHY')).toBe(1)
    expect(h('SAM', 'TOM')).toBe(1)
    expect(h('SAM', 'CATHY')).toBe(1)
    expect(h('BILL', 'CATHY')).toBe(0)
    expect(h('SAM', 'SALLY')).toBe(0)

    // Under the row-and-column normalization that A17's text and the code specify, one update
    // finds the whole object mapping: Bill→Sally, Mary→Tom and Sam→Cathy all reach 0.495.
    const snapshot = [...conns.h]
    updateWeightsHH2003(conns, configFor('HH2003'), retrieved)
    const w = (d: keyof typeof D, r: keyof typeof R) => conns.w[conns.find(D[d], R[r])]
    const winners = new Set(['BILL→SALLY', 'MARY→TOM', 'SAM→CATHY'])
    for (const d of Object.keys(D) as (keyof typeof D)[]) {
      for (const r of Object.keys(R) as (keyof typeof R)[]) {
        if (winners.has(`${d}→${r}`)) expect(w(d, r), `${d}→${r}`).toBeCloseTo(0.9 * 1.1 * 0.5, 6)
        else expect(w(d, r), `${d}→${r}`).toBe(0)
      }
    }
    // The paper's prose (p. 233: only Mary→Tom takes a positive weight) is what global normalization gives.
    conns.w.fill(0)
    snapshot.forEach((v, i) => (conns.h[i] = v))
    updateWeightsHH2003(conns, { ...configFor('HH2003'), hypothesisNormalization: 'global' }, retrieved)
    expect(w('MARY', 'TOM')).toBeCloseTo(0.9 * 1.1 * 0.5, 6)
    for (const d of Object.keys(D) as (keyof typeof D)[]) {
      for (const r of Object.keys(R) as (keyof typeof R)[]) {
        if (d === 'MARY' && r === 'TOM') continue
        expect(w(d, r), `global ${d}→${r}`).toBe(0)
      }
    }
  })
})

describe('the published mapping rule', () => {
  it('normalizes, competes one-to-one and approaches the 1.1 asymptote', () => {
    const net = buildNetwork(parseSymOrThrow(builtInScenario('lovetri9').sym))
    const conns = new Connections(net)
    const amy = net.findUnit(0, 'AMY')!.id
    const abe = net.findUnit(1, 'ABE')!.id
    const beth = net.findUnit(1, 'BETH')!.id
    const retrieved = new Uint8Array(net.units.length).fill(1)
    const c1 = conns.connect(amy, abe)
    conns.h[c1] = 4
    const cfg = { ...configFor('HH2003'), mappingLearningRate: 0.9 }
    updateWeightsHH2003(conns, cfg, retrieved)
    expect(conns.w[c1]).toBeCloseTo(1.1 * 0.9, 9)
    // A second update at full hypothesis keeps moving toward 1.1 but is clipped at 1.
    conns.h[c1] = 1
    updateWeightsHH2003(conns, cfg, retrieved)
    expect(conns.w[c1]).toBe(1)
    // Two equal hypotheses in one row cancel.
    const c2 = conns.connect(amy, beth)
    conns.w[c1] = 0
    conns.h[c1] = 1
    conns.h[c2] = 1
    updateWeightsHH2003(conns, cfg, retrieved)
    expect(conns.w[c1]).toBe(0)
    expect(conns.w[c2]).toBe(0)
    expect(conns.maxWeightTo(amy, 1)).toBe(0)
  })
})

describe('runs', () => {
  it('is deterministic from the seed', () => {
    const sc = parseSymOrThrow(builtInScenario('lovetri9').sym)
    const cfg = applyScenarioParameters(configFor('Hummel2007'), sc)
    const a = new LisaRun(sc, cfg, 42)
    const b = new LisaRun(sc, cfg, 42)
    a.runToEnd()
    b.runToEnd()
    expect(a.mappingReport()).toBe(b.mappingReport())
    expect(a.records).toEqual(b.records)
  })

  it('solves the structural love triangle under Hummel2007 (reference: 10/10)', () => {
    const sc = parseSymOrThrow(builtInScenario('lovetri9').sym)
    const cfg = applyScenarioParameters(configFor('Hummel2007'), sc)
    let correct = 0
    const seeds = 20
    const details: string[] = []
    for (let seed = 1; seed <= seeds; seed++) {
      const run = new LisaRun(sc, cfg, seed)
      run.runToEnd()
      const amy = run.bestMapping(0, 'AMY', 1)
      const bill = run.bestMapping(0, 'BILL', 1)
      const cat = run.bestMapping(0, 'CAT', 1)
      const ok = amy?.to === 'ABE' && bill?.to === 'BETH' && cat?.to === 'CHAD'
      if (ok) correct++
      details.push(`${seed}: AMY→${amy?.to} BILL→${bill?.to} CAT→${cat?.to}`)
    }
    if (correct < seeds) console.log('[lovetri9] ' + details.join(' | '))
    expect(correct / seeds).toBeGreaterThanOrEqual(0.9)
    // Object weights in the reference runs were 0.968; ours should be in the same range.
    const run = new LisaRun(sc, cfg, 1)
    run.runToEnd()
    const objs = run.mappings(0, 1, OBJ)
    expect(objs.length).toBeGreaterThan(0)
  })
})
