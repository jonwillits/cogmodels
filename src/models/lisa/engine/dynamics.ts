/**
 * One iteration of the network (spec §7.1–§7.9), ported from
 * runLISA.update_network with the architectural switches of spec §8.7.
 *
 * Every function here takes the simulation and mutates its arrays. Inputs are
 * computed from the previous iteration's activations; then all activations
 * are updated together.
 */
import { P, type Unit } from './network'
import type { LisaSim } from './sim'
import { updateHypotheses } from './mapping'

// ---------------------------------------------------------------------------
// helpers

/**
 * The most and second most active units in a list, optionally restricted to
 * P units in a given mode (non-P units always qualify).
 *
 * Hummel's helper (runLISA.get_max_and_second_max) sets second-max only when
 * a later unit beats the current max, so it is often None when two units are
 * active. `legacy` reproduces that; the default is the correct rule.
 */
export function maxAndSecond(
  list: number[],
  act: Float64Array,
  mode: Int8Array,
  units: Unit[],
  requiredMode: number | null,
  legacy: boolean,
): [number, number] {
  let max = -1
  let second = -1
  for (const id of list) {
    if (requiredMode !== null && units[id].type === P && mode[id] !== requiredMode) continue
    if (max < 0) {
      max = id
    } else if (act[id] >= act[max]) {
      second = max
      max = id
    } else if (!legacy && (second < 0 || act[id] > act[second])) {
      second = id
    }
  }
  return [max, second]
}

function modesConsistent(mode: Int8Array, d: number, r: number, units: Unit[]): boolean {
  if (units[d].type !== P) return true
  return mode[d] === mode[r] || mode[r] === 0
}

// ---------------------------------------------------------------------------
// 1. initialize inputs

export function initInputs(sim: LisaSim): void {
  const { cfg, net, mode } = sim
  const n = net.units.length
  const gi = sim.gi
  const spareParents = cfg.parentPropsSkipRefresh && cfg.wmMode === 'normal' && sim.topDownOK
  const nonDriverOnly = cfg.refreshScope === 'nonDriver'
  sim.bu.fill(0)
  sim.lat.fill(0)
  sim.hebb.fill(0)
  for (let i = 0; i < n; i++) {
    const u = net.units[i]
    let refresh = gi
    if (nonDriverOnly && u.analog === sim.driver) refresh = 0
    else if (u.type === P && mode[i] === 1 && spareParents) refresh = 0
    sim.td[i] = refresh
  }
  sim.predSemInput.fill(0)
  sim.objSemInput.fill(0)
}

// ---------------------------------------------------------------------------
// 2. recipient P-unit modes (2003 A1; runLISA.update_modes)

export function updateModes(sim: LisaSim): void {
  const { net, act, mode, conns, cfg } = sim
  const units = net.units
  for (const ai of sim.recips) {
    for (const r of net.analogs[ai].p) {
      let evidence = 0
      for (const c of conns.byUnit[r]) {
        const d = conns.other(c, r)
        if (units[d].analog !== sim.driver) continue
        evidence += mode[d] * act[d] * conns.w[c]
      }
      const u = units[r]
      for (const s of u.sps) evidence += act[s]
      for (const s of u.parentSPs) evidence -= act[s]
      if (evidence > cfg.modeThreshold) mode[r] = 1
      else if (evidence < -cfg.modeThreshold) mode[r] = -1
      else if (cfg.modeResetsToNeutral) mode[r] = 0
    }
  }
}

// ---------------------------------------------------------------------------
// 3. driver inputs, normal WM (2003 A2–A5; runLISA.normal_update_driver_inputs)

function updateInhibitor(sim: LisaSim, sp: number): void {
  const { cfg } = sim
  let sti = sim.sti[sp] + cfg.dSTI
  if (sti < cfg.minSTI) sti = cfg.minSTI
  sim.sti[sp] = sti
  let inh = sim.inhibitor[sp]
  if (sim.act[sp] > cfg.inhibitorThreshold) {
    if (inh < cfg.inhLowerThreshold) inh += cfg.slowInhGrowth
    else {
      inh += cfg.fastInhGrowth
      if (inh > 1) inh = 1
      sim.timesFired[sp]++
      sim.sti[sp] = cfg.maxSTI
    }
  } else if (inh > cfg.inhUpperThreshold) inh -= cfg.slowInhDecay
  else {
    inh -= cfg.fastInhDecay
    if (inh < 0) inh = 0
  }
  sim.inhibitor[sp] = inh
}

export function driverInputsNormal(sim: LisaSim): void {
  const { cfg, net, act, td, bu, lat, mode, inhibitor } = sim
  const units = net.units
  const phase = sim.phase!
  const active = phase.activeSPs
  sim.gi = cfg.globalInhibitionValue
  let tdOK = true
  for (const sp of active) {
    const u = units[sp]
    td[sp] = cfg.attentionInput
    if (cfg.spNoise > 0) td[sp] += (sim.rng.next() * 2 - 1) * cfg.spNoise
    const p = u.parent
    if (act[sp] > cfg.modeSetThreshold) mode[p] = 1
    bu[p] += act[sp]
    td[sp] += act[p]
    updateInhibitor(sim, sp)
    td[sp] += inhibitor[sp] * cfg.inhibitorToExcitor
    const yoked = act[sp] + inhibitor[sp] * cfg.inhibitorToYoked
    if (u.child >= 0 && act[sp] > cfg.modeSetThreshold) {
      mode[u.child] = -1
      td[u.child] += yoked
    }
    if (u.obj >= 0) td[u.obj] += yoked
    td[u.pred] += yoked
    if (act[sp] > cfg.gIOffThreshold) sim.gi = 0
    if (sim.timesFired[sp] < 1 || (cfg.transitionGating && inhibitor[sp] > cfg.inhLowerThreshold)) tdOK = false
  }
  sim.topDownOK = tdOK

  const di = cfg.driverInhibition
  const legacy = cfg.legacyMaxSecondMax
  if (cfg.driverLateralRule === 'maxSecondMax') {
    // Parent-mode P units.
    let [max, second] = maxAndSecond(phase.props, act, mode, units, 1, legacy)
    for (const p of phase.props) {
      if (mode[p] !== 1) continue
      if (p === max) {
        if (second >= 0) lat[p] -= act[second] * di
      } else if (max >= 0) lat[p] -= act[max] * di
    }
    // SPs, weighted by the receiving SP's sensitivity to inhibition.
    ;[max, second] = maxAndSecond(active, act, mode, units, null, legacy)
    for (const sp of active) {
      const g = sim.sti[sp] * cfg.spInhibitionGain * di
      if (sp === max) {
        if (second >= 0) lat[sp] -= act[second] * g
      } else if (max >= 0) lat[sp] -= act[max] * g
    }
    // Predicates.
    ;[max, second] = maxAndSecond(phase.preds, act, mode, units, null, legacy)
    for (const pr of phase.preds) {
      if (pr === max) {
        if (second >= 0) lat[pr] -= act[second] * di
      } else if (max >= 0) lat[pr] -= act[max] * di
    }
    // Objects and child-mode P units, as one pool.
    ;[max, second] = maxAndSecond(phase.objsAndChilds, act, mode, units, -1, legacy)
    for (const x of phase.objsAndChilds) {
      if (units[x].type === P && mode[x] !== -1) continue
      if (x === max) {
        if (second >= 0) lat[x] -= act[second] * di
      } else if (max >= 0) lat[x] -= act[max] * di
    }
  } else {
    // 2003 A2: s_i Σ_{j≠i} e_j / (1 + NSP), with no lateral inhibition among P, predicate or object units.
    let nsp = 0
    let sum = 0
    for (const sp of active) {
      if (act[sp] > cfg.inhibitorThreshold) nsp++
      sum += act[sp]
    }
    for (const sp of active) {
      lat[sp] -= (sim.sti[sp] * cfg.spInhibitionGain * di * (sum - act[sp])) / (1 + nsp)
    }
  }

  // Semantics from the driver's predicates and objects.
  const ignoreArgs = cfg.ignoreArgSemanticsWhenBatched && phase.props.length > 1
  for (const pr of phase.preds) {
    const u = units[pr]
    for (let k = 0; k < u.sem.length; k++) sim.predSemInput[u.sem[k]] += u.semW[k] * act[pr]
  }
  if (!ignoreArgs) {
    for (const ob of phase.objs) {
      const u = units[ob]
      for (let k = 0; k < u.sem.length; k++) sim.objSemInput[u.sem[k]] += u.semW[k] * act[ob]
    }
  }
}

// ---------------------------------------------------------------------------
// 3b. driver inputs, unlimited WM (runLISA.god_like_update_driver_inputs)

export function driverInputsUnlimited(sim: LisaSim): void {
  const { cfg, net, act, td, bu, mode } = sim
  const units = net.units
  const phase = sim.phase!
  const list = phase.activeSPs
  if (sim.phaseIteration >= cfg.phaseDuration - 1) {
    const head = list[0]
    sim.timesFired[head]++
    for (const sp of list) {
      act[sp] = 0
      td[sp] = 0
      bu[sp] = 0
      sim.lat[sp] = 0
    }
    const u = units[head]
    td[u.pred] = -10
    if (u.obj >= 0) td[u.obj] = -10
    if (u.child >= 0) td[u.child] = -10
    list.push(list.shift()!)
    td[list[0]] = 1
    sim.gi = -100
    sim.phaseIteration = 0
  } else {
    const head = list[0]
    const u = units[head]
    td[head] = 1
    bu[u.parent] += act[head]
    mode[u.parent] = 1
    td[u.pred] += act[head]
    const pr = units[u.pred]
    for (let k = 0; k < pr.sem.length; k++) sim.predSemInput[pr.sem[k]] += pr.semW[k] * act[head]
    if (u.obj >= 0) {
      td[u.obj] += act[head]
      const ob = units[u.obj]
      for (let k = 0; k < ob.sem.length; k++) sim.objSemInput[ob.sem[k]] += ob.semW[k] * act[u.obj]
    }
    if (u.child >= 0) {
      td[u.child] += act[head]
      mode[u.child] = -1
    }
    sim.gi = -10
    for (const sp of list) if (act[sp] >= 0.7) sim.gi = 0
  }
  sim.phaseIteration++
  let tdOK = true
  for (const sp of list) if (sim.timesFired[sp] === 0) tdOK = false
  sim.topDownOK = tdOK
}

// ---------------------------------------------------------------------------
// 4. recipient and dormant inputs (2003 A6–A12; runLISA.update_recip_inputs)

function bottomUp(sim: LisaSim, ai: number, predLen: number, objLen: number): void {
  const { cfg, net, act, bu, mode } = sim
  const units = net.units
  const a = net.analogs[ai]
  for (const p of a.p) {
    if (mode[p] > -1) for (const s of units[p].sps) bu[p] += act[s]
  }
  for (const s of a.sp) {
    const u = units[s]
    bu[s] += cfg.predToSP * act[u.pred]
    if (u.obj >= 0) bu[s] += cfg.objToSP * act[u.obj]
    if (u.child >= 0 && mode[u.child] === -1) bu[s] += act[u.child]
  }
  const rule = cfg.semanticInputRule
  const semInput = (u: Unit, semAct: Float64Array, poolLen: number, gain: number): number => {
    let dot = 0
    for (let k = 0; k < u.sem.length; k++) dot += semAct[u.sem[k]] * u.semW[k]
    if (rule === 'cosine') {
      const len = net.weightLength[u.id] * poolLen
      return len > 0 ? (gain * dot) / len : 0
    }
    if (rule === 'weber2003') return (gain * dot) / net.weberSum[u.id]
    return (cfg.y97SemanticGain * dot) / (1 + u.sem.length)
  }
  for (const pr of a.pred) bu[pr] = semInput(units[pr], sim.predSemAct, predLen, cfg.semToPred)
  for (const ob of a.obj) bu[ob] = semInput(units[ob], sim.objSemAct, objLen, cfg.semToObj)
}

