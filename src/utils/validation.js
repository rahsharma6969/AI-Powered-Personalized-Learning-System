/**
 * Form validation utilities
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  /**
   * Validate password strength
   * @param {string} password - Password to validate
   * @returns {Object} Validation result with strength score and messages
   */
  export const validatePassword = (password) => {
    let strength = 0;
    const messages = [];
    
    // Length check
    if (password.length < 8) {
      messages.push('Password must be at least 8 characters');
    } else {
      strength += 1;
    }
    
    // Uppercase letter check
    if (!/[A-Z]/.test(password)) {
      messages.push('Password must contain at least one uppercase letter');
    } else {
      strength += 1;
    }
    
    // Lowercase letter check
    if (!/[a-z]/.test(password)) {
      messages.push('Password must contain at least one lowercase letter');
    } else {
      strength += 1;
    }
    
    // Number check
    if (!/[0-9]/.test(password)) {
      messages.push('Password must contain at least one number');
    } else {
      strength += 1;
    }
    
    // Special character check
    if (!/[^A-Za-z0-9]/.test(password)) {
      messages.push('Password must contain at least one special character');
    } else {
      strength += 1;
    }
    
    let strengthText = '';
    if (strength === 0) strengthText = 'Very Weak';
    else if (strength === 1) strengthText = 'Weak';
    else if (strength === 2) strengthText = 'Fair';
    else if (strength === 3) strengthText = 'Good';
    else if (strength === 4) strengthText = 'Strong';
    else if (strength === 5) strengthText = 'Very Strong';
    
    return {
      isValid: strength >= 3,
      strength,
      strengthText,
      messages
    };
  };
  
  /**
   * Validate form fields
   * @param {Object} fields - Form fields to validate
   * @param {Object} rules - Validation rules
   * @returns {Object} Validation errors
   */
  export const validateForm = (fields, rules) => {
    const errors = {};
    
    Object.keys(rules).forEach(field => {
      const value = fields[field];
      const fieldRules = rules[field];
      
      // Required check
      if (fieldRules.required && (!value || value.trim() === '')) {
        errors[field] = `${fieldRules.label || field} is required`;
        return;
      }
      
      // Minimum length check
      if (fieldRules.minLength && value.length < fieldRules.minLength) {
        errors[field] = `${fieldRules.label || field} must be at least ${fieldRules.minLength} characters`;
        return;
      }
      
      // Maximum length check
      if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
        errors[field] = `${fieldRules.label || field} must be at most ${fieldRules.maxLength} characters`;
        return;
      }
      
      // Email format check
      if (fieldRules.isEmail && !isValidEmail(value)) {
        errors[field] = `Please enter a valid email address`;
        return;
      }
      
      // Password strength check
      if (fieldRules.isPassword) {
        const passwordValidation = validatePassword(value);
        if (!passwordValidation.isValid) {
          errors[field] = passwordValidation.messages[0];
          return;
        }
      }
      
      // Match check (for password confirmation)
      if (fieldRules.match && value !== fields[fieldRules.match]) {
        errors[field] = `${fieldRules.label || field} does not match ${fieldRules.matchLabel || fieldRules.match}`;
        return;
      }
      
      // Custom validation function
      if (fieldRules.validate && typeof fieldRules.validate === 'function') {
        const customError = fieldRules.validate(value, fields);
        if (customError) {
          errors[field] = customError;
          return;
        }
      }
    });
    
    return errors;
  }; 