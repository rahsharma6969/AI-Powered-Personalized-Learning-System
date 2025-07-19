import React from "react";

const ProgressCard = ({ completedCount, totalVideos }) => {
  const progress = totalVideos > 0 ? (completedCount / totalVideos) * 100 : 0;

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <h3 className="text-lg font-semibold text-white mb-4">Your Progress</h3>
      <div className="mb-2">
        <div className="flex justify-between text-sm text-purple-200 mb-1">
          <span>{completedCount} of {totalVideos} completed</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;