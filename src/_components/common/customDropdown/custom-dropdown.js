import React from 'react';

const CustomDropdown = ({ options, onChange }) => {
  return (
    <div className="custom-dropdown">
      <select onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option.value} className="custom-option">
            <img src={option.flag} alt={option.label} />
            {option.code?.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomDropdown;
