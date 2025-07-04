// 6. Report Header Component (components/ReportHeader.js)
import React from 'react';

export const ReportHeader = ({ 
  subject, 
  correctAnswers, 
  totalQuestions 
}) => {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-bold text-lg">
            {subject.charAt(0).toUpperCase() + subject.slice(1)}
          </h3>
          <p className="text-gray-600">
            Assessment completed on {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <p className="font-bold text-xl">{percentage}%</p>
          <p className="text-gray-600">
            {correctAnswers} of {totalQuestions} correct
          </p>
        </div>
      </div>
    </div>
  );
};