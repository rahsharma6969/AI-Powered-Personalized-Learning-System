import React from 'react';
import { Check, X } from 'lucide-react';
import { getDifficultyInfo } from '../../utils/assessmentUtils';;

const AnswerOption = ({ 
  option, 
  optionText, 
  isCorrect, 
  isSelected, 
  correctAnswer 
}) => {
  const getOptionStyle = () => {
    if (isCorrect) return "bg-green-100 border border-green-300";
    if (isSelected && !isCorrect) return "bg-red-100 border border-red-300";
    return "bg-gray-50 border border-gray-200";
  };

  const getOptionLabel = () => {
    if (isCorrect) return <span className="text-green-600">✓ Correct</span>;
    if (isSelected && !isCorrect) return <span className="text-red-600">× Your answer</span>;
    return null;
  };

  return (
    <div className={`p-2 rounded-md ${getOptionStyle()}`}>
      <span className="font-medium mr-2">{option}:</span>
      <span>{optionText}</span>
      {(isCorrect || isSelected) && (
        <span className="ml-2">{getOptionLabel()}</span>
      )}
    </div>
  );
};

export const QuestionAnalysisItem = ({ response, index }) => {
  const difficultyInfo = getDifficultyInfo(response.difficulty);

  return (
    <div
      className={`border-l-4 ${
        response.isCorrect ? "border-green-500" : "border-red-500"
      } p-4 rounded-lg shadow-sm`}
    >
      <div className="flex flex-wrap justify-between items-start mb-2">
        <h4 className="font-medium flex items-center">
          {response.isCorrect ? (
            <Check className="w-5 h-5 text-green-600 mr-2" />
          ) : (
            <X className="w-5 h-5 text-red-600 mr-2" />
          )}
          Question {index + 1}
        </h4>
        <div className="flex gap-2 flex-wrap">
          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
            {response.subTopic}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full ${difficultyInfo.color}`}>
            {difficultyInfo.text}
          </span>
        </div>
      </div>

      <p className="mb-3">{response.question.replace(/^Q\d+: /, "")}</p>

      <div className="grid grid-cols-1 gap-2 mb-2">
        {["A", "B", "C", "D"].map((option, i) => {
          const optionText = response[`option${option}`];
          const isCorrect = response.correctAnswer === option;
          const isSelected = response.selectedOption === `Option ${option}`;

          return (
            <AnswerOption
              key={i}
              option={option}
              optionText={optionText}
              isCorrect={isCorrect}
              isSelected={isSelected}
              correctAnswer={response.correctAnswer}
            />
          );
        })}
      </div>

      {!response.isCorrect && (
        <div className="bg-blue-50 p-3 rounded-md mt-2 text-sm">
          <p className="font-medium text-blue-800">Explanation:</p>
          <p>The correct answer is Option {response.correctAnswer}.</p>
          {response.selectedOption ? (
            <p>
              You selected Option{" "}
              {response.selectedOption.replace("Option ", "")}.
            </p>
          ) : (
            <p>You did not select an answer for this question.</p>
          )}
        </div>
      )}
    </div>
  );
};

export const QuestionAnalysis = ({ detailedResponses }) => (
  <div className="space-y-6">
    <h3 className="font-bold text-lg">Question Analysis</h3>
    {detailedResponses.map((response, index) => (
      <QuestionAnalysisItem 
        key={index} 
        response={response} 
        index={index} 
      />
    ))}
  </div>
);