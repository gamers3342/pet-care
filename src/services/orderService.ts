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
  const localUser = authService.getCurrentUser();
  
  if (!localUser?.email) {
    throw new Error('Please login to place an order');
  }

  const userEmail = localUser.email;
  const userName = localUser.name || 'Customer';

  console.log('Order Service: Creating order for:', userEmail, 'total:', total);
  console.log('Order Service: Products:', lines);

  // First get or create the user in app_user to get user_id
  let userId: number | null = null;
  
  const { data: existingUser } = await supabase
    .from('app_user')
    .select('user_id')
    .eq('email', userEmail)
    .maybeSingle();
  
  if (existingUser?.user_id) {
    userId = existingUser.user_id as number;
  } else {
    // Create new user
    const { data: newUser } = await supabase
      .from('app_user')
      .insert([{ email: userEmail, name: userName, auth_provider: 'otp' }])
      .select('user_id')
      .single();
    
    if (newUser?.user_id) {
      userId = newUser.user_id as number;
    }
  }

  if (!userId) {
    throw new Error('Failed to get user ID');
  }

  const orderNumber = 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  
  // Get product names for order_name (comma separated if multiple)
  const orderName = lines.map(l => l.name).join(', ');

  console.log('Order Service: Inserting order with user_id:', userId, 'orderName:', orderName);

  try {
    const { data, error } = await supabase
      .from('order')
      .insert({
        order_number: orderNumber,
        order_name: orderName,
        user_id: userId,
        user_name: userName,
        total_amount: total,
        status: 'paid'
      })
      .select();
    
    console.log('Order Service: Insert response:', { data, error });
    
    if (error) {
      console.error('Order Service: Supabase error:', error);
      throw new Error(error.message || 'Database error: ' + JSON.stringify(error));
    }
    
    if (!data || data.length === 0) {
      throw new Error('Order was not created - no data returned');
    }
    
    console.log('Order Service: Order created successfully:', data[0]);
    return data[0];
  } catch (err: any) {
    console.error('Order Service: Catch block error:', err);
    throw new Error(err.message || 'Failed to place order');
  }
}

export async function getUserOrderWithProducts() {
  const localUser = authService.getCurrentUser();
  if (!localUser?.email) return [];
  
  const { data: userData } = await supabase
    .from('app_user')
    .select('user_id')
    .eq('email', localUser.email)
    .maybeSingle();
  
  if (!userData?.user_id) return [];
  
  const { data, error } = await supabase
    .from('order')
    .select('*')
    .eq('user_id', userData.user_id)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
  
  return data || [];
}