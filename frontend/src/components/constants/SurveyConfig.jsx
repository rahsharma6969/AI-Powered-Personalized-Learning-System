// 1. Survey Configuration (constants/surveyConfig.js)
export const SURVEY_QUESTIONS = [
  {
    key: 'satisfaction',
    label: '1️⃣ How satisfied were you with this test?',
    type: 'select',
    options: [
      { value: '', label: 'Select' },
      { value: 'very_satisfied', label: 'Very Satisfied' },
      { value: 'satisfied', label: 'Satisfied' },
      { value: 'neutral', label: 'Neutral' },
      { value: 'unsatisfied', label: 'Unsatisfied' }
    ]
  },
  {
    key: 'difficulty',
    label: '2️⃣ Was the test too difficult?',
    type: 'select',
    options: [
      { value: '', label: 'Select' },
      { value: 'too_easy', label: 'Too Easy' },
      { value: 'just_right', label: 'Just Right' },
      { value: 'too_hard', label: 'Too Hard' }
    ]
  },
  {
    key: 'preferredMaterial',
    label: '3️⃣ What study material do you prefer?',
    type: 'select',
    options: [
      { value: '', label: 'Select' },
      { value: 'videos', label: 'Video Lectures' },
      { value: 'books', label: 'Books & PDFs' },
      { value: 'practice', label: 'Practice Questions' },
      { value: 'discussion', label: 'Group Discussion' }
    ]
  },
  {
    key: 'timeSpentStudying',
    label: '4️⃣ How much time did you spend preparing?',
    type: 'number',
    placeholder: 'In hours'
  },
  {
    key: 'motivationLevel',
    label: '5️⃣ What was your motivation level during study?',
    type: 'select',
    options: [
      { value: '', label: 'Select' },
      { value: 'high', label: 'High' },
      { value: 'medium', label: 'Medium' },
      { value: 'low', label: 'Low' }
    ]
  },
  {
    key: 'memorizationVsApplication',
    label: '6️⃣ What\'s your learning approach?',
    type: 'select',
    options: [
      { value: '', label: 'Select' },
      { value: 'Memorization', label: 'Memorization' },
      { value: 'Application', label: 'Application' },
      { value: 'Both', label: 'Both' }
    ]
  },
  {
    key: 'timeManagement',
    label: '7️⃣ Do you struggle with time management?',
    type: 'select',
    options: [
      { value: '', label: 'Select' },
      { value: 'Yes', label: 'Yes' },
      { value: 'No', label: 'No' },
      { value: 'Somewhat', label: 'Somewhat' }
    ]
  },
  {
    key: 'comments',
    label: '💬 Additional Comments',
    type: 'textarea',
    rows: 3
  }
];

export const INITIAL_SURVEY_STATE = {
  satisfaction: '',
  difficulty: '',
  preferredMaterial: '',
  timeSpentStudying: '',
  motivationLevel: '',
  comments: '',
  memorizationVsApplication: '',
  timeManagement: ''
};