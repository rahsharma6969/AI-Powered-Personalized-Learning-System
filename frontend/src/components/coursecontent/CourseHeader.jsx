import React from "react";
import { BookOpen, Heart, Share2, Download, CreditCard } from "lucide-react";

const CourseHeader = ({ courseData, paymentInfo, hasAccess, onBuyClick }) => {
  return (
    <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen size={24} className="text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-white">
                  {courseData.title || "Course Title"}
                </h1>
                {!paymentInfo.isFree && (
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                    Premium
                  </span>
                )}
                {paymentInfo.isFree && (
                  <span className="bg-gradient-to-r from-green-400 to-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Free
                  </span>
                )}
              </div>
              <p className="text-purple-200">
                by {courseData.instructor || "Instructor"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {!hasAccess && !paymentInfo.isFree && (
              <button
                onClick={onBuyClick}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform flex items-center space-x-2 font-semibold"
              >
                <CreditCard className="w-5 h-5" />
                <span>Buy Course - ${paymentInfo.price}</span>
              </button>
            )}
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
  );
};

export default CourseHeader;