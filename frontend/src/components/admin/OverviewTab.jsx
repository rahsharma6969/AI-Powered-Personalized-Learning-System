// components/OverviewTab.js
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import StatCard from './StatCard';

const OverviewTab = ({
  studentData,
  courseData,
  revenueData,
  popularCourses,
  recentActivity,
  loading
}) => {
  // Sample data for charts
  const enrollmentData = [
    { month: "Jan", students: 45 },
    { month: "Feb", students: 52 },
    { month: "Mar", students: 48 },
    { month: "Apr", students: 73 },
    { month: "May", students: 89 },
    { month: "Jun", students: studentData.currentMonthStudents || 95 },
  ];

  const gradeDistribution = [
    { grade: "Class 5", students: 89, color: "#8884d8" },
    { grade: "Class 6", students: 145, color: "#82ca9d" },
    { grade: "Class 7", students: 167, color: "#ffc658" },
    { grade: "Class 8", students: 198, color: "#ff7300" },
    { grade: "Class 9", students: 156, color: "#8dd1e1" },
    { grade: "Class 10", students: 88, color: "#d084d0" },
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={studentData.totalStudents?.toLocaleString() || "0"}
          change={studentData.growthPercentage}
          icon="👥"
          color="blue"
          isLoading={loading}
        />
        <StatCard
          title="New This Month"
          value={studentData.currentMonthStudents?.toLocaleString() || "0"}
          change={null}
          icon="📈"
          color="green"
          isLoading={loading}
        />
        <StatCard
          title="Active Courses"
          value={courseData.totalCourses?.toLocaleString() || "0"}
          change={courseData.growthPercentage}
          icon="📚"
          color="yellow"
          isLoading={loading}
        />
        <StatCard
          title="Total Revenue"
          value={`₹${revenueData.totalRevenue?.toLocaleString() || "0"}`}
          change={revenueData.growthPercentage}
          icon="💰"
          color="purple"
          isLoading={loading}
        />
      </div>

      {/* Live Analytics Dashboard */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <span className="mr-2">📊</span>
          Live Analytics Dashboard
          <span className="ml-2 text-sm text-gray-500">
            (Auto-refreshes every 30s)
          </span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Students Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 border-b pb-2">
              👥 Student Analytics
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm font-medium text-blue-600">Total Students</p>
                <p className="text-2xl font-bold text-blue-900">{studentData.totalStudents}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm font-medium text-green-600">This Month</p>
                <p className="text-2xl font-bold text-green-900">{studentData.currentMonthStudents}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-600">Last Month</p>
                <p className="text-2xl font-bold text-gray-900">{studentData.lastMonthStudents}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm font-medium text-purple-600">Growth</p>
                <p className={`text-2xl font-bold ${
                  studentData.growthPercentage > 0 ? "text-green-600" : 
                  studentData.growthPercentage < 0 ? "text-red-600" : "text-gray-600"
                }`}>
                  {studentData.growthPercentage > 0 ? "+" : ""}{studentData.growthPercentage}%
                </p>
              </div>
            </div>
          </div>

          {/* Courses Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 border-b pb-2">
              📚 Course Analytics
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-yellow-50 rounded-lg p-4">
                <p className="text-sm font-medium text-yellow-600">Total Courses</p>
                <p className="text-2xl font-bold text-yellow-900">{courseData.totalCourses}</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <p className="text-sm font-medium text-orange-600">This Month</p>
                <p className="text-2xl font-bold text-orange-900">{courseData.currentMonthCourses}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-600">Last Month</p>
                <p className="text-2xl font-bold text-gray-900">{courseData.lastMonthCourses}</p>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4">
                <p className="text-sm font-medium text-indigo-600">Growth</p>
                <p className={`text-2xl font-bold ${
                  courseData.growthPercentage > 0 ? "text-green-600" : 
                  courseData.growthPercentage < 0 ? "text-red-600" : "text-gray-600"
                }`}>
                  {courseData.growthPercentage > 0 ? "+" : ""}{courseData.growthPercentage}%
                </p>
              </div>
            </div>
          </div>

          {/* Revenue Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 border-b pb-2">
              💰 Revenue Analytics
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm font-medium text-purple-600">Total Revenue</p>
                <p className="text-2xl font-bold text-purple-900">
                  ₹{revenueData.totalRevenue?.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm font-medium text-green-600">This Month</p>
                <p className="text-2xl font-bold text-green-900">
                  ₹{revenueData.currentMonthRevenue?.toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-600">Last Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{revenueData.lastMonthRevenue?.toLocaleString()}
                </p>
              </div>
              <div className="bg-pink-50 rounded-lg p-4">
                <p className="text-sm font-medium text-pink-600">Growth</p>
                <p className={`text-2xl font-bold ${
                  revenueData.growthPercentage > 0 ? "text-green-600" : 
                  revenueData.growthPercentage < 0 ? "text-red-600" : "text-gray-600"
                }`}>
                  {revenueData.growthPercentage > 0 ? "+" : ""}{revenueData.growthPercentage}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Student Enrollment Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="students"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Students by Grade</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={gradeDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ grade, percent }) =>
                  `${grade}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="students"
              >
                {gradeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                  <span className="text-blue-600">{activity.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    <span className="font-semibold">{activity.user}</span>{" "}
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Courses */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Most Popular Courses</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCourses.slice(0, 6).map((course) => (
              <div key={course._id} className="bg-gray-50 rounded-lg p-4 border">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <img 
                      src={course.coverImage ? `http://localhost:5000${course.coverImage}` : '/default-course.jpg'}
                      alt={course.title}
                      className="w-16 h-16 rounded-lg object-cover"
                      onError={(e) => {e.target.src = '/default-course.jpg'}}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-lg truncate">{course.title}</h4>
                    <p className="text-sm text-gray-600 truncate">{course.instructor.name}</p>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Enrollments:</span>
                        <span className="font-medium">{course.enrollmentCount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Views:</span>
                        <span className="font-medium">{course.viewCount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Rating:</span>
                        <span className="font-medium">{course.rating}/5 ({course.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;