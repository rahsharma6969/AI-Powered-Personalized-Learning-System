// components/OverviewTab.jsx - Overview Tab Component
import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, PieChart,
  Pie, Cell,
} from "recharts";
import { FaRegCalendarAlt, FaRegClock, FaChevronRight } from "react-icons/fa";

// Import sub-components
import StatsCards from "./StatsCards";
import ProgressChart from "./charts/ProgressChart";
import SkillsRadarChart from "./charts/SkillsRadarChart";
import CourseProgressChart from "./charts/CourseProgressChart";
import AssessmentPieChart from "./charts/AssessmentPieChart";
import RecentAssessments from "./RecentAssessments";

const OverviewTab = ({
  stats,
  progressData,
  skillsData,
  courseProgress,
  pieData,
  assessmentResults,
  handleViewDetails
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Stats */}
      <motion.div
        className="lg:col-span-2"
        variants={itemVariants}
      >
        <StatsCards stats={stats} />
      </motion.div>

      {/* Progress Chart */}
      <motion.div variants={itemVariants}>
        <ProgressChart progressData={progressData} />
      </motion.div>

      {/* Skills Radar Chart */}
      <motion.div variants={itemVariants}>
        <SkillsRadarChart skillsData={skillsData} />
      </motion.div>

      {/* Course Progress Chart */}
      <motion.div variants={itemVariants}>
        <CourseProgressChart courseProgress={courseProgress} />
      </motion.div>

      {/* Assessment Stats Pie Chart */}
      <motion.div variants={itemVariants}>
        <AssessmentPieChart pieData={pieData} />
      </motion.div>

      {/* Recent Assessments */}
      <motion.div
        className="lg:col-span-2"
        variants={itemVariants}
      >
        <RecentAssessments
          assessmentResults={assessmentResults}
          handleViewDetails={handleViewDetails}
        />
      </motion.div>
    </div>
  );
};

export default OverviewTab;