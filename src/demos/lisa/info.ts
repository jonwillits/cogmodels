/**
 * Explanatory text for the ⓘ icons, keyed by element id (spec §10). Kept as
 * data so it can be edited in one place. Settings use `setting.<key>`.
 */
import type { InfoEntry } from '../../components/Info'
import type { LisaConfigKey } from '../../models/lisa/engine/config'
import { claimsForKey } from '../../models/lisa/claims'
import { Hummel2007 } from '../../models/lisa/engine/presets'

const entries: Record<string, InfoEntry> = {
  'tab.network': {
    title: 'Network',
    what: 'The driver analog on top, the two pools of semantic units in the middle, and each recipient below, mirrored so that predicates and objects sit nearest the semantics they share. Fill shows activation; an outline marks a unit retrieved into working memory; ▲ and ▼ mark parent and child mode on P units. Lines between analogs are mapping connections, thickness proportional to weight.',
    model: 'Structure units belong to one analog and connect only within it (weight 1). The semantic units are shared by every analog, and it is only through them, and through the mapping connections, that one analog affects another.',
    source: '2003, Figure 1 and §4; Hummel’s display colours (P yellow, SP blue, predicate green, object red).',
  },
  'tab.synchrony': {
    title: 'Synchrony',
    what: 'Activation over time, one strip per unit, over the last 2,000 iterations. Vertical lines mark phase-set starts; dashed green marks the moment top-down input is released; blue marks a mapping update.',
    model: 'Role–filler binding is carried by synchrony: an SP, its predicate and its object rise and fall together, out of phase with the other SPs of the same proposition. The recipient units that map to them follow in the same phase.',
    source: '2003, Figure 3B and pp. 223–225.',
  },
  'tab.mapping': {
    title: 'Mapping',
    what: 'One heatmap per unit type: driver units as rows, recipient units as columns, showing the mapping weights. The scrubber shows the matrix after each phase set; “live” shows the current weights, and the hypotheses toggle shows the buffers accumulating during a phase set.',
    model: 'Weights are updated only at the end of a phase set marked h, from the hypotheses that accumulated while both units were retrieved and top-down input was on.',
    source: '2003, Eq. 6 and A17; hebbs.original_update_hebb_weights and vers142_update_hebb_weights.',
  },
  'tab.batch': {
    title: 'Batch',
    what: 'Runs the current scenario under the current settings for N seeds in a Web Worker and reports how often each unit’s best mapping landed on each target, next to the reference outcome from Hummel’s batch files.',
    source: 'Spec §9.2 and §9.4.',
  },
  'tab.claims': {
    title: 'Claims',
    what: 'One entry per item of the claims audit that the mapping engine can test. Each shows the claim, its citation, what Hummel’s code does instead, and the switch or switches that reproduce the two sides. Compare runs the current scenario under both settings of one switch, over N seeds, and shows the outcome rates side by side.',
    source: 'LISA_CLAIMS_AUDIT.md in the Box research folder.',
  },
  'ctl.scenario': {
    title: 'Scenario',
    what: 'A pair (or more) of analogs and a sequence of phase sets, in Hummel’s .sym format. The built-ins are his own files, unchanged, with a header naming their origin and reference outcome.',
    source: 'Spec §9.2; LISA_Instructions.pdf pp. 9–19.',
  },
  'ctl.preset': {
    title: 'Preset',
    what: 'A named point in the configuration space: one witness to the LISA family (a paper, or Hummel’s code under one set of defaults). Every setting in a preset carries a mark saying whether the witness states it, whether it was inferred, borrowed from another witness, or is our construction. Advanced shows them all.',
    source: 'Spec §4 and §8.8.',
  },
  'ctl.seed': {
    title: 'Seed',
    what: 'Every random choice in a run (SP sensitivity to inhibition, random firing, semantic noise) comes from one stream seeded here, so the same seed replays the same run exactly. Change one setting and rerun to see what that setting did.',
  },
  'ctl.steps': {
    title: 'Stepping',
    what: '1 and 10 advance that many iterations. SP runs until a different SP is firing. Phase set runs to the end of the current phase set (and its mapping update, if any). End runs the whole sequence.',
  },
  'ctl.speed': { title: 'Speed', what: 'Iterations per animation frame while playing. The engine takes a few microseconds per iteration; the display is the slow part.' },
  'status.topDown': {
    title: 'Top-down',
    what: 'Whether the recipient is allowed to send activation downward (P → SP → predicate and object → semantics) and to accumulate mapping hypotheses. Off until every driver SP in the phase set has fired once, and, in the code, also off during every SP transition.',
    source: '2003, p. 255; runLISA.normal_update_driver_inputs.',
    claim: { id: 'gating', label: 'A gating signal the paper does not mention' },
  },
  'status.gi': {
    title: 'Global inhibitor',
    what: 'The refresh signal. On whenever no driver SP is above threshold, it drives every non-driver unit (and in the code the driver’s own P, predicate and object units) to zero, so that the recipient can follow the driver from one SP to the next.',
    source: '2003, App. A §4.3 (Γ); runLISA.init_all_inputs.',
    claim: { id: 'parents', label: 'Parent propositions spared from the refresh' },
  },
  'status.firing': { title: 'Firing SP', what: 'The most active SP among those receiving attention, when it is above 0.5. Its predicate and argument fire with it; that is the binding.' },
  'unit.P': {
    title: 'P units',
    what: 'One per proposition. A P unit is in parent mode when it is the proposition being expressed (it drives its SPs), in child mode when it is an argument of another proposition, and neutral otherwise.',
    source: '2003, A1; runLISA.update_modes.',
  },
  'unit.SP': {
    title: 'SP units',
    what: 'One per role binding: this predicate role with this argument. In the driver each SP has an inhibitor that turns it off after about 100 iterations and lets the next one fire; that is what makes the SPs of a proposition take turns.',
    source: '2003, A2–A3; dataTypes.SPUnit.update_inhibitor.',
    claim: { id: 'capacity', label: 'WM capacity as an a priori prediction' },
  },
  'unit.pred': { title: 'Predicate units', what: 'One per role of a relation (LOVES1 is the lover role). Each connects to its role’s semantic features.' },
  'unit.obj': { title: 'Object units', what: 'One per object. Each connects to its semantic features in the object pool.' },
  'unit.sem': {
    title: 'Semantic units',
    what: 'Shared by all analogs, in two pools (predicate and object). A unit’s activation is its input divided by the largest input in the pool. Negative activation represents negation.',
    source: '2003, A13–A14; runLISA.update_semantic_activations.',
  },
  'insp.inputs': {
    title: 'Net input',
    what: 'The four components of the unit’s net input on the last iteration: bottom-up (from below and from the semantics), top-down (from above, including the refresh), lateral (within-class inhibition) and mapping-based input (times the hebb bias). Activation moves toward the net input by the leaky-integrator rule.',
    source: '2003, Eq. 5; dataTypes.TokenUnit.update_activation.',
  },
  'insp.inhibitor': {
    title: 'Inhibitor and sensitivity',
    what: 'The inhibitor grows slowly while its SP is active, jumps to 1 once it passes 0.1, then decays slowly and drops. Sensitivity to inhibition (sti) jumps to its maximum when the SP fires and decays toward its minimum; the more recently an SP fired, the more it loses the competition.',
    source: '2003, A2–A3 and pp. 253–254.',
  },
  'insp.mode': { title: 'Mode', what: 'Parent (+1), child (−1) or neutral (0). Recipient modes are set by evidence: mapping input from driver P units in the same mode, plus activation from SPs below, minus activation from SPs above.' },
  'insp.support': { title: 'Readiness, support, priority', what: 'Used only when propositions are chosen at random: priority = readiness × (importance + support). Readiness drops to 0 when a proposition fires and recovers by 0.1 per phase set; support comes from other propositions.' },
  'insp.connections': { title: 'Mapping connections', what: 'This unit’s connections to units of the same type in other analogs, with their weights and the hypotheses accumulating in the current phase set.' },
  'map.quality': {
    title: 'Mapping quality',
    what: 'For each recipient: the importance-weighted mean over its units of (largest weight − second largest weight) to the driver. Self-supervised learning is licensed when it reaches the threshold (0.7), or always for an empty analog.',
    source: '2003, A15; hebbs.assess_mapping_quality.',
  },
  'adv.provenance': {
    title: 'Provenance marks',
    what: 'S: the witness states this value or rule (hover for the citation). I: inferred from its text or notes. B: the witness is silent; the value is borrowed from another preset. O: our own construction, recorded in LISA_AS_BUILT.md.',
  },
}

