import React from 'react';

const CoursesTab = ({ popularCourses }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {popularCourses.map((course, index) => (
        <div
          key={course._id}
          className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
        >
          <div className="flex items-start space-x-3 mb-4">
            <img 
              src={course.coverImage ? `http://localhost:5000${course.coverImage}` : '/default-course.jpg'}
              alt={course.title}
              className="w-12 h-12 rounded-lg object-cover"
              onError={(e) => {e.target.src = '/default-course.jpg'}}
            />
            <div>
              <h4 className="font-semibold text-lg">{course.title}</h4>
              <p className="text-sm text-gray-600">{course.instructor.name}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Enrollments:</span>
              <span className="font-medium">{course.enrollmentCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Views:</span>
              <span className="font-medium">{course.viewCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Rating:</span>
              <span className="font-medium">{course.rating}/5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Reviews:</span>
              <span className="font-medium">{course.reviewCount}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ 
                  width: `${(course.enrollmentCount / Math.max(...popularCourses.map(c => c.enrollmentCount))) * 100}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoursesTab;