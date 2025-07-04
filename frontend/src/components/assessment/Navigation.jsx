
// 4. Navigation Component (components/Navigation.js)
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Navigation = ({ 
  currentQuestion, 
  totalQuestions, 
  onPrevious, 
  onNext, 
  onSubmit 
}) => (
  <div className="flex justify-between mt-6">
    <button
      onClick={onPrevious}
      disabled={currentQuestion === 0}
      className={`flex items-center px-4 py-2 rounded-md ${
        currentQuestion === 0
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      <ChevronLeft className="w-4 h-4 mr-1" /> Previous
    </button>
    
    {currentQuestion < totalQuestions - 1 ? (
      <button
        onClick={onNext}
        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Next <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    ) : (
      <button
        onClick={onSubmit}
        className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Submit Assessment
      </button>
    )}
  </div>
);