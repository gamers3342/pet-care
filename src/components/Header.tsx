import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, PawPrint, User, ShoppingCart, Sparkles, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { authService, AuthResponse } from '../services/authService';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);
  const [formData, setFormData] = useState({ email: '', otp: '', name: '' });
  const [googleNameProvided, setGoogleNameProvided] = useState(false);
  const [googleInitTried, setGoogleInitTried] = useState(false);
  const [googleReady, setGoogleReady] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const googleBtnRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const { getTotalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check authentication status on component mount
  useEffect(() => {
    setIsLoggedIn(authService.isAuthenticated());
    // Check if admin is logged in
    const adminToken = localStorage.getItem('admin_token');
    setIsAdminLoggedIn(!!adminToken);
  }, []);

  // Initialize Google Sign-In when modal opens
  useEffect(() => {
    if (!showAuthModal) return;

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      console.warn('Google Sign-In client ID not configured');
      return;
    }

    // Delay to ensure modal is fully rendered
    const timer = setTimeout(() => {
      // Check if Google script is loaded
      if (!(window as any).google) {
        console.warn('Google script not loaded yet');
        return;
      }

      // Try to initialize Google Sign-In
      try {
        // Check if already initialized
        if ((window as any).google?.accounts?.id) {
          (window as any).google.accounts.id.initialize({
            client_id: clientId,
            callback: async (response: any) => {
              setLoading(true);
              setError('');
              setSuccess('');
              try {
                // Decode Google token to get email
                const googleData = JSON.parse(atob(response.credential.split('.')[1]));
                const googleEmail = googleData.email;

                // Check if user already exists in database
                const { supabase } = await import('../utils/supabaseClient');
                const { data: existingUser } = await supabase
                  .from('app_user')
                  .select('user_id, name, email')
                  .eq('email', googleEmail)
                  .maybeSingle();

                if (existingUser) {
                  // User exists - go to login mode with OTP
                  setFormData({ 
                    email: googleEmail, 
                    otp: '', 
                    name: existingUser.name || ''
                  });
                  setGoogleNameProvided(true);
                  setAuthMode('login'); // Login mode for existing user
                  setOtpSent(false);
                  setSuccess('Welcome back! Please verify with OTP to login.');
                } else {
                  // New user - go to register mode with OTP
                  setFormData({ 
                    email: googleEmail, 
                    otp: '', 
                    name: ''
                  });
                  setGoogleNameProvided(true);
                  setAuthMode('register');
                  setOtpSent(false);
                  setSuccess('New user detected! Please enter your name and verify with OTP.');
                }
              } catch (err) {
                setError('Failed to process Google sign-in. Please try again.');
              } finally {
                setLoading(false);
              }
            },
            auto_select: false,
            cancel_on_tap_outside: true,
          });

          // Render the button
          if (googleBtnRef.current) {
            (window as any).google.accounts.id.renderButton(googleBtnRef.current, {
              theme: 'outline',
              size: 'large',
              shape: 'pill',
              text: 'continue_with',
              width: 350,
            });
            setGoogleReady(true);
          }
        }
      } catch (e) {
        console.error('Google init error:', e);
      }
    }, 1000); // Wait 1 second for modal to render and Google script to load

    return () => clearTimeout(timer);
  }, [showAuthModal]);

  // OTP Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);
  const handleInputChange = (e) => {
    setError('');
    setSuccess('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleSendOTP = async () => {
    // Bypass OTP for admin email
    if (formData.email && formData.email.trim().toLowerCase() === 'admin@123') {
      setShowAuthModal(false);
      window.location.href = '/admin/login';
      return;
    }
    if (!formData.email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (authMode === 'register' && !formData.name) {
      setError('Please enter your full name');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response: AuthResponse = await authService.sendOTP(
        formData.email, 
        authMode as 'login' | 'register',
        formData.name
      );

      if (response.success) {
        setOtpSent(true);
        setSuccess(response.message);
        setOtpTimer(300); // 5 minutes countdown
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to send OTP. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!formData.otp || formData.otp.length !== 6) {
      setError('Please enter the 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response: AuthResponse = await authService.verifyOTP(
        formData.email,
        formData.otp,
        authMode as 'login' | 'register'
      );

      if (response.success) {
        setIsLoggedIn(true);
        setShowAuthModal(false);
        setOtpSent(false);
        setFormData({ email: '', otp: '', name: '' });
        setSuccess(response.message);
        
        // Refresh page to update UI
        alert(`🎉 ${response.message}\n\nWelcome to Pets & Care Hub!`);
        window.location.reload();
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Google OAuth integration would go here
      // For now, show that it's not yet implemented
      setError('Google login is coming soon! Please use email/OTP authentication for now.');
      setLoading(false);
    } catch (error) {
      setError('Google login failed. Please try again.');
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (otpTimer > 0) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response: AuthResponse = await authService.resendOTP(
        formData.email,
        authMode as 'login' | 'register'
      );

      if (response.success) {
        setSuccess('OTP resent successfully!');
        setOtpTimer(300); // 5 minutes
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setIsLoggedIn(false);
    setIsAdminLoggedIn(false);
    window.location.reload();
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Shop', path: '/shop' },
    { name: 'Clinics', path: '/clinics' },
    { name: 'Community', path: '/community' },
    { name: 'Events', path: '/events' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-mint-100' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-mint-400 via-peach-400 to-lavender-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                <PawPrint className="w-8 h-8 text-white" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-peach-400 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-pacifico gradient-text">Pets & Care Hub</h1>
              <p className="text-xs text-mint-600 font-medium tracking-wide">Your Pet's Best Friend</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path}
                className={`relative transition-all duration-300 font-medium group ${
                  location.pathname === item.path 
                    ? 'text-mint-600' 
                    : 'text-gray-700 hover:text-mint-600'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-mint-400 to-peach-400 transition-all duration-300 ${
                  location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {isLoggedIn && (
              <Link to="/cart" className="relative flex items-center space-x-2 text-gray-700 hover:text-mint-600 transition-all duration-300 group">
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-coral-400 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {getTotalItems()}
                    </span>
                  )}
                </div>
                <span className="font-medium">Cart</span>
              </Link>
            )}
            
            {!isAdminLoggedIn && (
              <>
                {isLoggedIn ? (
                  <Link to="/dashboard" className="flex items-center space-x-2 px-6 py-3 border-2 border-mint-400 text-mint-600 rounded-2xl hover:bg-mint-50 transition-all duration-300 hover:scale-105 font-medium shadow-sm hover:shadow-md">
                    <User className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                ) : (
                  <button 
                    onClick={() => {
                      setAuthMode('login');
                      setShowAuthModal(true);
                      setError('');
                      setSuccess('');
                      setOtpSent(false);
                      setFormData({ email: '', otp: '', name: '' });
                    }}
                    className="flex items-center space-x-2 px-6 py-3 border-2 border-mint-400 text-mint-600 rounded-2xl hover:bg-mint-50 transition-all duration-300 hover:scale-105 font-medium shadow-sm hover:shadow-md"
                  >
                    <User className="w-4 h-4" />
                    <span>Login</span>
                  </button>
                )}
                
                <button 
                  onClick={() => {
                    if (isLoggedIn) {
                      handleLogout();
                    } else {
                      setAuthMode('register');
                      setShowAuthModal(true);
                    }
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-mint-400 to-peach-400 text-white rounded-2xl hover:from-mint-500 hover:to-peach-500 transition-all duration-300 hover:scale-105 font-semibold shadow-lg hover:shadow-xl"
                >
                  {isLoggedIn ? 'Logout' : 'Register Free'}
                </button>
              </>
            )}

            {isAdminLoggedIn && (
              <button 
                onClick={handleLogout}
                className="px-6 py-3 bg-gradient-to-r from-red-400 to-orange-400 text-white rounded-2xl hover:from-red-500 hover:to-orange-500 transition-all duration-300 hover:scale-105 font-semibold shadow-lg hover:shadow-xl"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-mint-50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-6 py-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-mint-100">
            <nav className="flex flex-col space-y-4 px-6">
              {navItems.map((item) => (
                <Link 
                  key={item.name}
                  to={item.path}
                  className="text-gray-700 hover:text-mint-600 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-3 pt-4 border-t border-mint-100">
                {!isAdminLoggedIn && (
                  <>
                    {isLoggedIn ? (
                      <Link to="/dashboard" className="text-left text-mint-600 font-medium py-2">Dashboard</Link>
                    ) : (
                      <button 
                        onClick={() => {
                          setAuthMode('login');
                          setShowAuthModal(true);
                          setIsMenuOpen(false);
                          setError('');
                          setSuccess('');
                          setOtpSent(false);
                          setFormData({ email: '', otp: '', name: '' });
                        }}
                        className="text-left text-mint-600 font-medium py-2"
                      >Login</button>
                    )}
                    <button 
                      onClick={() => {
                        if (isLoggedIn) {
                          handleLogout();
                        } else {
                          setAuthMode('register');
                          setShowAuthModal(true);
                          setIsMenuOpen(false);
                        }
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-mint-400 to-peach-400 text-white rounded-2xl font-semibold shadow-lg"
                    >
                      {isLoggedIn ? 'Logout' : 'Register Free'}
                    </button>
                  </>
                )}

                {isAdminLoggedIn && (
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-red-400 to-orange-400 text-white rounded-2xl font-semibold shadow-lg"
                  >
                    Logout
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 font-poppins">
                {authMode === 'login' ? 'Welcome Back!' : 'Join Pets & Care Hub'}
              </h3>
              <button 
                onClick={() => {
                  setShowAuthModal(false);
                  setOtpSent(false);
                  setError('');
                  setSuccess('');
                  setOtpTimer(0);
                  setFormData({ email: '', otp: '', name: '' });
                }}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                ×
              </button>
            </div>

            {/* Error and Success Messages */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-4">
                <p className="text-sm font-medium">{success}</p>
              </div>
            )}

            <div className="space-y-6">
              {/* Google Login */}
              <div className="space-y-3">
                {/* Info message like Vercel */}
                <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-sm text-blue-700">
                    Continue with Google for quick and secure sign-in powered by Google Identity Services
                  </p>
                </div>
                
                <div className="w-full flex flex-col items-center justify-center">
                  <div ref={googleBtnRef} className="min-h-[50px]"></div>
                  {!googleReady && (
                    <button
                      type="button"
                      onClick={() => {
                        const button = googleBtnRef.current?.querySelector('div[role="button"]') as HTMLElement;
                        if (button) {
                          button.click();
                        } else {
                          alert('Please wait for Google Sign-In to load or use email registration');
                        }
                      }}
                      className="flex items-center justify-center gap-3 w-full max-w-[350px] px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="text-gray-700 font-medium">Continue with Google</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-gray-500 text-sm">or</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Email/OTP Form */}
              <div className="space-y-4">
                {/* Name input - always show for register mode when OTP not sent */}
                {authMode === 'register' && !otpSent && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name {googleNameProvided && <span className="text-xs text-mint-600">(Please enter your name)</span>}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder={googleNameProvided ? "Enter your name" : "Enter your full name"}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-400"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email"
                      disabled={otpSent}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-400 disabled:bg-gray-50"
                    />
                  </div>
                </div>

                {otpSent && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
                    <input
                      type="text"
                      name="otp"
                      value={formData.otp}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-400 text-center text-2xl tracking-widest"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm text-gray-600">
                        OTP sent to {formData.email}
                      </p>
                      <button
                        type="button"
                        onClick={handleResendOTP}
                        disabled={otpTimer > 0 || loading}
                        className="text-sm text-mint-600 hover:text-mint-700 font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
                        {otpTimer > 0 ? `Resend in ${Math.floor(otpTimer / 60)}:${(otpTimer % 60).toString().padStart(2, '0')}` : 'Resend OTP'}
                      </button>
                    </div>
                  </div>
                )}

                {!otpSent ? (
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    disabled={loading || !formData.email || (authMode === 'register' && !formData.name)}
                    className="w-full py-3 bg-gradient-to-r from-mint-400 to-peach-400 text-white rounded-xl hover:from-mint-500 hover:to-peach-500 transition-all duration-300 font-semibold disabled:opacity-50"
                  >
                    {loading ? 'Sending OTP...' : `📧 Send OTP to ${formData.email || 'your email'}`}
                  </button>
                ) : (
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={handleVerifyOTP}
                      disabled={loading || !formData.otp}
                      className="w-full py-3 bg-gradient-to-r from-mint-400 to-peach-400 text-white rounded-xl hover:from-mint-500 hover:to-peach-500 transition-all duration-300 font-semibold disabled:opacity-50"
                    >
                      {loading ? 'Verifying...' : `🔐 Verify & ${authMode === 'register' ? 'Register' : 'Login'}`}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false);
                        setOtpTimer(0);
                        setError('');
                        setSuccess('');
                        setFormData({ ...formData, otp: '' });
                      }}
                      className="w-full py-2 text-mint-600 hover:text-mint-700 transition-colors font-medium"
                    >
                      ← Change Email Address
                    </button>
                  </div>
                )}
              </div>

              {/* Toggle Auth Mode */}
              <div className="text-center">
                <button
                  onClick={() => {
                    setAuthMode(authMode === 'login' ? 'register' : 'login');
                    setOtpSent(false);
                    setError('');
                    setSuccess('');
                    setOtpTimer(0);
                    setFormData({ email: '', otp: '', name: '' });
                  }}
                  className="text-mint-600 hover:text-mint-700 transition-colors font-medium"
                >
                  {authMode === 'login' 
                    ? "Don't have an account? Register here" 
                    : "Already have an account? Login here"
                  }
                </button>
              </div>

              {/* Security Notice */}
              <div className="bg-mint-50 p-4 rounded-xl border border-mint-200">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-5 h-5 bg-mint-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">🔒</span>
                  </div>
                  <span className="font-semibold text-mint-700">Secure Access</span>
                </div>
                <p className="text-sm text-mint-600">
                  Real OTP verification via email ensures only verified pet parents can access our premium services. 
                  Your data is protected with enterprise-grade security.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;