# Modularization Plan

Last updated: May 7, 2026

## Status

- Overall status: Phase 1 active
- Live app status: Protected; `diet-tracker.html` remains the production entrypoint
- Deployment model: Unchanged; Cloudflare Pages serves the app and `/api/env` injects runtime credentials
- Refactor rule: No production behavior changes are allowed during planning and scaffolding phases

## Why This Plan Exists

The app is actively used and cannot tolerate regression, data loss, broken UI flows, or deployment drift. The purpose of this plan is to convert the current monolithic frontend into a modular codebase without changing the live runtime contract until parity is proven.

## Current Repo Facts

- Primary app entrypoint: `diet-tracker.html`
- Current deployment model: zero-build Cloudflare Pages
- Runtime config injection: `functions/api/env.js` serves `/api/env`
- Current app shape: one large HTML file containing HTML, CSS, state, business logic, views, data, and event handlers
- Inline event dependency: 127 `onclick` / `onchange` handlers currently rely on global function names
- Existing extracted seam: `INGREDIENT_PRICES.js` exists, but pricing data is still duplicated in `diet-tracker.html`

## Non-Negotiable Safety Rules

- Keep `diet-tracker.html` as the live entrypoint until the final cutover phase.
- Keep `functions/api/env.js` and the `/api/env` contract unchanged.
- Keep the Supabase storage shape unchanged during the refactor.
- Do not introduce a build tool, framework migration, or bundler in the first pass.
- Do not remove inline event handlers until compatibility shims are in place.
- Do not mix behavioral changes with extraction changes.
- Do not refactor the Today view, Settings modal, or manual meal flow before lower-risk surfaces are stable.
- Use preview deployments for every refactor phase before anything reaches the main production path.
- Maintain rollback points at each completed phase.

## Success Criteria

- Users see no regression in profile load, meals, water, grocery, notes, settings, language, theme, or cycle mode.
- The deployment contract remains stable while modules are introduced behind the current entrypoint.
- Shared logic becomes movable and testable without requiring DOM access.
- The codebase gains clear extraction seams for future componentization.

## Progress Tracker

### Phase 0: Protect Production And Set Up Tracking

- [x] Create this plan and progress tracker
- [x] Create a reserved `src/` workspace that is not wired into production
- [x] Define the first extraction PR scope
- [x] Capture a formal smoke-test checklist for preview deploy validation

### Phase 1 Details: Extract Static Data

- [x] Move runtime `INGREDIENT_PRICES` into a shared source of truth used by the app
- [ ] Move `MEALS` into a data module
- [x] Move `MEAL_TRANSLATIONS` into a data module
- [ ] Move `LANG` dictionary content into a data module

Phase 1 note:

- The legacy root `INGREDIENT_PRICES.js` file remains in the repo for now and is not wired into production. Cleanup of that legacy file should happen only after the rest of the static-data extraction is complete.

### Phase 2 Details: Extract Pure Logic

- [ ] Move `CALC` into a domain module
- [ ] Move `CYCLE` and cycle helpers into a domain module
- [ ] Move `VALID` into a domain module
- [ ] Move `PLAN` into a domain module
- [ ] Move date and formatting helpers into utility modules
- [x] Move `COST` helpers into a domain module

### Phase 3 Details: Extract Services And App Shell

- [ ] Move `DB` into a service module
- [ ] Move `OFFLINE` into a service module
- [ ] Move app state `S` into an app state module
- [ ] Move theme, language, navigation, and bootstrap wiring into app modules
- [ ] Add a `window` compatibility bridge for all currently inline-invoked functions

### Phase 4 Details: Extract Lower-Risk Views

- [ ] Extract Notes view
- [ ] Extract Week view
- [ ] Extract Month view
- [ ] Extract Progress view

### Phase 5 Details: Extract Medium-Risk Surfaces

- [ ] Extract Grocery view
- [ ] Extract Mindfulness feature
- [ ] Extract Settings summary view

### Phase 6 Details: Extract Highest-Risk Flows

- [ ] Extract Today view
- [ ] Extract Settings modal
- [ ] Extract manual meal flow into feature modules

### Phase 7 Details: CSS And Event Cleanup

- [ ] Extract CSS into layered stylesheet files
- [ ] Replace inline events with delegated listeners where safe
- [ ] Reduce `window` bridge surface after delegated events are stable
- [ ] Finalize cutover away from monolithic runtime sections

## Phase Order And Exact Extraction Targets

### Phase 0: Protect Production And Prepare The Repo

Objective:
Create tracking and safe scaffolding only. Do not change the running app.

Files to create or touch in this phase:

- `modularize_plan.md`
- `src/README.md`

Must not change in this phase:

- `diet-tracker.html`
- `functions/api/env.js`
- `wrangler.toml`

Exit gate:

- Repo contains only planning or non-runtime scaffolding changes.
- `git diff` shows no edits to the production entrypoint or runtime Cloudflare function.

### Phase 1: Extract Static Data

Objective:
Move static content into modules without changing behavior.

Source regions in `diet-tracker.html`:

