import React from 'react';

const Card = ({ 
  children, 
  title, 
  subtitle,
  className = '',
  footer,
  hoverable = false,
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-xl shadow-sm overflow-hidden';
  const hoverClasses = hoverable ? 'transition-shadow hover:shadow-md' : '';
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`} {...props}>
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-100">
          {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
        </div>
      )}
      
      <div className="p-6">
        {children}
      </div>
      
      {footer && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;