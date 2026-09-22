# Build Status

The build tracker for cogmodels. The spec is `lisa/LISA_SPEC.md` in the Box research folder (`research/projects/cogmodels/`); this file records what is done and what is next. One paragraph per line.

> **Where we are (2026-09-22):** **Phase 0 is done.** The site is live at <https://jonwillits.github.io/cogmodels/> and auto-deploys on push to `main` (lint and tests gate the deploy). Verified live: the landing page with three topic cards, the `#/models/lisa` deep link with its topic tags, the PWA manifest and service worker served from the sub-path, no console errors. Next: phase 1, the engine core, starting with the configuration object and the five presets with provenance.

## Phase 0 — Site shell

- [x] Repo at `~/Documents/Projects/cogmodels`, GPL v3, `.gitignore` for Node/Vite.
- [x] Stack: Vite 8, React 19, TypeScript 6, vitest 4, oxlint, vite-plugin-pwa. No Three.js (spec §2).
- [x] Hash routing (`shell/useHashRoute.ts`) with two route families: `#/models/<id>` and `#/topics/<id>`.
- [x] Registry (`site/registry.ts`): topics as tags, demos with `tags`, `status`, lazy `Component`, `sources`. Tests: unique ids, every tag exists, a demo appears on exactly its tagged topics.
- [x] Landing page: title, one paragraph, topic cards each listing their demos with a status badge. Empty topics are shown.
- [x] Topic page: blurb and demo cards.
- [x] Shell top bar: site title (home link), page title, the demo's topic tags.
- [x] Shared components: `Panel`, `controls` (Slider, SelectControl, Toggle, Button), `format`.
- [x] `models/random.ts` (mulberry32 `Rng`) and the test that walks `src/models/` for `Math.random()`.
- [x] Placeholder LISA demo page.
- [x] `npm run lint`, `npm run test`, `npm run build` clean.
- [x] Created `github.com/jonwillits/cogmodels` (public), pushed, enabled Pages with the Actions source. First deploy succeeded in 38 s. Confirmed live: landing page, `#/models/lisa` deep link, manifest, service worker, icon.

## Phase 1 — Engine core (mapping)

- [ ] `models/lisa/engine/params.ts`: `LisaConfig`, the five presets with provenance (spec §8.8), `resolve()`, and the preset-completeness test.
- [ ] `.sym` parser with line-numbered errors; JSON scenario schema.
- [ ] Network builder with typed arrays and adjacency tables.
- [ ] Driver dynamics, recipient dynamics, semantics, retrieval into WM, hypotheses.
- [ ] Mapping algorithms `hh2003` and `vers142`.
- [ ] Tests: inhibitor phases, time-sharing, Table 2 arithmetic, mapping-rule unit tests, parser tests, determinism.
- [ ] Reference harness around a copy of Hummel's code, if it takes under a few hours (spec §9.3).
- [ ] Structural love triangle meets its rate under `Hummel2007`.

## Phases 2–5

See spec §11.
