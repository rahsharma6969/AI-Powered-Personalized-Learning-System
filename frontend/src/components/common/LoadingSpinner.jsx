import React from 'react';

const LoadingSpinner = ({ size = 'md', color = 'indigo', fullScreen = false }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
    xl: 'w-24 h-24 border-4',
  };
  
  const colorClasses = {
    indigo: 'border-indigo-200 border-t-indigo-600',
    blue: 'border-blue-200 border-t-blue-600',
    green: 'border-green-200 border-t-green-600',
    red: 'border-red-200 border-t-red-600',
    yellow: 'border-yellow-200 border-t-yellow-600',
    purple: 'border-purple-200 border-t-purple-600',
    gray: 'border-gray-200 border-t-gray-600',
  };
  
  const spinnerClasses = `
    ${sizeClasses[size] || sizeClasses.md}
    ${colorClasses[color] || colorClasses.indigo}
    animate-spin rounded-full border-solid
  `;
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className={spinnerClasses}></div>
      </div>
    );
  }
  
  return <div className={spinnerClasses}></div>;
};

export default LoadingSpinner;