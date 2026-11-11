import React from 'react';
import './Loader.css';

const Loader = ({ 
  type = 'spinner', 
  size = 'medium',
  color = 'primary',
  label = null
}) => {
  const sizeClass = size === 'small' ? 'sm' : size === 'large' ? 'lg' : '';
  const colorClass = `text-${color}`;
  
  return (
    <div className={`loader loader-${type}${sizeClass ? `-${sizeClass}` : ''}`}>
      {type === 'spinner' && (
        <div className={`spinner-border ${colorClass}`} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {type === 'dots' && (
        <div className="dot-flashing">
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      {type === 'bar' && (
        <div className="progress">
          <div className="progress-bar progress-bar-striped progress-bar-animated" 
               role="progressbar" 
               style={{ width: '100%' }}
          ></div>
        </div>
      )}
      {label && <div className="loader-label mt-2">{label}</div>}
    </div>
  );
};

export default Loader;
