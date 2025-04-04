import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegClock, FaChartLine, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const RecommendationCard = ({ recommendation, className = '' }) => {
  const defaultRecommendation = {
    id: 1,
    title: 'Algebra Master Class',
    category: 'Mathematics',
    difficulty: 'Intermediate',
    description: 'Based on your recent assessment, we recommend strengthening your algebra skills with this comprehensive course.',
    rating: 4.8,
    reviewsCount: 245,
    duration: '4h 30m',
    thumbnail: 'https://placehold.co/300x200?text=Algebra',
    skills: ['Equations', 'Factoring', 'Functions'],
    matchPercentage: 95
  };
  
  const rec = recommendation || defaultRecommendation;
  
  // Render stars for rating
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
            <FaStar className="text-gray-300" />
            <FaStar className="text-yellow-400 absolute top-0 left-0 overflow-hidden" style={{ width: '50%', clipPath: 'inset(0 50% 0 0)' }} />
          </div>
        );
      } else {
        stars.push(<FaStar key={i} className="text-gray-300" />);
      }
    }
    
    return stars;
  };
  
  return (
    <motion.div 
      className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <img 
          src={rec.thumbnail} 
          alt={rec.title} 
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            rec.category === 'Mathematics' ? 'bg-blue-100 text-blue-800' :
            rec.category === 'Physics' ? 'bg-orange-100 text-orange-800' :
            rec.category === 'Chemistry' ? 'bg-green-100 text-green-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {rec.category}
          </span>
        </div>
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
            {rec.difficulty}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center">
            <FaChartLine className="mr-1 text-green-400" />
            <span className="text-white text-sm font-medium">{rec.matchPercentage}% Match</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-2">{rec.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{rec.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="flex space-x-1 mr-1">
              {renderStars(rec.rating)}
            </div>
            <span className="text-xs text-gray-500">({rec.reviewsCount})</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <FaRegClock className="mr-1" />
            <span>{rec.duration}</span>
          </div>
        </div>
        
        {rec.skills && rec.skills.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-1">Skills you'll learn:</p>
            <div className="flex flex-wrap gap-1">
              {rec.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <Link 
          to={`/courses/${rec.id}`}
          className="w-full mt-2 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          View Course
          <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </motion.div>
  );
};

export default RecommendationCard;
