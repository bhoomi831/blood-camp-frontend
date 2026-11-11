// src/components/ui/dashboard/DonationGoalsCard.jsx
import React, { useEffect, useState } from 'react';
import { dashboardService } from '../../../services/dashboardService';
import './DonationGoalsCard.css';

const DonationGoalsCard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const statsRes = await dashboardService.getDashboardStats();

        if (statsRes.success) {
          setStats(statsRes.data);
        }
      } catch (err) {
        setError('Failed to load donation goals data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="donation-goals-card">
        <div className="d-flex justify-content-between mb-3">
          <h3 className="h5 mb-0">Donation Goals</h3>
          <small className="text-muted">Updated just now</small>
        </div>
        <div className="progress-container mb-3">
          <div className="progress-label">
            <span>Monthly Donation Goal</span>
            <span className="ms-2">0 / 0 donations</span>
          </div>
          <div className="progress" style={{ height: '20px' }}>
            <div className="progress-bar bg-success" style={{ width: '0%' }}></div>
          </div>
        </div>
        <div className="progress-container mb-3">
          <div className="progress-label">
            <span>Annual Donation Goal</span>
            <span className="ms-2">0 / 0 donations</span>
          </div>
          <div className="progress" style={{ height: '20px' }}>
            <div className="progress-bar bg-info" style={{ width: '0%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="donation-goals-card">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  // Calculate goals and progress
  const monthlyGoal = 1200;
  const annualGoal = 12000;
  const monthlyProgress = stats ? Math.min(100, Math.round((stats.donationsThisMonth / monthlyGoal) * 100)) : 0;
  const annualProgress = stats ? Math.min(100, Math.round((stats.totalDonations / annualGoal) * 100)) : 0;

  return (
    <div className="donation-goals-card">
      <div className="d-flex justify-content-between mb-3">
        <h3 className="h5 mb-0">Donation Goals</h3>
        {stats && (
          <small className="text-muted">
            Updated: {new Date().toLocaleTimeString()}
          </small>
        )}
      </div>

      {/* Monthly Goal */}
      <div className="progress-container mb-4">
        <div className="progress-label d-flex justify-content-between">
          <span>Monthly Donation Goal</span>
          <span>{stats?.donationsThisMonth?.toLocaleString() ?? '0'} / {monthlyGoal.toLocaleString()} donations</span>
        </div>
        <div className="progress" style={{ height: '20px' }}>
          <div className="progress-bar bg-success"
               style={{ width: `${monthlyProgress}%` }}
               aria-valuenow={monthlyProgress}
               aria-valuemin="0"
               aria-valuemax="100">
          </div>
        </div>
        {monthlyProgress > 0 && (
          <small className="text-muted d-block mt-1">
            {monthlyProgress}% complete
          </small>
        )}
      </div>

      {/* Annual Goal */}
      <div className="progress-container mb-3">
        <div className="progress-label d-flex justify-content-between">
          <span>Annual Donation Goal</span>
          <span>{stats?.totalDonations?.toLocaleString() ?? '0'} / {annualGoal.toLocaleString()} donations</span>
        </div>
        <div className="progress" style={{ height: '20px' }}>
          <div className="progress-bar bg-info"
               style={{ width: `${annualProgress}%` }}
               aria-valuenow={annualProgress}
               aria-valuemin="0"
               aria-valuemax="100">
          </div>
        </div>
        {annualProgress > 0 && (
          <small className="text-muted d-block mt-1">
            {annualProgress}% complete
          </small>
        )}
      </div>
    </div>
  );
};

export default DonationGoalsCard;
