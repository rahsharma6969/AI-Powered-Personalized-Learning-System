// components/CourseInfo.js
// ========================================
import React from "react";

const CourseInfo = ({ courseData }) => {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <h3 className="text-xl font-bold text-white mb-4">About This Course</h3>
      <p className="text-purple-200 mb-6 leading-relaxed">
        {courseData.description || "Course description will be available soon."}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">
            {courseData.rating || "N/A"}
          </div>
          <div className="text-purple-200 text-sm">Rating</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">
            {courseData.students?.toLocaleString() || "N/A"}
          </div>
          <div className="text-purple-200 text-sm">Students</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">
            {courseData.duration || "N/A"}
          </div>
          <div className="text-purple-200 text-sm">Duration</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">
            {courseData.level || "N/A"}
          </div>
          <div className="text-purple-200 text-sm">Level</div>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;