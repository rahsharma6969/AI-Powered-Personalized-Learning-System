// 8. Custom Hook for Survey and Report Logic (hooks/useSurveyReport.js)
import { useState } from 'react';
import axios from 'axios';
import { INITIAL_SURVEY_STATE } from '../components/constants/SurveyConfig';

export const useSurveyReport = (user, subTopicStats, subject) => {
  const [showSurvey, setShowSurvey] = useState(false);
  const [showDetailedReport, setShowDetailedReport] = useState(false);
  const [surveyResponse, setSurveyResponse] = useState(INITIAL_SURVEY_STATE);
  const [recommendedTopics, setRecommendedTopics] = useState([]);

  const handleSurveyChange = (e) => {
    const { name, value } = e.target;
    setSurveyResponse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSurveySubmit = async () => {
    if (!user) {
      alert("User not logged in!");
      return;
    }

    try {
      const userId = user._id || user.id;
      
      await axios.post(
        `http://localhost:5000/api/assessments/survey/${userId}`,
        surveyResponse
      );

      setShowSurvey(false);
      setShowDetailedReport(true);
    } catch (error) {
      console.error("Survey submission error:", error);
      alert("Something went wrong during survey submission.");
      
      setShowSurvey(false);
      setShowDetailedReport(true);
    }
  };

  const handleViewRecommendations = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/recommend",
        {
          responses: [
            surveyResponse.satisfaction,
            surveyResponse.difficulty,
            surveyResponse.preferredMaterial,
            surveyResponse.timeSpentStudying,
            surveyResponse.motivationLevel,
            surveyResponse.comments,
            surveyResponse.memorizationVsApplication || "Application",
            surveyResponse.timeManagement || "Yes",
          ],
          subTopicStats: subTopicStats,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      setShowDetailedReport(false);

      if (response.data.recommended_topics) {
        setRecommendedTopics(response.data.recommended_topics);
      } else {
        generateFallbackRecommendations();
      }
    } catch (error) {
      console.error("Recommendation error:", error);
      generateFallbackRecommendations();
      setShowDetailedReport(false);
    }
  };

  const generateFallbackRecommendations = () => {
    const poorPerformanceTopics = Object.entries(subTopicStats)
      .filter(([_, stats]) => stats.percentage < 60)
      .map(([topic, _]) => topic);

    if (poorPerformanceTopics.length > 0) {
      setRecommendedTopics([
        `Focus on improving your understanding of ${poorPerformanceTopics.join(", ")}`,
        `Review core concepts in ${subject}`,
        `Practice more problems with time constraints`,
      ]);
    } else {
      setRecommendedTopics([
        "Review fundamentals of " + subject,
        "Practice with timed assessments",
        "Focus on difficult concepts identified in your results",
      ]);
    }
  };

  return {
    showSurvey,
    setShowSurvey,
    showDetailedReport,
    setShowDetailedReport,
    surveyResponse,
    recommendedTopics,
    handleSurveyChange,
    handleSurveySubmit,
    handleViewRecommendations
  };
};