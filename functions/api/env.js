/**
 * Cloudflare Pages Function: GET /api/env
 *
 * Serves the public runtime config as `window.__ENV`.
 *
 * Only values that are safe for every visitor to see belong here. The Supabase
 * anon key is public by design: whatever it is allowed to do, anyone can do.
 * Never add the service_role key, a password or any other secret to this response.
 */
export async function onRequest(context) {
  const { env } = context;

  // JSON.stringify produces a correctly escaped JavaScript string literal.
  const config = {
    SUPABASE_URL: String(env.SUPABASE_URL || ''),
    SUPABASE_KEY: String(env.SUPABASE_KEY || '')
  };

  const envScript = `window.__ENV = ${JSON.stringify(config)};`;

  return new Response(envScript, {
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'max-age=300', // Cache for 5 minutes
      'X-Content-Type-Options': 'nosniff'
    }
  });
}
