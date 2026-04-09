import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Make it obvious in console and downstream errors
  // Do not throw here to avoid crashing the app before UI shows an error
  // The booking service will surface a clearer message
  console.warn('Supabase env is missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env');
}

export const supabase = createClient(SUPABASE_URL || 'https://missing-url.invalid', SUPABASE_ANON_KEY || 'missing-key');

// Expose raw values for diagnostics (do not log secrets to public consoles in production)
export const SUPABASE_CONFIG = {
  url: SUPABASE_URL || null,
  anonKey: SUPABASE_ANON_KEY || null,
};

export async function testSupabaseConnection(timeout = 5000): Promise<boolean> {
  if (!SUPABASE_URL) return false;
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    // Try a simple GET to the Supabase project root — this should respond and validate network connectivity
    const res = await fetch(SUPABASE_URL, { method: 'GET', mode: 'cors', signal: controller.signal });
    clearTimeout(id);
    return res.ok || res.status === 200 || res.status === 404; // some Supabase hosts return 404 for root, still reachable
  } catch (err) {
    return false;
  }
}


