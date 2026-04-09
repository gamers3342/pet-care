import { supabase } from '../utils/supabaseClient';
import { authService } from './authService';

interface EventRegistration {
  user_id?: number | null;
  user_name?: string | null;
  user_email?: string | null;
  user_phone?: string;
  event_type: string;
  event_title: string;
  pet_name?: string;
  pet_type?: string;
  pet_breed?: string;
  pet_age?: string;
  owner_name?: string;
  notes?: string;
}

export async function registerForEvent(registration: EventRegistration) {
  const localUser = authService.getCurrentUser?.();
  let userId: number | null = null;
  let userName: string | null = null;
  let userEmail: string | null = null;
  
  if (localUser?.email) {
    const { data: existing } = await supabase
      .from('app_user')
      .select('user_id, name, email')
      .eq('email', localUser.email)
      .maybeSingle();
    
    if (existing?.user_id) {
      userId = existing.user_id as number;
      userName = existing.name;
      userEmail = existing.email;
    } else {
      const { data: inserted } = await supabase
        .from('app_user')
        .insert([{ email: localUser.email, name: localUser.name || null, auth_provider: 'otp' }])
        .select('user_id, name, email')
        .single();
      if (inserted?.user_id) {
        userId = inserted.user_id as number;
        userName = inserted.name;
        userEmail = inserted.email;
      }
    }
  }

  const { data, error } = await supabase
    .from('event_registration')
    .insert([{
      user_id: userId,
      user_name: userName || registration.user_name || null,
      user_email: userEmail || registration.user_email || null,
      user_phone: registration.user_phone,
      event_type: registration.event_type,
      event_title: registration.event_title,
      pet_name: registration.pet_name || null,
      pet_type: registration.pet_type || null,
      pet_breed: registration.pet_breed || null,
      pet_age: registration.pet_age || null,
      owner_name: registration.owner_name || null,
      notes: registration.notes || null,
      status: 'registered'
    }])
    .select('registration_id, event_title, created_at')
    .single();

  if (error) throw error;
  return data;
}

export async function getEventRegistrations() {
  const { data, error } = await supabase
    .from('event_registration')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}
