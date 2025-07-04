import { getQuizDataService } from '../services/quizService.js';

export const getQuizData = async (req, res) => {
  try {
    const { subject } = req.params;
    const { difficulty } = req.query;

    const data = await getQuizDataService(subject, difficulty);
    res.json(data.slice(0, 50));
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || 'Server Error' });
  }
};
