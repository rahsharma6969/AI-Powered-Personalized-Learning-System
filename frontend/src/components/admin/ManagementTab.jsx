import React from 'react';
import { useNavigate } from 'react-router-dom';

const ManagementTab = ({ handleNavigation }) => {
  const navigate = useNavigate();
  const menuItems = [
    { title: "Add Video", path: "/add-video", icon: "📋" },
    { title: "Add Course", path: "/add-course", icon: "📚" },
    { title: "Manage Users", path: "/manage-users", icon: "👥" },
    { title: "Content Library", path: "/content-library", icon: "📖" },
    { title: "Reports", path: "/reports", icon: "📊" },
    { title: "Settings", path: "/settings", icon: "⚙️" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
        >
          <div className="p-6">
            <button
              onClick={() => navigate(item.path)}
              className="w-full flex items-center justify-between hover:bg-gray-50 p-4 rounded-lg transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{item.icon}</span>
                <span className="text-lg font-medium text-gray-900 group-hover:text-indigo-600">
                  {item.title}
                </span>
              </div>
              <span className="text-gray-400 group-hover:text-indigo-600 transform group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManagementTab;