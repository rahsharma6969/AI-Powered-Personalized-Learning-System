export const GeneralRecommendationsSection = ({ recommendedTopics }) => {
  return (
    <div className="general-recommendations-section">
      <h4>General Recommendations:</h4>
      <div className="recommendations-list">
        {recommendedTopics.map((topic, index) => (
          <div key={index} className="recommendation-item">
            • {topic}
          </div>
        ))}
      </div>
    </div>
  );
};