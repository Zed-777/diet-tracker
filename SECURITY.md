# 🔒 Security Policy

## Credential Management

### Local Development (`config.js`)

- **What:** Local configuration file with Supabase credentials
- **Where:** `config.js` (root directory, gitignored)
- **Who:** Only developers (never committed to git)
- **How to set up:**

  ```bash
  cp config.example.js config.js
  # Edit config.js with your real Supabase credentials
  ```

- **Access:** Local only; not deployed

### Production (`Cloudflare Environment Variables`)

- **What:** Production Supabase credentials
- **Where:** Cloudflare Pages Environment Variables (Project Settings)
- **Who:** Only you (via Cloudflare dashboard)
- **How:**
    1. Go to your Cloudflare Pages project
    2. Settings → Environment Variables
    3. Add two variables:
     - `SUPABASE_URL`: Your Supabase project URL
     - `SUPABASE_KEY`: Your Supabase anonymous key
- **Access:** Injected at runtime via `/api/env` endpoint
- **Never:** Committed to git, visible in code, or logged

### Runtime Injection Flow

```
Production Request
    ↓
Cloudflare Pages (serves diet-tracker.html)
    ↓
Page calls: <script src="/api/env"></script>
    ↓
Cloudflare Worker (functions/api/env.js)
    ↓
Reads env vars, returns: window.__ENV = { SUPABASE_URL, SUPABASE_KEY }
    ↓
App uses window.__ENV for all database calls
    ↓
Credentials never visible in network tab, console, or git history
```

---

## Current Access Model (demo)

**This build has no authentication, so the data is not protected.**

- `/api/env` sends the Supabase project URL and **anon key** to every visitor. These are public by design and visible in the browser's Network tab. They are not secrets.
- The app reads, writes and deletes `diet_data` with that anon key, and the demo policy (`allow all`) permits it. Anyone holding the key can do the same from outside the app.
- Treat everything in `diet_data` as public. Do not store real personal or health information.

**Target model:** Supabase Auth with a `user_id` column and policies such as
`using (auth.uid() = user_id) with check (auth.uid() = user_id)`, and no direct table access for the anon role.

## What Is Protected

- No service_role key, password or private token is used anywhere in the client or the repo.
- Data travels over HTTPS.
- Untrusted text is HTML-escaped before rendering, and ids/dates are sanitised before use in inline handlers.
- `_headers` sets a Content-Security-Policy (only this site, Google Fonts and `*.supabase.co`), `X-Frame-Options: DENY`, `nosniff`, a referrer policy and a permissions policy.

---

## Files in `.gitignore` (Never Committed)

```
# Local config (production use config.example.js as template)
config.js
config.local.js
config.*.js

# Environment files
*.env
*.env.local
*.env.*.local

# Backups
*.backup
*.bak

# System
.DS_Store
Thumbs.db
*.log

# IDE
.vscode/
.idea/
```

---

## Security Implementation

### Verified Safeguards

- ✅ No hardcoded secrets in code
- ✅ Environment variable injection at runtime (values serialised with `JSON.stringify`)
- ✅ HTTPS-only (Cloudflare Pages enforces this)
- ✅ Proper .gitignore excludes sensitive files
- ✅ Local development uses gitignored config.js
- ⚠️ No authentication or per-user RLS yet (demo)

### Deployment Safety

1. Push to GitHub → Cloudflare auto-deploys
2. Cloudflare builds and deploys
3. `/api/env` endpoint serves credentials at runtime
4. Browser loads, app calls `window.__ENV` (secure injection)
5. App makes authenticated requests using injected credentials
6. The anon key is visible in the Network tab by design; access control must come from Auth + RLS

### Data Protection

- All requests use HTTPS (Cloudflare)
- Requests to Supabase use HTTPS
- The anon key is sent in the `apikey` and `Authorization` headers on every request (public by design)
- Supabase encrypts data at rest
- RLS is enabled, but the demo policy allows all access; user-scoped policies are the next milestone

---

## Access Control

### Who Can Rotate Keys?

- Only you (Supabase account owner)

### Who Can See Your Git History?

- Anyone with GitHub access to the repo (but no credentials there)
- Code review is safe; credentials are not included

### Who Can See Production Credentials?

- The URL and anon key: every visitor (public by design)
- The service_role key: nobody. It must never be added to this app

---

## Emergency Procedures

### If You Suspect a Leak

1. **Regenerate Supabase API Key:**
   - Go to Supabase Dashboard → Project → Settings → API Keys
   - Click "Reveal" next to "anon public" key
   - Click the menu icon → "Rotate Key"
   - Update Cloudflare environment variable with new key
   - App will use new key immediately

2. **Update Cloudflare Environment Variable:**

   ```
   Cloudflare Pages → diet-tracker → Settings → Environment Variables
   Edit SUPABASE_KEY → paste new key → Save
   ```

---

## Transparency

This repository is designed to be **safe to fork and copy**:
- ✅ No credentials in the code
- ✅ No personal data embedded
- ✅ Example configuration provided (`config.example.js`)
- ✅ Full deployment documentation
- ✅ Clear security architecture

**Anyone who forks this can:**
- Read the code
- Understand the architecture
- Deploy their own version with their own Supabase/Cloudflare

**Be aware:**
- With the demo policy, anyone with your deployment's URL can read and change its `diet_data`
- Forks can't reach your database unless you give them your URL and key, but your live site hands both to every visitor

---

**Last Updated:** November 7, 2026  
**Status:** ⚠️ Demo: no authentication. Output encoding and security headers in place; Auth + RLS pending
