import React from "react";
import { Play, Clock, CheckCircle, Lock, CreditCard } from "lucide-react";

const VideoPlayer = ({
  selectedVideo,
  hasAccess,
  paymentInfo,
  hasVideos,
  completedVideos,
  onToggleComplete,
  onBuyClick
}) => {
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regexes = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&\n?#]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/live\/([^&\n?#]+)/,
      /(?:https?:\/\/)?youtu\.be\/([^&\n?#]+)/,
    ];
    for (const regex of regexes) {
      const match = url.match(regex);
      if (match) return match[1];
    }
    return null;
  };

  const renderVideoContent = () => {
    if (!hasAccess && !paymentInfo.isFree) {
      return (
        <div className="aspect-video bg-gray-900 relative flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Premium Content</h2>
            <p className="text-purple-200 text-lg max-w-md mx-auto mb-6">
              This course contains premium content. Purchase the course to get full access to all videos and materials.
            </p>
            <button
              onClick={onBuyClick}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg hover:scale-105 transition-transform flex items-center space-x-2 font-semibold mx-auto"
            >
              <CreditCard className="w-5 h-5" />
              <span>Buy Course - ${paymentInfo.price}</span>
            </button>
          </div>
        </div>
      );
    }

    if (hasVideos && selectedVideo) {
      return (
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
              />
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
                onClick={() => onToggleComplete(selectedVideo.id)}
                className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${
                  completedVideos.has(selectedVideo.id)
                    ? "bg-green-500 text-white"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>
                  {completedVideos.has(selectedVideo.id) ? "Completed" : "Mark Complete"}
                </span>
              </button>
            </div>
          </div>
        </>
      );
    }

    return (
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
    );
  };

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 mb-8">
      {renderVideoContent()}
    </div>
  );
};

export default VideoPlayer;