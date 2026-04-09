import { supabase } from '../utils/supabaseClient';
import { authService } from './authService';

async function getCurrentUserId(): Promise<number | null> {
  const localUser = authService.getCurrentUser();
  if (!localUser?.email) return null;
  
  const { data } = await supabase
    .from('app_user')
    .select('user_id')
    .eq('email', localUser.email)
    .maybeSingle();
  
  return data?.user_id || null;
}

export async function getUserAppointments() {
  const userId = await getCurrentUserId();
  if (!userId) return [];
  
  const { data, error } = await supabase
    .from('appointment')
    .select('*')
    .eq('user_id', userId)
    .order('appointment_date', { ascending: false });
  
  if (error) {
    console.error('Error fetching appointments:', error);
    return [];
  }
  return data || [];
}

export async function getUserGroomingAppointments() {
  const userId = await getCurrentUserId();
  if (!userId) return [];
  
  const { data, error } = await supabase
    .from('appointment')
    .select('*')
    .eq('user_id', userId)
    .eq('service_type', 'grooming')
    .order('appointment_date', { ascending: false });
  
  if (error) {
    console.error('Error fetching grooming appointments:', error);
    return [];
  }
  return data || [];
}

export async function cancelAppointment(appointmentId: number) {
  const { error } = await supabase
    .from('appointment')
    .update({ status: 'cancelled' })
    .eq('appointment_id', appointmentId);
  
  if (error) throw error;
  return { success: true, message: 'Appointment cancelled successfully' };
}

export async function deleteAppointment(appointmentId: number) {
  const { error } = await supabase
    .from('appointment')
    .delete()
    .eq('appointment_id', appointmentId);
  
  if (error) throw error;
  return { success: true, message: 'Appointment deleted successfully' };
}

export async function getUserOrders() {
  const userId = await getCurrentUserId();
  if (!userId) return [];
  
  const { data, error } = await supabase
    .from('order')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
  return data || [];
}

export async function cancelOrder(orderId: number) {
  const { error } = await supabase
    .from('order')
    .update({ status: 'cancelled' })
    .eq('order_id', orderId);
  
  if (error) throw error;
  return { success: true, message: 'Order cancelled successfully' };
}

export async function getUserEventRegistrations() {
  const userId = await getCurrentUserId();
  if (!userId) return [];
  
  const { data, error } = await supabase
    .from('event_registration')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching event registrations:', error);
    return [];
  }
  return data || [];
}

export async function getUserCommunityPosts() {
  const localUser = authService.getCurrentUser();
  if (!localUser?.email) return [];
  
  const { data, error } = await supabase
    .from('community_post')
    .select('*')
    .eq('user_email', localUser.email)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching community posts:', error);
    return [];
  }
  return data || [];
}

export async function deleteUserCommunityPost(postId: number) {
  const { error } = await supabase
    .from('community_post')
    .delete()
    .eq('post_id', postId);
  
  if (error) throw error;
  return { success: true, message: 'Post deleted successfully' };
}

export async function updateUserProfile(newName: string, newEmail?: string) {
  const localUser = authService.getCurrentUser();
  if (!localUser?.email) throw new Error('No user logged in');

  const updateData: { name: string; email?: string } = { name: newName };
  if (newEmail && newEmail !== localUser.email) {
    updateData.email = newEmail;
  }

  const { error } = await supabase
    .from('app_user')
    .update(updateData)
    .eq('email', localUser.email);

  if (error) throw error;
  return { success: true, message: 'Profile updated successfully' };
}