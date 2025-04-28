import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AssessmentList = () => {
  const [assessments, setAssessments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch assessments
    const fetchAssessments = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/assessments/reports', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setAssessments(response.data);
      } catch (error) {
        console.error('Error fetching assessments:', error);
      }
    };

    fetchAssessments();
  }, [navigate]);

  const viewReport = (assessmentId) => {
    console.log("Navigating to report with ID:", assessmentId);
    
    if (!assessmentId) {
      console.error('Cannot navigate to report: Assessment ID is missing');
      return;
    }
    
    navigate(`/reports/${assessmentId}`);
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Completed Assessments</h1>
      
      {assessments.length === 0 ? (
        <p className="text-gray-500">You haven't completed any assessments yet.</p>
      ) : (
        <div className="grid gap-4">
          {assessments.map((assessment) => (
            <div key={assessment._id} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-lg">{assessment.subject}</h2>
                  <p className="text-sm text-gray-600">
                    Completed on {new Date(assessment.completedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xl">{assessment.score.toFixed(1)}%</p>
                  <button
                    onClick={() => viewReport(assessment._id)} // Make sure _id exists
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                  >
                    View Report
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssessmentList;