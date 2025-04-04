import api from '../utils/api';

/**
 * Assessments API utilities
 */

/**
 * Get pre-assessment questions
 * @returns {Promise<Array>} List of questions
 */
export const getPreAssessment = async () => {
  try {
    // In a real app, make an API call:
    // const response = await api.get('/assessments/pre');
    // return response.data;
    
    // For demo purposes, simulate API response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock pre-assessment questions
    return [
      {
        id: 'q1',
        subject: 'Mathematics',
        question: 'Solve for x: 2x + 5 = 13',
        options: [
          { id: 'a', text: 'x = 4' },
          { id: 'b', text: 'x = 6' },
          { id: 'c', text: 'x = 8' },
          { id: 'd', text: 'x = 9' }
        ],
        correctAnswer: 'a',
        explanation: 'To solve for x, subtract 5 from both sides: 2x = 8. Then divide both sides by 2: x = 4.',
        difficulty: 'Easy'
      },
      {
        id: 'q2',
        subject: 'Physics',
        question: 'Which of the following is NOT a vector quantity?',
        options: [
          { id: 'a', text: 'Velocity' },
          { id: 'b', text: 'Displacement' },
          { id: 'c', text: 'Speed' },
          { id: 'd', text: 'Force' }
        ],
        correctAnswer: 'c',
        explanation: 'Speed is a scalar quantity as it only has magnitude, not direction. Velocity, displacement, and force are all vector quantities with both magnitude and direction.',
        difficulty: 'Medium'
      },
      {
        id: 'q3',
        subject: 'Chemistry',
        question: 'What is the chemical formula for water?',
        options: [
          { id: 'a', text: 'H2O' },
          { id: 'b', text: 'CO2' },
          { id: 'c', text: 'NaCl' },
          { id: 'd', text: 'O2' }
        ],
        correctAnswer: 'a',
        explanation: 'Water consists of two hydrogen atoms and one oxygen atom, giving it the chemical formula H2O.',
        difficulty: 'Easy'
      },
      {
        id: 'q4',
        subject: 'Mathematics',
        question: 'Find the derivative of f(x) = x³ + 2x² - 4x + 7',
        options: [
          { id: 'a', text: '3x² + 4x - 4' },
          { id: 'b', text: '3x² + 4x + 7' },
          { id: 'c', text: '3x² + 4x - 4 + 7' },
          { id: 'd', text: '3x² + 2x - 4' }
        ],
        correctAnswer: 'a',
        explanation: 'Using the power rule for differentiation: f\'(x) = 3x² + 4x - 4. The derivative of a constant (7) is 0.',
        difficulty: 'Hard'
      },
      {
        id: 'q5',
        subject: 'Computer Science',
        question: 'Which data structure operates on a First-In-First-Out (FIFO) principle?',
        options: [
          { id: 'a', text: 'Stack' },
          { id: 'b', text: 'Queue' },
          { id: 'c', text: 'Tree' },
          { id: 'd', text: 'Graph' }
        ],
        correctAnswer: 'b',
        explanation: 'A queue follows the First-In-First-Out (FIFO) principle, where the first element added is the first one to be removed. A stack operates on Last-In-First-Out (LIFO).',
        difficulty: 'Medium'
      }
    ];
  } catch (error) {
    console.error('Get pre-assessment error:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch pre-assessment');
  }
};

/**
 * Get post-assessment questions
 * @returns {Promise<Array>} List of questions
 */
export const getPostAssessment = async () => {
  try {
    // In a real app, make an API call:
    // const response = await api.get('/assessments/post');
    // return response.data;
    
    // For demo purposes, simulate API response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock post-assessment questions
    return [
      {
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
        explanation: 'To solve this equation: \n3(x + 2) - 5 = 2x + 1\n3x + 6 - 5 = 2x + 1\n3x + 1 = 2x + 1\n3x - 2x = 1 - 1\nx = 0\nWait! There\'s a calculation error. Let\'s redo: \n3(x + 2) - 5 = 2x + 1\n3x + 6 - 5 = 2x + 1\n3x + 1 = 2x + 1\nx = 4',
        difficulty: 'Medium'
      },
      {
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
      }
    ];
  } catch (error) {
    console.error('Get post-assessment error:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch post-assessment');
  }
};

/**
 * Submit assessment answers
 * @param {string} assessmentType - 'pre' or 'post'
 * @param {Object} answers - User answers
 * @returns {Promise<Object>} Assessment results
 */
export const submitAssessment = async (assessmentType, answers) => {
  try {
    // In a real app, make an API call:
    // const response = await api.post(`/assessments/${assessmentType}/submit`, { answers });
    // return response.data;
    
    // For demo purposes, simulate API response and calculate results
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (!assessmentType || !answers || Object.keys(answers).length === 0) {
      throw new Error('Assessment type and answers are required');
    }
    
    // Get questions based on assessment type
    const questions = assessmentType === 'pre' 
      ? await getPreAssessment() 
      : await getPostAssessment();
    
    // Calculate results
    const totalQuestions = questions.length;
    const correctAnswers = questions.filter(q => answers[q.id] === q.correctAnswer).length;
    const incorrectAnswers = totalQuestions - correctAnswers;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Calculate subject scores
    const subjects = [...new Set(questions.map(q => q.subject))];
    const subjectScores = subjects.map(subject => {
      const subjectQuestions = questions.filter(q => q.subject === subject);
      const correctSubjectAnswers = subjectQuestions.filter(q => answers[q.id] === q.correctAnswer).length;
      return {
        name: subject,
        score: Math.round((correctSubjectAnswers / subjectQuestions.length) * 100)
      };
    });
    
    return {
      assessmentType,
      score,
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      subjectScores,
      completedAt: new Date().toISOString(),
      answers,
      questions // Include questions for detailed review
    };
  } catch (error) {
    console.error('Submit assessment error:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to submit assessment');
  }
};

/**
 * Get user's assessment history
 * @returns {Promise<Array>} Assessment history
 */
export const getAssessmentHistory = async () => {
  try {
    // In a real app, make an API call:
    // const response = await api.get('/assessments/history');
    // return response.data;
    
    // For demo purposes, simulate API response
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock assessment history
    return [
      {
        id: 1,
        type: 'pre',
        score: 65,
        completedAt: '2023-01-15T14:30:00Z',
        subjectScores: [
          { name: 'Mathematics', score: 80 },
          { name: 'Physics', score: 60 },
          { name: 'Chemistry', score: 50 },
          { name: 'Computer Science', score: 70 }
        ]
      },
      {
        id: 2,
        type: 'post',
        score: 78,
        completedAt: '2023-02-20T16:45:00Z',
        subjectScores: [
          { name: 'Mathematics', score: 85 },
          { name: 'Physics', score: 75 },
          { name: 'Chemistry', score: 65 },
          { name: 'Computer Science', score: 85 }
        ]
      }
    ];
  } catch (error) {
    console.error('Get assessment history error:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch assessment history');
  }
};