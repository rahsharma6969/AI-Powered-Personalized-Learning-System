import React from 'react';
import { SurveyField } from './Surveyfield';
import { SURVEY_QUESTIONS } from '../constants/SurveyConfig';

export const SurveyModal = ({ 
  isOpen, 
  surveyResponse, 
  onSurveyChange, 
  onSubmit 
}) => {
  if (!isOpen) return null;

  const handleFieldChange = (fieldKey, value) => {
    onSurveyChange({ target: { name: fieldKey, value } });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
        <h2 className="text-xl font-bold mb-2">We'd love your feedback!</h2>

        {SURVEY_QUESTIONS.map((question) => (
          <SurveyField
            key={question.key}
            question={question}
            value={surveyResponse[question.key]}
            onChange={handleFieldChange}
          />
        ))}

        <div className="flex justify-end space-x-2">
          <button
            onClick={onSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};