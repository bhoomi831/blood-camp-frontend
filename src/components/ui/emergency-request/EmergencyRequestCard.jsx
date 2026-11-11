// src/components/ui/emergency-request/EmergencyRequestCard.jsx
import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { FaTint, FaHeartbeat, FaClock, FaHospitalUser, FaUsers, FaUndo, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const EmergencyRequestCard = ({ request, onAction }) => {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Draft': return 'bg-secondary text-dark';
      case 'Pending Verification': return 'bg-info text-dark';
      case 'Active': return 'bg-primary text-white';
      case 'Searching': return 'bg-warning text-dark';
      case 'Donors Contacted': return 'bg-info text-dark';
      case 'Blood Arranged': return 'bg-success text-white';
      case 'Completed': return 'bg-dark text-white';
      case 'Cancelled': return 'bg-danger text-white';
      case 'Expired': return 'bg-secondary text-dark';
      default: return 'bg-secondary text-dark';
    }
  };

  const getUrgencyBadgeClass = (urgency) => {
    switch (urgency.toLowerCase()) {
      case 'low': return 'bg-success text-white';
      case 'medium': return 'bg-warning text-dark';
      case 'high': return 'bg-danger text-white';
      case 'critical': return 'bg-danger text-white';
      default: return 'bg-secondary text-dark';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="emergency-request-card mb-4"
      style={{
        // For reduced motion, we'll respect the prefers-reduced-media preference
        // In a real app, we'd use a hook or media query, but for now we'll keep it simple
        // and note that this should be enhanced with prefers-reduced-media
      }}
    >
      <Card className="h-100 border-0 shadow-sm">
        <Card.Body className="d-flex flex-column">
          <div className="mb-3">
            <h5 className="card-title">
              <FaTint aria-hidden="true" className="me-2" /> {request.patientName}
              <span className="ms-auto badge bg-light text-dark">
                #{request.id.slice(-4)}
              </span>
            </h5>
            <div className="d-flex flex-wrap gap-2 mb-2">
              <span className={`${getUrgencyBadgeClass(request.urgencyLevel)} badge badge-pill me-1`}>
                {request.urgencyLevel}
              </span>
              <span className={`${getStatusBadgeClass(request.status)} badge badge-pill me-1`}>
                {request.status}
              </span>
              <span className="badge badge-pill bg-light text-dark me-1">
                {request.bloodGroupNeeded}
              </span>
              <span className="badge badge-pill bg-light text-dark">
                {request.unitsRequired} Units
              </span>
            </div>
          </div>

          <div className="flex-grow-1">
            <div className="mb-2">
              <small className="text-muted">
                <FaHospitalUser aria-hidden="true" className="me-1" /> {request.hospitalName}
              </small>
            </div>
            <div className="mb-2">
              <small className="text-muted">
                <FaClock aria-hidden="true" className="me-1" />
                Needed by: {new Date(request.dateNeededBy).toLocaleDateString()}
              </small>
            </div>
            <div className="mb-2">
              <small className="text-muted">
                <FaCalendarAlt aria-hidden="true" className="me-1" />
                Posted: {new Date(request.datePosted).toLocaleDateString()}
              </small>
            </div>
            {request.notes && request.notes !== 'None of the above' && (
              <div className="mb-3">
                <small className="text-muted">
                  Notes: {request.notes}
                </small>
              </div>
            )}
          </div>

          <div className="mt-auto">
            <div className="d-flex gap-2">
              <ButtonGroup size="sm" className="w-100">
                <Button
                  variant="outline-primary"
                  as={Link}
                  to={`/emergency-requests/${request.id}`}
                  className="flex-grow-1"
                >
                  View Details
                </Button>

                {request.status !== 'Completed' && request.status !== 'Cancelled' && (
                  <>
                    <Button
                      variant="outline-secondary"
                      as={Link}
                      to={`/emergency-requests/${request.id}/edit`}
                      className="flex-grow-1"
                      disabled={request.status === 'Draft'}
                    >
                      Edit
                    </Button>

                    {request.status === 'Active' || request.status === 'Pending Verification' && (
                      <Button
                        variant="outline-danger"
                        onClick={() => onAction && onAction('cancel', request.id)}
                        className="flex-grow-1"
                      >
                        Cancel
                      </Button>
                    )}

                    {request.status === 'Active' && (
                      <Button
                        variant="outline-success"
                        onClick={() => onAction && onAction('close', request.id)}
                        className="flex-grow-1"
                      >
                        Close
                      </Button>
                    )}
                  </>
                )}
              </ButtonGroup>
            </div>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

// Helper components (these would normally be in their own files, but including here for completeness)
const ButtonGroup = ({children, ...props}) => <div className="btn-group d-grid gap-2 d-md-flex" {...props}>{children}</div>;
const Button = ({variant, children, ...props}) => <button className={`btn btn-${variant}`} {...props}>{children}</button>;

export default EmergencyRequestCard;