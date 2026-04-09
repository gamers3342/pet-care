import { supabase } from '../utils/supabaseClient';
import { clinicsSeed } from '../data/clinicsSeed';
import { servicesSeed } from '../data/servicesSeed';
import { sendCancellationEmail } from '../utils/email';

export interface AdminUser {
  admin_id: number;
  fname: string;
  lname: string;
  email: string;
  user_name: string;
  contact_no?: string;
  address: string;
  created_at: string;
}

export interface AdminLoginCredentials {
  email: string;
  password: string;
}

class AdminService {
  private readonly ALLOWED_ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL as string) || 'admin@123';
  private readonly DEFAULT_ADMIN_PASSWORD = (import.meta.env.VITE_ADMIN_PASSWORD as string) || 'admin123';

  async login(credentials: AdminLoginCredentials): Promise<AdminUser> {
    const email = (credentials.email || '').trim().toLowerCase();
    const password = (credentials.password || '').trim();

    // Check if email is allowed
    if (email !== this.ALLOWED_ADMIN_EMAIL) {
      throw new Error('Access denied. Only authorized administrators can access this panel.');
    }

    // Quick local fallback: allow default admin credentials even if Supabase is unreachable
    if (password === this.DEFAULT_ADMIN_PASSWORD) {
      const localAdmin: AdminUser = {
        admin_id: -1,
        fname: 'Admin',
        lname: 'User',
        email,
        user_name: 'admin_user',
        contact_no: '+91-9876543210',
        address: 'Local Admin',
        created_at: new Date().toISOString(),
      };

      try {
        // Best-effort: ensure a record exists in Supabase for visibility
        const { data: existing } = await supabase
          .from('admin')
          .select('admin_id')
          .eq('email', email)
          .maybeSingle();
        if (!existing) {
          await supabase.from('admin').insert([{ 
            fname: localAdmin.fname,
            lname: localAdmin.lname,
            password: this.DEFAULT_ADMIN_PASSWORD,
            contact_no: localAdmin.contact_no,
            email: localAdmin.email,
            address: localAdmin.address,
            user_name: localAdmin.user_name
          }]);
        }
      } catch (err) {
        // ignore - this is best-effort and should not block login
        console.warn('Supabase admin insert failed (non-fatal):', err);
      }

      // Store admin session locally
      localStorage.setItem('admin_user', JSON.stringify(localAdmin));
      localStorage.setItem('admin_token', 'admin_authenticated');
      return localAdmin;
    }

    // Verify admin credentials against Supabase
    const { data, error } = await supabase
      .from('admin')
      .select('admin_id, fname, lname, email, user_name, contact_no, address, created_at')
      .eq('email', email)
      .eq('password', password)
      .single();

    if (error || !data) {
      throw new Error('Invalid admin credentials.');
    }

    // Store admin session
    localStorage.setItem('admin_user', JSON.stringify(data));
    localStorage.setItem('admin_token', 'admin_authenticated');

    return data;
  }

  logout(): void {
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_token');
  }

  getCurrentAdmin(): AdminUser | null {
    const adminData = localStorage.getItem('admin_user');
    const token = localStorage.getItem('admin_token');
    
    if (!adminData || !token || token !== 'admin_authenticated') {
      return null;
    }

    try {
      return JSON.parse(adminData);
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return this.getCurrentAdmin() !== null;
  }

  async getAllUsers() {
    try {
      // Try the app_user table first
      console.log('Attempting to fetch from app_user table...');
      const { data, error } = await supabase
        .from('app_user')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error querying app_user:', error);
        throw error;
      }

      console.log('✅ getAllUsers fetched successfully:', data?.length || 0, 'users');
      console.log('User data:', data);
      
      return data || [];
    } catch (err: any) {
      console.error('❌ getAllUsers failed:', err?.message || err);

      // If the Supabase JS client fails (network/CORS), try a REST fallback using fetch and anon key
      try {
        const { SUPABASE_CONFIG } = await import('../utils/supabaseClient');
        if (SUPABASE_CONFIG?.url && SUPABASE_CONFIG?.anonKey) {
          const url = `${SUPABASE_CONFIG.url.replace(/\/$/, '')}/rest/v1/app_user?select=*&order=created_at.desc`;
          console.log('Trying REST fallback to:', url);
          const res = await fetch(url, {
            headers: {
              apikey: SUPABASE_CONFIG.anonKey,
              Authorization: `Bearer ${SUPABASE_CONFIG.anonKey}`,
              Accept: 'application/json',
            },
          });
          if (res.ok) {
            const json = await res.json();
            console.log('REST fallback succeeded, users:', json?.length || 0);
            return json || [];
          } else {
            console.warn('REST fallback returned non-OK:', res.status, await res.text());
          }
        }
      } catch (restErr) {
        console.error('REST fallback failed:', restErr);
      }
      // Try alternative table name if first fails
      try {
        console.log('Trying fallback table name: users...');
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (!fallbackError && fallbackData) {
          console.log('✅ Fallback succeeded:', fallbackData?.length || 0, 'users');
          return fallbackData;
        }
      } catch (fallbackErr) {
        console.error('Fallback also failed:', fallbackErr);
      }
      
      return [];
    }
  }

  async getAllAppointments() {
    const { data, error } = await supabase
      .from('appointment')
      .select('*, clinic:clinic(*), app_user:user_id(*)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('getAllAppointments error:', error);
      throw error;
    }
    console.log('✅ getAllAppointments fetched:', data?.length || 0, 'appointments');
    return data || [];
  }

  async getAllPets() {
    const { data, error } = await supabase
      .from('pets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('getAllPets error:', error);
      throw error;
    }
    console.log('✅ getAllPets fetched:', data?.length || 0, 'pets');
    return data || [];
  }

  async getAllClinics() {
    // The project seeds and other services use the `clinic` table
    const { data, error } = await supabase
      .from('clinic')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async seedClinics() {
    // Fetch existing to avoid duplicates
    const { data: existing, error: existingErr } = await supabase
      .from('clinic')
      .select('clinic_name, clinic_address');
    if (existingErr) throw existingErr;

    const existingSet = new Set((existing || []).map(c => `${c.clinic_name}__${c.clinic_address}`));

    const rows = clinicsSeed
      .filter(c => !existingSet.has(`${c.name}__${c.address}`))
      .map(c => ({
        clinic_name: c.name,
        clinic_address: c.address,
        contact_no: c.contact_no || null,
        email: c.email || null,
        vet_name: c.vet_name || null,
      }));

    if (rows.length === 0) {
      return { inserted: 0 };
    }

    const { error } = await supabase.from('clinic').insert(rows);
    if (error) throw error;
    return { inserted: rows.length };
  }

  async getAllServices() {
    const { data, error } = await supabase
      .from('grooming_service')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async seedServices() {
    const { data: existing, error: existingErr } = await supabase
      .from('grooming_service')
      .select('service_provider, service_address');
    if (existingErr) throw existingErr;

    const existingSet = new Set((existing || []).map(s => `${s.service_provider}__${s.service_address}`));

    const rows = servicesSeed
      .filter(s => !existingSet.has(`${s.name}__${s.address}`))
      .map(s => ({
        service_provider: s.name,
        service_address: s.address,
        contact_no: s.contact_no || null,
        email: s.email || null,
      }));

    if (rows.length === 0) return { inserted: 0 };
    const { error } = await supabase.from('grooming_service').insert(rows);
    if (error) throw error;
    return { inserted: rows.length };
  }

  async getAllOrders() {
    const { data, error } = await supabase
      .from('order')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('getAllOrders error:', error);
      throw error;
    }
    console.log('✅ getAllOrders fetched:', data?.length || 0, 'orders');
    return data || [];
  }

  async getAllCommunityPosts() {
    const { data, error } = await supabase
      .from('community_post')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('getAllCommunityPosts error:', error);
      throw error;
    }
    console.log('✅ getAllCommunityPosts fetched:', data?.length || 0, 'posts');
    return data || [];
  }

  async updateCommunityPostStatus(postId: number, status: string) {
    const { data, error } = await supabase
      .from('community_post')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('post_id', postId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteCommunityPost(postId: number) {
    const { error } = await supabase
      .from('community_post')
      .delete()
      .eq('post_id', postId);

    if (error) throw error;
  }

  async updateAppointmentStatus(appointmentId: number, status: string) {
    const { data, error } = await supabase
      .from('appointment')
      .update({ status })
      .eq('appointment_id', appointmentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteUser(userId: number) {
    try {
      // First delete related records to avoid foreign key issues
      // Delete appointments
      await supabase.from('appointment').delete().eq('user_id', userId);
      
      // Delete orders
      await supabase.from('order').delete().eq('user_id', userId);
      
      // Delete event registrations
      await supabase.from('event_registration').delete().eq('user_id', userId);
      
      // Delete community posts by this user
      await supabase.from('community_post').delete().eq('user_email', 
        (await supabase.from('app_user').select('email').eq('user_id', userId).single()).data?.email
      );

      // Delete from anonymous function to avoid capturing issues
      const emailResult = await supabase.from('app_user').select('email').eq('user_id', userId).single();
      const userEmail = emailResult.data?.email;
      
      if (userEmail) {
        await supabase.from('community_post').delete().eq('user_email', userEmail);
      }

      // Now delete the user
      const { error } = await supabase
        .from('app_user')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;
    } catch (err) {
      console.error('Error deleting user:', err);
      throw err;
    }
  }

  async deleteAppointment(appointmentId: number) {
    // First get appointment details to send email
    const { data: appointment, error: fetchError } = await supabase
      .from('appointment')
      .select('*, app_user:user_id(email, name)')
      .eq('appointment_id', appointmentId)
      .single();

    if (fetchError) {
      console.error('Error fetching appointment:', fetchError);
    }

    // Delete the appointment
    const { error } = await supabase
      .from('appointment')
      .delete()
      .eq('appointment_id', appointmentId);

    if (error) throw error;

    // Send cancellation email to user
    if (appointment?.app_user?.email) {
      try {
        await sendCancellationEmail({
          name: appointment.app_user.name || undefined,
          email: appointment.app_user.email,
          appointmentDate: new Date(appointment.appointment_date).toLocaleString(),
          clinicName: appointment.clinic_name || 'Unknown Clinic',
        });
        console.log('Cancellation email sent to:', appointment.app_user.email);
      } catch (emailError) {
        console.error('Failed to send cancellation email:', emailError);
      }
    }
  }

  async deleteService(serviceId: number) {
    const { error } = await supabase
      .from('grooming_service')
      .delete()
      .eq('service_id', serviceId);

    if (error) throw error;
  }

  async addService(service: { service_provider: string; service_address: string; contact_no?: string; email?: string; area?: string }) {
    const { data, error } = await supabase
      .from('grooming_service')
      .insert([service])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteClinic(clinicId: number) {
    const { error } = await supabase
      .from('clinic')
      .delete()
      .eq('clinic_id', clinicId);

    if (error) throw error;
  }

  async addClinic(clinic: { clinic_name: string; clinic_address: string; contact_no?: string; email?: string; vet_name?: string; area?: string }) {
    const { data, error } = await supabase
      .from('clinic')
      .insert([clinic])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async addUser(user: { email: string; name?: string; auth_provider?: string }) {
    const { data, error } = await supabase
      .from('app_user')
      .insert([user])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateUser(userId: number, user: { email?: string; name?: string }) {
    const { data, error } = await supabase
      .from('app_user')
      .update(user)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateOrderStatus(orderId: number, status: string) {
    const { data, error } = await supabase
      .from('order')
      .update({ status })
      .eq('order_id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteOrder(orderId: number) {
    const { error } = await supabase
      .from('order')
      .delete()
      .eq('order_id', orderId);

    if (error) throw error;
  }
}

export const adminService = new AdminService();
