import React, { useState } from 'react';
import { BookOpen, Users, Brain, Loader2, CheckCircle, AlertCircle, Copy, Download } from 'lucide-react';

const TestGeneratorInterface = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [taskType, setTaskType] = useState('question_gen');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  // Sample data - you can expand this based on your needs
  const classes = [
    { id: '6', name: 'Class 6' },
    { id: '7', name: 'Class 7' },
    { id: '8', name: 'Class 8' },
    { id: '9', name: 'Class 9' },
    { id: '10', name: 'Class 10' },
    { id: '11', name: 'Class 11' },
    { id: '12', name: 'Class 12' }
  ];

  const subjects = {
    '6': ['Mathematics', 'Science', 'English', 'Social Studies'],
    '7': ['Mathematics', 'Science', 'English', 'Social Studies'],
    '8': ['Mathematics', 'Science', 'English', 'Social Studies'],
    '9': ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Geography'],
    '10': ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Geography'],
    '11': ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science', 'Economics'],
    '12': ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science', 'Economics']
  };

  const topics = {
    'Mathematics': ['Algebra', 'Geometry', 'Trigonometry', 'Calculus', 'Statistics', 'Probability'],
    'Physics': ['Mechanics', 'Thermodynamics', 'Optics', 'Electricity', 'Magnetism', 'Modern Physics'],
    'Chemistry': ['Atomic Structure', 'Chemical Bonding', 'Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry'],
    'Biology': ['Cell Biology', 'Genetics', 'Evolution', 'Ecology', 'Human Physiology', 'Plant Biology'],
    'English': ['Grammar', 'Literature', 'Poetry', 'Essay Writing', 'Comprehension', 'Vocabulary'],
    'Science': ['Matter', 'Energy', 'Living Things', 'Earth Science', 'Space', 'Simple Machines'],
    'Social Studies': ['History', 'Geography', 'Civics', 'Economics', 'Culture', 'Government'],
    'History': ['Ancient History', 'Medieval History', 'Modern History', 'World Wars', 'Independence Movement'],
    'Geography': ['Physical Geography', 'Human Geography', 'Climate', 'Natural Resources', 'Maps'],
    'Computer Science': ['Programming', 'Data Structures', 'Algorithms', 'Database', 'Networks', 'Software Engineering'],
    'Economics': ['Microeconomics', 'Macroeconomics', 'International Trade', 'Money & Banking', 'Public Finance']
  };

  const taskTypes = [
    { id: 'question_gen', name: 'Question Generation', description: 'Generate complete questions with multiple choice options' },
    { id: 'answer_gen', name: 'Answer Generation', description: 'Generate detailed answers for questions' },
    { id: 'mcq_explanation', name: 'MCQ Explanation', description: 'Generate MCQ explanations' },
    { id: 'summarization', name: 'Summarization', description: 'Summarize topics' }
  ];

  const handleClassChange = (classId) => {
    setSelectedClass(classId);
    setSelectedSubject('');
    setSelectedTopics([]);
  };

  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
    setSelectedTopics([]);
  };

  const handleTopicToggle = (topic) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const generateContent = async () => {
    if (!selectedClass || !selectedSubject || selectedTopics.length === 0) {
      setError('Please select class, subject, and at least one topic');
      return;
    }

    setIsLoading(true);
    setError('');
    setResults([]);

    try {
      const promises = selectedTopics.map(async (topic) => {
        // Enhanced prompt for better question generation
        const enhancedPrompt = `Generate a complete ${taskType === 'question_gen' ? 'multiple choice question' : 'content'} for ${selectedSubject} - ${topic} for Class ${selectedClass}. 
        ${taskType === 'question_gen' ? 'Include the question, 4 options (A, B, C, D), and indicate the correct answer.' : ''}
        Make sure the content is complete and appropriate for Class ${selectedClass} level.`;

        const response = await fetch('http://127.0.0.1:5000/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            task_type: taskType,
            input_text: enhancedPrompt
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return { topic, ...data };
      });

      const results = await Promise.all(promises);
      setResults(results);
    } catch (err) {
      setError(`Error generating content: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const downloadContent = () => {
    const content = results.map(result => 
      `Topic: ${result.topic}\nTask Type: ${taskTypes.find(t => t.id === result.task_type)?.name}\n\n${result.response}\n\n---\n\n`
    ).join('');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test_content_${selectedSubject}_${selectedClass}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const availableSubjects = selectedClass ? subjects[selectedClass] || [] : [];
  const availableTopics = selectedSubject ? topics[selectedSubject] || [] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <Brain className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Test Generator</h1>
            <p className="text-gray-600">Generate personalized tests and study materials using AI</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Class Selection */}
            <div>
              <div className="flex items-center mb-4">
                <Users className="w-5 h-5 text-indigo-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Select Class</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {classes.map((cls) => (
                  <button
                    key={cls.id}
                    onClick={() => handleClassChange(cls.id)}
                    className={`p-3 rounded-lg border transition-all ${
                      selectedClass === cls.id
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    {cls.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Selection */}
            <div>
              <div className="flex items-center mb-4">
                <BookOpen className="w-5 h-5 text-indigo-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Select Subject</h3>
              </div>
              <div className="space-y-2">
                {availableSubjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => handleSubjectChange(subject)}
                    disabled={!selectedClass}
                    className={`w-full p-3 rounded-lg border transition-all text-left ${
                      selectedSubject === subject
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-indigo-300 disabled:opacity-50'
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Topics Selection */}
          {selectedSubject && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Topics (Multiple)</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableTopics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => handleTopicToggle(topic)}
                    className={`p-3 rounded-lg border transition-all text-left ${
                      selectedTopics.includes(topic)
                        ? 'bg-green-100 text-green-800 border-green-300'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{topic}</span>
                      {selectedTopics.includes(topic) && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Task Type Selection */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Task Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {taskTypes.map((task) => (
                <button
                  key={task.id}
                  onClick={() => setTaskType(task.id)}
                  className={`p-4 rounded-lg border transition-all text-left ${
                    taskType === task.id
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <div className="font-medium">{task.name}</div>
                  <div className="text-sm opacity-80">{task.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className="mt-8 text-center">
            <button
              onClick={generateContent}
              disabled={isLoading || !selectedClass || !selectedSubject || selectedTopics.length === 0}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5 mr-2" />
                  Generate Test Content
                </>
              )}
            </button>
          </div>

          {/* Selected Summary */}
          {(selectedClass || selectedSubject || selectedTopics.length > 0) && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Selection Summary:</h4>
              <div className="text-sm text-blue-700">
                {selectedClass && <span className="mr-4">Class: {selectedClass}</span>}
                {selectedSubject && <span className="mr-4">Subject: {selectedSubject}</span>}
                {selectedTopics.length > 0 && (
                  <span>Topics: {selectedTopics.join(', ')}</span>
                )}
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-red-700">{error}</span>
            </div>
          )}
        </div>

        {/* Results Display */}
        {results.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Generated Content</h2>
              <button
                onClick={downloadContent}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download All
              </button>
            </div>
            
            <div className="space-y-6">
              {results.map((result, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">{result.topic}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {taskTypes.find(t => t.id === result.task_type)?.name}
                      </span>
                      <button
                        onClick={() => copyToClipboard(result.response)}
                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                        title="Copy to clipboard"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    {result.response ? (
                      <div className="text-gray-700">
                        {result.response.split('\n').map((line, lineIndex) => (
                          <div key={lineIndex} className={`${line.trim() === '' ? 'mb-2' : 'mb-1'}`}>
                            {line || '\u00A0'}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        No content generated or content is incomplete
                      </div>
                    )}
                  </div>
                  
                  {/* Show raw response for debugging */}
                  {result.response && result.response.length < 50 && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> The generated content appears to be incomplete. 
                        This might be due to:
                      </p>
                      <ul className="text-sm text-yellow-700 mt-2 list-disc list-inside">
                        <li>API response truncation</li>
                        <li>Model output limitations</li>
                        <li>Network connectivity issues</li>
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestGeneratorInterface;