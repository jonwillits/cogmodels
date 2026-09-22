/**
 * The five presets: named points in the configuration space, one per witness
 * (spec §4, §8.8). `Hummel2007` is written out in full. The others are
 * expressed as overrides on it, so that every difference between witnesses is
 * visible as a diff, and a helper fills in the unchanged keys as `borrowed`.
 *
 * Provenance marks: `stated` = the witness gives this value or rule (see
 * `cite`); `inferred` = derived from its text, notes or behavior; `borrowed`
 * = the witness is silent, value taken from another preset; `ours` = our own
 * construction (rule recorded in docs/LISA_AS_BUILT.md).
 */
import type { LisaConfig, LisaConfigKey, Preset, PresetId, Setting } from './config'
import { resolve } from './config'

type Settings = Preset['settings']

const s = <T>(value: T, cite: string, note?: string): Setting<T> => ({
  value,
  provenance: 'stated',
  cite,
  ...(note ? { note } : {}),
})
const inferred = <T>(value: T, note: string, cite?: string): Setting<T> => ({
  value,
  provenance: 'inferred',
  note,
  ...(cite ? { cite } : {}),
})
const ours = <T>(value: T, note: string): Setting<T> => ({ value, provenance: 'ours', note })
const y97 = <T>(value: T, cite: string): Setting<T> => ({
  value,
  provenance: 'borrowed',
  cite,
  note: 'Used only by the 1997 rules; value from HH1997.',
})

const DT = 'dataTypes.py'
const RL = 'runLISA.py'

