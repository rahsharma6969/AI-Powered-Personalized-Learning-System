import React, { useState } from 'react';
import { useAdmin } from '../hooks/useAdmin'; // Import the admin hook

const AdminPanelPage = () => {
  const { adminLogout } = useAdmin(); // Get logout function
  const handleNavigation = (path) => {
    console.log(`Navigating to: ${path}`);
  };

  const menuItems = [
    { title: 'Add Assessment', path: '/add-assessment', icon: '📋' },
    { title: 'Add Course', path: '/add-course', icon: '📚' },
    { title: 'Manage Users', path: '/manage-users', icon: '👥' },
    { title: 'View Analytics', path: '/analytics', icon: '📊' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Admin Panel</h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage your platform content and settings
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => handleNavigation('/')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-sm font-medium transition-colors duration-200"
            >
              View Site
            </button>
            <button
              onClick={adminLogout} // Call logout function
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-sm font-medium transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Content Management */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-indigo-600 px-4 py-4">
              <h2 className="text-xl font-semibold text-white">Content Management</h2>
            </div>
            <div className="p-6">
              <ul className="divide-y divide-gray-200">
                {menuItems.map((item) => (
                  <li key={item.path} className="py-3">
                    <button
                      onClick={() => handleNavigation(item.path)}
                      className="w-full flex items-center hover:bg-gray-50 p-2 rounded-md transition-colors group text-left"
                    >
                      <span className="text-2xl mr-3">{item.icon}</span>
                      <span className="text-gray-700 group-hover:text-indigo-600 font-medium transition-colors">
                        {item.title}
                      </span>
                      <span className="ml-auto text-gray-400 group-hover:text-indigo-600 transform group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-green-600 px-4 py-4">
              <h2 className="text-xl font-semibold text-white">Quick Stats</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500">Total Courses</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">843</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500">Assessments</p>
                  <p className="text-2xl font-bold text-gray-900">56</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500">New Today</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-blue-600 px-4 py-4">
              <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 bg-blue-100 rounded-full p-1">
                    <span className="text-blue-600">📝</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">New course added</p>
                    <p className="text-xs text-gray-500">10 minutes ago</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 bg-green-100 rounded-full p-1">
                    <span className="text-green-600">👤</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">New user registered</p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 bg-yellow-100 rounded-full p-1">
                    <span className="text-yellow-600">🔔</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">System update completed</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelPage;