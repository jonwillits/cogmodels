# reference/

A harness around a copy of John Hummel's Python LISA 1.00, used to check the TypeScript engine against the author's own code (spec §9.3). Nothing here ships to the website.

`pylisa/` holds his six model modules (`build.py`, `dataTypes.py`, `hebbs.py`, `runLISA.py`, `ssLearn.py`, `outFile.py`) converted from Python 2.4 to Python 3 with `fissix`, his `DATA/` folder of scenario and output files, a no-op stub for his pygame `graphics` module, and `harness.py`, which reimplements the run loop of his `LISA.py` without graphics, seeds the random stream, and writes JSON. The copy is patched in exactly two places, both marked `HARNESS`: `hebbs.settle_hebb_activations` records its round count, and a line in `build.py` that called `str.pop` (a crash in the original) is removed. `analyze.py` summarizes a JSON file.

```bash
cd reference/pylisa
python3 harness.py --sym DATA/lovetri/lovetri9.sym --preset Hummel2007 --runs 20 --seed 1 --out ../expected/lovetri9_Hummel2007.json
python3 analyze.py ../expected/lovetri9_Hummel2007.json 'Amy&Bill' 'Abe&Beth' Obj,P
```

`expected/` holds the JSON outputs the engine's `reference.test.ts` compares against. The random streams differ between the two engines, so nothing matches draw for draw; outcome rates, final weights and top-down timing should. Regenerate a file only when the harness or the preset definitions change, and say so in `docs/LISA_AS_BUILT.md`.

The original code is in Jon's Box folder under `lisa/sources/`, which is read-only; this copy is the one that runs.
