import { useEffect, useState } from 'react'

/**
 * Current hash route, normalized. `#/models/lisa` → `'models/lisa'`,
 * `''` / `#` / `#/` → `''` (the landing page).
 *
 * Hash routing (not history routing) is deliberate: deep links keep working
 * offline inside the installed PWA and under any static-host subpath.
 */
export function getHashRoute(): string {
  return window.location.hash.replace(/^#\/?/, '').replace(/\/$/, '')
}

export function useHashRoute(): string {
  const [route, setRoute] = useState(getHashRoute)
  useEffect(() => {
    const onChange = () => setRoute(getHashRoute())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

/** Navigate to a route (or home when route is ''). */
export function navigate(route: string): void {
  window.location.hash = route ? `#/${route}` : '#/'
}

/** The two route families the site knows, parsed from a normalized route. */
export type ParsedRoute =
  | { kind: 'home' }
  | { kind: 'model'; id: string }
  | { kind: 'topic'; id: string }
  | { kind: 'unknown'; route: string }

export function parseRoute(route: string): ParsedRoute {
  if (route === '') return { kind: 'home' }
  const m = route.match(/^models\/([^/]+)$/)
  if (m) return { kind: 'model', id: m[1] }
  const t = route.match(/^topics\/([^/]+)$/)
  if (t) return { kind: 'topic', id: t[1] }
  return { kind: 'unknown', route }
}
