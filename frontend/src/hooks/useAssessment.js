// hooks/useAssessments.js - Custom hook for assessment data management
import { useState, useEffect } from "react";
import axios from "axios";

const useAssessments = (user, navigate) => {
  const [assessmentResults, setAssessmentResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progressData, setProgressData] = useState([]);
  const [skillsData, setSkillsData] = useState([]);
  const [courseProgress, setCourseProgress] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [stats, setStats] = useState({
    coursesEnrolled: 0,
    completed: 0,
    assessmentsTaken: 0,
    avgScore: "0%",
  });

  // Process assessment data for different charts
  const processAssessmentData = (data) => {
    if (!data || data.length === 0) return;

    // Progress over time (line chart)
    const sortedByDate = [...data].sort(
      (a, b) => new Date(a.completedAt) - new Date(b.completedAt)
    );

    const progressOverTime = sortedByDate.map((assessment) => ({
      month: new Date(assessment.completedAt).toLocaleDateString("en-US", {
        month: "short",
      }),
      score: assessment.score,
    }));

    setProgressData(progressOverTime);

    // Skills by subject (radar chart)
    const subjectScores = {};
    data.forEach((assessment) => {
      if (!subjectScores[assessment.subject]) {
        subjectScores[assessment.subject] = {
          scores: [],
          total: 0,
          count: 0,
        };
      }

      subjectScores[assessment.subject].scores.push(assessment.score);
      subjectScores[assessment.subject].total += assessment.score;
      subjectScores[assessment.subject].count += 1;
    });

    const skillsRadarData = Object.keys(subjectScores).map((subject) => ({
      subject: subject.charAt(0).toUpperCase() + subject.slice(1),
      A: subjectScores[subject].total / subjectScores[subject].count,
      fullMark: 100,
    }));

    setSkillsData(skillsRadarData);

    // Course progress (bar chart)
    const subjectProgress = Object.keys(subjectScores).map((subject) => ({
      name: subject.charAt(0).toUpperCase() + subject.slice(1),
      progress: subjectScores[subject].total / subjectScores[subject].count,
    }));

    setCourseProgress(subjectProgress);

    // Pie chart data - categorize assessments by score range
    const scoreCategories = {
      "Excellent (>90%)": 0,
      "Good (70-90%)": 0,
      "Average (50-70%)": 0,
      "Needs Improvement (<50%)": 0,
    };

    data.forEach((assessment) => {
      if (assessment.score > 90) {
        scoreCategories["Excellent (>90%)"]++;
      } else if (assessment.score >= 70) {
        scoreCategories["Good (70-90%)"]++;
      } else if (assessment.score >= 50) {
        scoreCategories["Average (50-70%)"]++;
      } else {
        scoreCategories["Needs Improvement (<50%)"]++;
      }
    });

    const pieChartData = Object.keys(scoreCategories).map((category) => ({
      name: category,
      value: scoreCategories[category],
    }));

    setPieData(pieChartData);

    // Calculate stats
    const totalAssessments = data.length;
    const completedAssessments = data.filter((a) => a.score > 50).length;
    const averageScore =
      data.reduce((sum, a) => sum + a.score, 0) / totalAssessments;

    setStats({
      coursesEnrolled: Object.keys(subjectScores).length,
      completed: completedAssessments,
      assessmentsTaken: totalAssessments,
      avgScore: `${Math.round(averageScore)}%`,
    });
  };

  // Fetch assessment results
  useEffect(() => {
    const fetchAssessmentResults = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const userId = user?.id;

        if (!token) {
          setError("Authentication token not found");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/assessments/history/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAssessmentResults(response.data);
        processAssessmentData(response.data);
      } catch (error) {
        console.error("Error fetching assessment results:", error);
        setError("Failed to load assessment data");
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchAssessmentResults();
    }
  }, [user?.id]);

  const handleViewDetails = (reportId) => {
    console.log("Navigating to report with ID:", reportId);
    navigate(`/assessment/reports/${reportId}`);
  };

  return {
    assessmentResults,
    loading,
    error,
    stats,
    progressData,
    skillsData,
    courseProgress,
    pieData,
    handleViewDetails,
  };
};

export default useAssessments;