// src/components/ui/dashboard/QuickActionsCard.jsx
import React from 'react';
import Button from '../button/Button';
import './QuickActionsCard.css';

const QuickActionsCard = () => {
  return (
    <div className="quick-actions-card">
      <div className="card-header">
        <h3 className="h5 mb-0">Quick Actions</h3>
      </div>
      <div className="actions-grid">
        <Button variant="outline-primary" className="action-btn w-100 mb-2">
          <i className="fas fa-user-plus me-2"></i>
          Register Donor
        </Button>
        <Button variant="outline-primary" className="action-btn w-100 mb-2">
          <i className="fas fa-hands-helping me-2"></i>
          Volunteer Signup
        </Button>
        <Button variant="outline-primary" className="action-btn w-100 mb-2">
          <i className="fas fa-plus-square me-2"></i>
          Create Blood Camp
        </Button>
        <Button variant="outline-primary" className="action-btn w-100 mb-2">
          <i className="fas fa-tint me-2"></i>
          Record Donation
        </Button>
        <Button variant="outline-primary" className="action-btn w-100 mb-2">
          <i className="fas fa-bell me-2"></i>
          Send Notification
        </Button>
        <Button variant="outline-primary" className="action-btn w-100">
          <i className="fas fa-file-alt me-2"></i>
          Generate Report
        </Button>
      </div>
    </div>
  );
};

export default QuickActionsCard;