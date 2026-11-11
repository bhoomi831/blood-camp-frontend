import React from 'react';
import './TextArea.css';

const TextArea = ({ 
  label, 
  placeholder = '', 
  value, 
  onChange, 
  disabled = false, 
  rows = 4,
  error = false,
  helperText,
  ...props
}) => {
  return (
    <div className="textarea-group">
      {label && <label className="textarea-label">{label}</label>}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        className={`form-control${error ? ' is-invalid' : ''}`}
        {...props}
      />
      {error && helperText && <div className="invalid-feedback">{helperText}</div>}
      {!error && helperText && <div className="form-text">{helperText}</div>}
    </div>
  );
};

export default TextArea;
