import React, { useState, useEffect } from 'react';
import { Users, MessageCircle, MapPin, AlertTriangle, Camera, Send, Heart, Filter, Search, Phone } from 'lucide-react';
import { communityService } from '../services/communityService';

const communityPostsInitial = [
  {
    id: 1,
    type: 'emergency',
    title: 'Injured Dog Found on Main Street',
    area: 'Satellite',
    author: 'Priya Sharma',
    time: '15 minutes ago',
    description: 'Found an injured stray dog near the bus stop on Main Street. Appears to have a leg injury. Need immediate rescue assistance.',
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Main Street Bus Stop, Satellite',
    status: 'urgent',
    responses: 8,
    emoji: 'Emergency'
  },
  {
    id: 2,
    type: 'death',
    title: 'Dog Death Reported - Road Accident',
    area: 'Satellite',
    author: 'Rajesh Kumar',
    time: '2 hours ago',
    description: 'A street dog was hit by a vehicle near the market area. Body needs to be removed and proper burial arranged. Very sad incident.',
    location: 'Market Road, Satellite',
    status: 'resolved',
    responses: 12,
    emoji: 'Report'
  },
  {
    id: 3,
    type: 'help',
    title: 'Lost Cat - Please Help Find',
    area: 'Vastrapur',
    author: 'Sarah Johnson',
    time: '4 hours ago',
    description: 'My cat "Whiskers" has been missing since yesterday evening. Orange tabby with white chest. Last seen near the park.',
    image: 'https://images.pexels.com/photos/156934/pexels-photo-156934.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Central Park Area, Vastrapur',
    status: 'active',
    responses: 15,
    emoji: 'Help'
  },
  {
    id: 4,
    type: 'feeding',
    title: 'Daily Feeding Drive - Volunteers Needed',
    area: 'Bopal',
    author: 'Animal Welfare Group',
    time: '6 hours ago',
    description: 'We feed stray animals every evening at 6 PM. Looking for more volunteers to help with food distribution.',
    location: 'Bopal Community Park',
    status: 'ongoing',
    responses: 23,
    emoji: 'Feeding'
  },
  {
    id: 5,
    type: 'medical',
    title: 'Free Vaccination Camp This Weekend',
    area: 'Prahlad Nagar',
    author: 'Dr. Michael Chen',
    time: '1 day ago',
    description: 'Free vaccination and health checkup for stray animals. Bring any sick animals you know of in the area.',
    location: 'Prahlad Nagar Community Center',
    status: 'upcoming',
    responses: 31,
    emoji: 'Medical'
  }
];

const CommunityPage = () => {
  const [selectedArea, setSelectedArea] = useState('All Areas');
  const [showReportForm, setShowReportForm] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [postsLoaded, setPostsLoaded] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'emergency',
    area: 'Satellite',
    title: '',
    location: '',
    description: '',
    phone: '',
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [selectedPost, setSelectedPost] = useState<any>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const getEmojiForType = (type: string) => {
    switch (type) {
      case 'emergency': return 'Emergency';
      case 'death': return 'Report';
      case 'help': return 'Help';
      case 'feeding': return 'Feeding';
      case 'medical': return 'Medical';
      default: return 'General';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent': return 'bg-red-100 text-red-700 border-red-200';
      case 'resolved': return 'bg-green-100 text-green-700 border-green-200';
      case 'active': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'ongoing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'upcoming': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'emergency': return 'from-red-400 to-red-500';
      case 'death': return 'from-gray-600 to-gray-700';
      case 'help': return 'from-blue-400 to-blue-500';
      case 'feeding': return 'from-green-400 to-green-500';
      case 'medical': return 'from-purple-400 to-purple-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const loadPosts = async () => {
    try {
      const supabasePosts = await communityService.getAllPosts();
      
      if (supabasePosts && supabasePosts.length > 0) {
        const transformedPosts = supabasePosts.map((post: any) => {
          try {
            return {
              id: post.post_id || post.id,
              type: post.type || 'general',
              title: post.title,
              area: post.area && post.area !== 'N/A' ? post.area : 'General',
              author: post.user_name || 'Community Member',
              time: post.created_at ? formatTimeAgo(post.created_at) : 'Just now',
              description: post.description,
              location: post.location || 'Not specified',
              status: post.status || 'active',
              responses: 0,
              emoji: getEmojiForType(post.type),
              user_phone: post.user_phone,
              created_at: post.created_at
            };
          } catch (err) {
            return null;
          }
        }).filter((p: any) => p !== null);
        
        setPosts([...transformedPosts, ...communityPostsInitial]);
      } else {
        setPosts(communityPostsInitial);
      }
      setPostsLoaded(true);
    } catch (error) {
      console.error('Error loading posts:', error);
      setPosts(communityPostsInitial);
      setPostsLoaded(true);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    setFormLoading(true);

    try {
      if (!formData.title.trim()) {
        setFormError('Title is required');
        setFormLoading(false);
        return;
      }
      if (!formData.description.trim()) {
        setFormError('Description is required');
        setFormLoading(false);
        return;
      }
      if (!formData.location.trim()) {
        setFormError('Location is required');
        setFormLoading(false);
        return;
      }

      const result = await communityService.createPost({
        type: formData.type,
        title: formData.title,
        description: formData.description,
        area: formData.area,
        location: formData.location,
        user_phone: formData.phone,
        status: 'active'
      });

      if (result.success) {
        setFormSuccess('Report submitted successfully! Thank you for helping.');
        setFormData({
          type: 'emergency',
          area: 'Satellite',
          title: '',
          location: '',
          description: '',
          phone: '',
        });
        setTimeout(() => {
          loadPosts();
          setShowReportForm(false);
        }, 1500);
      } else {
        setFormError(`Error: ${result.message}`);
      }
    } catch (error) {
      setFormError(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setFormLoading(false);
    }
  };

  const areas = [
    { name: 'All Areas', count: posts.length || 156 },
    { name: 'Satellite', count: posts.filter(p => p.area === 'Satellite').length || 23 },
    { name: 'Vastrapur', count: posts.filter(p => p.area === 'Vastrapur').length || 34 },
    { name: 'Bopal', count: posts.filter(p => p.area === 'Bopal').length || 18 },
    { name: 'Prahlad Nagar', count: posts.filter(p => p.area === 'Prahlad Nagar').length || 28 },
    { name: 'Maninagar', count: posts.filter(p => p.area === 'Maninagar').length || 21 },
    { name: 'Chandkheda', count: posts.filter(p => p.area === 'Chandkheda').length || 32 },
    { name: 'Thaltej', count: posts.filter(p => p.area === 'Thaltej').length || 19 },
    { name: 'Bodakdev', count: posts.filter(p => p.area === 'Bodakdev').length || 25 },
    { name: 'Ambawadi', count: posts.filter(p => p.area === 'Ambawadi').length || 17 },
    { name: 'Paldi', count: posts.filter(p => p.area === 'Paldi').length || 22 },
    { name: 'Navrangpura', count: posts.filter(p => p.area === 'Navrangpura').length || 15 },
    { name: 'Ellisbridge', count: posts.filter(p => p.area === 'Ellisbridge').length || 12 },
    { name: 'Ghatlodia', count: posts.filter(p => p.area === 'Ghatlodia').length || 20 },
    { name: 'Vastral', count: posts.filter(p => p.area === 'Vastral').length || 14 }
  ];

  const filteredPosts = selectedArea === 'All Areas' 
    ? posts 
    : posts.filter(post => post.area === selectedArea);

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-25 via-white to-peach-25">
      <section className="py-32 bg-gradient-to-br from-mint-100 via-white to-peach-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 text-8xl text-mint-300 floating-animation">Pets</div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-coral-100 to-peach-100 rounded-full border border-coral-200 mb-6">
            <Users className="w-5 h-5 text-coral-600" />
            <span className="text-coral-700 font-semibold">Pet Care Community</span>
          </div>
          
          <h1 className="text-6xl lg:text-7xl font-bold text-gray-800 mb-6 font-poppins">
            Community{' '}
            <span className="gradient-text">Rescue Network</span>
          </h1>
          
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-quicksand mb-12">
            Report incidents, coordinate rescue efforts, and help stray animals in your area. Together we can save lives!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => setShowReportForm(true)}
              className="px-8 py-4 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-2xl hover:from-red-500 hover:to-red-600 transition-all duration-300 hover:scale-105 font-semibold text-lg shadow-lg flex items-center space-x-2"
            >
              <AlertTriangle className="w-6 h-6" />
              <span>Report Emergency</span>
            </button>
            <button className="px-8 py-4 border-2 border-mint-400 text-mint-600 rounded-2xl hover:bg-mint-50 transition-all duration-300 hover:scale-105 font-semibold text-lg">
              Browse Community
            </button>
            <button onClick={() => window.location.href = '/hotline'} className="px-8 py-4 bg-red-50 text-red-600 rounded-2xl hover:bg-red-100 transition-all duration-300 hover:scale-105 font-semibold text-lg flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Hotline</span>
            </button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-mint-100 sticky top-24">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                  <MapPin className="w-6 h-6 text-mint-600" />
                  <span>Areas</span>
                </h3>
                
                <div className="space-y-2">
                  {areas.map((area) => (
                    <button
                      key={area.name}
                      onClick={() => setSelectedArea(area.name)}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-300 flex items-center justify-between ${
                        selectedArea === area.name
                          ? 'bg-gradient-to-r from-mint-100 to-peach-100 text-mint-700 border border-mint-200'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span className="font-medium">{area.name}</span>
                      <span className="text-sm bg-gray-200 px-2 py-1 rounded-full">{area.count}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-4">Quick Actions</h4>
                  <div className="space-y-2">
                    <button 
                      onClick={() => setShowReportForm(true)}
                      className="w-full text-left p-3 rounded-xl hover:bg-red-50 transition-colors flex items-center space-x-3 text-red-600"
                    >
                      <AlertTriangle className="w-5 h-5" />
                      <span className="font-medium">Report Emergency</span>
                    </button>
                    <button 
                      onClick={() => setShowPhotoUpload(true)}
                      className="w-full text-left p-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center space-x-3 text-blue-600"
                    >
                      <Camera className="w-5 h-5" />
                      <span className="font-medium">Share Photo</span>
                    </button>
                    <button 
                      onClick={() => alert('Volunteer registration form will open here')}
                      className="w-full text-left p-3 rounded-xl hover:bg-green-50 transition-colors flex items-center space-x-3 text-green-600"
                    >
                      <Heart className="w-5 h-5" />
                      <span className="font-medium">Volunteer</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 font-poppins">
                    Community Reports - {selectedArea}
                  </h2>
                  <p className="text-gray-600 font-quicksand">
                    {filteredPosts.length} active reports in this area
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search reports..."
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-400"
                    />
                  </div>
                  <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50">
                    <Filter className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {!postsLoaded ? (
                <div className="text-center py-12">
                  <div className="inline-block w-12 h-12 border-4 border-mint-400 border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-4 text-gray-600">Loading community posts...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredPosts.map((post) => (
                    <div 
                      key={post.id} 
                      onClick={() => setSelectedPost(post)}
                      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-mint-100 cursor-pointer hover:border-mint-300"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${getTypeColor(post.type)} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                          <span className="text-lg font-bold text-white">{post.emoji?.charAt(0) || 'G'}</span>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-gray-800 mb-1 font-poppins">{post.title}</h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span className="font-medium">{post.author}</span>
                                <span>-</span>
                                <span>{post.time}</span>
                                <span>-</span>
                                <span className="flex items-center space-x-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{post.area}</span>
                                </span>
                              </div>
                            </div>
                            
                            <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(post.status)}`}>
                              {post.status?.toUpperCase() || 'ACTIVE'}
                            </div>
                          </div>

                          <p className="text-gray-700 mb-4 leading-relaxed font-quicksand">{post.description}</p>
                          
                          {post.image && (
                            <div className="mb-4">
                              <img
                                src={post.image}
                                alt="Incident report"
                                className="w-full max-w-md h-48 object-cover rounded-xl"
                              />
                            </div>
                          )}

                          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                            <MapPin className="w-4 h-4 text-red-500" />
                            <span className="font-medium">Location: {post.location}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <button className="flex items-center space-x-2 text-gray-600 hover:text-mint-600 transition-colors">
                                <MessageCircle className="w-5 h-5" />
                                <span>{post.responses} responses</span>
                              </button>
                              <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                                <Heart className="w-5 h-5" />
                                <span>Support</span>
                              </button>
                            </div>
                            
                            <div className="flex space-x-2">
                              <button className="px-4 py-2 bg-mint-100 text-mint-700 rounded-lg hover:bg-mint-200 transition-colors font-medium">
                                View Details
                              </button>
                              {post.status === 'urgent' && (
                                <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium">
                                  Take Action
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="text-center mt-12">
                <button 
                  onClick={() => {
                    setLoadingMore(true);
                    setTimeout(() => {
                      setLoadingMore(false);
                    }, 1000);
                  }}
                  disabled={loadingMore}
                  className="px-8 py-4 bg-gradient-to-r from-mint-400 to-peach-400 text-white rounded-2xl hover:from-mint-500 hover:to-peach-500 transition-all duration-300 hover:scale-105 font-semibold shadow-lg disabled:opacity-50"
                >
                  {loadingMore ? 'Loading...' : 'Load More Reports'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showReportForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 font-poppins">Report Incident</h3>
              <button 
                onClick={() => setShowReportForm(false)}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                x
              </button>
            </div>

            <form className="space-y-6" onSubmit={handleFormSubmit}>
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                  <p className="text-sm font-medium">{formError}</p>
                </div>
              )}

              {formSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
                  <p className="text-sm font-medium">{formSuccess}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Incident Type *</label>
                  <select 
                    name="type"
                    value={formData.type}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-400"
                  >
                    <option value="emergency">Emergency - Injured Animal</option>
                    <option value="death">Death Report</option>
                    <option value="help">Lost Pet</option>
                    <option value="feeding">Stray Animal Feeding</option>
                    <option value="medical">Medical Assistance Needed</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Area *</label>
                  <select 
                    name="area"
                    value={formData.area}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-400"
                  >
                    <option value="Satellite">Satellite</option>
                    <option value="Vastrapur">Vastrapur</option>
                    <option value="Bopal">Bopal</option>
                    <option value="Prahlad Nagar">Prahlad Nagar</option>
                    <option value="Maninagar">Maninagar</option>
                    <option value="Chandkheda">Chandkheda</option>
                    <option value="Thaltej">Thaltej</option>
                    <option value="Bodakdev">Bodakdev</option>
                    <option value="Ambawadi">Ambawadi</option>
                    <option value="Paldi">Paldi</option>
                    <option value="Navrangpura">Navrangpura</option>
                    <option value="Ellisbridge">Ellisbridge</option>
                    <option value="Ghatlodia">Ghatlodia</option>
                    <option value="Vastral">Vastral</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  placeholder="Brief description of the incident"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Exact Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  placeholder="Street name, landmark, or specific address"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows={4}
                  placeholder="Provide detailed information about the incident, animal condition, and any immediate actions needed..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Phone (Optional)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder="Phone number for follow-up"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-400"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowReportForm(false)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 py-3 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-xl hover:from-red-500 hover:to-red-600 transition-all duration-300 font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                  <span>{formLoading ? 'Submitting...' : 'Submit Report'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPhotoUpload && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 font-poppins">Share Photo</h3>
              <button 
                onClick={() => setShowPhotoUpload(false)}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                x
              </button>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-mint-400 transition-colors mb-6">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
            </div>

            <button
              onClick={() => {
                setShowPhotoUpload(false);
              }}
              className="w-full py-3 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all duration-300 font-semibold"
            >
              Upload Photo
            </button>
          </div>
        </div>
      )}

      <section className="py-16 bg-gradient-to-r from-mint-100 to-peach-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4 font-poppins">Community Impact</h3>
            <p className="text-xl text-gray-600 font-quicksand">Together we're making a difference in animal lives</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="text-4xl mb-2">Alert</div>
              <div className="text-3xl font-bold text-red-500 mb-2">234</div>
              <div className="text-gray-600 font-medium">Emergency Reports</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="text-4xl mb-2">Pets</div>
              <div className="text-3xl font-bold text-green-500 mb-2">189</div>
              <div className="text-gray-600 font-medium">Animals Rescued</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="text-4xl mb-2">Members</div>
              <div className="text-3xl font-bold text-blue-500 mb-2">1,247</div>
              <div className="text-gray-600 font-medium">Active Members</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="text-4xl mb-2">Help</div>
              <div className="text-3xl font-bold text-purple-500 mb-2">12min</div>
              <div className="text-gray-600 font-medium">Emergency Response</div>
            </div>
          </div>
        </div>
      </section>

      {selectedPost && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${getTypeColor(selectedPost.type)} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <span className="text-2xl font-bold text-white">{selectedPost.emoji?.charAt(0) || 'G'}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedPost.title}</h2>
              </div>
              <button 
                onClick={() => setSelectedPost(null)}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-xl"
              >
                x
              </button>
            </div>

            <div className="mb-6">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(selectedPost.status)}`}>
                {selectedPost.status?.toUpperCase() || 'ACTIVE'}
              </span>
            </div>

            {selectedPost.image && (
              <div className="mb-6">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-64 object-cover rounded-2xl"
                />
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{selectedPost.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Incident Type</p>
                  <p className="text-gray-800 font-semibold capitalize">{selectedPost.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Area</p>
                  <p className="text-gray-800 font-semibold">{selectedPost.area}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Location</p>
                  <p className="text-gray-800 font-semibold">{selectedPost.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Reported By</p>
                  <p className="text-gray-800 font-semibold">{selectedPost.author}</p>
                </div>
                {selectedPost.user_phone && (
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Contact</p>
                    <p className="text-gray-800 font-semibold">{selectedPost.user_phone}</p>
                  </div>
                )}
              </div>

              <div className="border-t pt-6">
                <p className="text-xs text-gray-500">
                  Reported on {new Date(selectedPost.created_at || Date.now()).toLocaleString()}
                </p>
              </div>

              <div className="flex space-x-4">
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                >
                  Close
                </button>
                <button className="flex-1 py-3 bg-gradient-to-r from-mint-400 to-mint-500 text-white rounded-xl hover:from-mint-500 hover:to-mint-600 transition-all duration-300 font-semibold">
                  Mark as Resolved
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
