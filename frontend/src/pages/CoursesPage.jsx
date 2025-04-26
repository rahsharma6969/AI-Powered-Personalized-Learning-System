import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaSortAmountDown } from 'react-icons/fa';
import { motion } from 'framer-motion';

import CourseFilter from '../components/courses/CourseFilter';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ModifiedCourseCard from '../components/courses/CourseCard';
import { useNavigate } from 'react-router-dom';


const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('popular');

  useEffect(() => {
    // Simulating API call to fetch courses
    setTimeout(() => {
      // Mock data - Only Physics, Chemistry and Math courses for 11th and 12th
      const mockCourses = [
        {
          id: 1,
          title: '11th Grade Mathematics: Algebra & Calculus Foundations',
          description: 'Master key mathematical concepts for 11th grade including functions, limits, and introduction to calculus with practice problems and step-by-step solutions.',
          thumbnail: 'https://placehold.co/600x400/indigo/white?text=Math+11',
          category: 'Mathematics',
          level: 'Intermediate',
          rating: 4.8,
          reviewsCount: 312,
          studentsCount: 14560,
          isFree: true,
          duration: '8h 45m',
          instructor: 'Dr. Jane Smith',
          grade: '11th'
        },
        {
          id: 2,
          title: '12th Grade Mathematics: Advanced Calculus & Statistics',
          description: 'Complete preparation for 12th grade mathematics exams with advanced calculus, probability, and statistics modules designed for college readiness.',
          thumbnail: 'https://placehold.co/600x400/indigo/white?text=Math+12',
          category: 'Mathematics',
          level: 'Advanced',
          rating: 4.9,
          reviewsCount: 245,
          studentsCount: 12780,
          isFree: true,
          duration: '10h 30m',
          instructor: 'Prof. David Wilson',
          grade: '12th'
        },
        {
          id: 3,
          title: '11th Grade Physics: Mechanics & Thermodynamics',
          description: 'Build a strong foundation in physics principles with practical examples, interactive simulations, and problem-solving techniques focused on mechanics and thermodynamics.',
          thumbnail: 'https://placehold.co/600x400/orange/white?text=Physics+11',
          category: 'Physics',
          level: 'Intermediate',
          rating: 4.7,
          reviewsCount: 187,
          studentsCount: 9753,
          isFree: true,
          duration: '9h 15m',
          instructor: 'Prof. Robert Johnson',
          grade: '11th'
        },
        {
          id: 4,
          title: '12th Grade Physics: Electromagnetism & Modern Physics',
          description: 'Master electricity, magnetism, optics, and modern physics concepts with experimental demonstrations and exam preparation strategies.',
          thumbnail: 'https://placehold.co/600x400/orange/white?text=Physics+12',
          category: 'Physics',
          level: 'Advanced',
          rating: 4.6,
          reviewsCount: 203,
          studentsCount: 8945,
          isFree: true,
          duration: '11h 20m',
          instructor: 'Dr. Alan Richards',
          grade: '12th'
        },
        {
          id: 5,
          title: '11th Grade Chemistry: Organic Chemistry Fundamentals',
          description: 'Explore the fascinating world of organic chemistry, chemical bonding, and stoichiometry with interactive molecular visualizations and practice problems.',
          thumbnail: 'https://placehold.co/600x400/green/white?text=Chemistry+11',
          category: 'Chemistry',
          level: 'Intermediate',
          rating: 4.8,
          reviewsCount: 156,
          studentsCount: 7421,
          isFree: true,
          duration: '7h 30m',
          instructor: 'Dr. Emily Chang',
          grade: '11th'
        },
        {
          id: 6,
          title: '12th Grade Chemistry: Physical Chemistry & Equilibrium',
          description: 'Master advanced chemistry concepts including chemical equilibrium, thermodynamics, and electrochemistry with real-world applications and exam preparation.',
          thumbnail: 'https://placehold.co/600x400/green/white?text=Chemistry+12',
          category: 'Chemistry',
          level: 'Advanced',
          rating: 4.7,
          reviewsCount: 189,
          studentsCount: 6890,
          isFree: true,
          duration: '9h 45m',
          instructor: 'Prof. Sarah Williams',
          grade: '12th'
        },
        {
          id: 7,
          title: 'Mathematics: Trigonometry & Coordinate Geometry for 11th Grade',
          description: 'Comprehensive coverage of trigonometric functions, identities, and coordinate geometry with visualization tools and exam-focused problem sets.',
          thumbnail: 'https://placehold.co/600x400/indigo/white?text=Trigonometry',
          category: 'Mathematics',
          level: 'Intermediate',
          rating: 4.5,
          reviewsCount: 178,
          studentsCount: 8120,
          isFree: true,
          duration: '6h 50m',
          instructor: 'Dr. Kevin Matthews',
          grade: '11th'
        },
        {
          id: 8,
          title: 'Physics: Waves & Optics for 12th Grade',
          description: 'Detailed exploration of wave phenomena, sound, light, and optical instruments with interactive simulations and problem-solving strategies.',
          thumbnail: 'https://placehold.co/600x400/orange/white?text=Optics',
          category: 'Physics',
          level: 'Advanced',
          rating: 4.8,
          reviewsCount: 167,
          studentsCount: 5923,
          isFree: true,
          duration: '7h 15m',
          instructor: 'Dr. Michelle Parker',
          grade: '12th'
        },
        {
          id: 9,
          title: 'Chemistry: Periodic Table & Chemical Bonds for 11th Grade',
          description: 'Deep dive into the periodic table trends, chemical bonding theories, and molecular structures with 3D visualizations and practice assessments.',
          thumbnail: 'https://placehold.co/600x400/green/white?text=Periodic+Table',
          category: 'Chemistry',
          level: 'Intermediate',
          rating: 4.6,
          reviewsCount: 142,
          studentsCount: 6245,
          isFree: true,
          duration: '8h 10m',
          instructor: 'Prof. Thomas Lee',
          grade: '11th'
        },
        {
          id: 10,
          title: 'Mathematics: Vectors & 3D Geometry for 12th Grade',
          description: 'Master vector algebra, 3D coordinate systems, and spatial geometry with interactive tools and exam-focused problem solving techniques.',
          thumbnail: 'https://placehold.co/600x400/indigo/white?text=Vectors',
          category: 'Mathematics',
          level: 'Advanced',
          rating: 4.7,
          reviewsCount: 198,
          studentsCount: 7645,
          isFree: true,
          duration: '9h 20m',
          instructor: 'Dr. Rachel Cohen',
          grade: '12th'
        },
        {
          id: 11,
          title: 'Physics: Rotational Dynamics for 11th Grade',
          description: 'Comprehensive coverage of rotational motion, torque, angular momentum, and moment of inertia with practical demonstrations and solved examples.',
          thumbnail: 'https://placehold.co/600x400/orange/white?text=Rotation',
          category: 'Physics',
          level: 'Intermediate',
          rating: 4.5,
          reviewsCount: 132,
          studentsCount: 5842,
          isFree: true,
          duration: '6h 40m',
          instructor: 'Prof. James Wilson',
          grade: '11th'
        },
        {
          id: 12,
          title: 'Chemistry: Organic Reactions & Mechanisms for 12th Grade',
          description: 'Detailed exploration of organic reaction mechanisms, functional groups, and synthesis strategies with practice problems and visualization tools.',
          thumbnail: 'https://placehold.co/600x400/green/white?text=Organic',
          category: 'Chemistry',
          level: 'Advanced',
          rating: 4.8,
          reviewsCount: 157,
          studentsCount: 6130,
          isFree: true,
          duration: '10h 15m',
          instructor: 'Dr. Olivia Martinez',
          grade: '12th'
        }
      ];
      
      setCourses(mockCourses);
      setFilteredCourses(mockCourses);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Filter courses based on search term
    if (searchTerm) {
      const filtered = courses.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.grade.toLowerCase().includes(searchTerm.toLowerCase())
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
      case 'popular':
        sorted.sort((a, b) => b.studentsCount - a.studentsCount);
        break;
      case 'highestRated':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // In a real app, you would sort by date
        sorted.sort((a, b) => b.id - a.id);
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
      filtered = filtered.filter(course => 
        filters.categories.includes(course.category.toLowerCase())
      );
    }
    
    // Filter by levels
    if (filters.levels && filters.levels.length > 0) {
      filtered = filtered.filter(course => 
        filters.levels.includes(course.level.toLowerCase())
      );
    }
    
    // Filter by grade
    if (filters.grades && filters.grades.length > 0) {
      filtered = filtered.filter(course => 
        filters.grades.includes(course.grade.toLowerCase())
      );
    }
    
    // Filter by rating
    if (filters.rating) {
      const ratingValue = parseInt(filters.rating);
      filtered = filtered.filter(course => course.rating >= ratingValue);
    }
    
    // Filter by duration
    if (filters.duration) {
      const getDurationInMinutes = (durationStr) => {
        const [hours, minutes] = durationStr.replace(/[^0-9h m]/g, '').split('h');
        return parseInt(hours) * 60 + parseInt(minutes.replace('m', ''));
      };
      
      filtered = filtered.filter(course => {
        const durationMinutes = getDurationInMinutes(course.duration);
        
        if (filters.duration === 'short') {
          return durationMinutes < 300; // Less than 5 hours
        } else if (filters.duration === 'medium') {
          return durationMinutes >= 300 && durationMinutes <= 540; // 5-9 hours
        } else if (filters.duration === 'long') {
          return durationMinutes > 540; // More than 9 hours
        }
        
        return true;
      });
    }
    
    setFilteredCourses(filtered);
  };

  // Custom CourseCard component modified to remove price and show "Enroll for Free"
  const ModifiedCourseCard = ({ course }) => {
    const navigate = useNavigate();

  const handleEnrollClick = () => {
    // Navigate to the course details page when "Enroll for Free" is clicked
    navigate(`/courses/${course.id}`);
  };
    return (
      <motion.div 
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
        <div className="relative h-48">
          <img 
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-full">
            {course.grade} Grade
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2">{course.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
          
          <div className="flex items-center mb-3">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="font-medium text-gray-900">{course.rating.toFixed(1)}</span>
            <span className="text-gray-500 text-sm ml-1">({course.reviewsCount} reviews)</span>
          </div>
          
          <div className="flex items-center text-gray-600 text-sm mb-4">
            <span className="mr-3">{course.instructor}</span>
            <span>{course.duration}</span>
          </div>
          
          <div className="flex justify-between items-center mt-auto">
        <span className="text-sm text-gray-500">{course.studentsCount.toLocaleString()} students</span>
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar /> */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-indigo-700 rounded-xl p-8 mb-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-white mb-4">11th & 12th Grade Science Courses</h1>
            <p className="text-indigo-100 mb-6">
              Discover free specialized courses in Physics, Chemistry, and Mathematics designed specifically 
              for 11th and 12th grade students. Master key concepts and prepare for exams with our 
              comprehensive courses taught by expert educators.
            </p>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full bg-white pl-10 pr-3 py-3 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700"
                placeholder="Search for Physics, Chemistry, or Math courses..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar filters - would be hidden on mobile and shown with a modal */}
          <div className="hidden md:block md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
              <CourseFilter 
                onApplyFilters={handleFilterApply} 
                subjects={['physics', 'chemistry', 'mathematics']} 
                grades={['11th', '12th']}
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
                  Sort by: {sortOption === 'popular' ? 'Most Popular' : 
                             sortOption === 'highestRated' ? 'Highest Rated' :
                             'Newest'}
                </button>
                
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 hidden">
                  <div className="py-1">
                    <button 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => handleSort('popular')}
                    >
                      Most Popular
                    </button>
                    <button 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => handleSort('highestRated')}
                    >
                      Highest Rated
                    </button>
                    <button 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => handleSort('newest')}
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
                Showing <span className="font-semibold">{filteredCourses.length}</span> courses
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
            ) : (
              filteredCourses.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {filteredCourses.map(course => (
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
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No courses found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filter criteria to find what you're looking for.
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setFilteredCourses(courses);
                      }}
                      className="btn btn-primary"
                    >
                      Clear all filters
                    </button>
                  </div>
                </div>
              )
            )}
            
            {/* Pagination */}
            {filteredCourses.length > 0 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center">
                  <button className="inline-flex items-center px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-l-md disabled:opacity-50" disabled>
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