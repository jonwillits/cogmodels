# Build Status

The build tracker for cogmodels. The spec is `lisa/LISA_SPEC.md` in the Box research folder (`research/projects/cogmodels/`); this file records what is done and what is next. One paragraph per line.

> **Where we are (2026-09-22, evening):** **Phase 1 is done.** The LISA engine core maps: configuration object and five presets with provenance, `.sym` parser, network, driver and recipient dynamics, both mapping algorithms, random firing, unlimited WM. It reproduces Hummel's own code: 20/20 on the structural love triangle under `Hummel2007` with final weights identical to his to three decimals, and it fails the triangle under his "H&H 03" suite exactly as his code does (0/10). The reference harness (a Python 3 conversion of his code) is in `reference/`. Timing: about 5 µs per iteration, 14 ms per love-triangle run, well inside the §9.5 budgets. Every decision and finding is in [`LISA_AS_BUILT.md`](LISA_AS_BUILT.md). Next: phase 2, the demo UI for mapping, and the walk-through for Jon.
>
> **Where we were (2026-09-22, afternoon):** Phase 0 done; the site is live at <https://jonwillits.github.io/cogmodels/>.

## Phase 0 — Site shell

- [x] Repo, stack, hash routing, registry, landing page with topic cards, topic page, shell, shared components, seeded random stream with its `Math.random()` guard, placeholder LISA page. Deployed and verified live (2026-09-22).

## Phase 1 — Engine core (mapping)

- [x] `engine/config.ts`: `LisaConfig` (flat numbers and switches) and the `Preset` type with provenance marks. `engine/presets.ts`: `Hummel2007` in full, the other four as annotated overrides. Test: every preset defines every key; stated settings cite a source.
- [x] `input/symParser.ts`: Hummel's `.sym` grammar with line-numbered errors; groups, similarity and bail-upon-settling recognized and reported as unsupported. Tests: all four built-ins parse; hand-coded predicates, child propositions, negation, random firing, `Parameters`; malformed input gives line numbers.
- [x] `engine/network.ts`: units, analogs, semantic pools, one `addUnit` path for later structural changes.
- [x] `engine/dynamics.ts`: one iteration, ported from `runLISA.update_network`, with the §8.7 switches (plus four added; see as-built).
- [x] `engine/mapping.ts`: connections, hypotheses, `hh2003` and `vers142` updates (consistency from topology), mapping quality.
- [x] `engine/firing.ts`: readiness, support, Luce selection with attention on the fly.
- [x] `engine/run.ts`: phase sets, grouped batching, unlimited WM, semantic death, per-phase-set records (top-down iteration, firings, settle rounds, mapping quality), mapping tables.
- [x] Tests (24 + 3 reference): inhibitor phases, time-sharing for 2–4 SPs (5–8 recorded), Table 2 arithmetic under both normalizations, mapping-rule units, determinism, love triangle 20/20, and three distribution comparisons against Hummel's code.
- [x] `timing.probe.ts` and `compare.probe.ts` (`PROBE=1`).
- [x] Reference harness: `reference/pylisa` (fissix conversion, two marked patches, graphics stub, `harness.py`, `analyze.py`) and `reference/expected/*.json`.
- [x] Four built-in scenarios with attribution headers.
- [ ] Deferred to phase 5: the 1997-only rules (`HH1997` does not run yet). Deferred to phase 3: self-supervised learning (scenarios with SSL run their mapping and warn).

## Phase 2 — Demo UI (mapping)

- [ ] Control bar: scenario picker, preset picker with the Advanced panel (values, provenance marks, notes), seed, step buttons (1, 10, SP, phase set, run), play/pause, speed, status readout.
- [ ] Network tab (SVG, Hummel's colours), Synchrony tab (traces), Mapping tab (heatmaps with history), Batch tab (worker), inspector, ⓘ info panels (`demos/lisa/info.ts`).
- [ ] Claims tab for audit items 1, 2, 5, 6, 7 with one-switch Compare runs (`models/lisa/claims.ts`).
- [ ] Performance budgets; walk-through document `lisa/LISA_WALKTHROUGH.md` in Box.

## Phases 3–5

See spec §11.