- `MEALS`
- `MEAL_TRANSLATIONS`
- `INGREDIENT_PRICES`
- `LANG`

Target files:

- `src/data/meals.js`
- `src/data/meal-translations.js`
- `src/data/ingredient-prices.js`
- `src/data/translations.js`

Notes:

- Consolidate `INGREDIENT_PRICES.js` into the new single source of truth instead of keeping duplicate pricing data.
- Export data only. No DOM logic belongs in these files.

Exit gate:

- Production screens render identical content.
- No data key names change.
- Grocery costs and translations still match the current UI.

### Phase 2: Extract Pure Logic

Objective:
Separate deterministic logic from DOM and storage.

Source regions in `diet-tracker.html`:

- `CALC`
- `CYCLE` and cycle helpers
- `VALID`
- `PLAN`
- `dateStr`, `todayStr`, `weekStart`, `weekKey`, `fmtDate`, `fmtDateFull`, `daysInMonth`
- `COST`

Target files:

- `src/domain/calc.js`
- `src/domain/cycle.js`
- `src/domain/validation.js`
- `src/domain/plan.js`
- `src/domain/cost.js`
- `src/utils/date.js`

Notes:

- These modules must stay pure.
- They must not read from `document`, mutate global DOM, or call `DB` directly.

Exit gate:

- Calorie, macro, date, grocery cost, and cycle calculations remain unchanged.
- Existing live validation scenarios still pass.

### Phase 3: Extract Services And App Shell

Objective:
Move stateful infrastructure into modules while preserving the current inline event model.

Source regions in `diet-tracker.html`:

- `DB`
- `OFFLINE`
- `S`
- `T`
- theme, language, navigation, header updates, and app boot logic

Target files:

- `src/services/db.js`
- `src/services/offline.js`
- `src/app/state.js`
- `src/app/i18n.js`
- `src/app/theme.js`
- `src/app/router.js`
- `src/app/init.js`
- `src/app/window-bridge.js`

Notes:

- `window-bridge.js` is mandatory before removing or relocating inline-invoked functions.
- The bridge should preserve current function names so existing HTML keeps working.

Exit gate:

- App boot still loads profile, logs, weights, grocery, and notes correctly.
- Theme and language toggles still work.
- No inline handler breaks.

### Phase 4: Extract Lower-Risk Views

Objective:
Move simpler views before touching the daily workflow.

Target files:

- `src/views/notes.js`
- `src/views/week.js`
- `src/views/month.js`
- `src/views/progress.js`

Notes:

- Preserve output structure and CSS class names to avoid accidental UI drift.

Exit gate:

- Navigation still works.
- View rendering parity is maintained for all extracted screens.

### Phase 5: Extract Medium-Risk Surfaces

Objective:
Move grocery, mindfulness, and settings summary after shared infrastructure is stable.

Target files:

- `src/views/grocery.js`
- `src/views/settings.js`
- `src/views/mindfulness.js`
- `src/components/cycle-banner.js` when shared by extracted surfaces

Exit gate:

- Grocery generation, toggles, and costs still work.
- Mindfulness timers still behave correctly.
- Settings summary remains accurate.

### Phase 6: Extract Highest-Risk Flows

Objective:
Move the most coupled flows only after earlier phases are stable.

Target files:

- `src/views/today.js`
- `src/features/manual-meal/state.js`
- `src/features/manual-meal/render.js`
- `src/features/manual-meal/actions.js`
- `src/components/meal-card.js`
- `src/components/macro-ring.js`

Notes:

- This phase carries the most user risk.
- Today view and manual meal extraction must be separated into small steps with preview validation after each step.

Exit gate:

- Daily meal logging, swaps, manual meals, water, cycle banner, and target recalculation behave exactly as before.

### Phase 7: CSS And Event Cleanup

Objective:
Clean up the last monolithic concerns after functional parity is already proven.

Target files:

- `src/styles/tokens.css`
- `src/styles/base.css`
- `src/styles/layout.css`
- `src/styles/components.css`
- `src/styles/views.css`

Exit gate:

- Styling remains visually stable.
- `window` compatibility surface is reduced only after delegated event handling is stable.

## Validation Gates For Every Phase

The following checks must pass before merging any modularization step:

1. App loads from the preview deployment with no blank screen.
2. Existing profile loads correctly.
3. Theme toggle works.
4. EN/ES toggle works.
5. Today view renders correctly.
6. Meal completion toggle works.
7. Water logging works.
8. Manual meal create, edit, and delete still work.
9. Grocery generation and toggles still work.
10. Notes add and delete still work.
11. Settings save still works.
12. Cycle settings save, reload, and restore still work.
13. No new console errors appear.

## First Extraction PR Scope

Phase label:

- Phase 1A: Static data foundation only

Goal:

- Remove duplicated static content from `diet-tracker.html` without changing rendering, storage, event wiring, or deployment.

Allowed file additions in the first extraction PR:

- `src/data/ingredient-prices.js`
- `src/data/meals.js`
- `src/data/meal-translations.js`
- `src/data/translations.js`

