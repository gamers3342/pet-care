import { supabase } from '../utils/supabaseClient';
import { authService } from './authService';

interface CartLine {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

function generateOrderNumber(userId: number): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${userId}-${timestamp}${random}`;
}

export async function createPaidOrder(_lines: CartLine[], total: number) {
  const localUser = authService.getCurrentUser?.();
  let userId: number | null = null;
  let userName: string | null = null;
  
  if (localUser?.email) {
    const { data: existing } = await supabase
        .from('app_user')
      .select('user_id, name')
      .eq('email', localUser.email)
      .maybeSingle();
    if (existing?.user_id) {
      userId = existing.user_id as number;
      userName = existing.name;
    } else {
      const { data: inserted } = await supabase
          .from('app_user')
        .insert([{ email: localUser.email, name: localUser.name || null, auth_provider: 'otp' }])
        .select('user_id, name')
        .single();
      if (inserted?.user_id) {
        userId = inserted.user_id as number;
        userName = inserted.name;
      }
    }
  }

  const orderNumber = userId ? generateOrderNumber(userId) : generateOrderNumber(0);

  const { data, error } = await supabase
      .from('order')
    .insert([{ order_number: orderNumber, user_id: userId, user_name: userName, total_amount: total, status: 'paid' }])
    .select('order_id, order_number')
    .single();
  if (error) throw error;
  return data;
}



