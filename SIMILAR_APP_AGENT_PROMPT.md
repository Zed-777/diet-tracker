# 🚀 BUILD A SIMILAR HEALTH/WELLNESS APP - AGENT BRIEFING

## Context
You're building a new health/wellness tracking application using the **Diet Tracker as your proven template**. The Diet Tracker has been battle-tested in production and includes all the patterns you need: secure credential injection, offline support, error handling, bilingual UI, three themes, and full Supabase integration.

**Your goal:** Build a **[APP_NAME]** app with the same architecture, quality standards, and security posture as Diet Tracker.

---

## 📋 TEMPLATE OVERVIEW

### What is Diet Tracker?
- ✅ Single HTML file (~4500 lines) — No build step, no dependencies
- ✅ Production-ready with error handling, offline support, validation
- ✅ Supabase PostgreSQL backend (JSONB blob storage)
- ✅ Cloudflare Pages deployment + credential injection via Workers
- ✅ 3 themes (dark, light, pink), bilingual (EN/ES)
- ✅ Mobile-first, responsive design

**Repository:** https://github.com/Zed-777/diet-tracker  
**Live:** https://diet-tracker-XXXX.pages.dev  
**Stack:** HTML + CSS + Vanilla JS + Supabase + Cloudflare Pages

---

## 🎯 YOUR PROJECT REQUIREMENTS

**App:** [SPECIFY YOUR APP NAME & PURPOSE]  
**Domain:** [HEALTH/FITNESS/WELLNESS CATEGORY]  
**Core Features:** [LIST YOUR 3-5 PRIMARY FEATURES]  
**Target Users:** [WHO ARE THEY?]  
**Launch Date:** [TIMELINE]

---

## 🏗️ PROJECT STRUCTURE (Copy from Diet Tracker)

You need these files/folders:

```
your-app-repo/
├── your-app.html                   # Main SPA file (4500+ lines)
│                                    # - All HTML, CSS, JavaScript
│                                    # - 6-9 modules (DB, CALC, VALID, LANG, OFFLINE, etc.)
│                                    # - 6-8 screens/views
│                                    # - Error boundaries, validation, offline queueing
│
├── functions/
│   └── api/
│       └── env.js                  # Cloudflare Worker for credential injection
│                                    # COPY from Diet Tracker (same file, same logic)
│
├── wrangler.toml                   # Wrangler configuration
│                                    # COPY from Diet Tracker, update name/routes
│
├── package.json                    # Dependencies + scripts
│                                    # COPY from Diet Tracker
│
├── .gitignore                      # Git ignore rules
│                                    # COPY from Diet Tracker
│
├── README.md                       # Project documentation
│                                    # WRITE SPECIFIC TO YOUR APP
│
└── .git/                           # Version control
                                    # `git init` to start
```

---

## 📥 FILES TO COPY FROM DIET TRACKER

These files are identical or near-identical for any health app:

**Copy as-is (no changes needed):**
- `functions/api/env.js` — Credential injection (universal)
- `.gitignore` — Same exclusions work
- `wrangler.toml` — Update project name only

**Copy and customize:**
- `package.json` — Update name, description, scripts
- `README.md` — Update app-specific content

**Create new:**
- `your-app.html` — Your app's implementation

---

## ✅ ARCHITECTURE PATTERN (Proven in Diet Tracker)

### Frontend Structure

**HTML File: `your-app.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your App Name</title>
  <style>
    /* CSS: Tokens, reset, animations, layouts, components */
    /* Support 3 themes: dark, light, pink */
  </style>
</head>
<body>
  <div id="header"><!-- App header + logo --></div>
  <div id="main"><!-- Views injected here --></div>
  <div id="nav-bottom"><!-- 6-8 navigation buttons --></div>
  
  <!-- CRITICAL: Load credentials FIRST -->
  <script src="/api/env"></script>
  
  <script>
    // MODULES (6-9 of these):
    // const DB = { get, set, delete } — Supabase wrapper
    // const CALC = { ... } — Your domain calculations
    // const VALID = { ... } — Input validation
    // const OFFLINE = { ... } — Offline detection + queueing
    // const LANG = { en: {}, es: {} } — Translations
    // const [DOMAIN]_MODULE = { ... } — Your app-specific logic
    
    // STATE
    let state = { /* Your app's data structure */ };
    let currentView = 'today';
    
    // RENDER
    function render() { /* Renders currentView */ }
    
    // ACTIONS
    function openView(view) { /* Navigate between views */ }
    
    // INIT
    (async () => {
      try {
        await loadState(); // Load from Supabase
        render();          // Render UI
      } catch(e) {
        console.error('Init error:', e);
        showToast('Failed to load. Check Supabase.', 'error');
      }
    })();
  </script>
</body>
</html>
```

### Modules (Required)

1. **DB Module** — Supabase REST wrapper
   ```javascript
   const DB = {
     async get(id) { /* GET from Supabase */ },
     async set(id, data) { /* POST/UPSERT */ },
     async delete(id) { /* DELETE */ }
   };
   ```

2. **CALC Module** — Your domain calculations
   ```javascript
   const CALC = {
     calculateX() { /* Your math */ },
     calculateY() { /* Your math */ }
   };
   ```

3. **VALID Module** — Input validation
   ```javascript
   const VALID = {
     numeric(value, min, max, field) { /* Check range */ },
     yourCustomValidation(value) { /* Validate */ }
   };
   ```

4. **OFFLINE Module** — Offline detection + operation queueing
   ```javascript
   const OFFLINE = {
     isOnline() { return navigator.onLine; },
     queue: [],
     queueOperation(fn) { this.queue.push(fn); },
     async retryQueue() { /* Retry all queued ops */ }
   };
   ```

5. **LANG Module** — Bilingual translations
   ```javascript
   const LANG = {
     en: { /* All UI strings */ },
     es: { /* Spanish */ }
   };
   function T(key) { /* Get translation */ }
   ```

6. **Your Domain Module(s)** — App-specific logic
   - For health app: Tracking, goals, calculations, analytics

### Views (6-8 screens)

Typical structure:
```javascript
function render() {
  const main = document.getElementById('main');
  try {
    if (currentView === 'today') main.innerHTML = renderToday();
    else if (currentView === 'history') main.innerHTML = renderHistory();
    else if (currentView === 'analytics') main.innerHTML = renderAnalytics();
    else if (currentView === 'goals') main.innerHTML = renderGoals();
    else if (currentView === 'settings') main.innerHTML = renderSettings();
  } catch(e) {
    console.error('Render error:', e);
    main.innerHTML = `<div class="error-boundary">
      <div class="error-title">⚠️ Error</div>
      <div class="error-text">${e.message}</div>
      <button onclick="openView('today')">Back</button>
    </div>`;
  }
}
```

---

## 🗄️ SUPABASE DATABASE SETUP

### Create Your Table

```sql
-- Replace [your_table] with your app's table name
CREATE TABLE [your_table] (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE [your_table] ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow all" ON [your_table]
  FOR ALL USING (true) WITH CHECK (true);
```

**Example:** For fitness app, `CREATE TABLE fitness_data (...)`

### Data Structure

Store all user data in JSONB `data` column:

```javascript
{
  // Profile
  profile: { name, age, height, weight, goal, experience },
  
  // Dates entries (one per day)
  log_YYYY-MM-DD: {
    exercises: [],
    notes: '',
    metrics: {}
  },
  
  // Aggregate data
  prs: { exerciseId: { weight, reps, date } },
  preferences: { language, theme, units }
}
```

---

## 🔐 SECURITY & DEPLOYMENT

### Cloudflare Pages Setup

1. **Create Project**
   - Go to Cloudflare Pages
   - Connect your GitHub repo
   - Set build: None (static site)
   - Set output directory: `/` (root)

2. **Set Environment Variables**
   - Go to Settings → Environment variables
   - Add **Production** environment:
     ```
     SUPABASE_URL = https://your-project.supabase.co
     SUPABASE_KEY = your-anon-public-key
     ```

3. **Deploy**
   - Push to GitHub main branch
   - Cloudflare auto-deploys
   - Function routes `/api/env` to `functions/api/env.js`

### Zero Hardcoded Secrets

✅ **What you're doing right:**
- Credentials in Cloudflare env vars only
- `/api/env` endpoint injects `window.__ENV`
- App reads from `window.__ENV` at runtime
- Nothing in git, nothing in HTML

---

## 🧪 QUALITY STANDARDS (From Diet Tracker)

### Error Handling
- ✅ Try-catch on all renders
- ✅ Try-catch on all DB operations
- ✅ User-friendly error messages (not technical jargon)
- ✅ Fallback error UI when render fails

### Input Validation
- ✅ All numeric inputs validated (min/max ranges)
- ✅ Sanitize strings (prevent XSS)
- ✅ Validate data structure before save
- ✅ Show user-friendly validation errors

