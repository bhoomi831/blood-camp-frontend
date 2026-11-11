import React from 'react';
import './EmptyState.css';

const EmptyState = ({
  image,
  title,
  description,
  actionText,
  onAction,
  className = ''
}) => {
  return (
    <div className={`empty-state ${className}`}>
      {image && (
        <div className="empty-state-image">
          {typeof image === 'string' ? (
            <img src={image} alt={title || 'Empty state'} />
          ) : (
            image
          )}
        </div>
      )}
      {title && (
        <h3 className="empty-state-title">
          {title}
        </h3>
      )}
      {description && (
        <p className="empty-state-description">
          {description}
        </p>
      )}
      {actionText && onAction && (
        <button className="btn btn-primary mt-4" onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;