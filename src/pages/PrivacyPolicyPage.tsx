import React from 'react';
import { Shield, Lock, Eye, Database, Mail, Phone, MapPin, ArrowLeft, CheckCircle, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-mint-50 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/" className="inline-flex items-center text-mint-600 hover:text-mint-700 mb-8 font-medium">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-mint-500 to-sky-500 p-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
                <p className="text-white/80">Your data is safe with us</p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
              <span>Last Updated: April 2026</span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Verified & Active
              </span>
            </div>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Lock className="w-6 h-6 text-mint-500" />
                1. Information We Collect
              </h2>
              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  At Pets & Care Hub, we collect information to provide you with the best pet care services. 
                  This includes personal information you provide when creating an account, booking appointments, 
                  or making purchases.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-mint-500 mt-0.5" />
                    <span className="text-gray-600"><strong>Account Information:</strong> Name, email, phone number, and profile picture</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-mint-500 mt-0.5" />
                    <span className="text-gray-600"><strong>Pet Information:</strong> Pet name, breed, age, medical history, and vaccination records</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-mint-500 mt-0.5" />
                    <span className="text-gray-600"><strong>Booking Data:</strong> Appointment history, clinic visits, and service preferences</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-mint-500 mt-0.5" />
                    <span className="text-gray-600"><strong>Payment Information:</strong> Transaction history and payment method details (encrypted)</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Eye className="w-6 h-6 text-mint-500" />
                2. How We Use Your Information
              </h2>
              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Your information is used to provide, maintain, and improve our services. We never sell 
                  your personal data to third parties.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-mint-500 mt-0.5" />
                    <span className="text-gray-600">Process and manage your appointments with veterinary clinics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-mint-500 mt-0.5" />
                    <span className="text-gray-600">Schedule grooming services and pet care appointments</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-mint-500 mt-0.5" />
                    <span className="text-gray-600">Send appointment reminders and health notifications for your pets</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-mint-500 mt-0.5" />
                    <span className="text-gray-600">Process orders and deliver pet supplies to your address</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-mint-500 mt-0.5" />
                    <span className="text-gray-600">Communicate about events, community activities, and new services</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Database className="w-6 h-6 text-mint-500" />
                3. Data Security & Protection
              </h2>
              <div className="bg-gradient-to-r from-mint-50 to-sky-50 rounded-2xl p-6 space-y-4 border border-mint-200">
                <p className="text-gray-600 leading-relaxed">
                  We implement industry-standard security measures to protect your data:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                    <Lock className="w-8 h-8 text-mint-500" />
                    <span className="text-gray-700 font-medium">256-bit SSL Encryption</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                    <Shield className="w-8 h-8 text-mint-500" />
                    <span className="text-gray-700 font-medium">Secure Database Storage</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                    <Eye className="w-8 h-8 text-mint-500" />
                    <span className="text-gray-700 font-medium">Regular Security Audits</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                    <CheckCircle className="w-8 h-8 text-mint-500" />
                    <span className="text-gray-700 font-medium">Two-Factor Authentication</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Heart className="w-6 h-6 text-mint-500" />
                4. Your Rights
              </h2>
              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  You have complete control over your personal information. You can:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-mint-500 mt-0.5" />
                    <span className="text-gray-600"><strong>Access:</strong> View all your stored personal data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-mint-500 mt-0.5" />
                    <span className="text-gray-600"><strong>Correct:</strong> Update or correct any inaccurate information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-mint-500 mt-0.5" />
                    <span className="text-gray-600"><strong>Delete:</strong> Request deletion of your account and data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-mint-500 mt-0.5" />
                    <span className="text-gray-600"><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">5. Contact Us</h2>
              <div className="bg-gradient-to-r from-sky-50 to-mint-50 rounded-2xl p-6 border border-sky-200">
                <p className="text-gray-600 mb-4">If you have any questions about this Privacy Policy, please contact us:</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="w-5 h-5 text-mint-500" />
                    <span>privacy@petscarehub.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="w-5 h-5 text-mint-500" />
                    <span>+91 (1-888)-426-4435</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-mint-500" />
                    <span>123 Pet Care Ljp, Ahmedabad, Gujarat, India</span>
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

export default PrivacyPolicy;