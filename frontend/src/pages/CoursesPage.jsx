
import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter, FaSortAmountDown } from "react-icons/fa";
import { motion } from "framer-motion";

import CourseFilter from "../components/courses/CourseFilter";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ModifiedCourseCard from "../components/courses/CourseCard";
import { useNavigate } from "react-router-dom";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("popular");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("http://localhost:5000/api/courses");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Handle different response formats
        let coursesArray = [];
        if (Array.isArray(data)) {
          coursesArray = data;
        } else if (data && data.courses && Array.isArray(data.courses)) {
          coursesArray = data.courses;
        } else if (data && data.data && Array.isArray(data.data)) {
          coursesArray = data.data;
        }

        setCourses(coursesArray);
        setFilteredCourses(coursesArray);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    // Filter courses based on search term
    if (searchTerm) {
      const filtered = courses.filter(
        (course) =>
          course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          course.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.grade?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses(courses);
    }
  }, [searchTerm, courses]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (option) => {
    setSortOption(option);
    let sorted = [...filteredCourses];

    switch (option) {
      case "popular":
        sorted.sort((a, b) => (b.studentsCount || 0) - (a.studentsCount || 0));
        break;
      case "highestRated":
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
        // Sort by ID or createdAt if available
        sorted.sort((a, b) => (b.id || 0) - (a.id || 0));
        break;
      default:
        break;
    }

    setFilteredCourses(sorted);
  };

  const handleFilterApply = (filters) => {
    let filtered = [...courses];

    // Filter by categories
    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter((course) =>
        filters.categories.includes(course.category?.toLowerCase())
      );
    }

    // Filter by levels
    if (filters.levels && filters.levels.length > 0) {
      filtered = filtered.filter((course) =>
        filters.levels.includes(course.level?.toLowerCase())
      );
    }

    // Filter by grade
    if (filters.grades && filters.grades.length > 0) {
      filtered = filtered.filter((course) =>
        filters.grades.includes(course.grade?.toLowerCase())
      );
    }

    // Filter by rating
    if (filters.rating) {
      const ratingValue = parseInt(filters.rating);
      filtered = filtered.filter(
        (course) => (course.rating || 0) >= ratingValue
      );
    }

    // Filter by duration
    if (filters.duration) {
      const getDurationInMinutes = (durationStr) => {
        if (!durationStr) return 0;
        const matches = durationStr.match(/(\d+)h?\s*(\d+)?m?/);
        if (!matches) return 0;
        const hours = parseInt(matches[1]) || 0;
        const minutes = parseInt(matches[2]) || 0;
        return hours * 60 + minutes;
      };

      filtered = filtered.filter((course) => {
        const durationMinutes = getDurationInMinutes(course.duration);

        if (filters.duration === "short") {
          return durationMinutes < 300; // Less than 5 hours
        } else if (filters.duration === "medium") {
          return durationMinutes >= 300 && durationMinutes <= 540; // 5-9 hours
        } else if (filters.duration === "long") {
          return durationMinutes > 540; // More than 9 hours
        }

        return true;
      });
    }

    setFilteredCourses(filtered);
  };

  // Clean ModifiedCourseCard component without debug info
  const ModifiedCourseCard = ({ course }) => {
    const navigate = useNavigate();
    const [imageError, setImageError] = useState(false);

    const handleEnrollClick = () => {
      navigate(`/courses/${course.id}`);
    };

    const getImageUrl = (coverImage) => {
      if (!coverImage) {
        return "https://placehold.co/600x400/6366f1/white?text=Course";
      }
      
      // If it already starts with /uploads/, use it as is
      if (coverImage.startsWith('/uploads/')) {
        return `http://localhost:5000${coverImage}`;
      }
      
      // If it's just a filename, add the /uploads/ prefix
      return `http://localhost:5000/uploads/${coverImage}`;
    };

    const imageUrl = getImageUrl(course.coverImage);

    return (
      <motion.div
        className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative h-48">
          {!imageError ? (
            <img
              src={imageUrl}
              alt={course.title || "Course"}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">Course</span>
            </div>
          )}
          
          {course.grade && (
            <div className="absolute top-2 right-2 bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-full">
              {course.grade} Grade
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2">
            {course.title || "Untitled Course"}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {course.description || "No description available"}
          </p>

          {course.rating && (
            <div className="flex items-center mb-3">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="font-medium text-gray-900">
                {course.rating.toFixed(1)}
              </span>
              {course.reviewsCount && (
                <span className="text-gray-500 text-sm ml-1">
                  ({course.reviewsCount} reviews)
                </span>
              )}
            </div>
          )}

          <div className="flex items-center text-gray-600 text-sm mb-4">
            {course.instructor && (
              <span className="mr-3">{course.instructor}</span>
            )}
            {course.duration && <span>{course.duration}</span>}
          </div>

          <div className="flex justify-between items-center mt-auto">
            <span className="text-sm text-gray-500">
              {course.studentsCount
                ? `${course.studentsCount.toLocaleString()} students`
                : "0 students"}
            </span>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
              onClick={handleEnrollClick}
            >
              Enroll for Free
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              Error loading courses
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {error}. Please check if the API server is running and try again.
            </p>
            <div className="mt-6">
              <button
                onClick={() => window.location.reload()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-indigo-700 rounded-xl p-8 mb-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-white mb-4">
              Available Courses
            </h1>
            <p className="text-indigo-100 mb-6">
              Discover our comprehensive collection of courses designed to help
              you master key concepts and achieve your learning goals. All
              courses are available for free enrollment.
            </p>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full bg-white pl-10 pr-3 py-3 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700"
                placeholder="Search for courses..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar filters */}
          <div className="hidden md:block md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Filters
              </h2>
              <CourseFilter
                onApplyFilters={handleFilterApply}
                subjects={["physics", "chemistry", "mathematics"]}
                grades={["11th", "12th"]}
              />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Mobile filters and sorting */}
            <div className="mb-6 flex space-x-4 md:justify-end">
              <div className="md:hidden">
                <button className="btn btn-secondary flex items-center">
                  <FaFilter className="mr-2" />
                  Filters
                </button>
              </div>

              <div className="relative">
                <button className="btn btn-secondary flex items-center">
                  <FaSortAmountDown className="mr-2" />
                  Sort by:{" "}
                  {sortOption === "popular"
                    ? "Most Popular"
                    : sortOption === "highestRated"
                    ? "Highest Rated"
                    : "Newest"}
                </button>

                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 hidden">
                  <div className="py-1">
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => handleSort("popular")}
                    >
                      Most Popular
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => handleSort("highestRated")}
                    >
                      Highest Rated
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => handleSort("newest")}
                    >
                      Newest
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing{" "}
                <span className="font-semibold">{filteredCourses.length}</span>{" "}
                courses
              </p>
            </div>

            {/* Courses grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm h-96 animate-pulse"
                  >
                    <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
                      <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
                      <div className="h-4 bg-gray-300 rounded mb-4 w-2/3"></div>
                      <div className="h-10 bg-gray-300 rounded mt-auto"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredCourses.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {filteredCourses.map((course) => (
                  <ModifiedCourseCard key={course.id} course={course} />
                ))}
              </motion.div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No courses found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter criteria to find what
                  you're looking for.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setFilteredCourses(courses);
                    }}
                    className="btn btn-primary"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            )}

            {/* Pagination */}
            {filteredCourses.length > 0 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center">
                  <button
                    className="inline-flex items-center px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-l-md disabled:opacity-50"
                    disabled
                  >
                    Previous
                  </button>
                  <button className="inline-flex items-center px-4 py-2 border border-indigo-500 bg-indigo-50 text-sm font-medium text-indigo-600">
                    1
                  </button>
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    2
                  </button>
                  <button className="inline-flex items-center px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-r-md">
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;