import api from '../utils/api';

/**
 * Fetch all courses with optional filters
 * @param {Object} filters - Filter options
 * @param {string} filters.category - Category filter
 * @param {string} filters.search - Search term
 * @param {string} filters.sort - Sort option
 * @param {string} filters.level - Difficulty level
 * @param {number} filters.page - Page number for pagination
 * @param {number} filters.limit - Number of items per page
 * @returns {Promise<Object>} Courses data with pagination
 */
export const getCourses = async (filters = {}) => {
  try {
    // For demo purposes, we're using mock data
    // In a real app, you would make an API call to your backend
    
    // Simulate API call
    // const response = await api.get('/courses', { params: filters });
    // return response.data;
    
    // Mock response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock courses data
    const mockCourses = [
      {
        id: 1,
        title: 'Advanced Mathematics for High School Students',
        description: 'Master advanced mathematical concepts with this comprehensive course designed for high school students preparing for college entrance exams.',
        thumbnail: 'https://placehold.co/600x400/indigo/white?text=Mathematics',
        category: 'mathematics',
        level: 'Advanced',
        rating: 4.7,
        reviewsCount: 245,
        studentsCount: 12560,
        price: 49.99,
        discountPrice: 39.99,
        duration: '5h 30m',
        instructor: 'Dr. Jane Smith',
        createdAt: '2023-05-15'
      },
      {
        id: 2,
        title: 'Physics Fundamentals: Motion, Energy & Forces',
        description: 'Build a strong foundation in physics principles with practical examples and interactive simulations.',
        thumbnail: 'https://placehold.co/600x400/orange/white?text=Physics',
        category: 'physics',
        level: 'Intermediate',
        rating: 4.5,
        reviewsCount: 187,
        studentsCount: 8753,
        price: 44.99,
        discountPrice: null,
        duration: '7h 45m',
        instructor: 'Prof. Robert Johnson',
        createdAt: '2023-06-20'
      },
      {
        id: 3,
        title: 'Chemistry: Understanding Atomic Structure',
        description: 'Explore the fascinating world of atoms, elements, and chemical reactions in this comprehensive chemistry course.',
        thumbnail: 'https://placehold.co/600x400/green/white?text=Chemistry',
        category: 'chemistry',
        level: 'Beginner',
        rating: 4.8,
        reviewsCount: 156,
        studentsCount: 5421,
        price: 39.99,
        discountPrice: null,
        duration: '6h 15m',
        instructor: 'Dr. Emily Chang',
        createdAt: '2023-03-10'
      },
      {
        id: 4,
        title: 'Introduction to Programming with Python',
        description: 'Learn the fundamentals of programming using Python, one of the most popular and versatile programming languages.',
        thumbnail: 'https://placehold.co/600x400/blue/white?text=Programming',
        category: 'computer-science',
        level: 'Beginner',
        rating: 4.9,
        reviewsCount: 312,
        studentsCount: 18945,
        price: 54.99,
        discountPrice: 44.99,
        duration: '8h 20m',
        instructor: 'Alex Davidson',
        createdAt: '2023-07-05'
      },
      {
        id: 5,
        title: 'Biology: The Science of Life',
        description: 'Discover the amazing world of living organisms, from cells to ecosystems, in this comprehensive biology course.',
        thumbnail: 'https://placehold.co/600x400/purple/white?text=Biology',
        category: 'biology',
        level: 'Intermediate',
        rating: 4.6,
        reviewsCount: 203,
        studentsCount: 7629,
        price: 49.99,
        discountPrice: null,
        duration: '9h 10m',
        instructor: 'Dr. Sarah Williams',
        createdAt: '2023-04-25'
      },
      {
        id: 6,
        title: 'English Literature: Analyzing Classic Texts',
        description: 'Develop critical reading and analysis skills by studying classic works of literature from different periods and traditions.',
        thumbnail: 'https://placehold.co/600x400/pink/white?text=Literature',
        category: 'english',
        level: 'Advanced',
        rating: 4.7,
        reviewsCount: 175,
        studentsCount: 6234,
        price: 42.99,
        discountPrice: null,
        duration: '7h 30m',
        instructor: 'Prof. Michael Taylor',
        createdAt: '2023-02-15'
      },
      {
        id: 7,
        title: 'Statistics and Data Analysis',
        description: 'Learn essential statistical concepts and data analysis techniques used in research, business, and everyday decision-making.',
        thumbnail: 'https://placehold.co/600x400/cyan/white?text=Statistics',
        category: 'mathematics',
        level: 'Intermediate',
        rating: 4.5,
        reviewsCount: 219,
        studentsCount: 9872,
        price: 0,
        discountPrice: null,
        duration: '6h 45m',
        instructor: 'Dr. Kevin Matthews',
        createdAt: '2023-01-30'
      },
      {
        id: 8,
        title: 'Web Development Fundamentals',
        description: 'Build responsive websites from scratch using HTML, CSS, and JavaScript, the core technologies of the web.',
        thumbnail: 'https://placehold.co/600x400/red/white?text=Web+Dev',
        category: 'computer-science',
        level: 'Beginner',
        rating: 4.8,
        reviewsCount: 287,
        studentsCount: 15623,
        price: 59.99,
        discountPrice: 49.99,
        duration: '10h 15m',
        instructor: 'Jennifer Lee',
        createdAt: '2023-06-10'
      }
    ];
    
    // Apply filters
    let filtered = [...mockCourses];
    
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(course => course.category === filters.category);
    }
    
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(search) ||
        course.description.toLowerCase().includes(search) ||
        course.instructor.toLowerCase().includes(search)
      );
    }
    
    if (filters.level && filters.level !== 'all') {
      filtered = filtered.filter(course => course.level === filters.level);
    }
    
    // Apply sorting
    if (filters.sort) {
      switch (filters.sort) {
        case 'popular':
          filtered.sort((a, b) => b.studentsCount - a.studentsCount);
          break;
        case 'highestRated':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'priceLowToHigh':
          filtered.sort((a, b) => {
            const priceA = a.discountPrice !== null ? a.discountPrice : a.price;
            const priceB = b.discountPrice !== null ? b.discountPrice : b.price;
            return priceA - priceB;
          });
          break;
        case 'priceHighToLow':
          filtered.sort((a, b) => {
            const priceA = a.discountPrice !== null ? a.discountPrice : a.price;
            const priceB = b.discountPrice !== null ? b.discountPrice : b.price;
            return priceB - priceA;
          });
          break;
        default:
          break;
      }
    }
    
    // Apply pagination
    const page = filters.page || 1;
    const limit = filters.limit || 8;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const paginatedResults = filtered.slice(startIndex, endIndex);
    
    return {
      courses: paginatedResults,
      pagination: {
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit)
      }
    };
  } catch (error) {
    console.error('Get courses error:', error);
    throw error;
  }
};

