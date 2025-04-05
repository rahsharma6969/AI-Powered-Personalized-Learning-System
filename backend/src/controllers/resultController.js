import { processSubmission } from '../services/resultService.js';

export const handleResultSubmission = async (req, res) => {
  try {
    const userAnswers = req.body;
    const finalResult = await processSubmission(userAnswers);
    res.status(200).json(finalResult);
  } catch (error) {
    console.error("Submission Error:", error);
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
