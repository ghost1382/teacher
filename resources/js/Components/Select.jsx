import React from "react";

const Select = ({ options, ...rest }) => {
  return (
    <select {...rest}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
