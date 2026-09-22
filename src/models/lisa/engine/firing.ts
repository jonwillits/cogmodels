/**
 * Firing order: readiness, support, priority and random selection
 * (2003 Eqs. 1–4; runLISA.random_prop_select, update_prop_priorities,
 * spread_support_to_recipients). Spec §7.11.
 */
import type { LisaSim } from './sim'

/** Priority as the Luce rule sees it, with attention flattening it (computed on the fly; spec §8.3 item 3). */
function attended(sim: LisaSim, p: number): number {
  const a = sim.cfg.attention
  return sim.priority[p] * a + (1 - a)
}

/** Choose one proposition of the driver at random, in proportion to attended priority. */
export function randomPropSelect(sim: LisaSim, candidates: number[]): number {
  let sum = 0
  for (const p of candidates) {
    const pr = attended(sim, p)
    if (pr > 0) sum += pr
  }
  const target = sim.rng.next() * sum
  let acc = 0
  for (const p of candidates) {
    const pr = attended(sim, p)
    if (pr <= 0) continue
    if (target >= acc && target <= acc + pr) return p
    acc += pr
  }
  return candidates[candidates.length - 1]
}

/**
 * Called when a proposition enters a phase set (or with -1 at run start):
 * readiness recovers and support decays for every P unit; the entering one
 * has readiness and support zeroed and spreads support to those it supports.
 */
export function updatePriorities(sim: LisaSim, analog: number, entering: number): void {
  const { cfg, net } = sim
  const props = net.analogs[analog].p
  for (const p of props) {
    sim.readiness[p] = Math.min(cfg.readinessMax, sim.readiness[p] + cfg.readinessGrowth)
    sim.support[p] *= cfg.supportDecay
  }
  if (entering >= 0) {
    sim.readiness[entering] = 0
    sim.support[entering] = 0
    for (const link of net.units[entering].supports) sim.support[link.to] += link.w
  }
  for (const p of props) sim.priority[p] = sim.readiness[p] * (net.units[p].importance + sim.support[p])
}

/** At the end of a phase set: recipient P units gain support from mapped driver phase-set P units. */
export function spreadSupportToRecipients(sim: LisaSim, driverProps: number[]): void {
  const { net, conns, cfg } = sim
  for (const ai of sim.recips) for (const p of net.analogs[ai].p) sim.support[p] *= cfg.supportDecay
  for (const d of driverProps) {
    for (const c of conns.byUnit[d]) {
      const r = conns.other(c, d)
      if (sim.recips.includes(net.units[r].analog)) sim.support[r] += conns.w[c]
    }
  }
}
