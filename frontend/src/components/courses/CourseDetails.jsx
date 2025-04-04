import React, { useState } from 'react';
import { FaFilter, FaTimes, FaChevronDown } from 'react-icons/fa';

const CourseFilter = ({ 
  filters,
  onApplyFilters,
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    levels: [],
    price: null,
    rating: null,
    duration: null,
  });
  
  // Filter groups with options
  const filterGroups = [
    {
      name: 'Category',
      field: 'categories',
      options: filters?.categories || [
        { value: 'mathematics', label: 'Mathematics' },
        { value: 'physics', label: 'Physics' },
        { value: 'chemistry', label: 'Chemistry' },
        { value: 'biology', label: 'Biology' },
        { value: 'computer-science', label: 'Computer Science' },
        { value: 'languages', label: 'Languages' },
      ],
      type: 'checkbox',
    },
    {
      name: 'Level',
      field: 'levels',
      options: filters?.levels || [
        { value: 'beginner', label: 'Beginner' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'advanced', label: 'Advanced' },
      ],
      type: 'checkbox',
    },
    {
      name: 'Price',
      field: 'price',
      options: filters?.prices || [
        { value: 'free', label: 'Free' },
        { value: 'paid', label: 'Paid' },
        { value: 'all', label: 'All' },
      ],
      type: 'radio',
    },
    {
      name: 'Rating',
      field: 'rating',
      options: filters?.ratings || [
        { value: '4+', label: '4.0 & up' },
        { value: '3+', label: '3.0 & up' },
        { value: '2+', label: '2.0 & up' },
      ],
      type: 'radio',
    },
    {
      name: 'Duration',
      field: 'duration',
      options: filters?.durations || [
        { value: 'short', label: 'Under 3 hours' },
        { value: 'medium', label: '3-10 hours' },
        { value: 'long', label: 'Over 10 hours' },
      ],
      type: 'radio',
    },
  ];
  
  const handleFilterChange = (field, value, type) => {
    setActiveFilters(prev => {
      if (type === 'checkbox') {
        // For checkboxes, we toggle the value in an array
        const valueArray = prev[field] || [];
        if (valueArray.includes(value)) {
          return {
            ...prev,
            [field]: valueArray.filter(item => item !== value)
          };
        } else {
          return {
            ...prev,
            [field]: [...valueArray, value]
          };
        }
      } else {
        // For radio buttons, we directly set the value
        return {
          ...prev,
          [field]: value === prev[field] ? null : value
        };
      }
    });
  };
  
  const handleApplyFilters = () => {
    if (onApplyFilters) {
      onApplyFilters(activeFilters);
    }
    setIsOpen(false);
  };
  
  const handleResetFilters = () => {
    setActiveFilters({
      categories: [],
      levels: [],
      price: null,
      rating: null,
      duration: null,
    });
  };
  
  const getActiveFilterCount = () => {
    let count = 0;
    count += activeFilters.categories.length;
    count += activeFilters.levels.length;
    count += activeFilters.price ? 1 : 0;
    count += activeFilters.rating ? 1 : 0;
    count += activeFilters.duration ? 1 : 0;
    return count;
  };
  
  const activeFilterCount = getActiveFilterCount();
  
  return (
    <div className={`relative ${className}`}>
      <button
        className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors bg-white border border-gray-300 rounded-lg px-4 py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaFilter className="mr-2" />
        <span>Filters</span>
        {activeFilterCount > 0 && (
          <span className="ml-2 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
        <FaChevronDown className="ml-2" size={12} />
      </button>
      
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-lg w-72 md:w-96 z-20 border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-800">Filter Courses</h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
          </div>
          
          <div className="p-4 max-h-96 overflow-y-auto">
            {filterGroups.map((group, index) => (
              <div 
                key={group.field} 
                className={index < filterGroups.length - 1 ? 'mb-4 pb-4 border-b border-gray-200' : ''}
              >
                <h4 className="font-medium text-gray-700 mb-2">{group.name}</h4>
                <div className="space-y-2">
                  {group.options.map(option => (
                    <div key={option.value} className="flex items-center">
                      <input
                        type={group.type}
                        id={`${group.field}-${option.value}`}
                        name={group.field}
                        value={option.value}
                        checked={
                          group.type === 'checkbox'
                            ? activeFilters[group.field]?.includes(option.value)
                            : activeFilters[group.field] === option.value
                        }
                        onChange={() => handleFilterChange(group.field, option.value, group.type)}
                        className={`${
                          group.type === 'checkbox' 
                            ? 'text-indigo-600 border-gray-300 rounded focus:ring-indigo-500' 
                            : 'text-indigo-600 border-gray-300 focus:ring-indigo-500'
                        }`}
                      />
                      <label 
                        htmlFor={`${group.field}-${option.value}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-gray-200 flex justify-between">
            <button
              className="text-gray-600 hover:text-indigo-600 text-sm"
              onClick={handleResetFilters}
            >
              Reset filters
            </button>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
              onClick={handleApplyFilters}
            >
              Apply filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseFilter;