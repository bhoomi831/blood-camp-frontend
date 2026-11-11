// src/pages/EmergencyRequestDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Spinner, ListGroup, Badge, Alert } from 'react-bootstrap';
import { FaUser, FaCalendarAlt, FaTint, FaMale, FaFemale, FaPhone, FaEnvelope, FaMapMarkerAlt, FaIdCard, FaPlus, FaEdit, FaSyncAlt, FaExclamationTriangle, FaTimesCircle, FaStethoscope, FaCheckCircle, FaTimes, FaClipboardList, FaTintSlash, FaBone, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import emergencyService from '../services/emergencyService';
import RequestStatusTimeline from '../components/ui/emergency-request/RequestStatusTimeline';

const EmergencyRequestDetailPage = () => {
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [requestId] = useState(() => {
    const path = window.location.pathname;
    const match = path.match(/\/emergency-request\/(\d+)/);
    return match ? match[1] : null;
  });

  // Fetch request data
  const fetchRequestData = async () => {
    if (!requestId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await emergencyService.getRequestById(`req-${requestId}`);
      if (response.success) {
        setRequest(response.data);
      } else {
        setError(response.error || 'Failed to load request');
      }
    } catch (err) {
      setError('An error occurred while loading request details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (requestId) {
      fetchRequestData();
    }
  }, [requestId]);

  if (!requestId) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="emergency-request-detail-page min-vh-100 bg-gray-50"
      >
        <Container>
          <Row className="justify-content-center align-items-center min-vh-75">
            <Col md="6">
              <div className="alert alert-danger">
                <h4>Invalid Request ID</h4>
                <p>Please provide a valid request ID to view details.</p>
                <Button color="link" as={Link} to="/emergency-request/list">
                  Go to Request List
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="emergency-request-detail-page min-vh-100 bg-gray-50"
      >
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <div className="text-center py-5">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <h4 className="mt-3">Loading request details...</h4>
              </div>
            </Col>
          </Row>
        </Container>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="emergency-request-detail-page min-vh-100 bg-gray-50"
      >
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <div className="alert alert-danger">{error}</div>
            </Col>
          </Row>
        </Container>
      </motion.div>
    );
  }

  if (!request) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="emergency-request-detail-page min-vh-100 bg-gray-50"
      >
        <Container>
          <Row className="justify-content-center align-items-center min-vh-75">
            <Col md="6">
              <div className="alert alert-warning">
                <h4>Request Not Found</h4>
                <p>Request with ID {requestId} not found.</p>
                <Button color="link" as={Link} to="/emergency-request/list">
                  Go to Request List
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </motion.div>
    );
  }

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  // Helper function to format time
  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Helper function to get badge variant based on urgency level
  const getUrgencyBadgeVariant = (level) => {
    switch (level.toLowerCase()) {
      case 'low': return 'bg-success';
      case 'medium': return 'bg-warning';
      case 'high': return 'bg-danger';
      case 'critical': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  // Helper function to get text class for urgency badge (for contrast)
  const getUrgencyBadgeTextClass = (level) => {
    // All urgency backgrounds require dark text for WCAG AA contrast
    return 'text-dark';
  };

  // Helper function to get badge variant based on status
  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Draft': return 'bg-secondary';
      case 'Pending Verification': return 'bg-info';
      case 'Active': return 'bg-primary';
      case 'Searching': return 'bg-warning';
      case 'Donors Contacted': return 'bg-info';
      case 'Blood Arranged': return 'bg-success';
      case 'Completed': return 'bg-dark';
      case 'Cancelled': return 'bg-danger';
      case 'Expired': return 'bg-secondary';
      default: return 'bg-secondary';
    }
  };

  // Helper function to get text class for status badge (for contrast)
  const getStatusBadgeTextClass = (status) => {
    // Completed uses bg-dark which has good contrast with white text
    if (status === 'Completed') {
      return 'text-white';
    }
    // All other status backgrounds require dark text for WCAG AA contrast
    return 'text-dark';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="emergency-request-detail-page min-vh-100 bg-gray-50"
    >
      <Container>
        <Row className="mb-4">
          <Col>
            <h2 className="mb-3">
              Emergency Request Details
              <span className="ms-2 badge bg-light text-dark">
                #{request.id.slice(-4)}
              </span>
            </h2>
            <p className="text-muted">View detailed information about this emergency blood request</p>
          </Col>
          <Col className="text-end">
            <Button variant="outline-primary" size="sm" as={Link} to="/emergency-request/list">
              <FaTimesCircle /> Back to Request List
            </Button>
            {request.status !== 'Completed' && request.status !== 'Cancelled' && request.status !== 'Expired' && (
              <Button variant="outline-secondary" size="sm" as={Link} to={`/emergency-request/${requestId}/edit`}>
                <FaEdit /> Edit Request
              </Button>
            )}
          </Col>
        </Row>

        {/* Alerts */}
        {error && (
          <Row className="mb-4">
            <Col>
              <div className="alert alert-danger">{error}</div>
            </Col>
          </Row>
        )}

        {/* Request Info Card */}
        <Card className="mb-4 shadow-sm border-0">
          <Card.Header className="bg-white border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0"><FaClipboardList /> Request Overview</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                <ListGroup className="flush">
                  <ListGroup.Item>
                    <strong>Patient Name:</strong> {request.patientName}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Blood Group Needed:</strong>
                    <span className={`badge ${getUrgencyBadgeVariant(request.bloodGroupNeeded)} ${getUrgencyBadgeTextClass(request.bloodGroupNeeded)}`} style={{ fontSize: '1.2rem' }}>
                      {request.bloodGroupNeeded}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Units Required:</strong> {request.unitsRequired}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Urgency Level:</strong>
                    <span className={`badge ${getUrgencyBadgeVariant(request.urgencyLevel)} ${getUrgencyBadgeTextClass(request.urgencyLevel)}`}>
                      {request.urgencyLevel}
                    </span>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={4}>
                <ListGroup className="flush">
                  <ListGroup.Item>
                    <strong>Current Status:</strong>
                    <span className={`badge ${getStatusBadgeVariant(request.status)} ${getStatusBadgeTextClass(request.status)}`}>
                      {request.status}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Date Posted:</strong> {formatDate(request.datePosted)} {formatTime(request.datePosted)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Needed By:</strong> {formatDate(request.dateNeededBy)} {formatTime(request.dateNeededBy)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Posted By:</strong> {request.postedBy}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={4}>
                <ListGroup className="flush">
                  <ListGroup.Item>
                    <strong>Hospital:</strong> {request.hospitalName}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Address:</strong> {request.address}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>City, State:</strong> {request.city}, {request.state} {request.zipCode}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Contact Person:</strong> {request.contactPerson}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Request Status Timeline */}
        <Card className="mb-4 shadow-sm border-0">
          <Card.Header className="bg-white border-bottom">
            <h5 className="mb-0"><FaClock /> Request Status Timeline</h5>
          </Card.Header>
          <Card.Body>
            <RequestStatusTimeline request={request} />
          </Card.Body>
        </Card>

        {/* Contact Details Card */}
        <Card className="mb-4 shadow-sm border-0">
          <Card.Header className="bg-white border-bottom">
            <h5 className="mb-0"><FaPhone /> Contact Information</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <ListGroup className="flush">
                  <ListGroup.Item>
                    <strong>Phone:</strong> {request.contactPhone}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Email:</strong> {request.contactEmail}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Emergency Contact:</strong> {request.emergencyContact || 'Not provided'}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={6}>
                <ListGroup className="flush">
                  <ListGroup.Item>
                    <strong>Hospital Phone:</strong> {request.hospitalPhone || 'Available on request'}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Hospital Email:</strong> {request.hospitalEmail || 'Available on request'}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Preferred Contact Time:</strong> {request.preferredContactTime || 'Anytime'}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Additional Notes */}
        {request.notes && request.notes !== 'None of the above' && (
          <Card className="mb-4 shadow-sm border-0">
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0"><FaStethoscope /> Additional Notes</h5>
            </Card.Header>
            <Card.Body>
              <p>{request.notes}</p>
            </Card.Body>
          </Card>
        )}

        {/* Matching Resources */}
        <Card className="mb-4 shadow-sm border-0">
          <Card.Header className="bg-white border-bottom">
            <h5 className="mb-0"><FaBone /> Matching Resources</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                <ListGroup className="flush">
                  <ListGroup.Item>
                    <strong>Matching Donors:</strong> {request.matchingDonors || 'Calculating...'}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Nearby Blood Camps:</strong> {request.nearbyCamps || 'Calculating...'}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Assigned Volunteers:</strong> {request.assignedVolunteers || 'None'}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={8}>
                {!request.notes || request.notes === 'None of the above' && (
                  <div className="alert alert-info">
                    <h4>No additional notes provided</h4>
                    <p>This request doesn't have any special notes or requirements.</p>
                  </div>
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Action Buttons */}
        {request.status !== 'Completed' && request.status !== 'Cancelled' && request.status !== 'Expired' && (
          <div className="text-center">
            <Button
              variant="outline-danger"
              onClick={() => {
                if (window.confirm(`Are you sure you want to cancel this request for ${request.patientName}?`)) {
                  // In a real app, we would call the update API here
                  alert(`Request ${request.id} has been cancelled`);
                }
              }}
            >
              <FaTimes /> Cancel Request
            </Button>
            {request.status === 'Active' && (
              <Button
                variant="outline-success"
                onClick={() => {
                  // In a real app, we would call the update API here
                  alert(`Request ${request.id} has been closed as fulfilled`);
                }}
              >
                <FaCheckCircle /> Close Request
              </Button>
            )}
          </div>
        )}
      </Container>
    </motion.div>
  );
};

export default EmergencyRequestDetailPage;