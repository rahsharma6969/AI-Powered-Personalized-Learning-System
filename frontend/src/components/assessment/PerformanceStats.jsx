import React from 'react';

export const SubTopicPerformance = ({ subTopicStats }) => (
  <div className="bg-gray-100 p-4 rounded-lg mb-4">
    <h4 className="font-bold mb-4">Performance by Sub-topic</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(subTopicStats).map(([topic, stats], index) => (
        <div key={index} className="bg-white p-4 rounded-md shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h5 className="font-medium">{topic}</h5>
            <span className="font-bold text-lg">{stats.percentage}%</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            {stats.correct}/{stats.total} correct
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                stats.percentage >= 80
                  ? "bg-green-500"
                  : stats.percentage >= 60
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${stats.percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const DifficultyPerformance = ({ detailedResponses }) => {
  const getDifficultyStats = (targetDifficulty) => {
    const questionsOfDifficulty = detailedResponses.filter((q) => {
      if (q.difficulty === 0 || q.difficulty === "0") return targetDifficulty === "easy";
      if (q.difficulty === 1 || q.difficulty === "1") return targetDifficulty === "medium";
      if (q.difficulty === 2 || q.difficulty === "2") return targetDifficulty === "hard";
      
      if (typeof q.difficulty === "string") {
        const diffLower = q.difficulty.toLowerCase();
        return diffLower.includes(targetDifficulty);
      }
      
      return false;
    });

    const correctOfDifficulty = questionsOfDifficulty.filter(q => q.isCorrect).length;
    const total = questionsOfDifficulty.length;

    return {
      correct: correctOfDifficulty,
      total,
      percentage: total > 0 ? Math.round((correctOfDifficulty / total) * 100) : 0
    };
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4">
      <h4 className="font-bold mb-2">Performance by Difficulty Level</h4>
      <div className="grid grid-cols-3 gap-4">
        {["easy", "medium", "hard"].map((difficulty) => {
          const stats = getDifficultyStats(difficulty);
          
          return (
            <div key={difficulty} className="bg-white p-3 rounded-md shadow-sm">
              <p className="font-medium capitalize">{difficulty}</p>
              <p className="text-lg font-bold">{stats.percentage}%</p>
              <p className="text-sm text-gray-600">
                {stats.correct}/{stats.total} correct
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
