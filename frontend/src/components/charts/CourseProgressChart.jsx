// components/charts/CourseProgressChart.jsx - Course Progress Bar Chart Component
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";

const CourseProgressChart = ({ courseProgress }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Course Completion
      </h2>
      {courseProgress.length > 0 ? (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={courseProgress}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis type="category" dataKey="name" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="progress" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-72 flex items-center justify-center text-gray-500">
          No course progress data available yet
        </div>
      )}
    </div>
  );
};

export default CourseProgressChart;