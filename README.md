# cogmodels

Working, interactive implementations of cognitive models. Each model is rebuilt from its source papers and, where it exists, the authors' code. It runs in a web browser and exposes its internal workings, so that we can watch what the model does and ask why.

The first model is LISA (Hummel & Holyoak, 1997, 2003), a model of analogical access, mapping, inference and schema induction.

## Working on it

Node and npm are build tools only. Users need only a browser.

```bash
npm install     # first time only
npm run dev     # http://localhost:5173
npm run test    # engine and registry unit tests (no browser needed)
npm run lint    # oxlint
npm run build   # production bundle
npm run preview # serve the built app at /cogmodels/
```

Pushing to `main` auto-deploys via GitHub Actions (`.github/workflows/deploy.yml`); lint and tests gate the deploy.

## How it is organized

```
src/
  main.tsx · App.tsx     entry + hash router
  shell/                 AppShell (top bar), Home (topic cards), TopicPage, useHashRoute
  site/registry.ts       topics and demos, as data. Topics work like tags.
  components/            shared UI: Panel, controls, format (more with the first demo)
  models/                model engines: plain TypeScript, no React, unit-testable in Node
    random.ts            the one seeded random stream every engine draws from
    lisa/                (phase 1) engine, input parser, scenarios, tests
  demos/                 React: one folder per demo, reads model state, never owns it
    lisa/
  theme/                 palette + type tokens
docs/
  BUILD_STATUS.md        the build tracker and running log
  LISA_AS_BUILT.md       every decision and deviation made while building LISA
```

Two rules carry the design, both inherited from [bcogapp](https://github.com/jonwillits/bcogapp):

- **Sim/render separation.** Everything under `src/models/` is plain TypeScript with no React imports. React components read model state and never own it.
- **One seeded random stream.** Nothing in `src/models/` calls `Math.random()`; a test enforces it. Every run is reproducible from its seed.

## What counts as a model

A demo is a model *family*, not a single paper. The papers, the authors' code and the authors' later parameter choices are all witnesses to the family, and none of them is complete on its own. Each engine is a configuration space of numeric parameters and architectural switches. Each witness is a named preset in that space, and every setting in a preset carries a mark saying whether the witness states it, whether we inferred it, whether we borrowed it from another witness, or whether it is our own construction. Claims are tested under the preset of the witness that made them.

## The research side

Specs, claim audits, source papers and evaluation notes live outside this repo, in Jon's Box folder `research/projects/cogmodels/`. The spec that this code implements is `lisa/LISA_SPEC.md` there. Code never lives in Box, because sync interferes with `node_modules/` and `.git`.

## License

GPL v3.
