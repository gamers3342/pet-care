import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, Star, Navigation, Calendar, Search } from 'lucide-react';
import { bookAppointment, getAllClinics } from '../services/bookingService';

const Clinics = () => {
  const [selectedArea, setSelectedArea] = useState('All Areas');
  const [clinics, setClinics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const areas = ['All Areas', 'Thaltej', 'Chandkheda', 'Ambawadi', 'Paldi', 'Satellite', 'Vastral', 'Sola', 'Naroda', 'Vastrapur', 'Vasna', 'Maninagar', 'Ellisbridge'];

  useEffect(() => {
    loadClinics();
  }, []);

  const loadClinics = async () => {
    try {
      setLoading(true);
      const data = await getAllClinics();
      if (data && data.length > 0) {
        const formattedClinics = data.map((clinic: any) => ({
          id: clinic.clinic_id,
          name: clinic.clinic_name,
          address: clinic.clinic_address,
          area: clinic.area || 'Unknown',
          distance: 'Nearby',
          rating: 4.5 + Math.random() * 0.5,
          reviews: Math.floor(Math.random() * 100) + 50,
          phone: clinic.contact_no || clinic.clinic_phone || '',
          hours: '9:00 AM - 8:00 PM',
          specialties: ['General Care', 'Vaccination', 'Health Checkup', 'Surgery'],
          image: 'https://images.pexels.com/photos/6235657/pexels-photo-6235657.jpeg?auto=compress&cs=tinysrgb&w=400',
          nextAvailable: 'Today 2:00 PM',
          isOpen24x7: clinic.is_24x7 || false,
          vet_name: clinic.vet_name,
          email: clinic.email
        }));
        setClinics(formattedClinics);
      } else {
        setClinics(getDefaultClinics());
      }
    } catch (error) {
      console.error('Error loading clinics:', error);
      setClinics(getDefaultClinics());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultClinics = () => [
    {
      id: 1,
      name: 'Sneh Pet Hospital',
      address: 'Trinity Complex, Hebatpur Rd, Thaltej',
      area: 'Thaltej',
      distance: '2.3 km',
      rating: 4.9,
      reviews: 234,
      phone: '+91 79 2685 4321',
      hours: '24×7 Open',
      specialties: ['Emergency Care', 'Surgery', 'X-ray', 'USG', 'Pathology', 'Grooming', 'Boarding'],
      image: 'https://images.pexels.com/photos/6235657/pexels-photo-6235657.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextAvailable: 'Today 2:00 PM',
      isOpen24x7: true
    },
    {
      id: 2,
      name: 'Dr. Chirag Dave\'s Pet Clinic',
      address: 'Ravija Plaza, Thaltej-Shilaj Rd',
      area: 'Thaltej',
      distance: '2.8 km',
      rating: 4.8,
      reviews: 189,
      phone: '+91 79 2685 7890',
      hours: '9:00 AM - 8:00 PM',
      specialties: ['ECG', 'Sonography', 'Surgery', 'X-ray', 'Ultrasound', 'Grooming'],
      image: 'https://images.pexels.com/photos/6816866/pexels-photo-6816866.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextAvailable: 'Tomorrow 10:00 AM',
      isOpen24x7: false
    },
    {
      id: 3,
      name: 'Dr. Tina Giri\'s Vet Clinic',
      address: 'Akshar Complex, Jodhpur Village',
      area: 'Satellite',
      distance: '3.5 km',
      rating: 4.7,
      reviews: 156,
      phone: '+91 79 2630 1234',
      hours: '8:00 AM - 7:00 PM',
      specialties: ['Diagnostics', 'Surgery', 'Dental', 'Immunization', 'Ultrasound'],
      image: 'https://images.pexels.com/photos/5750090/pexels-photo-5750090.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextAvailable: 'Friday 9:00 AM',
      isOpen24x7: false
    },
    {
      id: 4,
      name: 'Dr. J.D.\'s Pet Clinic',
      address: 'Shaktikrupa Society Part-2, Chandkheda',
      area: 'Chandkheda',
      distance: '4.2 km',
      rating: 4.6,
      reviews: 123,
      phone: '+91 79 2764 5678',
      hours: '9:00 AM - 6:00 PM',
      specialties: ['General Care', 'Vaccination', 'Health Checkup'],
      image: 'https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextAvailable: 'Today 4:00 PM',
      isOpen24x7: false
    },
    {
      id: 5,
      name: 'Dr. Gautam\'s Dog Clinic & Hospital',
      address: 'Tragad Rd, Chandkheda',
      area: 'Chandkheda',
      distance: '4.5 km',
      rating: 4.8,
      reviews: 167,
      phone: '+91 79 2764 9012',
      hours: '8:00 AM - 8:00 PM',
      specialties: ['Dog Specialist', 'Surgery', 'ICU', 'Emergency Care'],
      image: 'https://images.pexels.com/photos/6816861/pexels-photo-6816861.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextAvailable: 'Tomorrow 11:00 AM',
      isOpen24x7: false
    },
    {
      id: 6,
      name: 'Caring Paws Vet Clinic & Surgical Centre',
      address: 'Panjara Pol, Ambawadi',
      area: 'Ambawadi',
      distance: '5.1 km',
      rating: 4.7,
      reviews: 145,
      phone: '+91 79 2656 3456',
      hours: '9:00 AM - 7:00 PM',
      specialties: ['Surgery', 'Critical Care', 'Orthopedics'],
      image: 'https://images.pexels.com/photos/5731849/pexels-photo-5731849.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextAvailable: 'Today 3:30 PM',
      isOpen24x7: false
    },
    {
      id: 7,
      name: 'Woofy & Vet Pet Clinic and Shop',
      address: 'New CG Rd, Chandkheda',
      area: 'Chandkheda',
      distance: '4.8 km',
      rating: 4.6,
      reviews: 134,
      phone: '+91 79 2764 7890',
      hours: '10:00 AM - 8:00 PM',
      specialties: ['General Care', 'Pet Shop', 'Grooming'],
      image: 'https://images.pexels.com/photos/6235225/pexels-photo-6235225.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextAvailable: 'Tomorrow 2:00 PM',
      isOpen24x7: false
    },
    {
      id: 8,
      name: 'BestBuds Pet Hospital',
      address: 'New Sharda Mandir Rd, Paldi',
      area: 'Paldi',
      distance: '6.2 km',
      rating: 4.8,
      reviews: 198,
      phone: '+91 79 2658 1234',
      hours: '8:00 AM - 9:00 PM',
      specialties: ['Multi-specialty', 'Advanced Diagnostics', 'Surgery'],
      image: 'https://images.pexels.com/photos/4587998/pexels-photo-4587998.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextAvailable: 'Today 5:00 PM',
      isOpen24x7: false
    },
    {
      id: 9,
      name: 'Pets & Paws Vet Hospital',
      address: 'Maple Tree, Sal Hospital Rd, Thaltej',
      area: 'Thaltej',
      distance: '2.1 km',
      rating: 4.7,
      reviews: 176,
      phone: '+91 79 2685 5678',
      hours: '9:00 AM - 8:00 PM',
      specialties: ['Vet Hospital', 'Pet Shop', 'Boarding'],
      image: 'https://images.pexels.com/photos/4588047/pexels-photo-4588047.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextAvailable: 'Tomorrow 9:00 AM',
      isOpen24x7: false
    },
    {
      id: 10,
      name: 'New Hope Animal Hospital',
      address: 'Om Tower, Satellite Rd',
      area: 'Satellite',
      distance: '3.8 km',
      rating: 4.6,
      reviews: 145,
      phone: '+91 79 2630 9876',
      hours: '8:00 AM - 7:00 PM',
      specialties: ['Animal Hospital', 'Surgery', 'Emergency Care'],
      image: 'https://images.pexels.com/photos/6235657/pexels-photo-6235657.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextAvailable: 'Friday 10:30 AM',
      isOpen24x7: false
    }
  ];

  const filteredClinics = clinics.filter(clinic => {
    const matchesArea = selectedArea === 'All Areas' || clinic.area === selectedArea;
    const matchesSearch = !searchQuery || 
      clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (clinic.vet_name && clinic.vet_name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesArea && matchesSearch;
  });

  const [showBooking, setShowBooking] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [appointmentId, setAppointmentId] = useState<string | null>(null);
  const [selectedClinic, setSelectedClinic] = useState<any>(null);
  const [form, setForm] = useState({
    pet_name: '',
    pet_breed: '',
    pet_age: '',
    appointment_date: '',
    reason: '',
    user_phone: ''
  });

  const openBooking = (clinic: any) => {
    setSelectedClinic(clinic);
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
    setBookingLoading(true);
    setError('');
    setSuccess('');
    console.log('Submitting appointment booking...');
    try {
      const res = await bookAppointment({
        clinic: { 
          name: selectedClinic.name, 
          address: selectedClinic.address, 
          contact_no: selectedClinic.phone || selectedClinic.contact_no,
          vet_name: selectedClinic.vet_name
        },
        appointment_date: new Date(form.appointment_date).toISOString(),
        reason: form.reason || undefined,
        service_type: 'vet',
        pet: { pet_name: form.pet_name, pet_breed: form.pet_breed || undefined, pet_age: form.pet_age },
        user_phone: form.user_phone,
      });
      console.log('Booking result:', res);
      const appointmentRes = res as any;
      setAppointmentId(appointmentRes?.appointment_id || null);
      setSuccess('Appointment booked successfully!');
      setShowModal(true);
      setForm({ pet_name: '', pet_breed: '', pet_age: '', appointment_date: '', reason: '', user_phone: '' });
    } catch (e) {
      console.error('Booking error:', e);
      if (e instanceof Error && e.message) {
        setError(e.message);
      } else if (typeof e === 'string') {
        setError(e);
      } else {
        setError('Failed to book appointment. Please try again or check your details.');
      }
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <section id="clinics" className="py-20 bg-gradient-to-br from-mint-25 to-peach-25">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-6 font-poppins">
            Trusted Veterinary{' '}
            <span className="gradient-text">Clinics</span> in Ahmedabad
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-quicksand">
            Connect with certified veterinarians across Ahmedabad. Book appointments, access health records, 
            and ensure your pet gets the best care possible.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 mb-12 shadow-lg border border-mint-100">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Clinics</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by clinic name or doctor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-400"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
              <select 
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-400"
              >
                {areas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-400">
                <option>All Services</option>
                <option>Emergency Care</option>
                <option>Routine Checkup</option>
                <option>Vaccination</option>
                <option>Surgery</option>
                <option>Dental Care</option>
                <option>Grooming</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-mint-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading clinics...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredClinics.map((clinic) => (
              <div key={clinic.id} className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-mint-100">
                <div className="md:flex">
                  <div className="md:w-80">
                    <img
                      src={clinic.image}
                      alt={clinic.name}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-2xl font-bold text-gray-800 font-poppins">{clinic.name}</h3>
                          {clinic.isOpen24x7 && (
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                              24×7 Open
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-gray-600 mb-3">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4 text-mint-600" />
                            <span>{clinic.address}</span>
                          </div>
                          <span>•</span>
                          <span className="text-mint-600 font-medium">{clinic.distance}</span>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4 text-peach-600" />
                            <span>{clinic.hours}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="w-4 h-4 text-lavender-600" />
                            <span>{clinic.phone || 'Contact for details'}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-2">
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          <span className="font-bold text-gray-800 text-lg">{clinic.rating.toFixed(1)}</span>
                          <span className="text-gray-600">({clinic.reviews})</span>
                        </div>
                        <div className="text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
                          Next: {clinic.nextAvailable}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3 font-poppins">Specialties & Services:</h4>
                      <div className="flex flex-wrap gap-2">
                        {clinic.specialties.map((specialty: string, index: number) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-gradient-to-r from-mint-100 to-peach-100 text-mint-700 rounded-full text-sm font-medium border border-mint-200"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <button 
                        onClick={() => openBooking(clinic)}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-mint-400 to-mint-500 text-white rounded-xl hover:from-mint-500 hover:to-mint-600 transition-all duration-300 hover:scale-105 font-semibold shadow-lg"
                      >
                        <Calendar className="w-5 h-5" />
                        <span>Book Appointment</span>
                      </button>
                      <button 
                        onClick={() => alert(`Getting directions to ${clinic.name}`)}
                        className="flex items-center space-x-2 px-6 py-3 border-2 border-mint-400 text-mint-600 rounded-xl hover:bg-mint-50 transition-all duration-300 hover:scale-105 font-semibold"
                      >
                        <Navigation className="w-5 h-5" />
                        <span>Get Directions</span>
                      </button>
                      <button 
                        onClick={() => clinic.phone && window.open(`tel:${clinic.phone}`)}
                        className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                      >
                        <Phone className="w-5 h-5" />
                        <span>Call Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 bg-gradient-to-r from-red-500 to-red-600 rounded-3xl p-8 text-white text-center shadow-2xl">
          <h3 className="text-3xl font-bold mb-4 font-poppins">Pet Emergency?</h3>
          <p className="text-xl mb-6 font-quicksand">24/7 emergency veterinary care available</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+917926854321" className="px-8 py-4 bg-white text-red-600 rounded-2xl hover:bg-red-50 transition-colors font-bold text-lg shadow-lg">
              Call Emergency Line: +91 79 2685 4321
            </a>
            <button 
              onClick={() => setSelectedArea('All Areas')}
              className="px-8 py-4 border-2 border-white text-white rounded-2xl hover:bg-white/10 transition-colors font-semibold"
            >
              Find Nearest 24x7 Clinic
            </button>
          </div>
        </div>
      </div>
      {showBooking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-800 font-poppins">Book Vet Appointment</h3>
              <button onClick={() => setShowBooking(false)} className="w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200">x</button>
            </div>
            {error && <div className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2">{error}</div>}
            {success && (
              <div className="mb-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-3 py-2">
                {success}
                {appointmentId && (
                  <div className="mt-2 text-mint-700 font-bold">Appointment ID: {appointmentId}</div>
                )}
              </div>
            )}

            {showModal && appointmentId && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full text-center">
                  <h2 className="text-2xl font-bold text-mint-700 mb-4">Appointment Confirmed!</h2>
                  <p className="text-lg mb-2">Your appointment has been booked successfully.</p>
                  <div className="text-xl font-bold text-peach-700 mb-4">Appointment ID: {appointmentId}</div>
                  <button
                    className="mt-4 px-6 py-2 bg-mint-500 text-white rounded-xl font-semibold hover:bg-mint-600 transition"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
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
                <label className="block text-sm font-medium mb-1">Reason (optional)</label>
                <input name="reason" value={form.reason} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mint-400" placeholder="e.g., Vaccination" />
              </div>
              <div className="pt-2">
                <button onClick={handleSubmit} disabled={bookingLoading} className="w-full py-3 bg-gradient-to-r from-mint-400 to-peach-400 text-white rounded-xl hover:from-mint-500 hover:to-peach-500 transition-all font-semibold disabled:opacity-60">
                  {bookingLoading ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Clinics;
