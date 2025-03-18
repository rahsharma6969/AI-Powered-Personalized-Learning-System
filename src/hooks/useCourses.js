import { useState, useEffect } from 'react';

/**
 * Custom hook for fetching and managing courses
 * 
 * @param {Object} options - Hook options
 * @param {string} options.category - Filter courses by category
 * @param {string} options.search - Search term for filtering courses
 * @param {string} options.sort - Sort option (popular, highestRated, newest, etc.)
 * @returns {Object} Courses data and methods
 */
const useCourses = (options = {}) => {
  const { category, search, sort = 'popular' } = options;
  
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch courses on component mount
  useEffect(() => {
    fetchCourses();
  }, []);
  
  // Filter and sort courses when dependencies change
  useEffect(() => {
    if (courses.length > 0) {
      filterAndSortCourses();
    }
  }, [courses, category, search, sort]);
  
  // Fetch all courses (mock implementation)
  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, you would make an API call to fetch courses
      // For demo purposes, we're using mock data
      
      // Simulate API delay
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
      
      setCourses(mockCourses);
      setFilteredCourses(mockCourses);
    } catch (error) {
      setError(error.message || 'Failed to fetch courses');
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Filter and sort courses
  const filterAndSortCourses = () => {
    let filtered = [...courses];
    
    // Filter by category
    if (category && category !== 'all') {
      filtered = filtered.filter(course => course.category === category);
    }
    
    // Filter by search term
    if (search) {
      const searchTerm = search.toLowerCase();
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchTerm) ||
        course.description.toLowerCase().includes(searchTerm) ||
        course.category.toLowerCase().includes(searchTerm) ||
        course.instructor.toLowerCase().includes(searchTerm)
      );
    }
    
    // Sort based on option
    switch (sort) {
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
          const priceA = a.discountPrice ?? a.price;
          const priceB = b.discountPrice ?? b.price;
          return priceA - priceB;
        });
        break;
      case 'priceHighToLow':
        filtered.sort((a, b) => {
          const priceA = a.discountPrice ?? a.price;
          const priceB = b.discountPrice ?? b.price;
          return priceB - priceA;
        });
        break;
      default:
        break;
    }
    
    setFilteredCourses(filtered);
  };
  
  // Get a single course by ID
  const getCourseById = (courseId) => {
    return courses.find(course => course.id === courseId) || null;
  };
  
  return {
    courses: filteredCourses,
    loading,
    error,
    getCourseById,
    refetch: fetchCourses
  };
};

export default useCourses;