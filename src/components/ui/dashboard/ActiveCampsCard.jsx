// src/components/ui/dashboard/ActiveCampsCard.jsx
import React, { useEffect, useState } from 'react';
import { dashboardService } from '../../../services/dashboardService';
import Skeleton from '../skeleton/Skeleton';
import './ActiveCampsCard.css';

const ActiveCampsCard = () => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        setLoading(true);
        const response = await dashboardService.getActiveCamps();
        if (response.success) {
          setCamps(response.data);
        } else {
          setError('Failed to load active camps');
        }
      } catch (err) {
        setError('An error occurred while fetching active camps');
      } finally {
        setLoading(false);
      }
    };

    fetchCamps();
  }, []);

  if (loading) {
    return (
      <div className="active-camps-card">
        <div className="camp-item skeleton">
          <div className="camp-info">
            <div className="camp-name skeleton-text-line" style={{ width: '60%' }}></div>
            <div className="camp-progress skeleton" style={{ width: '100%', height: '8px' }}></div>
          </div>
        </div>
        <div className="camp-item skeleton">
          <div className="camp-info">
            <div className="camp-name skeleton-text-line" style={{ width: '60%' }}></div>
            <div className="camp-progress skeleton" style={{ width: '100%', height: '8px' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="active-camps-card">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="active-camps-card">
      <div className="card-header">
        <h3 className="h5 mb-0">Active Camps</h3>
      </div>
      <div className="camp-list">
        {camps.length === 0 ? (
          <div className="text-center py-3">
            <p className="mb-0 text-muted">No active camps</p>
            <button className="btn btn-outline-primary btn-sm mt-2">
              Create New Camp
            </button>
          </div>
        ) : (
          camps.map((camp) => {
            const progress = (camp.currentDonors / camp.targetDonors) * 100;
            return (
              <div key={camp.id} className="camp-item mb-3">
                <div className="camp-info">
                  <h6 className="camp-name mb-1">{camp.name}</h6>
                  <p className="camp-location mb-1">
                    <strong>Location:</strong> {camp.city}, {camp.state}
                  </p>
                  <div className="progress mb-2" style={{ height: '8px' }}>
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: `${progress}%` }}
                      aria-valuenow={progress}
                      aria-valuemin="0"
                                  aria-valuemax={100}
                    >
                      {camp.currentDonors}/{camp.targetDonors}
                    </div>
                  </div>
                  <small className="text-muted">
                    {camp.currentDonors} of {camp.targetDonors} donors
                  </small>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ActiveCampsCard;