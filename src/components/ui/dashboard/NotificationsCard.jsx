// src/components/ui/dashboard/NotificationsCard.jsx
import React, { useEffect, useState } from 'react';
import { dashboardService } from '../../../services/dashboardService';
import Skeleton from '../skeleton/Skeleton';
import './NotificationsCard.css';

const NotificationsCard = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response = await dashboardService.getNotifications();
        if (response.success) {
          setNotifications(response.data);
        } else {
          setError('Failed to load notifications');
        }
      } catch (err) {
        setError('An error occurred while fetching notifications');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <div className="notifications-card">
        <div className="notification-item skeleton mb-2">
          <div className="notification-icon skeleton-circle"></div>
          <div className="notification-content">
            <div className="notification-title skeleton-text-line" style={{ width: '60%' }}></div>
            <div className="notification-time skeleton-text-line" style={{ width: '40%' }}></div>
          </div>
        </div>
        <div className="notification-item skeleton mb-2">
          <div className="notification-icon skeleton-circle"></div>
          <div className="notification-content">
            <div className="notification-title skeleton-text-line" style={{ width: '60%' }}></div>
            <div className="notification-time skeleton-text-line" style={{ width: '40%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="notifications-card">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="notifications-card">
      <div className="card-header">
        <h3 className="h5 mb-0">Notifications</h3>
      </div>
      <div className="notification-list">
        {notifications.length === 0 ? (
          <div className="text-center py-3">
            <p className="mb-0 text-muted">No notifications</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div key={notification.id} className={`notification-item mb-3 ${!notification.read ? 'unread' : ''}`}>
              <div className="notification-icon">
                <i className={`fas fa-bell ${notification.type === 'warning' ? 'text-warning' : notification.type === 'success' ? 'text-success' : 'text-info'}`}></i>
              </div>
              <div className="notification-content">
                <h6 className="notification-title mb-1">{notification.title}</h6>
                <p className="notification-message mb-1">{notification.message}</p>
                <small className="notification-time text-muted">
                  {new Date(notification.timestamp).toLocaleString()}
                </small>
              </div>
            </div>
          ))
        )}
      </div>
      {notifications.length > 0 && (
        <div className="card-footer">
          <button className="btn btn-outline-primary btn-sm">
            View All
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationsCard;