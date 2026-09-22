/**
 * The parsed form of a LISA scenario: what a `.sym` file describes, as typed
 * data. The parser (symParser.ts) produces it; the network builder consumes it.
 * Unit and semantic names are upper-cased, as in Hummel's parser; analog names
 * and Note text keep their case.
 */

export interface SemanticRef {
  name: string
  /** +1 normally, −1 when negated with a leading `-`, or a value set with `=w`. */
  weight: number
}

export interface PredDef {
  /** Basic name, e.g. LOVES. Role units are named LOVES1, LOVES2, … */
  name: string
  /** One list of semantics per role. Auto-coded roles suffix each feature with the role number. */
  roles: SemanticRef[][]
  importance?: number
  line: number
}

export interface ObjDef {
  name: string
  semantics: SemanticRef[]
  line: number
}

export interface PropDef {
  name: string
  /** Basic predicate name; the SPs use PRED1, PRED2, … in argument order. */
  pred: string
  /** Argument names: object names or proposition names (child propositions). */
  args: string[]
  importance?: number
  line: number
}

export interface SupportDef {
  from: string
  to: string
  weight: number
}

export interface AnalogDef {
  name: string
  preds: PredDef[]
  objs: ObjDef[]
  props: PropDef[]
  supports: SupportDef[]
}

export type SslMode = 'off' | 'on' | 'auto'

/** One phase set of the run, as Hummel's parser flattens the Sequence block. */
export interface PhaseSetDef {
  driver: number
  recips: number[]
  ssl: SslMode
  /** Explicit proposition names (control = props). */
  props?: string[]
  /** Number of propositions to choose at random (control = random). */
  random?: number
  /** Update the mapping weights at the end of this phase set (`h`). */
  updateMapping: boolean
  computeSimilarity: boolean
  line: number
}

/** Runtime parameters set in a `Parameters … Done` block. Keys are LisaConfig keys. */
export interface ScenarioParameters {
  wmMode?: 'normal' | 'unlimited'
  semanticNoise?: number
  semanticDeath?: number
  attention?: number
  driverInhibition?: number
  recipInhibition?: number
  mappingLearningRate?: number
  mappingAlgorithm?: 'hh2003' | 'vers142'
}

export interface Scenario {
  notes: string[]
  parameters: ScenarioParameters
  analogs: AnalogDef[]
  sequence: PhaseSetDef[]
}

export interface ParseMessage {
  line: number
  message: string
}

export interface ParseResult {
  scenario: Scenario
  errors: ParseMessage[]
  /** Recognized but unsupported constructs (groups, similarity, bail-upon-settling). */
  warnings: ParseMessage[]
}
