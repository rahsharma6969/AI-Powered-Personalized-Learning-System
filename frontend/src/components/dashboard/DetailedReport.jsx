import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft, BarChart2 } from 'lucide-react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth'; // Adjust path as needed

const DetailedReportPage = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('summary');
  const { user } = useAuth(); // Use your auth hook

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/assessments/report/${reportId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setReport(response.data);
      } catch (error) {
        console.error("Error fetching report:", error);
        setError("Failed to load the assessment report. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId, navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} min ${secs} sec`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric', 
      month: 'short', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const getDifficultyColor = (difficulty) => {
    if (!difficulty) return "bg-gray-200 text-gray-800";
    const level = difficulty.toLowerCase();
    if (level === "easy") return "bg-green-200 text-green-800";
    if (level === "medium") return "bg-yellow-200 text-yellow-800";
    if (level === "hard") return "bg-red-200 text-red-800";
    return "bg-gray-200 text-gray-800";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-12 h-12 text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>Report not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{report.subject} Assessment Report</h1>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="text-sm font-medium text-blue-700 mb-1">Score</h3>
            <p className="text-2xl font-bold">{report.score.toFixed(1)}%</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-md">
            <h3 className="text-sm font-medium text-purple-700 mb-1">Questions</h3>
            <p className="text-2xl font-bold">{report.correctAnswers} / {report.totalQuestions}</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-md">
            <h3 className="text-sm font-medium text-green-700 mb-1">Time Spent</h3>
            <p className="text-2xl font-bold">{formatTime(report.timeSpent)}</p>
          </div>
        </div>
        
        <div className="text-sm text-gray-500 mb-6">
          <p>Completed on {formatDate(report.completedAt)}</p>
        </div>
        
        <div className="mb-4">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                className={`py-3 px-4 text-sm font-medium border-b-2 ${
                  activeTab === 'summary' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('summary')}
              >
                Performance Summary
              </button>
              <button
                className={`py-3 px-4 text-sm font-medium border-b-2 ${
                  activeTab === 'details' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('details')}
              >
                Detailed Responses
              </button>
            </nav>
          </div>
        </div>
        
        {activeTab === 'summary' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Sub-Topic Performance</h2>
            
            {report.subTopicStats && Object.entries(report.subTopicStats).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(report.subTopicStats).map(([subTopic, stats]) => (
                  <div key={subTopic} className="border rounded-md p-4">
                    <h3 className="font-medium text-lg mb-2">{subTopic}</h3>
                    <div className="flex items-center mb-2">
                      <div className="w-full bg-gray-200 rounded-full h-4 mr-2">
                        <div 
                          className={`h-4 rounded-full ${
                            stats.percentage >= 80 
                              ? 'bg-green-500' 
                              : stats.percentage >= 60 
                              ? 'bg-yellow-500' 
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${stats.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{stats.percentage}%</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Correct: {stats.correct} / {stats.total}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No sub-topic data available for this assessment.</p>
            )}
            
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Recommendations</h2>
              
              {report.score < 60 ? (
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <h3 className="font-medium text-red-800">Areas to improve</h3>
                  <ul className="mt-2 ml-5 list-disc text-sm text-red-700">
                    <li>Review core concepts in {report.subject}</li>
                    <li>Focus on weak sub-topics identified above</li>
                    <li>Try practice problems with time constraints</li>
                    <li>Consider seeking additional help or resources</li>
                  </ul>
                </div>
              ) : report.score < 80 ? (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                  <h3 className="font-medium text-yellow-800">Good progress, keep improving</h3>
                  <ul className="mt-2 ml-5 list-disc text-sm text-yellow-700">
                    <li>Continue strengthening your understanding of {report.subject}</li>
                    <li>Pay extra attention to sub-topics with scores below 70%</li>
                    <li>Practice with more challenging questions</li>
                  </ul>
                </div>
              ) : (
                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <h3 className="font-medium text-green-800">Excellent performance</h3>
                  <ul className="mt-2 ml-5 list-disc text-sm text-green-700">
                    <li>You've demonstrated strong understanding of {report.subject}</li>
                    <li>Challenge yourself with advanced topics</li>
                    <li>Consider helping peers who are struggling with this subject</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'details' && (
          <div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Question
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Sub-Topic
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Difficulty
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Your Answer
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Correct Answer
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Result
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {report.detailedResponses.map((response, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {response.question}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {response.subTopic || 'Uncategorized'}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getDifficultyColor(response.difficulty)}`}>
                          {response.difficulty}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {response.userAnswer || "Not answered"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {response.correctAnswer}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                          response.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {response.isCorrect ? '✓' : '✗'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailedReportPage;