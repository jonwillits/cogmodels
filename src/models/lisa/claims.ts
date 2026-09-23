/**
 * The Claims tab's entries (spec §10, §8.7), as data. Each entry is one item
 * of LISA_CLAIMS_AUDIT.md that the mapping engine can already test: the
 * claim, its citation, what the code does instead, and the switch or
 * switches whose two settings reproduce the two sides. A Compare run varies
 * one switch and holds everything else fixed.
 */
import type { LisaConfig, LisaConfigKey } from './engine/config'

export interface ClaimSwitch {
  key: LisaConfigKey
  /** The value that reproduces the paper's stated mechanism. */
  paper: LisaConfig[LisaConfigKey]
  /** The value that reproduces Hummel's code. */
  code: LisaConfig[LisaConfigKey]
  paperLabel: string
  codeLabel: string
}

export interface Claim {
  id: string
  /** Audit item number, or 0 for findings made while building. */
  audit: number
  tier: 1 | 2 | 3
  title: string
  claim: string
  cite: string
  codeDoes: string
  switches: ClaimSwitch[]
  /** Which built-in scenario shows it best. */
  scenario: string
  /** What to look at in a Compare run. */
  measure: 'outcome' | 'timeSharing'
}

export const claims: Claim[] = [
  {
    id: 'batching',
    audit: 1,
    tier: 1,
    title: 'Two propositions in WM solve the love triangle',
    claim: 'The love-triangle mapping is ambiguous one proposition at a time; LISA solves it by placing both propositions in one phase set, and while it does so "it ignores the semantic features of their arguments".',
    cite: '2003, pp. 231–233 and Table 2',
    codeDoes: 'Never ignores argument semantics. Fires the SPs of both propositions interleaved at random (Hummel’s July 2007 notes call this a theory-to-code error). Solves the triangle only with the unpublished Vers142 mapping algorithm; with the published rule his own code and ours fail it in every run.',
    switches: [
      { key: 'mappingAlgorithm', paper: 'hh2003', code: 'vers142', paperLabel: 'published rule (A17)', codeLabel: 'Vers142 (unpublished)' },
      { key: 'ignoreArgSemanticsWhenBatched', paper: true, code: false, paperLabel: 'argument semantics ignored', codeLabel: 'argument semantics kept' },
      { key: 'batchedSPOrder', paper: 'grouped', code: 'interleaved', paperLabel: 'SPs grouped by proposition', codeLabel: 'SPs interleaved' },
    ],
    scenario: 'lovetri9',
    measure: 'outcome',
  },
  {
    id: 'capacity',
    audit: 2,
    tier: 1,
    title: 'WM capacity as an a priori prediction',
    claim: 'Binding by synchrony yields "a principled estimate" of WM capacity of about 4–6 role bindings, bounded from above by noise that stops the model discriminating small differences in sensitivity to inhibition.',
    cite: '2003, p. 225 and pp. 253–254',
    codeDoes: 'Puts no noise into the SP dynamics at all (the 1997 model had ±0.1). The only randomness is each SP’s starting sensitivity, so the noise-driven bound does not exist, and the sensitivity decay rate was chosen to give a capacity of five to six.',
    switches: [{ key: 'spNoise', paper: 0.1, code: 0, paperLabel: 'noise ±0.1 on SP input (1997)', codeLabel: 'no noise' }],
    scenario: 'lovetri9',
    measure: 'timeSharing',
  },
  {
    id: 'gating',
    audit: 5,
    tier: 2,
    title: 'A gating signal the paper does not mention',
    claim: 'Top-down input into the recipient is suspended only until every driver SP has fired once.',
    cite: '2003, p. 255',
    codeDoes: 'Also switches top-down off whenever any driver SP’s inhibitor is above 0.1, which happens at every SP transition. While it is off, hypotheses do not accumulate, recipients do not feed the semantics, and out-of-proposition inhibition stops. The code comment reads "the or inhibitor.. is new YO!".',
    switches: [{ key: 'transitionGating', paper: false, code: true, paperLabel: 'fired-once only', codeLabel: 'also off during transitions' }],
    scenario: 'lovetri9',
    measure: 'outcome',
  },
  {
    id: 'parents',
    audit: 6,
    tier: 2,
    title: 'Parent propositions spared from the refresh',
    claim: 'The global inhibitor refreshes every unit in the nondriver analogs between SPs.',
    cite: '2003, App. A §4.3 and A6',
    codeDoes: 'Refreshes the driver too, and once top-down is on exempts parent-mode P units so a proposition persists across its role bindings. Hummel added the exemption in 2007 and noted it made structural mappings worse.',
    switches: [
      { key: 'parentPropsSkipRefresh', paper: false, code: true, paperLabel: 'parents refreshed', codeLabel: 'parents spared' },
      { key: 'refreshScope', paper: 'nonDriver', code: 'allAnalogs', paperLabel: 'nondriver analogs only', codeLabel: 'every analog' },
    ],
    scenario: 'lovetri9',
    measure: 'outcome',
  },
  {
    id: 'recipient-competition',
    audit: 7,
    tier: 2,
    title: 'How the recipient resolves semantic ambiguity',
    claim: 'Units in the recipient inhibit other units of the same type (objects inhibit objects), by a normalized sum, and predicate and object units take a Weber-fraction input from the semantics so that the best-fitting unit wins even when one unit’s features are a subset of another’s.',
    cite: '2003, A8 and A12, p. 255; 1997, p. 440',
    codeDoes: 'Has no inhibition among recipient predicates or objects at all, uses a max/second-max rule for P units and SPs, takes out-of-proposition inhibition from the two most active units only, and replaces the Weber fraction with a cosine.',
    switches: [
      { key: 'recipientWithinClassInhibition', paper: 'normalizedSum2003', code: 'code', paperLabel: 'all classes, normalized sum (A8)', codeLabel: 'P and SP only, max/second-max' },
      { key: 'semanticInputRule', paper: 'weber2003', code: 'cosine', paperLabel: 'Weber fraction (A12)', codeLabel: 'cosine' },
      { key: 'outOfPropositionRule', paper: 'summed2003', code: 'maxSecondMax', paperLabel: 'summed over all (A9)', codeLabel: 'max and second-max only' },
      { key: 'driverLateralRule', paper: 'normalizedSum2003', code: 'maxSecondMax', paperLabel: 'normalized sum (A2)', codeLabel: 'max/second-max' },
    ],
    scenario: 'lovetri9',
    measure: 'outcome',
  },
  {
    id: 'table2-normalization',
    audit: 0,
    tier: 3,
    title: 'Table 2 depends on how hypotheses are normalized',
    claim: 'After the Table 2 hypotheses are normalized and the weights updated, "Mary→Tom takes a positive mapping weight and the remainder of the object mapping weights remain at 0".',
    cite: '2003, p. 233; contrast p. 256',
    codeDoes: 'Divides each hypothesis by the largest in its own row and column, as p. 256 also says. Under that rule Bill→Sally, Mary→Tom and Sam→Cathy all win in one update; the prose on p. 233 holds only if every hypothesis is divided by the largest anywhere. Found while building (LISA_AS_BUILT.md).',
    switches: [{ key: 'hypothesisNormalization', paper: 'global', code: 'rowColumn', paperLabel: 'by the global maximum (p. 233 prose)', codeLabel: 'by row and column (p. 256, code)' }],
    scenario: 'lovetri9',
    measure: 'outcome',
  },
]

export function claimById(id: string): Claim | undefined {
  return claims.find((c) => c.id === id)
}

/** Claims that mention a configuration key, for the info panels. */
export function claimsForKey(key: LisaConfigKey): Claim[] {
  return claims.filter((c) => c.switches.some((s) => s.key === key))
}
