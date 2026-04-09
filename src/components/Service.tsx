import React from 'react';
import { Stethoscope, ShoppingBag, Scissors, Users, Clock, MapPin, Phone, Award, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: Stethoscope,
      title: 'Vet Clinics',
      description: 'Comprehensive veterinary care from certified professionals who truly care',
      features: [
        'Book check-ups and consultations',
        'Maintain vaccination history',
        'Upload and access health records',
        'Emergency vet support'
      ],
      image: 'https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-mint-400 to-mint-500',
      bgColor: 'from-mint-50 to-mint-100',
      emoji: '🩺'
    },
    {
      icon: ShoppingBag,
      title: 'Pet Supplies Shop',
      description: 'Premium pet products delivered with love to your doorstep',
      features: [
        'Wide range of premium pet food brands',
        'Toys, accessories, and medicines',
        'Secure online ordering experience',
        'Lightning-fast, reliable delivery'
      ],
      image: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-peach-400 to-coral-400',
      bgColor: 'from-peach-50 to-coral-50',
      emoji: '🛒'
    },
    {
      icon: Scissors,
      title: 'Grooming Services',
      description: 'Professional grooming to keep your pets looking absolutely fabulous',
      features: [
        'Professional grooming sessions',
        'Luxurious bath and nail trimming',
        'Automatic appointment reminders',
        'Specialized breed care expertise'
      ],
      image: 'https://images.pexels.com/photos/6816861/pexels-photo-6816861.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-lavender-400 to-lavender-500',
      bgColor: 'from-lavender-50 to-lavender-100',
      emoji: '✂️'
    },
    {
      icon: Users,
      title: 'Community Hub',
      description: 'Connect with fellow pet owners and share beautiful experiences',
      features: [
        'Expert pet care tips and advice',
        'Heartwarming adoption stories',
        'Local pet events and meetups',
        'Live expert Q&A sessions'
      ],
      image: 'https://images.pexels.com/photos/4587971/pexels-photo-4587971.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-coral-400 to-coral-500',
      bgColor: 'from-coral-50 to-coral-100',
      emoji: '👥'
    }
  ];

  const stats = [
    { icon: Clock, number: '24/7', label: 'Emergency Support', emoji: '⏰', color: 'text-mint-600' },
    { icon: MapPin, number: '500+', label: 'Partner Clinics', emoji: '📍', color: 'text-peach-600' },
    { icon: Phone, number: '15min', label: 'Response Time', emoji: '📞', color: 'text-lavender-600' },
    { icon: Award, number: '98%', label: 'Satisfaction Rate', emoji: '🏆', color: 'text-coral-600' }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-lavender-25 via-white to-mint-25 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 text-6xl opacity-20 text-peach-300 floating-animation">🌟</div>
      <div className="absolute bottom-40 left-10 text-4xl opacity-25 text-mint-300 bounce-gentle">💝</div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-mint-100 to-lavender-100 rounded-full border border-mint-200 mb-6">
            <Heart className="w-5 h-5 text-mint-600 pulse-soft" />
            <span className="text-mint-700 font-semibold">Our Amazing Services</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6 font-poppins">
            Comprehensive Pet Care{' '}
            <span className="gradient-text">Services</span>
          </h2>
          
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-quicksand">
            From routine check-ups to emergency care, we've lovingly crafted everything your pet needs 
            under one beautiful, caring roof. 🏠💕
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          {services.map((service, index) => (
            <div key={index} className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-mint-100 relative">
              {/* Service Image */}
              <div className="relative h-80">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-80 group-hover:opacity-70 transition-opacity duration-300`}></div>
                
                {/* Service Icon */}
                <div className="absolute top-8 left-8">
                  <div className="w-20 h-20 glass-effect rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-10 h-10 text-white" />
                  </div>
                </div>
                
                {/* Emoji Decoration */}
                <div className="absolute top-8 right-8 text-5xl opacity-60 group-hover:opacity-80 transition-opacity duration-300 group-hover:scale-110 transform">
                  {service.emoji}
                </div>
                
                {/* Service Title */}
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-3xl font-bold mb-3 font-poppins text-shadow">{service.title}</h3>
                  <p className="text-white/90 text-lg font-quicksand">{service.description}</p>
                </div>
              </div>
              
              {/* Service Details */}
              <div className={`p-8 bg-gradient-to-br ${service.bgColor} relative overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute top-4 right-4 text-6xl opacity-10 text-gray-400">{service.emoji}</div>
                
                <div className="relative z-10">
                  <ul className="space-y-4 mb-8">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center space-x-3 group/item">
                        <div className="w-3 h-3 bg-gradient-to-r from-mint-400 to-peach-400 rounded-full group-hover/item:scale-125 transition-transform"></div>
                        <span className="text-gray-700 font-medium font-quicksand group-hover/item:text-gray-800 transition-colors">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-4 bg-gradient-to-r ${service.color} text-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 font-bold text-lg shadow-lg`}>
                    {service.title === 'Vet Clinics' ? (
                      <Link to="/clinics" className="flex items-center justify-center space-x-2">
                        <span>Explore {service.title}</span>
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    ) : service.title === 'Pet Supplies Shop' ? (
                      <Link to="/shop" className="flex items-center justify-center space-x-2">
                        <span>Explore {service.title}</span>
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    ) : service.title === 'Grooming Services' ? (
                      <Link to="/grooming" className="flex items-center justify-center space-x-2">
                        <span>Explore {service.title}</span>
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    ) : service.title === 'Community Hub' ? (
                      <Link to="/community" className="flex items-center justify-center space-x-2">
                        <span>Explore {service.title}</span>
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    ) : (
                      <Link to="/services" className="flex items-center justify-center space-x-2">
                        <span>Explore {service.title}</span>
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-3xl p-16 shadow-2xl border border-mint-100 relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-8xl text-mint-300">🎯</div>
            <div className="absolute bottom-10 right-10 text-6xl text-peach-300">📊</div>
          </div>

          <div className="relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-mint-100 to-peach-100 rounded-full border border-mint-200 mb-6">
                <Sparkles className="w-5 h-5 text-mint-600" />
                <span className="text-mint-700 font-semibold">Why Pet Parents Choose Us</span>
              </div>
              
              <h3 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 font-poppins">
                Trusted by Thousands of{' '}
                <span className="gradient-text">Pet Families</span>
              </h3>
              
              <p className="text-xl text-gray-600 font-quicksand max-w-3xl mx-auto">
                Our commitment to excellence shows in every interaction, every service, and every happy tail wag! 🐕✨
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-10">
              {stats.map((stat, index) => (
                <div key={index} className="group text-center p-6 rounded-2xl hover:bg-gradient-to-br hover:from-mint-50 hover:to-peach-50 transition-all duration-300 hover:scale-105">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-mint-100 to-peach-100 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl border border-mint-200">
                      <stat.icon className={`w-10 h-10 ${stat.color} group-hover:scale-110 transition-transform`} />
                    </div>
                    <div className="absolute -top-2 -right-2 text-3xl group-hover:scale-125 transition-transform">{stat.emoji}</div>
                  </div>
                  
                  <div className="text-4xl font-bold gradient-text mb-3 group-hover:scale-110 transition-transform font-poppins">
                    {stat.number}
                  </div>
                  
                  <div className="text-gray-600 font-medium text-lg font-quicksand group-hover:text-gray-700 transition-colors">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;