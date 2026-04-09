import React from 'react';
import { Stethoscope, ShoppingCart, Scissors, Calendar, Heart, Users, MapPin, Bell } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Stethoscope,
      title: 'Vet Appointments & Health Records',
      description: 'Book appointments with certified vets and maintain digital health records for your pets.',
      color: 'from-mint-400 to-mint-500',
      bgColor: 'bg-mint-50',
      iconColor: 'text-mint-600',
      emoji: '🩺'
    },
    {
      icon: ShoppingCart,
      title: 'Pet Supplies & Shop',
      description: 'Browse and order premium pet food, accessories, toys, and medicines online.',
      color: 'from-peach-400 to-coral-400',
      bgColor: 'bg-peach-50',
      iconColor: 'text-peach-600',
      emoji: '🛒'
    },
    {
      icon: Scissors,
      title: 'Grooming & Care Services',
      description: 'Schedule professional grooming sessions with automatic reminders.',
      color: 'from-lavender-400 to-lavender-500',
      bgColor: 'bg-lavender-50',
      iconColor: 'text-lavender-600',
      emoji: '✂️'
    },
    {
      icon: Calendar,
      title: 'Vaccination & Checkup Reminders',
      description: 'Never miss important vaccinations or health checkups with smart notifications.',
      color: 'from-mint-400 to-mint-500',
      bgColor: 'bg-mint-50',
      iconColor: 'text-mint-600',
      emoji: '📅'
    },
    {
      icon: Users,
      title: 'Pet Owner Community',
      description: 'Connect with other pet owners, share experiences, and get expert advice.',
      color: 'from-coral-400 to-coral-500',
      bgColor: 'bg-coral-50',
      iconColor: 'text-coral-600',
      emoji: '👥'
    },
    {
      icon: MapPin,
      title: 'Nearby Services Locator',
      description: 'Find the nearest vet clinics, pet shops, and grooming centers on interactive maps.',
      color: 'from-peach-400 to-peach-500',
      bgColor: 'bg-peach-50',
      iconColor: 'text-peach-600',
      emoji: '📍'
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Get timely alerts for appointments, deliveries, and important pet care reminders.',
      color: 'from-lavender-400 to-lavender-500',
      bgColor: 'bg-lavender-50',
      iconColor: 'text-lavender-600',
      emoji: '🔔'
    },
    {
      icon: Heart,
      title: 'Emergency Support',
      description: '24/7 emergency vet support and quick access to urgent care services.',
      color: 'from-coral-400 to-coral-500',
      bgColor: 'bg-coral-50',
      iconColor: 'text-coral-600',
      emoji: '❤️'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-white via-mint-25 to-peach-25 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-20 left-1/4 text-8xl text-mint-200">🐾</div>
        <div className="absolute bottom-20 right-1/4 text-6xl text-peach-200">🐕</div>
        <div className="absolute top-1/2 left-10 text-4xl text-lavender-200">🐱</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-mint-100 to-peach-100 rounded-full border border-mint-200 mb-6">
            <Heart className="w-5 h-5 text-coral-500" />
            <span className="text-mint-700 font-semibold">Everything Your Pet Needs</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6 font-poppins">
            Comprehensive Pet Care{' '}
            <span className="gradient-text">Solutions</span>
          </h2>
          
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-quicksand">
            Designed to keep your furry friends happy, healthy, and well-cared for with love and expertise. 🐾
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group ${feature.bgColor} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer border border-white/50 relative overflow-hidden`}
            >
              {/* Background Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
              
              {/* Emoji Decoration */}
              <div className="absolute top-4 right-4 text-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 group-hover:scale-110 transform">
                {feature.emoji}
              </div>
              
              <div className="relative z-10">
                <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors font-poppins">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed font-quicksand group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-4 px-8 py-4 bg-white rounded-2xl shadow-xl border border-mint-100">
            <span className="text-gray-600 font-medium">Ready to get started?</span>
            <button className="px-6 py-3 bg-gradient-to-r from-mint-400 to-peach-400 text-white rounded-xl hover:from-mint-500 hover:to-peach-500 transition-all duration-300 hover:scale-105 font-semibold shadow-lg">
              Explore All Features
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;