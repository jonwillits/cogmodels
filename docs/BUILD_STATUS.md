# Build Status

The build tracker for cogmodels. The spec is `lisa/LISA_SPEC.md` in the Box research folder (`research/projects/cogmodels/`); this file records what is done and what is next. One paragraph per line.

> **Where we are (2026-09-23):** **Phase 2 is built and awaiting Jon's walk-through** (`lisa/LISA_WALKTHROUGH.md` in Box). The LISA demo at `#/models/lisa` has the control bar (scenario, preset with the Advanced panel showing every setting's provenance, seed, stepping by 1, 10, SP, phase set or to the end, play with a speed control, and a status readout), five tabs (Network, Synchrony, Mapping, Batch, Claims), an inspector for any unit, and ⓘ info panels on every control, tab, unit type and setting. Batch and Claims run in a Web Worker. The Claims tab's Compare already produced two findings: the undocumented transition gate is load-bearing (without it the love triangle fails 20/20), and ignoring argument semantics as the 2003 paper says breaks the triangle under Vers142. Details in [`LISA_AS_BUILT.md`](LISA_AS_BUILT.md). Next: Jon walks the demo; then phase 3, self-supervised learning.
>
> **Where we were (2026-09-22):** Phase 1 done: the engine core reproduces Hummel's code on the love triangle (19/20 his, 20/20 ours, identical weights). Phase 0 done: site live at <https://jonwillits.github.io/cogmodels/>.

## Phase 0 — Site shell

- [x] Repo, stack, hash routing, registry, landing page with topic cards, topic page, shell, shared components, seeded random stream with its `Math.random()` guard. Deployed and verified live (2026-09-22).

## Phase 1 — Engine core (mapping)

- [x] Configuration object and five presets with provenance; `.sym` parser; network; dynamics with the §8.7 switches; both mapping algorithms; random firing; unlimited WM; run records; four built-in scenarios; reference harness and distribution tests against Hummel's code. (2026-09-22)
- [ ] Deferred to phase 5: the 1997-only rules (`HH1997` does not run yet). Deferred to phase 3: self-supervised learning.

## Phase 2 — Demo UI (mapping)

- [x] Controller (`demos/lisa/useLisaController.ts`): one session object (run, trace ring buffers, mapping history) rebuilt on any input change; stepping helpers; animation loop with a 12 ms per-frame clamp.
- [x] Control bar: scenario and preset pickers, Advanced panel (grouped settings, S/I/B/O provenance marks with citations on hover, modified-from-preset highlight and reset), seed with a random button, `StepControls` (1, 10, SP, phase set, end, play/pause, iterations per frame), status readout (phase set, iteration, driver → recipients, firing SP, top-down, GI).
- [x] Network tab: driver on top, semantic pools in the middle, recipients mirrored below; fill = activation, outline = retrieved, ▲▼ = mode, halo = firing SP; structure, semantic and mapping lines; hypothesis toggle; click a unit for the inspector.
- [x] Synchrony tab: `TracePlot` canvas over the last 2,000 iterations with phase-set, top-down and mapping markers; driver phase-set units, recipients, and semantics (none, active, all).
- [x] Mapping tab: one `Matrix` heatmap per unit type with best-in-row highlight and hover readout, history scrubber over phase sets, hypotheses toggle, mapping quality and licensing.
- [x] Batch tab: N seeds in the worker with progress, outcome rate beside the reference, top-down timing, firing spread, settle rounds, best-mapping distributions per unit.
- [x] Claims tab: six entries (audit items 1, 2, 5, 6, 7 and the Table 2 normalization finding) from `models/lisa/claims.ts`; per-switch and all-switches Compare in the worker.
- [x] Inspector: activation, retrieved, mode, priority terms, inhibitor and sensitivity, net-input stacked bar, semantic weights, mapping connections with hypotheses.
- [x] ⓘ info panels (`demos/lisa/info.ts`), with links into the Claims tab; a test checks every ⓘ id has an entry and every setting has one.
- [x] Tests: batch determinism and outcomes, claims data validity, info coverage (34 tests total). Probes: `claims.probe.ts`, `outcome.probe.ts`, `compare.probe.ts`, `timing.probe.ts`.
- [x] Performance: the engine is 3.5 ms per love-triangle run bare and 4.7 ms with trace recording; reading all tracks for a frame is 0.3 ms; a 20-seed batch is about 80 ms in the worker.
- [ ] Jon's walk-through (`lisa/LISA_WALKTHROUGH.md` in Box), then fixes from it.
- [ ] Not in this phase: the Edit tab (phase 4), the Inference tab (phase 3).

## Phases 3–5

See spec §11.
