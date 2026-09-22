# components/

Shared UI used by every demo: `Panel`, the `controls` primitives (Slider, SelectControl, Toggle, Button) and `format`. `StepControls`, `TracePlot`, `Matrix`, `InfoIcon` and `InfoPanel` arrive with the first demo UI (LISA phase 2). Nothing here imports from `src/models/`; components read model state through props and never own it.
