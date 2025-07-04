import React, { useState } from 'react';
import { AddCourseRequest } from '../api/courses';
import { useAdmin } from '../hooks/useAdmin';

const AddCourse = () => {
  const { token: adminToken } = useAdmin();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    isFree: true,
    coverImage: null
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, coverImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, coverImage: null }));
    setImagePreview(null);
    const fileInput = document.getElementById('coverImage');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!adminToken) {
      setError("Unauthorized: Admin token missing");
      return;
    }

    const courseData = new FormData();
    courseData.append('title', formData.title);
    courseData.append('description', formData.description);
    courseData.append('duration', formData.duration);
    courseData.append('isFree', formData.isFree ? 'true' : 'false');

    if (formData.coverImage) {
      courseData.append('coverImage', formData.coverImage);
    }

    // Debug: Show what is being sent
    for (let [key, value] of courseData.entries()) {
      console.log(`${key}:`, value);
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await AddCourseRequest(courseData, adminToken);
      setSuccess(true);
      console.log('✅ Course added successfully:', response);
      setFormData({
        title: '',
        description: '',
        duration: '',
        isFree: true,
        coverImage: null
      });
      setImagePreview(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to add course');
      console.error('❌ Error adding course:', err);
    } finally {
      setLoading(false);
    }
  };

  // 🚨 If admin is not logged in, show unauthorized message
  if (!adminToken) {
    return (
      <div className="text-center text-red-600 mt-10 font-semibold">
        Unauthorized. Please log in as an admin.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13M12 6.253C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13M12 6.253C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13" />
              </svg>
              Add New Course
            </h2>
            <p className="text-blue-100 mt-2">Create a new course for your students</p>
          </div>

          <div className="p-8">
            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <span className="text-green-800 font-medium">✅ Course added successfully!</span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <span className="text-red-800">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Course Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter course title"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Course Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-vertical"
                  placeholder="Describe the course"
                />
              </div>

              {/* Duration and Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Duration (hours) *</label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Course Type</label>
                  <div className="flex gap-6 mt-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="isFree"
                        checked={formData.isFree}
                        onChange={() => setFormData(prev => ({ ...prev, isFree: true }))}
                        className="mr-2"
                      />
                      Free
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="isFree"
                        checked={!formData.isFree}
                        onChange={() => setFormData(prev => ({ ...prev, isFree: false }))}
                        className="mr-2"
                      />
                      Paid
                    </label>
                  </div>
                </div>
              </div>

              {/* Cover Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
                {!imagePreview ? (
                  <div className="border-2 border-dashed p-6 text-center">
                    <label htmlFor="coverImage" className="cursor-pointer text-blue-600 underline">
                      Upload Image
                    </label>
                    <input
                      id="coverImage"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white ${
                  loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? 'Adding Course...' : 'Add Course'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
