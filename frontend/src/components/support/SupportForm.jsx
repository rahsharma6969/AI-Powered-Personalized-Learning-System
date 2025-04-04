import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaQuestionCircle, FaSpinner } from 'react-icons/fa';

const SupportForm = ({ onSubmit, className = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'courses', label: 'Courses & Content' },
    { value: 'assessment', label: 'Assessment Help' },
    { value: 'feedback', label: 'Feedback & Suggestions' }
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (onSubmit) {
          onSubmit(formData);
        }
        
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form after submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          category: 'general',
          message: ''
        });
      } catch (error) {
        setIsSubmitting(false);
        setErrors(prev => ({
          ...prev,
          form: 'Failed to submit the form. Please try again.'
        }));
      }
    }
  };
  
  if (isSubmitted) {
    return (
      <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
        <div className="text-center py-10">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="mt-3 text-lg font-medium text-gray-900">Message Sent Successfully!</h3>
          <p className="mt-2 text-sm text-gray-500">
            Thank you for reaching out. Our support team will get back to you within 24 hours.
          </p>
          <div className="mt-5">
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Support</h2>
      
      {errors.form && (
        <div className="mb-4 p-4 bg-red-50 rounded-md border border-red-200">
          <p className="text-sm text-red-600">{errors.form}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 border ${
                  errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                } rounded-md shadow-sm placeholder-gray-400 sm:text-sm`}
                placeholder="John Doe"
              />
            </div>
            {errors.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 border ${
                  errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                } rounded-md shadow-sm placeholder-gray-400 sm:text-sm`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaQuestionCircle className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 border ${
                  errors.subject ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                } rounded-md shadow-sm placeholder-gray-400 sm:text-sm`}
                placeholder="Brief description of your issue"
              />
            </div>
            {errors.subject && (
              <p className="mt-2 text-sm text-red-600">{errors.subject}</p>
            )}
          </div>
        </div>
        
        <div className="mt-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <div className="mt-1">
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className={`block w-full border ${
                errors.message ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
              } rounded-md shadow-sm placeholder-gray-400 sm:text-sm`}
              placeholder="Please describe your issue in detail"
            ></textarea>
          </div>
          {errors.message && (
            <p className="mt-2 text-sm text-red-600">{errors.message}</p>
          )}
        </div>
        
        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SupportForm;