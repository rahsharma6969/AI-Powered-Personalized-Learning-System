/**
 * Data formatting utilities
 */

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: USD)
 * @param {string} locale - Locale for formatting (default: en-US)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };
  
  /**
   * Format date
   * @param {string|Date} date - Date to format
   * @param {Object} options - Intl.DateTimeFormat options
   * @param {string} locale - Locale for formatting (default: en-US)
   * @returns {string} Formatted date string
   */
  export const formatDate = (date, options = { dateStyle: 'medium' }, locale = 'en-US') => {
    return new Intl.DateTimeFormat(locale, options).format(new Date(date));
  };
  
  /**
   * Format time
   * @param {string|Date} time - Time to format
   * @param {Object} options - Intl.DateTimeFormat options
   * @param {string} locale - Locale for formatting (default: en-US)
   * @returns {string} Formatted time string
   */
  export const formatTime = (time, options = { timeStyle: 'short' }, locale = 'en-US') => {
    return new Intl.DateTimeFormat(locale, options).format(new Date(time));
  };
  
  /**
   * Format date and time
   * @param {string|Date} datetime - Date and time to format
   * @param {Object} options - Intl.DateTimeFormat options
   * @param {string} locale - Locale for formatting (default: en-US)
   * @returns {string} Formatted date and time string
   */
  export const formatDateTime = (datetime, options = { dateStyle: 'medium', timeStyle: 'short' }, locale = 'en-US') => {
    return new Intl.DateTimeFormat(locale, options).format(new Date(datetime));
  };
  
  /**
   * Format number
   * @param {number} number - Number to format
   * @param {Object} options - Intl.NumberFormat options
   * @param {string} locale - Locale for formatting (default: en-US)
   * @returns {string} Formatted number string
   */
  export const formatNumber = (number, options = {}, locale = 'en-US') => {
    return new Intl.NumberFormat(locale, options).format(number);
  };
  
  /**
   * Format percentage
   * @param {number} value - Value to format (0-1)
   * @param {number} decimals - Number of decimal places (default: 1)
   * @param {string} locale - Locale for formatting (default: en-US)
   * @returns {string} Formatted percentage string
   */
  export const formatPercentage = (value, decimals = 1, locale = 'en-US') => {
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  };
  
  /**
   * Format file size
   * @param {number} bytes - Size in bytes
   * @param {number} decimals - Number of decimal places (default: 2)
   * @returns {string} Formatted file size string
   */
  export const formatFileSize = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
  };
  
  /**
   * Format duration in seconds to minutes and seconds
   * @param {number} seconds - Duration in seconds
   * @returns {string} Formatted duration string (MM:SS)
   */
  export const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  /**
   * Format relative time (e.g., "2 hours ago")
   * @param {string|Date} date - Date to format
   * @param {string} locale - Locale for formatting (default: en-US)
   * @returns {string} Formatted relative time string
   */
  export const formatRelativeTime = (date, locale = 'en-US') => {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now - past) / 1000);
    
    // Less than a minute ago
    if (diffInSeconds < 60) {
      return 'Just now';
    }
    
    // Less than an hour ago
    if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    
    // Less than a day ago
    if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
    
    // Less than a week ago
    if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
    
    // Less than a month ago
    if (diffInSeconds < 2592000) {
      const weeks = Math.floor(diffInSeconds / 604800);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    }
    
    // Less than a year ago
    if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    }
    
    // More than a year ago
    const years = Math.floor(diffInSeconds / 31536000);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  };