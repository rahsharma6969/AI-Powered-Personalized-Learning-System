// components/StatsCards.jsx - Statistics Cards Component
const StatsCards = ({ stats }) => {
  const statsData = [
    {
      label: "Courses Enrolled",
      value: stats.coursesEnrolled.toString(),
      color: "bg-blue-500",
    },
    {
      label: "Completed",
      value: stats.completed.toString(),
      color: "bg-green-500",
    },
    {
      label: "Assessments Taken",
      value: stats.assessmentsTaken.toString(),
      color: "bg-purple-500",
    },
    {
      label: "Avg. Score",
      value: stats.avgScore,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-xl shadow-sm flex items-center space-x-4"
        >
          <div
            className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold`}
          >
            {stat.value}
          </div>
          <div>
            <p className="text-gray-500 text-sm">{stat.label}</p>
            <p className="font-semibold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;