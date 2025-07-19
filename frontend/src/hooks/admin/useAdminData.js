// hooks/useAdminData.js
import { useState, useEffect } from 'react';

export const useAdminData = () => {
  const [studentData, setStudentData] = useState({
    totalStudents: 0,
    currentMonthStudents: 0,
    lastMonthStudents: 0,
    growthPercentage: 0,
  });

  const [popularCourses, setPopularCourses] = useState([]);
  
  const [courseData, setCourseData] = useState({
    totalCourses: 0,
    currentMonthCourses: 0,
    lastMonthCourses: 0,
    growthPercentage: 0,
  });

  const [revenueData, setRevenueData] = useState({
    totalRevenue: 0,
    currentMonthRevenue: 0,
    lastMonthRevenue: 0,
    growthPercentage: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to transform API data to component format
  const transformActivityData = (apiData) => {
    return apiData.map((item, index) => {
      const timeAgo = getTimeAgo(item.timestamp);

      return {
        id: index + 1,
        type: item.type,
        user: item.userName,
        action: `purchased ${item.courseTitle}`,
        time: timeAgo,
        icon: item.type === "purchase" ? "💰" : "✅",
      };
    });
  };

  // Helper function to calculate time ago
  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInMs = now - date;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) {
      return "Just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Fetch all data function
  const fetchData = async () => {
    try {
      setLoading(true);

      const [
        studentResponse,
        courseResponse,
        revenueResponse,
        activityResponse,
        popularResponse,
      ] = await Promise.all([
        fetch("http://localhost:5000/admin/students/count"),
        fetch("http://localhost:5000/admin/courses/count"),
        fetch("http://localhost:5000/admin/revenue"),
        fetch("http://localhost:5000/admin/recent-activity"),
        fetch("http://localhost:5000/admin/popular"),
      ]);

      if (
        !studentResponse.ok ||
        !courseResponse.ok ||
        !revenueResponse.ok ||
        !activityResponse.ok ||
        !popularResponse.ok
      ) {
        throw new Error("Failed to fetch data");
      }

      const popularData = await popularResponse.json();
      const studentData = await studentResponse.json();
      const courseData = await courseResponse.json();
      const revenueData = await revenueResponse.json();
      const activityData = await activityResponse.json();

      setStudentData(studentData);
      setCourseData(courseData);
      setRevenueData(revenueData);
      setRecentActivity(transformActivityData(activityData));
      setPopularCourses(popularData);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle refresh data
  const handleRefreshData = async () => {
    await fetchData();
  };

  // Initial data fetch and interval setup
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return {
    studentData,
    courseData,
    revenueData,
    popularCourses,
    recentActivity,
    loading,
    error,
    handleRefreshData
  };
};