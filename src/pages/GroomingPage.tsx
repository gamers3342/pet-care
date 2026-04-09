import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, Star, Calendar, Scissors, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { bookAppointment, getAllServices } from '../services/bookingService';

const GroomingPage = () => {
  const [selectedArea, setSelectedArea] = useState('All Areas');
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<any>(null);

  const areas = ['All Areas', 'Nehrunagar', 'Maninagar', 'Satellite', 'Ghatlodiya', 'Bodakdev', 'Vasundhra Colony', 'Bopal', 'Prahlad Nagar', 'Hathijan', 'Chandkheda', 'Vasna'];

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await getAllServices();
      if (data && data.length > 0) {
        const formattedServices = data.map((service: any) => ({
          id: service.service_id,
          name: service.service_name,
          address: service.service_address || 'Ahmedabad',
          area: service.area || 'Unknown',
          distance: 'Nearby',
          rating: 4.5 + Math.random() * 0.5,
          reviews: Math.floor(Math.random() * 100) + 50,
          phone: service.contact_no || '',
          hours: '9:00 AM - 8:00 PM',
          services: ['Full Grooming', 'Bath & Dry', 'Nail Trim', 'Ear Cleaning'],
          image: 'https://images.pexels.com/photos/6816861/pexels-photo-6816861.jpeg?auto=compress&cs=tinysrgb&w=400',
          nextAvailable: 'Today 3:00 PM',
          price: '₹1,200 - ₹3,500',
          specialNote: 'Professional grooming service'
        }));
        setServices(formattedServices);
      } else {
        setServices(getDefaultServices());
      }
    } catch (error) {
      console.error('Error loading services:', error);
      setServices(getDefaultServices());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultServices = () => [
    {
      id: 1,
      name: 'JUST DOGS - Nehrunagar',
      address: 'Nehrunagar, Ahmedabad',
      area: 'Nehrunagar',
      distance: '1.8 km',
      rating: 4.9,
      reviews: 267,
      phone: '+91 79 2630 1111',
      hours: '9:00 AM - 8:00 PM',
      services: ['Pet Store', 'Spa', 'Full Grooming', 'Bath & Dry'],
      image: 'https://images.pexels.com/photos/6816861/pexels-photo-6816861.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextAvailable: 'Today 3:00 PM',
      price: '₹1,200 - ₹3,500',
      specialNote: 'Highly rated pet store & spa'
    },
    {
      id: 2,
      name: 'JUST DOGS - Maninagar',
      address: 'Maninagar, Ahmedabad',
      area: 'Maninagar',
      distance: '4.2 km',
      rating: 4.8,
      reviews: 198,
      phone: '+91 79 2546 2222',
      hours: '10:00 AM - 7:00 PM',
      services: ['Branch Store', 'Grooming Outlet', 'Pet Supplies'],
      image: 'https://images.pexels.com/photos/6816866/pexels-photo-6816866.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextAvailable: 'Tomorrow 11:00 AM',
      price: '₹1,000 - ₹3,000',
      specialNote: 'Branch grooming outlet'
    },
    {
      id: 3,
      name: 'Companion Pets',
      address: 'Ramdevnagar Road, Satellite',
      area: 'Satellite',
      distance: '3.5 km',
      rating: 4.7,
      reviews: 156,
      phone: '+91 79 2630 3333',
      hours: '9:00 AM - 8:00 PM',
      services: ['Pet Supply', 'Grooming Services', 'Health Care'],
      image: 'https://images.pexels.com/photos/5750090/pexels-photo-5750090.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextAvailable: 'Today 4:30 PM',
      price: '₹800 - ₹2,500',
      specialNote: 'Pet supply + grooming combo'
    },
    {
      id: 4,
      name: 'Dog Zone (Dogambo)',
      address: 'Near Jitendra Shopping Center, Ghatlodiya',
      area: 'Ghatlodiya',
      distance: '5.8 km',
      rating: 4.6,
      reviews: 134,
      phone: '+91 79 2758 4444',
      hours: '10:00 AM - 7:00 PM',
      services: ['Dog Grooming', 'Specialized Care', 'Breed Specific'],
      image: 'https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextAvailable: 'Tomorrow 2:00 PM',
      price: '₹1,500 - ₹4,000',
      specialNote: 'Dog grooming specialist'
    },
    {
      id: 5,
      name: 'Pet Paws Ahmedabad',
      address: 'Sarkhej-Gandhinagar Highway',
      area: 'Satellite',
      distance: '6.2 km',
      rating: 4.5,
      reviews: 123,
      phone: '+91 79 2630 5555',
      hours: '9:00 AM - 6:00 PM',
      services: ['Highway Location', 'Quick Service', 'Basic Grooming'],
      image: 'https://images.pexels.com/photos/6235225/pexels-photo-6235225.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextAvailable: 'Friday 1:00 PM',
      price: '₹600 - ₹2,000',
      specialNote: 'Convenient highway location'
    },
    {
      id: 6,
      name: 'Smart Doggy\'s',
      address: 'Premchand Nagar, Bodakdev',
      area: 'Bodakdev',
      distance: '4.8 km',
      rating: 4.8,
      reviews: 189,
      phone: '+91 79 2685 6666',
      hours: '10:00 AM - 8:00 PM',
      services: ['Specialized Grooming', 'Premium Care', 'All Breeds'],
      image: 'https://images.pexels.com/photos/4587971/pexels-photo-4587971.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextAvailable: 'Today 5:00 PM',
      price: '₹1,800 - ₹5,000',
      specialNote: 'Grooming specialized service'
    },
    {
      id: 7,
      name: 'House Of Furr',
      address: 'Vasundhra Colony, Gulbai Tekra',
      area: 'Vasundhra Colony',
      distance: '3.9 km',
      rating: 4.9,
      reviews: 234,
      phone: '+91 79 2630 7777',
      hours: '9:00 AM - 7:00 PM',
      services: ['Professional Grooming', 'All Breeds', 'Pick-up/Delivery'],
      image: 'https://images.pexels.com/photos/4588047/pexels-photo-4588047.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextAvailable: 'Tomorrow 10:00 AM',
      price: '₹1,500 - ₹4,500',
      specialNote: 'Professional grooming with delivery'
    },
    {
      id: 8,
      name: 'DogsHostel',
      address: 'Bopal, Ahmedabad',
      area: 'Bopal',
      distance: '7.5 km',
      rating: 4.7,
      reviews: 167,
      phone: '+91 79 2970 8888',
      hours: '8:00 AM - 8:00 PM',
      services: ['Holistic Grooming', 'Bath', 'Nail Trim', 'Ear Cleaning'],
      image: 'https://images.pexels.com/photos/6816866/pexels-photo-6816866.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextAvailable: 'Today 6:00 PM',
      price: '₹1,200 - ₹3,800',
      specialNote: 'Holistic dog grooming approach'
    }
  ];

  const [showBooking, setShowBooking] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({
    pet_name: '',
    pet_breed: '',
    pet_age: '',
    appointment_date: '',
    reason: '',
    user_phone: ''
  });

  const filteredServices = services.filter(service => 
    selectedArea === 'All Areas' || service.area === selectedArea
  );

  const openBooking = (service?: any) => {
    setSelectedService(service || null);
    setShowBooking(true);
    setError('');
    setSuccess('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.pet_name || !form.pet_age || !form.appointment_date) {
      setError('Please fill pet name, pet age, and appointment date.');
      return;
    }
    if (!form.user_phone) {
      setError('Please enter your phone number.');
      return;
    }
    setLoadingSubmit(true);
    setError('');
    setSuccess('');
    try {
      const res = await bookAppointment({
        appointment_date: new Date(form.appointment_date).toISOString(),
        reason: form.reason || selectedService?.name || 'Grooming Service',
        service_type: 'grooming',
        clinic: selectedService ? {
          name: selectedService.name,
          address: selectedService.address,
          contact_no: selectedService.contact_no,
        } : undefined,
        pet: { pet_name: form.pet_name, pet_breed: form.pet_breed || undefined, pet_age: form.pet_age },
        user_phone: form.user_phone,
      });
      setSuccess(`Appointment booked! ID: ${res.appointment_id}`);
      setTimeout(() => {
        setShowBooking(false);
        setForm({ pet_name: '', pet_breed: '', pet_age: '', appointment_date: '', reason: '', user_phone: '' });
      }, 1500);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to book appointment');
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-25 via-white to-mint-25 pt-20">
      <div className="bg-gradient-to-r from-lavender-100 to-mint-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4 mb-6">
            <Link to="/services" className="flex items-center space-x-2 text-mint-600 hover:text-mint-700 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Services</span>
            </Link>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-800 mb-4 font-poppins">
            Professional Pet{' '}
            <span className="gradient-text">Grooming</span> in Ahmedabad
          </h1>
          <p className="text-xl text-gray-600 font-quicksand">
            Premium grooming services to keep your pets looking fabulous and feeling great!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl p-6 mb-12 shadow-lg border border-mint-100">
          <div className="flex items-center space-x-4 mb-4">
            <Scissors className="w-6 h-6 text-lavender-600" />
            <h3 className="text-xl font-bold text-gray-800 font-poppins">Find Grooming Services Near You</h3>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {areas.map(area => (
              <button
                key={area}
                onClick={() => setSelectedArea(area)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  selectedArea === area
                    ? 'bg-gradient-to-r from-lavender-400 to-mint-400 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-lavender-50 hover:text-lavender-600'
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-mint-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading grooming services...</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredServices.map((service) => (
              <div key={service.id} className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-lavender-100">
                <div className="relative h-48">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-lavender-900/50 to-transparent"></div>
                  
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/90 rounded-2xl flex items-center justify-center shadow-lg">
                      <Scissors className="w-6 h-6 text-lavender-600" />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1 font-poppins">{service.name}</h3>
                    <p className="text-lavender-100 text-sm">{service.specialNote}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center space-x-2 text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 text-mint-600" />
                        <span>{service.address}</span>
                        <span className="text-mint-600 font-medium">- {service.distance}</span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-gray-600 text-sm">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-peach-600" />
                          <span>{service.hours}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="w-4 h-4 text-lavender-600" />
                          <span>{service.phone || 'Contact for details'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-bold text-gray-800">{service.rating.toFixed(1)}</span>
                        <span className="text-gray-600 text-sm">({service.reviews})</span>
                      </div>
                      <div className="text-lg font-bold gradient-text">{service.price}</div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Services Offered:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.services.map((serviceItem: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-lavender-100 to-mint-100 text-lavender-700 rounded-full text-sm font-medium"
                        >
                          {serviceItem}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-sm text-green-600 font-medium mb-4 bg-green-50 px-3 py-2 rounded-lg">
                    Next Available: {service.nextAvailable}
                  </div>
                  
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => openBooking(service)}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-lavender-400 to-mint-400 text-white rounded-xl hover:from-lavender-500 hover:to-mint-500 transition-all duration-300 hover:scale-105 font-semibold"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book Now</span>
                    </button>
                    <button 
                      onClick={() => service.phone && window.open(`tel:${service.phone}`)}
                      className="px-4 py-3 border-2 border-lavender-400 text-lavender-600 rounded-xl hover:bg-lavender-50 transition-colors font-semibold"
                    >
                      Call
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 bg-gradient-to-br from-lavender-100 to-mint-100 rounded-3xl p-12 shadow-xl">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-8 font-poppins">
            Popular Grooming{' '}
            <span className="gradient-text">Packages</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-lavender-200">
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">Bath</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Basic Bath</h3>
                <div className="text-3xl font-bold gradient-text mb-2">₹800</div>
                <p className="text-gray-600">Perfect for regular maintenance</p>
              </div>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-mint-400 rounded-full"></div>
                  <span className="text-gray-700">Shampoo & Conditioning</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-mint-400 rounded-full"></div>
                  <span className="text-gray-700">Blow Dry</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-mint-400 rounded-full"></div>
                  <span className="text-gray-700">Basic Brushing</span>
                </li>
              </ul>
              
              <button onClick={() => openBooking()} className="w-full py-3 bg-gradient-to-r from-mint-400 to-peach-400 text-white rounded-xl hover:from-mint-500 hover:to-peach-500 transition-all duration-300 font-semibold">
                Book Basic Bath
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-lavender-400 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-lavender-400 text-white rounded-full text-sm font-bold">
                Most Popular
              </div>
              
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">Full Grooming</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Full Grooming</h3>
                <div className="text-3xl font-bold gradient-text mb-2">₹2,500</div>
                <p className="text-gray-600">Complete makeover package</p>
              </div>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-lavender-400 rounded-full"></div>
                  <span className="text-gray-700">Premium Shampoo & Spa</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-lavender-400 rounded-full"></div>
                  <span className="text-gray-700">Hair Cut & Styling</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-lavender-400 rounded-full"></div>
                  <span className="text-gray-700">Nail Trimming</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-lavender-400 rounded-full"></div>
                  <span className="text-gray-700">Ear Cleaning</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-lavender-400 rounded-full"></div>
                  <span className="text-gray-700">Perfume & Bow</span>
                </li>
              </ul>
              
              <button onClick={() => openBooking()} className="w-full py-3 bg-gradient-to-r from-lavender-400 to-lavender-500 text-white rounded-xl hover:from-lavender-500 hover:to-lavender-600 transition-all duration-300 font-semibold">
                Book Full Grooming
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-peach-200">
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">Premium Spa</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Premium Spa</h3>
                <div className="text-3xl font-bold gradient-text mb-2">₹4,500</div>
                <p className="text-gray-600">Luxury spa experience</p>
              </div>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-peach-400 rounded-full"></div>
                  <span className="text-gray-700">Luxury Spa Treatment</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-peach-400 rounded-full"></div>
                  <span className="text-gray-700">Professional Styling</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-peach-400 rounded-full"></div>
                  <span className="text-gray-700">Aromatherapy</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-peach-400 rounded-full"></div>
                  <span className="text-gray-700">Photo Session</span>
                </li>
              </ul>
              
              <button onClick={() => openBooking()} className="w-full py-3 bg-gradient-to-r from-peach-400 to-coral-400 text-white rounded-xl hover:from-peach-500 hover:to-coral-500 transition-all duration-300 font-semibold">
                Book Premium Spa
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-3xl p-12 shadow-xl border border-mint-100">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8 font-poppins">
            Mobile Grooming Services
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-mint-50 to-peach-50 rounded-2xl">
              <div className="text-5xl mb-4">Mobile</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Sploot Mobile Grooming</h3>
              <p className="text-gray-600 mb-4">Professional grooming at your doorstep</p>
              <div className="text-2xl font-bold gradient-text mb-4">₹1,500 - ₹4,000</div>
              <button onClick={() => openBooking()} className="px-6 py-3 bg-gradient-to-r from-mint-400 to-peach-400 text-white rounded-xl hover:from-mint-500 hover:to-peach-500 transition-all duration-300 font-semibold">
                Book Mobile Service
              </button>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-lavender-50 to-coral-50 rounded-2xl">
              <div className="text-5xl mb-4">At Home</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">ThePetNest At-Home</h3>
              <p className="text-gray-600 mb-4">Premium at-home grooming service</p>
              <div className="text-2xl font-bold gradient-text mb-4">₹2,000 - ₹5,500</div>
              <button onClick={() => openBooking()} className="px-6 py-3 bg-gradient-to-r from-lavender-400 to-coral-400 text-white rounded-xl hover:from-lavender-500 hover:to-coral-500 transition-all duration-300 font-semibold">
                Book Home Service
              </button>
            </div>
          </div>
        </div>
      </div>

      {showBooking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-800 font-poppins">
                Book Grooming Appointment
                {selectedService && <span className="block text-lg font-normal text-gray-500">at {selectedService.name}</span>}
              </h3>
              <button onClick={() => setShowBooking(false)} className="w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200">x</button>
            </div>
            {error && <div className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2">{error}</div>}
            {success && <div className="mb-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-3 py-2">{success}</div>}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Pet Name *</label>
                <input name="pet_name" value={form.pet_name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mint-400" placeholder="e.g., Bruno" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Your Phone Number *</label>
                <input name="user_phone" value={form.user_phone} onChange={handleChange} type="tel" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mint-400" placeholder="e.g., +91 9876543210" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Pet Breed</label>
                <input name="pet_breed" value={form.pet_breed} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mint-400" placeholder="e.g., Labrador" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Pet Age *</label>
                <input name="pet_age" value={form.pet_age} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mint-400" placeholder="e.g., 2 years" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Appointment Date & Time *</label>
                <input type="datetime-local" name="appointment_date" value={form.appointment_date} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mint-400" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Service Type / Notes</label>
                <input name="reason" value={form.reason} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mint-400" placeholder="e.g., Full Grooming Package" />
              </div>
              <div className="pt-2">
                <button onClick={handleSubmit} disabled={loadingSubmit} className="w-full py-3 bg-gradient-to-r from-mint-400 to-peach-400 text-white rounded-xl hover:from-mint-500 hover:to-peach-500 transition-all font-semibold disabled:opacity-60">
                  {loadingSubmit ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroomingPage;
