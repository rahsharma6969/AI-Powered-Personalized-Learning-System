// FocusAreasSection.jsx
export const FocusAreasSection = ({ subTopicStats }) => {
  const needsImprovement = Object.entries(subTopicStats)
    .filter(([_, stats]) => stats.percentage < 60);
    
  const continuePracticing = Object.entries(subTopicStats)
    .filter(([_, stats]) => stats.percentage >= 60 && stats.percentage < 80);

  return (
    <div className="focus-areas-section">
      <h4>Focus Areas:</h4>
      
      {needsImprovement.length > 0 && (
        <div className="needs-improvement">
          {needsImprovement.map(([topic, _], index) => (
            <div key={index} className="topic-item">
              • {topic} - Needs improvement
            </div>
          ))}
        </div>
      )}
      
      {continuePracticing.length > 0 && (
        <div className="continue-practicing">
          {continuePracticing.map(([topic, _], index) => (
            <div key={index} className="topic-item">
              • {topic} - Continue practicing
            </div>
          ))}
        </div>
      )}
    </div>
  );
};