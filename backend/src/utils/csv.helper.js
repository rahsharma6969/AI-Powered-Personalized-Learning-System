import fs from 'fs';
import csvParser from 'csv-parser';

const difficultyMap = {
  Easy: '0',
  Medium: '1',
  Hard: '2',
  0: '0',
  1: '1',
  2: '2',
};

export const parseCSV = (filePath, filterDifficulty) => {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => {
        const rawLevel = data['Difficulty Level']?.trim();

        if (!rawLevel || rawLevel.toLowerCase() === 'not specified') return;

        const normalizedLevel = difficultyMap[rawLevel];
        if (!normalizedLevel) return;

        if (!filterDifficulty || filterDifficulty === normalizedLevel) {
          data['Difficulty Level'] = normalizedLevel;
          results.push(data);
        }
      })
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
};
