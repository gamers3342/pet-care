import { supabase } from '../utils/supabaseClient';
import { authService } from './authService';

export type ServiceType = 'vet' | 'grooming';

interface UpsertUserResult {
  user_id: number;
  email: string;
  name: string | null;
}

async function upsertUserByLocalAuth(): Promise<UpsertUserResult> {
  const localUser = authService.getCurrentUser();
  console.log('=== BOOKING SERVICE DEBUG ===');
  console.log('LocalStorage userData:', localStorage.getItem('userData'));
  console.log('Current user from getCurrentUser():', localUser);
  
  if (!localUser || !localUser.email) {
    console.error('No user logged in or email missing');
    throw new Error('Please login to book an appointment. Click the login button in the header.');
  }

  const email = localUser.email;
  const name = localUser.name || null;

  console.log('Looking for user with email:', email);

  try {
    // Try to find existing user in Supabase
    console.log('Searching in app_user table for email:', email);
    const { data: existingUser, error: findErr } = await supabase
      .from('app_user')
      .select('user_id, email, name')
      .eq('email', email)
      .maybeSingle();

    console.log('Search result - data:', existingUser, 'error:', findErr);

    if (findErr && findErr.code !== 'PGRST116') {
      console.error('Database error finding user:', findErr);
      throw new Error(`Database error: ${findErr.message}`);
    }

    if (existingUser) {
      console.log('Found existing user:', existingUser);
      return existingUser as UpsertUserResult;
    }

    // Create new user if not found
    console.log('Creating new user in app_user table...');
    const { data: inserted, error: insertErr } = await supabase
      .from('app_user')
      .insert([{ email, name, auth_provider: 'otp' }])
      .select('user_id, email, name')
      .single();

    if (insertErr || !inserted) {
      console.error('Failed to create user:', insertErr);
      throw new Error(`Failed to create user: ${insertErr?.message || 'Unknown error'}`);
    }

    console.log('Created new user:', inserted);
    return inserted as UpsertUserResult;
  } catch (err) {
    console.error('Error in upsertUserByLocalAuth:', err);
    throw err;
  }
}

async function ensureClinic(clinic: { name: string; address: string; contact_no?: string; email?: string; vet_name?: string; }) {
  const { data: existing } = await supabase
    .from('clinic')
    .select('clinic_id')
    .eq('clinic_name', clinic.name)
    .eq('clinic_address', clinic.address)
    .maybeSingle();

  if (existing) return existing.clinic_id as number;

  const { data: inserted, error } = await supabase
    .from('clinic')
    .insert([{ 
      clinic_name: clinic.name, 
      clinic_address: clinic.address, 
      contact_no: clinic.contact_no || null,
      email: clinic.email || null,
      vet_name: clinic.vet_name || null,
    }])
    .select('clinic_id')
    .single();
  if (error || !inserted) throw error || new Error('Failed to create clinic');
  return inserted.clinic_id as number;
}

async function createPet(userId: number, pet: { pet_name: string; pet_breed?: string; pet_age: string; }) {
  const { data, error } = await supabase
    .from('pets')
    .insert([{ 
      user_id: userId,
      pet_name: pet.pet_name,
      pet_breed: pet.pet_breed || null,
      pet_age: pet.pet_age,
    }])
    .select('pets_id')
    .single();
  if (error || !data) throw error || new Error('Failed to create pet');
  return data.pets_id as number;
}

export async function bookAppointment(params: {
  clinic?: { name: string; address: string; contact_no?: string; email?: string; vet_name?: string; };
  appointment_date: string;
  reason?: string;
  service_type: ServiceType;
  pet: { pet_name: string; pet_breed?: string; pet_age: string; };
  user_phone?: string;
}) {
  const user = await upsertUserByLocalAuth();
  console.log('User obtained:', user);
  
  let clinic_id: number | null = null;
  if (params.clinic) {
    try {
      clinic_id = await ensureClinic(params.clinic);
      console.log('Clinic ID:', clinic_id);
    } catch (err) {
      console.warn('Failed to ensure clinic, will continue without clinic_id:', err);
      clinic_id = null;
    }
  }

  let pet_id: number | null = null;
  try {
    pet_id = await createPet(user.user_id, params.pet);
    console.log('Pet ID:', pet_id);
  } catch (err) {
    console.warn('Failed to create pet record, continuing without pet_id:', err);
    pet_id = null;
  }

  const appointmentRow: any = {
    user_id: user.user_id,
    clinic_id: clinic_id,
    pet_id: pet_id,
    user_name: user.name || user.email || 'Unknown',
    user_phone: params.user_phone || null,
    clinic_name: params.clinic?.name || null,
    clinic_address: params.clinic?.address || null,
    pet_name: params.pet.pet_name || null,
    appointment_date: params.appointment_date || new Date().toISOString(),
    reason: params.reason || '',
    status: 'scheduled',
    service_type: params.service_type || 'vet',
  };

  console.log('Inserting appointment:', appointmentRow);

  const { data, error } = await supabase
    .from('appointment')
    .insert([appointmentRow])
    .select('appointment_id')
    .maybeSingle();

  console.log('Appointment insert result - data:', data, 'error:', error);

  if (error) {
    console.error('Appointment booking error:', error);
    throw new Error(`Failed to book appointment: ${error.message}`);
  }

  if (data && data.appointment_id) {
    return { appointment_id: data.appointment_id };
  }

  const { data: last, error: _lastError } = await supabase
    .from('appointment')
    .select('appointment_id')
    .order('appointment_id', { ascending: false })
    .limit(1)
    .single();
  if (last && last.appointment_id) {
    return { appointment_id: last.appointment_id };
  }
  return {};
}

export async function getAllClinics() {
  const { data, error } = await supabase
    .from('clinic')
    .select('*')
    .order('clinic_name', { ascending: true });

  if (error) {
    console.error('Error fetching clinics:', error);
    return [];
  }
  return data || [];
}

export async function getAllServices() {
  const { data, error } = await supabase
    .from('grooming_service')
    .select('*')
    .order('service_provider', { ascending: true });

  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }
  return data || [];
}

export async function getAllAppointments() {
  const { data, error } = await supabase
    .from('appointment')
    .select('*')
    .order('appointment_date', { ascending: false });

  if (error) {
    console.error('Error fetching appointments:', error);
    return [];
  }
  return data || [];
}
