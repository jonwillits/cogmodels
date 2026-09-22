/**
 * The LISA configuration object.
 *
 * One flat object of numbers and switches (spec §8.8). The engine reads this
 * and nothing else about "which LISA" it is running. A preset (presets.ts) is
 * the annotated form: every key here, with a value and a provenance mark.
 *
 * Numbers are named after the spec's parameter table (§8.1). Keys prefixed
 * `y97` are used only by the 1997 rules (§7.13) and are ignored unless a
 * 1997 switch is selected.
 */

export type WmMode = 'normal' | 'unlimited'
export type DriverRule = 'hh2003' | 'hh1997'
export type DriverLateralRule = 'maxSecondMax' | 'normalizedSum2003'
export type BatchedSPOrder = 'interleaved' | 'grouped'
export type RecipientPInput = 'current' | 'maxSinceSelection'
export type WithinClassInhibition = 'code' | 'normalizedSum2003' | 'divisive1997'
export type OutOfPropositionRule = 'maxSecondMax' | 'summed2003'
export type SemanticInputRule = 'cosine' | 'weber2003' | 'fanInNormalized1997'
export type SemanticNormalization = 'signedMax' | 'absMax' | 'none'
export type MappingAlgorithm = 'hh2003' | 'vers142' | 'hh1997'
export type InferenceGuards = 'code' | 'cueOnly'
export type InferredWiring = 'firstAbove0.5' | 'hebbian'
export type DormantCompetition = 'lucePostHoc' | 'network'
export type RefreshScope = 'allAnalogs' | 'nonDriver'
export type HypothesisNormalization = 'rowColumn' | 'global'

export interface LisaConfig {
  // ---- activation (spec §7.7) ----
  gammaActive: number
  deltaActive: number
  gammaDormant: number
  deltaDormant: number
  tau: number

  // ---- modes (§7.2, §7.5) ----
  modeThreshold: number
  modeSetThreshold: number
  modeResetsToNeutral: boolean

  // ---- driver SPs and inhibitors (§7.2) ----
  attentionInput: number
  inhibitorToExcitor: number
  inhibitorToYoked: number
  inhibitorThreshold: number
  slowInhGrowth: number
  fastInhGrowth: number
  slowInhDecay: number
  fastInhDecay: number
  inhLowerThreshold: number
  inhUpperThreshold: number
  minSTI: number
  maxSTI: number
  dSTI: number
  spInhibitionGain: number
  spNoise: number
  driverInhibition: number
  driverRule: DriverRule
  driverLateralRule: DriverLateralRule
  legacyMaxSecondMax: boolean

  // ---- global inhibitor and phase sets (§6, §7.3) ----
  gIOffThreshold: number
  globalInhibitionValue: number
  refreshScope: RefreshScope
  parentPropsSkipRefresh: boolean
  transitionGating: boolean
  iterationsPerSP: number
  phaseDuration: number
  wmMode: WmMode
  batchedSPOrder: BatchedSPOrder
  ignoreArgSemanticsWhenBatched: boolean

  // ---- recipient inputs (§7.4) ----
  recipInhibition: number
  propToPropInhib: number
  spToSpInhib: number
  opToOpInhib: number
  outPropPropToSP: number
  outPropSPToPred: number
  outPropSPToObj: number
  predToSP: number
  objToSP: number
  semToPred: number
  semToObj: number
  hebbBias: number
  mappingExcitationGain: number
  recipientPInput: RecipientPInput
  recipientWithinClassInhibition: WithinClassInhibition
  outOfPropositionRule: OutOfPropositionRule
  semanticInputRule: SemanticInputRule
  semanticNormalization: SemanticNormalization
  semanticNoise: number
  semanticDeath: number

  // ---- retrieval into WM and mapping (§7.8, §7.9) ----
  retrievalThreshold: number
  hypothesisNormalization: HypothesisNormalization
  mappingAlgorithm: MappingAlgorithm
  mappingLearningRate: number

  // ---- self-supervised learning (§7.10) ----
  sslThreshold: number
  semanticLearnUp: number
  semanticLearnDown: number
  inferenceGuards: InferenceGuards
  inferredWiring: InferredWiring

  // ---- firing order (§7.11) ----
  readinessGrowth: number
  readinessMax: number
  supportDecay: number
  attention: number

  // ---- dormant analogs and retrieval (§7.12) ----
  dormantCompetition: DormantCompetition
  dormantInhibition: boolean

  // ---- 1997-only constants (§7.13) ----
  y97SpParentExcitation: number
  y97SpNonParentInhibition: number
  y97SpArgExcitation: number
  y97SpPredExcitation: number
  y97SpSpInhibition: number
  y97InhibitorToExcitor: number
  y97InhSlowGrowth: number
  y97InhFastGrowth: number
  y97InhSlowDecay: number
  y97InhFastDecay: number
  y97EpsilonP: number
  y97EpsilonOP: number
  y97InhibitorToBelow: number
  y97GlobalInhibition: number
  y97PBelowGain: number
  y97PAboveGain: number
  y97WithinClassGain: number
  y97KappaP: number
  y97KappaChildP: number
  y97KappaSP: number
  y97KappaPred: number
  y97KappaObj: number
  y97OmegaP: number
  y97OmegaSP: number
  y97OmegaPred: number
  y97OmegaObj: number
  y97SemanticGain: number
  y97DecayRate: number
  y97MappingLearningRate: number
  y97IterationsPerRole: number
}

export type LisaConfigKey = keyof LisaConfig

/** Where a preset's value for one setting comes from (spec §8.8). */
export type Provenance = 'stated' | 'inferred' | 'borrowed' | 'ours'

export interface Setting<T> {
  value: T
  provenance: Provenance
  /** Where the witness states it: "2003 Table A1", "dataTypes.py:37", "1997 A4". */
  cite?: string
  /** Why this value, when it is not simply stated. */
  note?: string
}

export type PresetId = 'Hummel2007' | 'HummelSuite03' | 'Hummel2015' | 'HH2003' | 'HH1997'

export interface Preset {
  id: PresetId
  label: string
  /** One sentence on what this preset reconstructs. */
  witness: string
  settings: { [K in LisaConfigKey]: Setting<LisaConfig[K]> }
}

/** Strip the annotations: the engine never sees a Preset. */
export function resolve(preset: Preset): LisaConfig {
  const out = {} as Record<string, unknown>
  for (const k of Object.keys(preset.settings) as LisaConfigKey[]) {
    out[k] = preset.settings[k].value
  }
  return out as unknown as LisaConfig
}