Allowed file edits in the first extraction PR:

- `diet-tracker.html`
- `INGREDIENT_PRICES.js`
- `modularize_plan.md`

Not allowed in the first extraction PR:

- Any change to `functions/api/env.js`
- Any change to `wrangler.toml`
- Any change to Supabase key names or storage keys
- Any view extraction
- Any CSS extraction
- Any event-handler rewiring
- Any logic rewrite beyond moving static data references

Required completion conditions for the first extraction PR:

1. One authoritative source exists for ingredient prices.
2. Meals, meal translations, and UI translations load from `src/data` modules.
3. Grocery costs remain identical.
4. EN/ES strings remain identical.
5. No HTML structure changes are introduced.
6. The preview deployment passes the full smoke checklist below.

## Preview Smoke Checklist

Run these checks against the preview deployment for every extraction PR.

### Core App Load

- [ ] App loads without a blank screen
- [ ] Header renders profile name, goal, and calories
- [ ] Bottom navigation switches views correctly
- [ ] No new console errors appear during initial load

### Daily Flow

- [ ] Today view renders meal cards correctly
- [ ] Meal completion toggle updates correctly
- [ ] Water logging updates correctly
- [ ] Meal swap modal opens and swaps correctly
- [ ] Manual meal modal opens and closes correctly
- [ ] Manual meal create works
- [ ] Manual meal edit works
- [ ] Manual meal delete works

### Cycle Mode

- [ ] Female-only cycle controls remain gated correctly
- [ ] Cycle banner renders when cycle mode is enabled
- [ ] Cycle detail modal opens correctly
- [ ] Cycle-aware target adjustment still recalculates correctly
- [ ] Cycle settings persist after reload
- [ ] Restoring the prior cycle state after testing works cleanly

### Grocery And Notes

- [ ] Grocery view renders for day, week, and month modes
- [ ] Grocery item toggle works
- [ ] Grocery clear action works
- [ ] Cost totals still render correctly
- [ ] Notes add works
- [ ] Notes delete works

### Settings And Preferences

- [ ] Settings summary view renders correctly
- [ ] Settings modal opens and saves correctly
- [ ] Theme toggle still cycles correctly
- [ ] Language toggle still updates EN/ES labels correctly
- [ ] Weight modal opens and saves correctly

### Final Safety Check

- [ ] `git diff` matches the intended scope only
- [ ] No runtime contract files changed unless explicitly planned
- [ ] Rollback point is recorded before merge

## Branching And Rollback Strategy

- Use a dedicated refactor branch for each phase or sub-phase.
- Keep each PR scoped to one extraction unit.
- Tag or document rollback points after each completed phase.
- Never bundle unrelated feature work with modularization work.

## Working Log

### 2026-05-07

- Verified the app still runs as a zero-build Cloudflare Pages deployment.
- Verified `/api/env` is part of the runtime contract and must remain unchanged.
- Verified the monolith currently depends on 127 inline event handlers.
- Created `modularize_plan.md` as the authoritative migration tracker.
- Created a reserved `src/` workspace note without wiring it into production.
- Defined the first extraction PR scope as a static-data-only move.
- Added the preview smoke checklist that every extraction PR must pass before merge.
- Created the safety branch `refactor/modularize-phase1a` so `main` remains untouched.
- Checkpointed the plan files in branch commit `095669c` before touching runtime code.
- Extracted the live ingredient price table to `src/data/ingredient-prices.js` and updated `diet-tracker.html` to load that file before the main app script.
- Validated the touched files with focused error checks immediately after the extraction edit.
- Committed the first runtime extraction as `cb3df13` (`refactor: extract ingredient pricing data`).
- Pushed `refactor/modularize-phase1a` to origin so the rollback and continuation point is backed up remotely.
- Discovered that the branch preview URL does not currently receive `/api/env` injection, so preview validation is blocked until preview environment injection is configured.
- Found and fixed a fallback loader bug where the `config.js` `document.write()` path used an over-escaped closing script tag and swallowed the main app script whenever the fallback path was exercised.
- Validated the branch locally over HTTP with a temporary untracked `config.js`, confirmed the app booted successfully, and verified grocery cost output matched production for the same profile and week.
- Extracted the `COST` helper into `src/domain/cost.js` and updated `diet-tracker.html` to bind against `window.COST`.
- Repeated the local HTTP validation path and confirmed the grocery cost output still matched production after the `COST` extraction.
- Committed the `COST` extraction as `60d9400` (`refactor: extract cost helper module`) and pushed the branch so the rollback point is available remotely.
- Extracted `MEAL_TRANSLATIONS` into `src/data/meal-translations.js` and updated `diet-tracker.html` to bind against `window.MEAL_TRANSLATIONS`.
- Revalidated the branch locally over HTTP with a cache-busted URL and confirmed the Spanish meal translation sample still matched production after the extraction.

## Immediate Next Safe Step

The next safe implementation step is to either configure preview environment injection for branch deployments or continue with the next smallest static-data extraction, most likely `MEALS`, using the same local HTTP validation path and another rollback checkpoint immediately after.
