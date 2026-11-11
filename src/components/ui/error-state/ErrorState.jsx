import React from 'react';
import './ErrorState.css';

const ErrorState = ({
  title,
  description,
  actionText,
  onAction,
  retryText,
  onRetry,
  className = ''
}) => {
  return (
    <div className={`error-state ${className}`}>
      {/* Error Icon */}
      <div className="error-state-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
        </svg>
      </div>

      {title && (
        <h3 className="error-state-title">
          {title}
        </h3>
      )}

      {description && (
        <p className="error-state-description">
          {description}
        </p>
      )}

      <div className="error-state-actions mt-4">
        {retryText && onRetry && (
          <button className="btn btn-outline-primary me-2" onClick={onRetry}>
            {retryText}
          </button>
        )}
        {actionText && onAction && (
          <button className="btn btn-primary" onClick={onAction}>
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;