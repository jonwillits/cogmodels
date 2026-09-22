/**
 * Built-in scenarios (spec §9.2). Each `.sym` is Hummel's file with an
 * attribution header in `{` comment lines; the parser ignores the header.
 */
import lovetri9 from './lovetri9.sym?raw'
import lovetri7 from './lovetri7.sym?raw'
import stjohn4 from './stjohn4.sym?raw'
import hierarchy1 from './hierarchy1.sym?raw'

export interface BuiltInScenario {
  id: string
  title: string
  blurb: string
  source: string
  sym: string
}

export const builtInScenarios: BuiltInScenario[] = [
  {
    id: 'lovetri9',
    title: 'Structural love triangle',
    blurb: 'A mapping that is ambiguous one proposition at a time and needs two propositions in WM together (2003 Table 2).',
    source: 'DATA/lovetri/lovetri9.sym; reference lovetri9.bat (10/10 Amy→Abe, Bill→Beth, Cat→Chad).',
    sym: lovetri9,
  },
  {
    id: 'lovetri7',
    title: 'Jealousy inference and schema',
    blurb: 'Mapping, then licensed inference and schema induction.',
    source: 'DATA/lovetri/lovetri7.sym; reference lovetri7.bat.',
    sym: lovetri7,
  },
  {
    id: 'stjohn4',
    title: 'Airport / beach',
    blurb: 'Inference of a new relation and a higher-order cause (2003 Appendix B).',
    source: 'DATA/st.john/4.sym; reference 4.bat (2007).',
    sym: stjohn4,
  },
  {
    id: 'hierarchy1',
    title: 'Mismatched hierarchy',
    blurb: 'How mapping handles embedded propositions whose levels differ.',
    source: 'DATA/logic/hierarchy1.sym; no reference.',
    sym: hierarchy1,
  },
]

export function builtInScenario(id: string): BuiltInScenario {
  const s = builtInScenarios.find((b) => b.id === id)
  if (!s) throw new Error(`no built-in scenario "${id}"`)
  return s
}
