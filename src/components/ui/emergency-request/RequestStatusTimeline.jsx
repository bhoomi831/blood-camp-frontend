// src/components/ui/emergency-request/RequestStatusTimeline.jsx
import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { FaClock, FaCheckCircle, FaUser, FaHospitalUser, FaTintSlash, FaCheckDouble, FaTimesCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const RequestStatusTimeline = ({ request }) => {
  // Define the timeline stages
  const stages = [
    {
      id: 'created',
      label: 'Created',
      icon: FaClock,
      description: 'Request was submitted',
      date: request?.datePosted,
      completed: ['Pending Verification', 'Active', 'Searching', 'Donors Contacted', 'Blood Arranged', 'Completed'].includes(request?.status || '')
    },
    {
      id: 'verified',
      label: 'Verified',
      icon: FaCheckCircle,
      description: 'Request details verified by administrator',
      date: request?.datePosted, // In a real app, this would be a separate timestamp
      completed: ['Active', 'Searching', 'Donors Contacted', 'Blood Arranged', 'Completed'].includes(request?.status || '')
    },
    {
      id: 'searching',
      label: 'Searching',
      icon: FaUser,
      description: 'Searching for matching donors',
      date: request?.datePosted, // In a real app, this would be a separate timestamp
      completed: ['Searching', 'Donors Contacted', 'Blood Arranged', 'Completed'].includes(request?.status || '')
    },
    {
      id: 'donors-contacted',
      label: 'Donors Contacted',
      icon: FaHospitalUser,
      description: 'Potential donors have been contacted',
      date: request?.datePosted, // In a real app, this would be a separate timestamp
      completed: ['Donors Contacted', 'Blood Arranged', 'Completed'].includes(request?.status || '')
    },
    {
      id: 'blood-arranged',
      label: 'Blood Arrived',
      icon: FaTintSlash,
      description: 'Blood products have been secured',
      date: request?.datePosted, // In a real app, this would be a separate timestamp
      completed: ['Blood Arranged', 'Completed'].includes(request?.status || '')
    },
    {
      id: 'completed',
      label: 'Completed',
      icon: faCheckDouble,
      description: 'Blood transfusion completed successfully',
      date: request?.datePosted, // In a real app, this would be a separate timestamp
      completed: ['Completed'].includes(request?.status || '')
    },
    {
      id: 'cancelled',
      label: 'Cancelled',
      icon: faTimesCircle,
      description: 'Request was cancelled',
      date: request?.datePosted, // In a real app, this would be a separate timestamp
      completed: ['Cancelled'].includes(request?.status || '')
    },
    {
      id: 'expired',
      label: 'Expired',
      icon: faTimesCircle,
      description: 'Request expired before fulfillment',
      date: request?.datePosted, // In a real app, this would be a separate timestamp
      completed: ['Expired'].includes(request?.status || '')
    }
  ];

  // Determine which stage is currently active
  const getActiveStage = () => {
    const status = request?.status || '';
    switch (status) {
      case 'Draft': return 'created';
      case 'Pending Verification': return 'verified';
      case 'Active': return 'searching';
      case 'Searching': return 'searching';
      case 'Donors Contacted': return 'donors-contacted';
      case 'Blood Arranged': return 'blood-arranged';
      case 'Completed': return 'completed';
      case 'Cancelled': return 'cancelled';
      case 'Expired': return 'expired';
      default: return 'created';
    }
  };

  const activeStage = getActiveStage();

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="request-status-timeline"
    >
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-bottom">
          <h5 className="mb-0">
            <FaClock aria-hidden="true" className="me-2" /> Request Status Timeline
          </h5>
        </Card.Header>
        <Card.Body>
          <div className="timeline">
            {stages.map((stage, index) => (
              <div key={stage.id} className={`timeline-item ${stage.id === activeStage ? 'active' : ''}`}>
                <div className="timeline-marker">
                  <div className={`marker-inner ${stage.completed ? 'completed' : ''}`}>
                    <stage.icon
                      className={`${stage.completed ? 'text-white' : 'text-muted'}`}
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div className="timeline-content">
                  <h6 className="timeline-title">{stage.label}</h6>
                  <p className="timeline-text mb-1">{stage.description}</p>
                  <small className="text-muted">
                    {stage.completed ? `Completed: ${formatDate(stage.date)}` : 'Pending'}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default RequestStatusTimeline;