### Offline Support
- ✅ Detect online/offline with `navigator.onLine`
- ✅ Queue operations when offline
- ✅ Auto-retry when connection returns
- ✅ Show offline banner to user
- ✅ Graceful degradation

### Memory Management
- ✅ Cleanup timers on navigation
- ✅ Remove event listeners on cleanup
- ✅ Prevent memory leaks in animations
- ✅ `beforeunload` handler to save state

### Mobile Optimization
- ✅ Viewport meta tag correct
- ✅ Touch-friendly buttons (48px+)
- ✅ No horizontal scrolling
- ✅ Responsive breakpoints (320px → 1920px)
- ✅ Test on real devices

---

## 📖 DEVELOPMENT WORKFLOW

### Step 1: Repository Setup
```bash
# Create new repo on GitHub
git clone https://github.com/YOUR-ORG/your-app
cd your-app

# Copy Diet Tracker config files
cp ../diet-tracker/functions ./functions
cp ../diet-tracker/wrangler.toml .
cp ../diet-tracker/package.json .
cp ../diet-tracker/.gitignore .

# Update package.json
# - Change name to "your-app"
# - Update description

git add .
git commit -m "🎯 Initial setup from Diet Tracker template"
```

### Step 2: Create Your App
```bash
# Create your-app.html with:
# 1. HTML structure (header, main, nav)
# 2. CSS (colors, layout, components)
# 3. JavaScript modules (DB, CALC, VALID, OFFLINE, LANG, etc.)
# 4. Views (render functions for each screen)
# 5. Actions (openView, save, etc.)
# 6. Init function

# Test locally
wrangler dev
# Open http://localhost:8787
```

### Step 3: Connect Supabase
```bash
# 1. Create table in Supabase (run SQL)
# 2. Get SUPABASE_URL and SUPABASE_KEY
# 3. Test locally:
#    - wrangler dev
#    - Open console → fetch('/api/env').then(r => r.text()).then(console.log)
#    - Should see credentials returned
# 4. Verify DB connection works
```

### Step 4: Deploy to Cloudflare
```bash
# 1. Push to GitHub
git push origin main

# 2. Cloudflare auto-deploys
# 3. Set env vars in Cloudflare Pages dashboard
# 4. Test at https://your-app-XXXX.pages.dev
```

---

## 🎯 IMPLEMENTATION CHECKLIST

### MVP (Week 1-2)
- [ ] Project structure created
- [ ] All 6 core modules implemented
- [ ] 3 main views (Today, History, Settings)
- [ ] Theme system (dark/light/pink)
- [ ] Bilingual support (EN/ES)
- [ ] Error boundaries on all renders
- [ ] Input validation on all fields
- [ ] Offline detection + queueing
- [ ] Supabase integration tested
- [ ] Mobile responsive confirmed

### Quality (Week 3)
- [ ] No console errors
- [ ] All error cases handled gracefully
- [ ] Offline mode tested thoroughly
- [ ] Themes working correctly
- [ ] Translations complete (EN/ES)
- [ ] All buttons/inputs accessible
- [ ] Memory leaks checked (DevTools)
- [ ] Performance optimized (Fast 3G tested)

### Deployment (Week 4)
- [ ] GitHub repo created and pushed
- [ ] Cloudflare Pages connected
- [ ] Environment variables configured
- [ ] Supabase table created with RLS
- [ ] `/api/env` endpoint working
- [ ] Live URL tested thoroughly
- [ ] README updated with setup instructions
- [ ] Documented deployment steps

---

## 📚 REFERENCE & TEMPLATES

### Copy-Paste: Supabase DB Module
```javascript
const DB = {
  async get(id) {
    if (!SB_URL || !SB_KEY) throw new Error('Credentials not loaded');
    const url = `${SB_URL}/rest/v1/your_table?id=eq.${encodeURIComponent(id)}&select=data`;
    const res = await fetch(url, { headers: { 'Authorization': `Bearer ${SB_KEY}` } });
    const data = await res.json();
    return data[0]?.data || null;
  },

  async set(id, data) {
    if (!SB_URL || !SB_KEY) throw new Error('Credentials not loaded');
    await fetch(`${SB_URL}/rest/v1/your_table`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SB_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify({ id, data, updated_at: new Date().toISOString() })
    });
  },

  async delete(id) {
    if (!SB_URL || !SB_KEY) throw new Error('Credentials not loaded');
    await fetch(`${SB_URL}/rest/v1/your_table?id=eq.${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${SB_KEY}` }
    });
  }
};
```

### Copy-Paste: Error Boundary
```javascript
function render() {
  const main = document.getElementById('main');
  try {
    if (currentView === 'view1') main.innerHTML = renderView1();
    else if (currentView === 'view2') main.innerHTML = renderView2();
    // ... other views
  } catch(e) {
    console.error('Render error:', e);
    main.innerHTML = `
      <div style="background-color: var(--bg2); border: 2px solid var(--intensity); padding: 16px; border-radius: 8px;">
        <div style="color: var(--intensity); font-weight: 600;">⚠️ Something went wrong</div>
        <div style="font-size: 13px; color: var(--fg2); margin-top: 8px;">${e.message}</div>
        <button onclick="openView('today')" style="margin-top: 12px; background-color: var(--ac); color: white; padding: 10px 16px; border-radius: 6px;">Back</button>
      </div>
    `;
  }
}
```

### Copy-Paste: Offline Queueing
```javascript
const OFFLINE = {
  isOnline() { return navigator.onLine; },
  queue: [],

  queueOperation(fn) {
    this.queue.push(fn);
  },

  async retryQueue() {
    const failed = [];
    for (const fn of this.queue) {
      try {
        await fn();
      } catch(e) {
        failed.push(fn);
      }
    }
    this.queue = failed;
  }
};

window.addEventListener('online', () => {
  showToast('Back online! Syncing...');
  OFFLINE.retryQueue();
});

window.addEventListener('offline', () => {
  showToast('No connection. Changes saved locally.');
});
```

---

## 🚨 COMMON MISTAKES TO AVOID

❌ **DON'T:**
- Hardcode Supabase credentials in HTML
- Use Supabase JavaScript client (`@supabase/supabase-js`)
- Skip error boundaries on renders
- Forget `<script src="/api/env"></script>`
- Build/compile (keep it single HTML file)
- Add npm dependencies (stay vanilla)
- Deploy before setting Cloudflare env vars
- Ignore offline mode (test it!)
- Skip input validation

✅ **DO:**
- Load credentials from `window.__ENV`
- Use REST API with fetch
- Wrap all renders in try-catch
- Load env script first in HTML
- Keep single HTML file (no build)
- Use vanilla JS only
- Set env vars before first deploy
- Test offline thoroughly
- Validate all inputs before save

---

## 📞 DEBUGGING HELP

**Blank screen on load?**
- Check browser console for errors
- Run: `fetch('/api/env').then(r => r.text()).then(console.log)`
- If credentials empty, redeploy from Cloudflare
- Clear cache, hard refresh (Ctrl+Shift+R)

**Data not saving?**
- Check DevTools Network tab (should see POST to Supabase)
- Verify Supabase table exists
- Check RLS policy allows INSERT/UPDATE
- Look at browser console for fetch errors

**Offline mode not working?**
- Test by disconnecting network (DevTools)
- Check `OFFLINE.isOnline()` returns false
- Verify operation was queued
- Reconnect and check retry

**Credentials not loading?**
- Verify Cloudflare env vars are set (Production!)
- Wait 3 min after env var change
- Redeploy from Cloudflare Deployments tab
- Check `/api/env` endpoint manually in console

---

## ✅ SUCCESS INDICATORS

- ✓ App loads without blank screen
- ✓ `/api/env` returns Supabase credentials
- ✓ Can create profile and save to Supabase
- ✓ All navigation buttons work
- ✓ Theme switching works (dark/light/pink)
- ✓ Translations work (EN/ES)
- ✓ Offline mode tested (operation queueing works)
- ✓ Online sync works (queued ops retry)
- ✓ No console errors
- ✓ Error boundary catches crashes gracefully
- ✓ Mobile responsive on iPhone/Android
- ✓ Live URL accessible from any device

---

## 📅 TIMELINE ESTIMATE

- **Week 1:** Project setup + core modules + 3 views = 20-30 hours
- **Week 2:** Quality assurance + testing + refinement = 15-20 hours
- **Week 3:** Deployment + documentation = 5-10 hours

**Total:** 40-60 hours for production-ready MVP

---

## 🎓 RESOURCES

- **Diet Tracker Repo:** https://github.com/Zed-777/diet-tracker
- **Supabase Docs:** https://supabase.com/docs
- **Cloudflare Pages:** https://pages.cloudflare.com
- **Cloudflare Workers:** https://workers.cloudflare.com
- **MDN Web Docs:** https://developer.mozilla.org

---

**You have everything you need. The Diet Tracker is a proven template. Follow it precisely, and you'll have a production-ready app.** 🚀

**Questions?** Refer to `SUPABASE_SETUP_PROMPT.md` for detailed Supabase setup instructions.
