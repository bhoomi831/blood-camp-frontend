import React from 'react';
import './Select.css';

const Select = ({ 
  label, 
  options, 
  value, 
  onChange, 
  disabled = false, 
  placeholder = 'Select an option',
  error = false,
  helperText,
  ...props
}) => {
  return (
    <div className="select-group">
      {label && <label className="select-label">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`form-select${error ? ' is-invalid' : ''}`}
        {...props}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && helperText && <div className="invalid-feedback">{helperText}</div>}
      {!error && helperText && <div className="form-text">{helperText}</div>}
    </div>
  );
};

export default Select;
