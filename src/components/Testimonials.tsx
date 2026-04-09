import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Heart } from 'lucide-react';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Golden Retriever Mom',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'Pets & Care Hub has been absolutely magical for managing my dog\'s health! The appointment booking is so smooth, and I love having all health records beautifully organized in one place! 🐕',
      petName: 'Buddy',
      petEmoji: '🐕'
    },
    {
      name: 'Michael Chen',
      role: 'Cat Dad Extraordinaire',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'The grooming services are phenomenal! My cat Princess has never looked more fabulous, and the automatic reminders are a lifesaver for busy pet parents like me! ✨',
      petName: 'Princess',
      petEmoji: '🐱'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Multi-Pet Parent',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'Managing three pets used to be chaos! Now with this beautiful dashboard and smart reminders, everything flows perfectly. The community forum is pure gold! 🌟',
      petName: 'Max, Luna & Charlie',
      petEmoji: '🐾'
    },
    {
      name: 'David Thompson',
      role: 'Labrador Enthusiast',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'Lightning-fast delivery and premium quality products every time! The emergency vet support literally saved Rocky during a scary midnight incident. Forever grateful! 🙏',
      petName: 'Rocky',
      petEmoji: '🐕‍🦺'
    },
    {
      name: 'Lisa Park',
      role: 'Rescue Dog Advocate',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'The adoption event notifications led me to my precious rescue baby! This platform genuinely cares about connecting pets with loving forever homes. 💕',
      petName: 'Bella',
      petEmoji: '🦮'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-lavender-50 via-white to-mint-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 text-6xl opacity-20 text-peach-300 floating-animation">💕</div>
      <div className="absolute bottom-10 right-10 text-4xl opacity-25 text-mint-300 floating-animation" style={{ animationDelay: '3s' }}>🌟</div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-coral-100 to-peach-100 rounded-full border border-coral-200 mb-6">
            <Heart className="w-5 h-5 text-coral-500 pulse-soft" />
            <span className="text-coral-700 font-semibold">Loved by Pet Parents</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6 font-poppins">
            Happy Pet Parents{' '}
            <span className="gradient-text">Stories</span>
          </h2>
          
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-quicksand">
            Thousands of pet owners trust us with their beloved companions. Here's what makes their tails wag! 🐕
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.slice(currentSlide, currentSlide + 3).concat(
              testimonials.slice(0, Math.max(0, currentSlide + 3 - testimonials.length))
            ).map((testimonial, index) => (
              <div
                key={`${currentSlide}-${index}`}
                className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-mint-100 relative overflow-hidden"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-mint-50 to-peach-50 opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                
                {/* Pet Emoji Decoration */}
                <div className="absolute top-4 right-4 text-4xl opacity-20 group-hover:opacity-40 transition-all duration-300 group-hover:scale-110">
                  {testimonial.petEmoji}
                </div>

                <div className="relative z-10">
                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current group-hover:scale-110 transition-transform" style={{ transitionDelay: `${i * 100}ms` }} />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative mb-8">
                    <Quote className="absolute -top-3 -left-3 w-10 h-10 text-mint-200 group-hover:text-mint-300 transition-colors" />
                    <p className="text-gray-700 leading-relaxed pl-8 font-quicksand text-lg group-hover:text-gray-800 transition-colors">
                      "{testimonial.text}"
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-mint-100 group-hover:border-mint-200 transition-colors shadow-lg"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-peach-400 to-coral-400 rounded-full flex items-center justify-center">
                        <Heart className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg font-poppins">{testimonial.name}</h4>
                      <p className="text-gray-600 font-medium">{testimonial.role}</p>
                      <p className="text-sm text-mint-600 font-medium">Pet Parent to {testimonial.petName}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-14 h-14 bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center hover:bg-mint-50 border border-mint-100 group"
          >
            <ChevronLeft className="w-7 h-7 text-mint-600 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-14 h-14 bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center hover:bg-mint-50 border border-mint-100 group"
          >
            <ChevronRight className="w-7 h-7 text-mint-600 group-hover:scale-110 transition-transform" />
          </button>

          {/* Enhanced Dots Indicator */}
          <div className="flex justify-center space-x-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-gradient-to-r from-mint-400 to-peach-400 scale-125' 
                    : 'bg-gray-300 hover:bg-mint-300 hover:scale-110'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center space-x-8 px-8 py-6 bg-white rounded-2xl shadow-lg border border-mint-100">
            <div className="flex items-center space-x-2">
              <div className="text-3xl">⭐</div>
              <div>
                <div className="font-bold text-gray-800 text-lg">4.9/5</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
            <div className="w-px h-12 bg-mint-200"></div>
            <div className="flex items-center space-x-2">
              <div className="text-3xl">💕</div>
              <div>
                <div className="font-bold text-gray-800 text-lg">10,000+</div>
                <div className="text-sm text-gray-600">Happy Families</div>
              </div>
            </div>
            <div className="w-px h-12 bg-mint-200"></div>
            <div className="flex items-center space-x-2">
              <div className="text-3xl">🏆</div>
              <div>
                <div className="font-bold text-gray-800 text-lg">98%</div>
                <div className="text-sm text-gray-600">Would Recommend</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;