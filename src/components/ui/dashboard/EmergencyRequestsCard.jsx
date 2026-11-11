// src/components/ui/dashboard/EmergencyRequestsCard.jsx
import React, { useEffect, useState } from 'react';
import { dashboardService } from '../../../services/dashboardService';
import './EmergencyRequestsCard.css';

const EmergencyRequestsCard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await dashboardService.getEmergencyRequests();
        if (response.success) {
          setRequests(response.data);
        } else {
          setError('Failed to load emergency requests');
        }
      } catch (err) {
        setError('An error occurred while fetching emergency requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="emergency-requests-card">
        <div className="request-item skeleton mb-2">
          <div className="request-info">
            <div className="request-patient skeleton-text-line" style={{ width: '60%' }}></div>
            <div className="request-blood-group skeleton-text-line" style={{ width: '40%' }}></div>
          </div>
        </div>
        <div className="request-item skeleton mb-2">
          <div className="request-info">
            <div className="request-patient skeleton-text-line" style={{ width: '60%' }}></div>
            <div className="request-blood-group skeleton-text-line" style={{ width: '40%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="emergency-requests-card">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="emergency-requests-card">
      <div className="card-header">
        <h3 className="h5 mb-0">Emergency Blood Requests</h3>
      </div>
      <div className="request-list">
        {requests.length === 0 ? (
          <div className="text-center py-3">
            <p className="mb-0 text-muted">No active emergency requests</p>
          </div>
        ) : (
          requests.map((request) => (
            <div key={request.id} className="request-item mb-3">
              <div className="request-info">
                <h6 className="request-patient mb-1">{request.patientName}</h6>
                <p className="request-details mb-1">
                  <strong>Blood Group:</strong> <span className="badge bg-danger text-white">{request.bloodGroupNeeded}</span> |
                  <strong>Units:</strong> {request.unitsRequired} |
                  <strong>Urgency:</strong>
                  <span className={`badge bg-${request.urgencyLevel.toLowerCase() === 'high' ? 'danger' : request.urgencyLevel.toLowerCase() === 'medium' ? 'warning' : 'danger'} text-white`}>
                    {request.urgencyLevel}
                  </span>
                </p>
                <p className="request-hospital mb-1">
                  <strong>Hospital:</strong> {request.hospitalName}
                </p>
                <p className="request-date mb-0">
                  <strong>Needed By:</strong> {new Date(request.dateNeededBy).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      {requests.length > 0 && (
        <div className="card-footer">
          <button className="btn btn-outline-danger btn-sm">
            View All Requests
          </button>
        </div>
      )}
    </div>
  );
};

export default EmergencyRequestsCard;