import React, { useState } from 'react';
import { AddCourseRequest } from '../api/courseRequests';  // Import your API function

export const AddCourse = ({ adminToken }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = {
      title,
      description,
      duration,
    };

    setLoading(true);  // Start loading
    setError('');      // Reset any previous error
    setSuccess(false); // Reset success state

    try {
      // Make API call to add the course
      const response = await AddCourseRequest(courseData, adminToken);
      setSuccess(true);
      console.log('Course added successfully:', response);
    } catch (err) {
      setError(err.message || 'Failed to add course');
      console.error('Error adding course:', err);
    } finally {
      setLoading(false);  // Stop loading after the API call completes
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Add Course</h2>
        
        {/* Show success or error messages */}
        {success && (
          <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
            Course added successfully!
          </div>
        )}
        {error && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Course Title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Course Description"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Duration (in hours)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Duration"
              required
            />
          </div>
          
          <button
            type="submit"
            className={`w-full py-2 rounded ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            } text-white`}
            disabled={loading}
          >
            {loading ? 'Adding Course...' : 'Add Course'}
          </button>
        </form>
      </div>
    </div>
  );
};