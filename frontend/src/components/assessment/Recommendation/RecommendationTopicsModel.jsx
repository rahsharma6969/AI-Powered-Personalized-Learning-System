// RecommendedTopicsModal.jsx
import React from 'react';
import { FocusAreasSection } from './FocusAreasSection';
import { GeneralRecommendationsSection } from './GeneralRecommendationSection';


export const RecommendedTopicsModal = ({ 
  recommendedTopics, 
  subTopicStats, 
  onClose, 
  onNavigateToDashboard 
}) => {
  if (recommendedTopics.length === 0) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>🎯 Recommended Topics</h3>
          <p>Based on your assessment performance and feedback</p>
        </div>
        
        <FocusAreasSection subTopicStats={subTopicStats} />
        <GeneralRecommendationsSection recommendedTopics={recommendedTopics} />
        
        <button
          onClick={() => {
            onClose();
            onNavigateToDashboard();
          }}
          className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};