import React from 'react';
import './Textarea.css';

const Textarea = ({ 
  label, 
  value, 
  onChange, 
  rows = 4,
  disabled = false,
  placeholder = '',
  error = false,
  helperText,
  ...props
}) => {
  return (
    <div className="textarea-group">
      {label && <label className="textarea-label">{label}</label>}
      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        disabled={disabled}
        placeholder={placeholder}
        className={`form-textarea${error ? ' is-invalid' : ''}`}
        {...props}
      />
      {error && helperText && <div className="invalid-feedback">{helperText}</div>}
      {!error && helperText && <div className="form-text">{helperText}</div>}
    </div>
  );
};

export default Textarea;
