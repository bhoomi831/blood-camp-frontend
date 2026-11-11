import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  block = false,
  disabled = false,
  type = 'button',
  loading = false,
  icon = null,
  iconPosition = 'left',
  onClick,
  ...props
}) => {
  const handleClick = (e) => {
    if (!disabled && !loading) {
      onClick && onClick(e);
    }
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`btn btn-${variant} btn-${size}${block ? ' btn-block' : ''}${loading ? ' loading' : ''}`}
      onClick={handleClick}
      {...props}
    >
      {iconPosition === 'left' && icon && (
        <span className="btn-icon">{icon}</span>
      )}
      {loading ? (
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      ) : (
        children
      )}
      {iconPosition === 'right' && icon && (
        <span className="btn-icon">{icon}</span>
      )}
    </button>
  );
};

export default Button;
