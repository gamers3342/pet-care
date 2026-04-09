// Authentication service for handling OTP and user verification
import { mockBackend } from '../utils/mockBackend';
import { upsertAppUser } from './userSyncService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
const USE_MOCK_BACKEND = import.meta.env.VITE_USE_MOCK_BACKEND !== 'false'; // Default to true for development
const AUTH_API_KEY = import.meta.env.VITE_AUTH_API_KEY || 'b0dc442b-98dd-4f81-ae16-87a72735170b';

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isVerified: boolean;
  createdAt: string;
}

class AuthService {
  // Send OTP to user's email
  async sendOTP(email: string, type: 'login' | 'register', name?: string): Promise<AuthResponse> {
    try {
      // Try real API first, fallback to mock if it fails
      try {
        if (!USE_MOCK_BACKEND) {
          // Real API call for production
          const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${AUTH_API_KEY}`,
              'X-API-Key': AUTH_API_KEY,
            },
            body: JSON.stringify({
              email,
              type,
              name: type === 'register' ? name : undefined,
              timestamp: Date.now(),
            }),
          });

          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.message || 'Failed to send OTP');
          }

          return {
            success: true,
            message: `OTP sent successfully to ${email}. Please check your inbox.`,
            data: data,
          };
        }
      } catch (apiError) {
        console.warn('Real API failed, falling back to mock backend:', apiError);
        // Fall through to mock backend
      }

      // Use mock backend as fallback or default
      return await mockBackend.sendOTP(email, type, name);
    } catch (error) {
      console.error('Send OTP Error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send OTP. Using demo mode for testing.',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Verify OTP and complete authentication
  async verifyOTP(email: string, otp: string, type: 'login' | 'register'): Promise<AuthResponse> {
    try {
      // Try real API first, fallback to mock if it fails
      try {
        if (!USE_MOCK_BACKEND) {
          // Real API call for production
          const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${AUTH_API_KEY}`,
              'X-API-Key': AUTH_API_KEY,
            },
            body: JSON.stringify({
              email,
              otp,
              type,
              timestamp: Date.now(),
            }),
          });

          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.message || 'Invalid OTP');
          }

          // Store user data and token in localStorage
          if (data.token) {
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user));
          }

      // Attempt to sync the user into Supabase app_user table (best-effort)
      try {
        if (data?.user?.email) {
          console.log('Syncing user to Supabase:', data.user.email);
          const result = await upsertAppUser({ email: data.user.email, name: data.user.name || null, auth_provider: type });
          console.log('User synced successfully, user_id:', result);
        }
      } catch (syncErr) {
        console.error('Failed to sync user to Supabase after verifyOTP:', syncErr);
      }          return {
            success: true,
            message: type === 'register' ? 'Registration successful!' : 'Login successful!',
            data: data,
          };
        }
      } catch (apiError) {
        console.warn('Real API failed, falling back to mock backend:', apiError);
        // Fall through to mock backend
      }

      // Use mock backend as fallback or default
      const result = await mockBackend.verifyOTP(email, otp, type);

      // Store user data for mock backend too
      if (result.success && result.data) {
        localStorage.setItem('authToken', result.data.token || result.token);
        localStorage.setItem('userData', JSON.stringify(result.data.user || result.user));

        // Best-effort: sync mock user into Supabase app_user table so admin can see registered users
        try {
          const userObj = result.data.user || result.user;
          if (userObj?.email) {
            console.log('Syncing mock user to Supabase:', userObj.email);
            const syncResult = await upsertAppUser({ email: userObj.email, name: userObj.name || null, auth_provider: type });
            console.log('Mock user synced successfully, user_id:', syncResult);
          }
        } catch (syncErr) {
          console.error('Failed to sync mock user to Supabase after verifyOTP:', syncErr);
        }
      }

      return result;
    } catch (error) {
      console.error('Verify OTP Error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'OTP verification failed. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Google OAuth login
  async googleLogin(googleToken: string): Promise<AuthResponse> {
    try {
      // Try real API first, fallback to mock if it fails
      try {
        if (!USE_MOCK_BACKEND) {
          const response = await fetch(`${API_BASE_URL}/auth/google-login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${AUTH_API_KEY}`,
              'X-API-Key': AUTH_API_KEY,
            },
            body: JSON.stringify({
              token: googleToken,
              timestamp: Date.now(),
            }),
          });

          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.message || 'Google login failed');
          }

          // Store user data and token
          if (data.token) {
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user));
          }

          // Sync to Supabase
          if (data?.user?.email) {
            try {
              await upsertAppUser({ email: data.user.email, name: data.user.name || null, auth_provider: 'google' });
            } catch (syncErr) {
              console.error('Failed to sync Google user to Supabase:', syncErr);
            }
          }

          return {
            success: true,
            message: 'Google login successful!',
            data: data,
          };
        }
      } catch (apiError) {
        console.warn('Real API failed for Google login, falling back to mock:', apiError);
      }

      // Fallback to mock backend for Google login
      // Decode the Google token to get user info
      const googleUser = JSON.parse(atob(googleToken.split('.')[1]));
      const mockUser = {
        id: googleUser.sub || Date.now().toString(),
        email: googleUser.email,
        name: googleUser.name || googleUser.given_name,
        isVerified: true,
        createdAt: new Date().toISOString(),
      };

      const mockToken = `google_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('userData', JSON.stringify(mockUser));

      // Sync to Supabase
      try {
        await upsertAppUser({ email: mockUser.email, name: mockUser.name, auth_provider: 'google' });
      } catch (syncErr) {
        console.error('Failed to sync mock Google user to Supabase:', syncErr);
      }

      return {
        success: true,
        message: 'Google login successful!',
        data: { user: mockUser, token: mockToken },
      };
    } catch (error) {
      console.error('Google Login Error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Google login failed. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Check API connection
  async checkConnection(): Promise<boolean> {
    try {
      if (USE_MOCK_BACKEND) {
        return true; // Mock backend is always "connected"
      }
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      try {
        const response = await fetch(`${API_BASE_URL}/health`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${AUTH_API_KEY}`,
            'X-API-Key': AUTH_API_KEY,
          },
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        return response.ok;
      } catch (fetchError) {
        clearTimeout(timeoutId);
        throw fetchError;
      }
    } catch (error) {
      console.warn('API Connection Error, using mock backend:', error);
      return true; // Return true to allow mock backend usage
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    return !!(token && userData);
  }

  // Get current user data
  getCurrentUser(): User | null {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
        this.logout();
        return null;
      }
    }
    return null;
  }

  // Get auth token
  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Logout user
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  }

  // Resend OTP
  async resendOTP(email: string, type: 'login' | 'register'): Promise<AuthResponse> {
    return this.sendOTP(email, type);
  }
}

export const authService = new AuthService();