import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaBookmark, FaRegBookmark, FaPlay, FaCheck, FaLock } from 'react-icons/fa';

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('content');
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Simulate fetching course data
    setTimeout(() => {
      // This would be an API call in a real app
      const mockCourse = {
        id: parseInt(courseId),
        title: getCourseTitle(parseInt(courseId)),
        description: "Comprehensive course designed for students to master key concepts with interactive lessons and practice problems.",
        thumbnail: `https://placehold.co/1200x600/${getCourseColor(parseInt(courseId))}/white?text=${getCoursePlaceholder(parseInt(courseId))}`,
        category: getCourseCategory(parseInt(courseId)),
        level: parseInt(courseId) % 2 === 0 ? 'Advanced' : 'Intermediate',
        rating: 4.7 + Math.random() * 0.2,
        reviewsCount: 150 + Math.floor(Math.random() * 150),
        studentsCount: 5000 + Math.floor(Math.random() * 10000),
        instructor: getInstructor(parseInt(courseId)),
        grade: parseInt(courseId) % 2 === 0 ? '12th' : '11th',
        duration: `${7 + Math.floor(Math.random() * 5)}h ${Math.floor(Math.random() * 60)}m`,
        lastUpdated: "April 2025",
        // Course curriculum
        modules: [
          {
            id: 1,
            title: "Introduction and Fundamentals",
            lessons: [
              { id: 1, title: "Course Overview", duration: "8:20", isCompleted: true, isLocked: false },
              { id: 2, title: "Basic Concepts", duration: "15:45", isCompleted: true, isLocked: false },
              { id: 3, title: "Problem-Solving Approach", duration: "12:10", isCompleted: false, isLocked: false }
            ]
          },
          {
            id: 2,
            title: "Core Concepts",
            lessons: [
              { id: 4, title: "Key Formulas and Applications", duration: "18:30", isCompleted: false, isLocked: false },
              { id: 5, title: "Practical Examples", duration: "21:15", isCompleted: false, isLocked: false },
              { id: 6, title: "Common Mistakes to Avoid", duration: "14:50", isCompleted: false, isLocked: false }
            ]
          },
          {
            id: 3,
            title: "Advanced Topics",
            lessons: [
              { id: 7, title: "Advanced Problem Solving", duration: "25:10", isCompleted: false, isLocked: true },
              { id: 8, title: "Exam Strategies", duration: "16:40", isCompleted: false, isLocked: true },
              { id: 9, title: "Final Review and Practice", duration: "30:15", isCompleted: false, isLocked: true }
            ]
          }
        ],
        // Learning objectives
        objectives: [
          "Master fundamental principles and concepts",
          "Develop problem-solving skills with practical examples",
          "Learn effective exam strategies and techniques",
          "Apply concepts to real-world situations",
          "Build a solid foundation for advanced studies"
        ]
      };

      setCourse(mockCourse);
      setCurrentVideo({
        id: 1,
        title: "Course Overview",
        description: "An introduction to the course structure, learning objectives, and what to expect.",
        module: "Introduction and Fundamentals"
      });
      setLoading(false);
    }, 1000);
  }, [courseId]);

  // Helper functions to generate course data based on ID
  function getCourseCategory(id) {
    const categories = ["Mathematics", "Physics", "Chemistry"];
    return categories[(id - 1) % 3];
  }

  function getCourseTitle(id) {
    const grade = id % 2 === 0 ? '12th' : '11th';
    const category = getCourseCategory(id);
    
    if (category === "Mathematics") {
      return `${grade} Grade Mathematics: ${id % 2 === 0 ? 'Advanced Calculus & Statistics' : 'Algebra & Calculus Foundations'}`;
    } else if (category === "Physics") {
      return `${grade} Grade Physics: ${id % 2 === 0 ? 'Electromagnetism & Modern Physics' : 'Mechanics & Thermodynamics'}`;
    } else {
      return `${grade} Grade Chemistry: ${id % 2 === 0 ? 'Physical Chemistry & Equilibrium' : 'Organic Chemistry Fundamentals'}`;
    }
  }

  function getCourseColor(id) {
    const category = getCourseCategory(id);
    if (category === "Mathematics") return "indigo";
    if (category === "Physics") return "orange";
    return "green"; // Chemistry
  }

  function getCoursePlaceholder(id) {
    const category = getCourseCategory(id);
    const grade = id % 2 === 0 ? '12' : '11';
    return `${category}+${grade}`;
  }

  function getInstructor(id) {
    const instructors = [
      "Dr. Jane Smith", 
      "Prof. David Wilson", 
      "Dr. Robert Johnson", 
      "Dr. Alan Richards",
      "Dr. Emily Chang",
      "Prof. Sarah Williams"
    ];
    return instructors[(id - 1) % instructors.length];
  }

  const handleLessonClick = (lesson) => {
    if (!lesson.isLocked) {
      setCurrentVideo({
        id: lesson.id,
        title: lesson.title,
        description: `Detailed lesson on ${lesson.title.toLowerCase()} with examples and practice problems.`,
        module: course.modules.find(m => m.lessons.some(l => l.id === lesson.id)).title
      });
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top navigation bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/courses" className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors">
            <FaArrowLeft className="mr-2" />
            <span>Back to Courses</span>
          </Link>
          <button 
            onClick={toggleBookmark}
            className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors"
          >
            {isBookmarked ? <FaBookmark className="mr-1" /> : <FaRegBookmark className="mr-1" />}
            <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>
        </div>
      </div>

      {/* Video player section */}
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg overflow-hidden relative">
            {/* Video placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <FaPlay className="text-4xl mb-4" />
              <h3 className="text-xl font-medium">{currentVideo?.title}</h3>
              <p className="text-gray-400 mt-2">{currentVideo?.module}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course details section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <div className="flex items-center text-sm text-gray-600 mb-4">
                <span className="mr-4">{course.category}</span>
                <span className="mr-4">{course.level}</span>
                <span>{course.grade} Grade</span>
              </div>
              <p className="text-gray-700 mb-6">{course.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="bg-indigo-50 rounded-lg p-3 flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="font-medium text-gray-900">{course.rating.toFixed(1)}</span>
                  <span className="text-gray-500 text-sm ml-1">({course.reviewsCount} reviews)</span>
                </div>
                <div className="bg-indigo-50 rounded-lg p-3">
                  <span className="font-medium text-gray-900">{course.studentsCount.toLocaleString()}</span>
                  <span className="text-gray-500 text-sm ml-1">students</span>
                </div>
                <div className="bg-indigo-50 rounded-lg p-3">
                  <span className="font-medium text-gray-900">Last updated: </span>
                  <span className="text-gray-500 text-sm">{course.lastUpdated}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-semibold mb-4">About this course</h2>
                <p className="text-gray-700 mb-4">
                  This comprehensive {course.category.toLowerCase()} course is designed specifically for {course.grade} grade students. 
                  With {course.duration} of content, you'll master key concepts through interactive lessons, 
                  practical examples, and guided practice problems.
                </p>
                
                <h3 className="font-semibold text-gray-900 mt-6 mb-3">What you'll learn</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                  {course.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 mt-1 text-indigo-600">✓</span>
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tabs for course content */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab('content')}
                    className={`px-6 py-4 text-sm font-medium ${activeTab === 'content' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Course Content
                  </button>
                  <button
                    onClick={() => setActiveTab('instructor')}
                    className={`px-6 py-4 text-sm font-medium ${activeTab === 'instructor' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Instructor
                  </button>
                </nav>
              </div>
              
              <div className="p-6">
                {activeTab === 'content' && (
                  <div>
                    <div className="mb-4 flex justify-between items-center">
                      <h2 className="text-lg font-semibold">Course Curriculum</h2>
                      <span className="text-sm text-gray-600">Total: {course.duration}</span>
                    </div>
                    
                    {course.modules.map(module => (
                      <div key={module.id} className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 p-4">
                          <h3 className="font-medium text-gray-900">{module.title}</h3>
                        </div>
                        <div className="divide-y divide-gray-200">
                          {module.lessons.map(lesson => (
                            <div 
                              key={lesson.id} 
                              className={`p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer ${currentVideo?.id === lesson.id ? 'bg-indigo-50' : ''}`}
                              onClick={() => handleLessonClick(lesson)}
                            >
                              <div className="flex items-center">
                                {lesson.isLocked ? (
                                  <FaLock className="text-gray-400 mr-3" />
                                ) : lesson.isCompleted ? (
                                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3">
                                    <FaCheck className="text-white text-xs" />
                                  </div>
                                ) : (
                                  <FaPlay className="text-indigo-600 mr-3" />
                                )}
                                <span className={lesson.isLocked ? 'text-gray-400' : 'text-gray-700'}>{lesson.title}</span>
                              </div>
                              <span className="text-sm text-gray-500">{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {activeTab === 'instructor' && (
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-bold text-xl mr-4">
                        {course.instructor.split(' ').map(name => name[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{course.instructor}</h3>
                        <p className="text-gray-600">{course.category} Instructor</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      {course.instructor} is an experienced educator specializing in {course.category.toLowerCase()}
                      education for high school students. With years of teaching experience, they have helped
                      thousands of students master complex concepts and excel in their exams.
                    </p>
                    <p className="text-gray-700">
                      Their teaching approach focuses on building a strong conceptual foundation through
                      clear explanations, visual demonstrations, and practical problem-solving techniques
                      that help students develop confidence and competence in {course.category.toLowerCase()}.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Course Progress</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">2 of 9 lessons completed (10%)</p>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Course Information</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{course.category}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Level:</span>
                    <span className="font-medium">{course.level}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{course.duration}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Students:</span>
                    <span className="font-medium">{course.studentsCount.toLocaleString()}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Grade:</span>
                    <span className="font-medium">{course.grade}</span>
                  </li>
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Share Course</h3>
                <div className="flex space-x-2">
                  <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.593 7.203a2.506 2.506 0 00-1.762-1.766c-1.566-.43-7.83-.437-7.83-.437s-6.265-.007-7.832.404a2.56 2.56 0 00-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.51 2.51 0 001.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831z" />
                      <path fill="#fff" d="M9.996 15.005l5.554-3.006-5.554-3.005v6.011z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300">
                  Continue Learning
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;