import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const StartAssessPage = () => {
  const { sub } = useParams();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [policiesAccepted, setPoliciesAccepted] = useState(false);

  // Mock assessments data (replace with your actual data source)
  const assessmentsData = {
    mathematics: {
      title: 'Mathematics Pre-Assessment Test',
      description: 'Evaluate your foundational knowledge in mathematics across various topics.',
      duration: '60 minutes',
      totalQuestions: 50,
      subject: 'Mathematics',
      policies: [
        'Maintain academic integrity',
        'No external help allowed',
        'Timer cannot be paused',
        'Complete the test in one sitting'
      ]
    },
    physics: {
      title: 'Physics Pre-Assessment Test',
      description: 'Assess your understanding of fundamental physics concepts and principles.',
      duration: '60 minutes',
      totalQuestions: 50,
      subject: 'Physics',
      policies: [
        'Maintain academic integrity',
        'No calculator or external resources',
        'Timer cannot be paused',
        'Complete the test in one sitting'
      ]
    },
    chemistry: {
      title: 'Chemistry Pre-Assessment Test',
      description: 'Test your prior knowledge of chemical concepts and scientific reasoning.',
      duration: '60 minutes',
      totalQuestions: 50,
      subject: 'Chemistry',
      policies: [
        'Maintain academic integrity',
        'No periodic table or external resources',
        'Timer cannot be paused',
        'Complete the test in one sitting'
      ]
    },
    biology: {
      title: 'Biology Pre-Assessment Test',
      description: 'Explore your baseline understanding of biological sciences and natural systems.',
      duration: '60 minutes',
      totalQuestions: 50,
      subject: 'Biology',
      policies: [
        'Maintain academic integrity',
        'No external reference materials',
        'Timer cannot be paused',
        'Complete the test in one sitting'
      ]
    }
  };

  useEffect(() => {
    // Fetch assessment based on subject parameter
    const currentAssessment = assessmentsData[sub.toLowerCase()];
    
    if (currentAssessment) {
      setAssessment(currentAssessment);
      setIsLoading(false);
    } else {
      // Redirect if no matching assessment found
      navigate('/assessment');
    }
  }, [sub, navigate]);

  // Handle accepting policies and starting the exam
  const handleAcceptPolicies = () => {
    setPoliciesAccepted(true);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-12 h-12 text-blue-500" />
      </div>
    );
  }

  // Policies view
  if (!policiesAccepted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">
            {assessment.title} - Test Policies
          </h1>
          <p className="text-gray-600 mb-4">{assessment.description}</p>
          
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Test Details</h2>
            <ul className="list-disc pl-5">
              <li>Duration: {assessment.duration}</li>
              <li>Total Questions: {assessment.totalQuestions}</li>
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Test Policies</h2>
            <ul className="list-disc pl-5 text-red-600">
              {assessment.policies.map((policy, index) => (
                <li key={index}>{policy}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center mb-4">
            <input 
              type="checkbox" 
              id="accept-policies" 
              className="mr-2"
              checked={policiesAccepted}
              onChange={(e) => setPoliciesAccepted(e.target.checked)}
              required
            />
            <label htmlFor="accept-policies" className="text-gray-700">
              I have read and agree to the test policies
            </label>
          </div>

          <button 
            onClick={handleAcceptPolicies}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            disabled={!policiesAccepted}
          >
            Start Assessment
          </button>
        </div>
      </div>
    );
  }

  // If policies are accepted, you would typically render the exam component
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>Starting {assessment.title}</h1>
      {/* Render your exam component here */}
    </div>
  );
};

export default StartAssessPage;