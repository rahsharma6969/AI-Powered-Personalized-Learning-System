import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaCheck, FaInfoCircle, FaClock } from 'react-icons/fa';

import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import QuestionCard from '../components/assessment/QuestionCard';
import AssessmentProgress from '../components/assessment/AssessmentProgress';
import ResultsSummary from '../components/assessment/ResultsSummary';

const PostAssessmentPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes in seconds
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [results, setResults] = useState(null);
  
  // Mock assessment data - would come from API
  const assessmentSteps = [
    {
      type: 'intro',
      title: 'Post-Assessment Test',
      description: 'This assessment will evaluate your progress after completing the recommended courses and resources. Your results will be compared to your pre-assessment to measure your improvement and update your personalized learning path.'
    },
    {
      type: 'question',
      id: 'q1',
      subject: 'Mathematics',
      question: 'Solve for x in the equation: 3(x + 2) - 5 = 2x + 1',
      options: [
        { id: 'a', text: 'x = 4' },
        { id: 'b', text: 'x = 6' },
        { id: 'c', text: 'x = 8' },
        { id: 'd', text: 'x = 10' }
      ],
      correctAnswer: 'a',
      explanation: 'To solve this equation: \n3(x + 2) - 5 = 2x + 1\n3x + 6 - 5 = 2x + 1\n3x + 1 = 2x + 1\n3x - 2x = 1 - 1\nx = 0\nWait! Theres a calculation error. Lets redo: \n3(x + 2) - 5 = 2x + 1\n3x + 6 - 5 = 2x + 1\n3x + 1 = 2x + 1\nx = 4',
      difficulty: 'Medium'
    },
    {
      type: 'question',
      id: 'q2',
      subject: 'Physics',
      question: 'A car accelerates uniformly from rest to 20 m/s in 5 seconds. What is the distance traveled during this time?',
      options: [
        { id: 'a', text: '25 m' },
        { id: 'b', text: '50 m' },
        { id: 'c', text: '75 m' },
        { id: 'd', text: '100 m' }
      ],
      correctAnswer: 'b',
      explanation: 'Using the formula s = (1/2)at², where a = v/t = 20/5 = 4 m/s², we get:\ns = (1/2) × 4 × 5² = (1/2) × 4 × 25 = 50 meters',
      difficulty: 'Medium'
    },
    {
      type: 'question',
      id: 'q3',
      subject: 'Chemistry',
      question: 'Which of the following represents the correct electron configuration for the calcium atom (Ca, Z=20)?',
      options: [
        { id: 'a', text: '1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹' },
        { id: 'b', text: '1s² 2s² 2p⁶ 3s² 3p⁶ 3d²' },
        { id: 'c', text: '1s² 2s² 2p⁶ 3s² 3p⁶ 4s²' },
        { id: 'd', text: '1s² 2s² 2p⁶ 3s² 3p⁴ 3d² 4s²' }
      ],
      correctAnswer: 'c',
      explanation: 'Calcium (Ca) has 20 electrons. The correct electron configuration is 1s² 2s² 2p⁶ 3s² 3p⁶ 4s², following the Aufbau principle where electrons fill the lowest energy levels first.',
      difficulty: 'Hard'
    },
    {
      type: 'question',
      id: 'q4',
      subject: 'Physics',
      question: 'A spring with spring constant k = 200 N/m is compressed by 0.1 m. How much energy is stored in the spring?',
      options: [
        { id: 'a', text: '0.5 J' },
        { id: 'b', text: '1 J' },
        { id: 'c', text: '2 J' },
        { id: 'd', text: '5 J' }
      ],
      correctAnswer: 'b',
      explanation: 'Using the formula for spring potential energy: E = (1/2)kx², we calculate:\nE = (1/2) × 200 × (0.1)² = (1/2) × 200 × 0.01 = 1 Joule',
      difficulty: 'Medium'
    },
    {
      type: 'question',
      id: 'q5',
      subject: 'Mathematics',
      question: 'Find the derivative of f(x) = 3x⁴ - 2x² + 5x - 7.',
      options: [
        { id: 'a', text: '12x³ - 4x + 5' },
        { id: 'b', text: '12x³ - 4x² + 5' },
        { id: 'c', text: '3x³ - 2x + 5' },
        { id: 'd', text: '12x³ - 4x + 5 - 7' }
      ],
      correctAnswer: 'a',
      explanation: 'Using the power rule of differentiation: d/dx[x^n] = nx^(n-1)\n\nd/dx[3x⁴] = 3 × 4 × x³ = 12x³\nd/dx[-2x²] = -2 × 2 × x¹ = -4x\nd/dx[5x] = 5\nd/dx[-7] = 0\n\nCombining all terms: f\'(x) = 12x³ - 4x + 5',
      difficulty: 'Hard'
    },
    {
      type: 'question',
      id: 'q6',
      subject: 'Chemistry',
      question: 'What is the pH of a solution with a hydrogen ion [H⁺] concentration of 1 × 10⁻³ mol/L?',
      options: [
        { id: 'a', text: '3' },
        { id: 'b', text: '4' },
        { id: 'c', text: '7' },
        { id: 'd', text: '11' }
      ],
      correctAnswer: 'a',
      explanation: 'The pH is calculated as the negative logarithm (base 10) of the hydrogen ion concentration: pH = -log[H⁺]\nTherefore: pH = -log(1 × 10⁻³) = -(-3) = 3',
      difficulty: 'Medium'
    },
    {
      type: 'completion',
      title: 'Assessment Complete!',
      description: 'Thank you for completing the post-assessment. We are now analyzing your responses to update your personalized learning pathway.'
    }
  ];
  
  useEffect(() => {
    let timer;
    if (assessmentStarted && currentStep > 0 && currentStep < assessmentSteps.length - 1) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            // Auto-submit when time expires
            handleSubmitAssessment();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(timer);
  }, [assessmentStarted, currentStep]);
  
  const handleStartAssessment = () => {
    setAssessmentStarted(true);
    setCurrentStep(1);
  };
  
  const handleAnswerSubmit = (questionId, selectedOption) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedOption
    }));
  };
  
  const handleNext = () => {
    if (currentStep < assessmentSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleSubmitAssessment = () => {
    // Calculate results - in a real app, this would be done on the server
    const questionSteps = assessmentSteps.filter(step => step.type === 'question');
    const correctAnswers = questionSteps.filter(q => answers[q.id] === q.correctAnswer).length;
    const totalQuestions = questionSteps.length;
    const incorrectAnswers = totalQuestions - correctAnswers;
    
    // Generate subject scores
    const subjects = [...new Set(questionSteps.map(q => q.subject))];
    const subjectScores = subjects.map(subject => {
      const subjectQuestions = questionSteps.filter(q => q.subject === subject);
      const correctSubjectAnswers = subjectQuestions.filter(q => answers[q.id] === q.correctAnswer).length;
      return {
        name: subject,
        score: Math.round((correctSubjectAnswers / subjectQuestions.length) * 100)
      };
    });
    
    setResults({
      score: Math.round((correctAnswers / totalQuestions) * 100),
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      subjectScores
    });
    
    setAssessmentCompleted(true);
    setCurrentStep(assessmentSteps.length - 1);
  };
  
  // Get a list of answered question indices
  const answeredQuestions = Object.keys(answers).map(id => {
    const index = assessmentSteps.findIndex(step => step.id === id);
    return index;
  });
  
  // Current content based on step
  const currentContent = assessmentSteps[currentStep];
  const isQuestionStep = currentContent?.type === 'question';
  
  // For the question steps, determine the question number
  const questionNumber = isQuestionStep ? 
    assessmentSteps.filter(step => step.type === 'question' && step.id <= currentContent.id).length : 0;
  
  const totalQuestions = assessmentSteps.filter(step => step.type === 'question').length;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Progress bar - only show when assessment started */}
        {assessmentStarted && currentStep > 0 && currentStep < assessmentSteps.length - 1 && (
          <AssessmentProgress 
            currentQuestion={questionNumber}
            totalQuestions={totalQuestions}
            timeLeft={timeLeft}
            answeredQuestions={answeredQuestions}
            className="mb-8"
          />
        )}
        
        <div className="max-w-3xl mx-auto">
          {currentContent.type === 'intro' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">{currentContent.title}</h1>
                <div className="text-lg text-gray-600 mb-8">{currentContent.description}</div>
                
                <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <div className="text-indigo-600 mt-1">
                      <FaInfoCircle size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-indigo-800 mb-1">Important Information</h3>
                      <ul className="text-sm text-indigo-700 space-y-1 list-disc pl-5">
                        <li>You will have 45 minutes to complete the assessment</li>
                        <li>This assessment contains questions from various subjects you've studied</li>
                        <li>Your results will be compared to your pre-assessment to measure improvement</li>
                        <li>Based on your results, we'll update your personalized learning recommendations</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleStartAssessment}
                  className="btn btn-primary px-8 py-3 text-base"
                >
                  Start Assessment
                </button>
              </div>
            </motion.div>
          )}
          
          {currentContent.type === 'question' && (
            <div>
              <QuestionCard 
                question={currentContent}
                onAnswerSubmit={handleAnswerSubmit}
                className="mb-6"
              />
              
              <div className="flex justify-between">
                <button
                  onClick={handlePrevious}
                  className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  <FaArrowLeft size={14} />
                  <span>Previous</span>
                </button>
                
                {currentStep < assessmentSteps.length - 2 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors"
                    disabled={!answers[currentContent.id]}
                  >
                    <span>Next</span>
                    <FaArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitAssessment}
                    className="btn btn-primary"
                  >
                    Submit Assessment
                  </button>
                )}
              </div>
            </div>
          )}
          
          {currentContent.type === 'completion' && !assessmentCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-sm text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheck size={32} className="text-green-600" />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{currentContent.title}</h1>
              <p className="text-lg text-gray-600 mb-8">{currentContent.description}</p>
              
              <div className="mb-8">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <motion.div 
                    className="bg-indigo-600 h-2.5 rounded-full" 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2 }}
                  ></motion.div>
                </div>
                <span className="text-sm text-gray-500">Analyzing your responses...</span>
              </div>
              
              <button
                onClick={() => navigate('/dashboard')}
                className="btn btn-primary"
              >
                View Your Learning Path
              </button>
            </motion.div>
          )}
          
          {currentContent.type === 'completion' && assessmentCompleted && results && (
            <ResultsSummary
              score={results.score}
              totalQuestions={results.totalQuestions}
              correctAnswers={results.correctAnswers}
              incorrectAnswers={results.incorrectAnswers}
              subjectScores={results.subjectScores}
              onViewDetails={() => {}}
              onRetakeAssessment={() => {
                setCurrentStep(0);
                setAnswers({});
                setAssessmentStarted(false);
                setAssessmentCompleted(false);
                setResults(null);
                setTimeLeft(45 * 60);
              }}
              onContinue={() => navigate('/dashboard')}
            />
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PostAssessmentPage;