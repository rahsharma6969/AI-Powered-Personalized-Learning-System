import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import CourseDetails from '../components/courses/CourseDetails';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CourseDetailPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Simulate API call to fetch course details
    setIsLoading(true);
    
    setTimeout(() => {
      try {
        // Mock course data - in a real app, this would come from an API
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
            lastUpdated: 'March 2025',
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
          // Additional mock courses would be here
        };
        
        // Get course data based on id
        const courseData = mockCourses[id];
        
        if (!courseData) {
          throw new Error('Course not found');
        }
        
        setCourse(courseData);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }, 1000);
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" fullScreen={true} />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <svg 
              className="mx-auto h-16 w-16 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Course Not Found</h2>
            <p className="mt-2 text-gray-600">
              {error || "Sorry, we couldn't find the course you're looking for."}
            </p>
            <div className="mt-6">
              <a 
                href="/courses" 
                className="btn btn-primary"
              >
                Return to Course Catalog
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main>
        <CourseDetails course={course} />
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDetailPage;