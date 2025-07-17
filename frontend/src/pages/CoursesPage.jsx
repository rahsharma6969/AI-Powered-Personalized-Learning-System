import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  ArrowDown,
  Star,
  Clock,
  Users,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
// Add this import at the top
import { useNavigate } from 'react-router-dom';
const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("popular");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Try to fetch from API, fall back to mock data
        try {
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
        } catch (apiError) {
          console.log("API not available, using mock data");
     
        }

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
    if (searchTerm.trim()) {
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
    setShowSortDropdown(false);
    let sorted = [...filteredCourses];

    switch (option) {
      case "popular":
        sorted.sort((a, b) => (b.studentsCount || 0) - (a.studentsCount || 0));
        break;
      case "highestRated":
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
        sorted.sort((a, b) => {
          const aId = a._id || a.id || "0";
          const bId = b._id || b.id || "0";
          return bId.toString().localeCompare(aId.toString());
        });
        break;
      default:
        break;
    }

    setFilteredCourses(sorted);
  };

  // Simple filter component
  const SimpleFilter = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedGrade, setSelectedGrade] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");

    const applyFilters = () => {
      let filtered = [...courses];

      if (selectedCategory) {
        filtered = filtered.filter(
          (course) =>
            course.category?.toLowerCase() === selectedCategory.toLowerCase()
        );
      }

      if (selectedGrade) {
        filtered = filtered.filter(
          (course) =>
            course.grade?.toLowerCase() === selectedGrade.toLowerCase()
        );
      }

      if (selectedLevel) {
        filtered = filtered.filter(
          (course) =>
            course.level?.toLowerCase() === selectedLevel.toLowerCase()
        );
      }

      setFilteredCourses(filtered);
      setShowFilters(false);
    };

    const clearFilters = () => {
      setSelectedCategory("");
      setSelectedGrade("");
      setSelectedLevel("");
      setFilteredCourses(courses);
      setShowFilters(false);
    };

    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button
            onClick={() => setShowFilters(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Categories</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="mathematics">Mathematics</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grade
            </label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Grades</option>
              <option value="11th">11th Grade</option>
              <option value="12th">12th Grade</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Level
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="flex space-x-2 pt-4">
            <button
              onClick={applyFilters}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Apply Filters
            </button>
            <button
              onClick={clearFilters}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Helper function to safely render text content
  const safeRenderText = (value, fallback = "") => {
    if (typeof value === "string") return value;
    if (typeof value === "number") return value.toString();
    if (value && typeof value === "object") {
      // If it's an object, try to extract a name or title property
      return value.name || value.title || value.text || fallback;
    }
    return fallback;
  };

  // Function to get course ID
  const getCourseId = (course) => {
    return (
      course._id || course.id || course.courseId || Math.random().toString()
    );
  };

  // Course Details Component (Demo)
  const CourseDetailsPage = () => {
    const course = courses.find((c) => getCourseId(c) === selectedCourseId);

    if (!course) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Course not found
            </h2>
            <button
              onClick={navigateBack}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Back to Courses
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={navigateBack}
            className="flex items-center text-indigo-600 hover:text-indigo-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </button>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="h-64 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <h1 className="text-3xl font-bold text-white text-center px-4">
                {course.title}
              </h1>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Course Description
                  </h2>
                  <p className="text-gray-600 mb-6">{course.description}</p>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      What you'll learn
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>
                        • Comprehensive understanding of {course.category}
                      </li>
                      <li>• Practical problem-solving techniques</li>
                      <li>• Real-world applications and examples</li>
                      <li>• Assessment and practice exercises</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Course Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Instructor</p>
                          <p className="font-medium">
                            {course.instructor && (
                              <div className="instructor-details">
                                <img
                                  src={course.instructor.avatar}
                                  alt={course.instructor.name}
                                />
                                <h3>{course.instructor.name}</h3>
                                <p>{course.instructor.bio}</p>
                              </div>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Duration</p>
                          <p className="font-medium">{course.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Rating</p>
                          <p className="font-medium">{course.rating}/5.0</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                    Start Learning
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Course Card
  const EnhancedCourseCard = ({ course }) => {
  const [imageError, setImageError] = useState(false);
  const courseId = getCourseId(course);

  const handleEnrollClick = (e) => {
    e.stopPropagation();
    // Navigate to course content page
    navigate(`/course/${courseId}`);
  };

  const handleViewDetails = () => {
    // Navigate to course content page when clicking on the card
    navigate(`/course/${courseId}`);
  };

    const getImageUrl = (coverImage) => {
      if (!coverImage) {
        return "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&h=400&fit=crop";
      }

      if (coverImage.startsWith("/uploads/")) {
        return `http://localhost:5000${coverImage}`;
      }

      return `http://localhost:5000/uploads/${coverImage}`;
    };

    const imageUrl = getImageUrl(course.coverImage);

    return (
      <div
        className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
        onClick={handleViewDetails}
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
              <span className="text-white text-2xl font-bold">
                {course.category?.charAt(0).toUpperCase() || "C"}
              </span>
            </div>
          )}

          {course.grade && (
            <div className="absolute top-2 right-2 bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-full">
              {safeRenderText(course.grade)} Grade
            </div>
          )}

          {course.level && (
            <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {safeRenderText(course.level)}
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2">
            {safeRenderText(course.title, "Untitled Course")}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {safeRenderText(course.description, "No description available")}
          </p>

          {course.rating && (
            <div className="flex items-center mb-3">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-medium text-gray-900 ml-1">
                {course.rating.toFixed(1)}
              </span>
              {course.reviewsCount && (
                <span className="text-gray-500 text-sm ml-1">
                  ({course.reviewsCount} reviews)
                </span>
              )}
            </div>
          )}

          <div className="flex items-center text-gray-600 text-sm mb-4 space-x-4">
            {course.instructor && (
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {safeRenderText(course.instructor, "Unknown Instructor")}
              </span>
            )}
            {course.duration && (
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {safeRenderText(course.duration, "Duration not specified")}
              </span>
            )}
          </div>

          <div className="flex justify-between items-center mt-auto">
            <span className="text-sm text-gray-500">
              {course.studentsCount
                ? `${course.studentsCount.toLocaleString()} students`
                : "0 students"}
            </span>

            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 z-10"
              onClick={handleEnrollClick}
            >
              Enroll 
            </button>
          </div>
        </div>
      </div>
    );
  };

  const getSortLabel = (option) => {
    switch (option) {
      case "popular":
        return "Most Popular";
      case "highestRated":
        return "Highest Rated";
      case "newest":
        return "Newest";
      default:
        return "Most Popular";
    }
  };



  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Error loading courses
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            {error}. Please check if the API server is running and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
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
                <Search className="h-5 w-5 text-gray-400" />
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

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar filters - Desktop */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <SimpleFilter />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Mobile filters and sorting */}
            <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 sm:justify-end">
              <div className="lg:hidden">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full sm:w-auto bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </button>
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="w-full sm:w-auto bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center"
                >
                  <ArrowDown className="mr-2 h-4 w-4" />
                  Sort by: {getSortLabel(sortOption)}
                </button>

                {showSortDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10">
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
                )}
              </div>
            </div>

            {/* Mobile filters */}
            {showFilters && (
              <div className="lg:hidden mb-6">
                <SimpleFilter />
              </div>
            )}

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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <EnhancedCourseCard
                    key={getCourseId(course)}
                    course={course}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No courses found
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Try adjusting your search or filter criteria to find what
                  you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilteredCourses(courses);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
