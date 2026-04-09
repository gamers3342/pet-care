import { supabase } from '../utils/supabaseClient';

export async function upsertAppUser(params: { email: string; name?: string | null; auth_provider?: 'otp' | 'google'; }) {
  const email = params.email;
  const name = params.name ?? null;
  const auth_provider = params.auth_provider ?? 'otp';

  if (!email) return;

  // Try to find existing user by email (use `app_user` table)
  const { data: existing, error: findErr } = await supabase
    .from('app_user')
    .select('user_id')
    .eq('email', email)
    .maybeSingle();

  if (findErr) {
    // Non-fatal; log and continue attempt to insert
    console.warn('Supabase find user error:', findErr);
  }

  if (existing) {
    // Optionally update name/provider
    await supabase
      .from('app_user')
      .update({ name, auth_provider })
      .eq('email', email);
    return existing.user_id;
  }

  const { data: inserted, error: insertErr } = await supabase
    .from('app_user')
    .insert([{ email, name, auth_provider }])
    .select('user_id')
    .single();

  if (insertErr) {
    console.warn('Supabase insert user error:', insertErr);
    return undefined;
  }

  return inserted?.user_id as number | undefined;
}



