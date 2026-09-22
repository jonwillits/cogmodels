import { describe, expect, it } from 'vitest'
import { demos, demosForTopic, topics, topicsForDemo } from './registry'

describe('site registry', () => {
  it('has unique topic and demo ids', () => {
    const tIds = topics.map((t) => t.id)
    expect(new Set(tIds).size).toBe(tIds.length)
    const dIds = demos.map((d) => d.id)
    expect(new Set(dIds).size).toBe(dIds.length)
  })

  it('tags every demo with at least one existing topic', () => {
    const known = new Set(topics.map((t) => t.id))
    for (const d of demos) {
      expect(d.tags.length, `${d.id} has no tags`).toBeGreaterThan(0)
      for (const tag of d.tags) {
        expect(known.has(tag), `${d.id} is tagged with unknown topic ${tag}`).toBe(true)
      }
    }
  })

  it('shows a demo on every topic it is tagged with, and only those', () => {
    for (const d of demos) {
      const shownOn = topics.filter((t) => demosForTopic(t.id).includes(d)).map((t) => t.id)
      expect(shownOn.sort()).toEqual([...d.tags].sort())
      expect(topicsForDemo(d).map((t) => t.id).sort()).toEqual([...d.tags].sort())
    }
  })

  it('cites at least one source per demo', () => {
    for (const d of demos) expect(d.sources.length).toBeGreaterThan(0)
  })
})
