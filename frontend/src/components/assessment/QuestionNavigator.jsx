import React from 'react';
// import {getDifficultyInfo } from '../../utils/assessmentUtils';
import { getDifficultyInfo } from '../../utils/assessmentUtils';
export const QuestionNavigator = ({ 
  questions, 
  currentQuestion, 
  selectedAnswers, 
  onQuestionSelect 
}) => (
  <div className="mt-6 flex flex-wrap gap-2 justify-center">
    {questions.map((question, index) => {
      const difficultyInfo = getDifficultyInfo(
        question.Difficulty || question.difficulty
      );
      
      let borderColor = "border-gray-300";
      if (difficultyInfo.text === "Easy") borderColor = "border-green-500";
      else if (difficultyInfo.text === "Medium") borderColor = "border-yellow-500";
      else if (difficultyInfo.text === "Hard") borderColor = "border-red-500";

      return (
        <button
          key={index}
          onClick={() => onQuestionSelect(index)}
          className={`w-10 h-10 rounded-full border-2 ${borderColor} ${
            currentQuestion === index
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          } ${selectedAnswers[question.Question] ? "font-bold" : ""}`}
        >
          {index + 1}
        </button>
      );
    })}
  </div>
);
