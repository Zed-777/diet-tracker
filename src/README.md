# `src/` Workspace

This directory is reserved for the incremental modularization of the Diet Tracker frontend.

Important constraints:

- Nothing in `src/` is wired into production yet.
- `diet-tracker.html` remains the live entrypoint.
- `/api/env` remains the runtime config contract.
- The first extractions must preserve global function names because the current app still uses inline event handlers.

Target top-level structure:

- `app/`
- `services/`
- `domain/`
- `data/`
- `utils/`
- `views/`
- `features/`
- `components/`
- `styles/`

This directory should only receive zero-risk extraction work until parity gates have been defined and validated.
