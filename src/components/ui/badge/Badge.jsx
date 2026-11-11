import React from 'react';
import PropTypes from 'prop-types';
import './Badge.css';

const Badge = ({
  children,
  variant = 'secondary',
  pill = false,
  className = ''
}) => {
  return (
    <span className={`badge badge-${variant}${pill ? ' badge-pill' : ''} ${className}`}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']),
  pill: PropTypes.bool,
  className: PropTypes.string,
};

export default Badge;