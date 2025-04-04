import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ProgressChart = ({ data, className = '' }) => {
  // Default data if none is provided
  const defaultData = [
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 68 },
    { month: 'Mar', score: 75 },
    { month: 'Apr', score: 72 },
    { month: 'May', score: 80 },
    { month: 'Jun', score: 85 },
  ];

  const chartData = data || defaultData;
  
  // Format the tooltip values
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-sm">
          <p className="font-medium text-gray-800">{`${label}`}</p>
          <p className="text-indigo-600">{`Score: ${payload[0].value}`}</p>
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
      <h2 className="text-xl font-bold text-gray-800 mb-4">Your Progress</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="#6366F1" 
              strokeWidth={2}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ProgressChart;