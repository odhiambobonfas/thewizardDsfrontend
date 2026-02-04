import React, { useState } from 'react';
import {
  FiLock,
  FiSave,
  FiCheck,
  FiAlertCircle,
  FiSettings as FiSettingsIcon,
  FiBell,
  FiShield,
  FiDatabase
} from 'react-icons/fi';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const [settings, setSettings] = useState({
    siteName: 'TheWizarDs',
    siteEmail: 'TheWizards@gmail.com',
    sitePhone: '+254 742 187 929',
    siteAddress: 'Westlands, Nairobi, Kenya',
    adminEmail: 'admin@thewizards.com',
    notificationsEnabled: true,
    emailNotifications: true,
    maintenanceMode: false,
    allowRegistration: false
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSuccess('Settings saved successfully!');
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      setTimeout(() => setError(null), 3000);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      setTimeout(() => setError(null), 3000);
      return;
    }

    setSuccess('Password changed successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setTimeout(() => setSuccess(null), 3000);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: FiSettingsIcon },
    { id: 'security', label: 'Security', icon: FiShield },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'advanced', label: 'Advanced', icon: FiDatabase }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-dark-600 dark:text-dark-400">
          Manage your application settings and preferences
        </p>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div
          className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center space-x-2 text-green-600 dark:text-green-400"
        >
          <FiCheck className="w-5 h-5 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-center space-x-2 text-red-600 dark:text-red-400"
        >
          <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-100 dark:border-dark-700 overflow-hidden">
        <div className="flex border-b border-gray-200 dark:border-dark-700 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-blue-500 dark:text-blue-300 border-b-2 border-blue-500 dark:border-blue-300'
                    : 'text-dark-600 dark:text-dark-400 hover:text-dark-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <form
              onSubmit={handleSaveSettings}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-4">
                  Site Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                      Site Name
                    </label>
                    <input
                      type="text"
                      name="siteName"
                      value={settings.siteName}
                      onChange={handleSettingChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      name="siteEmail"
                      value={settings.siteEmail}
                      onChange={handleSettingChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="sitePhone"
                      value={settings.sitePhone}
                      onChange={handleSettingChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="siteAddress"
                      value={settings.siteAddress}
                      onChange={handleSettingChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200 dark:border-dark-700">
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-400/60 to-gray-400/60 text-white font-semibold rounded-lg hover:shadow-lg duration-300"
                >
                  <FiSave className="w-5 h-5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-4">
                  Change Password
                </h3>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-400/60 to-gray-400/60 text-white font-semibold rounded-lg hover:shadow-lg duration-300"
                  >
                    <FiLock className="w-5 h-5" />
                    <span>Update Password</span>
                  </button>
                </form>
              </div>

              <div className="pt-6 border-t border-gray-200 dark:border-dark-700">
                <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-4">
                  Admin Account
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      name="adminEmail"
                      value={settings.adminEmail}
                      onChange={handleSettingChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <form
              onSubmit={handleSaveSettings}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-4">
                  Notification Preferences
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
                    <div>
                      <p className="font-medium text-dark-900 dark:text-white">
                        Enable Notifications
                      </p>
                      <p className="text-sm text-dark-600 dark:text-dark-400">
                        Receive notifications for new contacts and updates
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="notificationsEnabled"
                        checked={settings.notificationsEnabled}
                        onChange={handleSettingChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:dark:border-gray-600 peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
                    <div>
                      <p className="font-medium text-dark-900 dark:text-white">
                        Email Notifications
                      </p>
                      <p className="text-sm text-dark-600 dark:text-dark-400">
                        Receive email alerts for new contact submissions
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="emailNotifications"
                        checked={settings.emailNotifications}
                        onChange={handleSettingChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:dark:border-gray-600 peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200 dark:border-dark-700">
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-400/60 to-gray-400/60 text-white font-semibold rounded-lg hover:shadow-lg duration-300"
                >
                  <FiSave className="w-5 h-5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          )}

          {/* Advanced Settings */}
          {activeTab === 'advanced' && (
            <form
              onSubmit={handleSaveSettings}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-4">
                  Advanced Options
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div>
                      <p className="font-medium text-dark-900 dark:text-white">
                        Maintenance Mode
                      </p>
                      <p className="text-sm text-dark-600 dark:text-dark-400">
                        Put the site in maintenance mode (visitors will see a maintenance page)
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="maintenanceMode"
                        checked={settings.maintenanceMode}
                        onChange={handleSettingChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:dark:border-gray-600 peer-checked:bg-yellow-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
                    <div>
                      <p className="font-medium text-dark-900 dark:text-white">
                        Allow New Registrations
                      </p>
                      <p className="text-sm text-dark-600 dark:text-dark-400">
                        Allow new users to register accounts
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="allowRegistration"
                        checked={settings.allowRegistration}
                        onChange={handleSettingChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:dark:border-gray-600 peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200 dark:border-dark-700">
                <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-4">
                  Danger Zone
                </h3>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <p className="text-sm text-dark-700 dark:text-dark-300 mb-4">
                    These actions are irreversible. Please be certain before proceeding.
                  </p>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Clear All Contacts
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 border border-red-600 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      Reset Statistics
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200 dark:border-dark-700">
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-400/60 to-gray-400/60 text-white font-semibold rounded-lg hover:shadow-lg duration-300"
                >
                  <FiSave className="w-5 h-5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
