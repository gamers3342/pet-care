import React from 'react';
import { Cookie, Info, Shield, Settings, Trash2, ArrowLeft, CheckCircle, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-lavender-50 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/" className="inline-flex items-center text-mint-600 hover:text-mint-700 mb-8 font-medium">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-lavender-500 to-purple-500 p-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Cookie className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Cookie Policy</h1>
                <p className="text-white/80">Learn how we use cookies to improve your experience</p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
              <span>Last Updated: April 2026</span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                GDPR Compliant
              </span>
            </div>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Info className="w-6 h-6 text-lavender-500" />
                1. What Are Cookies?
              </h2>
              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Cookies are small text files stored on your device when you visit websites. They help 
                  remember your preferences, analyze site performance, and provide personalized experiences. 
                  At Pets & Care Hub, we use cookies to make your pet care journey smoother and more enjoyable.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-lavender-500" />
                2. Types of Cookies We Use
              </h2>
              <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
                <div className="border-l-4 border-mint-500 pl-4">
                  <h3 className="font-bold text-gray-800 mb-2">Essential Cookies</h3>
                  <p className="text-gray-600 text-sm">
                    Required for basic website functionality. These include login authentication, 
                    session management, and secure checkout processes. Cannot be disabled.
                  </p>
                </div>
                
                <div className="border-l-4 border-sky-500 pl-4">
                  <h3 className="font-bold text-gray-800 mb-2">Analytics Cookies</h3>
                  <p className="text-gray-600 text-sm">
                    Help us understand how visitors interact with our website by collecting anonymous 
                    information about pages visited, time spent, and any issues encountered.
                  </p>
                </div>
                
                <div className="border-l-4 border-peach-500 pl-4">
                  <h3 className="font-bold text-gray-800 mb-2">Functional Cookies</h3>
                  <p className="text-gray-600 text-sm">
                    Enable enhanced functionality and personalization, such as remembering your 
                    preferences for pet clinics, grooming services, and saved addresses.
                  </p>
                </div>
                
                <div className="border-l-4 border-lavender-500 pl-4">
                  <h3 className="font-bold text-gray-800 mb-2">Marketing Cookies</h3>
                  <p className="text-gray-600 text-sm">
                    Used to track visitors across websites to display relevant advertisements. 
                    We respect your privacy and only show pet-related content.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Settings className="w-6 h-6 text-lavender-500" />
                3. Managing Your Cookies
              </h2>
              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  You have full control over cookie preferences. You can:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-lavender-500 mt-0.5" />
                    <span className="text-gray-600"><strong>Browser Settings:</strong> Adjust your browser settings to block or allow cookies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-lavender-500 mt-0.5" />
                    <span className="text-gray-600"><strong>Cookie Banner:</strong> Use our cookie consent banner to customize preferences</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-lavender-500 mt-0.5" />
                    <span className="text-gray-600"><strong>Account Settings:</strong> Manage cookie preferences in your account dashboard</span>
                  </li>
                </ul>
                
                <div className="mt-6 p-4 bg-lavender-50 rounded-xl">
                  <p className="text-sm text-gray-600">
                    <strong>Note:</strong> Disabling certain cookies may affect website functionality and 
                    limit your ability to book appointments or complete purchases.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Shield className="w-6 h-6 text-lavender-500" />
                4. Cookie Retention
              </h2>
              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Different cookies have different retention periods:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-xl border">
                    <p className="font-semibold text-gray-800">Session Cookies</p>
                    <p className="text-sm text-gray-600">Deleted when you close your browser</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl border">
                    <p className="font-semibold text-gray-800">Persistent Cookies</p>
                    <p className="text-sm text-gray-600">Stored for up to 12 months</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl border">
                    <p className="font-semibold text-gray-800">Authentication</p>
                    <p className="text-sm text-gray-600">Valid for 30 days or until logout</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl border">
                    <p className="font-semibold text-gray-800">Analytics</p>
                    <p className="text-sm text-gray-600">Stored for 24 months maximum</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Trash2 className="w-6 h-6 text-lavender-500" />
                5. Third-Party Cookies
              </h2>
              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  We use trusted third-party services that may place cookies on your device:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-lavender-500 mt-0.5" />
                    <span className="text-gray-600"><strong>Payment Processors:</strong> Secure payment processing (Razorpay, Stripe)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-lavender-500 mt-0.5" />
                    <span className="text-gray-600"><strong>Analytics:</strong> Google Analytics for website improvement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-lavender-500 mt-0.5" />
                    <span className="text-gray-600"><strong>Supabase:</strong> Database and authentication services</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">6. Updates to This Policy</h2>
              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect changes in our practices 
                  or for operational, legal, or regulatory reasons. We will post any changes on this page 
                  and update the "Last Updated" date at the top.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">7. Contact Us</h2>
              <div className="bg-gradient-to-r from-lavender-50 to-purple-50 rounded-2xl p-6 border border-lavender-200">
                <p className="text-gray-600 mb-4">For questions about our Cookie Policy, contact us:</p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email:</strong> cookies@petscarehub.com</p>
                  <p><strong>Phone:</strong> +91 (1-888)-426-4435</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;