const settingText: Partial<Record<LisaConfigKey, string>> = {
  gammaActive: 'Activation growth rate for driver and recipient units.',
  deltaActive: 'Activation decay rate for driver and recipient units.',
  gammaDormant: 'Growth rate for dormant analogs.',
  deltaDormant: 'Decay rate for dormant analogs.',
  tau: 'Time constant on the activation update (the paper has none).',
  modeThreshold: 'Evidence above this puts a recipient P unit in parent mode; below its negative, child mode.',
  modeSetThreshold: 'A driver SP above this puts its parent in parent mode and its child argument in child mode.',
  modeResetsToNeutral: 'Whether a recipient P unit returns to neutral when evidence is within the threshold (the paper) or keeps its mode (the code).',
  attentionInput: 'External input to every SP in the phase set.',
  inhibitorToExcitor: 'Weight from an SP’s inhibitor to its own excitor.',
  inhibitorToYoked: 'Weight from an SP’s inhibitor to its predicate and argument.',
  inhibitorThreshold: 'SP activation above which its inhibitor grows (and, under the 2003 rules, counts as active for normalization).',
  slowInhGrowth: 'Inhibitor growth per iteration below the lower threshold (about 100 iterations to reach it).',
  fastInhGrowth: 'Inhibitor jump once past the lower threshold.',
  slowInhDecay: 'Inhibitor decay per iteration above the upper threshold.',
  fastInhDecay: 'Inhibitor drop once below the upper threshold.',
  inhLowerThreshold: 'Inhibitor level at which slow growth becomes a jump.',
  inhUpperThreshold: 'Inhibitor level at which slow decay becomes a drop.',
  minSTI: 'Minimum sensitivity to inhibition.',
  maxSTI: 'Sensitivity to inhibition right after an SP fires.',
  dSTI: 'Change in sensitivity per iteration (negative). Sets working-memory capacity.',
  spInhibitionGain: 'Multiplier on SP-to-SP inhibition (the code’s implicit 2; the paper’s 1).',
  spNoise: 'Uniform noise on each driver SP’s input, ± this value (1997 used 0.1; 2003 and the code none).',
  driverInhibition: 'Global multiplier on lateral inhibition in the driver.',
  driverRule: 'Which paper’s driver dynamics: 2003 (sensitivity to inhibition) or 1997 (summed SP inhibition with noise; phase 5).',
  driverLateralRule: 'Max/second-max (the code) or the normalized sum of A2 (the paper).',
  legacyMaxSecondMax: 'Reproduce the bug in Hummel’s max/second-max helper, for comparison with his outputs only.',
  gIOffThreshold: 'A driver SP above this turns the global inhibitor off.',
  globalInhibitionValue: 'The refresh input when the global inhibitor is on.',
  refreshScope: 'Whether the refresh reaches the driver’s own units (the code) or only non-driver analogs (the paper).',
  parentPropsSkipRefresh: 'Once top-down is on, parent-mode P units are spared the refresh (the code, added 2007).',
  transitionGating: 'Top-down also off while any driver SP’s inhibitor is above the lower threshold (the code).',
  iterationsPerSP: 'Phase-set length per SP under normal WM.',
  phaseDuration: 'Iterations each SP fires per turn under unlimited WM (each fires three times).',
  wmMode: 'Normal (capacity-limited, SPs time-share) or unlimited (SPs fire round-robin; a pedagogical contrast).',
  batchedSPOrder: 'With several propositions in a phase set: all SPs compete at once (the code) or one proposition’s SPs at a time (our reading of the paper).',
  ignoreArgSemanticsWhenBatched: 'With several propositions in a phase set, driver objects send nothing to the semantics (2003, p. 232).',
  recipInhibition: 'Global multiplier on inhibition in the recipient.',
  recipientWithinClassInhibition: 'The code (P and SP only, max/second-max), the 2003 normalized sum over every class, or the 1997 divisive rule (phase 5).',
  propToPropInhib: 'Weight of P-to-P inhibition in the recipient.',
  spToSpInhib: 'Weight of SP-to-SP inhibition in the recipient.',
  opToOpInhib: 'Weight of predicate-to-predicate and object-to-object inhibition (2003 and 1997 rules only).',
  outOfPropositionRule: 'Out-of-proposition inhibition from the two most active units (the code) or summed over all (the paper).',
  outPropPropToSP: 'Weight of inhibition from parent-mode P units to SPs outside their proposition.',
  outPropSPToPred: 'Weight of inhibition from SPs to predicates outside their proposition.',
  outPropSPToObj: 'Weight of inhibition from SPs to objects (and child P units) outside their proposition.',
  predToSP: 'Predicate-to-SP excitation in the recipient.',
  objToSP: 'Object-to-SP excitation in the recipient.',
  semanticInputRule: 'How predicate and object units read the semantics: cosine (the code), Weber fraction (2003 A12) or fan-in normalized (1997 A13; phase 5).',
  semToPred: 'Gain on semantic input to predicates.',
  semToObj: 'Gain on semantic input to objects.',
  semanticNormalization: 'Divide each pool by its largest signed input (the code), largest absolute input (2003 A14), or not at all (1997).',
  semanticNoise: 'Uniform noise added to each semantic unit’s input.',
  semanticDeath: 'Probability that each predicate/object-to-semantic link is zeroed for the run (Hummel’s frontotemporal degeneration simulations).',
  hebbBias: 'Gain on mapping-based input. The code applies it twice, so 2 acts as 4.',
  mappingExcitationGain: 'The factor 3 on mapping excitation (A10).',
  recipientPInput: 'Recipient P units read their SPs’ current activation, or (1997 A7) the maximum reached since selection (phase 5).',
  retrievalThreshold: 'A recipient P unit above this is retrieved into WM and gets mapping connections.',
  mappingAlgorithm: 'The published rule (normalize, subtract, learn toward 1.1), Hummel & Green’s Vers142 (connections settle as a constraint network), or 1997 (signed weights; phase 5).',
  hypothesisNormalization: 'Divide each hypothesis by the largest in its row and column (p. 256, the code) or by the largest anywhere (the p. 233 walkthrough).',
  mappingLearningRate: 'η in the weight update.',
  sslThreshold: 'Mapping quality needed to license self-supervised learning.',
  semanticLearnUp: 'Rate at which an inferred unit’s semantic weight rises toward an active semantic.',
  semanticLearnDown: 'Rate at which it falls.',
  inferenceGuards: 'The code’s four guards on inferring a unit, or the cue alone.',
  inferredWiring: 'How inferred units attach: first unit above 0.5 (the code) or graded Hebbian wiring (ours).',
  readinessGrowth: 'Readiness recovered per phase set.',
  readinessMax: 'Maximum readiness.',
  supportDecay: 'Support multiplier per phase set.',
  attention: 'Flattens priorities toward equal when below 1 (aging simulations).',
  dormantCompetition: 'Retrieval index as a formula (1997 Eq. 2) or real competition between dormant analogs (ours; phase 5).',
  dormantInhibition: 'Dormant analogs get the recipient’s lateral and out-of-proposition inhibition.',
}

export function infoFor(id: string): InfoEntry | undefined {
  if (entries[id]) return entries[id]
  if (id.startsWith('setting.')) {
    const key = id.slice('setting.'.length) as LisaConfigKey
    const s = Hummel2007.settings[key]
    if (!s) return undefined
    const claim = claimsForKey(key)[0]
    return {
      title: key,
      what: settingText[key] ?? 'A constant of the 1997 rules (spec §7.13).',
      source: `Hummel2007: ${s.value} (${s.provenance}${s.cite ? ', ' + s.cite : ''}${s.note ? '; ' + s.note : ''})`,
      claim: claim ? { id: claim.id, label: claim.title } : undefined,
    }
  }
  return undefined
}

export const infoIds = Object.keys(entries)
