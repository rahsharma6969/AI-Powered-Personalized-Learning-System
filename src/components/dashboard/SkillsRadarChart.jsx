import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

const SkillsRadarChart = ({ skills, className = '' }) => {
  // Default data if none provided
  const defaultSkills = [
    { subject: 'Mathematics', score: 85, fullMark: 100 },
    { subject: 'Physics', score: 70, fullMark: 100 },
    { subject: 'Chemistry', score: 65, fullMark: 100 },
    { subject: 'Biology', score: 78, fullMark: 100 },
    { subject: 'English', score: 90, fullMark: 100 },
    { subject: 'Computer Science', score: 95, fullMark: 100 },
  ];
  
  const skillsData = skills || defaultSkills;
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-sm">
          <p className="font-medium text-gray-800">{data.subject}</p>
          <p className="text-indigo-600">Score: {data.score}/100</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <motion.div 
      className={`bg-white p-6 rounded-xl shadow-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4">Skills Assessment</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name="Skills"
              dataKey="score"
              stroke="#EC4899"
              fill="#EC4899"
              fillOpacity={0.5}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {skillsData.map((skill, index) => (
          <div key={index} className="text-center">
            <div 
              className={`inline-block w-2 h-2 rounded-full mr-1 ${
                skill.score >= 80 ? 'bg-green-500' :
                skill.score >= 60 ? 'bg-yellow-500' :
                'bg-red-500'
              }`} 
            />
            <span className="text-sm font-medium">{skill.subject}: </span>
            <span className="text-sm text-gray-600">{skill.score}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillsRadarChart;