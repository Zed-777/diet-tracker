/**
 * EXAMPLE LOCAL CONFIGURATION FILE
 * 
 * This file shows the format for config.js (used for local development)
 * DO NOT commit this file or your actual credentials to git.
 * 
 * To use this for local development:
 * 1. Copy this file: cp config.example.js config.js
 * 2. Replace YOUR_ACTUAL_URL and YOUR_ACTUAL_KEY with your real Supabase credentials
 * 3. Ensure config.js is in .gitignore (it should be)
 * 4. Reload the browser to pick up credentials
 * 
 * SECURITY:
 * - config.js is listed in .gitignore and will NEVER be committed to git
 * - Production uses Cloudflare Environment Variables instead (safer)
 * - Only use config.js for local development/testing
 */

window.__ENV = {
  // Your Supabase project URL (NOT the full URL with path)
  // Example: https://your-project-ref.supabase.co
  SUPABASE_URL: 'https://YOUR_ACTUAL_URL.supabase.co',

  // Your Supabase anonymous public key (from Project Settings > API Keys)
  // This is read-only, but keep it private anyway
  SUPABASE_KEY: 'YOUR_ACTUAL_KEY_HERE'
};
