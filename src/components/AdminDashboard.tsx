import { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  Building2, 
  ShoppingCart, 
  LogOut, 
  Trash2, 
  RefreshCw,
  BarChart3,
  Clock,
  MessageSquare,
  AlertTriangle,
  X,
  Send,
  Plus
} from 'lucide-react';
import { adminService, AdminUser } from '../services/adminService';
import { communityService } from '../services/communityService';

interface DashboardStats {
  totalUsers: number;
  totalAppointments: number;
  totalClinics: number;
  totalServices: number;
  totalOrders: number;
  totalCommunityPosts: number;
  pendingAppointments: number;
  openIncidents: number;
}

const AdminDashboard = () => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalAppointments: 0,
    totalClinics: 0,
    totalServices: 0,
    totalOrders: 0,
    totalCommunityPosts: 0,
    pendingAppointments: 0,
    openIncidents: 0
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [clinics, setClinics] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [communityPosts, setCommunityPosts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [loadError, setLoadError] = useState<string>('');
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportForm, setReportForm] = useState({
    type: 'emergency',
    area: '',
    title: '',
    location: '',
    description: '',
    phone: '',
  });
  const [reportLoading, setReportLoading] = useState(false);
  const [reportMsg, setReportMsg] = useState<string | null>(null);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [showAddClinicModal, setShowAddClinicModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [addServiceForm, setAddServiceForm] = useState({ service_provider: '', service_address: '', contact_no: '', email: '', area: '' });
  const [addClinicForm, setAddClinicForm] = useState({ clinic_name: '', clinic_address: '', contact_no: '', email: '', vet_name: '', area: '' });
  const [addUserForm, setAddUserForm] = useState({ email: '', name: '' });
  const [addLoading, setAddLoading] = useState(false);
  const [addMsg, setAddMsg] = useState<string | null>(null);

  useEffect(() => {
    const currentAdmin = adminService.getCurrentAdmin();
    if (!currentAdmin) {
      window.location.href = '/admin/login';
      return;
    }
    setAdmin(currentAdmin);
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      console.log('Loading dashboard data...');
      setLoadError('');
      
      try {
        const u = await adminService.getAllUsers();
        setUsers(u);
        setStats(prev => ({ ...prev, totalUsers: u?.length || 0 }));
      } catch (e: any) {
        console.error('Error loading users:', e);
      }

      try {
        const a = await adminService.getAllAppointments();
        setAppointments(a);
        setStats(prev => ({ 
          ...prev, 
          totalAppointments: a?.length || 0,
          pendingAppointments: a?.filter((apt: any) => apt.status === 'scheduled').length || 0
        }));
      } catch (e: any) {
        console.error('Error loading appointments:', e);
      }

      try {
        const p = await adminService.getAllPets();
        setStats(prev => ({ ...prev, totalPets: p?.length || 0 }));
      } catch (e: any) {
        console.error('Error loading pets:', e);
      }

      try {
        const c = await adminService.getAllClinics();
        setClinics(c);
        setStats(prev => ({ ...prev, totalClinics: c?.length || 0 }));
      } catch (e: any) {
        console.error('Error loading clinics:', e);
      }

      try {
        const s = await adminService.getAllServices();
        setServices(s);
        setStats(prev => ({ ...prev, totalServices: s?.length || 0 }));
      } catch (e: any) {
        console.error('Error loading services:', e);
      }

      try {
        const cp = await adminService.getAllCommunityPosts();
        setCommunityPosts(cp);
        setStats(prev => ({ 
          ...prev, 
          totalCommunityPosts: cp?.length || 0,
          openIncidents: cp?.filter((post: any) => post.status === 'open').length || 0
        }));
      } catch (e: any) {
        console.error('Error loading community posts:', e);
      }

      try {
        const o = await adminService.getAllOrders();
        setOrders(o);
        setStats(prev => ({ ...prev, totalOrders: o?.length || 0 }));
      } catch (e: any) {
        console.error('Error loading orders:', e);
      }

    } catch (error: any) {
      console.error('Failed to load dashboard data:', error);
      setLoadError(`Error loading data: ${error?.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    adminService.logout();
    window.location.href = '/admin/login';
  };

  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState('');
  const handleSeedClinics = async () => {
    setSeeding(true);
    setSeedMsg('');
    try {
      const res = await adminService.seedClinics();
      setSeedMsg(`Seeded ${res.inserted} new clinic(s).`);
      await loadDashboardData();
    } catch (e: any) {
      setSeedMsg(e?.message || 'Failed to seed clinics');
    } finally {
      setSeeding(false);
    }
  };

  const [seedingSvc, setSeedingSvc] = useState(false);
  const [seedSvcMsg, setSeedSvcMsg] = useState('');
  const handleSeedServices = async () => {
    setSeedingSvc(true);
    setSeedSvcMsg('');
    try {
      const res = await adminService.seedServices();
      setSeedSvcMsg(`Seeded ${res.inserted} new service(s).`);
      await loadDashboardData();
    } catch (e: any) {
      setSeedSvcMsg(e?.message || 'Failed to seed services');
    } finally {
      setSeedingSvc(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-mint-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header (no title) */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div />
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'appointments', label: 'Appointments', icon: Calendar },
              { id: 'clinics', label: 'Clinics', icon: Building2 },
              { id: 'services', label: 'Services', icon: Building2 },
              { id: 'orders', label: 'Orders', icon: ShoppingCart },
              { id: 'community', label: 'Community Posts', icon: MessageSquare }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-mint-500 text-mint-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Centered welcome banner */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 font-poppins">
            Welcome back, {admin?.fname} {admin?.lname}
          </h2>
          <p className="text-gray-600 mt-1">Here is an overview of your platform</p>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalAppointments}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Clinics</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalClinics}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Services</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalServices}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Community Posts</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalCommunityPosts}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Open Incidents</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.openIncidents}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Appointments</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.pendingAppointments}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab('appointments')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <Calendar className="w-6 h-6 text-mint-600 mb-2" />
                  <h4 className="font-medium text-gray-800">Manage Appointments</h4>
                  <p className="text-sm text-gray-600">View and update appointment status</p>
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <Users className="w-6 h-6 text-blue-600 mb-2" />
                  <h4 className="font-medium text-gray-800">Manage Users</h4>
                  <p className="text-sm text-gray-600">View and manage user accounts</p>
                </button>
                <button
                  onClick={handleSeedClinics}
                  disabled={seeding}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left disabled:opacity-60"
                >
                  <Building2 className="w-6 h-6 text-purple-600 mb-2" />
                  <h4 className="font-medium text-gray-800">Seed Clinics</h4>
                  <p className="text-sm text-gray-600">Insert clinic list into database</p>
                  {seedMsg && <p className="text-xs text-gray-500 mt-1">{seedMsg}</p>}
                </button>

                <button
                  onClick={handleSeedServices}
                  disabled={seedingSvc}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left disabled:opacity-60"
                >
                  <Building2 className="w-6 h-6 text-purple-600 mb-2" />
                  <h4 className="font-medium text-gray-800">Seed Services</h4>
                  <p className="text-sm text-gray-600">Insert grooming services into database</p>
                  {seedSvcMsg && <p className="text-xs text-gray-500 mt-1">{seedSvcMsg}</p>}
                </button>

                <button
                  onClick={() => setActiveTab('community')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <MessageSquare className="w-6 h-6 text-teal-600 mb-2" />
                  <h4 className="font-medium text-gray-800">Community Posts</h4>
                  <p className="text-sm text-gray-600">View and manage community incidents</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Users List */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Users</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowAddUserModal(true)}
                  className="flex items-center space-x-2 px-3 py-2 bg-mint-500 text-white rounded-lg hover:bg-mint-600 transition-colors text-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add User</span>
                </button>
                <button
                  onClick={loadDashboardData}
                  className="flex items-center space-x-2 px-4 py-2 bg-mint-500 text-white rounded-lg hover:bg-mint-600 transition-colors text-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh</span>
                </button>
              </div>
            </div>
            {loadError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {loadError}
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-600 border-b">
                    <th className="py-2 pr-4">ID</th>
                    <th className="py-2 pr-4">Email</th>
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Provider</th>
                    <th className="py-2 pr-4">Created</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users && users.length > 0 ? (
                    users.map((u: any) => (
                      <tr key={u.user_id} className="border-b last:border-0">
                        <td className="py-2 pr-4">{u.user_id}</td>
                        <td className="py-2 pr-4">{u.email}</td>
                        <td className="py-2 pr-4">{u.name || '-'}</td>
                        <td className="py-2 pr-4">{u.auth_provider || '-'}</td>
                        <td className="py-2 pr-4">{new Date(u.created_at).toLocaleString()}</td>
                        <td className="py-2">
                          <button
                            onClick={async () => {
                              if (!confirm(`Delete user ${u.email}? This will also delete all their data.`)) return;
                              try {
                                console.log('Deleting user with ID:', u.user_id);
                                await adminService.deleteUser(u.user_id);
                                console.log('User deleted successfully');
                                await loadDashboardData();
                              } catch (err: any) {
                                console.error('Delete user error:', err);
                                alert('Failed to delete user: ' + (err.message || 'Unknown error. Please check console for details.'));
                              }
                            }}
                            className="p-2 hover:bg-red-100 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-4 text-center text-gray-500">
                        No users found. Click Refresh to reload.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Appointments List */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Appointments</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-600 border-b">
                    <th className="py-2 pr-4">ID</th>
                    <th className="py-2 pr-4">User</th>
                    <th className="py-2 pr-4">Contact</th>
                    <th className="py-2 pr-4">Clinic/Service</th>
                    <th className="py-2 pr-4">Address</th>
                    <th className="py-2 pr-4">Pet</th>
                    <th className="py-2 pr-4">Service</th>
                    <th className="py-2 pr-4">Date</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((a: any) => (
                    <tr key={a.appointment_id} className="border-b last:border-0">
                      <td className="py-2 pr-4">{a.appointment_id}</td>
                      <td className="py-2 pr-4">{a.user_name || a.app_user?.email || '-'}</td>
                      <td className="py-2 pr-4">{a.user_phone || '-'}</td>
                      <td className="py-2 pr-4">{a.clinic_name || (a.service_type === 'grooming' ? 'Grooming Service' : '-')}</td>
                      <td className="py-2 pr-4">{a.clinic_address || a.clinic?.clinic_address || '-'}</td>
                      <td className="py-2 pr-4">{a.pet_name || '-'}</td>
                      <td className="py-2 pr-4 capitalize">{a.service_type}</td>
                      <td className="py-2 pr-4">{new Date(a.appointment_date).toLocaleString()}</td>
                      <td className="py-2 pr-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          a.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                          a.status === 'completed' ? 'bg-green-100 text-green-800' :
                          a.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {a.status}
                        </span>
                      </td>
                      <td className="py-2">
                        {a.status === 'cancelled' ? (
                          <span className="text-gray-400 text-xs">Cancelled</span>
                        ) : (
                          <button
                            onClick={async () => {
                              if (!confirm(`Delete appointment for ${a.user_name || 'this user'} at ${a.clinic_name}?\n\nAn email will be sent to the user informing about the cancellation.`)) return;
                              try {
                                await adminService.deleteAppointment(a.appointment_id);
                                await loadDashboardData();
                                alert('Appointment deleted. User has been notified via email.');
                              } catch (err: any) {
                                alert('Failed to delete: ' + err.message);
                              }
                            }}
                            className="p-2 hover:bg-red-100 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Clinics List */}
        {activeTab === 'clinics' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Clinics</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowAddClinicModal(true)}
                  className="flex items-center space-x-2 px-3 py-2 bg-mint-500 text-white rounded-lg hover:bg-mint-600 transition-colors text-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Clinic</span>
                </button>
                <button
                  onClick={handleSeedClinics}
                  disabled={seeding}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs disabled:opacity-60"
                >
                  <span>{seeding ? 'Seeding...' : 'Seed All'}</span>
                </button>
                <button
                  onClick={loadDashboardData}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
            {seedMsg && <p className="text-sm text-green-600 mb-3">{seedMsg}</p>}
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-600 border-b">
                    <th className="py-2 pr-4">ID</th>
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Address</th>
                    <th className="py-2 pr-4">Contact</th>
                    <th className="py-2 pr-4">Vet</th>
                    <th className="py-2 pr-4">Area</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clinics.map((c: any) => (
                    <tr key={c.clinic_id} className="border-b last:border-0">
                      <td className="py-2 pr-4">{c.clinic_id}</td>
                      <td className="py-2 pr-4">{c.clinic_name}</td>
                      <td className="py-2 pr-4">{c.clinic_address}</td>
                      <td className="py-2 pr-4">{c.contact_no || '-'}</td>
                      <td className="py-2 pr-4">{c.vet_name || '-'}</td>
                      <td className="py-2 pr-4">{c.area || '-'}</td>
                      <td className="py-2">
                        <button
                          onClick={async () => {
                            if (!confirm(`Delete clinic ${c.clinic_name}?`)) return;
                            try {
                              await adminService.deleteClinic(c.clinic_id);
                              await loadDashboardData();
                            } catch (err: any) {
                              alert('Failed to delete: ' + err.message);
                            }
                          }}
                          className="p-2 hover:bg-red-100 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Services List */}
        {activeTab === 'services' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Grooming Services</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowAddServiceModal(true)}
                  className="flex items-center space-x-2 px-3 py-2 bg-mint-500 text-white rounded-lg hover:bg-mint-600 transition-colors text-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Service</span>
                </button>
                <button
                  onClick={handleSeedServices}
                  disabled={seedingSvc}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs disabled:opacity-60"
                >
                  <span>{seedingSvc ? 'Seeding...' : 'Seed All'}</span>
                </button>
                <button
                  onClick={loadDashboardData}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
            {seedSvcMsg && <p className="text-sm text-green-600 mb-3">{seedSvcMsg}</p>}
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-600 border-b">
                    <th className="py-2 pr-4">ID</th>
                    <th className="py-2 pr-4">Provider</th>
                    <th className="py-2 pr-4">Address</th>
                    <th className="py-2 pr-4">Contact</th>
                    <th className="py-2 pr-4">Area</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((s: any) => (
                    <tr key={s.service_id} className="border-b last:border-0">
                      <td className="py-2 pr-4">{s.service_id}</td>
                      <td className="py-2 pr-4">{s.service_provider}</td>
                      <td className="py-2 pr-4">{s.service_address}</td>
                      <td className="py-2 pr-4">{s.contact_no || '-'}</td>
                      <td className="py-2 pr-4">{s.area || '-'}</td>
                      <td className="py-2">
                        <button
                          onClick={async () => {
                            if (!confirm(`Delete service ${s.service_provider}?`)) return;
                            try {
                              await adminService.deleteService(s.service_id);
                              await loadDashboardData();
                            } catch (err: any) {
                              alert('Failed to delete: ' + err.message);
                            }
                          }}
                          className="p-2 hover:bg-red-100 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders List */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Orders</h3>
              <button
                onClick={loadDashboardData}
                className="flex items-center space-x-2 px-4 py-2 bg-mint-500 text-white rounded-lg hover:bg-mint-600 transition-colors text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-600 border-b">
                    <th className="py-2 pr-4">Order ID</th>
                    <th className="py-2 pr-4">Order Number</th>
                    <th className="py-2 pr-4">User</th>
                    <th className="py-2 pr-4">Total</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2 pr-4">Date</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map((o: any) => (
                      <tr key={o.order_id} className="border-b last:border-0">
                        <td className="py-2 pr-4">{o.order_id}</td>
                        <td className="py-2 pr-4">{o.order_number || '-'}</td>
                        <td className="py-2 pr-4">{o.user_name || '-'}</td>
                        <td className="py-2 pr-4">₹{o.total_amount || 0}</td>
                        <td className="py-2 pr-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            o.status === 'paid' ? 'bg-green-100 text-green-800' :
                            o.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            o.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {o.status}
                          </span>
                        </td>
                        <td className="py-2 pr-4">{new Date(o.created_at).toLocaleDateString()}</td>
                        <td className="py-2">
                          {o.status === 'cancelled' ? (
                            <button
                              onClick={async () => {
                                if (!confirm(`Delete order ${o.order_number}?`)) return;
                                try {
                                  await adminService.deleteOrder(o.order_id);
                                  await loadDashboardData();
                                } catch (err: any) {
                                  alert('Failed to delete: ' + err.message);
                                }
                              }}
                              className="p-2 hover:bg-red-100 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          ) : (
                            <span className="text-gray-400 text-xs">Active</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-4 text-center text-gray-500">
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Community Posts List */}
        {activeTab === 'community' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Community Posts & Incidents</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowReportModal(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>Report Incident</span>
                  </button>

                  <button
                    onClick={loadDashboardData}
                    className="flex items-center space-x-2 px-4 py-2 bg-mint-100 text-mint-700 rounded-lg hover:bg-mint-200 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Refresh</span>
                  </button>
                </div>
            </div>

            {communityPosts.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No community posts found</p>
              </div>
            ) : (
              <div className="flex h-[600px] border border-gray-200 rounded-xl overflow-hidden">
                {/* Chat list sidebar */}
                <div className="w-1/3 border-r border-gray-200 bg-gray-50 overflow-y-auto">
                  <div className="p-3 border-b border-gray-200 bg-white">
                    <h4 className="font-semibold text-gray-800">Messages</h4>
                  </div>
                  {communityPosts.map((post: any) => (
                    <div
                      key={post.post_id || post.id}
                      onClick={() => setSelectedPost(post)}
                      className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-100 ${
                        selectedPost?.post_id === post.post_id ? 'bg-mint-50 border-l-4 border-l-mint-500' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                          post.type === 'emergency' ? 'bg-red-500' :
                          post.type === 'help' ? 'bg-yellow-500' :
                          post.type === 'feeding' ? 'bg-green-500' :
                          post.type === 'medical' ? 'bg-purple-500' :
                          'bg-blue-500'
                        }`}>
                          {(post.user_name || 'A')[0].toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <p className="font-medium text-gray-800 truncate">{post.user_name || 'Anonymous'}</p>
                            <span className="text-xs text-gray-500">{new Date(post.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">{post.title}</p>
                          <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs ${
                            post.status === 'open' || post.status === 'urgent' ? 'bg-red-100 text-red-700' :
                            post.status === 'resolved' ? 'bg-green-100 text-green-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {post.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat detail view */}
                <div className="w-2/3 flex flex-col bg-white">
                  {selectedPost ? (
                    <>
                      <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                            selectedPost.type === 'emergency' ? 'bg-red-500' :
                            selectedPost.type === 'help' ? 'bg-yellow-500' :
                            selectedPost.type === 'feeding' ? 'bg-green-500' :
                            selectedPost.type === 'medical' ? 'bg-purple-500' :
                            'bg-blue-500'
                          }`}>
                            {(selectedPost.user_name || 'A')[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{selectedPost.user_name || 'Anonymous'}</p>
                            <p className="text-xs text-gray-500">{selectedPost.area || 'Unknown area'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            selectedPost.status === 'open' || selectedPost.status === 'urgent' ? 'bg-red-100 text-red-700' :
                            selectedPost.status === 'resolved' ? 'bg-green-100 text-green-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {selectedPost.status}
                          </span>
                          <button onClick={() => setSelectedPost(null)} className="p-1 hover:bg-gray-100 rounded">
                            <X className="w-5 h-5 text-gray-500" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex-1 p-4 overflow-y-auto">
                        <div className="bg-gray-100 rounded-2xl p-4 max-w-[80%]">
                          <span className={`inline-block mb-2 px-2 py-0.5 rounded text-xs font-medium ${
                            selectedPost.type === 'emergency' ? 'bg-red-200 text-red-800' :
                            selectedPost.type === 'help' ? 'bg-yellow-200 text-yellow-800' :
                            selectedPost.type === 'feeding' ? 'bg-green-200 text-green-800' :
                            selectedPost.type === 'medical' ? 'bg-purple-200 text-purple-800' :
                            'bg-blue-200 text-blue-800'
                          }`}>
                            {selectedPost.type?.toUpperCase()}
                          </span>
                          <h4 className="font-semibold text-gray-800 mb-2">{selectedPost.title}</h4>
                          <p className="text-gray-700 whitespace-pre-wrap">{selectedPost.description}</p>
                          {selectedPost.location && (
                            <p className="text-sm text-gray-500 mt-3 flex items-center gap-1">
                              <span className="font-medium">Location:</span> {selectedPost.location}
                            </p>
                          )}
                          {selectedPost.user_phone && (
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <span className="font-medium">Phone:</span> {selectedPost.user_phone}
                            </p>
                          )}
                          <p className="text-xs text-gray-400 mt-3">
                            Posted on {new Date(selectedPost.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 border-t border-gray-200">
                        <div className="flex gap-2">
                          {selectedPost.status !== 'resolved' && (
                            <button
                              onClick={async () => {
                                try {
                                  await adminService.updateCommunityPostStatus(selectedPost.post_id, 'resolved');
                                  await loadDashboardData();
                                  setSelectedPost({...selectedPost, status: 'resolved'});
                                } catch (err) {
                                  console.error('Failed to resolve:', err);
                                }
                              }}
                              className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
                            >
                              <Send className="w-4 h-4" />
                              Mark Resolved
                            </button>
                          )}
                          <button
                            onClick={async () => {
                              if (!confirm('Delete this post?')) return;
                              try {
                                await adminService.deleteCommunityPost(selectedPost.post_id);
                                await loadDashboardData();
                                setSelectedPost(null);
                              } catch (err) {
                                console.error('Failed to delete:', err);
                              }
                            }}
                            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p>Select a message to view details</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Report Incident Modal */}
            {showReportModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold">Report Incident</h4>
                      <p className="text-sm text-gray-500">Create an urgent community incident (admin).</p>
                    </div>
                    <button onClick={() => setShowReportModal(false)} className="text-gray-400 hover:text-gray-600">×</button>
                  </div>

                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    setReportMsg(null);
                    setReportLoading(true);
                    try {
                      const res = await communityService.createPost({
                        type: reportForm.type,
                        title: reportForm.title,
                        description: reportForm.description,
                        area: reportForm.area || 'General',
                        location: reportForm.location,
                        user_phone: reportForm.phone,
                      } as any);
                      if (res.success) {
                        setReportMsg('Incident reported successfully.');
                        setReportForm({ type: 'emergency', area: '', title: '', location: '', description: '', phone: '' });
                        await loadDashboardData();
                        setTimeout(() => setShowReportModal(false), 800);
                      } else {
                        setReportMsg(res.message || 'Failed to report incident');
                      }
                    } catch (err: any) {
                      setReportMsg(err?.message || 'Unknown error');
                    } finally {
                      setReportLoading(false);
                    }
                  }} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm text-gray-600">Incident Type</label>
                        <select name="type" value={reportForm.type} onChange={(e) => setReportForm(prev => ({ ...prev, type: e.target.value }))} className="mt-1 w-full px-3 py-2 border rounded-lg">
                          <option value="emergency">Emergency - Injured Animal</option>
                          <option value="help">Help Needed</option>
                          <option value="feeding">Feeding Drive</option>
                          <option value="medical">Medical Aid</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm text-gray-600">Area</label>
                        <input name="area" value={reportForm.area} onChange={(e) => setReportForm(prev => ({ ...prev, area: e.target.value }))} className="mt-1 w-full px-3 py-2 border rounded-lg" placeholder="e.g. Satellite" />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-600">Title</label>
                      <input name="title" value={reportForm.title} onChange={(e) => setReportForm(prev => ({ ...prev, title: e.target.value }))} className="mt-1 w-full px-3 py-2 border rounded-lg" placeholder="Brief title" />
                    </div>

                    <div>
                      <label className="text-sm text-gray-600">Exact Location</label>
                      <input name="location" value={reportForm.location} onChange={(e) => setReportForm(prev => ({ ...prev, location: e.target.value }))} className="mt-1 w-full px-3 py-2 border rounded-lg" placeholder="Street, landmark or address" />
                    </div>

                    <div>
                      <label className="text-sm text-gray-600">Description</label>
                      <textarea name="description" value={reportForm.description} onChange={(e) => setReportForm(prev => ({ ...prev, description: e.target.value }))} rows={4} className="mt-1 w-full px-3 py-2 border rounded-lg" placeholder="Provide detailed information about the incident"></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <input name="phone" value={reportForm.phone} onChange={(e) => setReportForm(prev => ({ ...prev, phone: e.target.value }))} className="mt-1 w-full px-3 py-2 border rounded-lg" placeholder="Your phone (optional)" />
                      <div className="flex items-end">
                        <button type="submit" disabled={reportLoading} className="w-full bg-red-500 text-white py-2 rounded-lg">
                          {reportLoading ? 'Sending...' : 'Submit Report'}
                        </button>
                      </div>
                    </div>

                    {reportMsg && (<div className="text-sm text-gray-700">{reportMsg}</div>)}
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-bold">Add New User</h4>
              <button onClick={() => setShowAddUserModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
            </div>
            <form onSubmit={async (e) => {
              e.preventDefault();
              setAddLoading(true);
              setAddMsg(null);
              try {
                await adminService.addUser(addUserForm);
                setAddMsg('User added successfully!');
                setAddUserForm({ email: '', name: '' });
                setTimeout(() => { setShowAddUserModal(false); loadDashboardData(); }, 1000);
              } catch (err: any) {
                setAddMsg(err.message || 'Failed to add user');
              } finally {
                setAddLoading(false);
              }
            }} className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Email *</label>
                <input type="email" required value={addUserForm.email} onChange={(e) => setAddUserForm(prev => ({ ...prev, email: e.target.value }))} className="mt-1 w-full px-3 py-2 border rounded-lg" placeholder="user@example.com" />
              </div>
              <div>
                <label className="text-sm text-gray-600">Name</label>
                <input type="text" value={addUserForm.name} onChange={(e) => setAddUserForm(prev => ({ ...prev, name: e.target.value }))} className="mt-1 w-full px-3 py-2 border rounded-lg" placeholder="Full name" />
              </div>
              {addMsg && <p className="text-sm text-gray-700">{addMsg}</p>}
              <button type="submit" disabled={addLoading} className="w-full bg-mint-500 text-white py-2 rounded-lg hover:bg-mint-600 disabled:opacity-60">
                {addLoading ? 'Adding...' : 'Add User'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Service Modal */}
      {showAddServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-bold">Add Grooming Service</h4>
              <button onClick={() => setShowAddServiceModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
            </div>
            <form onSubmit={async (e) => {
              e.preventDefault();
              setAddLoading(true);
              setAddMsg(null);
              try {
                await adminService.addService(addServiceForm);
                setAddMsg('Service added successfully!');
                setAddServiceForm({ service_provider: '', service_address: '', contact_no: '', email: '', area: '' });
                setTimeout(() => { setShowAddServiceModal(false); loadDashboardData(); }, 1000);
              } catch (err: any) {
                setAddMsg(err.message || 'Failed to add service');
              } finally {
                setAddLoading(false);
              }
            }} className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Service Provider *</label>
                <input type="text" required value={addServiceForm.service_provider} onChange={(e) => setAddServiceForm(prev => ({ ...prev, service_provider: e.target.value }))} className="mt-1 w-full px-3 py-2 border rounded-lg" placeholder="Provider name" />
              </div>
              <div>
                <label className="text-sm text-gray-600">Address *</label>
                <input type="text" required value={addServiceForm.service_address} onChange={(e) => setAddServiceForm(prev => ({ ...prev, service_address: e.target.value }))} className="mt-1 w-full px-3 py-2 border rounded-lg" placeholder="Full address" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-600">Contact</label>
                  <input type="text" value={addServiceForm.contact_no} onChange={(e) => setAddServiceForm(prev => ({ ...prev, contact_no: e.target.value }))} className="mt-1 w-full px-3 py-2 border rounded-lg" placeholder="+91 xxx" />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Area</label>
                  <input type="text" value={addServiceForm.area} onChange={(e) => setAddServiceForm(prev => ({ ...prev, area: e.target.value }))} className="mt-1 w-full px-3 py-2 border rounded-lg" placeholder="Area" />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <input type="email" value={addServiceForm.email} onChange={(e) => setAddServiceForm(prev => ({ ...prev, email: e.target.value }))} className="mt-1 w-full px-3 py-2 border rounded-lg" placeholder="service@example.com" />
              </div>
              {addMsg && <p className="text-sm text-gray-700">{addMsg}</p>}
              <button type="submit" disabled={addLoading} className="w-full bg-mint-500 text-white py-2 rounded-lg hover:bg-mint-600 disabled:opacity-60">
                {addLoading ? 'Adding...' : 'Add Service'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Clinic Modal */}
      {showAddClinicModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-bold">Add Clinic</h4>
              <button onClick={() => setShowAddClinicModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
            </div>
            <form onSubmit={async (e) => {
              e.preventDefault();
              setAddLoading(true);
              setAddMsg(null);
              try {
                await adminService.addClinic(addClinicForm);
                setAddMsg('Clinic added successfully!');
                setAddClinicForm({ clinic_name: '', clinic_address: '', contact_no: '', email: '', vet_name: '', area: '' });
                setTimeout(() => { setShowAddClinicModal(false); loadDashboardData(); }, 1000);
              } catch (err: any) {
                setAddMsg(err.message || 'Failed to add clinic');
              } finally {
                setAddLoading(false);
              }
            }} className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Clinic Name *</label>
                <input type="text" required value={addClinicForm.clinic_name} onChange={(e) => setAddClinicForm(prev => ({ ...prev, clinic_name: e.target.value }))} className="mt-1 w-full px-3 py-2 border rounded-lg" placeholder="Clinic name" />
              </div>
              <div>
                <label className="text-sm text-gray-600">Address *</label>
                <input type="text" required value={addClinicForm.clinic_address} onChange={(e) => setAddClinicForm(prev => ({ ...prev, clinic_address: e.target.value }))} className="mt-1 w-full px-3 py-2 border rounded-lg" placeholder="Full address" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-600">Contact</label>
                  <input type="text" value={addClinicForm.contact_no} onChange={(e) => setAddClinicForm(prev => ({ ...prev, contact_no: e.target.value }))} className="mt-1 w-full px-3 py-2 border rounded-lg" placeholder="+91 xxx" />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Vet Name</label>
                  <input type="text" value={addClinicForm.vet_name} onChange={(e) => setAddClinicForm(prev => ({ ...prev, vet_name: e.target.value }))} className="mt-1 w-full px-3 py-2 border rounded-lg" placeholder="Dr. Name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-600">Area</label>
                  <input type="text" value={addClinicForm.area} onChange={(e) => setAddClinicForm(prev => ({ ...prev, area: e.target.value }))} className="mt-1 w-full px-3 py-2 border rounded-lg" placeholder="Area" />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <input type="email" value={addClinicForm.email} onChange={(e) => setAddClinicForm(prev => ({ ...prev, email: e.target.value }))} className="mt-1 w-full px-3 py-2 border rounded-lg" placeholder="clinic@example.com" />
                </div>
              </div>
              {addMsg && <p className="text-sm text-gray-700">{addMsg}</p>}
              <button type="submit" disabled={addLoading} className="w-full bg-mint-500 text-white py-2 rounded-lg hover:bg-mint-600 disabled:opacity-60">
                {addLoading ? 'Adding...' : 'Add Clinic'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
