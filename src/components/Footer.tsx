import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, MapPin, Phone, Mail, Facebook, Instagram, Youtube, Twitter, Sparkles, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 text-8xl text-mint-300 floating-animation">🐾</div>
        <div className="absolute bottom-20 right-20 text-6xl text-peach-300 floating-animation" style={{ animationDelay: '3s' }}>💕</div>
        <div className="absolute top-1/2 left-1/2 text-4xl text-lavender-300 pulse-soft">✨</div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Enhanced Company Info */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-mint-400 via-peach-400 to-lavender-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <PawPrint className="w-8 h-8 text-white" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-peach-400 bounce-gentle" />
              </div>
              <div>
                <h1 className="text-2xl font-pacifico gradient-text">Pets & Care Hub</h1>
                <p className="text-sm text-mint-400 font-medium tracking-wide">Your Pet's Best Friend</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed font-quicksand text-lg">
              Revolutionizing pet care by lovingly connecting pet owners with trusted vets, 
              premium supplies, and caring communities all in one magical place. 🌟
            </p>
            
            {/* Enhanced Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="group w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl">
                <Facebook className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="group w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center hover:bg-gradient-to-br hover:from-pink-500 hover:to-pink-600 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl">
                <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="group w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center hover:bg-gradient-to-br hover:from-red-500 hover:to-red-600 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl">
                <Youtube className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="group w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-400 hover:to-blue-500 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl">
                <Twitter className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-8 font-poppins flex items-center space-x-2">
              <span>Quick Links</span>
              <div className="text-2xl">🔗</div>
            </h3>
            <ul className="space-y-4">
              {[
                { name: 'Home', emoji: '🏠', href: '/' },
                { name: 'About Us', emoji: '💫', href: '/#about' },
                { name: 'Services', emoji: '🎯', href: '/services' },
                { name: 'Shop', emoji: '🛍️', href: '/shop' },
                { name: 'Find Clinics', emoji: '🏥', href: '/clinics' },
                { name: 'Events', emoji: '🎉', href: '/events' },
                { name: 'Contact', emoji: '📞', href: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="group flex items-center space-x-3 text-gray-300 hover:text-mint-400 transition-all duration-300 font-quicksand">
                    <span className="text-lg group-hover:scale-125 transition-transform">{link.emoji}</span>
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-8 font-poppins flex items-center space-x-2">
              <span>Services</span>
              <div className="text-2xl">🎪</div>
            </h3>
            <ul className="space-y-4">
              {[
                { name: 'Veterinary Care', emoji: '🩺', href: '/services#veterinary-care' },
                { name: 'Pet Grooming', emoji: '✂️', href: '/services#grooming' },
                { name: 'Pet Supplies', emoji: '🛒', href: '/shop' },
                { name: 'Health Records', emoji: '📋', href: '/dashboard' },
                { name: 'Emergency Care', emoji: '🚨', href: '/services#emergency-care' },
                { name: 'Pet Insurance', emoji: '🛡️', href: 'https://www.hdfcergo.com/pet-insurance', external: true },
                { name: 'Community Forum', emoji: '💬', href: '/community' }
              ].map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    {...(service.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex items-center space-x-3 text-gray-300 hover:text-peach-400 transition-all duration-300 font-quicksand"
                  >
                    <span className="text-lg group-hover:scale-125 transition-transform">{service.emoji}</span>
                    <span className="group-hover:translate-x-1 transition-transform">{service.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-8 font-poppins flex items-center space-x-2">
              <span>Contact Info</span>
              <div className="text-2xl">📬</div>
            </h3>
            
            <div className="space-y-6">
              <div className="group flex items-start space-x-4 p-4 rounded-2xl hover:bg-gray-800/50 transition-colors">
                <MapPin className="w-6 h-6 text-mint-400 mt-1 group-hover:scale-110 transition-transform" />
                <div className="text-gray-300 font-quicksand">
                  <div className="font-semibold">123 Pet Care Ljp, Ahmedabad</div>
                  <div>Pet City, PC 12345</div>
                </div>
              </div>
              
              <div className="group flex items-center space-x-4 p-4 rounded-2xl hover:bg-gray-800/50 transition-colors">
                <Phone className="w-6 h-6 text-peach-400 group-hover:scale-110 transition-transform" />
                <div className="text-gray-300 font-quicksand font-semibold">+91 (1-888)-426-4435</div>
              </div>
              
              <div className="group flex items-center space-x-4 p-4 rounded-2xl hover:bg-gray-800/50 transition-colors">
                <Mail className="w-6 h-6 text-lavender-400 group-hover:scale-110 transition-transform" />
                <div className="text-gray-300 font-quicksand font-semibold">hello@petscarehub.com</div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="mt-8 p-6 bg-gradient-to-br from-coral-500/20 to-coral-600/20 rounded-2xl border border-coral-400/30 backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-2">
                <div className="text-2xl">🚨</div>
                <h4 className="font-bold text-coral-300 font-poppins">Emergency Line</h4>
              </div>
              <p className="text-3xl font-bold text-white font-poppins">+91 (1-888)-426-4435</p>
              <p className="text-sm text-coral-200 font-quicksand">Available 24/7 with love</p>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className="border-t border-gray-700 mt-16 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="text-gray-400 font-quicksand text-center md:text-left">
              <p className="flex items-center justify-center md:justify-start space-x-2">
                <span>© 2024 Pets & Care Made By Grp 04 LJP</span>
              </p>
            </div>
            
            <div className="flex space-x-8 text-sm">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-mint-400 transition-colors font-quicksand hover:scale-105 transform duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-mint-400 transition-colors font-quicksand hover:scale-105 transform duration-200">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="text-gray-400 hover:text-mint-400 transition-colors font-quicksand hover:scale-105 transform duration-200">
                Cookie Policy
              </Link>
              <Link to="/support" className="text-gray-400 hover:text-mint-400 transition-colors font-quicksand hover:scale-105 transform duration-200">
                Support
              </Link>
            </div>
          </div>

          {/* Love Message */}
          <div className="text-center mt-8 p-6 bg-gradient-to-r from-mint-500/20 to-peach-500/20 rounded-2xl border border-mint-400/30">
            <p className="text-lg font-pacifico text-mint-300">
              "Every pet deserves a lifetime of love, care, and happiness" 🐾💕
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;