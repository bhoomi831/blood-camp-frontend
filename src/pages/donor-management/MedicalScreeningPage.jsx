import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Spinner, ListGroup, Badge, Alert } from 'react-bootstrap';
import { FaUser, FaCalendarAlt, FaTint, FaMale, FaFemale, FaPhone, FaEnvelope, FaMapMarkerAlt, FaIdCard, FaPlus, FaEdit, FaSyncAlt, FaExclamationTriangle, FaTimesCircle, FaStethoscope, FaClipboardList } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import donorService from '../../services/donorService';

const MedicalScreeningPage = () => {
  const [donor, setDonor] = useState(null);
  const [screenings, setScreenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [donorId] = useState(() => {
    const path = window.location.pathname;
    const match = path.match(/\/donor-management\/(\d+)\/medical-screening/);
    return match ? match[1] : null;
  });

  // Fetch donor and screenings data
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch donor details
      const donorResponse = await donorService.getDonorById(`donor-${donorId}`);
      if (donorResponse.success) {
        setDonor(donorResponse.data);
      } else {
        setError(donorResponse.error || 'Failed to load donor');
        return;
      }

      // Fetch medical screenings
      const screeningResponse = await donorService.getMedicalScreenings(`donor-${donorId}`);
      if (screeningResponse.success) {
        setScreenings(screeningResponse.data);
      } else {
        console.warn('Failed to load medical screenings');
        setScreenings([]);
      }
    } catch (err) {
      setError('An error occurred while loading data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (donorId) {
      fetchData();
    }
  }, [donorId]);

  if (!donorId) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="medical-screening-page min-vh-100 bg-gray-50"
      >
        <Container>
          <Row className="justify-content-center align-items-center min-vh-75">
            <Col md="6">
              <div className="alert alert-danger">
                <h4>Invalid Donor ID</h4>
                <p>Please provide a valid donor ID to view medical screenings.</p>
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
        className="medical-screening-page min-vh-100 bg-gray-50"
      >
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <div className="text-center py-5">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <h4 className="mt-3">Loading medical screenings...</h4>
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
        className="medical-screening-page min-vh-100 bg-gray-50"
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
        className="medical-screening-page min-vh-100 bg-gray-50"
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
      className="medical-screening-page min-vh-100 bg-gray-50"
    >
      <Container>
        <Row className="mb-4">
          <Col>
            <h2 className="mb-3">
              Medical Screenings for {donor.firstName} {donor.lastName}
              <span className="ml-2 badge badge-pill bg-light text-dark">
                #{donor.id.slice(-4)}
              </span>
            </h2>
            <p className="text-muted">View the medical screening history of this donor</p>
          </Col>
          <Col className="text-end">
            <Button variant="outline-primary" size="sm" as={Link} to={`/donor-management/${donorId}`}>
              <FaTimesCircle /> Back to Donor Details
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

        {/* Donor Info Card */}
        <Card className="mb-4 shadow-sm border-0">
          <Card.Header className="bg-white border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0"><FaStethoscope /> Donor Information</h5>
            <Button variant="outline-success" size="sm" as={Link} to={`/donor-management/${donorId}/medical-screening/add`}>
              <FaPlus /> Add Screening
            </Button>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                <ListGroup className="flush">
                  <ListGroup.Item>
                    <strong>Name:</strong> {donor.firstName} {donor.lastName}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Age:</strong>
                    {((date) => {
                      if (!date) return 'N/A';
                      const birthDate = new Date(date);
                      const today = new Date();
                      let age = today.getFullYear() - birthDate.getFullYear();
                      const m = today.getMonth() - birthDate.getMonth();
                      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                        age--;
                      }
                      return age;
                    })(donor.dateOfBirth)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Blood Group:</strong>
                    <span className="badge badge-pill bg-light text-dark" style={{ fontSize: '1.2rem' }}>
                      {donor.bloodGroup}
                    </span>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={4}>
                <ListGroup className="flush">
                  <ListGroup.Item>
                    <strong>Current Eligibility:</strong>
                    <span className={`badge badge-pill ${getEligibilityBadgeClass(donor.eligibilityStatus)}`}>
                      {donor.eligibilityStatus}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Last Screening:</strong>
                    {screenings.length > 0 ? (
                      <>
                        {formatDate(screenings[0].screeningDate)}
                        <br />
                        <small className="text-muted">
                          {screenings[0].eligibilityStatus}
                        </small>
                      </>
                    ) : (
                      <span className="text-muted">No screenings</span>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={4}>
                <ListGroup className="flush">
                  <ListGroup.Item>
                    <strong>Total Screenings:</strong> {screenings.length}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Weight:</strong> {donor.weight} kg
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Height:</strong> {donor.height} cm
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Screenings List */}
        {screenings.length === 0 ? (
          <Row className="justify-content-center">
            <Col md="8">
              <div className="text-center py-5">
                <h5>No medical screenings found</h5>
                <p className="text-muted">This donor has not undergone any medical screenings yet.</p>
                <Button variant="outline-primary" as={Link} to={`/donor-management/${donorId}/medical-screening/add`}>
                  Add First Screening
                </Button>
              </div>
            </Col>
          </Row>
        ) : (
          <>
            <Row className="mb-4">
              <Col>
                <h4>Screening History</h4>
                <p className="text-muted">Reverse chronological order (most recent first)</p>
              </Col>
            </Row>
            <Table className="table table-hover table-sm">
              <thead className="bg-light">
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Weight (kg)</th>
                  <th>Height (cm)</th>
                  <th>Blood Pressure</th>
                  <th>Pulse (bpm)</th>
                  <th>Hemoglobin (g/dL)</th>
                  <th>Eligibility</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {screenings.map(screening => (
                  <tr key={screening.id}>
                    <td>{formatDate(screening.screeningDate)}</td>
                    <td>{screening.screeningTime}</td>
                    <td>{screening.weight?.toFixed(1) ?? 'N/A'}</td>
                    <td>{screening.height?.toFixed(1) ?? 'N/A'}</td>
                    <td>{screening.bloodPressure}</td>
                    <td>{screening.pulseRate}</td>
                    <td>{screening.hemoglobin?.toFixed(1) ?? 'N/A'}</td>
                    <td>
                      <span className={`badge badge-pill ${getEligibilityBadgeClass(screening.eligibilityStatus)}`}>
                        {screening.eligibilityStatus}
                      </span>
                    </td>
                    <td>
                      <ButtonGroup size="sm" className="d-flex justify-content-center">
                        <Button
                          variant="outline-primary"
                          as={Link}
                          to={`/donor-management/${donorId}/medical-screening/${screening.id}`}
                          size="sm"
                        >
                          <FaEye /> View
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Container>
    </motion.div>
  );
};

export default MedicalScreeningPage;