/** The code as Hummel ran it for the 2007 batch outputs in DATA/. */
const hummel2007Settings: Settings = {
  gammaActive: s(0.7, `${RL}:733`),
  deltaActive: s(0.2, `${RL}:734`),
  gammaDormant: s(0.5, `${RL}:739`),
  deltaDormant: s(0.3, `${RL}:740`),
  tau: s(0.2, `${DT}:5`),

  modeThreshold: s(0.01, `${RL}:119`),
  modeSetThreshold: s(0.3, `${RL}:324`, 'Implicit threshold in normal_update_driver_inputs.'),
  modeResetsToNeutral: s(false, `${RL}:119-122`, 'A mode is kept unless the evidence passes ±threshold.'),

  attentionInput: s(1.0, `${RL}:321`),
  inhibitorToExcitor: s(-3.0, `${DT}:59`),
  inhibitorToYoked: s(-1.0, `${DT}:60`),
  inhibitorThreshold: s(0.5, `${DT}:64`),
  slowInhGrowth: s(0.001, `${DT}:65`),
  fastInhGrowth: s(1.0, `${DT}:66`),
  slowInhDecay: s(0.01, `${DT}:67`),
  fastInhDecay: s(1.0, `${DT}:68`),
  inhLowerThreshold: s(0.1, `${DT}:288`),
  inhUpperThreshold: s(0.9, `${DT}:298`),
  minSTI: s(1.0, `${DT}:61`),
  maxSTI: s(3.0, `${DT}:62`),
  dSTI: s(-0.0015, `${DT}:63`),
  spInhibitionGain: s(2, `${RL}:389`, '"implicit wt of -2" on SP-to-SP inhibition.'),
  spNoise: inferred(0, 'The 2003-style driver has no random term in the code.'),
  driverInhibition: s(1.0, `${DT}:36`),
  driverRule: s('hh2003', `${RL}:297`),
  driverLateralRule: s('maxSecondMax', `${RL}:385-392`),
  legacyMaxSecondMax: ours(false, 'The helper bug (spec §8.3 item 1) is fixed; set true only to reproduce his outputs.'),

  gIOffThreshold: s(0.7, `${RL}:348`),
  globalInhibitionValue: s(-100, `${RL}:316`),
  refreshScope: s('allAnalogs', `${RL}:7-37`, 'init_all_inputs applies the refresh to every analog, the driver included.'),
  parentPropsSkipRefresh: s(true, `${RL}:26-29`, 'Under normal WM, once topDownOK, parent-mode P units start at td = 0.'),
  transitionGating: s(true, `${RL}:352`, '"the or inhibitor.. is new YO!"'),
  iterationsPerSP: s(330, `${DT}:56`),
  phaseDuration: s(100, `${DT}:57`),
  wmMode: s('normal', `${DT}:32`),
  batchedSPOrder: s('interleaved', `${RL}:319`, 'All phase-set SPs compete at once; his July 2007 notes call this a theory-to-code error.'),
  ignoreArgSemanticsWhenBatched: s(false, `${RL}:420-426`, 'Objects always feed their semantics.'),

  recipInhibition: s(1.0, `${DT}:37`, 'The pre-2015 default; the line now reads 0.5 with a 2/13/15 comment.'),
  propToPropInhib: s(-1.0, `${DT}:45`),
  spToSpInhib: s(-1.0, `${DT}:46`),
  opToOpInhib: inferred(-1.0, 'The code has no within-class inhibition among predicates or objects; this value is used only by the 2003 and 1997 rules.'),
  outPropPropToSP: s(-1.0, `${DT}:47`, 'Pre-2015 default.'),
  outPropSPToPred: s(-1.0, `${DT}:48`, 'Pre-2015 default.'),
  outPropSPToObj: s(-1.0, `${DT}:49`, 'Pre-2015 default.'),
  predToSP: s(1.0, `${DT}:50`),
  objToSP: s(1.0, `${DT}:51`),
  semToPred: s(1.5, `${DT}:52`),
  semToObj: s(0.5, `${DT}:53`),
  hebbBias: s(2.0, `${DT}:54`, 'Applied in the hebb input and again in update_activation, so the effective gain is 4.'),
  mappingExcitationGain: s(3, `${RL}:581`),
  recipientPInput: s('current', `${RL}:474-478`),
  recipientWithinClassInhibition: s('code', `${RL}:643-665`, 'Only parent-mode P units and SPs inhibit within class, by max/second-max.'),
  outOfPropositionRule: s('maxSecondMax', `${RL}:667-701`),
  semanticInputRule: s('cosine', `${RL}:503-514`),
  semanticNormalization: s('signedMax', `${RL}:807-815`),
  semanticNoise: s(0, `${DT}:33`),
  semanticDeath: s(0, `${DT}:34`),

  retrievalThreshold: s(0.4, `${DT}:55`),
  hypothesisNormalization: s('rowColumn', 'hebbs.py:524-545', 'Each buffer is divided by the largest in its own row and column.'),
  mappingAlgorithm: s('vers142', `${DT}:40`),
  mappingLearningRate: s(1.0, `${DT}:38`),

  sslThreshold: s(0.7, `${DT}:42`),
  semanticLearnUp: s(1.0, 'ssLearn.py', 'A weight jumps to the semantic activation when that is higher.'),
  semanticLearnDown: s(0.1, 'ssLearn.py'),
  inferenceGuards: s('code', 'ssLearn.py check_whether_analog_needs_infants'),
  inferredWiring: s('firstAbove0.5', 'ssLearn.py update_infant_sp'),

  readinessGrowth: s(0.1, `${DT}:71`),
  readinessMax: s(1.0, `${DT}:70`),
  supportDecay: s(0.5, `${RL}:966`),
  attention: s(1.0, `${DT}:35`),

  dormantCompetition: inferred('lucePostHoc', 'Retrieval was never implemented in the Python; the index is the 1997 formula.'),
  dormantInhibition: ours(true, 'The code has no dormant competition at all; we give dormant analogs the recipient inhibition (spec §7.12).'),

  y97SpParentExcitation: y97(2, '1997 A3'),
  y97SpNonParentInhibition: y97(1.5, '1997 A3'),
  y97SpArgExcitation: y97(0.5, '1997 A3'),
  y97SpPredExcitation: y97(0.5, '1997 A3'),
  y97SpSpInhibition: y97(6, '1997 A3'),
  y97InhibitorToExcitor: y97(3, '1997 A3'),
  y97InhSlowGrowth: y97(0.001, '1997 A4'),
  y97InhFastGrowth: y97(0.1, '1997 A4'),
  y97InhSlowDecay: y97(0.00105, '1997 A4'),
  y97InhFastDecay: y97(0.03, '1997 A4'),
  y97EpsilonP: y97(1.5, '1997 A5'),
  y97EpsilonOP: y97(2.0, '1997 A5'),
  y97InhibitorToBelow: y97(0.25, '1997 A5'),
  y97GlobalInhibition: y97(10, '1997 §2.4.3'),
  y97PBelowGain: y97(0.5, '1997 A7'),
  y97PAboveGain: y97(0.75, '1997 A7'),
  y97WithinClassGain: y97(3, '1997 A8'),
  y97KappaP: y97(1.5, '1997 A8'),
  y97KappaChildP: y97(1.0, '1997 A8'),
  y97KappaSP: y97(1.5, '1997 A8'),
  y97KappaPred: y97(1.0, '1997 A8'),
  y97KappaObj: y97(1.0, '1997 A8'),
  y97OmegaP: y97(0.25, '1997 A9'),
  y97OmegaSP: y97(1.5, '1997 A9'),
  y97OmegaPred: y97(1.5, '1997 A9'),
  y97OmegaObj: y97(0.25, '1997 A9'),
  y97SemanticGain: y97(0.5, '1997 A13'),
  y97DecayRate: y97(0.00001, '1997 A17'),
  y97MappingLearningRate: y97(0.5, '1997 A21'),
  y97IterationsPerRole: y97(300, '1997 §2.4'),
}

/** Build a preset from a base plus overrides; untouched keys become `borrowed`. */
function derive(
  id: PresetId,
  label: string,
  witness: string,
  base: Settings,
  from: PresetId,
  overrides: Partial<Settings>,
): Preset {
  const settings = {} as Record<string, Setting<unknown>>
  for (const k of Object.keys(base) as LisaConfigKey[]) {
    const o = overrides[k]
    if (o) settings[k] = o
    else {
      const b = base[k]
      settings[k] =
        b.provenance === 'borrowed' && b.note?.startsWith('Used only by the 1997')
          ? b
          : { value: b.value, provenance: 'borrowed', note: `Not stated by this witness; taken from ${from}.` }
    }
  }
  return { id, label, witness, settings: settings as unknown as Settings }
}

export const Hummel2007: Preset = {
  id: 'Hummel2007',
  label: 'Hummel 2007 (code, batch conditions)',
  witness:
    'Hummel’s Python LISA 1.00 as run for the 2007 batch outputs: his default parameter suite (Vers142 mapping, learning rate 1.0) with the pre-2015 "dangerous" defaults. Bugs fixed unless a legacy flag says otherwise.',
  settings: hummel2007Settings,
}

export const HummelSuite03: Preset = derive(
  'HummelSuite03',
  'Hummel’s "H&H 03 Parameter Suite"',
  'The code’s own reconstruction of the 2003 model: Hummel2007 with the published mapping algorithm and a learning rate of 0.9 (parameters.py option 50).',
  hummel2007Settings,
  'Hummel2007',
  {
    mappingAlgorithm: s('hh2003', 'parameters.py:203', 'Option 50 sets vers142_map_alg = False.'),
    mappingLearningRate: s(0.9, 'parameters.py:200'),
  },
)

export const Hummel2015: Preset = derive(
  'Hummel2015',
  'Hummel 2015 (code, later defaults)',
  'Hummel2007 with the four "dangerous" defaults he changed on 2015-02-13.',
  hummel2007Settings,
  'Hummel2007',
  {
    recipInhibition: s(0.5, `${DT}:37`, 'Changed 2/13/15 from 1.0.'),
    outPropPropToSP: s(-0.5, `${DT}:47`, 'Changed 2/13/15 from -1.0.'),
    outPropSPToPred: s(-0.5, `${DT}:48`, 'Changed 2/13/15 from -1.0.'),
    outPropSPToObj: s(-0.5, `${DT}:49`, 'Changed 2/13/15 from -1.0.'),
  },
)

