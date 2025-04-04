import api from '../utils/api';

/**
 * User API utilities
 */

/**
 * Get user profile
 * @param {string} userId - User ID
 * @returns {Promise<Object>} User profile data
 */
export const getUserProfile = async (userId) => {
  try {
    // In a real app, make an API call:
    // const response = await api.get(`/users/${userId}`);
    // return response.data;
    
    // For demo purposes, simulate API response
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock user profile data
    return {
      id: userId || '123456',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      avatar: 'https://placehold.co/200x200?text=JS',
      phone: '+1 (123) 456-7890',
      grade: '11th Grade',
      school: 'Lincoln High School',
      interests: ['Mathematics', 'Physics', 'Computer Science'],
      joinedDate: '2023-01-15',
      lastActive: '2023-07-28'
    };
  } catch (error) {
    console.error('Get user profile error:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to get user profile');
  }
};

/**
 * Update user profile
 * @param {string} userId - User ID
 * @param {Object} updates - Profile updates
 * @returns {Promise<Object>} Updated user profile
 */
export const updateUserProfile = async (userId, updates) => {
  try {
    // In a real app, make an API call:
    // const response = await api.patch(`/users/${userId}`, updates);
    // return response.data;
    
    // For demo purposes, simulate API response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock updated user profile
    return {
      id: userId || '123456',
      ...updates,
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Update user profile error:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to update user profile');
  }
};

/**
 * Get user learning progress
 * @param {string} userId - User ID
 * @returns {Promise<Object>} User progress data
 */
export const getUserProgress = async (userId) => {
  try {
    // In a real app, make an API call:
    // const response = await api.get(`/users/${userId}/progress`);
    // return response.data;
    
    // For demo purposes, simulate API response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user progress data
    return {
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
  } catch (error) {
    console.error('Get user progress error:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to get user progress');
  }
};

/**
 * Get user enrolled courses
 * @param {string} userId - User ID
 * @returns {Promise<Array>} List of enrolled courses
 */
export const getUserCourses = async (userId) => {
  try {
    // In a real app, make an API call:
    // const response = await api.get(`/users/${userId}/courses`);
    // return response.data;
    
    // For demo purposes, simulate API response
    await new Promise(resolve => setTimeout(resolve, 900));
    
    // Mock user courses data
    return [
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
  } catch (error) {
    console.error('Get user courses error:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to get user courses');
  }
};

/**
 * Get user assessment results
 * @param {string} userId - User ID
 * @returns {Promise<Array>} List of assessment results
 */
export const getUserAssessments = async (userId) => {
  try {
    // In a real app, make an API call:
    // const response = await api.get(`/users/${userId}/assessments`);
    // return response.data;
    
    // For demo purposes, simulate API response
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock user assessment data
    return [
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
      },
      {
        id: 2,
        type: 'post',
        date: '2023-03-10',
        score: 78,
        subjectScores: [
          { subject: 'Mathematics', score: 85 },
          { subject: 'Physics', score: 75 },
          { subject: 'Chemistry', score: 65 },
          { subject: 'Biology', score: 82 }
        ]
      }
    ];
  } catch (error) {
    console.error('Get user assessments error:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to get user assessments');
  }
};

/**
 * Get personalized recommendations for a user
 * @param {string} userId - User ID
 * @returns {Promise<Array>} List of recommended courses
 */
export const getUserRecommendations = async (userId) => {
  try {
    // In a real app, make an API call:
    // const response = await api.get(`/users/${userId}/recommendations`);
    // return response.data;
    
    // For demo purposes, simulate API response
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Mock user recommendations
    return [
      {
        id: 1,
        title: 'Algebra Master Class',
        category: 'Mathematics',
        difficulty: 'Intermediate',
        description: 'Based on your recent assessment, we recommend strengthening your algebra skills with this comprehensive course.',
        rating: 4.8,
        reviewsCount: 245,
        thumbnail: 'https://placehold.co/300x200?text=Algebra',
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
        thumbnail: 'https://placehold.co/300x200?text=Physics',
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
        thumbnail: 'https://placehold.co/300x200?text=Chemistry',
        matchPercentage: 82
      }
    ];
  } catch (error) {
    console.error('Get user recommendations error:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to get user recommendations');
  }
};

/**
 * Update user preferences
 * @param {string} userId - User ID
 * @param {Object} preferences - User preferences
 * @returns {Promise<Object>} Updated preferences
 */
export const updateUserPreferences = async (userId, preferences) => {
  try {
    // In a real app, make an API call:
    // const response = await api.patch(`/users/${userId}/preferences`, preferences);
    // return response.data;
    
    // For demo purposes, simulate API response
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return updated preferences
    return {
      ...preferences,
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Update preferences error:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to update preferences');
  }
};

/**
 * Submit assessment results
 * @param {string} userId - User ID
 * @param {string} assessmentType - Type of assessment ('pre' or 'post')
 * @param {Object} results - Assessment results
 * @returns {Promise<Object>} Submitted assessment data
 */
export const submitAssessment = async (userId, assessmentType, results) => {
  try {
    // In a real app, make an API call:
    // const response = await api.post(`/users/${userId}/assessments`, { assessmentType, results });
    // return response.data;
    
    // For demo purposes, simulate API response
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return assessment object
    return {
      id: Math.floor(Math.random() * 1000) + 1,
      userId,
      type: assessmentType,
      date: new Date().toISOString().split('T')[0],
      score: results.score,
      subjectScores: results.subjectScores,
      submittedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Submit assessment error:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to submit assessment');
  }
};