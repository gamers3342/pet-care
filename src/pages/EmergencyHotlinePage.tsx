import React, { useState } from 'react';
import { Phone, MapPin, AlertTriangle } from 'lucide-react';
import { communityService } from '../services/communityService';

const EmergencyHotlinePage: React.FC = () => {
  const [form, setForm] = useState({
    type: 'emergency',
    area: '',
    title: '',
    location: '',
    description: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const HOTLINE_NUMBER = '+911234567890'; // replace with real hotline

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const result = await communityService.createPost({
        type: form.type,
        title: form.title,
        description: form.description,
        area: form.area,
        location: form.location,
        user_phone: form.phone,
      } as any);

      if (result.success) {
        setMessage('Report submitted. Emergency responders notified when available.');
        setForm({ type: 'emergency', area: '', title: '', location: '', description: '', phone: '' });
      } else {
        setMessage(result.message || 'Failed to submit report');
      }
    } catch (err: any) {
      setMessage(err?.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Emergency Hotline</h1>
            <p className="text-gray-600">Immediate actions and quick report for urgent incidents.</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Hotline</div>
            <a href={`tel:${HOTLINE_NUMBER}`} className="inline-flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-xl shadow-md hover:opacity-95">
              <Phone className="w-5 h-5" />
              <span className="font-semibold">Call {HOTLINE_NUMBER}</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 border rounded-xl">
            <h3 className="font-bold mb-2">When to call</h3>
            <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
              <li>Severe injury to an animal</li>
              <li>Vehicle collisions with pets</li>
              <li>Animals trapped or in immediate danger</li>
              <li>Threats to public safety because of an animal</li>
            </ul>
          </div>

          <div className="p-4 border rounded-xl">
            <h3 className="font-bold mb-2">What to tell responders</h3>
            <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
              <li>Exact location and nearest landmark</li>
              <li>Type of animal and visible injuries</li>
              <li>Is the animal aggressive or calm</li>
              <li>Your contact number for follow-up</li>
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600">Area</label>
              <input name="area" value={form.area} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded-xl" placeholder="e.g. Satellite" />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Location (address / landmark)</label>
              <input name="location" value={form.location} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded-xl" placeholder="Exact location" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600">Short title</label>
            <input name="title" value={form.title} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded-xl" placeholder="e.g. Injured dog on Main St" />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="mt-1 w-full px-3 py-2 border rounded-xl" placeholder="Describe the incident and urgency"></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600">Your phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded-xl" placeholder="Phone for responders" />
            </div>

            <div className="flex items-end">
              <button type="submit" disabled={loading} className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:opacity-95">
                {loading ? 'Sending...' : 'Send Emergency Report'}
              </button>
            </div>
          </div>

          {message && (
            <div className="p-3 rounded-md bg-green-50 border border-green-100 text-green-800">{message}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EmergencyHotlinePage;
