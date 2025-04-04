import React from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaRegClock, FaRegStar, FaRegCheckCircle, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CoursesList = ({ courses, className = '' }) => {
  // Default courses if none provided
  const defaultCourses = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      thumbnail: 'https://placehold.co/120x80?text=Math',
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      duration: '5h 30m',
      lastAccessed: '2 days ago'
    },
    {
      id: 2,
      title: 'Physics Fundamentals',
      thumbnail: 'https://placehold.co/120x80?text=Physics',
      progress: 60,
      totalLessons: 32,
      completedLessons: 19,
      duration: '8h 15m',
      lastAccessed: '1 week ago'
    },
    {
      id: 3,
      title: 'Chemistry Labs',
      thumbnail: 'https://placehold.co/120x80?text=Chemistry',
      progress: 45,
      totalLessons: 20,
      completedLessons: 9,
      duration: '4h 45m',
      lastAccessed: '3 days ago'
    },
    {
      id: 4,
      title: 'Programming Basics',
      thumbnail: 'https://placehold.co/120x80?text=Programming',
      progress: 90,
      totalLessons: 18,
      completedLessons: 16,
      duration: '6h 20m',
      lastAccessed: 'Yesterday'
    },
  ];
  
  const coursesToDisplay = courses || defaultCourses;
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div 
      className={`bg-white rounded-xl shadow-sm p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">My Courses</h2>
        <Link to="/courses" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
          View All
        </Link>
      </div>
      
      <motion.div 
        className="space-y-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {coursesToDisplay.map((course) => (
          <motion.div 
            key={course.id}
            variants={item}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex">
              <img 
                src={course.thumbnail} 
                alt={course.title} 
                className="w-24 h-16 rounded object-cover mr-4"
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-800">{course.title}</h3>
                  <Link 
                    to={`/courses/${course.id}`}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    <FaChevronRight />
                  </Link>
                </div>
                
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <FaGraduationCap className="mr-1" />
                  <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                  <span className="mx-2">•</span>
                  <FaRegClock className="mr-1" />
                  <span>{course.duration}</span>
                </div>
                
                <div className="mt-2">
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-gray-500">Progress</span>
                    <span className="text-indigo-600">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-indigo-600 h-1.5 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {coursesToDisplay.length === 0 && (
        <div className="text-center py-8">
          <FaRegStar className="mx-auto h-12 w-12 text-gray-300" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No courses yet</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by enrolling in a course.</p>
          <div className="mt-6">
            <Link
              to="/courses"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <FaRegCheckCircle className="-ml-1 mr-2 h-5 w-5" />
              Browse Courses
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CoursesList;