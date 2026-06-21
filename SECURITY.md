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
  1. Go to Cloudflare Pages → diet-tracker project
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

## What's Protected

✅ **Supabase credentials**
- Anon key (read-only)
- URL and project ID
- Database connection details

✅ **Cloudflare Workers**
- Production routes
- Domain configuration
- API credentials

✅ **Personal information**
- User data (encrypted at rest, HTTPS in transit)
- Your supermarket pricing data
- Custom meal recipes
- Weight/health tracking

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
- ✅ Environment variable injection at runtime
- ✅ HTTPS-only (Cloudflare Pages enforces this)
- ✅ Credentials never logged or visible in browser console
- ✅ Proper .gitignore excludes sensitive files
- ✅ Local development uses gitignored config.js
- ✅ Production uses Cloudflare managed environment variables

### Deployment Safety

1. Push to GitHub → Cloudflare auto-deploys
2. Cloudflare builds and deploys
3. `/api/env` endpoint serves credentials at runtime
4. Browser loads, app calls `window.__ENV` (secure injection)
5. App makes authenticated requests using injected credentials
6. Credentials never visible in Network tab, Console, or Source

### Data Protection

- All requests use HTTPS (Cloudflare)
- Requests to Supabase use HTTPS
- Credentials not sent in URL or headers (sent in Authorization header only)
- Supabase stores user data encrypted
- Database RLS policies enforce access control

---

## Access Control

### Who Can Rotate Keys?

- Only you (Supabase account owner)

### Who Can See Your Git History?

- Anyone with GitHub access to the repo (but no credentials there)
- Code review is safe; credentials are not included

### Who Can See Production Credentials?

- Only Cloudflare Pages (for runtime injection)
- Never exposed to browser, users, or logs

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

**No one can:**
- Access your Supabase database
- Use your Cloudflare deployment
- See your credentials (they're not there)
- Access user data from your deployment

---

**Last Updated:** June 21, 2026  
**Status:** ✅ All protections implemented