/**
 * Fetch a single course by ID
 * @param {string|number} courseId - Course ID
 * @returns {Promise<Object>} Course data
 */
export const getCourseById = async (courseId) => {
  try {
    // For demo purposes, we're using mock data
    // In a real app, you would make an API call to your backend
    
    // Simulate API call
    // const response = await api.get(`/courses/${courseId}`);
    // return response.data;
    
    // Mock response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock course data based on ID
    const mockCourses = {
      1: {
        id: 1,
        title: 'Advanced Mathematics for High School Students',
        description: 'Master advanced mathematical concepts with this comprehensive course designed for high school students preparing for college entrance exams.',
        thumbnail: 'https://placehold.co/600x400/indigo/white?text=Mathematics',
        category: 'Mathematics',
        level: 'Advanced',
        rating: 4.7,
        reviewsCount: 245,
        studentsCount: 12560,
        price: 49.99,
        discountPrice: 39.99,
        duration: '5h 30m',
        language: 'English',
        lastUpdated: 'March 2023',
        instructor: {
          name: 'Dr. Jane Smith',
          title: 'Mathematics Professor & Curriculum Developer',
          avatar: 'https://placehold.co/200x200?text=JS',
          bio: 'Dr. Jane Smith has over 15 years of experience teaching mathematics at both high school and university levels. She holds a Ph.D. in Mathematics Education from Stanford University and has published numerous research papers on effective mathematics teaching methods.',
          rating: 4.8,
          studentsCount: 34650,
          coursesCount: 12
        },
        overview: `This comprehensive course is designed to help high school students master advanced mathematical concepts needed for college preparation. The course covers a wide range of topics including advanced algebra, calculus fundamentals, probability and statistics, and mathematical problem-solving techniques.`,
        learningOutcomes: [
          'Master advanced algebraic concepts and techniques',
          'Understand the fundamentals of calculus',
          'Apply mathematical principles to solve complex problems',
          'Build a strong foundation for college-level mathematics',
          'Develop critical thinking and analytical skills',
          'Learn test-taking strategies for standardized math exams',
          'Apply mathematics to real-world scenarios',
          'Visualize mathematical concepts through interactive exercises'
        ],
        requirements: [
          'Basic understanding of high school algebra and geometry',
          'Graphing calculator (TI-84 or equivalent recommended)',
          'Dedication to practice and complete assignments',
          'Strong foundation in intermediate mathematics concepts'
        ],
        targetAudience: [
          'High school students preparing for college-level mathematics',
          'Students looking to excel in standardized tests (SAT, ACT)',
          'Anyone wanting to strengthen their advanced math skills',
          'Students interested in STEM fields and advanced academics'
        ],
        curriculum: [
          {
            title: 'Section 1: Introduction to Advanced Mathematics',
            duration: '45 minutes',
            lessons: [
              { title: 'Welcome to the Course', duration: '5 minutes', isPreview: true },
              { title: 'Course Overview', duration: '10 minutes', isPreview: true },
              { title: 'Setting Up Your Learning Environment', duration: '15 minutes', isPreview: false },
              { title: 'Mathematical Notation and Terminology', duration: '15 minutes', isPreview: false },
            ],
          },
          {
            title: 'Section 2: Advanced Algebra Concepts',
            duration: '2 hours',
            lessons: [
              { title: 'Polynomial Functions and Equations', duration: '20 minutes', isPreview: false },
              { title: 'Complex Numbers and Operations', duration: '25 minutes', isPreview: false },
              { title: 'Practice Exercise: Polynomial and Complex Problems', duration: '15 minutes', isPreview: false },
              { title: 'Matrix Operations and Determinants', duration: '30 minutes', isPreview: false },
              { title: 'Systems of Linear Equations', duration: '30 minutes', isPreview: false },
            ],
          },
          {
            title: 'Section 3: Introduction to Calculus',
            duration: '2.5 hours',
            lessons: [
              { title: 'Limits and Continuity', duration: '30 minutes', isPreview: false },
              { title: 'Derivatives and Rate of Change', duration: '45 minutes', isPreview: false },
              { title: 'Applications of Derivatives', duration: '45 minutes', isPreview: false },
              { title: 'Introduction to Integration', duration: '30 minutes', isPreview: false },
            ],
          },
        ]
      },
      // Additional mock courses would be defined here
    };
    
    const course = mockCourses[courseId];
    
    if (!course) {
      throw new Error('Course not found');
    }
    
    return course;
  } catch (error) {
    console.error(`Get course ${courseId} error:`, error);
    throw error;
  }
};

