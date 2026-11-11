import React from 'react';
import './Card.css';
import PropTypes from 'prop-types';

const Card = ({
  children,
  className = '',
  header,
  footer,
  title,
  subtitle,
  body,
  bordered = false,
  shadowed = false,
  rounded = true,
  ...rest
}) => {
  return (
    <div
      className={`card ${bordered ? 'border' : ''} ${shadowed ? 'shadow-sm' : ''} ${rounded ? 'rounded' : ''} ${className}`}
      {...rest}
    >
      {header || title || subtitle ? (
        <div className="card-header">
          {header}
          {!header && (
            <>
              {title && (
                <h5 className="card-title mb-1">
                  {title}
                </h5>
              )}
              {subtitle && (
                <h6 className="card-subtitle mb-2 text-muted">
                  {subtitle}
                </h6>
              )}
            </>
          )}
        </div>
      ) : null}

      <div className="card-body">
        {body || children}
      </div>

      {footer ? (
        <div className="card-footer">
          {footer}
        </div>
      ) : null}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  header: PropTypes.node,
  footer: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  body: PropTypes.node,
  bordered: PropTypes.bool,
  shadowed: PropTypes.bool,
  rounded: PropTypes.bool,
};

export default Card;
