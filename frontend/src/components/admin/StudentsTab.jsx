import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const StudentsTab = ({ studentData, gradeDistribution }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Student Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-600">
              Total Students
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {studentData.totalStudents}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-600">
              This Month
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {studentData.currentMonthStudents}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-600">
              Last Month
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {studentData.lastMonthStudents}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-600">Growth</p>
            <p
              className={`text-3xl font-bold ${
                studentData.growthPercentage > 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {studentData.growthPercentage > 0 ? "+" : ""}
              {studentData.growthPercentage}%
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Grade Distribution</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={gradeDistribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="grade" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="students" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StudentsTab;