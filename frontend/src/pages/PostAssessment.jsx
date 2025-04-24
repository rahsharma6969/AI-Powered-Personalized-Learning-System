import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostAssessmentQuiz = ({ subject, onComplete }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/quiz/${subject.toLowerCase()}`);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [subject]);

  const handleOptionSelect = (option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questions[currentQuestion]._id]: option,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmitAssessment();
    }
  };

  const handleSubmitAssessment = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("You must be logged in to submit the assessment.");
        return;
      }

      const postAssessmentData = {
        subject,
        answers: selectedAnswers,
        timestamp: new Date()
      };

      const response = await axios.post(
        'http://localhost:5000/api/assessments/submit',
        postAssessmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onComplete(response.data.score); // pass score to parent
    } catch (error) {
      console.error("Error submitting assessment:", error);
      if (error.response?.status === 500) {
        alert("Internal server error occurred. Please try again later.");
      }
    }
  };

  if (loading) return <div>Loading post-assessment questions...</div>;
  if (!questions.length) return <p>No questions found!</p>;

  const currentQ = questions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Post Assessment</h2>
      <div className="mb-4 text-sm text-gray-500">
        Question {currentQuestion + 1} of {questions.length}
      </div>

      <div className="mb-6">
        <p className="text-lg font-medium text-gray-800 mb-4">{currentQ.Question}</p>
        <div className="space-y-3">
          {['Option A', 'Option B', 'Option C', 'Option D'].map((optionKey) => (
            <label
              key={optionKey}
              className={`flex items-center p-3 border rounded-md cursor-pointer transition 
                ${selectedAnswers[currentQ._id] === optionKey ? 'bg-indigo-50 border-indigo-500 text-indigo-600' : 'hover:bg-gray-100'}
              `}
            >
              <input
                type="radio"
                name="option"
                className="mr-3"
                checked={selectedAnswers[currentQ._id] === optionKey}
                onChange={() => handleOptionSelect(optionKey)}
              />
              {currentQ[optionKey]}
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium"
      >
        {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
      </button>
    </div>
  );
};

export default PostAssessmentQuiz;
