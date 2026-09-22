import { lazy, type ComponentType } from 'react'

/**
 * The site's content, as plain data.
 *
 * Topics work like tags, not folders: a demo lists the topics it belongs to,
 * and it appears on every one of their cards. A demo's URL (`#/models/<id>`)
 * does not depend on its tags, so retagging never breaks a link. Adding a demo
 * or retagging one is a one-line change here and nowhere else.
 */

export type DemoStatus = 'idea' | 'building' | 'done'

export interface Topic {
  id: string
  title: string
  blurb: string
  /** Display order on the landing page (ascending). */
  order: number
}

export interface Source {
  citation: string
  url?: string
}

export interface Demo {
  /** URL id: opened at #/models/<id>. */
  id: string
  /** Topic ids this demo is tagged with. */
  tags: string[]
  title: string
  blurb: string
  status: DemoStatus
  Component: ComponentType
  sources: Source[]
}

export const topics: Topic[] = [
  {
    id: 'semantic-memory',
    title: 'Semantic Memory',
    blurb:
      'How concepts, relations and structured knowledge are represented and retrieved.',
    order: 1,
  },
  {
    id: 'word-and-category-learning',
    title: 'Word & Category Learning',
    blurb: 'How words and categories are learned from experience.',
    order: 2,
  },
  {
    id: 'analogy-and-relational-reasoning',
    title: 'Analogy & Relational Reasoning',
    blurb:
      'Mapping one structured situation onto another, and reasoning from the correspondence.',
    order: 3,
  },
]

// Demos are lazy-loaded so a model's engine and panels stay out of the
// landing-page bundle until that demo is opened.
const LisaDemo = lazy(() => import('../demos/lisa/LisaDemo'))

export const demos: Demo[] = [
  {
    id: 'lisa',
    tags: ['semantic-memory', 'analogy-and-relational-reasoning'],
    title: 'LISA',
    blurb:
      'Hummel and Holyoak’s model of analogical access, mapping, inference and schema induction, with role–filler binding by synchrony. Watch it map two analogs one role binding at a time.',
    status: 'building',
    Component: LisaDemo,
    sources: [
      {
        citation:
          'Hummel, J. E., & Holyoak, K. J. (1997). Distributed representations of structure: A theory of analogical access and mapping. Psychological Review, 104, 427–466.',
      },
      {
        citation:
          'Hummel, J. E., & Holyoak, K. J. (2003). A symbolic-connectionist theory of relational inference and generalization. Psychological Review, 110, 220–264.',
      },
      {
        citation:
          'Hummel, J. E., & Holyoak, K. J. (2005). Relational reasoning in a neurally plausible cognitive architecture. Current Directions in Psychological Science, 14, 153–157.',
      },
      {
        citation: 'Hummel, J. E. (2007–2015). Python LISA, version 1.00. Unpublished code.',
      },
    ],
  },
]

export function findDemo(id: string): Demo | undefined {
  return demos.find((d) => d.id === id)
}

export function findTopic(id: string): Topic | undefined {
  return topics.find((t) => t.id === id)
}

export function demosForTopic(topicId: string): Demo[] {
  return demos.filter((d) => d.tags.includes(topicId))
}

export function topicsForDemo(demo: Demo): Topic[] {
  return topics
    .filter((t) => demo.tags.includes(t.id))
    .sort((a, b) => a.order - b.order)
}
