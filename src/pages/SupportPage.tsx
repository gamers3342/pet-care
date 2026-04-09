import React, { useState } from 'react';
import { HelpCircle, MessageCircle, Phone, Mail, Clock, Send, CheckCircle, ArrowLeft, BookOpen, FileQuestion, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Support = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const faqs = [
    {
      question: 'How do I book an appointment with a veterinarian?',
      answer: 'Navigate to the Dashboard after logging in, then click on "Appointments" tab. Select your preferred clinic, choose a date and time, and confirm your booking. You will receive a confirmation notification.'
    },
    {
      question: 'Can I cancel or reschedule my appointment?',
      answer: 'Yes! You can cancel or reschedule appointments from your Dashboard. Go to Appointments > Click on the appointment > Cancel or Delete. Please cancel at least 24 hours before the scheduled time.'
    },
    {
      question: 'How do I track my order?',
      answer: 'Go to Dashboard and click on "Track Order" tab. You can see all your orders with their current status. You can also cancel active orders from this section.'
    },
    {
      question: 'How do I update my profile information?',
      answer: 'Click on the Settings button in your Dashboard header. You can update your name (direct) or email (requires OTP verification for security).'
    },
    {
      question: 'How do I book grooming services?',
      answer: 'Go to Dashboard > Grooming tab. You can view and manage all your grooming appointments. Click on any appointment to see detailed information.'
    },
    {
      question: 'How do I participate in community events?',
      answer: 'Visit the Events page to see upcoming pet-related events. Register for events that interest you. Your registered events will appear in the Dashboard > Events tab.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-mint-50 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/" className="inline-flex items-center text-mint-600 hover:text-mint-700 mb-8 font-medium">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-mint-500 to-peach-500 p-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Support Center</h1>
                <p className="text-white/80">We're here to help you and your pets</p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-10">
            {/* Quick Contact Options */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-mint-500" />
                Get Help
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="mailto:support@petscarehub.com" className="p-6 bg-gradient-to-br from-mint-50 to-mint-100 rounded-2xl border border-mint-200 hover:shadow-lg transition-all group">
                  <div className="w-12 h-12 bg-mint-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1">Email Support</h3>
                  <p className="text-sm text-gray-600">support@petscarehub.com</p>
                  <p className="text-xs text-mint-600 mt-2">Response within 24 hours</p>
                </a>

                <a href="tel:+918884264435" className="p-6 bg-gradient-to-br from-sky-50 to-sky-100 rounded-2xl border border-sky-200 hover:shadow-lg transition-all group">
                  <div className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1">Phone Support</h3>
                  <p className="text-sm text-gray-600">+91 (1-888)-426-4435</p>
                  <p className="text-xs text-sky-600 mt-2">Mon-Sat, 9AM-6PM</p>
                </a>

                <div className="p-6 bg-gradient-to-br from-peach-50 to-peach-100 rounded-2xl border border-peach-200">
                  <div className="w-12 h-12 bg-peach-500 rounded-xl flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1">Emergency Line</h3>
                  <p className="text-sm text-gray-600">Available 24/7</p>
                  <p className="text-xs text-peach-600 mt-2">For urgent pet care</p>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-mint-500" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <details key={index} className="group bg-gray-50 rounded-2xl overflow-hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-mint-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <FileQuestion className="w-5 h-5 text-mint-500" />
                        <span className="font-medium text-gray-800">{faq.question}</span>
                      </div>
                      <span className="w-8 h-8 rounded-full bg-gray-200 group-open:bg-mint-500 flex items-center justify-center transition-colors">
                        <span className="text-gray-600 group-open:text-white font-bold">+</span>
                      </span>
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed pl-8">{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Contact Form */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Send className="w-6 h-6 text-mint-500" />
                Send Us a Message
              </h2>
              
              {submitted ? (
                <div className="bg-gradient-to-r from-mint-50 to-green-50 rounded-2xl p-8 text-center border border-mint-200">
                  <div className="w-16 h-16 bg-mint-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-4">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="px-6 py-2 bg-mint-500 text-white rounded-lg hover:bg-mint-600">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-mint-500 focus:border-transparent"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-mint-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-mint-500 focus:border-transparent"
                    >
                      <option value="">Select a topic</option>
                      <option value="appointment">Appointment Issues</option>
                      <option value="order">Order & Delivery</option>
                      <option value="account">Account & Profile</option>
                      <option value="payment">Payment & Billing</option>
                      <option value="technical">Technical Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-mint-500 focus:border-transparent resize-none"
                      placeholder="Describe your issue in detail..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-mint-500 to-peach-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </section>

            {/* Additional Help */}
            <section>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Need Immediate Help?</h3>
                    <p className="text-gray-600 mb-3">
                      For urgent matters related to your pet's health or emergency situations, 
                      please call our 24/7 emergency line.
                    </p>
                    <a href="tel:+918884264435" className="inline-flex items-center gap-2 text-amber-600 font-semibold hover:underline">
                      <Phone className="w-4 h-4" />
                      +91 (1-888)-426-4435
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;