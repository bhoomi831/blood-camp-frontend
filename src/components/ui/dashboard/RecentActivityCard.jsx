// src/components/ui/dashboard/RecentActivityCard.jsx
import React, { useEffect, useState } from 'react';
import { dashboardService } from '../../../services/dashboardService';
import Skeleton from '../skeleton/Skeleton';
import './RecentActivityCard.css';

const RecentActivityCard = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await dashboardService.getRecentActivities();
        if (response.success) {
          setActivities(response.data);
        } else {
          setError('Failed to load recent activities');
        }
      } catch (err) {
        setError('An error occurred while fetching recent activities');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="recent-activity-card">
        <div className="activity-item skeleton mb-2">
          <div className="activity-icon skeleton-circle"></div>
          <div className="activity-content">
            <div className="activity-title skeleton-text-line" style={{ width: '60%' }}></div>
            <div className="activity-time skeleton-text-line" style={{ width: '40%' }}></div>
          </div>
        </div>
        <div className="activity-item skeleton mb-2">
          <div className="activity-icon skeleton-circle"></div>
          <div className="activity-content">
            <div className="activity-title skeleton-text-line" style={{ width: '60%' }}></div>
            <div className="activity-time skeleton-text-line" style={{ width: '40%' }}></div>
          </div>
        </div>
        <div className="activity-item skeleton mb-2">
          <div className="activity-icon skeleton-circle"></div>
          <div className="activity-content">
            <div className="activity-title skeleton-text-line" style={{ width: '60%' }}></div>
            <div className="activity-time skeleton-text-line" style={{ width: '40%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recent-activity-card">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="recent-activity-card">
      <div className="card-header">
        <h3 className="h5 mb-0">Recent Activity</h3>
      </div>
      <div className="activity-list">
        {activities.length === 0 ? (
          <div className="text-center py-3">
            <p className="mb-0 text-muted">No recent activity</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="activity-item mb-3">
              <div className="activity-icon">
                <i className={`fas fa-${activity.icon}`} style={{ color: activity.color }}></i>
              </div>
              <div className="activity-content">
                <p className="activity-title mb-1">{activity.description}</p>
                <small className="activity-time text-muted">
                  {new Date(activity.timestamp).toLocaleString()}
                </small>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivityCard;