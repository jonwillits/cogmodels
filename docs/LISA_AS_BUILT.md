# LISA As Built

The running record of decisions and deviations made while building the LISA engine. Every place where the code departs from the spec, resolves a silence in the spec by following Hummel's code, or constructs a mechanism that no witness fully specifies gets an entry here. Entries are dated. One paragraph per line.

The spec is `lisa/LISA_SPEC.md` in the Box research folder. The claims audit beside it, `LISA_CLAIMS_AUDIT.md`, is the list of claims these decisions bear on.

## Entries

- **2026-09-22. Phase 0.** No engine decisions yet. The scaffold follows the spec's §2 layout with one change: the shared random stream lives at `src/models/random.ts` rather than `src/sim/random.ts`, because this repo's engines live under `models/`.
