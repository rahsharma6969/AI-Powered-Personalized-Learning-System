// components/StatCard.js
import React from 'react';

const StatCard = ({
  title,
  value,
  change,
  icon,
  color = "blue",
  isLoading = false,
}) => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 relative">
    {isLoading && (
      <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    )}
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {change !== null && change !== undefined && (
          <p
            className={`text-sm ${
              change > 0
                ? "text-green-600"
                : change < 0
                ? "text-red-600"
                : "text-gray-500"
            }`}
          >
            {change > 0 ? "↗" : change < 0 ? "↘" : "→"} {Math.abs(change)}%
            from last month
          </p>
        )}
      </div>
      <div className={`text-3xl p-3 rounded-full bg-${color}-100`}>
        {icon}
      </div>
    </div>
  </div>
);

export default StatCard;