// src/components/ui/dashboard/StatCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './StatCard.css';

const StatCard = ({ title, value, icon, color = '#E53935', trend = null, trendDescription = '' }) => {
  const getIconClass = (icon) => {
    // Map icon names to appropriate classes or return the icon if it's already a JSX element
    if (typeof icon === 'string') {
      const iconMap = {
        users: 'fas fa-users',
        tint: 'fas tint-icon',
        calendar: 'fas fa-calendar-alt',
        clock: 'fas fa-clock',
        heart: 'fas fa-heart',
        plus: 'fas fa-plus',
        minus: 'fas fa-minus',
        exclamation: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle',
        check: 'fas fa-check',
        trash: 'fas fa-trash',
        edit: 'fas fa-edit',
        chart: 'fas fa-chart-line',
        filter: 'fas fa-filter',
        search: 'fas fa-search',
        bell: 'fas fa-bell',
        user: 'fas fa-user',
        gift: 'fas fa-gift',
        hand: 'fas fa-hand-holding',
      };
      return iconMap[icon] || icon;
    }
    return icon;
  };

  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <div className="stat-card-icon">
          <i className={getIconClass(icon)} style={{ color }}></i>
        </div>
        <div className="stat-card-title">{title}</div>
      </div>
      <div className="stat-card-value">{value}</div>
      {trend !== null && (
        <div className="stat-card-trend">
          <i className={trend > 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'}></i>
          <span>{Math.abs(trend)}% {trendDescription}</span>
        </div>
      )}
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  color: PropTypes.string,
  trend: PropTypes.number,
  trendDescription: PropTypes.string
};

export default StatCard;