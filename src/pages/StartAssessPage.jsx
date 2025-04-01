import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import axios from 'axios';

const StartAssessmentPage = () => {
  const { sub } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(60 * 60);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/quiz/${sub.toLowerCase()}`);
        console.log("Quiz data received:", response.data);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
        navigate("/assessment");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmitAssessment();
          return 0;
        }
        if (prev === 300) {
          setShowWarning(true);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [sub, navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
  };

  const handleSubmitAssessment = () => {
    let correctAnswers = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q['Correct Answer']) {
        correctAnswers++;
      }
    });
    navigate(`/assessment/${sub}/results`, {
      state: {
        score: correctAnswers,
        total: questions.length,
        answers: selectedAnswers
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-12 h-12 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h1 className="text-xl font-bold">{sub.charAt(0).toUpperCase() + sub.slice(1)} Assessment</h1>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-red-500" />
            <span className={`font-mono font-bold ${timeRemaining < 300 ? 'text-red-500' : ''}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>

        {questions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">{`Q${currentQuestion + 1}: ${questions[currentQuestion].Question.replace(/^Q\d+: /, '')}`}</h2>
            <div className="space-y-3">
              {["Option A", "Option B", "Option C", "Option D"].map((key, index) => (
                <div 
                  key={index} 
                  onClick={() => handleSelectAnswer(questions[currentQuestion][key])}
                  className={`p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedAnswers[currentQuestion] === questions[currentQuestion][key] 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300'
                  }`}
                >
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name={`question-${currentQuestion}`}
                      checked={selectedAnswers[currentQuestion] === questions[currentQuestion][key]}
                      onChange={() => handleSelectAnswer(questions[currentQuestion][key])}
                      className="mr-3"
                    />
                    {questions[currentQuestion][key]}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <button 
            onClick={() => setCurrentQuestion(prev => Math.max(prev - 1, 0))} 
            disabled={currentQuestion === 0}
            className={`flex items-center px-4 py-2 rounded-md ${currentQuestion === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </button>
          {currentQuestion < questions.length - 1 ? (
            <button 
              onClick={() => setCurrentQuestion(prev => prev + 1)} 
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          ) : (
            <button 
              onClick={handleSubmitAssessment} 
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Submit Assessment
            </button>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {questions.map((_, index) => (
            <button 
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-10 h-10 rounded-full ${currentQuestion === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartAssessmentPage;
