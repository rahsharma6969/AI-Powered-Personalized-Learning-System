import React from 'react';
// import  getDifficultyInfo  from '../../utils/assessmentUtils';;
import { getDifficultyInfo } from '../../utils/assessmentUtils';

export const Question = ({ 
  question, 
  questionIndex, 
  selectedAnswer, 
  onSelectAnswer 
}) => {
  const difficultyInfo = getDifficultyInfo(
    question.Difficulty || question["Difficulty Level"] || question.difficulty
  );
  const subTopic = question.subTopic || "Uncategorized";

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">
          {`Q${questionIndex + 1}: ${question.Question.replace(/^Q\d+: /, "")}`}
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
            {subTopic}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full ${difficultyInfo.color}`}>
            {difficultyInfo.text}
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        {["Option A", "Option B", "Option C", "Option D"].map((key, index) => (
          <div
            key={index}
            onClick={() => onSelectAnswer(key)}
            className={`p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedAnswer === key
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
          >
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name={`question-${questionIndex}`}
                checked={selectedAnswer === key}
                onChange={() => onSelectAnswer(key)}
                className="mr-3"
              />
              {question[key]}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};