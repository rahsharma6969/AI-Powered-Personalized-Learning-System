// components/charts/ProgressChart.jsx - Progress Line Chart Component
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";

const ProgressChart = ({ progressData }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Your Progress
      </h2>
      {progressData.length > 0 ? (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={progressData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
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
      ) : (
        <div className="h-72 flex items-center justify-center text-gray-500">
          No progress data available yet
        </div>
      )}
    </div>
  );
};

export default ProgressChart;