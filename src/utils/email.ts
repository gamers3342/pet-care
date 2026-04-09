import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const CANCEL_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CANCEL_TEMPLATE_ID || TEMPLATE_ID;

let initialized = false;

function ensureInitialized(): void {
  if (PUBLIC_KEY && !initialized) {
    emailjs.init(PUBLIC_KEY);
    initialized = true;
  }
}

export interface OTPEMailParams {
  name?: string;
  email: string;
  otp: string;
  expiresAt: number; // epoch ms
}

export async function sendOTPEmail(params: OTPEMailParams): Promise<boolean> {
  try {
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      return false;
    }

    ensureInitialized();

    const expiryDate = new Date(params.expiresAt);
    const year = String(expiryDate.getFullYear());
    const expiry_time = expiryDate.toLocaleString();

    await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      name: params.name || 'Pet Lover',
      email: params.email,
      otp: params.otp,
      expiry_time,
      year,
    });
    return true;
  } catch (error) {
    console.error('EmailJS send error:', error);
    return false;
  }
}

export interface CancellationEmailParams {
  name?: string;
  email: string;
  appointmentDate: string;
  clinicName: string;
  reason?: string;
}

export async function sendCancellationEmail(params: CancellationEmailParams): Promise<boolean> {
  try {
    if (!SERVICE_ID || !CANCEL_TEMPLATE_ID || !PUBLIC_KEY) {
      console.log('EmailJS not configured, skipping cancellation email');
      return false;
    }

    ensureInitialized();

    await emailjs.send(SERVICE_ID, CANCEL_TEMPLATE_ID, {
      name: params.name || 'Pet Lover',
      email: params.email,
      appointment_date: params.appointmentDate,
      clinic_name: params.clinicName,
      reason: params.reason || 'All bookings are full. You are advised to book a new date.',
    });
    return true;
  } catch (error) {
    console.error('Cancellation email error:', error);
    return false;
  }
}



