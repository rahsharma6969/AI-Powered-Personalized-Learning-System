import { parseCSV } from '../utils/csv.helper.js';
import fs from 'fs';

const fileMap = {
  maths: 'data/output/maths_quiz.csv',
  physics: 'data/output/physics_quiz.csv',
  chemistry: 'data/output/chemistry_quiz.csv',
};

export const getQuizDataService = (subject, difficulty) => {
  return new Promise((resolve, reject) => {
    const filePath = fileMap[subject];
    if (!filePath || !fs.existsSync(filePath)) {
      return reject({ status: 404, message: 'Quiz data not found' });
    }

    parseCSV(filePath, difficulty)
      .then((questions) => {
        const shuffled = questions.sort(() => 0.5 - Math.random());
        resolve(shuffled);
      })
      .catch((err) => {
        reject({ status: 500, message: 'Error reading file' });
      });
  });
};
