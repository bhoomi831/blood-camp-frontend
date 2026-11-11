import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Spinner, ListGroup, Badge, Alert } from 'react-bootstrap';
import { FaUser, FaCalendarAlt, FaTint, FaMale, FaFemale, FaPhone, FaEnvelope, FaMapMarkerAlt, FaIdCard, FaPlus, FaEdit, FaSyncAlt, FaExclamationTriangle, FaTimesCircle, FaStethoscope, FaCheckCircle, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import donorService from '../../services/donorService';

const EligibilityStatusPage = () => {
  const [donor, setDonor] = useState(null);
  const [screenings, setScreenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [donorId] = useState(() => {
    const path = window.location.pathname;
    const match = path.match(/\/donor-management\/(\d+)\/eligibility/);
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

      // Fetch medical screenings (to determine eligibility history)
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
        className="eligibility-status-page min-vh-100 bg-gray-50"
      >
        <Container>
          <Row className="justify-content-center align-items-center min-vh-75">
            <Col md="6">
              <div className="alert alert-danger">
                <h4>Invalid Donor ID</h4>
                <p>Please provide a valid donor ID to view eligibility status.</p>
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
        className="eligibility-status-page min-vh-100 bg-gray-50"
      >
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <div className="text-center py-5">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <h4 className="mt-3">Loading eligibility status...</h4>
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
        className="eligibility-status-page min-vh-100 bg-gray-50"
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
        className="eligibility-status-page min-vh-100 bg-gray-50"
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
      case 'Pending': return 'bg-info';
      default: return 'bg-secondary';
    }
  };

  // Get the most recent screening to determine eligibility status (if available)
  const mostRecentScreening = screenings.length > 0 ? screenings[0] : null;
  // Use the screening eligibility if available, otherwise use the donor's eligibility status
  const eligibilityStatus = mostRecentScreening ? mostRecentScreening.eligibilityStatus : donor.eligibilityStatus;

  // Determine eligibility status reason (deferral reason if applicable)
  const deferralReason = mostRecentScreening && mostRecentScreening.deferralReason
    ? mostRecentScreening.deferralReason
    : (donor.eligibilityStatus !== 'Eligible' ? 'Reason not specified' : null);

  // Determine next eligible date if temporarily deferred
  const nextEligibleDate = mostRecentScreening && mostRecentScreening.deferralUntil
    ? mostRecentScreening.deferralUntil
    : (donor.nextEligibleDate || null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="eligibility-status-page min-vh-100 bg-gray-50"
    >
      <Container>
        <Row className="mb-4">
          <Col>
            <h2 className="mb-3">
              Eligibility Status for {donor.firstName} {donor.lastName}
              <span className="ml-2 badge badge-pill bg-light text-dark">
                #{donor.id.slice(-4)}
              </span>
            </h2>
            <p className="text-muted">View the current eligibility status and history for this donor</p>
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
            <h5 className="mb-0"><Stethoscope /> Donor Overview</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                <ListGroup className="flush">
                  <ListGroup.Item>
                    <strong>Name:</strong> {donor.firstName} {donor.lastName}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Date of Birth:</strong> {formatDate(donor.dateOfBirth)}
                    <span className="ml-2 badge badge-pill bg-light text-dark">({((date) => {
                      if (!date) return 'N/A';
                      const birthDate = new Date(date);
                      const today = new Date();
                      let age = today.getFullYear() - birthDate.getFullYear();
                      const m = today.getMonth() - birthDate.getMonth();
                      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                        age--;
                      }
                      return age;
                    })(donor.dateOfBirth)} years)</span>
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
                    <span className={`badge badge-pill ${getEligibilityBadgeClass(eligibilityStatus)}`}>
                      {eligibilityStatus}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Last Updated:</strong>
                    {mostRecentScreening ? formatDate(mostRecentScreening.screeningDate) : formatDate(donor.registrationDate)}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={4}>
                <ListGroup className="flush">
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

        {/* Eligibility Status Detail */}
        <Card className="mb-4 shadow-sm border-0">
          <Card.Header className="bg-white border-bottom">
            <h5 className="mb-0"><CheckCircle /> Eligibility Details</h5>
          </Card.Header>
          <Card.Body>
            {eligibilityStatus === 'Eligible' ? (
              <div className="alert alert-success">
                <h4>This donor is currently eligible to donate blood.</h4>
                <p>They meet all the necessary health and safety requirements for donation.</p>
              </div>
            ) : eligibilityStatus === 'Temporarily Deferred' ? (
              <>
                <div className="alert alert-warning">
                  <h4>This donor is temporarily deferred from donation.</h4>
                  <p>Reason: {deferralReason}</p>
                  {nextEligibleDate ? (
                    <p>
                      <strong>Next eligible date:</strong> {formatDate(nextEligibleDate)}
                    </p>
                  ) : null}
                </div>
                <p className="text-muted">
                  Temporary deferrals are usually due to temporary health conditions, medication,
      recent travel, or other temporary factors. The donor should re-evaluate their eligibility
      on or after the next eligible date.
                </p>
              </>
            ) : eligibilityStatus === 'Permanently Deferred' ? (
              <>
                <div className="alert alert-danger">
                  <h4>This donor is permanently deferred from donation.</h4>
                  <p>Reason: {deferralReason}</p>
                </div>
                <p className="text-muted">
                  Permanent deferral is due to medical conditions that make blood donation
      unsafe for the donor or recipients. This donor will not be eligible for future donations.
                </p>
              </>
            ) : (
              <div className="alert alert-info">
                <h4>Eligibility status is pending.</h4>
                <p>This donor has not yet completed a medical screening to determine eligibility.</p>
                <Button variant="outline-primary" as={Link} to={`/donor-management/${donorId}/medical-screening/add`}>
                  <Plus /> Schedule Medical Screening
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>

        {/* Eligibility History */}
        <Card className="mb-4 shadow-sm border-0">
          <Card.Header className="bg-white border-bottom">
            <h5 className="mb-0"><ClipboardList /> Eligibility History</h5>
          </Card.Header>
          <Card.Body>
            {screenings.length === 0 ? (
              <div className="text-center py-4">
                <p>No medical screening records found for this donor.</p>
                {donor.eligibilityStatus === 'Pending' && (
                  <Button variant="outline-primary" as={Link} to={`/donor-management/${donorId}/medical-screening/add`}>
                    <Plus /> Add First Screening
                  </Button>
                )}
              </div>
            ) : (
              <Table className="table table-hover table-sm">
                <thead className="bg-light">
                  <tr>
                    <th>Date</th>
                    <th>Eligibility Status</th>
                    <th>Hemoglobin (g/dL)</th>
                    <th>Blood Pressure</th>
                    <th>Deferral Reason</th>
                    <th>Next Eligible</th>
                  </tr>
                </thead>
                <tbody>
                  {screenings.map(screening => (
                    <tr key={screening.id}>
                      <td>{formatDate(screening.screeningDate)}</td>
                      <td>
                        <span className={`badge badge-pill ${getEligibilityBadgeClass(screening.eligibilityStatus)}`}>
                          {screening.eligibilityStatus}
                        </span>
                      </td>
                      <td>{screening.hemoglobin?.toFixed(1) ?? 'N/A'}</td>
                      <td>{screening.bloodPressure}</td>
                      <td>{screening.deferralReason || '-'}</td>
                      <td>{screening.deferralUntil ? formatDate(screening.deferralUntil) : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>

        {/* Action Button */}
        <div className="text-center">
          {eligibilityStatus !== 'Eligible' && (
            <Button variant="outline-primary" as={Link} to={`/donor-management/${donorId}/medical-screening/add`}>
              <Plus /> Schedule New Screening
            </Button>
          )}
          {eligibilityStatus === 'Eligible' && (
            <Button variant="outline-success" as={Link} to={`/donor-management/${donorId}/donation-history`}>
              <Plus /> Record Donation
            </Button>
          )}
        </div>
      </Container>
    </motion.div>
  );
};

export default EligibilityStatusPage;