import React from 'react';
import { FileText, Scale, CheckCircle, AlertTriangle, Users, ShoppingCart, Calendar, ArrowLeft, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-peach-50 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/" className="inline-flex items-center text-mint-600 hover:text-mint-700 mb-8 font-medium">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-peach-500 to-coral-500 p-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Scale className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
                <p className="text-white/80">Rules and guidelines for using our platform</p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
              <span>Last Updated: April 2026</span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Legally Binding
              </span>
            </div>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Users className="w-6 h-6 text-peach-500" />
                1. Acceptance of Terms
              </h2>
              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  By accessing and using Pets & Care Hub, you accept and agree to be bound by the terms 
                  and provisions of this agreement. If you do not agree to these terms, please do not 
                  use our services.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-peach-500" />
                2. Appointment & Booking Terms
              </h2>
              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-peach-500 mt-0.5" />
                    <span className="text-gray-600"><strong>Booking Confirmation:</strong> All appointments require confirmation. You will receive an email/SMS notification upon successful booking.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-peach-500 mt-0.5" />
                    <span className="text-gray-600"><strong>Cancellation Policy:</strong> You may cancel appointments up to 24 hours before the scheduled time without any charges.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-peach-500 mt-0.5" />
                    <span className="text-gray-600"><strong>No-Show:</strong> Failure to attend without prior notice may result in cancellation of future booking privileges.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-peach-500 mt-0.5" />
                    <span className="text-gray-600"><strong>Rescheduling:</strong> Appointments can be rescheduled at least 12 hours before the scheduled time.</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <ShoppingCart className="w-6 h-6 text-peach-500" />
                3. Shopping & Orders
              </h2>
              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-peach-500 mt-0.5" />
                    <span className="text-gray-600"><strong>Product Availability:</strong> All products are subject to availability. We will notify you if any item is out of stock.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-peach-500 mt-0.5" />
                    <span className="text-gray-600"><strong>Pricing:</strong> Prices are subject to change without notice. The price at time of purchase will be final.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-peach-500 mt-0.5" />
                    <span className="text-gray-600"><strong>Order Cancellation:</strong> You can cancel orders before shipment. Once shipped, returns follow our return policy.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-peach-500 mt-0.5" />
                    <span className="text-gray-600"><strong>Delivery:</strong> Delivery times are estimates. We strive to deliver within the specified timeframe.</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-peach-500" />
                4. User Responsibilities
              </h2>
              <div className="bg-yellow-50 rounded-2xl p-6 space-y-4 border border-yellow-200">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <span className="text-gray-600">Provide accurate and complete information when creating an account</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <span className="text-gray-600">Maintain the security of your account credentials</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <span className="text-gray-600">Ensure your pet's health information is accurate and up-to-date</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <span className="text-gray-600">Not use the platform for any illegal or unauthorized purpose</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <FileText className="w-6 h-6 text-peach-500" />
                5. Limitation of Liability
              </h2>
              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Pets & Care Hub provides a platform connecting pet owners with service providers. 
                  We are not responsible for the quality of services provided by third-party clinics, 
                  groomers, or event organizers. Any disputes should be resolved directly with the service provider.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">6. Changes to Terms</h2>
              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  We reserve the right to modify these terms at any time. Your continued use of the platform 
                  after any changes constitutes acceptance of the new terms. We will notify users of any 
                  significant changes via email or platform notification.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">7. Contact Information</h2>
              <div className="bg-gradient-to-r from-peach-50 to-coral-50 rounded-2xl p-6 border border-peach-200">
                <p className="text-gray-600 mb-4">For questions about these Terms of Service, contact us at:</p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email:</strong> legal@petscarehub.com</p>
                  <p><strong>Phone:</strong> +91 (1-888)-426-4435</p>
                  <p><strong>Address:</strong> 123 Pet Care Ljp, Ahmedabad, Gujarat, India</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;