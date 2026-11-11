// src/pages/camp-management/CampDetails.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, Badge, Button, Spinner } from 'react-bootstrap';
import { FaCalendarAlt, FaUser, FaTint, FaUsers, FaClipboardList, FaChartBar, FaEllipsisV } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import campManagementService from '../services/campManagementService';

const CampDetails = ({ match }) => {
  const [camp, setCamp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [volunteers, setVolunteers] = useState([]);
  const [volunteersLoading, setVolunteersLoading] = useState(false);

  const campId = match.params.id;

  useEffect(() => {
    const fetchCampAndVolunteers = async () => {
      setLoading(true);
      try {
        // Fetch camp details
        const campResponse = await campManagementService.getCampById(campId);
        if (campResponse.success) {
          setCamp(campResponse.data);
        } else {
          setError(campResponse.error || 'Failed to load camp details');
        }

        // Fetch volunteers assigned to this camp
        setVolunteersLoading(true);
        const volunteersResponse = await campManagementService.getCampVolunteers(campId);
        if (volunteersResponse.success) {
          setVolunteers(volunteersResponse.data);
        } else {
          setError(volunteersResponse.error || 'Failed to load volunteers');
        }
        setVolunteersLoading(false);
      } catch (err) {
        setError('An error occurred while loading camp details');
      } finally {
        setLoading(false);
        setVolunteersLoading(false);
      }
    };

    fetchCampAndVolunteers();
  }, [campId]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="camp-details-page min-vh-100 bg-gray-50"
      >
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <h4 className="mt-3">Loading camp details...</h4>
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
        className="camp-details-page min-vh-100 bg-gray-50"
      >
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <div className="alert alert-danger">
                {error}
              </div>
            </Col>
          </Row>
        </Container>
      </motion.div>
    );
  }

  if (!camp) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="camp-details-page min-vh-100 bg-gray-50"
      >
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <div className="alert alert-info">
                Camp not found
              </div>
            </Col>
          </Row>
        </Container>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="camp-details-page min-vh-100 bg-gray-50"
    >
      <Container>
        <Row>
          <Col>
            <h2 className="mb-4">{camp.name}</h2>
            <p className="text-muted mb-4">Details of the blood donation camp</p>
          </Col>
        </Row>

        {/* Camp Info Cards */}
        <Row className="mb-4">
          <Col md={6} lg={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="text-center">
                <div className="mb-3">
                  <FaCalendarAlt style={{ fontSize: '2rem', color: '#E53935' }} />
                </div>
                <h5 className="card-title">Date</h5>
                <p className="card-text">
                  <strong>{new Date(camp.startDate).toLocaleDateString()} - {new Date(camp.endDate).toLocaleDateString()}</strong><br />
                  <small className="text-muted">{new Date(camp.startDate).toLocaleTimeString()} - {new Date(camp.endDate).toLocaleTimeString()}</small>
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="text-center">
                <div className="mb-3">
                  <FaTint style={{ fontSize: '2rem', color: '#E53935' }} />
                </div>
                <h5 className="card-title">Expected Donors</h5>
                <p className="card-text display-4">{camp.expectedDonors}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="text-center">
                <div className="mb-3">
                  <FaUsers style={{ fontSize: '2rem', color: '#E53935' }} />
                </div>
                <h5 className="card-title">Registered Donors</h5>
                <p className="card-text display-4">{camp.actualDonors}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="text-center">
                <div className="mb-3">
                  <FaChartBar style={{ fontSize: '2rem', color: '#E53935' }} />
                </div>
                <h5 className="card-title">Blood Collected</h5>
                <p className="card-text display-4">{camp.collectedBloodUnits} units</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Camp Details */}
        <Row className="mb-4">
          <Col md={8}>
            <Card className="border-0 shadow-sm">
              <Card.Header className="border-0">
                <h3 className="h5 mb-0">Camp Information</h3>
              </Card.Header>
              <Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    <strong>Organizer:</strong> {camp.organizer}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Venue:</strong> {camp.venueName}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Contact Email:</strong> {camp.contactEmail}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Contact Phone:</strong> {camp.contactPhone}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Status:</strong>
                    <Badge variant={getStatusVariant(camp.status)} className="ms-2">
                      {camp.status.charAt(0).toUpperCase() + camp.status.slice(1)}
                    </Badge>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Urgency Level:</strong>
                    <Badge variant={getUrgencyVariant(camp.urgencyLevel)} className="ms-2">
                      {camp.urgencyLevel.charAt(0).toUpperCase() + camp.urgencyLevel.slice(1)}
                    </Badge>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm">
              <Card.Header className="border-0">
                <h3 className="h5 mb-0">Blood Group Goals</h3>
              </Card.Header>
              <Card.Body>
                <ListGroup className="list-group-flush">
                  {Object.entries(camp.bloodTypeGoals).map(([bloodType, goal]) => (
                    <ListGroup.Item key={bloodType} className="d-flex justify-content-between">
                      <span>{bloodType}</span>
                      <span className="badge bg-primary rounded-pill">{goal}</span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Description */}
        <Row className="mb-4">
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Header className="border-0">
                <h3 className="h5 mb-0">Description</h3>
              </Card.Header>
              <Card.Body>
                <p>{camp.description}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Assigned Volunteers */}
        <Row className="mb-4">
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Header className="d-flex justify-content-between align-items-center border-0">
                <div>
                  <h3 className="h5 mb-0">Assigned Volunteers</h3>
                </div>
                <div>
                  {volunteers.length > 0 && (
                    <Button variant="outline-primary" size="sm" className="me-2">
                      <FaUsers /> Manage
                    </Button>
                  )}
                  <Link to={`/camp-management/${campId}/volunteers`}>
                    <Button variant="outline-secondary" size="sm">
                      <FaUsers /> View All
                    </Button>
                  </Link>
                </div>
              </Card.Header>
              <Card.Body>
                {volunteersLoading ? (
                  <div className="text-center py-3">
                    <div className="spinner-border sm" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  volunteers.length === 0 ? (
                    <p className="text-center text-muted py-3">No volunteers assigned yet</p>
                  ) : (
                    <ListGroup className="list-group-flush">
                      {volunteers.map(volunteer => (
                        <ListGroup.Item key={volunteer.id} className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <div className="shrink-0">
                              <div className="avatar avatar-sm">
                                <span className="avatar-title rounded-circle bg-light">{volunteer.firstName.charAt(0)}{volunteer.lastName.charAt(0)}</span>
                              </div>
                            </div>
                            <div className="grow ms-3">
                              <h6 className="mb-0">{volunteer.firstName} {volunteer.lastName}</h6>
                              <small className="text-muted">{volunteer.role}</small>
                            </div>
                            <span className="badge bg-light">{volunteer.bloodGroup}</span>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Action Buttons */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex gap-3">
              <Link to={`/camps/${campId}/edit`}>
                <Button variant="outline-primary">
                  <FaEdit /> Edit Camp
                </Button>
              </Link>
              <Button variant="outline-success" onClick={() => window.location.href = `/camps/${campId}/volunteers`}>
                <FaUsers /> Assign Volunteers
              </Button>
              <Button variant="outline-warning" onClick={() => window.location.href = `/camps/${campId}/venue`}>
                <FaMapMarkedAlt /> Assign Venue
              </Button>
              {camp.status === 'planned' && (
                <>
                  <Button variant="outline-success" onClick={() => alert('Camp approved')}>
                    <FaCheck /> Approve
                  </Button>
                  <Button variant="outline-danger" onClick={() => alert('Camp rejected')}>
                    <FaTimes /> Reject
                  </Button>
                </>
              )}
              {camp.status === 'active' && (
                <Button variant="outline-info" onClick={() => alert('Camp completed')}>
                  <FaCheckCircle /> Mark as Completed
                </Button>
              )}
              <Button variant="outline-danger" onClick={() => alert('Camp deleted')}>
                <FaTrashAlt /> Delete Camp
              </Button>
              <Link to="/camps">
                <Button variant="outline-secondary">
                  <FaArrowLeft /> Back to List
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

// Helper functions
const getStatusVariant = (status) => {
  switch (status) {
    case 'planned': return 'warning';
    case 'active': return 'success';
    case 'completed': return 'info';
    case 'cancelled': return 'danger';
    default: return 'secondary';
  }
};

const getUrgencyVariant = (urgency) => {
  switch (urgency) {
    case 'low': return 'success';
    case 'medium': return 'warning';
    case 'high': return 'danger';
    case 'critical': return 'dark';
    default: return 'secondary';
  }
};

export default CampDetails;