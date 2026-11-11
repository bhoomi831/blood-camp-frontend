// src/components/ui/dashboard/RecentVolunteersCard.jsx
import React, { useEffect, useState } from 'react';
import { dashboardService } from '../../../services/dashboardService';
import Skeleton from '../skeleton/Skeleton';
import './RecentVolunteersCard.css';

const RecentVolunteersCard = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        setLoading(true);
        const response = await dashboardService.getRecentVolunteers();
        if (response.success) {
          setVolunteers(response.data);
        } else {
          setError('Failed to load recent volunteers');
        }
      } catch (err) {
        setError('An error occurred while fetching recent volunteers');
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  if (loading) {
    return (
      <div className="recent-volunteers-card">
        <div className="volunteer-item skeleton mb-2">
          <div className="volunteer-info">
            <div className="volunteer-name skeleton-text-line" style={{ width: '60%' }}></div>
            <div className="volunteer-role skeleton-text-line" style={{ width: '40%' }}></div>
          </div>
        </div>
        <div className="volunteer-item skeleton mb-2">
          <div className="volunteer-info">
            <div className="volunteer-name skeleton-text-line" style={{ width: '60%' }}></div>
            <div className="volunteer-role skeleton-text-line" style={{ width: '40%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recent-volunteers-card">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="recent-volunteers-card">
      <div className="card-header">
        <h3 className="h5 mb-0">Recent Volunteers</h3>
      </div>
      <div className="volunteer-list">
        {volunteers.length === 0 ? (
          <div className="text-center py-3">
            <p className="mb-0 text-muted">No recent volunteers</p>
          </div>
        ) : (
          volunteers.map((volunteer) => (
            <div key={volunteer.id} className="volunteer-item mb-3">
              <div className="volunteer-info">
                <h6 className="volunteer-name mb-1">
                  {volunteer.firstName} {volunteer.lastName}
                </h6>
                <p className="volunteer-details mb-1">
                  <strong>Role:</strong> {volunteer.role} |
                  <strong>Joined:</strong> {new Date(volunteer.joinedDate).toLocaleDateString()}
                </p>
                <p className="volunteer-location mb-0">
                  <strong>Location:</strong> {volunteer.city}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentVolunteersCard;