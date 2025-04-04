import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar, FaRegClock, FaUserGraduate, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CourseCard = ({ 
  course, 
  compact = false,
  className = '' 
}) => {
  // Render full or half stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <FaRegStar className="text-yellow-400" />
            <FaStar className="text-yellow-400 absolute top-0 left-0 overflow-hidden" style={{ width: '50%', clipPath: 'inset(0 50% 0 0)' }} />
          </div>
        );
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    
    return stars;
  };
  
  if (compact) {
    return (
      <motion.div 
        className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow ${className}`}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <Link to={`/courses/${course.id}`} className="block">
          <div className="relative">
            <img 
              src={course.thumbnail || 'https://placehold.co/400x200?text=Course+Image'} 
              alt={course.title} 
              className="w-full h-40 object-cover"
            />
            {course.level && (
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-600 text-white">
                  {course.level}
                </span>
              </div>
            )}
            {course.price === 0 ? (
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-600 text-white">
                  Free
                </span>
              </div>
            ) : (
              course.discountPrice && (
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-600 text-white">
                    Sale
                  </span>
                </div>
              )
            )}
          </div>
          <div className="p-4">
            <h3 className="font-bold text-gray-800 mb-1 line-clamp-1">{course.title}</h3>
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <div className="flex space-x-1 mr-2">
                {renderStars(course.rating)}
              </div>
              <span>({course.reviewsCount})</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-indigo-600 font-semibold">
                {course.price === 0 ? (
                  <span>Free</span>
                ) : course.discountPrice ? (
                  <div>
                    <span className="text-gray-400 line-through text-sm mr-2">${course.price}</span>
                    <span>${course.discountPrice}</span>
                  </div>
                ) : (
                  <span>${course.price}</span>
                )}
              </div>
              <FaChevronRight className="text-gray-400" />
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow ${className}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/courses/${course.id}`} className="block">
        <div className="relative">
          <img 
            src={course.thumbnail || 'https://placehold.co/600x300?text=Course+Image'} 
            alt={course.title} 
            className="w-full h-52 object-cover"
          />
          {course.level && (
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-600 text-white">
                {course.level}
              </span>
            </div>
          )}
          {course.price === 0 ? (
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-600 text-white">
                Free
              </span>
            </div>
          ) : (
            course.discountPrice && (
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-600 text-white">
                  Sale
                </span>
              </div>
            )
          )}
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-500">{course.category}</div>
            <div className="flex items-center text-sm">
              <div className="flex space-x-1 mr-1">
                {renderStars(course.rating)}
              </div>
              <span className="text-gray-500">({course.reviewsCount})</span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{course.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <FaRegClock className="mr-1" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <FaUserGraduate className="mr-1" />
              <span>{course.studentsCount} students</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-indigo-600 font-bold text-lg">
              {course.price === 0 ? (
                <span>Free</span>
              ) : course.discountPrice ? (
                <div>
                  <span className="text-gray-400 line-through text-sm mr-2">${course.price}</span>
                  <span>${course.discountPrice}</span>
                </div>
              ) : (
                <span>${course.price}</span>
              )}
            </div>
            <button className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
              <span>View Course</span>
              <FaChevronRight className="ml-1" size={12} />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CourseCard;
