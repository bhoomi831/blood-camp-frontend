// src/components/ui/dashboard/UpcomingCampsCard.jsx
import React, { useEffect, useState } from 'react';
import { dashboardService } from '../../../services/dashboardService';
import Skeleton from '../skeleton/Skeleton';
import './UpcomingCampsCard.css';

const UpcomingCampsCard = () => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        setLoading(true);
        const response = await dashboardService.getUpcomingCamps();
        if (response.success) {
          setCamps(response.data);
        } else {
          setError('Failed to load upcoming camps');
        }
      } catch (err) {
        setError('An error occurred while fetching upcoming camps');
      } finally {
        setLoading(false);
      }
    };

    fetchCamps();
  }, []);

  if (loading) {
    return (
      <div className="upcoming-camps-card">
        <div className="camp-item skeleton mb-2">
          <div className="camp-info">
            <div className="camp-name skeleton-text-line" style={{ width: '60%' }}></div>
            <div className="camp-date skeleton-text-line" style={{ width: '40%' }}></div>
          </div>
        </div>
        <div className="camp-item skeleton mb-2">
          <div className="camp-info">
            <div className="camp-name skeleton-text-line" style={{ width: '60%' }}></div>
            <div className="camp-date skeleton-text-line" style={{ width: '40%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="upcoming-camps-card">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="upcoming-camps-card">
      <div className="card-header">
        <h3 className="h5 mb-0">Upcoming Camps</h3>
      </div>
      <div className="camp-list">
        {camps.length === 0 ? (
          <div className="text-center py-3">
            <p className="mb-0 text-muted">No upcoming camps</p>
          </div>
        ) : (
          camps.map((camp) => (
            <div key={camp.id} className="camp-item mb-3">
              <div className="camp-info">
                <h6 className="camp-name mb-1">{camp.name}</h6>
                <p className="camp-location mb-1">
                  <strong>Location:</strong> {camp.city}, {camp.state}
                </p>
                <p className="camp-date mb-0">
                  <strong>Date:</strong> {new Date(camp.date).toLocaleDateString()} |
                  <strong>Time:</strong> {camp.time}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      {camps.length > 0 && (
        <div className="card-footer">
          <button className="btn btn-outline-primary btn-sm">
            View All
          </button>
        </div>
      )}
    </div>
  );
};

export default UpcomingCampsCard;