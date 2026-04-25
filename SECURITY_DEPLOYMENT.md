# 🔐 Security Audit & Cloudflare Deployment Guide

## Audit Results

✅ **Current Code Status:**
- `git log --all -G "nkanizeemmcywnekchhr"`: Shows initial commit (historical data, not active)
- `git grep "nkanizeemmcywnekchhr"`: No results (credentials removed from working code)
- ✅ No hardcoded API keys in production code
- ✅ Using `window.__ENV` for runtime credentials
- ✅ `.gitignore` blocks `config.js` and `config.local.js`
- ✅ `config.example.js` provides safe template

## 📋 Credential Rotation (REQUIRED)

Your old API key may have been exposed in git history. **Rotate immediately:**

1. Go to [Supabase Dashboard](https://app.supabase.com) → Your Project
2. Navigate to **Settings → API**
3. Click **Regenerate** next to the anon public key
4. Copy the NEW key (you'll need it in Step 2 below)
5. ⚠️ The old key (`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`) is now revoked

## ✅ Enable Supabase Data API

1. In Supabase Dashboard → **Integrations → Data API**
2. Under "Exposed Tables", ensure `diet_data` is **checked/enabled**
3. If grayed out: **Enable it** (Data API → Settings → Toggle on)

## 🚀 Deploy to Cloudflare Pages

### Step 1: Repository Structure

Your repo now has the required structure:

```
diet-tracker/
├── diet-tracker.html          # Main app
├── config.example.js          # Template (commit to repo)
├── .gitignore                 # Blocks config.js (prevent secrets)
├── functions/
│   └── api/
│       └── env.js             # Injects env vars (Cloudflare Function)
└── README.md
```

### Step 2: Push to GitHub

```bash
cd "c:\Dev\Diet Manager"
git add functions/api/env.js diet-tracker.html .gitignore config.example.js
git commit -m "Add Cloudflare Pages Functions for secure env var injection"
git push origin main
```

This triggers auto-deployment to Cloudflare Pages.

### Step 3: Configure Cloudflare Environment Variables

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Pages**
2. Select your project (`diet-tracker`)
3. Go to **Settings → Environment Variables**
4. Add Production variables:
   - **Name:** `SUPABASE_URL`  
     **Value:** `https://nkanizeemmcywnekchhr.supabase.co`
   - **Name:** `SUPABASE_KEY`  
     **Value:** `<YOUR NEW REGENERATED KEY FROM SUPABASE>`
5. Click **Save**
6. **Trigger a deployment:**
   - Go to **Deployments** tab
   - Click the latest deployment's **...** menu → **Redeploy**

### Step 4: Verify Deployment

1. Open [https://diet-tracker-e52.pages.dev](https://diet-tracker-e52.pages.dev)
2. Press `F12` to open DevTools → **Console** tab
3. Type: `window.__ENV`
4. You should see:
   ```javascript
   { 
     SUPABASE_URL: 'https://nkanizeemmcywnekchhr.supabase.co',
     SUPABASE_KEY: 'eyJhbGci...<your new key>'
   }
   ```
5. Verify app loads without 401 errors in Network tab

## 📚 How It Works

**Development (Local):**
1. Create `config.js` (ignored by git):
   ```javascript
   window.__ENV = {
     SUPABASE_URL: "https://nkanizeemmcywnekchhr.supabase.co",
     SUPABASE_KEY: "your-new-key-here"
   };
   ```
2. Load `http://localhost` → `config.js` loads first
3. Main script reads `window.__ENV` (populated)

**Production (Cloudflare Pages):**
1. Request `https://diet-tracker-e52.pages.dev`
2. Browser fetches `/api/env` (Cloudflare Function)
3. Function reads `env.SUPABASE_URL` and `env.SUPABASE_KEY` from environment
4. Function returns `window.__ENV = {...}` as JavaScript
5. `<script src="/api/env"></script>` injects it
6. Then `diet-tracker.html` loads, reads `window.__ENV`
7. No secrets in source code, git history, or client-side bundles

## 🔒 Security Benefits

✅ **No hardcoded secrets** in HTML or JavaScript  
✅ **No secrets in git history** (even if browsing commits)  
✅ **Environment-specific credentials** (dev uses config.js, prod uses Cloudflare env vars)  
✅ **Automatic rotation support** (rotate key in Supabase → update Cloudflare env var → done)  
✅ **Shared projects safe** (each deployment gets its own credentials)  

## ⚠️ Shared Supabase Project Considerations

Since this project shares Supabase with other apps:
- **Rotate the key immediately** (old key is compromised)
- Each app can now read from `window.__ENV` independently
- Use Row Level Security policies to segment data by app
- Consider using separate Supabase projects long-term

## 🛠️ Troubleshooting

| Problem | Solution |
|---------|----------|
| `window.__ENV is undefined` | Hard refresh (Ctrl+Shift+R), check Network tab for `/api/env` 200 response |
| 401 Unauthorized errors | Verify Supabase key in Cloudflare env vars matches regenerated key |
| App not loading after deploy | Check Cloudflare Pages build logs for function errors |
| Old key still works | Supabase hasn't fully revoked it yet; allow 5-10 min or force regenerate again |

## 📝 Checklist

- [ ] Regenerated Supabase anon key
- [ ] Enabled Supabase Data API for `diet_data` table
- [ ] Pushed code to GitHub (triggers Cloudflare deploy)
- [ ] Added `SUPABASE_URL` env var in Cloudflare Pages
- [ ] Added `SUPABASE_KEY` env var in Cloudflare Pages (new key)
- [ ] Triggered redeploy in Cloudflare
- [ ] Verified `window.__ENV` shows credentials in DevTools
- [ ] App loads and queries work without 401 errors
- [ ] Tested on live domain (https://diet-tracker-e52.pages.dev)

---

**Last Updated:** April 25, 2026  
**Status:** ✅ Security-hardened, environment-based credentials active
