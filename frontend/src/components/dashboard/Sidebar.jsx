// components/Sidebar.jsx - Dashboard Sidebar Component
import { motion } from "framer-motion";
import {
  FaBook, FaRegCalendarAlt, FaRegClock, FaChevronRight,
  FaLaptop, FaFileAlt, FaRoad, FaLightbulb, FaTrophy,
  FaArrowRight,
} from "react-icons/fa";

const Sidebar = ({ user, activeTab, setActiveTab, isLoaded }) => {
  const navigationItems = [
    {
      id: "overview",
      label: "Overview",
      icon: <FaLaptop className="mr-2" />,
    },
    {
      id: "courses",
      label: "My Courses",
      icon: <FaBook className="mr-2" />,
    },
    {
      id: "assessments",
      label: "Assessments",
      icon: <FaFileAlt className="mr-2" />,
    },
    {
      id: "roadmap",
      label: "Learning Roadmap",
      icon: <FaRoad className="mr-2" />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <FaChevronRight className="mr-2" />,
    },
  ];

  return (
    <motion.div
      className="w-full md:w-64 bg-white rounded-xl shadow-sm p-6"
      initial={{ opacity: 0, x: -20 }}
      animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
    >
      {/* User Profile Section */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center">
          <span className="text-xl font-bold text-white">
            {user ? user.email?.charAt(0).toUpperCase() || "U" : "U"}
          </span>
        </div>
        <div>
          <h3 className="font-bold text-gray-800">
            {user?.name || "Student"}
          </h3>
          <p className="text-sm text-gray-500">
            {user?.grade || "Student"}
          </p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav>
        <ul className="space-y-2">
          {navigationItems.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${
                  activeTab === tab.id
                    ? "bg-indigo-100 text-indigo-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};

export default Sidebar;