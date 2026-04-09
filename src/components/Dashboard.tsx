import React, { useState, useEffect } from 'react';
import { User, Calendar, ShoppingBag, Bell, Heart, Settings, Package, Trash2, X, MessageCircle, Clock, Eye, EyeOff, CheckCircle, MapPin, Phone, Mail, Clock3, FileText, PawPrint } from 'lucide-react';
import {
  getUserAppointments,
  getUserGroomingAppointments,
  cancelAppointment,
  deleteAppointment,
  getUserOrders,
  cancelOrder,
  getUserEventRegistrations,
  getUserCommunityPosts,
  deleteUserCommunityPost,
  updateUserProfile
} from '../services/userDashboardService';
import { authService } from '../services/authService';
import { supabase } from '../utils/supabaseClient';

interface UserData {
  id?: string;
  email?: string;
  name?: string;
}

interface SettingsModalProps {
  show: boolean;
  onClose: () => void;
  user: UserData | null;
  onUpdate: (newName: string, newEmail: string) => void;
}

interface AppointmentDetailModalProps {
  show: boolean;
  appointment: any;
  onClose: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

const AppointmentDetailModal: React.FC<AppointmentDetailModalProps> = ({ show, appointment, onClose, onCancel, onDelete }) => {
  if (!show || !appointment) return null;

  const isClinic = appointment.service_type === 'vet';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-sky-600 to-sky-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Appointment Details</h3>
              <p className="text-sky-100">Booking Reference: #{appointment.appointment_id}</p>
            </div>
            <button onClick={onClose} className="p-2 bg-white/20 rounded-lg hover:bg-white/30">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isClinic ? 'bg-blue-100' : 'bg-orange-100'}`}>
              {isClinic ? <PawPrint className="w-6 h-6 text-blue-600" /> : <FileText className="w-6 h-6 text-orange-600" />}
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800">{isClinic ? 'Veterinary Clinic Visit' : 'Grooming Service'}</h4>
              <span className={`px-3 py-1 rounded-full text-sm ${appointment.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' : appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                {appointment.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h5 className="font-semibold text-gray-800 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-600" /> Date & Time
              </h5>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-lg font-bold text-gray-800">{new Date(appointment.appointment_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="text-sky-600 font-semibold">{new Date(appointment.appointment_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
              </div>

              {appointment.pet_name && (
                <div>
                  <h5 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                    <PawPrint className="w-4 h-4 text-sky-600" /> Pet Details
                  </h5>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-gray-800"><span className="font-medium">Name:</span> {appointment.pet_name}</p>
                    {appointment.pet_breed && <p className="text-gray-600"><span className="font-medium">Breed:</span> {appointment.pet_breed}</p>}
                    {appointment.pet_age && <p className="text-gray-600"><span className="font-medium">Age:</span> {appointment.pet_age}</p>}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-sky-600" /> {isClinic ? 'Clinic' : 'Service Provider'}
                </h5>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-gray-800 font-semibold">{appointment.clinic_name || 'Not specified'}</p>
                  <p className="text-gray-600 text-sm mt-1">{appointment.clinic_address || 'Address not available'}</p>
                </div>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-sky-600" /> Reason for Visit
                </h5>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-gray-700">{appointment.reason || 'General checkup'}</p>
                </div>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                  <Clock3 className="w-4 h-4 text-sky-600" /> Booked On
                </h5>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-gray-600">{appointment.created_at ? new Date(appointment.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {appointment.status === 'scheduled' && (
            <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3 justify-end">
              <button onClick={onCancel} className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 font-medium">
                Cancel Appointment
              </button>
              <button onClick={onDelete} className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SettingsModal: React.FC<SettingsModalProps> = ({ show, onClose, user, onUpdate }) => {
  const [activeSection, setActiveSection] = useState<'name' | 'email'>('name');
  const [nameInput, setNameInput] = useState(user?.name || '');
  const [emailInput, setEmailInput] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [newEmailVerified, setNewEmailVerified] = useState(false);
  const [pendingNewEmail, setPendingNewEmail] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [verificationStep, setVerificationStep] = useState<'old' | 'new'>('old');

  useEffect(() => {
    if (show) {
      setNameInput(user?.name || '');
      setEmailInput(user?.email || '');
      setOtpSent(false);
      setOtpVerified(false);
      setOtp('');
      setNewEmailVerified(false);
      setPendingNewEmail('');
      setShowOtpField(false);
      setVerificationStep('old');
      setError('');
      setSuccess('');
    }
  }, [show, user]);

  const handleNameChange = async () => {
    if (!nameInput.trim()) {
      setError('Name cannot be empty');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await onUpdate(nameInput.trim(), user?.email || '');
      setSuccess('Name updated successfully!');
      setTimeout(() => {
        setSuccess('');
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to update name');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOldEmailOTP = async () => {
    if (!user?.email) return;
    setLoading(true);
    setError('');
    try {
      const result = await authService.sendOTP(user.email, 'login');
      if (result.success) {
        setOtpSent(true);
        setShowOtpField(true);
        setVerificationStep('old');
        setSuccess('OTP sent to your current email');
      } else {
        setError(result.message || 'Failed to send OTP');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOldEmailOTP = async () => {
    if (!user?.email || !otp) return;
    setLoading(true);
    setError('');
    try {
      const result = await authService.verifyOTP(user.email, otp, 'login');
      if (result.success) {
        setOtpVerified(true);
        setShowOtpField(false);
        setOtp('');
        setSuccess('Email verified! Now enter your new email');
        setActiveSection('email');
        setVerificationStep('new');
      } else {
        setError(result.message || 'Invalid OTP');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleSendNewEmailOTP = async () => {
    if (!emailInput.trim() || emailInput === user?.email) {
      setError('Please enter a new email address');
      return;
    }
    if (!emailInput.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const result = await authService.sendOTP(emailInput.trim(), 'register');
      if (result.success) {
        setPendingNewEmail(emailInput.trim());
        setOtpSent(true);
        setShowOtpField(true);
        setSuccess('OTP sent to your new email');
      } else {
        setError(result.message || 'Failed to send OTP');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyNewEmailOTP = async () => {
    if (!pendingNewEmail || !otp) return;
    setLoading(true);
    setError('');
    try {
      const result = await authService.verifyOTP(pendingNewEmail, otp, 'register');
      if (result.success) {
        setNewEmailVerified(true);
        await onUpdate(user?.name || '', pendingNewEmail);
        setSuccess('Email updated successfully!');
        setTimeout(() => {
          setSuccess('');
          onClose();
        }, 1500);
      } else {
        setError(result.message || 'Invalid OTP');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-lg">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-bold text-gray-800">Settings</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveSection('name')}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                activeSection === 'name' ? 'bg-sky-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Change Name
            </button>
            <button
              onClick={() => setActiveSection('email')}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                activeSection === 'email' ? 'bg-sky-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Change Email
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              {success}
            </div>
          )}

          {activeSection === 'name' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Name</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <button
                onClick={handleNameChange}
                disabled={loading || !nameInput.trim()}
                className="w-full py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Updating...' : 'Update Name'}
              </button>
            </div>
          )}

          {activeSection === 'email' && (
            <div className="space-y-4">
              {!otpVerified ? (
                <>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      To change your email, we need to verify your current email first. An OTP will be sent to {user?.email}
                    </p>
                  </div>
                  {!showOtpField ? (
                    <button
                      onClick={handleSendOldEmailOTP}
                      disabled={loading}
                      className="w-full py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50 transition-colors"
                    >
                      {loading ? 'Sending...' : 'Send OTP to Current Email'}
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">Enter the OTP sent to {user?.email}</p>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-center text-lg tracking-wider"
                        placeholder="Enter 6-digit OTP"
                      />
                      <button
                        onClick={handleVerifyOldEmailOTP}
                        disabled={loading || otp.length !== 6}
                        className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                      >
                        {loading ? 'Verifying...' : 'Verify OTP'}
                      </button>
                    </div>
                  )}
                </>
              ) : !newEmailVerified ? (
                <>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Current email verified! Now enter your new email.
                    </p>
                  </div>
                  {!showOtpField ? (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Email Address</label>
                        <input
                          type="email"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                          placeholder="newemail@example.com"
                        />
                      </div>
                      <button
                        onClick={handleSendNewEmailOTP}
                        disabled={loading || !emailInput.trim() || emailInput === user?.email}
                        className="w-full py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50 transition-colors"
                      >
                        {loading ? 'Sending...' : 'Send OTP to New Email'}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">Enter the OTP sent to {pendingNewEmail}</p>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-center text-lg tracking-wider"
                        placeholder="Enter 6-digit OTP"
                      />
                      <button
                        onClick={handleVerifyNewEmailOTP}
                        disabled={loading || otp.length !== 6}
                        className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                      >
                        {loading ? 'Verifying...' : 'Verify & Update Email'}
                      </button>
                    </div>
                  )}
                </>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [groomingAppointments, setGroomingAppointments] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [eventRegistrations, setEventRegistrations] = useState<any[]>([]);
  const [communityPosts, setCommunityPosts] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [deleteModal, setDeleteModal] = useState<{ show: boolean; type: string; id: number; title: string }>({ show: false, type: '', id: 0, title: '' });
  const [successMsg, setSuccessMsg] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  const handleUserUpdate = async (newName: string, newEmail: string) => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) return;

    const oldEmail = currentUser.email;

    try {
      if (newEmail !== oldEmail) {
        const { error } = await supabase
          .from('app_user')
          .update({ name: newName, email: newEmail })
          .eq('email', oldEmail);

        if (error) throw error;

        await supabase
          .from('order')
          .update({ user_name: newName, user_email: newEmail })
          .eq('user_email', oldEmail);

        await supabase
          .from('appointment')
          .update({ user_name: newName })
          .eq('user_email', oldEmail);

        await supabase
          .from('community_post')
          .update({ user_name: newName, user_email: newEmail })
          .eq('user_email', oldEmail);

        await supabase
          .from('event_registration')
          .update({ user_name: newName, user_email: newEmail })
          .eq('user_email', oldEmail);
      } else {
        const { error } = await supabase
          .from('app_user')
          .update({ name: newName })
          .eq('email', oldEmail);

        if (error) throw error;

        await supabase
          .from('order')
          .update({ user_name: newName })
          .eq('user_email', oldEmail);

        await supabase
          .from('appointment')
          .update({ user_name: newName })
          .eq('user_email', oldEmail);

        await supabase
          .from('community_post')
          .update({ user_name: newName })
          .eq('user_email', oldEmail);

        await supabase
          .from('event_registration')
          .update({ user_name: newName })
          .eq('user_email', oldEmail);
      }

      const updatedUser = { ...currentUser, name: newName, email: newEmail || oldEmail };
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (err) {
      console.error('Error updating profile:', err);
      throw err;
    }
  };

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [apt, groom, ord, events, posts] = await Promise.all([
        getUserAppointments(),
        getUserGroomingAppointments(),
        getUserOrders(),
        getUserEventRegistrations(),
        getUserCommunityPosts()
      ]);
      
      setAppointments(apt || []);
      setGroomingAppointments(groom || []);
      setOrders(ord || []);
      setEventRegistrations(events || []);
      setCommunityPosts(posts || []);

      const notifs = [];
      const now = new Date();
      
      apt?.forEach((a: any) => {
        if (a.status === 'scheduled') {
          const aptDate = new Date(a.appointment_date);
          const diffDays = Math.ceil((aptDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
          if (diffDays >= 0 && diffDays <= 3) {
            notifs.push({ type: 'appointment', message: `Appointment for ${a.pet_name || 'pet'} at ${a.clinic_name} in ${diffDays} day(s)`, urgent: diffDays <= 1 });
          }
        }
      });
      
      ord?.forEach((o: any) => {
        if (o.status === 'paid') {
          notifs.push({ type: 'order', message: `Order ${o.order_number} - Status: ${o.status}`, urgent: false });
        }
      });

      setNotifications(notifs);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (id: number) => {
    try {
      await cancelAppointment(id);
      setSuccessMsg('Appointment cancelled successfully');
      setTimeout(() => setSuccessMsg(''), 3000);
      loadDashboardData();
    } catch (err: any) {
      alert('Failed to cancel: ' + err.message);
    }
  };

  const handleDeleteAppointment = async (id: number) => {
    try {
      await deleteAppointment(id);
      setSuccessMsg('Appointment deleted successfully');
      setTimeout(() => setSuccessMsg(''), 3000);
      loadDashboardData();
    } catch (err: any) {
      alert('Failed to delete: ' + err.message);
    }
  };

  const handleCancelOrder = async (id: number) => {
    try {
      await cancelOrder(id);
      setSuccessMsg('Order cancelled successfully');
      setTimeout(() => setSuccessMsg(''), 3000);
      loadDashboardData();
    } catch (err: any) {
      alert('Failed to cancel: ' + err.message);
    }
  };

  const handleDeletePost = async (id: number) => {
    try {
      await deleteUserCommunityPost(id);
      setSuccessMsg('Post deleted successfully');
      setTimeout(() => setSuccessMsg(''), 3000);
      loadDashboardData();
    } catch (err: any) {
      alert('Failed to delete: ' + err.message);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Heart },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'grooming', label: 'Grooming', icon: Calendar },
    { id: 'orders', label: 'Track Order', icon: Package },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'community', label: 'My Posts', icon: MessageCircle },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  const clinicAppointments = appointments.filter(a => a.service_type === 'vet');
  const groomingApts = [...appointments.filter(a => a.service_type === 'grooming'), ...groomingAppointments];

  return (
    <section id="dashboard" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Your Pet Care Dashboard</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Manage all aspects of your pet's care from one convenient location.</p>
        </div>

        {successMsg && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 flex items-center gap-2">
            <Heart className="w-5 h-5" />
            {successMsg}
          </div>
        )}

        <div className="bg-gray-50 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-sky-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Welcome back, {user?.name || 'User'}!</h3>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            <button onClick={() => setShowSettings(true)} className="flex items-center space-x-2 px-6 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </div>

          <div className="flex space-x-2 mb-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-sky-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-sky-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <Calendar className="w-8 h-8" />
                      <span className="text-2xl font-bold">{clinicAppointments.filter(a => a.status === 'scheduled').length}</span>
                    </div>
                    <h4 className="font-semibold mb-1">Upcoming</h4>
                    <p className="text-sky-100">Clinic Appointments</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <Package className="w-8 h-8" />
                      <span className="text-2xl font-bold">{orders.filter(o => o.status === 'paid').length}</span>
                    </div>
                    <h4 className="font-semibold mb-1">Active</h4>
                    <p className="text-orange-100">Orders</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <Calendar className="w-8 h-8" />
                      <span className="text-2xl font-bold">{eventRegistrations.length}</span>
                    </div>
                    <h4 className="font-semibold mb-1">Registered</h4>
                    <p className="text-green-100">Events</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h4>
                  <div className="space-y-4">
                    {notifications.slice(0, 5).map((notif, idx) => (
                      <div key={idx} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                        <div className={`w-2 h-2 rounded-full ${notif.urgent ? 'bg-red-500' : 'bg-green-500'}`}></div>
                        <span className="text-gray-700">{notif.message}</span>
                        <span className="text-sm text-gray-500 ml-auto capitalize">{notif.type}</span>
                      </div>
                    ))}
                    {notifications.length === 0 && (
                      <p className="text-gray-500">No recent activity</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appointments' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Clinic Appointments</h3>
                {clinicAppointments.length > 0 ? (
                  clinicAppointments.map((appointment, index) => (
                    <div 
                      key={index} 
                      onClick={() => setSelectedAppointment(appointment)}
                      className="flex items-center justify-between p-6 border border-gray-200 rounded-xl cursor-pointer hover:border-sky-300 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <PawPrint className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{appointment.reason || 'General Checkup'}</div>
                          <div className="text-sm text-gray-600">{appointment.pet_name || 'Pet'} • {appointment.clinic_name || 'Clinic'}</div>
                          <div className="text-sm text-gray-500">{appointment.clinic_address}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-800">{new Date(appointment.appointment_date).toLocaleDateString()}</div>
                        <div className="text-sm text-sky-600">{new Date(appointment.appointment_date).toLocaleTimeString()}</div>
                        <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs ${appointment.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' : appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                          {appointment.status}
                        </span>
                      </div>
                      <div className="ml-4">
                        <Eye className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">No clinic appointments found</p>
                )}
              </div>
            )}

            {activeTab === 'grooming' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Grooming Appointments</h3>
                {groomingApts.length > 0 ? (
                  groomingApts.map((apt, index) => (
                    <div 
                      key={index} 
                      onClick={() => setSelectedAppointment(apt)}
                      className="flex items-center justify-between p-6 border border-gray-200 rounded-xl cursor-pointer hover:border-orange-300 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                          <FileText className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">Grooming Service</div>
                          <div className="text-sm text-gray-600">{apt.pet_name || 'Pet'} • {apt.clinic_name || 'Service Provider'}</div>
                          <div className="text-sm text-gray-500">{apt.clinic_address}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-800">{new Date(apt.appointment_date).toLocaleDateString()}</div>
                        <div className="text-sm text-orange-600">{new Date(apt.appointment_date).toLocaleTimeString()}</div>
                        <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs ${apt.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' : apt.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                          {apt.status}
                        </span>
                      </div>
                      <div className="ml-4">
                        <Eye className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">No grooming appointments found</p>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Track Your Orders</h3>
                {orders.length > 0 ? (
                  orders.map((order, index) => (
                    <div key={index} className="p-6 border border-gray-200 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="font-semibold text-gray-800">{order.order_number}</div>
                          <div className="text-sm text-gray-600">Total: ₹{order.total_amount}</div>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm ${order.status === 'paid' ? 'bg-green-100 text-green-800' : order.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {order.status}
                          </span>
                          <div className="text-sm text-gray-500 mt-1">{new Date(order.created_at).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-4">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className={`h-2 rounded-full ${order.status === 'paid' ? 'bg-green-500 w-3/4' : order.status === 'cancelled' ? 'bg-red-500 w-full' : 'bg-yellow-500 w-1/4'}`}></div>
                        </div>
                        <span className="text-sm text-gray-600">
                          {order.status === 'paid' ? 'In Transit' : order.status === 'cancelled' ? 'Cancelled' : 'Processing'}
                        </span>
                      </div>
                      {order.status === 'paid' && (
                        <div className="mt-4 flex gap-2">
                          <button onClick={() => handleCancelOrder(order.order_id)} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">Cancel Order</button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">No orders found</p>
                )}
              </div>
            )}

            {activeTab === 'events' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Your Event Registrations</h3>
                {eventRegistrations.length > 0 ? (
                  eventRegistrations.map((event, index) => (
                    <div key={index} className="p-6 border border-gray-200 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-800">{event.event_title}</div>
                          <div className="text-sm text-gray-600">Type: {event.event_type}</div>
                          {event.pet_name && <div className="text-sm text-gray-600">Pet: {event.pet_name}</div>}
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm ${event.status === 'registered' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {event.status}
                          </span>
                          <div className="text-sm text-gray-500 mt-1">{new Date(event.created_at).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">No event registrations found</p>
                )}
              </div>
            )}

            {activeTab === 'community' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-6">My Community Posts</h3>
                {communityPosts.length > 0 ? (
                  communityPosts.map((post, index) => (
                    <div key={index} className="p-6 border border-gray-200 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${post.type === 'emergency' ? 'bg-red-100 text-red-800' : post.type === 'help' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                              {post.type}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs ${post.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                              {post.status}
                            </span>
                          </div>
                          <div className="font-semibold text-gray-800">{post.title}</div>
                          <div className="text-sm text-gray-600 mt-1">{post.description}</div>
                          {post.location && <div className="text-sm text-gray-500 mt-1">Location: {post.location}</div>}
                        </div>
                        <div className="ml-4 text-right">
                          <div className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString()}</div>
                          <button onClick={() => setDeleteModal({ show: true, type: 'post', id: post.post_id, title: post.title })} className="mt-2 p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">You haven't posted anything yet</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Notifications</h3>
                {notifications.length > 0 ? (
                  notifications.map((notif, index) => (
                    <div key={index} className={`flex items-center space-x-4 p-4 rounded-xl ${notif.urgent ? 'bg-red-50 border border-red-200' : 'bg-gray-50'}`}>
                      <Bell className={`w-5 h-5 ${notif.urgent ? 'text-red-500' : 'text-gray-500'}`} />
                      <div className="flex-1">
                        <p className={`${notif.urgent ? 'text-red-800' : 'text-gray-700'}`}>{notif.message}</p>
                        <span className="text-xs text-gray-500 capitalize">{notif.type}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">No notifications</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {deleteModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-bold text-gray-800">Confirm Delete</h4>
              <button onClick={() => setDeleteModal({ show: false, type: '', id: 0, title: '' })} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">Are you sure you want to delete "{deleteModal.title}"? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteModal({ show: false, type: '', id: 0, title: '' })} className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={async () => {
                if (deleteModal.type === 'appointment' || deleteModal.type === 'grooming') {
                  await handleDeleteAppointment(deleteModal.id);
                } else if (deleteModal.type === 'post') {
                  await handleDeletePost(deleteModal.id);
                }
                setDeleteModal({ show: false, type: '', id: 0, title: '' });
              }} className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}

      <SettingsModal
        show={showSettings}
        onClose={() => setShowSettings(false)}
        user={user}
        onUpdate={handleUserUpdate}
      />

      <AppointmentDetailModal
        show={!!selectedAppointment}
        appointment={selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
        onCancel={() => {
          if (selectedAppointment) {
            handleCancelAppointment(selectedAppointment.appointment_id);
            setSelectedAppointment(null);
          }
        }}
        onDelete={() => {
          if (selectedAppointment) {
            setDeleteModal({ show: true, type: 'appointment', id: selectedAppointment.appointment_id, title: selectedAppointment.reason || 'Appointment' });
            setSelectedAppointment(null);
          }
        }}
      />
    </section>
  );
};

export default Dashboard;