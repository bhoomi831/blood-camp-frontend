// src/components/ui/dashboard/RecentDonorsCard.jsx
import React, { useEffect, useState } from 'react';
import { dashboardService } from '../../../services/dashboardService';
import Skeleton from '../skeleton/Skeleton';
import './RecentDonorsCard.css';

const RecentDonorsCard = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        setLoading(true);
        const response = await dashboardService.getRecentDonors();
        if (response.success) {
          setDonors(response.data);
        } else {
          setError('Failed to load recent donors');
        }
      } catch (err) {
        setError('An error occurred while fetching recent donors');
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  if (loading) {
    return (
      <div className="recent-donors-card">
        <div className="donor-item skeleton mb-2">
          <div className="donor-info">
            <div className="donor-name skeleton-text-line" style={{ width: '60%' }}></div>
            <div className="donor-blood-group skeleton-text-line" style={{ width: '40%' }}></div>
          </div>
        </div>
        <div className="donor-item skeleton mb-2">
          <div className="donor-info">
            <div className="donor-name skeleton-text-line" style={{ width: '60%' }}></div>
            <div className="donor-blood-group skeleton-text-line" style={{ width: '40%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recent-donors-card">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="recent-donors-card">
      <div className="card-header">
        <h3 className="h5 mb-0">Recent Donors</h3>
      </div>
      <div className="donor-list">
        {donors.length === 0 ? (
          <div className="text-center py-3">
            <p className="mb-0 text-muted">No recent donors</p>
          </div>
        ) : (
          donors.map((donor) => (
            <div key={donor.id} className="donor-item mb-3">
              <div className="donor-info">
                <h6 className="donor-name mb-1">
                  {donor.firstName} {donor.lastName}
                </h6>
                <p className="donor-details mb-1">
                  <strong>Blood Group:</strong> <span className="badge bg-danger text-white">{donor.bloodGroup}</span> |
                  <strong>Last Donation:</strong> {new Date(donor.lastDonationDate).toLocaleDateString()}
                </p>
                <p className="donor-location mb-0">
                  <strong>Location:</strong> {donor.city}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentDonorsCard;