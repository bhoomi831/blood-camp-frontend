import React from 'react';
import './Input.css';

const Input = ({ 
  type = 'text', 
  label, 
  placeholder = '', 
  value, 
  onChange, 
  disabled = false, 
  error = false,
  helperText,
  ...props
}) => {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`form-control${error ? ' is-invalid' : ''}`}
        {...props}
      />
      {error && helperText && <div className="invalid-feedback">{helperText}</div>}
      {!error && helperText && <div className="form-text">{helperText}</div>}
    </div>
  );
};

export default Input;
