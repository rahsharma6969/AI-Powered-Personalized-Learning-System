// 1. Constants and utility functions (utils/assessmentUtils.js)
export const DIFFICULTY_LEVELS = {
  EASY: { value: 0, text: 'Easy', color: 'bg-green-200 text-green-800' },
  MEDIUM: { value: 1, text: 'Medium', color: 'bg-yellow-200 text-yellow-800' },
  HARD: { value: 2, text: 'Hard', color: 'bg-red-200 text-red-800' }
};

export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getDifficultyInfo = (difficulty) => {
  if (difficulty === undefined || difficulty === null) 
    return { text: "Unknown", color: "bg-gray-200" };

  // Handle numeric values
  if (difficulty === 0 || difficulty === "0") return DIFFICULTY_LEVELS.EASY;
  if (difficulty === 1 || difficulty === "1") return DIFFICULTY_LEVELS.MEDIUM;
  if (difficulty === 2 || difficulty === "2") return DIFFICULTY_LEVELS.HARD;

  // Handle text values
  const level = String(difficulty).toLowerCase();
  if (level === "easy") return DIFFICULTY_LEVELS.EASY;
  if (level === "medium") return DIFFICULTY_LEVELS.MEDIUM;
  if (level === "hard") return DIFFICULTY_LEVELS.HARD;

  return { text: "Unknown", color: "bg-gray-200" };
};

export const getSubjectSubTopics = (subject) => {
  const subjectMap = {
    physics: ["Mechanics", "Thermodynamics", "Optics", "Electricity", "Magnetism", "Gravitation", "Modern Physics"],
    chemistry: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry", "Analytical Chemistry", "Biochemistry"],
    biology: ["Cell Biology", "Genetics", "Ecology", "Anatomy", "Physiology", "Botany", "Zoology"],
    mathematics: ["Algebra", "Geometry", "Calculus", "Statistics", "Trigonometry", "Probability"]
  };
  
  return subjectMap[subject.toLowerCase()] || ["General Knowledge", "Fundamentals", "Advanced Concepts", "Applications"];
};

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const calculateSubTopicStats = (responses) => {
  const stats = {};

  responses.forEach((response) => {
    const subTopic = response.subTopic || "Uncategorized";

    if (!stats[subTopic]) {
      stats[subTopic] = { total: 0, correct: 0, percentage: 0 };
    }

    stats[subTopic].total += 1;
    if (response.isCorrect) {
      stats[subTopic].correct += 1;
    }
  });

  // Calculate percentages
  Object.keys(stats).forEach((subTopic) => {
    stats[subTopic].percentage = Math.round(
      (stats[subTopic].correct / stats[subTopic].total) * 100
    );
  });

  return stats;
};