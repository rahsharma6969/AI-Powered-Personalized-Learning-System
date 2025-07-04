import React from 'react';

export const SurveyField = ({ question, value, onChange }) => {
  const { key, label, type, options, placeholder, rows } = question;

  const handleChange = (e) => {
    onChange(key, e.target.value);
  };

  const baseInputClasses = "mt-1 w-full border p-2 rounded";

  switch (type) {
    case 'select':
      return (
        <label className="block">
          <span className="text-sm font-medium">{label}</span>
          <select
            name={key}
            value={value}
            onChange={handleChange}
            className={baseInputClasses}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      );

    case 'number':
      return (
        <label className="block">
          <span className="text-sm font-medium">{label}</span>
          <input
            type="number"
            name={key}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            className={baseInputClasses}
          />
        </label>
      );

    case 'textarea':
      return (
        <label className="block">
          <span className="text-sm font-medium">{label}</span>
          <textarea
            name={key}
            rows={rows}
            value={value}
            onChange={handleChange}
            className={baseInputClasses}
          />
        </label>
      );

    default:
      return (
        <label className="block">
          <span className="text-sm font-medium">{label}</span>
          <input
            type="text"
            name={key}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            className={baseInputClasses}
          />
        </label>
      );
  }
};