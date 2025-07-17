import React, { useState, useEffect } from 'react';
import { Play, Clock, Users, Star, BookOpen, Download, Share2, Heart, ChevronDown, ChevronUp, CheckCircle, AlertCircle } from 'lucide-react';

const CourseContentPage = () => {
  const [courseData, setCourseData] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSection, setExpandedSection] = useState(0);
  const [completedVideos, setCompletedVideos] = useState(new Set());

  // Extract courseId from URL
  const courseId = window.location.pathname.split('/course/')[1];

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching course data for courseId:', courseId);
        const response = await fetch(`http://localhost:5000/api/courses/${courseId}/videos`);
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error:', errorText);
          throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data);
        
        // Transform API response to match component structure
        const transformedData = {
          title: data.title || 'Course Title',
          instructor: data.instructor || 'Instructor',
          description: data.description || 'Course description will be available soon.',
          rating: data.rating,
          students: data.students,
          duration: data.duration,
          level: data.level,
          sections: data.videos && data.videos.length > 0 ? [{
            title: 'Course Videos',
            videos: data.videos.map((video, index) => ({
              id: video._id,
              title: video.title,
              duration: video.duration || 'N/A',
              thumbnail: video.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop',
              url: video.url
            }))
          }] : []
        };
        
        setCourseData(transformedData);
        
        // Set first video as selected if videos exist
        if (transformedData.sections && transformedData.sections.length > 0 && transformedData.sections[0].videos && transformedData.sections[0].videos.length > 0) {
          setSelectedVideo(transformedData.sections[0].videos[0]);
        }
        
      } catch (err) {
        console.error('Error fetching course data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseData();
    } else {
      setError('Course ID not found in URL');
      setLoading(false);
    }
  }, [courseId]);

  // Helper function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    
    const regexes = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&\n?#]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/live\/([^&\n?#]+)/,
      /(?:https?:\/\/)?youtu\.be\/([^&\n?#]+)/
    ];
    
    for (const regex of regexes) {
      const match = url.match(regex);
      if (match) return match[1];
    }
    return null;
  };

  // Toggle video completion state
  const toggleVideoComplete = (videoId) => {
    const newCompleted = new Set(completedVideos);
    if (newCompleted.has(videoId)) {
      newCompleted.delete(videoId);
    } else {
      newCompleted.add(videoId);
    }
    setCompletedVideos(newCompleted);
  };

  const totalVideos = courseData?.sections?.reduce((acc, section) => acc + (section.videos?.length || 0), 0) || 0;
  const completedCount = completedVideos.size;
  const progress = totalVideos > 0 ? (completedCount / totalVideos) * 100 : 0;

  const hasVideos = courseData?.sections?.some(section => section.videos && section.videos.length > 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading course content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-white text-xl font-bold mb-2">Error Loading Course</h2>
          <p className="text-purple-200 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:scale-105 transition-transform"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-lg">No course data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{courseData.title || 'Course Title'}</h1>
                <p className="text-purple-200">by {courseData.instructor || 'Instructor'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Heart className="w-5 h-5 text-white" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Share2 className="w-5 h-5 text-white" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Download className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player or Coming Soon */}
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 mb-8">
              {hasVideos && selectedVideo ? (
                <>
                  <div className="aspect-video bg-gray-900 relative">
                    {getYouTubeVideoId(selectedVideo.url) ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(selectedVideo.url)}`}
                        title={selectedVideo.title}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Play className="w-8 h-8 text-white ml-1" />
                          </div>
                          <p className="text-white text-lg mb-2">Video Preview</p>
                          <a 
                            href={selectedVideo.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:scale-105 transition-transform"
                          >
                            Watch Video
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedVideo.title}</h2>
                    <div className="flex items-center space-x-4 text-purple-200">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{selectedVideo.duration}</span>
                      </span>
                      <button 
                        onClick={() => toggleVideoComplete(selectedVideo.id)}
                        className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${
                          completedVideos.has(selectedVideo.id) 
                            ? 'bg-green-500 text-white' 
                            : 'bg-white/10 hover:bg-white/20'
                        }`}
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>{completedVideos.has(selectedVideo.id) ? 'Completed' : 'Mark Complete'}</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="aspect-video bg-gray-900 relative flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Clock className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Coming Soon</h2>
                    <p className="text-purple-200 text-lg max-w-md mx-auto">
                      Course videos are being prepared and will be available soon. Stay tuned!
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Course Info */}
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">About This Course</h3>
              <p className="text-purple-200 mb-6 leading-relaxed">
                {courseData.description || 'Course description will be available soon.'}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{courseData.rating || 'N/A'}</div>
                  <div className="text-purple-200 text-sm">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{courseData.students?.toLocaleString() || 'N/A'}</div>
                  <div className="text-purple-200 text-sm">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{courseData.duration || 'N/A'}</div>
                  <div className="text-purple-200 text-sm">Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{courseData.level || 'N/A'}</div>
                  <div className="text-purple-200 text-sm">Level</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            {hasVideos && (
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Your Progress</h3>
                <div className="mb-2">
                  <div className="flex justify-between text-sm text-purple-200 mb-1">
                    <span>{completedCount} of {totalVideos} completed</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Course Content */}
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white">Course Content</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {courseData.sections && courseData.sections.length > 0 ? (
                  courseData.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="border-b border-white/10 last:border-b-0">
                      <button
                        onClick={() => setExpandedSection(expandedSection === sectionIndex ? -1 : sectionIndex)}
                        className="w-full px-6 py-4 text-left hover:bg-white/5 transition-colors flex items-center justify-between"
                      >
                        <span className="text-white font-medium">{section.title}</span>
                        {expandedSection === sectionIndex ? 
                          <ChevronUp className="w-5 h-5 text-purple-300" /> : 
                          <ChevronDown className="w-5 h-5 text-purple-300" />
                        }
                      </button>
                      {expandedSection === sectionIndex && (
                        <div className="px-6 pb-4 space-y-2">
                          {section.videos && section.videos.length > 0 ? (
                            section.videos.map((video) => (
                              <button
                                key={video.id}
                                onClick={() => setSelectedVideo(video)}
                                className={`w-full p-3 rounded-lg text-left transition-all ${
                                  selectedVideo?.id === video.id 
                                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/50' 
                                    : 'hover:bg-white/5'
                                }`}
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="relative">
                                    <img 
                                      src={video.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop'} 
                                      alt={video.title}
                                      className="w-12 h-8 object-cover rounded"
                                    />
                                    {completedVideos.has(video.id) && (
                                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                        <CheckCircle className="w-3 h-3 text-white" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-white text-sm font-medium">{video.title}</div>
                                    <div className="text-purple-300 text-xs">{video.duration}</div>
                                  </div>
                                </div>
                              </button>
                            ))
                          ) : (
                            <div className="text-center py-6">
                              <Clock className="w-8 h-8 text-purple-300 mx-auto mb-2" />
                              <p className="text-purple-300 text-sm">Videos coming soon</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 text-purple-300 mx-auto mb-4" />
                    <p className="text-purple-300">Course content coming soon</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContentPage;