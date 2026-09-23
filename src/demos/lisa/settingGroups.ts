/** How the Advanced panel groups the configuration keys. Keys not listed fall into "Other". */
import type { LisaConfigKey } from '../../models/lisa/engine/config'

export const settingGroups: { title: string; keys: LisaConfigKey[] }[] = [
  { title: 'Activation', keys: ['gammaActive', 'deltaActive', 'gammaDormant', 'deltaDormant', 'tau'] },
  {
    title: 'Driver SPs and inhibitors',
    keys: ['driverRule', 'driverLateralRule', 'attentionInput', 'inhibitorToExcitor', 'inhibitorToYoked', 'inhibitorThreshold', 'slowInhGrowth', 'fastInhGrowth', 'slowInhDecay', 'fastInhDecay', 'inhLowerThreshold', 'inhUpperThreshold', 'minSTI', 'maxSTI', 'dSTI', 'spInhibitionGain', 'spNoise', 'driverInhibition', 'legacyMaxSecondMax'],
  },
  { title: 'Modes', keys: ['modeThreshold', 'modeSetThreshold', 'modeResetsToNeutral'] },
  {
    title: 'Global inhibitor and phase sets',
    keys: ['gIOffThreshold', 'globalInhibitionValue', 'refreshScope', 'parentPropsSkipRefresh', 'transitionGating', 'iterationsPerSP', 'phaseDuration', 'wmMode', 'batchedSPOrder', 'ignoreArgSemanticsWhenBatched'],
  },
  {
    title: 'Recipient inputs',
    keys: ['recipInhibition', 'recipientWithinClassInhibition', 'propToPropInhib', 'spToSpInhib', 'opToOpInhib', 'outOfPropositionRule', 'outPropPropToSP', 'outPropSPToPred', 'outPropSPToObj', 'predToSP', 'objToSP', 'semanticInputRule', 'semToPred', 'semToObj', 'semanticNormalization', 'semanticNoise', 'semanticDeath', 'hebbBias', 'mappingExcitationGain', 'recipientPInput'],
  },
  { title: 'Retrieval and mapping', keys: ['retrievalThreshold', 'mappingAlgorithm', 'hypothesisNormalization', 'mappingLearningRate'] },
  { title: 'Self-supervised learning (phase 3)', keys: ['sslThreshold', 'semanticLearnUp', 'semanticLearnDown', 'inferenceGuards', 'inferredWiring'] },
  { title: 'Firing order', keys: ['readinessGrowth', 'readinessMax', 'supportDecay', 'attention'] },
  { title: 'Dormant analogs and retrieval (phase 5)', keys: ['dormantCompetition', 'dormantInhibition'] },
]
