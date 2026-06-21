# 📐 Project Guidelines

## Project Overview

**Diet Tracker** — A personalized meal and nutrition tracking application with offline support, cost analysis, and bilingual interface.

- **Stack:** Vanilla JavaScript, HTML5, CSS3 (no framework, no build step)
- **Backend:** Supabase PostgreSQL (JSONB blob storage)
- **Deployment:** Cloudflare Pages + Workers
- **Live:** https://diet-tracker-e52.pages.dev
- **Repository:** https://github.com/Zed-777/diet-tracker

---

## Core Architecture

### Single-File SPA
- **Main file:** `diet-tracker.html` (~4500 lines)
- **Structure:** HTML + CSS + Vanilla JavaScript in one file
- **No build step:** Runs directly in browser

### Modules
- `DB` — Supabase REST wrapper (CRUD operations)
- `CALC` — Nutritional calculations (BMR, TDEE, macros)
- `MEALS` — Recipe database (42+ meals, 5 categories)
- `VALID` — Input validation and sanitization
- `OFFLINE` — Offline detection and operation queueing
- `LANG` — Bilingual translations (EN/ES)
- `COST` — Meal and daily cost calculations

### Views (8 Screens)
- **Today** — Daily meal logging and summary
- **Meals** — Browse and select meals
- **Grocery** — Generate shopping lists
- **Progress** — Weight tracking and trends
- **Analytics** — Nutritional breakdowns
- **Notes** — Journal entries
- **Settings** — Profile and preferences
- **Mindfulness** — Wellness exercises

---

## Development Workflow

### Setup
```bash
# 1. Clone repo
git clone https://github.com/Zed-777/diet-tracker.git
cd diet-tracker

# 2. Local dev (optional Cloudflare setup)
cp config.example.js config.js
# Edit with real Supabase credentials

# 3. Run local server
npx http-server . -p 8000
# Visit http://localhost:8000
```

### Making Changes
1. Edit `diet-tracker.html` (or module files in `src/`)
2. Refresh browser
3. Test locally (all views, offline mode, bilingual)
4. Commit and push

### Deployment
- Push to `main` → Cloudflare auto-deploys
- Environment variables managed in Cloudflare dashboard
- Zero downtime deployments

---

## Code Organization

### HTML Structure
```html
<body>
  <!-- Navigation -->
  <!-- Main content area (#view) -->
  <!-- Modals and overlays -->
</body>

<script src="/api/env"></script>  <!-- Credentials injection -->
<script src="src/...js"></script> <!-- Extracted modules (optional) -->
<script>
  // Main app code
</script>
```

### CSS Architecture
- **Variables:** Color scheme, spacing, typography
- **Utilities:** Flexbox helpers, responsive breakpoints
- **Components:** Buttons, cards, forms, modals
- **Themes:** Dark, light, pink (CSS variables)

### JavaScript Patterns
- **IIFE modules:** Encapsulation with `window` attachment
- **State object `S`:** Single source of truth
- **Render functions:** `renderTodayView()`, `renderMeals()`, etc.
- **Event delegation:** Centralized onclick handlers in HTML

---

## Database Schema

### Supabase Table: `diet_data`
```sql
id        TEXT PRIMARY KEY        -- User ID or session key
data      JSONB NOT NULL          -- All user data (blob)
created_at TIMESTAMPTZ            -- Auto timestamp
updated_at TIMESTAMPTZ            -- Auto timestamp
```

### Data Structure
```javascript
{
  profile: { 
    name, age, height, weight, goal, experience,
    bmr, tdee, activityLevel, preferences 
  },
  weights: [ { date, value, notes } ],
  log_YYYY-MM-DD: { meals: [...], water: 0, notes: '' },
  meal_swaps: { date: { index: swapId } },
  preferences: { language, theme, units },
  mindfulness: { sessions: [...], stats: {...} }
}
```

---

## Bilingual Support (EN/ES)

### Implementation
- `LANG` object: `en: {...}`, `es: {...}`
- `T(key)` helper: Returns translated text
- UI labels stored in `LANG`, not hardcoded
- Meal translations in `MEAL_TRANSLATIONS`

### Adding Translations
1. Add key to `LANG.en` and `LANG.es`
2. Use `T('keyName')` in render functions
3. Test both languages in app

---

## Security Practices

### Credentials
- **Production:** Cloudflare environment variables
- **Development:** `config.js` (gitignored, never committed)
- **Template:** `config.example.js` (tracked for reference)

### Data Protection
- All communication: HTTPS
- Database RLS policies: Enforce access control
- Input validation: All user inputs sanitized
- Error handling: No sensitive data in error messages

---

## Performance Guidelines

### Load Time
- Keep main HTML under 5000 lines
- Minimize external requests (just Supabase)
- Lazy-render views when needed

### Memory Management
- Clean up old data on navigation
- Unsubscribe from listeners before unmounting
- Use `S` state object efficiently

### Network
- Batch Supabase updates when possible
- Queue offline operations
- Cache meal/ingredient data locally

---

## Testing Checklist

Before committing:
- [ ] All views render correctly
- [ ] Offline mode works (disable network, make changes)
- [ ] Online sync works (re-enable network, verify sync)
- [ ] Both language options work (EN/ES)
- [ ] All 3 themes render correctly
- [ ] Mobile responsive (test on mobile or DevTools)
- [ ] No console errors
- [ ] Performance acceptable (< 2s load)

---

## Deployment Checklist

Before pushing to `main`:
- [ ] Code review complete
- [ ] Testing checklist passed
- [ ] Commit message clear and descriptive
- [ ] No unintended file changes
- [ ] Git history clean

---

## File Structure

```
diet-tracker/
├── diet-tracker.html            # Main app (4500+ lines)
├── functions/
│   └── api/
│       └── env.js              # Cloudflare Worker (credential injection)
├── src/                         # Optional: extracted modules
│   ├── data/
│   │   ├── ingredient-prices.js
│   │   ├── meals.js
│   │   └── meal-translations.js
│   ├── domain/
│   │   ├── calc.js
│   │   ├── cost.js
│   │   └── validation.js
│   └── ...
├── README.md                    # User documentation
├── SECURITY.md                  # Security policy
├── LICENSE                      # MIT license
├── config.example.js            # Template (tracked)
├── .gitignore                   # Git exclusions
├── wrangler.toml                # Cloudflare config
└── package.json                 # Dependencies
```

---

## Useful Commands

```bash
# Development
npm install -D wrangler
wrangler dev                    # Local Cloudflare server

# Git
git status                      # Check changes
git add .gitignore              # Stage files
git commit -m "type: message"   # Commit
git push origin main            # Push to GitHub

# Testing
npm run test                    # Run tests (if configured)

# Deployment (manual)
wrangler publish                # Deploy to Cloudflare
```

---

**Last Updated:** June 2026  
**Status:** Active Development
