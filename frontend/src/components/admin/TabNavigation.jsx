// components/TabNavigation.js
import React from 'react';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "courses", label: "Courses", icon: "📚" },
    { id: "students", label: "Students", icon: "👥" },
    { id: "performance", label: "Performance", icon: "🎯" },
    { id: "management", label: "Management", icon: "⚙️" },
  ];

  return (
    <div className="mb-6">
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-indigo-100 text-indigo-700 border-b-2 border-indigo-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation;