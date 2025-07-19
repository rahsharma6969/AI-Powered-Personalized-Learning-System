// import React, { useState, useEffect } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";
// import { useNavigate } from "react-router-dom";
// const EnhancedAdminPanel = () => {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [studentData, setStudentData] = useState({
//     totalStudents: 0,
//     currentMonthStudents: 0,
//     lastMonthStudents: 0,
//     growthPercentage: 0,
//   });

//   const navigate = useNavigate();
//   const [popularCourses, setPopularCourses] = useState([]);
//   const [courseData, setCourseData] = useState({
//     totalCourses: 0,
//     currentMonthCourses: 0,
//     lastMonthCourses: 0,
//     growthPercentage: 0,
//   });

//   const [revenueData, setRevenueData] = useState({
//     totalRevenue: 0,
//     currentMonthRevenue: 0,
//     lastMonthRevenue: 0,
//     growthPercentage: 0,
//   });

//   const [recentActivity, setRecentActivity] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch student and course data from API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         // Fetch all APIs concurrently - ADD recent activity API
//         const [
//           studentResponse,
//           courseResponse,
//           revenueResponse,
//           activityResponse,
//           popularResponse,
//         ] = await Promise.all([
//           fetch("http://localhost:5000/admin/students/count"),
//           fetch("http://localhost:5000/admin/courses/count"),
//           fetch("http://localhost:5000/admin/revenue"),
//           fetch("http://localhost:5000/admin/recent-activity"),
//           fetch("http://localhost:5000/admin/popular"), // ADD THIS LINE
//         ]);

//         if (
//           !studentResponse.ok ||
//           !courseResponse.ok ||
//           !revenueResponse.ok ||
//           !activityResponse.ok ||
//           !popularResponse.ok
//         ) {
//           throw new Error("Failed to fetch data");
//         }

//         const popularData = await popularResponse.json(); // ADD THIS LINE
//         setPopularCourses(popularData);

//         const studentData = await studentResponse.json();
//         const courseData = await courseResponse.json();
//         const revenueData = await revenueResponse.json();
//         const activityData = await activityResponse.json(); // ADD THIS LINE

//         setStudentData(studentData);
//         setCourseData(courseData);
//         setRevenueData(revenueData);
//         setRecentActivity(transformActivityData(activityData)); // ADD THIS LINE
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//         console.error("Error fetching data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//     const interval = setInterval(fetchData, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   // Sample data - in real app, these would also come from your backend
//   const enrollmentData = [
//     { month: "Jan", students: 45 },
//     { month: "Feb", students: 52 },
//     { month: "Mar", students: 48 },
//     { month: "Apr", students: 73 },
//     { month: "May", students: 89 },
//     { month: "Jun", students: studentData.currentMonthStudents || 95 },
//   ];

// // Remove the static coursePopularityData array and replace with:
// const coursePopularityData = popularCourses.map(course => ({
//   course: course.title,
//   purchases: course.enrollmentCount,
//   completion: course.rating * 20, // Convert rating (0-5) to percentage (0-100)
//   views: course.viewCount,
//   reviews: course.reviewCount,
//   instructor: course.instructor.name,
//   coverImage: course.coverImage
// }));

//   const gradeDistribution = [
//     { grade: "Class 5", students: 89, color: "#8884d8" },
//     { grade: "Class 6", students: 145, color: "#82ca9d" },
//     { grade: "Class 7", students: 167, color: "#ffc658" },
//     { grade: "Class 8", students: 198, color: "#ff7300" },
//     { grade: "Class 9", students: 156, color: "#8dd1e1" },
//     { grade: "Class 10", students: 88, color: "#d084d0" },
//   ];

//   const performanceMetrics = [
//     { subject: "Mathematics", avgScore: 78, totalTests: 245, color: "#8884d8" },
//     { subject: "Science", avgScore: 82, totalTests: 189, color: "#82ca9d" },
//     { subject: "English", avgScore: 75, totalTests: 167, color: "#ffc658" },
//     {
//       subject: "Social Studies",
//       avgScore: 73,
//       totalTests: 134,
//       color: "#ff7300",
//     },
//   ];

//   const menuItems = [
//     { title: "Add Video", path: "/add-video", icon: "📋" },
//     { title: "Add Course", path: "/add-course", icon: "📚" },
//     { title: "Manage Users", path: "/manage-users", icon: "👥" },
//     { title: "Content Library", path: "/content-library", icon: "📖" },
//     { title: "Reports", path: "/reports", icon: "📊" },
//     { title: "Settings", path: "/settings", icon: "⚙️" },
//   ];

//   const handleNavigation = (path) => {
//     navigate(path);
//   };

//   const handleLogout = () => {
//     console.log("Logging out...");
//   };

//   const handleRefreshData = async () => {
//     try {
//       setLoading(true);

//       const [
//         studentResponse,
//         courseResponse,
//         revenueResponse,
//         activityResponse,
//         popularResponse,
//       ] = await Promise.all([
//         fetch("http://localhost:5000/admin/students/count"),
//         fetch("http://localhost:5000/admin/courses/count"),
//         fetch("http://localhost:5000/admin/revenue"),
//         fetch("http://localhost:5000/admin/recent-activity"),
//         fetch("http://localhost:5000/admin/popular"), // ADD THIS LINE
//       ]);

//       const popularData = await popularResponse.json();
       

//       const studentData = await studentResponse.json();
//       const courseData = await courseResponse.json();
//       const revenueData = await revenueResponse.json();
//       const activityData = await activityResponse.json(); 

//       setStudentData(studentData);
//       setCourseData(courseData);
//       setRevenueData(revenueData);
//       setRecentActivity(transformActivityData(activityData)); // ADD THIS LINE
//       setPopularCourses(popularData);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const StatCard = ({
//     title,
//     value,
//     change,
//     icon,
//     color = "blue",
//     isLoading = false,
//   }) => (
//     <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 relative">
//       {isLoading && (
//         <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
//         </div>
//       )}
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium text-gray-600">{title}</p>
//           <p className="text-2xl font-bold text-gray-900">{value}</p>
//           {change !== null && change !== undefined && (
//             <p
//               className={`text-sm ${
//                 change > 0
//                   ? "text-green-600"
//                   : change < 0
//                   ? "text-red-600"
//                   : "text-gray-500"
//               }`}
//             >
//               {change > 0 ? "↗" : change < 0 ? "↘" : "→"} {Math.abs(change)}%
//               from last month
//             </p>
//           )}
//         </div>
//         <div className={`text-3xl p-3 rounded-full bg-${color}-100`}>
//           {icon}
//         </div>
//       </div>
//     </div>
//   );

//   // Helper function to transform API data to component format
//   const transformActivityData = (apiData) => {
//     return apiData.map((item, index) => {
//       const timeAgo = getTimeAgo(item.timestamp);

//       return {
//         id: index + 1, // or use item._id if available
//         type: item.type,
//         user: item.userName,
//         action: `purchased ${item.courseTitle}`,
//         time: timeAgo,
//         icon: item.type === "purchase" ? "💰" : "✅", // You can expand this based on type
//       };
//     });
//   };

//   // Helper function to calculate time ago
//   const getTimeAgo = (timestamp) => {
//     const now = new Date();
//     const date = new Date(timestamp);
//     const diffInMs = now - date;
//     const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
//     const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
//     const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

//     if (diffInMinutes < 1) {
//       return "Just now";
//     } else if (diffInMinutes < 60) {
//       return `${diffInMinutes} min ago`;
//     } else if (diffInHours < 24) {
//       return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
//     } else if (diffInDays < 7) {
//       return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
//     } else {
//       return date.toLocaleDateString();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">
//                 Admin Dashboard
//               </h1>
//               <p className="text-sm text-gray-600">
//                 Learning Platform Management
//               </p>
//               {error && <p className="text-sm text-red-600 mt-1">⚠️ {error}</p>}
//             </div>
//             <div className="flex space-x-3">
//               <button
//                 onClick={handleRefreshData}
//                 disabled={loading}
//                 className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center space-x-2"
//               >
//                 <span className={loading ? "animate-spin" : ""}>🔄</span>
//                 <span>Refresh</span>
//               </button>
//               <button
//                 onClick={() => handleNavigation("/")}
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
//               >
//                 View Site
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         {/* Tab Navigation */}
//         <div className="mb-6">
//           <nav className="flex space-x-8">
//             {[
//               { id: "overview", label: "Overview", icon: "📊" },
//               { id: "courses", label: "Courses", icon: "📚" },
//               { id: "students", label: "Students", icon: "👥" },
//               { id: "performance", label: "Performance", icon: "🎯" },
//               { id: "management", label: "Management", icon: "⚙️" },
//             ].map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center space-x-2 px-3 py-2 rounded-md font-medium transition-colors ${
//                   activeTab === tab.id
//                     ? "bg-indigo-100 text-indigo-700 border-b-2 border-indigo-500"
//                     : "text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 <span>{tab.icon}</span>
//                 <span>{tab.label}</span>
//               </button>
//             ))}
//           </nav>
//         </div>

//         {/* Overview Tab */}
//         {activeTab === "overview" && (
//           <div className="space-y-6">
//             {/* Key Metrics - Now using live API data */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <StatCard
//                 title="Total Students"
//                 value={studentData.totalStudents?.toLocaleString() || "0"}
//                 change={studentData.growthPercentage}
//                 icon="👥"
//                 color="blue"
//                 isLoading={loading}
//               />
//               <StatCard
//                 title="New This Month"
//                 value={
//                   studentData.currentMonthStudents?.toLocaleString() || "0"
//                 }
//                 change={null}
//                 icon="📈"
//                 color="green"
//                 isLoading={loading}
//               />
//               <StatCard
//                 title="Active Courses"
//                 value={courseData.totalCourses?.toLocaleString() || "0"}
//                 change={courseData.growthPercentage}
//                 icon="📚"
//                 color="yellow"
//                 isLoading={loading}
//               />
//               <StatCard
//                 title="Total Revenue"
//                 value={`₹${revenueData.totalRevenue?.toLocaleString() || "0"}`}
//                 change={revenueData.growthPercentage}
//                 icon="💰"
//                 color="purple"
//                 isLoading={loading}
//               />
//             </div>

//             {/* Live Data Summary */}
//             <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
//               <h3 className="text-lg font-semibold mb-4 flex items-center">
//                 <span className="mr-2">📊</span>
//                 Live Analytics Dashboard
//                 <span className="ml-2 text-sm text-gray-500">
//                   (Auto-refreshes every 30s)
//                 </span>
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Students Section */}
//                 <div className="space-y-4">
//                   <h4 className="font-semibold text-gray-900 border-b pb-2">
//                     👥 Student Analytics
//                   </h4>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="bg-blue-50 rounded-lg p-4">
//                       <p className="text-sm font-medium text-blue-600">
//                         Total Students
//                       </p>
//                       <p className="text-2xl font-bold text-blue-900">
//                         {studentData.totalStudents}
//                       </p>
//                     </div>
//                     <div className="bg-green-50 rounded-lg p-4">
//                       <p className="text-sm font-medium text-green-600">
//                         This Month
//                       </p>
//                       <p className="text-2xl font-bold text-green-900">
//                         {studentData.currentMonthStudents}
//                       </p>
//                     </div>
//                     <div className="bg-gray-50 rounded-lg p-4">
//                       <p className="text-sm font-medium text-gray-600">
//                         Last Month
//                       </p>
//                       <p className="text-2xl font-bold text-gray-900">
//                         {studentData.lastMonthStudents}
//                       </p>
//                     </div>
//                     <div className="bg-purple-50 rounded-lg p-4">
//                       <p className="text-sm font-medium text-purple-600">
//                         Growth
//                       </p>
//                       <p
//                         className={`text-2xl font-bold ${
//                           studentData.growthPercentage > 0
//                             ? "text-green-600"
//                             : studentData.growthPercentage < 0
//                             ? "text-red-600"
//                             : "text-gray-600"
//                         }`}
//                       >
//                         {studentData.growthPercentage > 0 ? "+" : ""}
//                         {studentData.growthPercentage}%
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Courses Section */}
//                 <div className="space-y-4">
//                   <h4 className="font-semibold text-gray-900 border-b pb-2">
//                     📚 Course Analytics
//                   </h4>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="bg-yellow-50 rounded-lg p-4">
//                       <p className="text-sm font-medium text-yellow-600">
//                         Total Courses
//                       </p>
//                       <p className="text-2xl font-bold text-yellow-900">
//                         {courseData.totalCourses}
//                       </p>
//                     </div>
//                     <div className="bg-orange-50 rounded-lg p-4">
//                       <p className="text-sm font-medium text-orange-600">
//                         This Month
//                       </p>
//                       <p className="text-2xl font-bold text-orange-900">
//                         {courseData.currentMonthCourses}
//                       </p>
//                     </div>
//                     <div className="bg-gray-50 rounded-lg p-4">
//                       <p className="text-sm font-medium text-gray-600">
//                         Last Month
//                       </p>
//                       <p className="text-2xl font-bold text-gray-900">
//                         {courseData.lastMonthCourses}
//                       </p>
//                     </div>
//                     <div className="bg-indigo-50 rounded-lg p-4">
//                       <p className="text-sm font-medium text-indigo-600">
//                         Growth
//                       </p>
//                       <p
//                         className={`text-2xl font-bold ${
//                           courseData.growthPercentage > 0
//                             ? "text-green-600"
//                             : courseData.growthPercentage < 0
//                             ? "text-red-600"
//                             : "text-gray-600"
//                         }`}
//                       >
//                         {courseData.growthPercentage > 0 ? "+" : ""}
//                         {courseData.growthPercentage}%
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Live Data Summary */}
//             <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
//               <h3 className="text-lg font-semibold mb-4 flex items-center">
//                 <span className="mr-2">📊</span>
//                 Live Analytics Dashboard
//                 <span className="ml-2 text-sm text-gray-500">
//                   (Auto-refreshes every 30s)
//                 </span>
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {" "}
//                 {/* Changed from md:grid-cols-2 to md:grid-cols-3 */}
//                 {/* Students Section */}
//                 <div className="space-y-4">
//                   <h4 className="font-semibold text-gray-900 border-b pb-2">
//                     👥 Student Analytics
//                   </h4>
//                   {/* ... existing student analytics content ... */}
//                 </div>
//                 {/* Courses Section */}
//                 <div className="space-y-4">
//                   <h4 className="font-semibold text-gray-900 border-b pb-2">
//                     📚 Course Analytics
//                   </h4>
//                   {/* ... existing course analytics content ... */}
//                 </div>
//                 {/* Revenue Section - ADD HERE */}
//                 <div className="space-y-4">
//                   <h4 className="font-semibold text-gray-900 border-b pb-2">
//                     💰 Revenue Analytics
//                   </h4>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="bg-purple-50 rounded-lg p-4">
//                       <p className="text-sm font-medium text-purple-600">
//                         Total Revenue
//                       </p>
//                       <p className="text-2xl font-bold text-purple-900">
//                         ₹{revenueData.totalRevenue?.toLocaleString()}
//                       </p>
//                     </div>
//                     <div className="bg-green-50 rounded-lg p-4">
//                       <p className="text-sm font-medium text-green-600">
//                         This Month
//                       </p>
//                       <p className="text-2xl font-bold text-green-900">
//                         ₹{revenueData.currentMonthRevenue?.toLocaleString()}
//                       </p>
//                     </div>
//                     <div className="bg-gray-50 rounded-lg p-4">
//                       <p className="text-sm font-medium text-gray-600">
//                         Last Month
//                       </p>
//                       <p className="text-2xl font-bold text-gray-900">
//                         ₹{revenueData.lastMonthRevenue?.toLocaleString()}
//                       </p>
//                     </div>
//                     <div className="bg-pink-50 rounded-lg p-4">
//                       <p className="text-sm font-medium text-pink-600">
//                         Growth
//                       </p>
//                       <p
//                         className={`text-2xl font-bold ${
//                           revenueData.growthPercentage > 0
//                             ? "text-green-600"
//                             : revenueData.growthPercentage < 0
//                             ? "text-red-600"
//                             : "text-gray-600"
//                         }`}
//                       >
//                         {revenueData.growthPercentage > 0 ? "+" : ""}
//                         {revenueData.growthPercentage}%
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {/* Charts Row */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
//                 <h3 className="text-lg font-semibold mb-4">
//                   Student Enrollment Trend
//                 </h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <LineChart data={enrollmentData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="month" />
//                     <YAxis />
//                     <Tooltip />
//                     <Line
//                       type="monotone"
//                       dataKey="students"
//                       stroke="#8884d8"
//                       strokeWidth={2}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>

//               <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
//                 <h3 className="text-lg font-semibold mb-4">
//                   Students by Grade
//                 </h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie
//                       data={gradeDistribution}
//                       cx="50%"
//                       cy="50%"
//                       labelLine={false}
//                       label={({ grade, percent }) =>
//                         `${grade}: ${(percent * 100).toFixed(0)}%`
//                       }
//                       outerRadius={80}
//                       fill="#8884d8"
//                       dataKey="students"
//                     >
//                       {gradeDistribution.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             {/* Recent Activity */}
//             <div className="bg-white rounded-lg shadow-md border border-gray-200">
//               <div className="px-6 py-4 border-b border-gray-200">
//                 <h3 className="text-lg font-semibold">Recent Activity</h3>
//               </div>
//               <div className="p-6">
//                 <div className="space-y-4">
//                   {recentActivity.map((activity) => (
//                     <div
//                       key={activity.id}
//                       className="flex items-center space-x-3"
//                     >
//                       <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
//                         <span className="text-blue-600">{activity.icon}</span>
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-sm font-medium text-gray-900">
//                           <span className="font-semibold">{activity.user}</span>{" "}
//                           {activity.action}
//                         </p>
//                         <p className="text-xs text-gray-500">{activity.time}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
// {/* Popular Courses - ADD THIS SECTION */}
// <div className="bg-white rounded-lg shadow-md border border-gray-200">
//   <div className="px-6 py-4 border-b border-gray-200">
//     <h3 className="text-lg font-semibold">Most Popular Courses</h3>
//   </div>
//   <div className="p-6">
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {popularCourses.slice(0, 6).map((course, index) => (
//         <div key={course._id} className="bg-gray-50 rounded-lg p-4 border">
//           <div className="flex items-start space-x-3">
//             <div className="flex-shrink-0">
//               <img 
//                 src={course.coverImage ? `http://localhost:5000${course.coverImage}` : '/default-course.jpg'}
//                 alt={course.title}
//                 className="w-16 h-16 rounded-lg object-cover"
//                 onError={(e) => {e.target.src = '/default-course.jpg'}}
//               />
//             </div>
//             <div className="flex-1 min-w-0">
//               <h4 className="font-semibold text-lg truncate">{course.title}</h4>
//               <p className="text-sm text-gray-600 truncate">{course.instructor.name}</p>
//               <div className="mt-2 space-y-1">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-500">Enrollments:</span>
//                   <span className="font-medium">{course.enrollmentCount}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-500">Views:</span>
//                   <span className="font-medium">{course.viewCount}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-500">Rating:</span>
//                   <span className="font-medium">{course.rating}/5 ({course.reviewCount} reviews)</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// </div>
//         {/* Students Tab - Enhanced with live data */}
//         {activeTab === "students" && (
//           <div className="space-y-6">
//             <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
//               <h3 className="text-lg font-semibold mb-4">Student Overview</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <p className="text-sm font-medium text-gray-600">
//                     Total Students
//                   </p>
//                   <p className="text-3xl font-bold text-gray-900">
//                     {studentData.totalStudents}
//                   </p>
//                 </div>
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <p className="text-sm font-medium text-gray-600">
//                     This Month
//                   </p>
//                   <p className="text-3xl font-bold text-gray-900">
//                     {studentData.currentMonthStudents}
//                   </p>
//                 </div>
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <p className="text-sm font-medium text-gray-600">
//                     Last Month
//                   </p>
//                   <p className="text-3xl font-bold text-gray-900">
//                     {studentData.lastMonthStudents}
//                   </p>
//                 </div>
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <p className="text-sm font-medium text-gray-600">Growth</p>
//                   <p
//                     className={`text-3xl font-bold ${
//                       studentData.growthPercentage > 0
//                         ? "text-green-600"
//                         : "text-red-600"
//                     }`}
//                   >
//                     {studentData.growthPercentage > 0 ? "+" : ""}
//                     {studentData.growthPercentage}%
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
//               <h3 className="text-lg font-semibold mb-4">Grade Distribution</h3>
//               <ResponsiveContainer width="100%" height={400}>
//                 <BarChart data={gradeDistribution}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="grade" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="students" fill="#8884d8" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         )}

//         {/* Courses Tab - Enhanced with live data */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//   {popularCourses.map((course, index) => (
//     <div
//       key={course._id}
//       className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
//     >
//       <div className="flex items-start space-x-3 mb-4">
//         <img 
//           src={course.coverImage ? `http://localhost:5000${course.coverImage}` : '/default-course.jpg'}
//           alt={course.title}
//           className="w-12 h-12 rounded-lg object-cover"
//           onError={(e) => {e.target.src = '/default-course.jpg'}}
//         />
//         <div>
//           <h4 className="font-semibold text-lg">{course.title}</h4>
//           <p className="text-sm text-gray-600">{course.instructor.name}</p>
//         </div>
//       </div>
//       <div className="space-y-2">
//         <div className="flex justify-between">
//           <span className="text-sm text-gray-600">Enrollments:</span>
//           <span className="font-medium">{course.enrollmentCount}</span>
//         </div>
//         <div className="flex justify-between">
//           <span className="text-sm text-gray-600">Views:</span>
//           <span className="font-medium">{course.viewCount}</span>
//         </div>
//         <div className="flex justify-between">
//           <span className="text-sm text-gray-600">Rating:</span>
//           <span className="font-medium">{course.rating}/5</span>
//         </div>
//         <div className="flex justify-between">
//           <span className="text-sm text-gray-600">Reviews:</span>
//           <span className="font-medium">{course.reviewCount}</span>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
//           <div
//             className="bg-blue-600 h-2 rounded-full"
//             style={{ width: `${(course.enrollmentCount / Math.max(...popularCourses.map(c => c.enrollmentCount))) * 100}%` }}
//           ></div>
//         </div>
//       </div>
//     </div>
//   ))}
// </div>

//         {/* Performance Tab */}
//         {activeTab === "performance" && (
//           <div className="space-y-6">
//             <div className="bg-white rounded-lg shadow-md border border-gray-200">
//               <div className="px-6 py-4 border-b border-gray-200">
//                 <h3 className="text-lg font-semibold">
//                   Subject-wise Performance
//                 </h3>
//               </div>
//               <div className="p-6">
//                 <ResponsiveContainer width="100%" height={400}>
//                   <BarChart data={performanceMetrics}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="subject" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar
//                       dataKey="avgScore"
//                       fill="#8884d8"
//                       name="Average Score"
//                     />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {performanceMetrics.map((subject, index) => (
//                 <div
//                   key={index}
//                   className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
//                 >
//                   <h4 className="font-semibold text-lg mb-3">
//                     {subject.subject}
//                   </h4>
//                   <div className="space-y-2">
//                     <div className="flex justify-between">
//                       <span className="text-sm text-gray-600">Avg Score:</span>
//                       <span className="font-bold text-2xl">
//                         {subject.avgScore}%
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-sm text-gray-600">
//                         Total Tests:
//                       </span>
//                       <span className="font-medium">{subject.totalTests}</span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <div
//                         className="h-2 rounded-full"
//                         style={{
//                           width: `${subject.avgScore}%`,
//                           backgroundColor: subject.color,
//                         }}
//                       ></div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Management Tab */}
//         {activeTab === "management" && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {menuItems.map((item, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
//               >
//                 <div className="p-6">
//                   <button
//                     onClick={() => handleNavigation(item.path)}
//                     className="w-full flex items-center justify-between hover:bg-gray-50 p-4 rounded-lg transition-colors group"
//                   >
//                     <div className="flex items-center space-x-3">
//                       <span className="text-3xl">{item.icon}</span>
//                       <span className="text-lg font-medium text-gray-900 group-hover:text-indigo-600">
//                         {item.title}
//                       </span>
//                     </div>
//                     <span className="text-gray-400 group-hover:text-indigo-600 transform group-hover:translate-x-1 transition-transform">
//                       →
//                     </span>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EnhancedAdminPanel;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import all the separate components
import Header from '../components/admin/Header'
import TabNavigation from '../components/admin/TabNavigation';
import OverviewTab from '../components/admin/OverviewTab';
import StudentsTab from '../components/admin/StudentsTab';
import CoursesTab from '../components/admin/CourseTab';
import PerformanceTab from '../components/admin/PerformanceCard';
import ManagementTab from '../components/admin/ManagementTab';

// Import custom hooks
import { useAdminData } from "../hooks/admin/useAdminData";

const EnhancedAdminPanel = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  // Custom hook for all API data management
  const {
    studentData,
    courseData,
    revenueData,
    popularCourses,
    recentActivity,
    loading,
    error,
    handleRefreshData
  } = useAdminData();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Component */}
      <Header 
        error={error}
        loading={loading}
        onRefresh={handleRefreshData}
        onNavigate={handleNavigation}
        onLogout={handleLogout}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab Navigation Component */}
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Content */}
        {activeTab === "overview" && (
          <OverviewTab
            studentData={studentData}
            courseData={courseData}
            revenueData={revenueData}
            popularCourses={popularCourses}
            recentActivity={recentActivity}
            loading={loading}
          />
        )}

        {activeTab === "students" && (
          <StudentsTab studentData={studentData} />
        )}

        {activeTab === "courses" && (
          <CoursesTab popularCourses={popularCourses} />
        )}

        {activeTab === "performance" && (
          <PerformanceTab />
        )}

        {activeTab === "management" && (
          <ManagementTab onNavigate={handleNavigation} />
        )}
      </div>
    </div>
  );
};

export default EnhancedAdminPanel;