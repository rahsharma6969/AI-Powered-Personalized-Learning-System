import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { shuffleArray, getSubjectSubTopics, calculateSubTopicStats } from '../../utils/assessmentUtils';

export const useAssessment = (subject) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(60 * 60);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/quiz/${subject.toLowerCase()}`
      );
      
      const processedQuestions = response.data.map((q) => {
        if (!q.subTopic) {
          const subTopics = getSubjectSubTopics(subject);
          q.subTopic = subTopics[Math.floor(Math.random() * subTopics.length)];
        }
        return q;
      });

      setQuestions(shuffleArray(processedQuestions));
    } catch (error) {
      console.error("Error fetching questions:", error);
      navigate("/assessment");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAnswer = (answerKey) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].Question]: answerKey,
    }));
  };

  const processAssessmentResults = () => {
    let correct = 0;
    const responses = [];

    questions.forEach((q) => {
      const correctAnswer = q["Correct Answer"] || q["correct_answer"] || q["answer"];
      const selectedOption = selectedAnswers[q.Question];
      const selectedAnswer = selectedOption ? q[selectedOption] : null;
      const subTopic = q.subTopic || "Uncategorized";

      let isCorrect = false;

      if (["A", "B", "C", "D"].includes(correctAnswer)) {
        isCorrect = selectedOption && selectedOption.includes(correctAnswer);
      } else {
        isCorrect =
          selectedAnswer &&
          String(selectedAnswer).trim().toLowerCase() ===
            String(correctAnswer).trim().toLowerCase();
      }

      if (isCorrect) correct++;

      responses.push({
        question: q.Question,
        correctAnswer: correctAnswer || "Not provided",
        userAnswer: selectedAnswer || "Not answered",
        selectedOption: selectedOption || "None",
        isCorrect: !!isCorrect,
        difficulty: q.Difficulty || q["Difficulty Level"] || q.difficulty || "Not specified",
        subTopic: subTopic,
        optionA: q["Option A"] || q.A || "",
        optionB: q["Option B"] || q.B || "",
        optionC: q["Option C"] || q.C || "",
        optionD: q["Option D"] || q.D || "",
      });
    });

    return { correct, responses, subTopicStats: calculateSubTopicStats(responses) };
  };

  useEffect(() => {
    fetchQuestions();

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          // Handle submit assessment
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [subject]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentQuestion]);

  return {
    loading,
    questions,
    currentQuestion,
    setCurrentQuestion,
    selectedAnswers,
    timeRemaining,
    handleSelectAnswer,
    processAssessmentResults
  };
};
