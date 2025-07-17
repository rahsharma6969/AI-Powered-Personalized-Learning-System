import React, { useState } from 'react';
import { Play, Clock, CheckCircle, Lock, BookOpen, Users, Star } from 'lucide-react';

const CourseVideosPage = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  // Sample course data based on your structure
  const courseData = {
    id: '68668ac386f63fa2220df899',
    title: 'Maths',
    description: 'Learn Co-ordinate Geometry from basics to advance',
    isFree: true,
    coverImage: '/uploads/course-1751550659067.jpg',
    videos: [
      {
        id: '686e1b8e7cbf5bf14dbce23c',
        title: 'Introduction to Coordinate Geometry',
        duration: '15:32',
        isCompleted: false,
        isLocked: false,
        thumbnail: '/uploads/video-thumb-1.jpg'
      },
      {
        id: '686e1c9fdb2fa950e9cf7a76',
        title: 'Plotting Points on Cartesian Plane',
        duration: '22:18',
        isCompleted: false,
        isLocked: false,
        thumbnail: '/uploads/video-thumb-2.jpg'
      },
      {
        id: '686e1cc2db2fa950e9cf7a7b',
        title: 'Distance Formula and Applications',
        duration: '18:45',
        isCompleted: false,
        isLocked: !true, // Locked for non-free users
        thumbnail: '/uploads/video-thumb-3.jpg'
      }
    ],
    instructor: 'Dr. Sarah Johnson',
    totalDuration: '3h 45m',
    totalLessons: 3,
    rating: 4.8,
    studentsEnrolled: 1250
  };

  const handleVideoClick = (video) => {
    if (!video.isLocked) {
      setActiveVideo(video);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">Learning Platform</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Welcome back, Student!</span>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">S</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <div className="relative h-full flex items-center">
              <div className="px-8">
                <div className="flex items-center space-x-2 mb-4">
                  {courseData.isFree && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      FREE
                    </span>
                  )}
                  <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
                    Mathematics
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">{courseData.title}</h1>
                <p className="text-xl text-gray-100 mb-6 max-w-2xl">
                  {courseData.description}
                </p>
                <div className="flex items-center space-x-6 text-white">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>{courseData.totalDuration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Play className="h-5 w-5" />
                    <span>{courseData.totalLessons} lessons</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>{courseData.studentsEnrolled.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 fill-current" />
                    <span>{courseData.rating}/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-900">Course Content</h2>
                <p className="text-gray-600 mt-1">
                  {courseData.totalLessons} lessons • {courseData.totalDuration} total length
                </p>
              </div>
              
              <div className="divide-y divide-gray-200">
                {courseData.videos.map((video, index) => (
                  <div
                    key={video.id}
                    className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
                      video.isLocked ? 'opacity-60' : ''
                    }`}
                    onClick={() => handleVideoClick(video)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center relative overflow-hidden">
                          {video.isLocked ? (
                            <Lock className="h-6 w-6 text-white" />
                          ) : (
                            <Play className="h-6 w-6 text-white" />
                          )}
                          <span className="absolute top-1 left-1 text-xs text-white font-medium">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          {video.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{video.duration}</span>
                          </div>
                          {video.isCompleted && (
                            <div className="flex items-center space-x-1 text-green-600">
                              <CheckCircle className="h-4 w-4" />
                              <span>Completed</span>
                            </div>
                          )}
                          {video.isLocked && (
                            <div className="flex items-center space-x-1 text-orange-600">
                              <Lock className="h-4 w-4" />
                              <span>Premium Content</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Course Info Sidebar */}
          <div className="space-y-6">
            {/* Instructor Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Instructor</h3>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">DJ</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{courseData.instructor}</p>
                  <p className="text-sm text-gray-500">Mathematics Professor</p>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Completion</span>
                    <span className="font-medium">0%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>0 of {courseData.totalLessons} lessons completed</p>
                </div>
              </div>
            </div>

            {/* Course Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Duration</span>
                  <span className="font-medium">{courseData.totalDuration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lessons</span>
                  <span className="font-medium">{courseData.totalLessons}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Students</span>
                  <span className="font-medium">{courseData.studentsEnrolled.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating</span>
                  <span className="font-medium">{courseData.rating}/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Player Modal (placeholder) */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">{activeVideo.title}</h3>
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Video Player Would Load Here</p>
                  <p className="text-sm opacity-75">Duration: {activeVideo.duration}</p>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => setActiveVideo(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Close
                </button>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Mark as Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseVideosPage;