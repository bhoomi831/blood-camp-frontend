import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Spinner,
  ListGroup,
  Badge,
  Alert,
  Nav
} from "react-bootstrap";
import { FaUser, FaCalendarAlt, FaTint, FaMale, FaFemale, FaPhone, FaEnvelope, FaMapMarkerAlt, FaIdCard, FaPlus, FaEdit, FaSyncAlt, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import donorService from '../../services/donorService';

const DonorProfilePage = () => {
  const [donor, setDonor] = useState(null);
  const [donationHistory, setDonationHistory] = useState([]);
  const [medicalScreenings, setMedicalScreenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // overview, donations, screenings

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
      // Fetch donor details
      const donorResponse = await donorService.getDonorById(`donor-${donorId}`);
      if (donorResponse.success) {
        setDonor(donorResponse.data);
      } else {
        setError(donorResponse.error || 'Failed to load donor');
      }

      // Fetch donation history
      const donationResponse = await donorService.getDonationHistory(`donor-${donorId}`);
      if (donationResponse.success) {
        setDonationHistory(donationResponse.data);
      } else {
        console.warn('Failed to load donation history');
      }

      // Fetch medical screenings
      const screeningResponse = await donorService.getMedicalScreenings(`donor-${donorId}`);
      if (screeningResponse.success) {
        setMedicalScreenings(screeningResponse.data);
      } else {
        console.warn('Failed to load medical screenings');
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
        className="donor-profile-page min-vh-100 bg-gray-50"
      >
        <Container>
          <Row className="justify-content-center align-items-center min-vh-75">
            <Col md="6">
              <div className="alert alert-danger">
                <h4>Invalid Donor ID</h4>
                <p>Please provide a valid donor ID to view the profile.</p>
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
        className="donor-profile-page min-vh-100 bg-gray-50"
      >
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <div className="text-center py-5">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <h4 className="mt-3">Loading donor profile...</h4>
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
        className="donor-profile-page min-vh-100 bg-gray-50"
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
        className="donor-profile-page min-vh-100 bg-gray-50"
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
      className="donor-profile-page min-vh-100 bg-gray-50"
    >
      <Container>
        <Row className="mb-4">
          <Col>
            <h2 className="mb-3">
              Donor Profile: {donor.firstName} {donor.lastName}
              <span className="ml-2 badge badge-pill bg-light text-dark">
                #{donor.id.slice(-4)}
              </span>
            </h2>
            <p className="text-muted">View detailed information about this donor</p>
          </Col>
          <Col className="text-end">
            <Button variant="outline-primary" size="sm" as={Link} to="/donor-management">
              <FaTimesCircle /> Back to Donor List
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

        {/* Tabs */}
        <Card className="mb-4 shadow-sm border-0">
          <Card.Header className="bg-white border-bottom">
            <Nav
  variant="tabs"
  activeKey={activeTab}
  onSelect={(key) => setActiveTab(key)}
>
              <Nav.Item>
                <Nav.Link eventKey="overview">Overview</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="donations">Donation History ({donationHistory.length})</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="screenings">Medical Screenings ({medicalScreenings.length})</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            {activeTab === 'overview' && (
              <Row>
                <Col md={4}>
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Body className="text-center">
                      <h4>Personal Information</h4>
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
                        <ListGroup.Item>
                          <strong>Phone:</strong> {donor.phone}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Email:</strong> {donor.email}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Address:</strong> {donor.address}
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Body className="text-center">
                      <h4>Registration & Eligibility</h4>
                      <ListGroup className="flush">
                        <ListGroup.Item>
                          <strong>Registration Date:</strong> {formatDate(donor.registrationDate)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Eligibility Status:</strong>
                          <span className={`badge badge-pill ${getEligibilityBadgeClass(donor.eligibilityStatus)}`}>
                            {donor.eligibilityStatus}
                          </span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Last Donation:</strong>
                          {donor.lastDonationDate ? (
                            <>
                              {formatDate(donor.lastDonationDate)}
                              {donor.nextEligibleDate ? (
                                <>
                                  <br />
                                  <small className="text-muted">
                                    Next eligible: {formatDate(donor.nextEligibleDate)}
                                  </small>
                                </>
                              ) : null}
                            </>
                          ) : (
                            <span className="text-muted">Never donated</span>
                          )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Total Donations:</strong> {donor.donationCount}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Account Status:</strong>
                          <span className={`badge badge-pill ${donor.isActive ? 'bg-success' : 'bg-danger'}`}>
                            {donor.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Body className="text-center">
                      <h4>Emergency Contact</h4>
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

                      <h4 className="mt-4">Medical History</h4>
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
            )}

            {activeTab === 'donations' && (
              <Row>
                <Col>
                  {donationHistory.length === 0 ? (
                    <div className="text-center py-5">
                      <h5>No donation history found</h5>
                      <p className="text-muted">This donor has not made any donations yet.</p>
                    </div>
                  ) : (
                    <>
                      <h4>Donation History</h4>
                      <Table className="table table-hover table-sm">
                        <thead className="bg-light">
                          <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Blood Group</th>
                            <th>Units</th>
                            <th>Location</th>
                            <th>Health Status</th>
                            <th>Hemoglobin (g/dL)</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {donationHistory.map(donation => (
                            <tr key={donation.id}>
                              <td>{formatDate(donation.donationDate)}</td>
                              <td>{donation.donationTime}</td>
                              <td>
                                <span className="badge badge-pill bg-light text-dark">
                                  {donation.bloodGroup}
                                </span>
                              </td>
                              <td>{donation.unitsCollected}</td>
                              <td>{donation.location}</td>
                              <td>{donation.healthStatus}</td>
                              <td>{donation.hemoglobin}</td>
                              <td>
                                <span className={`badge badge-pill ${
                                  donation.donationStatus === 'Completed'
                                    ? 'bg-success'
                                    : donation.donationStatus === 'Deferred'
                                    ? 'bg-warning'
                                    : 'bg-danger'
                                }`}>
                                  {donation.donationStatus}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </>
                  )}
                </Col>
              </Row>
            )}

            {activeTab === 'screenings' && (
              <Row>
                <Col>
                  {medicalScreenings.length === 0 ? (
                    <div className="text-center py-5">
                      <h5>No medical screenings found</h5>
                      <p className="text-muted">This donor has not undergone any medical screenings yet.</p>
                    </div>
                  ) : (
                    <>
                      <h4>Medical Screening History</h4>
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
                          </tr>
                        </thead>
                        <tbody>
                          {medicalScreenings.map(screening => (
                            <tr key={screening.id}>
                              <td>{formatDate(screening.screeningDate)}</td>
                              <td>{screening.screeningTime}</td>
                              <td>{screening.weight?.toFixed(1) ?? 'N/A'}</td>
                              <td>{screening.height?.toFixed(1) ?? 'N/A'}</td>
                              <td>{screening.bloodPressure}</td>
                              <td>{screening.pulseRate}</td>
                              <td>{screening.hemoglobin?.toFixed(1) ?? 'N/A'}</td>
                              <td>
                                <span className={`badge badge-pill ${
                                  screening.eligibilityStatus === 'Eligible'
                                    ? 'bg-success'
                                    : screening.eligibilityStatus === 'Temporarily Deferred'
                                    ? 'bg-warning'
                                    : 'bg-danger'
                                }`}>
                                  {screening.eligibilityStatus}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </>
                  )}
                </Col>
              </Row>
            )}
          </Card.Body>
        </Card>
      </Container>
    </motion.div>
  );
};


export default DonorProfilePage;