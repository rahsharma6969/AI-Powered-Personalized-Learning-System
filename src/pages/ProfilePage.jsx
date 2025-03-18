import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaBell, FaCreditCard, FaDownload, FaShieldAlt, FaSignOutAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [user, setUser] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    avatar: 'https://placehold.co/200x200?text=JS',
    phone: '+1 (123) 456-7890',
    grade: '11th Grade',
    school: 'Lincoln High School',
    interests: ['Mathematics', 'Physics', 'Computer Science'],
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: false
  });
  
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    grade: user.grade,
    school: user.school,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const handleToggleChange = (setting) => {
    setUser(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  const handleAccountSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    
    // If no errors, update user
    if (Object.keys(newErrors).length === 0) {
      setUser(prev => ({
        ...prev,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        grade: formData.grade,
        school: formData.school
      }));
      
      // Show success message (would be a toast in a real app)
      alert('Profile updated successfully!');
    }
  };
  
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    if (!formData.currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    
    // If no errors, update password
    if (Object.keys(newErrors).length === 0) {
      // In a real app, call API to update password
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
      // Show success message (would be a toast in a real app)
      alert('Password updated successfully!');
    }
  };
  
  // Array of tabs with their icons and labels
  const tabs = [
    { id: 'account', icon: <FaUser />, label: 'Account' },
    { id: 'security', icon: <FaLock />, label: 'Security' },
    { id: 'notifications', icon: <FaBell />, label: 'Notifications' },
    { id: 'billing', icon: <FaCreditCard />, label: 'Billing' },
    { id: 'certificates', icon: <FaDownload />, label: 'Certificates' }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Profile Settings
            </h2>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="md:flex">
            {/* Sidebar */}
            <div className="md:w-64 bg-gray-50 md:border-r md:border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <img 
                      className="h-16 w-16 rounded-full object-cover border-2 border-indigo-500"
                      src={user.avatar}
                      alt={`${user.firstName} ${user.lastName}`}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {user.grade} • {user.school}
                    </p>
                  </div>
                </div>
              </div>
              
              <nav className="py-4">
                <ul>
                  {tabs.map(tab => (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full text-left px-6 py-3 flex items-center space-x-3 ${
                          activeTab === tab.id
                            ? 'text-indigo-600 bg-indigo-50 border-l-4 border-indigo-600'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <span className="text-lg">{tab.icon}</span>
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    </li>
                  ))}
                  
                  {/* Sign Out */}
                  <li className="mt-8 px-6">
                    <button className="w-full text-left py-3 flex items-center space-x-3 text-red-600 hover:text-red-700">
                      <FaSignOutAlt className="text-lg" />
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            
            {/* Main content */}
            <div className="flex-1 p-6">
              {/* Account Settings */}
              {activeTab === 'account' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Account Settings</h3>
                    <p className="text-sm text-gray-500">Update your personal information and academic details.</p>
                  </div>
                  
                  <form onSubmit={handleAccountSubmit}>
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                          First name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className={`block w-full border ${
                              errors.firstName ? 'border-red-300' : 'border-gray-300'
                            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                          />
                          {errors.firstName && (
                            <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="sm:col-span-3">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                          Last name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className={`block w-full border ${
                              errors.lastName ? 'border-red-300' : 'border-gray-300'
                            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                          />
                          {errors.lastName && (
                            <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <div className="mt-1 relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaEnvelope className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`block w-full border ${
                              errors.email ? 'border-red-300' : 'border-gray-300'
                            } rounded-md shadow-sm py-2 pl-10 pr-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                          />
                          {errors.email && (
                            <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="sm:col-span-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone number
                        </label>
                        <div className="mt-1">
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      
                      <div className="sm:col-span-3">
                        <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
                          Grade Level
                        </label>
                        <div className="mt-1">
                          <select
                            id="grade"
                            name="grade"
                            value={formData.grade}
                            onChange={handleInputChange}
                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option>9th Grade</option>
                            <option>10th Grade</option>
                            <option>11th Grade</option>
                            <option>12th Grade</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="sm:col-span-6">
                        <label htmlFor="school" className="block text-sm font-medium text-gray-700">
                          School
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="school"
                            id="school"
                            value={formData.school}
                            onChange={handleInputChange}
                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      
                      <div className="sm:col-span-6">
                        <label className="block text-sm font-medium text-gray-700">
                          Academic Interests
                        </label>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {user.interests.map((interest, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                            >
                              {interest}
                            </span>
                          ))}
                          <button 
                            type="button"
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                          >
                            + Add Interest
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
              
              {/* Security Settings */}
              {activeTab === 'security' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
                    <p className="text-sm text-gray-500">Update your password and security preferences.</p>
                  </div>
                  
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
                    <div className="p-6 border-b border-gray-200">
                      <h4 className="text-base font-medium text-gray-900">Change Password</h4>
                    </div>
                    
                    <div className="p-6">
                      <form onSubmit={handlePasswordSubmit}>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                              Current Password
                            </label>
                            <div className="mt-1">
                              <input
                                type="password"
                                name="currentPassword"
                                id="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleInputChange}
                                className={`block w-full border ${
                                  errors.currentPassword ? 'border-red-300' : 'border-gray-300'
                                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                              />
                              {errors.currentPassword && (
                                <p className="mt-2 text-sm text-red-600">{errors.currentPassword}</p>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                              New Password
                            </label>
                            <div className="mt-1">
                              <input
                                type="password"
                                name="newPassword"
                                id="newPassword"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                className={`block w-full border ${
                                  errors.newPassword ? 'border-red-300' : 'border-gray-300'
                                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                              />
                              {errors.newPassword && (
                                <p className="mt-2 text-sm text-red-600">{errors.newPassword}</p>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                              Confirm New Password
                            </label>
                            <div className="mt-1">
                              <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className={`block w-full border ${
                                  errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                              />
                              {errors.confirmPassword && (
                                <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-5">
                          <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Update Password
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                      <h4 className="text-base font-medium text-gray-900">Two-Factor Authentication</h4>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-700">
                            Add an extra layer of security to your account by enabling two-factor authentication.
                          </p>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => handleToggleChange('twoFactorAuth')}
                            className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                              user.twoFactorAuth ? 'bg-indigo-600' : 'bg-gray-200'
                            }`}
                          >
                            <span className="sr-only">Toggle two-factor authentication</span>
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                                user.twoFactorAuth ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                      
                      {!user.twoFactorAuth && (
                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <FaShieldAlt className="mr-2" />
                            Setup Two-Factor Authentication
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Notifications Settings */}
              {activeTab === 'notifications' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Notification Settings</h3>
                    <p className="text-sm text-gray-500">Choose how you want to be notified about your courses, assessments, and account activity.</p>
                  </div>
                  
                  <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                    <ul className="divide-y divide-gray-200">
                      <li className="p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-base font-medium text-gray-900">Email Notifications</h4>
                            <p className="mt-1 text-sm text-gray-500">
                              Receive course updates, assessment reminders, and account notifications via email.
                            </p>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <button
                              type="button"
                              onClick={() => handleToggleChange('emailNotifications')}
                              className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                                user.emailNotifications ? 'bg-indigo-600' : 'bg-gray-200'
                              }`}
                            >
                              <span className="sr-only">Toggle email notifications</span>
                              <span
                                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                                  user.emailNotifications ? 'translate-x-5' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      </li>
                      
                      <li className="p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-base font-medium text-gray-900">SMS Notifications</h4>
                            <p className="mt-1 text-sm text-gray-500">
                              Receive text message alerts for important updates and reminders.
                            </p>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <button
                              type="button"
                              onClick={() => handleToggleChange('smsNotifications')}
                              className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                                user.smsNotifications ? 'bg-indigo-600' : 'bg-gray-200'
                              }`}
                            >
                              <span className="sr-only">Toggle SMS notifications</span>
                              <span
                                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                                  user.smsNotifications ? 'translate-x-5' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
              
              {/* Billing Settings */}
              {activeTab === 'billing' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Billing & Subscriptions</h3>
                    <p className="text-sm text-gray-500">Manage your payment methods and subscription details.</p>
                  </div>
                  
                  <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden mb-6">
                    <div className="p-6 border-b border-gray-200">
                      <h4 className="text-base font-medium text-gray-900">Current Plan</h4>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Free Plan</p>
                          <p className="text-sm text-gray-500 mt-1">Basic access to courses and assessments</p>
                        </div>
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Upgrade
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                      <h4 className="text-base font-medium text-gray-900">Payment Methods</h4>
                    </div>
                    
                    <div className="p-6">
                      <p className="text-sm text-gray-700">No payment methods added yet.</p>
                      <button
                        type="button"
                        className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Add Payment Method
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Certificates */}
              {activeTab === 'certificates' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Certificates</h3>
                    <p className="text-sm text-gray-500">View and download your earned certificates.</p>
                  </div>
                  
                  <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                    <div className="p-8 text-center">
                      <svg 
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No certificates yet</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Complete courses to earn certificates that will appear here.
                      </p>
                      <div className="mt-6">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Browse Courses
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;