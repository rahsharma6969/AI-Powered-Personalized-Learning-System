import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash, FaCheck, FaTimes, FaPhone, FaSchool, FaGraduationCap } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { RegisterRequest } from '../../api/auth'; 
import { useNavigate } from 'react-router-dom';

const SignupForm = ({ onSubmit, className = '' }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    school: '',
    phone: '',
    standard: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Standard options for dropdown
  const standardOptions = [
    '', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
    
    if (!formData.firstName || formData.firstName.trim() === '') {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName || formData.lastName.trim() === '') {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email || formData.email.trim() === '') {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Phone validation (optional but if provided, should be valid)
    if (formData.phone && formData.phone.trim() !== '') {
      const phoneRegex = /^[+]?[\d\s\-()]{10,}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (validate()) {
    try {
      // Debug: Log form data before processing
      console.log('Form data before processing:', formData);
      
      // Ensure firstName and lastName are not empty
      if (!formData.firstName || !formData.lastName) {
        setErrors(prev => ({ ...prev, apiError: 'First name and last name are required' }));
        return;
      }
      
      // Prepare data according to schema - send firstName and lastName separately
      const registrationData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password,
      };

      // Add optional fields only if they have values
      if (formData.school && formData.school.trim() !== '') {
        registrationData.school = formData.school.trim();
      }
      
      if (formData.phone && formData.phone.trim() !== '') {
        registrationData.phone = formData.phone.trim();
      }
      
      if (formData.standard && formData.standard.trim() !== '') {
        registrationData.standard = formData.standard.trim();
      }

      // Debug: Log the data being sent to backend
      console.log('Data being sent to backend:', registrationData);
      console.log('firstName field specifically:', registrationData.firstName);
      console.log('lastName field specifically:', registrationData.lastName);
      
      const result = await RegisterRequest(registrationData);
      console.log('Registration successful:', result);
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error.message);
      setErrors(prev => ({ ...prev, apiError: error.message }));
    }
  }
};
  
  // Password strength indicators
  const getPasswordStrength = (password) => {
    if (!password) return 0;
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    
    // Character variety checks
    if (/[A-Z]/.test(password)) strength += 1; // Has uppercase
    if (/[a-z]/.test(password)) strength += 1; // Has lowercase
    if (/[0-9]/.test(password)) strength += 1; // Has number
    if (/[^A-Za-z0-9]/.test(password)) strength += 1; // Has special char
    
    return strength;
  };
  
  const passwordStrength = getPasswordStrength(formData.password);
  const passwordStrengthText = [
    'Very Weak',
    'Weak',
    'Fair',
    'Good',
    'Strong',
    'Very Strong'
  ][passwordStrength];
  
  const passwordStrengthColors = [
    'bg-red-500',
    'bg-red-500',
    'bg-yellow-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-green-500'
  ];
  
  return (
    <form className={`space-y-6 ${className}`} onSubmit={handleSubmit}>
      {/* API Error Display */}
      {errors.apiError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <FaTimes className="h-5 w-5 text-red-400 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Registration Error</h3>
              <p className="mt-1 text-sm text-red-700">{errors.apiError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First name *
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.firstName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
              } rounded-md shadow-sm placeholder-gray-400 sm:text-sm`}
              placeholder="John"
            />
          </div>
          {errors.firstName && (
            <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last name *
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.lastName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
              } rounded-md shadow-sm placeholder-gray-400 sm:text-sm`}
              placeholder="Doe"
            />
          </div>
          {errors.lastName && (
            <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address *
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaEnvelope className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
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

      {/* School and Phone Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="school" className="block text-sm font-medium text-gray-700">
            School
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSchool className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="school"
              name="school"
              type="text"
              value={formData.school}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
              placeholder="Your School Name"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaPhone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.phone ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
              } rounded-md shadow-sm placeholder-gray-400 sm:text-sm`}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          {errors.phone && (
            <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Standard Field */}
      <div>
        <label htmlFor="standard" className="block text-sm font-medium text-gray-700">
          Standard/Grade
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaGraduationCap className="h-5 w-5 text-gray-400" />
          </div>
          <select
            id="standard"
            name="standard"
            value={formData.standard}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm sm:text-sm"
          >
            <option value="">Select your standard</option>
            {standardOptions.slice(1).map((std) => (
              <option key={std} value={std}>{std}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password *
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaLock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            className={`block w-full pl-10 pr-10 py-2 border ${
              errors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
            } rounded-md shadow-sm placeholder-gray-400 sm:text-sm`}
            placeholder="••••••••"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {errors.password && (
          <p className="mt-2 text-sm text-red-600">{errors.password}</p>
        )}
        
        {formData.password && (
          <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-gray-500">Password strength: {passwordStrengthText}</span>
              <span className="text-xs text-gray-500">{passwordStrength}/5</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(passwordStrength / 5) * 100}%` }}
                transition={{ duration: 0.3 }}
                className={`h-full ${passwordStrengthColors[passwordStrength]}`}
              ></motion.div>
            </div>
            
            {/* Password requirements checklist */}
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                {formData.password.length >= 8 ? (
                  <FaCheck className="text-green-500" />
                ) : (
                  <FaTimes className="text-red-500" />
                )}
                <span className="text-xs text-gray-600">At least 8 characters</span>
              </div>
              <div className="flex items-center space-x-2">
                {/[A-Z]/.test(formData.password) ? (
                  <FaCheck className="text-green-500" />
                ) : (
                  <FaTimes className="text-red-500" />
                )}
                <span className="text-xs text-gray-600">Uppercase letter</span>
              </div>
              <div className="flex items-center space-x-2">
                {/[a-z]/.test(formData.password) ? (
                  <FaCheck className="text-green-500" />
                ) : (
                  <FaTimes className="text-red-500" />
                )}
                <span className="text-xs text-gray-600">Lowercase letter</span>
              </div>
              <div className="flex items-center space-x-2">
                {/[0-9]/.test(formData.password) ? (
                  <FaCheck className="text-green-500" />
                ) : (
                  <FaTimes className="text-red-500" />
                )}
                <span className="text-xs text-gray-600">Number</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password *
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaLock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`block w-full pl-10 pr-10 py-2 border ${
              errors.confirmPassword ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
            } rounded-md shadow-sm placeholder-gray-400 sm:text-sm`}
            placeholder="••••••••"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              {showConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {errors.confirmPassword && (
          <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-center">
        <input
          id="agreeToTerms"
          name="agreeToTerms"
          type="checkbox"
          checked={formData.agreeToTerms}
          onChange={handleChange}
          className={`h-4 w-4 ${
            errors.agreeToTerms ? 'text-red-600 border-red-300 focus:ring-red-500' : 'text-indigo-600 border-gray-300 focus:ring-indigo-500'
          } rounded`}
        />
        <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
          I agree to the{' '}
          <Link to="/terms" className="text-indigo-600 hover:text-indigo-500">
            Terms and Conditions
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-indigo-600 hover:text-indigo-500">
            Privacy Policy
          </Link>
        </label>
      </div>
      {errors.agreeToTerms && (
        <p className="mt-2 text-sm text-red-600">{errors.agreeToTerms}</p>
      )}

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign up
        </button>
      </div>
      
      <div className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
          Sign in
        </Link>
      </div>
    </form>
  );
};

export default SignupForm;