/**
 * Enroll in a course
 * @param {string|number} courseId - Course ID
 * @returns {Promise<Object>} Enrollment data
 */
export const enrollInCourse = async (courseId) => {
  try {
    // For demo purposes, we're simulating a successful enrollment
    // In a real app, you would make an API call to your backend
    
    // Simulate API call
    // const response = await api.post(`/courses/${courseId}/enroll`);
    // return response.data;
    
    // Mock response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'Successfully enrolled in the course',
      enrollmentId: '123abc',
      courseId: courseId
    };
  } catch (error) {
    console.error(`Enroll in course ${courseId} error:`, error);
    throw error;
  }
};

/**
 * Update course progress
 * @param {string|number} courseId - Course ID
 * @param {string|number} lessonId - Lesson ID
 * @param {boolean} completed - Whether the lesson was completed
 * @returns {Promise<Object>} Updated progress data
 */
export const updateProgress = async (courseId, lessonId, completed) => {
  try {
    // For demo purposes, we're simulating a successful progress update
    // In a real app, you would make an API call to your backend
    
    // Simulate API call
    // const response = await api.post(`/courses/${courseId}/lessons/${lessonId}/progress`, { completed });
    // return response.data;
    
    // Mock response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'Progress updated successfully',
      courseId: courseId,
      lessonId: lessonId,
      completed: completed,
      courseProgress: 65 // Percentage of course completed
    };
  } catch (error) {
    console.error(`Update course progress error:`, error);
    throw error;
  }
};

/**
 * Get course reviews
 * @param {string|number} courseId - Course ID
 * @param {Object} options - Pagination options
 * @returns {Promise<Object>} Reviews with pagination
 */
export const getCourseReviews = async (courseId, options = {}) => {
  try {
    // For demo purposes, we're using mock data
    // In a real app, you would make an API call to your backend
    
    // Simulate API call
    // const response = await api.get(`/courses/${courseId}/reviews`, { params: options });
    // return response.data;
    
    // Mock response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock reviews
    const mockReviews = [
      {
        id: 1,
        courseId: courseId,
        userId: 'user1',
        userName: 'Michael Johnson',
        userAvatar: 'https://placehold.co/50x50?text=MJ',
        rating: 5,
        title: 'Excellent course!',
        content: 'This course exceeded my expectations. The instructor explains complex concepts clearly and the practice exercises were very helpful.',
        createdAt: '2023-05-20',
      },
      {
        id: 2,
        courseId: courseId,
        userId: 'user2',
        userName: 'Sarah Thompson',
        userAvatar: 'https://placehold.co/50x50?text=ST',
        rating: 4,
        title: 'Very helpful and well-structured',
        content: 'I really enjoyed this course. The material is well organized and the instructor is knowledgeable. Would recommend to others.',
        createdAt: '2023-05-15',
      },
      {
        id: 3,
        courseId: courseId,
        userId: 'user3',
        userName: 'David Chen',
        userAvatar: 'https://placehold.co/50x50?text=DC',
        rating: 5,
        title: 'Perfect for preparation',
        content: 'This course helped me prepare for my exams. The practice problems were particularly useful. Great instructor!',
        createdAt: '2023-05-10',
      }
    ];
    
    // Apply pagination
    const page = options.page || 1;
    const limit = options.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const paginatedResults = mockReviews.slice(startIndex, endIndex);
    
    return {
      reviews: paginatedResults,
      pagination: {
        total: mockReviews.length,
        page,
        limit,
        totalPages: Math.ceil(mockReviews.length / limit)
      }
    };
  } catch (error) {
    console.error(`Get course reviews error:`, error);
    throw error;
  }
};