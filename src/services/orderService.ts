import { supabase } from '../utils/supabaseClient';
import { authService } from './authService';

interface CartLine {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface OrderProduct {
  product_id: number;
  product_name: string;
  price: number;
  quantity: number;
  image_url?: string;
}

function generateOrderNumber(userId: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'ORD-';
  result += userId + '-';
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function createPaidOrder(lines: CartLine[], total: number) {
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

  // Generate better order number
  const orderNumber = generateOrderNumber(userId || 0);

  // Prepare products data
  const productsJson = JSON.stringify(lines.map(line => ({
    product_id: line.id,
    product_name: line.name,
    price: line.price,
    quantity: line.quantity
  })));

  const { data, error } = await supabase
      .from('order')
    .insert([{ 
      order_number: orderNumber, 
      user_id: userId, 
      user_name: userName,
      user_email: userEmail,
      total_amount: total, 
      status: 'paid',
      products: productsJson
    }])
    .select('order_id, order_number')
    .single();
  if (error) throw error;
  return data;
}

export async function getUserOrderWithProducts() {
  const localUser = authService.getCurrentUser?.();
  if (!localUser?.email) return [];
  
  const { data, error } = await supabase
    .from('order')
    .select('*')
    .eq('user_email', localUser.email)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
  
  return data || [];
}