export const HH2003: Preset = derive(
  'HH2003',
  'Hummel & Holyoak 2003 (paper)',
  'The 2003 paper’s Appendix A and Table A1: every switch on the paper’s side and every parameter at the published value; code values borrowed where the paper is silent.',
  hummel2007Settings,
  'Hummel2007',
  {
    gammaActive: s(0.3, '2003 Table A1'),
    deltaActive: s(0.1, '2003 Table A1'),
    tau: inferred(1, 'Eq. 5 has no time constant; τ = 1 makes the code’s update equal the paper’s.'),
    modeThreshold: s(0.01, '2003 Table A1 (φ)'),
    modeSetThreshold: inferred(0, 'Step 4.1: selected P units are simply placed in parent mode, their arguments in child mode.', '2003 App. A §4.1'),
    modeResetsToNeutral: s(true, '2003 A1.1', '"Neutral (0) otherwise".'),
    attentionInput: s(1.0, '2003 Table A1 (α)'),
    inhibitorToExcitor: s(-3.0, '2003 Table A1 (ι)'),
    inhibitorThreshold: s(0.2, '2003 Table A1 (Θ^I)'),
    minSTI: s(3.0, '2003 Table A1 (MinS)'),
    maxSTI: s(6.0, '2003 Table A1 (MaxS)'),
    dSTI: s(-0.0015, '2003 Table A1 (Δs)'),
    spInhibitionGain: s(1, '2003 A2', 'The sensitivity s_i is the whole gain.'),
    driverLateralRule: s('normalizedSum2003', '2003 A2'),
    globalInhibitionValue: s(-10, '2003 A6', 'Γ = 10, subtracted.'),
    refreshScope: s('nonDriver', '2003 App. A §4.3', '"inhibits all units in all nondriver analogs".'),
    parentPropsSkipRefresh: s(false, '2003 A6', 'Only π_i = 0 for parent-mode P units in the recipient; the driver is not refreshed at all.'),
    transitionGating: s(false, '2003 App. A §4.4', 'Top-down input waits only until every SP has fired once.'),
    iterationsPerSP: s(220, '2003 Table A1 (MaxT)', 'The text (App. A step 4) says 330.'),
    batchedSPOrder: inferred('grouped', 'Figure 7B shows the SPs of one proposition interleaved with the other’s, but p. 232 requires the recipient to align to each proposition; we take the paper’s intent as grouped. See LISA_AS_BUILT.', '2003 p. 232'),
    ignoreArgSemanticsWhenBatched: s(true, '2003 p. 232', '"whenever LISA places multiple propositions into WM, it ignores the semantic features of their arguments".'),
    recipInhibition: inferred(1.0, 'No such gain in the paper.'),
    propToPropInhib: inferred(-1.0, 'A8 has unit weights.'),
    spToSpInhib: inferred(-1.0, 'A8 has unit weights.'),
    opToOpInhib: inferred(-1.0, 'A8 has unit weights.'),
    outPropPropToSP: inferred(-1.0, 'A9 has unit weights.'),
    outPropSPToPred: inferred(-1.0, 'A9 has unit weights.'),
    outPropSPToObj: inferred(-1.0, 'A9 has unit weights.'),
    semToPred: inferred(1.0, 'A12 has no gain.'),
    semToObj: inferred(1.0, 'A12 has no gain.'),
    hebbBias: inferred(1.0, 'A10 has no gain beyond the factor 3.'),
    mappingExcitationGain: s(3, '2003 A10'),
    recipientWithinClassInhibition: s('normalizedSum2003', '2003 A8'),
    outOfPropositionRule: s('summed2003', '2003 A9'),
    semanticInputRule: s('weber2003', '2003 A12'),
    semanticNormalization: s('absMax', '2003 A14'),
    retrievalThreshold: s(0.5, '2003 Table A1 (Θ^R)'),
    hypothesisNormalization: s('rowColumn', '2003 p. 256', 'Normalized "by the largest hypothesis value in the same row or column". The Table 2 walkthrough on p. 233 comes out as described only under global normalization; see LISA_AS_BUILT.'),
    mappingAlgorithm: s('hh2003', '2003 A17'),
    mappingLearningRate: s(0.9, '2003 Table A1 (η)'),
    sslThreshold: s(0.7, '2003 Table A1 (π^m)'),
    semanticLearnUp: s(0.2, '2003 Table A1 (μ)'),
    semanticLearnDown: s(0.2, '2003 Table A1 (μ)'),
    inferenceGuards: s('cueOnly', '2003 p. 233', 'Inhibition unaccompanied by excitation is the cue.'),
    inferredWiring: ours('hebbian', 'The paper says "simple Hebbian learning" without a rule; ours is graded coactivity with pruning.'),
    readinessGrowth: s(0.1, '2003 Table A1 (γ^r)'),
    supportDecay: s(0.5, '2003 Table A1 (δ^r)'),
  },
)

export const HH1997: Preset = derive(
  'HH1997',
  'Hummel & Holyoak 1997 (paper)',
  'The 1997 paper’s Appendix A: its own driver, recipient, semantic and mapping rules (spec §7.13), with code values borrowed where it is silent.',
  hummel2007Settings,
  'Hummel2007',
  {
    gammaActive: s(0.3, '1997 A15'),
    deltaActive: s(0.1, '1997 A15 (φ)'),
    gammaDormant: s(0.3, '1997 A15', 'The growth rate is 0.3 for every analog.'),
    deltaDormant: s(0.3, '1997 A15 (φ for dormant analogs)'),
    tau: inferred(1, 'A15 has no time constant.'),
    modeThreshold: s(0.01, '1997 A1'),
    modeSetThreshold: inferred(0, 'The selected P unit is set to 1.0 and enters parent mode at selection.', '1997 §2.4.1'),
    modeResetsToNeutral: s(true, '1997 A1', '"Neutral otherwise".'),
    spNoise: s(0.1, '1997 A3 (ρ)'),
    driverRule: s('hh1997', '1997 A3–A5'),
    globalInhibitionValue: s(-10, '1997 §2.4.3', 'Γ = 1 enters as −10Γ.'),
    refreshScope: s('nonDriver', '1997 §2.4.3'),
    parentPropsSkipRefresh: s(false, '1997 A7', 'The −10πΓ term already spares parent-mode P units.'),
    transitionGating: inferred(false, 'There is no topDownOK gate in 1997 at all.'),
    iterationsPerSP: inferred(300, 'MaxT = 300 × number of case roles.', '1997 §2.4'),
    batchedSPOrder: inferred('interleaved', 'One proposition per phase set; the switch never applies.'),
    ignoreArgSemanticsWhenBatched: inferred(false, 'One proposition per phase set; the switch never applies.'),
    recipientPInput: s('maxSinceSelection', '1997 A7'),
    recipientWithinClassInhibition: s('divisive1997', '1997 A8'),
    outOfPropositionRule: s('summed2003', '1997 A9', 'The same summed form as 2003, with ω weights.'),
    semanticInputRule: s('fanInNormalized1997', '1997 A13'),
    semanticNormalization: s('none', '1997 A14'),
    retrievalThreshold: inferred(0.5, '1997 does not state a retrieval threshold; the 2003 value is used.'),
    mappingAlgorithm: s('hh1997', '1997 A16–A21'),
    mappingLearningRate: s(0.5, '1997 A21 (η⁺)'),
    hebbBias: inferred(1.0, 'A10 and A12 have no gain.'),
    dormantCompetition: s('lucePostHoc', '1997 Eq. 2'),
    dormantInhibition: s(true, '1997 §2.4.4', 'Dormant analogs are updated exactly like recipients, minus mapping input.'),
  },
)

export const presets: Record<PresetId, Preset> = {
  Hummel2007,
  HummelSuite03,
  Hummel2015,
  HH2003,
  HH1997,
}

export const presetIds: PresetId[] = ['Hummel2007', 'HummelSuite03', 'Hummel2015', 'HH2003', 'HH1997']

export const DEFAULT_PRESET: PresetId = 'Hummel2007'

export function configFor(id: PresetId): LisaConfig {
  return resolve(presets[id])
}
