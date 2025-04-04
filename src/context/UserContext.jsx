import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

// Create user context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  
  const [userProgress, setUserProgress] = useState(null);
  const [userCourses, setUserCourses] = useState([]);
  const [userAssessments, setUserAssessments] = useState([]);
  const [userPreferences, setUserPreferences] = useState(null);
  const [userRecommendations, setUserRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Mock function to fetch user data
  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, you would make API calls to fetch user data
      // For demo purposes, we're using mock data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user progress data
      const mockProgress = {
        overall: 65,
        bySubject: {
          Mathematics: 80,
          Physics: 70,
          Chemistry: 60,
          Biology: 75,
          English: 85,
          'Computer Science': 90
        },
        history: [
          { month: 'Jan', score: 55 },
          { month: 'Feb', score: 58 },
          { month: 'Mar', score: 62 },
          { month: 'Apr', score: 65 },
          { month: 'May', score: 70 },
          { month: 'Jun', score: 75 }
        ]
      };
      
      // Mock user courses data
      const mockCourses = [
        {
          id: 1,
          title: 'Advanced Mathematics',
          thumbnail: 'https://placehold.co/120x80?text=Math',
          progress: 75,
          totalLessons: 24,
          completedLessons: 18,
          duration: '5h 30m',
          lastAccessed: '2 days ago'
        },
        {
          id: 2,
          title: 'Physics Fundamentals',
          thumbnail: 'https://placehold.co/120x80?text=Physics',
          progress: 60,
          totalLessons: 32,
          completedLessons: 19,
          duration: '8h 15m',
          lastAccessed: '1 week ago'
        },
        {
          id: 3,
          title: 'Chemistry Labs',
          thumbnail: 'https://placehold.co/120x80?text=Chemistry',
          progress: 45,
          totalLessons: 20,
          completedLessons: 9,
          duration: '4h 45m',
          lastAccessed: '3 days ago'
        },
        {
          id: 4,
          title: 'Programming Basics',
          thumbnail: 'https://placehold.co/120x80?text=Programming',
          progress: 90,
          totalLessons: 18,
          completedLessons: 16,
          duration: '6h 20m',
          lastAccessed: 'Yesterday'
        }
      ];
      
      // Mock user assessments data
      const mockAssessments = [
        {
          id: 1,
          type: 'pre',
          date: '2023-01-15',
          score: 65,
          subjectScores: [
            { subject: 'Mathematics', score: 70 },
            { subject: 'Physics', score: 60 },
            { subject: 'Chemistry', score: 55 },
            { subject: 'Biology', score: 75 }
          ]
        }
      ];
      
      // Mock user preferences
      const mockPreferences = {
        learningStyle: 'Visual',
        preferredSubjects: ['Mathematics', 'Computer Science'],
        studyTime: 'Evening',
        notificationsEnabled: true,
        darkModeEnabled: false,
        emailNotifications: true,
        smsNotifications: false
      };
      
      // Mock user recommendations
      const mockRecommendations = [
        {
          id: 1,
          title: 'Algebra Master Class',
          category: 'Mathematics',
          difficulty: 'Intermediate',
          description: 'Based on your recent assessment, we recommend strengthening your algebra skills with this comprehensive course.',
          rating: 4.8,
          reviewsCount: 245,
          matchPercentage: 95
        },
        {
          id: 2,
          title: 'Physics Problem Solving',
          category: 'Physics',
          difficulty: 'Advanced',
          description: 'Improve your analytical skills with these practice problems.',
          rating: 4.5,
          reviewsCount: 187,
          matchPercentage: 88
        },
        {
          id: 3,
          title: 'Chemistry Fundamentals',
          category: 'Chemistry',
          difficulty: 'Beginner',
          description: 'Strengthen your foundation in chemistry with this introductory course.',
          rating: 4.7,
          reviewsCount: 134,
          matchPercentage: 82
        }
      ];
      
      // Update state with mock data
      setUserProgress(mockProgress);
      setUserCourses(mockCourses);
      setUserAssessments(mockAssessments);
      setUserPreferences(mockPreferences);
      setUserRecommendations(mockRecommendations);
      
    } catch (error) {
      setError(error.message || 'Failed to fetch user data');
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch user data when currentUser changes
  useEffect(() => {
    if (currentUser) {
      fetchUserData();
    } else {
      // Reset state when user logs out
      setUserProgress(null);
      setUserCourses([]);
      setUserAssessments([]);
      setUserPreferences(null);
      setUserRecommendations([]);
      setLoading(false);
    }
  }, [currentUser]);
  
  // Take assessment
  const completeAssessment = async (assessmentType, results) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, you would make an API call to save assessment results
      // For demo purposes, we're simulating a successful submission
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new assessment object
      const newAssessment = {
        id: userAssessments.length + 1,
        type: assessmentType, // 'pre' or 'post'
        date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
        score: results.score,
        subjectScores: results.subjectScores
      };
      
      // Add to assessments array
      setUserAssessments(prev => [...prev, newAssessment]);
      
      // If this is a post-assessment, update user progress
      if (assessmentType === 'post') {
        // Update overall progress
        setUserProgress(prev => ({
          ...prev,
          overall: Math.round((prev.overall + results.score) / 2), // Simple average for demo
          history: [...prev.history, { month: new Date().toLocaleString('default', { month: 'short' }), score: results.score }]
        }));
        
        // Generate new recommendations based on results
        // For demo purposes, we're not changing the recommendations
      }
      
      return newAssessment;
    } catch (error) {
      setError(error.message || 'Failed to complete assessment');
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Enroll in a course
  const enrollInCourse = async (courseId) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, you would make an API call to enroll in a course
      // For demo purposes, we're simulating a successful enrollment
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock course data
      const newCourse = {
        id: courseId,
        title: `Course #${courseId}`,
        thumbnail: `https://placehold.co/120x80?text=Course${courseId}`,
        progress: 0,
        totalLessons: 20,
        completedLessons: 0,
        duration: '6h 0m',
        lastAccessed: 'Just now'
      };
      
      // Add to courses array if not already enrolled
      if (!userCourses.some(course => course.id === courseId)) {
        setUserCourses(prev => [...prev, newCourse]);
      }
      
      return true;
    } catch (error) {
      setError(error.message || 'Failed to enroll in course');
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Update course progress
  const updateCourseProgress = async (courseId, lessonId, completed) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, you would make an API call to update course progress
      // For demo purposes, we're simulating a successful update
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update courses array
      setUserCourses(prev => prev.map(course => {
        if (course.id === courseId) {
          const newCompletedLessons = completed ? course.completedLessons + 1 : course.completedLessons;
          const newProgress = Math.round((newCompletedLessons / course.totalLessons) * 100);
          
          return {
            ...course,
            completedLessons: newCompletedLessons,
            progress: newProgress,
            lastAccessed: 'Just now'
          };
        }
        return course;
      }));
      
      return true;
    } catch (error) {
      setError(error.message || 'Failed to update course progress');
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Update user preferences
  const updatePreferences = async (updates) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, you would make an API call to update preferences
      // For demo purposes, we're simulating a successful update
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update preferences
      setUserPreferences(prev => ({
        ...prev,
        ...updates
      }));
      
      return true;
    } catch (error) {
      setError(error.message || 'Failed to update preferences');
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Context value
  const value = {
    userProgress,
    userCourses,
    userAssessments,
    userPreferences,
    userRecommendations,
    loading,
    error,
    completeAssessment,
    enrollInCourse,
    updateCourseProgress,
    updatePreferences,
    refreshUserData: fetchUserData
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};