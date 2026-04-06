import { useState, useEffect } from 'react';
import { 
  Save as SaveIcon,
  Building2 as BuildingOfficeIcon,
  Mail as EnvelopeIcon,
  MapPin as MapPinIcon,
  Globe as GlobeAltIcon,
  Phone as PhoneIcon,
  Clock3 as ClockIcon,
  CreditCard as CreditCardIcon,
  ShieldCheck as ShieldCheckIcon,
  Bell as BellIcon,
  CircleCheck as CheckCircleIcon,
  TriangleAlert as ExclamationTriangleIcon,
  RefreshCw as ArrowPathIcon,
  BadgeCheck as CheckBadgeIcon
} from 'lucide-react';
import api from '../services/api';

interface SettingsData {
  contactEmail: string;
  hotelAddress: string;
  contactPhone?: string;
  website?: string;
  timezone?: string;
  currency?: string;
  checkInTime?: string;
  checkOutTime?: string;
  bookingConfirmationTemplate?: string;
  enableNotifications?: boolean;
  maintenanceMode?: boolean;
}

const defaultSettingsData: SettingsData = {
  contactEmail: '',
  hotelAddress: '',
  contactPhone: '',
  website: '',
  timezone: 'UTC',
  currency: 'ETB',
  checkInTime: '14:00',
  checkOutTime: '11:00',
  bookingConfirmationTemplate: '',
  enableNotifications: true,
  maintenanceMode: false,
};

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'error'>('connected');
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState<SettingsData>(defaultSettingsData);
  const [savedFormData, setSavedFormData] = useState<SettingsData>(defaultSettingsData);

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(savedFormData);

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!hasChanges) return;
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges]);

  const fetchSettings = async (force = false) => {
    if (!force && hasChanges && !window.confirm('You have unsaved changes. Refreshing will discard them. Continue?')) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/settings');
      const settingsArray = response.data.data || [];
      const mappedData: SettingsData = { ...defaultSettingsData };

      settingsArray.forEach((item: any) => {
        switch(item.key) {
          case 'contact_email': mappedData.contactEmail = item.value; break;
          case 'hotel_address': mappedData.hotelAddress = item.value; break;
          case 'contact_phone': mappedData.contactPhone = item.value; break;
          case 'website': mappedData.website = item.value; break;
          case 'timezone': mappedData.timezone = item.value; break;
          case 'currency': mappedData.currency = item.value; break;
          case 'check_in_time': mappedData.checkInTime = item.value; break;
          case 'check_out_time': mappedData.checkOutTime = item.value; break;
          case 'booking_confirmation_template': mappedData.bookingConfirmationTemplate = item.value; break;
          case 'enable_notifications': mappedData.enableNotifications = item.value === 'true'; break;
          case 'maintenance_mode': mappedData.maintenanceMode = item.value === 'true'; break;
        }
      });

      setFormData(mappedData);
      setSavedFormData(mappedData);
      setConnectionStatus('connected');
    } catch (err: any) {
      setConnectionStatus('error');
      setError('Failed to load settings. Please try again later.');
      console.error('Fetch settings error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        contact_email: formData.contactEmail,
        hotel_address: formData.hotelAddress,
        contact_phone: formData.contactPhone,
        website: formData.website,
        timezone: formData.timezone,
        currency: formData.currency,
        check_in_time: formData.checkInTime,
        check_out_time: formData.checkOutTime,
        booking_confirmation_template: formData.bookingConfirmationTemplate,
        enable_notifications: formData.enableNotifications,
        maintenance_mode: formData.maintenanceMode,
      };

      await api.put('/settings', payload);
      setSavedFormData(formData);
      setConnectionStatus('connected');
      setLastSavedAt(new Date().toISOString());
      setSuccess('Settings updated successfully!');
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setConnectionStatus('error');
      setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleResetChanges = () => {
    if (!hasChanges) return;
    setFormData(savedFormData);
    setError(null);
    setSuccess(null);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: BuildingOfficeIcon },
    { id: 'contact', label: 'Contact', icon: EnvelopeIcon },
    { id: 'operations', label: 'Operations', icon: ClockIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="space-y-6 p-6 lg:p-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-gray-500 mt-1">Manage your hotel configuration and preferences</p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => fetchSettings()}
              disabled={loading || saving}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 shadow-sm"
            >
              <ArrowPathIcon className="h-4 w-4" />
              <span className="text-sm font-medium">Refresh</span>
            </button>
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-center gap-2">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 flex items-center gap-2">
            <CheckCircleIcon className="h-5 w-5 text-green-600" />
            {success}
          </div>
        )}

        {/* Settings Tabs */}
        <div className="border-b border-gray-200 bg-white rounded-t-2xl shadow-sm">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap
                    ${activeTab === tab.id 
                      ? 'border-slate-900 text-slate-900' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <BuildingOfficeIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">General Information</h2>
                    <p className="text-sm text-gray-500">Basic hotel information and branding</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Website
                    </label>
                    <div className="relative">
                      <GlobeAltIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                        placeholder="https://yourhotel.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Timezone
                    </label>
                    <select
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white"
                    >
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="Europe/London">London (GMT)</option>
                      <option value="Europe/Paris">Paris (CET)</option>
                      <option value="Asia/Dubai">Dubai (GST)</option>
                      <option value="Asia/Tokyo">Tokyo (JST)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Currency
                    </label>
                    <div className="relative">
                      <CreditCardIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="ETB">ETB (Br)</option>
                        <option value="AED">AED (د.إ)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Settings */}
            {activeTab === 'contact' && (
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <EnvelopeIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
                    <p className="text-sm text-gray-500">How guests can reach your hotel</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Contact Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                        placeholder="contact@yourhotel.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Contact Phone
                    </label>
                    <div className="relative">
                      <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Hotel Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPinIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <textarea
                        name="hotelAddress"
                        value={formData.hotelAddress}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all resize-none"
                        placeholder="123 Hotel Street, City, Country"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Operations Settings */}
            {activeTab === 'operations' && (
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <ClockIcon className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Operational Hours</h2>
                    <p className="text-sm text-gray-500">Check-in/out times and operational settings</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Check-in Time
                    </label>
                    <input
                      type="time"
                      name="checkInTime"
                      value={formData.checkInTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Check-out Time
                    </label>
                    <input
                      type="time"
                      name="checkOutTime"
                      value={formData.checkOutTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Booking Confirmation Template
                    </label>
                    <textarea
                      name="bookingConfirmationTemplate"
                      value={formData.bookingConfirmationTemplate}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all resize-none"
                      placeholder="Thank you for booking with us! Your reservation has been confirmed..."
                    />
                    <p className="text-xs text-gray-500 mt-1">This template will be used for booking confirmation emails</p>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <BellIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Notification Preferences</h2>
                    <p className="text-sm text-gray-500">Manage how you receive alerts and updates</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <BellIcon className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">Enable Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive email alerts for new bookings and messages</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="enableNotifications"
                        checked={formData.enableNotifications}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-900"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <ShieldCheckIcon className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">Maintenance Mode</p>
                        <p className="text-sm text-gray-500">Temporarily disable booking functionality</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="maintenanceMode"
                        checked={formData.maintenanceMode}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="border-t border-gray-100 px-6 py-4 bg-gray-50 flex justify-between gap-3">
              <div className="flex items-center text-sm">
                {hasChanges ? (
                  <span className="text-amber-600 font-medium">You have unsaved changes</span>
                ) : (
                  <span className="text-gray-500">All changes saved</span>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleResetChanges}
                  disabled={!hasChanges || saving}
                  className="inline-flex items-center gap-2 border border-gray-200 bg-white px-4 py-2.5 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reset Changes
                </button>
              <button
                type="submit"
                disabled={saving || loading || !hasChanges}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 text-white px-6 py-2.5 rounded-xl font-medium hover:from-slate-800 hover:to-slate-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    Saving...
                  </>
                ) : (
                  <>
                    <SaveIcon className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </button>
              </div>
            </div>
          </div>
        </form>

        {/* System Status */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckBadgeIcon className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">System Status</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-500">
                Last saved: {lastSavedAt ? new Date(lastSavedAt).toLocaleString() : 'Not yet saved'}
              </span>
              <span className="inline-flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className={connectionStatus === 'connected' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                  {connectionStatus === 'connected' ? 'Connected' : 'Connection issue'}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
