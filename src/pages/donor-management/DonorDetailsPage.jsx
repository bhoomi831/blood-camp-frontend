import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Spinner, ListGroup, Badge, Alert } from 'react-bootstrap';
import { FaUser, FaCalendarAlt, FaTint, FaMale, FaFemale, FaPhone, FaEnvelope, FaMapMarkerAlt, FaIdCard, FaPlus, FaEdit, FaSyncAlt, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import donorService from '../../services/donorService';

const DonorDetailsPage = () => {
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [donorId] = useState(() => {
    const path = window.location.pathname;
    const match = path.match(/\/donor-management\/(\d+)/);
    return match ? match[1] : null;
  });

  // Fetch donor data
  const fetchDonorData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await donorService.getDonorById(`donor-${donorId}`);
      if (response.success) {
        setDonor(response.data);
      } else {
        setError(response.error || 'Failed to load donor');
      }
    } catch (err) {
      setError('An error occurred while loading donor data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (donorId) {
      fetchDonorData();
    }
  }, [donorId]);

  if (!donorId) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="donor-details-page min-vh-100 bg-gray-50"
      >
        <Container>
          <Row className="justify-content-center align-items-center min-vh-75">
            <Col md="6">
              <div className="alert alert-danger">
                <h4>Invalid Donor ID</h4>
                <p>Please provide a valid donor ID to view the details.</p>
                <Button color="link" as={Link} to="/donor-management">
                  Go to Donor List
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
        className="donor-details-page min-vh-100 bg-gray-50"
      >
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <div className="text-center py-5">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <h4 className="mt-3">Loading donor details...</h4>
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
        className="donor-details-page min-vh-100 bg-gray-50"
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

  if (!donor) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="donor-details-page min-vh-100 bg-gray-50"
      >
        <Container>
          <Row className="justify-content-center align-items-center min-vh-75">
            <Col md="6">
              <div className="alert alert-warning">
                <h4>Donor Not Found</h4>
                <p>Donor with ID {donorId} not found.</p>
                <Button color="link" as={Link} to="/donor-management">
                  Go to Donor List
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

  // Helper function to calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return 'N/A';
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Helper function to get eligibility badge class
  const getEligibilityBadgeClass = (status) => {
    switch (status) {
      case 'Eligible': return 'bg-success';
      case 'Temporarily Deferred': return 'bg-warning';
      case 'Permanently Deferred': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="donor-details-page min-vh-100 bg-gray-50"
    >
      <Container>
        <Row className="mb-4">
          <Col>
            <h2 className="mb-3">
              Donor Details: {donor.firstName} {donor.lastName}
              <span className="ml-2 badge badge-pill bg-light text-dark">
                #{donor.id.slice(-4)}
              </span>
            </h2>
            <p className="text-muted">View basic information about this donor</p>
          </Col>
          <Col className="text-end">
            <Button variant="outline-primary" size="sm" as={Link} to="/donor-management">
              <FaTimesCircle /> Back to Donor List
            </Button>
            <Button variant="outline-secondary" size="sm" as={Link} to={`/donor-management/${donorId}/profile`}>
              <FaIdCard /> View Profile
            </Button>
            <Button variant="outline-secondary" size="sm" as={Link} to={`/donor-management/${donorId}/edit`}>
              <FaEdit /> Edit Profile
            </Button>
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

        {/* Donor Information */}
        <Card className="mb-4 shadow-sm border-0">
          <Card.Header className="bg-white border-bottom">
            <h5 className="mb-0"><FaUser /> Personal Information</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <ListGroup className="flush">
                  <ListGroup.Item>
                    <strong>Full Name:</strong> {donor.firstName} {donor.lastName}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Date of Birth:</strong> {formatDate(donor.dateOfBirth)}
                    <span className="ml-2 badge badge-pill bg-light text-dark">({calculateAge(donor.dateOfBirth)} years)</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Gender:</strong> {donor.gender}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Blood Group:</strong>
                    <span className="badge badge-pill bg-light text-dark" style={{ fontSize: '1.2rem' }}>
                      {donor.bloodGroup}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Weight:</strong> {donor.weight} kg
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Height:</strong> {donor.height} cm
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={6}>
                <ListGroup className="flush">
                  <ListGroup.Item>
                    <strong>Phone:</strong> {donor.phone}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Email:</strong> {donor.email}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Address:</strong> {donor.address}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Registration Date:</strong> {formatDate(donor.registrationDate)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Last Donation:</strong>
                    {donor.lastDonationDate ? (
                      <span>
                        {formatDate(donor.lastDonationDate)}
                        {donor.nextEligibleDate ? (<><br /><small className="text-muted">
                            Next eligible: {formatDate(donor.nextEligibleDate)}
                          </small></>) : null}
                      </span>
                    ) : (
                      <span className="text-muted">Never donated</span>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Total Donations:</strong> {donor.donationCount}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Eligibility Status:</strong>
                    <span className={`badge badge-pill ${getEligibilityBadgeClass(donor.eligibilityStatus)}`}>
                      {donor.eligibilityStatus}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Account Status:</strong>
                    <span className={`badge badge-pill ${donor.isActive ? 'bg-success' : 'bg-danger'}`}>
                      {donor.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Emergency Contact and Medical History */}
        <Row>
          <Col md={6}>
            <Card className="mb-4 shadow-sm border-0">
              <Card.Header className="bg-white border-bottom">
                <h5 className="mb-0"><FaPhone /> Emergency Contact</h5>
              </Card.Header>
              <Card.Body>
                <ListGroup className="flush">
                  <ListGroup.Item>
                    <strong>Name:</strong> {donor.emergencyContact?.name || 'Not provided'}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Relationship:</strong> {donor.emergencyContact?.relationship || 'Not provided'}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Phone:</strong> {donor.emergencyContact?.phone || 'Not provided'}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4 shadow-sm border-0">
              <Card.Header className="bg-white border-bottom">
                <h5 className="mb-0"><FaIdCard /> Medical History</h5>
              </Card.Header>
              <Card.Body>
                <ListGroup className="flush">
                  <ListGroup.Item>
                    <strong>Conditions:</strong> {donor.medicalHistory?.conditions?.[0] || 'None'}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Allergies:</strong> {donor.medicalHistory?.allergies?.[0] || 'None'}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Medications:</strong> {donor.medicalHistory?.medications?.length > 0 ? donor.medicalHistory.medications.join(', ') : 'None'}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Surgeries:</strong> {donor.medicalHistory?.surgeries?.length > 0 ? donor.medicalHistory.surgeries.join(', ') : 'None'}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Pregnancies:</strong> {donor.medicalHistory?.pregnancies || 0}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default DonorDetailsPage;