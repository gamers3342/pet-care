import React from 'react';
import { Target, Eye, Zap, Users, Shield, Globe, Sparkles, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'Making pet care smarter, easier, and more loving for every pet parent.',
      color: 'from-mint-400 to-mint-500',
      emoji: '🎯'
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: 'A world where every pet receives the best possible care through technology.',
      color: 'from-peach-400 to-coral-400',
      emoji: '👁️'
    },
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Verified professionals and secure transactions for complete peace of mind.',
      color: 'from-lavender-400 to-lavender-500',
      emoji: '🛡️'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'AI Health Monitoring',
      description: 'Smart health insights and predictive care recommendations powered by advanced AI',
      color: 'from-mint-400 to-mint-500',
      emoji: '🤖'
    },
    {
      icon: Users,
      title: 'Pet Owner Communities',
      description: 'Connect with local pet parents, share experiences, and build lasting friendships',
      color: 'from-coral-400 to-coral-500',
      emoji: '👥'
    },
    {
      icon: Globe,
      title: 'Emergency SOS',
      description: 'Instant access to emergency vet services with GPS location sharing',
      color: 'from-peach-400 to-peach-500',
      emoji: '🚨'
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-white via-lavender-25 to-mint-25 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 text-8xl text-peach-200 floating-animation">🐾</div>
        <div className="absolute bottom-40 left-10 text-6xl text-mint-200 floating-animation" style={{ animationDelay: '2s' }}>💕</div>
        <div className="absolute top-1/2 right-1/4 text-4xl text-lavender-200 bounce-gentle">✨</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          {/* Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-lavender-100 to-mint-100 rounded-full border border-lavender-200">
                <Sparkles className="w-5 h-5 text-lavender-600" />
                <span className="text-lavender-700 font-semibold">About Our Journey</span>
              </div>
              
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight font-poppins">
                Revolutionizing Pet Care,{' '}
                <span className="gradient-text">One Paw</span> at a Time
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed font-quicksand">
                Pets & Care Hub was born from a simple observation: pet care was too fragmented and overwhelming. 
                Vet appointments scattered here, supplies ordered there, grooming booked somewhere else - 
                it was chaos for pet parents who just wanted the absolute best for their furry family members! 🐕💕
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed font-quicksand">
                We've lovingly united veterinarians, premium pet supply stores, professional grooming services, 
                and passionate pet owners in one beautiful, comprehensive platform. Now pet care flows as 
                seamlessly as the unconditional love you share with your precious companions. ✨
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <div key={index} className="group text-center p-6 rounded-2xl hover:bg-white/50 transition-all duration-300 hover:scale-105">
                  <div className="relative mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 text-2xl">{value.emoji}</div>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-3 text-lg font-poppins">{value.title}</h3>
                  <p className="text-gray-600 font-quicksand leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Image */}
          <div className="relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
              <img
                src="https://images.pexels.com/photos/4588047/pexels-photo-4588047.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Veterinarian with pet"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mint-900/20 via-transparent to-peach-500/10"></div>
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-10 -left-10 glass-effect rounded-3xl p-8 shadow-2xl border border-white/30 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">98%</div>
                <div className="text-gray-700 font-medium">Customer Satisfaction</div>
                <div className="flex justify-center mt-2">
                  <Heart className="w-5 h-5 text-coral-400 pulse-soft" />
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-10 -right-6 w-24 h-24 bg-peach-200 rounded-full opacity-60 floating-animation"></div>
            <div className="absolute bottom-20 -right-4 w-16 h-16 bg-mint-200 rounded-full opacity-50 floating-animation" style={{ animationDelay: '3s' }}></div>
          </div>
        </div>

        {/* Future Vision Section */}
        <div className="bg-gradient-to-br from-mint-100 via-white to-peach-100 rounded-3xl p-16 shadow-xl border border-mint-200 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 text-6xl text-mint-300">🚀</div>
            <div className="absolute bottom-10 right-10 text-4xl text-peach-300">🌟</div>
            <div className="absolute top-1/2 left-1/4 text-3xl text-lavender-300">💡</div>
          </div>

          <div className="relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-mint-200 to-peach-200 rounded-full border border-mint-300 mb-6">
                <Sparkles className="w-5 h-5 text-mint-700" />
                <span className="text-mint-800 font-semibold">Coming Soon</span>
              </div>
              
              <h3 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 font-poppins">
                The Future of{' '}
                <span className="gradient-text">Pet Care</span>
              </h3>
              
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-quicksand">
                We're constantly innovating to bring you magical, cutting-edge features that will 
                completely transform how you care for your beloved pets. Get ready for something amazing! 🎉
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {features.map((feature, index) => (
                <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 relative overflow-hidden">
                  {/* Hover Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Emoji Decoration */}
                  <div className="absolute top-4 right-4 text-3xl opacity-30 group-hover:opacity-60 transition-all duration-300 group-hover:scale-110">
                    {feature.emoji}
                  </div>

                  <div className="relative z-10">
                    <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                      <feature.icon className="w-10 h-10 text-white" />
                    </div>
                    
                    <h4 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors font-poppins">
                      {feature.title}
                    </h4>
                    
                    <p className="text-gray-600 leading-relaxed font-quicksand group-hover:text-gray-700 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <button className="group inline-flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-mint-400 via-peach-400 to-coral-400 text-white rounded-2xl hover:from-mint-500 hover:via-peach-500 hover:to-coral-500 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl font-bold text-lg">
                <span>Join the Future of Pet Care</span>
                <Sparkles className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;