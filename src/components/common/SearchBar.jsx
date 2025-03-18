import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ 
  placeholder = 'Search...',
  onSearch,
  className = '',
  size = 'md',
  ...props 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };
  
  const sizeClasses = {
    sm: 'py-1.5 pl-8 text-sm',
    md: 'py-2 pl-10',
    lg: 'py-3 pl-12 text-lg',
  };
  
  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <FaSearch className="text-gray-400" />
      </div>
      <input
        type="search"
        className={`w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block ${sizeClasses[size] || sizeClasses.md} pr-3`}
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        {...props}
      />
    </form>
  );
};

export default SearchBar;