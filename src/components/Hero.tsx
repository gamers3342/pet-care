import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ShoppingBag, Users, ArrowRight, Sparkles, Heart, Star, Play, X, CheckCircle, UserPlus, Clipboard, Package, Settings, MessageSquare, Mail, Clock } from 'lucide-react';

const Hero = () => {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-mint-50 via-white to-peach-50 overflow-hidden">
      <div className="absolute top-20 left-10 w-20 h-20 bg-lavender-200 rounded-full opacity-60 floating-animation"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-peach-200 rounded-full opacity-50 floating-animation" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-mint-200 rounded-full opacity-70 floating-animation" style={{ animationDelay: '4s' }}></div>
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-mint-100 to-peach-100 rounded-full border border-mint-200">
                <Sparkles className="w-4 h-4 text-mint-600" />
                <span className="text-sm font-medium text-mint-700">Trusted by 10,000+ Pet Parents</span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold text-gray-800 leading-tight">
                One Hub for Pet{' '}
                <span className="relative">
                  <span className="gradient-text">Health</span>
                  <Heart className="absolute -top-2 -right-8 w-8 h-8 text-coral-400 bounce-gentle" />
                </span>
                ,{' '}
                <span className="text-peach-500">Grooming</span>, and{' '}
                <span className="text-mint-600">Supplies</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed font-quicksand">
                Connect with trusted veterinarians, discover premium pet supplies, and join a caring community. 
                Everything your furry friend needs, beautifully organized in one magical place. ✨
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/clinics" className="group flex items-center justify-center space-x-3 px-8 py-5 bg-gradient-to-r from-mint-400 to-mint-500 text-white rounded-2xl hover:from-mint-500 hover:to-mint-600 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl font-semibold text-lg">
                <Calendar className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                <span>Book Appointment</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link to="/shop" className="group flex items-center justify-center space-x-3 px-8 py-5 bg-gradient-to-r from-peach-400 to-coral-400 text-white rounded-2xl hover:from-peach-500 hover:to-coral-500 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl font-semibold text-lg">
                <ShoppingBag className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button onClick={() => setShowDemo(true)} className="group flex items-center justify-center space-x-3 px-8 py-5 border-3 border-lavender-400 text-lavender-600 rounded-2xl hover:bg-lavender-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-lg">
                <Play className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                <span>Watch Demo</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center group cursor-pointer">
                <div className="relative mb-3">
                  <div className="text-4xl font-bold gradient-text group-hover:scale-110 transition-transform">500+</div>
                  <Star className="absolute -top-1 -right-2 w-4 h-4 text-peach-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-gray-600 font-medium">Trusted Vets</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="relative mb-3">
                  <div className="text-4xl font-bold gradient-text group-hover:scale-110 transition-transform">10K+</div>
                  <Heart className="absolute -top-1 -right-2 w-4 h-4 text-coral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-gray-600 font-medium">Happy Pets</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="relative mb-3">
                  <div className="text-4xl font-bold gradient-text group-hover:scale-110 transition-transform">50K+</div>
                  <Sparkles className="absolute -top-1 -right-2 w-4 h-4 text-mint-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-gray-600 font-medium">Products</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
              <img
                src="https://images.pexels.com/photos/4587998/pexels-photo-4587998.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Happy pet with owner at vet clinic"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mint-900/30 via-transparent to-peach-500/20"></div>
            </div>
            
            <div className="absolute top-8 -right-4 glass-effect rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/30">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-mint-400 to-mint-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-800">Appointment</div>
                  <div className="text-green-600 font-medium flex items-center space-x-1">
                    <span>Confirmed</span>
                    <Heart className="w-3 h-3 text-coral-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 glass-effect rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border border-white/30">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-peach-400 to-coral-400 rounded-2xl flex items-center justify-center shadow-lg">
                  <ShoppingBag className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-lg">Order Status</div>
                  <div className="text-green-600 font-medium flex items-center space-x-1">
                    <span>Delivered</span>
                    <Heart className="w-3 h-3 text-coral-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-1/4 -left-8 text-6xl opacity-20 text-mint-300 rotate-12">🐾</div>
            <div className="absolute bottom-1/4 -right-8 text-4xl opacity-30 text-peach-300 -rotate-12">🐾</div>
          </div>
        </div>
      </div>

      {showDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowDemo(false)}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-lavender-500 to-mint-500 p-6 sticky top-0 rounded-t-3xl flex items-center justify-between z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Platform Demo</h2>
                  <p className="text-white/80">Complete tour of Pets & Care Hub</p>
                </div>
              </div>
              <button onClick={() => setShowDemo(false)} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-6 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-mint-500 rounded-lg flex items-center justify-center text-white text-sm">1</span>
                  User Journey Walkthrough
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-r from-mint-50 to-mint-100 rounded-xl border border-mint-200">
                    <div className="flex items-center gap-3 mb-2">
                      <UserPlus className="w-5 h-5 text-mint-600" />
                      <span className="font-semibold text-gray-800">Sign Up / Login</span>
                    </div>
                    <p className="text-sm text-gray-600">Click Login in header → Enter email → Verify with OTP → Access dashboard</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-mint-50 to-mint-100 rounded-xl border border-mint-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-5 h-5 text-mint-600" />
                      <span className="font-semibold text-gray-800">Book Vet Appointment</span>
                    </div>
                    <p className="text-sm text-gray-600">Go to Clinics → Select clinic → Choose date/time → Confirm booking</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-mint-50 to-mint-100 rounded-xl border border-mint-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Clipboard className="w-5 h-5 text-mint-600" />
                      <span className="font-semibold text-gray-800">Book Grooming</span>
                    </div>
                    <p className="text-sm text-gray-600">Visit Grooming page → Select service provider → Schedule appointment</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-mint-50 to-mint-100 rounded-xl border border-mint-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Package className="w-5 h-5 text-mint-600" />
                      <span className="font-semibold text-gray-800">Order Supplies</span>
                    </div>
                    <p className="text-sm text-gray-600">Browse Shop → Add items to cart → Checkout → Track order</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-peach-500 rounded-lg flex items-center justify-center text-white text-sm">2</span>
                  Key Features Showcase
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-r from-peach-50 to-peach-100 rounded-xl border border-peach-200">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle className="w-5 h-5 text-peach-600" />
                      <span className="font-semibold text-gray-800">Dashboard Overview</span>
                    </div>
                    <p className="text-sm text-gray-600">View appointments, orders, events, and posts in one unified dashboard</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-peach-50 to-peach-100 rounded-xl border border-peach-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-5 h-5 text-peach-600" />
                      <span className="font-semibold text-gray-800">Manage Appointments</span>
                    </div>
                    <p className="text-sm text-gray-600">Click any appointment to view details, cancel, or delete scheduled visits</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-peach-50 to-peach-100 rounded-xl border border-peach-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Package className="w-5 h-5 text-peach-600" />
                      <span className="font-semibold text-gray-800">Track Orders</span>
                    </div>
                    <p className="text-sm text-gray-600">Go to Track Order tab → View order status → Cancel if needed</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-peach-50 to-peach-100 rounded-xl border border-peach-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Settings className="w-5 h-5 text-peach-600" />
                      <span className="font-semibold text-gray-800">Update Profile</span>
                    </div>
                    <p className="text-sm text-gray-600">Click Settings → Change name (direct) or email (OTP verification)</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-peach-50 to-peach-100 rounded-xl border border-peach-200 md:col-span-2">
                    <div className="flex items-center gap-3 mb-2">
                      <MessageSquare className="w-5 h-5 text-peach-600" />
                      <span className="font-semibold text-gray-800">Community Posts</span>
                    </div>
                    <p className="text-sm text-gray-600">Visit Community page → Create posts → View My Posts tab to see your posts</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-lavender-500 rounded-lg flex items-center justify-center text-white text-sm">3</span>
                  Interactive Features
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-lavender-50 to-lavender-100 rounded-xl border border-lavender-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Mail className="w-5 h-5 text-lavender-600" />
                      <span className="font-semibold text-gray-800">OTP Verification System</span>
                    </div>
                    <p className="text-sm text-gray-600">Enter email → Receive 6-digit OTP → Verify to complete registration/login</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-lavender-50 to-lavender-100 rounded-xl border border-lavender-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Star className="w-5 h-5 text-lavender-600" />
                      <span className="font-semibold text-gray-800">Google Sign-In</span>
                    </div>
                    <p className="text-sm text-gray-600">Click Google button → Authenticate with Google → Get instant access</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white text-sm">4</span>
                  Quick Platform Overview
                </h3>
                <div className="bg-gradient-to-r from-sky-50 to-mint-50 rounded-xl p-6 border border-sky-200">
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-3xl mb-2">🏥</div>
                      <div className="font-semibold text-gray-800">Clinics</div>
                      <p className="text-sm text-gray-600">Find & book vet visits</p>
                    </div>
                    <div>
                      <div className="text-3xl mb-2">✂️</div>
                      <div className="font-semibold text-gray-800">Grooming</div>
                      <p className="text-sm text-gray-600">Schedule pet grooming</p>
                    </div>
                    <div>
                      <div className="text-3xl mb-2">🛒</div>
                      <div className="font-semibold text-gray-800">Shop</div>
                      <p className="text-sm text-gray-600">Premium pet supplies</p>
                    </div>
                    <div>
                      <div className="text-3xl mb-2">🎉</div>
                      <div className="font-semibold text-gray-800">Events</div>
                      <p className="text-sm text-gray-600">Join pet events</p>
                    </div>
                    <div>
                      <div className="text-3xl mb-2">💬</div>
                      <div className="font-semibold text-gray-800">Community</div>
                      <p className="text-sm text-gray-600">Connect with pet lovers</p>
                    </div>
                    <div>
                      <div className="text-3xl mb-2">🚨</div>
                      <div className="font-semibold text-gray-800">Emergency</div>
                      <p className="text-sm text-gray-600">24/7 emergency hotline</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center pt-4">
                <Link to="/clinics" onClick={() => setShowDemo(false)} className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-mint-500 to-mint-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  <span>Start Exploring Now</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;