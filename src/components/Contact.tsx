import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Youtube, Navigation } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const getDirectionsUrl = (address: string) => {
    const encodedAddress = encodeURIComponent(address + ', Ahmedabad, India');
    return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  };

  const locations = [
    {
      type: 'Headquarters',
      name: 'Pets & Care Hub Main Office',
      address: '123 Pet Care Blvd, Suite 100',
      city: 'Pet City, PC 12345',
      phone: '+1 (555) 123-4567',
      hours: 'Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-6PM'
    },
    {
      type: 'Emergency Clinic',
      name: 'Emergency Veterinary Center',
      address: '456 Emergency Ave',
      city: 'Pet City, PC 12346',
      phone: '+1 (555) 911-PETS',
      hours: '24/7 Emergency Services'
    },
    {
      type: 'Distribution Center',
      name: 'Pet Supplies Warehouse',
      address: '789 Supply Chain Dr',
      city: 'Pet City, PC 12347',
      phone: '+1 (555) SUPPLY-1',
      hours: 'Mon-Sat: 7AM-7PM'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about our services? Need help with your pet's care? 
            We're here to help you every step of the way.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-8">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent resize-none"
                    placeholder="Tell us how we can help you and your pet..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 py-4 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition-colors font-semibold"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Contact</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-sky-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Call Us</div>
                    <div className="text-gray-600">+1 (555) 123-4567</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Email Us</div>
                    <div className="text-gray-600">hello@petscareub.com</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Support Hours</div>
                    <div className="text-gray-600">24/7 Emergency Line</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Follow Us</h3>
              
              <div className="space-y-4">
                <a
                  href="#"
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Facebook className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Facebook</div>
                    <div className="text-sm text-gray-600">Pet care tips & community</div>
                  </div>
                </a>
                
                <a
                  href="#"
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    <Instagram className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Instagram</div>
                    <div className="text-sm text-gray-600">Cute pet photos daily</div>
                  </div>
                </a>
                
                <a
                  href="#"
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <Youtube className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">YouTube</div>
                    <div className="text-sm text-gray-600">Pet care tutorials</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Locations Map */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Locations</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <MapPin className="w-6 h-6 text-sky-600" />
                  <span className="text-sm font-semibold text-sky-600 uppercase tracking-wide">
                    {location.type}
                  </span>
                </div>
                
                <h4 className="text-lg font-bold text-gray-800 mb-4">{location.name}</h4>
                
                <div className="space-y-2 text-gray-600">
                  <p>{location.address}</p>
                  <p>{location.city}</p>
                  <p className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>{location.phone}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{location.hours}</span>
                  </p>
                </div>
                
                <a 
                  href={getDirectionsUrl(location.address + ', ' + location.city)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-6 py-3 border border-sky-600 text-sky-600 rounded-xl hover:bg-sky-50 transition-colors font-semibold inline-flex items-center justify-center space-x-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;