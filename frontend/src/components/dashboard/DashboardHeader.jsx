// components/DashboardHeader.jsx - Dashboard Header Component
import { motion } from "framer-motion";

const DashboardHeader = ({ activeTab }) => {
  const getHeaderContent = () => {
    switch (activeTab) {
      case "overview":
        return {
          title: "Dashboard Overview",
          description: "Track your progress and view personalized recommendations"
        };
      case "courses":
        return {
          title: "My Courses",
          description: "Manage your enrolled courses and track completion"
        };
      case "assessments":
        return {
          title: "Assessments",
          description: "View upcoming and completed assessments"
        };
      case "roadmap":
        return {
          title: "Learning Roadmap",
          description: "Your personalized learning path based on assessment results"
        };
      case "settings":
        return {
          title: "Settings",
          description: "Update your personal information and preferences"
        };
      default:
        return {
          title: "Dashboard",
          description: "Welcome to your learning dashboard"
        };
    }
  };

  const { title, description } = getHeaderContent();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm mb-6"
      variants={itemVariants}
    >
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default DashboardHeader;