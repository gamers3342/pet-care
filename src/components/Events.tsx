import { useState } from 'react';
import { Calendar, Heart, MapPin, Clock, Users, X } from 'lucide-react';
import { registerForEvent } from '../services/eventRegistrationService';

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [registering, setRegistering] = useState(false);
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    pet_name: '',
    pet_type: '',
    pet_breed: '',
    pet_age: '',
    owner_name: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const events = [
    {
      id: 1,
      title: 'Free Vaccination Camp',
      date: 'December 15, 2024',
      time: '9:00 AM - 4:00 PM',
      location: 'Central Park Community Center',
      description: 'Free vaccinations for dogs and cats. Bring your pet\'s health records.',
      type: 'vaccination',
      image: 'https://images.pexels.com/photos/6235225/pexels-photo-6235225.jpeg?auto=compress&cs=tinysrgb&w=600',
      capacity: '200 pets',
      registered: 156
    },
    {
      id: 2,
      title: 'Pet Adoption Fair',
      date: 'December 22, 2024',
      time: '10:00 AM - 6:00 PM',
      location: 'Downtown Plaza',
      description: 'Meet adorable rescue pets looking for their forever homes. Adoption fees waived.',
      type: 'adoption',
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600',
      capacity: '50+ pets',
      registered: 89
    },
    {
      id: 3,
      title: 'Holiday Pet Photo Session',
      date: 'December 18, 2024',
      time: '1:00 PM - 5:00 PM',
      location: 'Pets & Care Studio',
      description: 'Professional holiday photos with your pets. Sessions by appointment only.',
      type: 'photography',
      image: 'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=600',
      capacity: '30 sessions',
      registered: 24
    }
  ];

  const handleRegisterClick = (eventId: number) => {
    setSelectedEvent(eventId);
    setSubmitted(false);
    setFormData({
      user_name: '',
      user_email: '',
      user_phone: '',
      pet_name: '',
      pet_type: '',
      pet_breed: '',
      pet_age: '',
      owner_name: '',
      notes: ''
    });
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegistering(true);

    try {
      const event = events.find(ev => ev.id === selectedEvent);
      if (!event) return;

      await registerForEvent({
        event_type: event.type,
        event_title: event.title,
        ...formData
      });

      setSubmitted(true);
    } catch (error) {
      console.error('Registration error:', error);
      alert('Failed to register. Please try again.');
    } finally {
      setRegistering(false);
    }
  };

  const currentEvent = events.find(ev => ev.id === selectedEvent);

  const donations = [
    {
      title: 'Winter Shelter Drive',
      description: 'Help provide warm shelter and food for stray animals during winter.',
      goal: 420000,
      raised: 268800,
      supporters: 67
    },
    {
      title: 'Emergency Medical Fund',
      description: 'Support emergency medical treatments for rescued animals.',
      goal: 840000,
      raised: 659400,
      supporters: 134
    }
  ];

  return (
    <>
      <section id="events" className="py-20 bg-gradient-to-br from-sky-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Community Events & Support
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our community events and help make a difference in the lives of pets in need. 
              Together, we can create a better world for all animals.
            </p>
          </div>

          <div className="mb-20">
            <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">Upcoming Events</h3>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div key={event.id} className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-48">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold text-white ${
                      event.type === 'vaccination' ? 'bg-green-500' :
                      event.type === 'adoption' ? 'bg-orange-500' :
                      'bg-purple-500'
                    }`}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{event.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{event.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-3 text-gray-600">
                        <Calendar className="w-5 h-5 text-sky-600" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-600">
                        <Clock className="w-5 h-5 text-sky-600" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-600">
                        <MapPin className="w-5 h-5 text-sky-600" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-600">
                        <Users className="w-5 h-5 text-sky-600" />
                        <span>{event.registered} registered • {event.capacity} capacity</span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Registration Progress</span>
                        <span>{Math.round((event.registered / parseInt(event.capacity)) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-sky-600 h-2 rounded-full"
                          style={{ width: `${Math.min((event.registered / parseInt(event.capacity)) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleRegisterClick(event.id)}
                      className="w-full py-3 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition-colors font-semibold"
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-12 shadow-xl">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Support Stray Animal Care
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Your donations help provide food, shelter, and medical care for stray animals. 
                Every contribution makes a real difference in an animal's life.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {donations.map((donation, index) => (
                <div key={index} className="border border-gray-200 rounded-2xl p-8">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">{donation.title}</h4>
                  <p className="text-gray-600 mb-6">{donation.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>₹{donation.raised.toLocaleString()} raised</span>
                      <span>₹{donation.goal.toLocaleString()} goal</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-orange-400 to-orange-500 h-3 rounded-full"
                        style={{ width: `${(donation.raised / donation.goal) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-sm">{donation.supporters} supporters</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {Math.round((donation.raised / donation.goal) * 100)}% funded
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full py-3 bg-orange-400 text-white rounded-xl hover:bg-orange-500 transition-colors font-semibold">
                    Donate Now
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-sky-100 to-orange-100 rounded-2xl p-8">
              <h4 className="text-2xl font-bold text-gray-800 text-center mb-8">Our Impact This Year</h4>
              
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-sky-600 mb-2">2,340</div>
                  <div className="text-gray-600">Animals Rescued</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-400 mb-2">1,876</div>
                  <div className="text-gray-600">Successful Adoptions</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">5,621</div>
                  <div className="text-gray-600">Free Vaccinations</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">₹1.07Cr</div>
                  <div className="text-gray-600">Funds Raised</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedEvent && currentEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-xl font-bold text-gray-800">Register for {currentEvent.title}</h3>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            {submitted ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h4>
                <p className="text-gray-600 mb-4">You have registered for {currentEvent.title}.</p>
                <p className="text-sm text-gray-500">Date: {currentEvent.date}</p>
                <p className="text-sm text-gray-500">Time: {currentEvent.time}</p>
                <p className="text-sm text-gray-500 mb-6">Location: {currentEvent.location}</p>
                <button 
                  onClick={handleCloseModal}
                  className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    value={formData.user_name}
                    onChange={(e) => setFormData({...formData, user_name: e.target.value})}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    value={formData.user_email}
                    onChange={(e) => setFormData({...formData, user_email: e.target.value})}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    value={formData.user_phone}
                    onChange={(e) => setFormData({...formData, user_phone: e.target.value})}
                    placeholder="+91 9876543210"
                  />
                </div>

                {currentEvent.type === 'photography' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pet Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        value={formData.pet_name}
                        onChange={(e) => setFormData({...formData, pet_name: e.target.value})}
                        placeholder="Your pet's name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pet Type *</label>
                      <select
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        value={formData.pet_type}
                        onChange={(e) => setFormData({...formData, pet_type: e.target.value})}
                      >
                        <option value="">Select pet type</option>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="bird">Bird</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </>
                )}

                {currentEvent.type === 'vaccination' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pet Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        value={formData.pet_name}
                        onChange={(e) => setFormData({...formData, pet_name: e.target.value})}
                        placeholder="Your pet's name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pet Type *</label>
                      <select
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        value={formData.pet_type}
                        onChange={(e) => setFormData({...formData, pet_type: e.target.value})}
                      >
                        <option value="">Select pet type</option>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pet Breed</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        value={formData.pet_breed}
                        onChange={(e) => setFormData({...formData, pet_breed: e.target.value})}
                        placeholder="e.g., Golden Retriever"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pet Age</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        value={formData.pet_age}
                        onChange={(e) => setFormData({...formData, pet_age: e.target.value})}
                        placeholder="e.g., 2 years"
                      />
                    </div>
                  </>
                )}

                {currentEvent.type === 'adoption' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        value={formData.owner_name}
                        onChange={(e) => setFormData({...formData, owner_name: e.target.value})}
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                      <textarea
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        placeholder="Tell us about your home and experience with pets..."
                      />
                    </div>
                  </>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={registering}
                    className="w-full py-3 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition-colors font-semibold disabled:opacity-60"
                  >
                    {registering ? 'Registering...' : 'Confirm Registration'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Events;
