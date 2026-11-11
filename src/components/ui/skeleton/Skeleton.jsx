import React from 'react';
import './Skeleton.css';

const Skeleton = ({
  variant = 'text',
  width = '100%',
  height,
  className = ''
}) => {
  return (
    <div className={`skeleton skeleton-${variant} ${className}`} style={{ width, height }}>
      {/* Animation elements */}
      {variant === 'text' && (
        <>
          <div className="skeleton-line" style={{ width: '60%' }}></div>
          <div className="skeleton-line" style={{ width: '80%' }}></div>
          <div className="skeleton-line" style={{ width: '60%' }}></div>
        </>
      )}
      {variant === 'circle' && (
        <div className="skeleton-circle"></div>
      )}
      {variant === 'rectangle' && (
        <div className="skeleton-rectangle"></div>
      )}
    </div>
  );
};

export default Skeleton;