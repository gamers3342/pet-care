import React from 'react';
import { ArrowRight, CheckCircle, Gift, Sparkles, Heart, Star } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-mint-500 via-peach-500 to-coral-500 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 text-8xl text-white floating-animation">🎉</div>
        <div className="absolute bottom-20 right-20 text-6xl text-white floating-animation" style={{ animationDelay: '2s' }}>🐾</div>
        <div className="absolute top-1/2 left-1/4 text-4xl text-white bounce-gentle">💕</div>
        <div className="absolute top-1/3 right-1/3 text-5xl text-white pulse-soft">⭐</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white">
          <div className="max-w-5xl mx-auto">
            {/* Icon with Animation */}
            <div className="flex justify-center mb-10">
              <div className="relative">
                <div className="w-28 h-28 glass-effect rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300">
                  <Gift className="w-14 h-14 text-white" />
                </div>
                <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-300 bounce-gentle" />
                <Heart className="absolute -bottom-2 -left-2 w-6 h-6 text-coral-300 pulse-soft" />
              </div>
            </div>
            
            <h2 className="text-6xl lg:text-7xl font-bold mb-8 font-poppins text-shadow leading-tight">
              Ready to Transform Your Pet's Care?
            </h2>
            
            <p className="text-2xl lg:text-3xl text-white/90 mb-16 leading-relaxed font-quicksand max-w-4xl mx-auto">
              Join thousands of happy pet parents who've revolutionized their pet care experience with love, technology, and community! 
              <br />
              <span className="font-pacifico text-yellow-200">Start your magical journey today! ✨</span>
            </p>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="group flex items-center justify-center space-x-3 text-white/90 hover:text-white transition-colors">
                <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold">Completely Free to Start</span>
              </div>
              <div className="group flex items-center justify-center space-x-3 text-white/90 hover:text-white transition-colors">
                <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold">No Credit Card Required</span>
              </div>
              <div className="group flex items-center justify-center space-x-3 text-white/90 hover:text-white transition-colors">
                <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold">Setup in Under 5 Minutes</span>
              </div>
            </div>

            {/* Main CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
              <button className="group relative flex items-center space-x-4 px-12 py-6 bg-white text-mint-700 rounded-3xl hover:bg-mint-50 transition-all duration-300 hover:scale-110 shadow-2xl hover:shadow-3xl font-bold text-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-mint-100 to-peach-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center space-x-4">
                  <span className="font-pacifico">Register Now – It's Free!</span>
                  <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
                </div>
                <Sparkles className="absolute top-2 right-2 w-5 h-5 text-peach-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              
              <button className="group flex items-center space-x-3 px-8 py-4 border-3 border-white/40 text-white rounded-2xl hover:bg-white/10 transition-all duration-300 font-semibold text-lg hover:scale-105">
                <span>Watch Demo</span>
                <div className="w-2 h-2 bg-white rounded-full group-hover:scale-150 transition-transform"></div>
              </button>
            </div>

            {/* Enhanced Stats */}
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="relative mb-4">
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">10K+</div>
                  <Heart className="absolute -top-2 -right-2 w-6 h-6 text-coral-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-white/80 font-medium text-lg">Happy Pets</div>
              </div>
              <div className="group">
                <div className="relative mb-4">
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">500+</div>
                  <Star className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-white/80 font-medium text-lg">Partner Clinics</div>
              </div>
              <div className="group">
                <div className="relative mb-4">
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">50K+</div>
                  <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-mint-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-white/80 font-medium text-lg">Products Available</div>
              </div>
              <div className="group">
                <div className="relative mb-4">
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">98%</div>
                  <Gift className="absolute -top-2 -right-2 w-6 h-6 text-lavender-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-white/80 font-medium text-lg">Satisfaction Rate</div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-16 flex justify-center">
              <div className="inline-flex items-center space-x-6 px-8 py-4 glass-effect rounded-2xl border border-white/30">
                <div className="flex items-center space-x-2">
                  <div className="text-2xl">🏆</div>
                  <span className="text-white font-medium">Award Winning</span>
                </div>
                <div className="w-px h-6 bg-white/30"></div>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl">🔒</div>
                  <span className="text-white font-medium">100% Secure</span>
                </div>
                <div className="w-px h-6 bg-white/30"></div>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl">💝</div>
                  <span className="text-white font-medium">Made with Love</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;