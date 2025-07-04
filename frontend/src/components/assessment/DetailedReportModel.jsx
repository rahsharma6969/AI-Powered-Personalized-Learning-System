// 7. Detailed Report Modal Component (components/DetailedReportModal.js)
import React from 'react';
import { ReportHeader } from './ReportHeader';
import { SubTopicPerformance, DifficultyPerformance } from './PerformanceStats';
import { QuestionAnalysis } from './QuestionAnalysis';

export const DetailedReportModal = ({
  isOpen,
  subject,
  correctAnswers,
  totalQuestions,
  subTopicStats,
  detailedResponses,
  onViewRecommendations
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full h-5/6 overflow-auto">
        <h2 className="text-2xl font-bold text-center mb-6">
          Detailed Assessment Report
        </h2>

        <ReportHeader
          subject={subject}
          correctAnswers={correctAnswers}
          totalQuestions={totalQuestions}
        />

        <SubTopicPerformance subTopicStats={subTopicStats} />
        
        <DifficultyPerformance detailedResponses={detailedResponses} />

        <QuestionAnalysis detailedResponses={detailedResponses} />

        <div className="mt-8 flex justify-center">
          <button
            onClick={onViewRecommendations}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 flex items-center"
          >
            View Recommendations
          </button>
        </div>
      </div>
    </div>
  );
};
