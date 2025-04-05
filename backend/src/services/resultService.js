import axios from 'axios';
import { calculateScore } from '../utils/scoreCalculator.js';

export const processSubmission = async (userAnswers) => {
  const score = calculateScore(userAnswers);

  const aimlPayload = {
    score: score,
    answers: userAnswers.answers,
    userId: userAnswers.userId || null
  };

  const { data: aimlFeedback } = await axios.post('http://localhost:5001/analyze', aimlPayload);

  return {
    score,
    feedback: aimlFeedback
  };
};