function vectorLength(v: Float64Array): number {
  let s = 0
  for (let i = 0; i < v.length; i++) s += v[i] * v[i]
  return Math.sqrt(s)
}

/** Mapping-based input from one driver phase-set unit to every recipient (2003 A10). */
function hebbInputFrom(sim: LisaSim, d: number): void {
  const { cfg, net, act, hebb, mode, conns } = sim
  const units = net.units
  const du = units[d]
  const gainInh = act[d] * cfg.recipInhibition * cfg.hebbBias
  const gainExc = act[d] * cfg.mappingExcitationGain * cfg.hebbBias
  for (const ai of sim.recips) {
    const a = net.analogs[ai]
    const rList = [a.p, a.sp, a.pred, a.obj][du.type]
    const maxWd = conns.maxWeightTo(d, ai)
    for (const r of rList) {
      if (!modesConsistent(mode, d, r, units)) continue
      hebb[r] -= (conns.maxWeightTo(r, sim.driver) + maxWd) * gainInh
    }
  }
  for (const c of conns.byUnit[d]) {
    const r = conns.other(c, d)
    const ra = units[r].analog
    if (!sim.recips.includes(ra)) continue
    if (!modesConsistent(mode, d, r, units)) continue
    hebb[r] += conns.w[c] * gainExc
  }
}

