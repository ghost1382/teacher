import React from 'react';

export default function Select({ id, name, value, options, handleChange }) {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={handleChange}
      className="form-select block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
