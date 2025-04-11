import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  BarChart, Bar,
  PieChart, Pie, Cell
} from 'recharts';
import { FaBook, FaRegCalendarAlt, FaRegClock, FaChevronRight, FaLaptop, FaFileAlt } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoaded, setIsLoaded] = useState(false);
  const [assessmentResults, setAssessmentResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  
  // Data states for different charts
  const [progressData, setProgressData] = useState([]);
  const [skillsData, setSkillsData] = useState([]);
  const [courseProgress, setCourseProgress] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [stats, setStats] = useState({
    coursesEnrolled: 0,
    completed: 0,
    assessmentsTaken: 0,
    avgScore: '0%'
  });
  
  // Function to get color based on difficulty level
  const getDifficultyColor = (difficulty) => {
    if (!difficulty) return "bg-gray-200";
    
    const level = difficulty.toLowerCase();
    if (level === "easy") return "bg-green-500";
    if (level === "medium") return "bg-yellow-500";
    if (level === "hard") return "bg-red-500";
    return "bg-gray-200";
  };
  
  // Fetch assessment results
  useEffect(() => {
    const fetchAssessmentResults = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const userId = user?.id
      
        
        if (!token) {
          setError('Authentication token not found');
          setLoading(false);
          return;
        }
        
        const response = await axios.get(`http://localhost:5000/api/assessments/history/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        setAssessmentResults(response.data);
        processAssessmentData(response.data);
      } catch (error) {
        console.error('Error fetching assessment results:', error);
        setError('Failed to load assessment data');
      } finally {
        setLoading(false);
        setIsLoaded(true);
      }
    };
    
    fetchAssessmentResults();
  }, []);
  
  // Process assessment data for different charts
  const processAssessmentData = (data) => {
    if (!data || data.length === 0) return;
    
    // Progress over time (line chart)
    const sortedByDate = [...data].sort((a, b) => 
      new Date(a.completedAt) - new Date(b.completedAt)
    );
    
    const progressOverTime = sortedByDate.map(assessment => ({
      month: new Date(assessment.completedAt).toLocaleDateString('en-US', { month: 'short' }),
      score: assessment.score
    }));
    
    setProgressData(progressOverTime);
    
    // Skills by subject (radar chart)
    const subjectScores = {};
    data.forEach(assessment => {
      if (!subjectScores[assessment.subject]) {
        subjectScores[assessment.subject] = {
          scores: [],
          total: 0,
          count: 0
        };
      }
      
      subjectScores[assessment.subject].scores.push(assessment.score);
      subjectScores[assessment.subject].total += assessment.score;
      subjectScores[assessment.subject].count += 1;
    });
    
    const skillsRadarData = Object.keys(subjectScores).map(subject => ({
      subject: subject.charAt(0).toUpperCase() + subject.slice(1),
      A: subjectScores[subject].total / subjectScores[subject].count, // Average score
      fullMark: 100
    }));
    
    setSkillsData(skillsRadarData);
    
    // Course progress (bar chart)
    const subjectProgress = Object.keys(subjectScores).map(subject => ({
      name: subject.charAt(0).toUpperCase() + subject.slice(1),
      progress: subjectScores[subject].total / subjectScores[subject].count
    }));
    
    setCourseProgress(subjectProgress);
    
    // Pie chart data - categorize assessments by score range
    const scoreCategories = {
      'Excellent (>90%)': 0,
      'Good (70-90%)': 0,
      'Average (50-70%)': 0,
      'Needs Improvement (<50%)': 0
    };
    
    data.forEach(assessment => {
      if (assessment.score > 90) {
        scoreCategories['Excellent (>90%)']++;
      } else if (assessment.score >= 70) {
        scoreCategories['Good (70-90%)']++;
      } else if (assessment.score >= 50) {
        scoreCategories['Average (50-70%)']++;
      } else {
        scoreCategories['Needs Improvement (<50%)']++;
      }
    });
    
    const pieChartData = Object.keys(scoreCategories).map(category => ({
      name: category,
      value: scoreCategories[category]
    }));
    
    setPieData(pieChartData);
    
    // Calculate stats
    const totalAssessments = data.length;
    const completedAssessments = data.filter(a => a.score > 50).length;
    const averageScore = data.reduce((sum, a) => sum + a.score, 0) / totalAssessments;
    
    setStats({
      coursesEnrolled: Object.keys(subjectScores).length,
      completed: completedAssessments,
      assessmentsTaken: totalAssessments,
      avgScore: `${Math.round(averageScore)}%`
    });
  };
  
  const COLORS = ['#10B981', '#6366F1', '#EC4899', '#9CA3AF'];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Get upcoming assessments - this would normally come from your backend
  // You might want to create a separate endpoint for this
  const upcomingAssessments = [
    { id: 1, title: 'Mathematics Mid-term', date: '15 May 2025', time: '10:00 AM' },
    { id: 2, title: 'Physics Lab Evaluation', date: '22 May 2025', time: '2:30 PM' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Sidebar */}
          <motion.div 
            className="w-full md:w-64 bg-white rounded-xl shadow-sm p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center">
                <span className="text-xl font-bold text-white">
                  {user ? user.name?.charAt(0) || 'U' : 'U'}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{user?.name || 'Student'}</h3>
                <p className="text-sm text-gray-500">{user?.grade || 'Student'}</p>
              </div>
            </div>
            
            <nav>
              <ul className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: <FaLaptop className="mr-2" /> },
                  { id: 'courses', label: 'My Courses', icon: <FaBook className="mr-2" /> },
                  { id: 'assessments', label: 'Assessments', icon: <FaFileAlt className="mr-2" /> },
                  { id: 'recommendations', label: 'Recommendations', icon: <FaChevronRight className="mr-2" /> },
                  { id: 'settings', label: 'Settings', icon: <FaChevronRight className="mr-2" /> },
                ].map(tab => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${
                        activeTab === tab.id 
                          ? 'bg-indigo-100 text-indigo-700 font-medium' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
          
          {/* Main Content */}
          <motion.div 
            className="flex-1"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            {/* Header */}
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm mb-6"
              variants={itemVariants}
            >
              <h1 className="text-2xl font-bold text-gray-800">
                {activeTab === 'overview' && 'Dashboard Overview'}
                {activeTab === 'courses' && 'My Courses'}
                {activeTab === 'assessments' && 'Assessments'}
                {activeTab === 'recommendations' && 'Recommended Resources'}
                {activeTab === 'settings' && 'Settings'}
              </h1>
              <p className="text-gray-600">
                {activeTab === 'overview' && 'Track your progress and view personalized recommendations'}
                {activeTab === 'courses' && 'Manage your enrolled courses and track completion'}
                {activeTab === 'assessments' && 'View upcoming and completed assessments'}
                {activeTab === 'recommendations' && 'Resources selected based on your learning needs'}
                {activeTab === 'settings' && 'Update your personal information and preferences'}
              </p>
            </motion.div>
            
            {loading ? (
              <div className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : error ? (
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <p className="text-red-500 text-center">{error}</p>
                <p className="text-center mt-2">Please try refreshing the page or log in again.</p>
              </div>
            ) : activeTab === 'overview' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Stats */}
                <motion.div 
                  className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
                  variants={itemVariants}
                >
                  {[
                    { label: 'Courses Enrolled', value: stats.coursesEnrolled.toString(), color: 'bg-blue-500' },
                    { label: 'Completed', value: stats.completed.toString(), color: 'bg-green-500' },
                    { label: 'Assessments Taken', value: stats.assessmentsTaken.toString(), color: 'bg-purple-500' },
                    { label: 'Avg. Score', value: stats.avgScore, color: 'bg-yellow-500' }
                  ].map((stat, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl shadow-sm flex items-center space-x-4">
                      <div className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center text-white`}>
                        {stat.value}
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">{stat.label}</p>
                        <p className="font-semibold">{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
                
                {/* Progress Chart */}
                <motion.div 
                  className="bg-white p-6 rounded-xl shadow-sm"
                  variants={itemVariants}
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Your Progress</h2>
                  {progressData.length > 0 ? (
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={progressData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="score" 
                            stroke="#6366F1" 
                            strokeWidth={2}
                            dot={{ r: 6 }}
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-72 flex items-center justify-center text-gray-500">
                      No progress data available yet
                    </div>
                  )}
                </motion.div>
                
                {/* Skills Radar */}
                <motion.div 
                  className="bg-white p-6 rounded-xl shadow-sm"
                  variants={itemVariants}
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Skills Assessment</h2>
                  {skillsData.length > 0 ? (
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart outerRadius={90} data={skillsData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} />
                          <Radar
                            name="Skills"
                            dataKey="A"
                            stroke="#EC4899"
                            fill="#EC4899"
                            fillOpacity={0.5}
                          />
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-72 flex items-center justify-center text-gray-500">
                      No skills data available yet
                    </div>
                  )}
                </motion.div>
                
                {/* Course Progress */}
                <motion.div 
                  className="bg-white p-6 rounded-xl shadow-sm"
                  variants={itemVariants}
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Course Completion</h2>
                  {courseProgress.length > 0 ? (
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={courseProgress}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" domain={[0, 100]} />
                          <YAxis type="category" dataKey="name" width={150} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="progress" fill="#10B981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-72 flex items-center justify-center text-gray-500">
                      No course progress data available yet
                    </div>
                  )}
                </motion.div>
                
                {/* Assessment Stats */}
                <motion.div 
                  className="bg-white p-6 rounded-xl shadow-sm"
                  variants={itemVariants}
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Assessment Results</h2>
                  {pieData.length > 0 ? (
                    <div className="h-72 flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-72 flex items-center justify-center text-gray-500">
                      No assessment data available yet
                    </div>
                  )}
                </motion.div>
                
                {/* Recent Assessments */}
                <motion.div 
                  className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2"
                  variants={itemVariants}
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Assessments</h2>
                  {assessmentResults.length > 0 ? (
                    <div className="space-y-4">
                      {assessmentResults.slice(0, 5).map((assessment, index) => (
                        <div 
                          key={index}
                          className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-gray-800">
                                {assessment.subject.charAt(0).toUpperCase() + assessment.subject.slice(1)} Assessment
                              </h3>
                              <div className="flex items-center mt-2 text-sm text-gray-500">
                                <FaRegCalendarAlt className="mr-2" />
                                <span>{new Date(assessment.completedAt).toLocaleDateString()}</span>
                                <span className="mx-2">•</span>
                                <FaRegClock className="mr-2" />
                                <span>{Math.floor(assessment.timeSpent / 60)} minutes</span>
                                <span className="mx-2">•</span>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  assessment.score >= 70 ? 'bg-green-100 text-green-800' : 
                                  assessment.score >= 50 ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-red-100 text-red-800'
                                }`}>
                                  Score: {assessment.score}%
                                </span>
                              </div>
                            </div>
                            <button className="text-indigo-600 hover:text-indigo-800">
                              <FaChevronRight />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-8">No assessment results available yet</p>
                  )}
                </motion.div>
              </div>
            ) : (
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-sm"
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {activeTab === 'assessments' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Your Assessment History</h2>
                    
                    {assessmentResults.length > 0 ? (
                      <div className="space-y-4">
                        {assessmentResults.map((assessment, index) => (
                          <div 
                            key={index}
                            className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-gray-800">
                                  {assessment.subject.charAt(0).toUpperCase() + assessment.subject.slice(1)} Assessment
                                </h3>
                                <div className="flex flex-wrap items-center mt-2 text-sm text-gray-500 gap-2">
                                  <div className="flex items-center">
                                    <FaRegCalendarAlt className="mr-1" />
                                    <span>{new Date(assessment.completedAt).toLocaleDateString()}</span>
                                  </div>
                                  <span>•</span>
                                  <div className="flex items-center">
                                    <FaRegClock className="mr-1" />
                                    <span>{Math.floor(assessment.timeSpent / 60)} minutes</span>
                                  </div>
                                  <span>•</span>
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    assessment.score >= 70 ? 'bg-green-100 text-green-800' : 
                                    assessment.score >= 50 ? 'bg-yellow-100 text-yellow-800' : 
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    Score: {assessment.score}%
                                  </span>
                                  <span>•</span>
                                  <span>{assessment.correctAnswers} / {assessment.totalQuestions} correct</span>
                                </div>
                              </div>
                              <button className="text-indigo-600 hover:text-indigo-800">
                                View Details
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-500 py-8">No assessment results available yet</p>
                    )}
                  </div>
                )}
                
                {activeTab !== 'assessments' && (
                  <p className="text-gray-700 text-center py-8">
                    {activeTab === 'courses' && 'Courses content will be displayed here.'}
                    {activeTab === 'recommendations' && 'Recommendations content will be displayed here.'}
                    {activeTab === 'settings' && 'Settings content will be displayed here.'}
                  </p>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;