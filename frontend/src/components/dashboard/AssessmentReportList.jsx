import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth'; // Adjust path as needed

const AssessmentReportsList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth(); // Use your auth hook

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/assessments/reports', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setReports(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setError("Failed to load your assessment reports. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [navigate]);

  const viewDetailedReport = (reportId) => {
    navigate(`/assessment/report/${reportId}`);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium text-gray-700">No assessment reports yet</h3>
        <p className="mt-2 text-gray-500">Complete an assessment to see your reports here.</p>
        <button
          onClick={() => navigate('/assessment')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Take an Assessment
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Assessment Reports</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div 
            key={report._id} 
            className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => viewDetailedReport(report._id)}
          >
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">{report.subject} Assessment</h3>
                <span className="text-xs text-gray-500">{formatDate(report.completedAt)}</span>
              </div>
              
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-600">Score</span>
                <span className="text-lg font-medium">{report.score.toFixed(1)}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className={`h-2.5 rounded-full ${
                    report.score >= 80 
                      ? 'bg-green-600' 
                      : report.score >= 60 
                      ? 'bg-yellow-500' 
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${report.score}%` }}
                ></div>
              </div>
              
              {report.subTopicStats && Object.entries(report.subTopicStats).length > 0 && (
                <div className="space-y-2 mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Sub-Topic Performance</h4>
                  
                  {Object.entries(report.subTopicStats).slice(0, 3).map(([subTopic, stats]) => (
                    <div key={subTopic}>
                      <div className="flex justify-between text-xs mb-1">
                        <span>{subTopic}</span>
                        <span>{stats.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${
                            stats.percentage >= 80 
                              ? 'bg-green-500' 
                              : stats.percentage >= 60 
                              ? 'bg-yellow-500' 
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${stats.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                  
                  {Object.keys(report.subTopicStats).length > 3 && (
                    <p className="text-xs text-gray-500 mt-1">
                      +{Object.keys(report.subTopicStats).length - 3} more sub-topics
                    </p>
                  )}
                </div>
              )}
            </div>
            
            <div className="bg-blue-50 text-blue-700 text-center py-2 font-medium text-sm border-t border-blue-100">
              View Detailed Report
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssessmentReportsList;