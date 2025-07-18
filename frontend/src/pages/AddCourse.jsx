import React, { useState } from 'react';
import { AddCourseRequest } from '../api/courses';
import { useAdmin } from '../hooks/useAdmin';

const AddCourse = () => {
  const { token: adminToken } = useAdmin();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    // subcategory: '',
    slug: '',
    tags: [],
    isFree: true,
    price: '',
    level: 'beginner',
    language: 'english',
    status: 'draft',
    instructor: {
      name: '',
      email: '',
      bio: ''
    },
    coverImage: null
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [tagInput, setTagInput] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleInstructorChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      instructor: {
        ...prev.instructor,
        [name]: value
      }
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

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  // Auto-generate slug when title changes
  React.useEffect(() => {
    if (formData.title) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(formData.title)
      }));
    }
  }, [formData.title]);

  // Clear price when switching to free
  React.useEffect(() => {
    if (formData.isFree) {
      setFormData(prev => ({ ...prev, price: '' }));
    }
  }, [formData.isFree]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!adminToken) {
      setError("Unauthorized: Admin token missing");
      return;
    }

    // Validate price for paid courses
    if (!formData.isFree && (!formData.price || formData.price <= 0)) {
      setError("Please enter a valid price for paid courses");
      return;
    }

    const courseData = new FormData();
    courseData.append('title', formData.title);
    courseData.append('description', formData.description);
    courseData.append('shortDescription', formData.shortDescription);
    // courseData.append('subcategory', formData.subcategory);
    courseData.append('slug', formData.slug);
    courseData.append('tags', JSON.stringify(formData.tags));
    courseData.append('isFree', formData.isFree ? 'true' : 'false');
    if (!formData.isFree) {
      courseData.append('price', formData.price);
    }
    courseData.append('level', formData.level);
    courseData.append('language', formData.language);
    courseData.append('status', formData.status);
    courseData.append('instructor', JSON.stringify(formData.instructor));

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
        shortDescription: '',
        // subcategory: '',
        slug: '',
        tags: [],
        isFree: true,
        price: '',
        level: 'beginner',
        language: 'english',
        status: 'draft',
        instructor: {
          name: '',
          email: '',
          bio: ''
        },
        coverImage: null
      });
      setImagePreview(null);
      setTagInput('');
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
      <div className="max-w-4xl mx-auto">
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
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Course Slug *</label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="course-slug"
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description *</label>
                <textarea
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  rows={2}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-vertical"
                  placeholder="Brief description for course cards"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-vertical"
                  placeholder="Detailed course description"
                />
              </div>

              {/* Subcategory */}
              {/* <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subcategory</label>
                <input
                  type="text"
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Web Development, UI/UX, Data Science"
                />
              </div> */}

              {/* Course Settings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Level *</label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="all">All Levels</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Language *</label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                    <option value="hindi">Hindi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status *</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* Course Type and Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Course Type *</label>
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
                
                {/* Price Input - Only show when Paid is selected */}
                {!formData.isFree && (
                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Price *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500">₹</span>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required={!formData.isFree}
                        min="0"
                        step="0.01"
                        className="w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter a tag and press Enter"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Instructor Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Instructor Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Instructor Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.instructor.name}
                      onChange={handleInstructorChange}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Instructor full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Instructor Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.instructor.email}
                      onChange={handleInstructorChange}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="instructor@example.com"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Instructor Bio</label>
                  <textarea
                    name="bio"
                    value={formData.instructor.bio}
                    onChange={handleInstructorChange}
                    rows={3}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-vertical"
                    placeholder="Brief bio about the instructor"
                  />
                </div>
              </div>

              {/* Cover Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
                {!imagePreview ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <label htmlFor="coverImage" className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium">
                      Click to upload or drag and drop
                    </label>
                    <p className="text-sm text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
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
                      alt="Course cover preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="border-t pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-colors ${
                    loading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding Course...
                    </span>
                  ) : (
                    'Add Course'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;