function lateralAndTopDown(sim: LisaSim, ai: number): void {
  const { cfg, net, act, td, lat, mode } = sim
  const units = net.units
  const a = net.analogs[ai]
  const ri = cfg.recipInhibition
  const legacy = cfg.legacyMaxSecondMax
  const [maxP, secondP] = maxAndSecond(a.p, act, mode, units, 1, legacy)
  const [maxSP, secondSP] = maxAndSecond(a.sp, act, mode, units, null, legacy)

  // Within-class inhibition.
  if (cfg.recipientWithinClassInhibition === 'code') {
    for (const p of a.p) {
      if (mode[p] !== 1) continue
      const src = p === maxP ? secondP : maxP
      if (src >= 0) lat[p] = cfg.propToPropInhib * act[src] * ri
    }
    for (const s of a.sp) {
      const src = s === maxSP ? secondSP : maxSP
      if (src >= 0) lat[s] = cfg.spToSpInhib * act[src] * ri
    }
  } else if (cfg.recipientWithinClassInhibition === 'normalizedSum2003') {
    // 2003 A8: Σ_{j≠i} a_j m(i,j) / (1 + n), n = units in the class above Θ^I.
    const th = cfg.inhibitorThreshold
    const classSum = (list: number[], ok: (i: number, j: number) => boolean, weight: number) => {
      for (const i of list) {
        let sum = 0
        let n = 0
        for (const j of list) {
          if (j === i || !ok(i, j)) continue
          sum += act[j]
          if (act[j] > th) n++
        }
        lat[i] += (weight * sum * ri) / (1 + n)
      }
    }
    // Parent and neutral P units among themselves; child P units with each other and with objects.
    classSum(a.p, (i, j) => mode[i] !== -1 && mode[j] !== -1, cfg.propToPropInhib)
    classSum(a.sp, () => true, cfg.spToSpInhib)
    classSum(a.pred, () => true, cfg.opToOpInhib)
    const objsAndChildren = [...a.obj, ...a.p.filter((p) => mode[p] === -1)]
    classSum(objsAndChildren, () => true, cfg.opToOpInhib)
  } else {
    throw new Error(`recipientWithinClassInhibition "${cfg.recipientWithinClassInhibition}" is not implemented yet (phase 5)`)
  }

  if (!sim.topDownOK) return

  // Out-of-proposition inhibition.
  if (cfg.outOfPropositionRule === 'maxSecondMax') {
    for (const s of a.sp) {
      const src = units[s].parent === maxP ? secondP : maxP
      if (src >= 0) td[s] += cfg.outPropPropToSP * act[src] * ri
    }
    const hasArg = (sp: number) => units[sp].obj >= 0 || units[sp].child >= 0
    for (const pr of a.pred) {
      const above = units[pr].spsAbove
      if (maxSP >= 0 && !above.includes(maxSP) && units[maxSP].pred >= 0) td[pr] += cfg.outPropSPToPred * act[maxSP] * ri
      if (secondSP >= 0 && !above.includes(secondSP) && units[secondSP].pred >= 0) td[pr] += cfg.outPropSPToPred * act[secondSP] * ri
    }
    for (const ob of a.obj) {
      const above = units[ob].spsAbove
      if (maxSP >= 0 && !above.includes(maxSP) && hasArg(maxSP)) td[ob] += cfg.outPropSPToObj * act[maxSP] * ri
      // Hummel's code tests max_sp's child here where it means second_max_sp's; fixed (spec §8.3 item 2).
      if (secondSP >= 0 && !above.includes(secondSP) && hasArg(secondSP)) td[ob] += cfg.outPropSPToObj * act[secondSP] * ri
    }
    for (const p of a.p) {
      if (mode[p] !== -1) continue
      const above = units[p].parentSPs
      if (maxSP >= 0 && !above.includes(maxSP) && hasArg(maxSP)) td[p] += cfg.outPropSPToObj * act[maxSP] * ri
      if (secondSP >= 0 && !above.includes(secondSP) && hasArg(secondSP)) td[p] += cfg.outPropSPToObj * act[secondSP] * ri
    }
  } else {
    // 2003 A9: sums over every unit outside the proposition.
    for (const s of a.sp) {
      let sum = 0
      for (const p of a.p) if (mode[p] === 1 && p !== units[s].parent) sum += act[p]
      td[s] += cfg.outPropPropToSP * sum * ri
    }
    for (const pr of a.pred) {
      let sum = 0
      for (const s of a.sp) if (!units[pr].spsAbove.includes(s)) sum += act[s]
      td[pr] += cfg.outPropSPToPred * sum * ri
    }
    for (const ob of a.obj) {
      let sum = 0
      for (const s of a.sp) if (!units[ob].spsAbove.includes(s)) sum += act[s]
      td[ob] += cfg.outPropSPToObj * sum * ri
    }
    for (const p of a.p) {
      if (mode[p] === 1) continue
      const u = units[p]
      let sum = 0
      for (const s of a.sp) if (!u.parentSPs.includes(s) && !u.sps.includes(s)) sum += act[s]
      td[p] += cfg.outPropSPToObj * sum * ri
    }
  }

  // Top-down excitation.
  const weber = cfg.semanticInputRule === 'weber2003'
  for (const pr of a.pred) {
    const u = units[pr]
    for (let k = 0; k < u.sem.length; k++) sim.predSemInput[u.sem[k]] += act[pr] * u.semW[k]
    let sum = 0
    for (const s of u.spsAbove) sum += act[s]
    td[pr] += weber ? sum / (1 + u.spsAbove.length) : sum
  }
  for (const ob of a.obj) {
    const u = units[ob]
    for (let k = 0; k < u.sem.length; k++) sim.objSemInput[u.sem[k]] += act[ob] * u.semW[k]
    let sum = 0
    for (const s of u.spsAbove) sum += act[s]
    td[ob] += weber ? sum / (1 + u.spsAbove.length) : sum
  }
  for (const p of a.p) for (const s of units[p].sps) td[s] += act[p]
  for (const s of a.sp) {
    const u = units[s]
    if (u.child >= 0) td[u.child] += act[s]
  }
}

export function recipientInputs(sim: LisaSim): void {
  const { net, cfg } = sim
  const predLen = vectorLength(sim.predSemAct)
  const objLen = vectorLength(sim.objSemAct)
  for (const a of net.analogs) if (a.index !== sim.driver) bottomUp(sim, a.index, predLen, objLen)
  const phase = sim.phase!
  for (const d of phase.props) hebbInputFrom(sim, d)
  for (const d of phase.sps) hebbInputFrom(sim, d)
  for (const d of phase.preds) hebbInputFrom(sim, d)
  for (const d of phase.objs) hebbInputFrom(sim, d)
  for (const d of phase.childProps) hebbInputFrom(sim, d)
  for (const ai of sim.recips) lateralAndTopDown(sim, ai)
  if (cfg.dormantInhibition) for (const ai of sim.dormant) lateralAndTopDown(sim, ai)
}

// ---------------------------------------------------------------------------
// 5. activations (2003 Eq. 5) and retrieval into WM (§4.7)

function updateActivationsOf(sim: LisaSim, ai: number, gamma: number, delta: number): void {
  const { cfg, act, bu, td, lat, hebb, net } = sim
  const tau = cfg.tau
  const hb = cfg.hebbBias
  for (const i of net.analogs[ai].units) {
    const netInput = bu[i] + td[i] + lat[i] + hebb[i] * hb
    let a = act[i] + tau * (gamma * netInput * (1 - act[i]) - delta * act[i])
    if (a > 1) a = 1
    if (a < 0) a = 0
    act[i] = a
  }
}

function retrieveIntoWM(sim: LisaSim, ai: number): void {
  const { cfg, net, act, mode, retrieved, conns } = sim
  const units = net.units
  const phase = sim.phase!
  const connectAll = (r: number, list: number[]) => {
    for (const d of list) conns.connect(r, d)
  }
  for (const p of net.analogs[ai].p) {
    if (retrieved[p] || act[p] <= cfg.retrievalThreshold) continue
    retrieved[p] = 1
    connectAll(p, phase.props)
    if (mode[p] !== 1) continue
    for (const s of units[p].sps) {
      const su = units[s]
      retrieved[s] = 1
      connectAll(s, phase.sps)
      retrieved[su.pred] = 1
      connectAll(su.pred, phase.preds)
      if (su.obj >= 0) {
        retrieved[su.obj] = 1
        connectAll(su.obj, phase.objs)
      }
      if (su.child >= 0) {
        retrieved[su.child] = 1
        connectAll(su.child, phase.childProps)
      }
    }
  }
}

export function updateActivations(sim: LisaSim): void {
  const { cfg } = sim
  updateActivationsOf(sim, sim.driver, cfg.gammaActive, cfg.deltaActive)
  for (const ai of sim.recips) {
    updateActivationsOf(sim, ai, cfg.gammaActive, cfg.deltaActive)
    retrieveIntoWM(sim, ai)
  }
  for (const ai of sim.dormant) updateActivationsOf(sim, ai, cfg.gammaDormant, cfg.deltaDormant)
}

// ---------------------------------------------------------------------------
// 7. semantic units (2003 A13–A14)

function updatePool(sim: LisaSim, input: Float64Array, act: Float64Array): void {
  const { cfg } = sim
  if (cfg.semanticNoise > 0) for (let i = 0; i < input.length; i++) input[i] += sim.rng.next() * cfg.semanticNoise
  if (cfg.semanticNormalization === 'none') {
    act.set(input)
    return
  }
  let max = 1
  for (let i = 0; i < input.length; i++) {
    const v = cfg.semanticNormalization === 'absMax' ? Math.abs(input[i]) : input[i]
    if (v > max) max = v
  }
  for (let i = 0; i < input.length; i++) act[i] = input[i] / max
}

export function updateSemantics(sim: LisaSim): void {
  updatePool(sim, sim.objSemInput, sim.objSemAct)
  updatePool(sim, sim.predSemInput, sim.predSemAct)
}

// ---------------------------------------------------------------------------
// one iteration

export function updateNetwork(sim: LisaSim): void {
  initInputs(sim)
  updateModes(sim)
  if (sim.cfg.wmMode === 'unlimited') driverInputsUnlimited(sim)
  else driverInputsNormal(sim)
  recipientInputs(sim)
  updateActivations(sim)
  // (self-supervised learning goes here in phase 3)
  updateSemantics(sim)
  if (sim.topDownOK) updateHypotheses(sim.conns, sim.act, sim.retrieved)
}

