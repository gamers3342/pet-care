// Mock backend for development - simulates real API responses
// This will be replaced with actual backend APIs in production

interface OTPData {
  email: string;
  otp: string;
  expiresAt: number;
  type: 'login' | 'register';
  name?: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  isVerified: boolean;
  createdAt: string;
}

import { sendOTPEmail } from './email';
import { supabase } from './supabaseClient';

class MockBackend {
  private otpStorage: Map<string, OTPData> = new Map();
  private users: Map<string, User> = new Map();

  // Generate random 6-digit OTP
  private generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Generate user ID
  private generateUserId(): string {
    return 'user_' + Math.random().toString(36).substr(2, 9);
  }

  // Attempt real email sending via EmailJS; in dev/mock mode, fall back to console and allow OTP flow
  private async deliverOTP(email: string, otp: string, name?: string, expiresAt?: number): Promise<boolean> {
    try {
      const sent = await sendOTPEmail({ email, otp, name, expiresAt: expiresAt || Date.now() + 15 * 60 * 1000 });
      return !!sent;
    } catch (error) {
      console.warn('sendOTPEmail threw an error:', error);
      return false;
    }
  }

  // Send OTP
  async sendOTP(email: string, type: 'login' | 'register', name?: string): Promise<any> {
    try {
      // For login, check if user exists in mock memory OR in Supabase `app_user` table
      if (type === 'login') {
        let userExists = Array.from(this.users.values()).some(user => user.email === email);

        if (!userExists) {
          try {
            const { data: appUser, error } = await supabase
              .from('app_user')
              .select('*')
              .eq('email', email)
              .maybeSingle();

            if (error) {
              console.warn('Supabase lookup failed in mockBackend.sendOTP:', error.message || error);
            }

            if (appUser) {
              // populate the in-memory users map so verify flow can find it
              const mockUser = {
                id: `sup_${appUser.user_id}`,
                email: appUser.email,
                name: appUser.name || 'Pet Lover',
                isVerified: true,
                createdAt: appUser.created_at || new Date().toISOString(),
              };
              this.users.set(mockUser.id, mockUser as any);
              userExists = true;
            }
          } catch (lookupErr) {
            console.warn('Error checking Supabase for user in mockBackend:', lookupErr);
          }
        }

        if (!userExists) {
          throw new Error('No account found with this email. Please register first.');
        }
      }

      // For register, check if user already exists
      if (type === 'register') {
        const userExistsLocal = Array.from(this.users.values()).some(user => user.email === email);
        let userExists = userExistsLocal;
        if (!userExistsLocal) {
          try {
            const { data: appUser, error } = await supabase
              .from('app_user')
              .select('user_id')
              .eq('email', email)
              .maybeSingle();

            if (!error && appUser) {
              userExists = true;
            }
          } catch (lookupErr) {
            console.warn('Supabase lookup failed during register check:', lookupErr);
          }
        }

        if (userExists) {
          throw new Error('Account already exists with this email. Please login instead.');
        }
      }

      const otp = this.generateOTP();
      const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

      // Store OTP
      this.otpStorage.set(email, {
        email,
        otp,
        expiresAt,
        type,
        name,
      });

      // Send email (EmailJS) — if delivery fails, allow dev/mock fallback
      const sent = await this.deliverOTP(email, otp, name, expiresAt);

      // Determine if we're allowed to expose the OTP in the response (dev or explicit mock mode)
      const USE_MOCK_BACKEND = (import.meta.env.VITE_USE_MOCK_BACKEND !== 'false');
      const DEV = !!import.meta.env.DEV;
      const allowInResponse = USE_MOCK_BACKEND || DEV;

      if (!sent) {
        // Log OTP to console to help local development/testing
        console.warn(`Email delivery not configured for ${email}. OTP (dev-only): ${otp}`);
        if (allowInResponse) {
          return {
            success: true,
            message: `OTP generated for ${email} (email not configured in dev). Use the OTP shown in dev logs or in this response.`,
            data: {
              email,
              expiresIn: 900,
              otp,
            },
          };
        }
        throw new Error('Email delivery is not configured. Please set EmailJS env vars.');
      }

      return {
        success: true,
        message: `OTP sent successfully to ${email}`,
        data: {
          email,
          expiresIn: 900, // 15 minutes in seconds
        },
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send OTP',
      };
    }
  }

  // Verify OTP
  async verifyOTP(email: string, otp: string, type: 'login' | 'register'): Promise<any> {
    try {
      const storedOTP = this.otpStorage.get(email);

      if (!storedOTP) {
        throw new Error('No OTP found for this email. Please request a new OTP.');
      }

      if (storedOTP.otp !== otp) {
        throw new Error('Invalid OTP. Please check and try again.');
      }

      if (Date.now() > storedOTP.expiresAt) {
        this.otpStorage.delete(email);
        throw new Error('OTP has expired. Please request a new OTP.');
      }

      if (storedOTP.type !== type) {
        throw new Error('OTP type mismatch. Please try again.');
      }

      // Remove used OTP
      this.otpStorage.delete(email);

      let user: User;

      if (type === 'register') {
        // Create new user
        user = {
          id: this.generateUserId(),
          email,
          name: storedOTP.name || 'Pet Lover',
          isVerified: true,
          createdAt: new Date().toISOString(),
        };
        this.users.set(user.id, user);
      } else {
        // Find existing user
        const existingUser = Array.from(this.users.values()).find(u => u.email === email);
        if (!existingUser) {
          throw new Error('User not found. Please register first.');
        }
        user = existingUser;
      }

      // Generate mock JWT token
      const token = `mock_jwt_${user.id}_${Date.now()}`;

      return {
        success: true,
        message: type === 'register' ? 'Registration successful!' : 'Login successful!',
        data: {
          user,
          token,
        },
        user,
        token,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'OTP verification failed',
      };
    }
  }

  // Get user by email
  getUserByEmail(email: string): User | null {
    return Array.from(this.users.values()).find(user => user.email === email) || null;
  }

  // Get all users (for debugging)
  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  // Clear expired OTPs (cleanup)
  clearExpiredOTPs(): void {
    const now = Date.now();
    for (const [email, otpData] of this.otpStorage.entries()) {
      if (now > otpData.expiresAt) {
        this.otpStorage.delete(email);
      }
    }
  }
}

export const mockBackend = new MockBackend();

// Auto-cleanup expired OTPs every minute
setInterval(() => {
  mockBackend.clearExpiredOTPs();
}, 60000);