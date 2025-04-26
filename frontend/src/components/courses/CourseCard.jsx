import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ModifiedCourseCard = ({ course }) => {
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
          <Link
            to={`/courses/${course.id}`}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Enroll for Free
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ModifiedCourseCard;