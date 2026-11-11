import React from 'react';
import './Textarea.css';

const Textarea = ({
  value,
  onChange,
  placeholder = '',
  label = '',
  error = '',
  disabled = false,
  rows = 4,
  className = '',
  ...rest
}) => {
  return (
    <div className={`textarea-wrapper ${className}`}>
      {label && (
        <label className="textarea-label">
          {label}
          {error && <span className="text-danger ms-2">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={`textarea-input ${error ? 'is-invalid' : ''}`}
        {...rest}
      />
      {error && (
        <div className="textarea-feedback invalid-feedback">
          {error}
        </div>
      )}
    </div>
  );
};

export default Textarea;