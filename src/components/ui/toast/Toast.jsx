import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Toast.css';

const Toast = ({
  children,
  variant = 'info',
  position = 'top-right',
  duration = 5000,
  onClose,
  className = '',
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`toast toast-${variant} toast-${position} ${className}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      {children}
      <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
    </div>
  );
};

Toast.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']),
  position: PropTypes.oneOf([
    'top-start',
    'top-center',
    'top-end',
    'middle-start',
    'middle-center',
    'middle-end',
    'bottom-start',
    'bottom-center',
    'bottom-end'
  ]),
  duration: PropTypes.number,
  onClose: PropTypes.func,
  className: PropTypes.string,
};

export default Toast;