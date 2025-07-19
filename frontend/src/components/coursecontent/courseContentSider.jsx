import React from "react";
import { ChevronDown, ChevronUp, Clock, Lock, CheckCircle } from "lucide-react";

const CourseContentSidebar = ({
  courseData,
  paymentInfo,
  hasAccess,
  selectedVideo,
  expandedSection,
  completedVideos,
  onVideoSelect,
  onSectionToggle
}) => {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10">
      <div className="p-6 border-b border-white/10">
        <h3 className="text-lg font-semibold text-white">Course Content</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {courseData.sections && courseData.sections.length > 0 ? (
          courseData.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="border-b border-white/10 last:border-b-0">
              <button
                onClick={() => onSectionToggle(expandedSection === sectionIndex ? -1 : sectionIndex)}
                className="w-full px-6 py-4 text-left hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span className="text-white font-medium">{section.title}</span>
                {expandedSection === sectionIndex ? (
                  <ChevronUp className="w-5 h-5 text-purple-300" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-purple-300" />
                )}
              </button>
              {expandedSection === sectionIndex && (
                <div className="px-6 pb-4 space-y-2">
                  {section.videos && section.videos.length > 0 ? (
                    section.videos.map((video) => (
                      <button
                        key={video.id}
                        onClick={() => hasAccess && onVideoSelect(video)}
                        className={`w-full p-3 rounded-lg text-left transition-all relative ${
                          hasAccess
                            ? selectedVideo?.id === video.id
                              ? "bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/50"
                              : "hover:bg-white/5"
                            : "opacity-60 cursor-not-allowed"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <img
                              src={video.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop"}
                              alt={video.title}
                              className="w-12 h-8 object-cover rounded"
                            />
                            {!hasAccess && !paymentInfo.isFree && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded">
                                <Lock className="w-3 h-3 text-white" />
                              </div>
                            )}
                            {hasAccess && completedVideos.has(video.id) && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="text-white text-sm font-medium flex items-center space-x-2">
                              <span>{video.title}</span>
                              {!hasAccess && !paymentInfo.isFree && (
                                <Lock className="w-3 h-3 text-yellow-400" />
                              )}
                            </div>
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
  );
};

export default CourseContentSidebar;