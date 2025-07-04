import React from 'react';

export const AssessmentResults = ({ correctAnswers, totalQuestions }) => {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Assessment Results</h2>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between mb-2">
          <span>Score:</span>
          <span className="font-bold">{`${correctAnswers}/${totalQuestions}`}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Percentage:</span>
          <span className="font-bold">{`${percentage}%`}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="text-center mt-4">
          <p className="text-gray-700">
            Thank you for completing the assessment!
          </p>
          <p className="text-gray-700 mb-4">
            Please provide feedback in our survey to help us improve.
          </p>
        </div>
      </div>
    </div>
  );
};