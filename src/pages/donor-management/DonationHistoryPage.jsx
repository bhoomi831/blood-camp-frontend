import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Spinner, ListGroup, Badge, Alert } from 'react-bootstrap';
import { FaUser, FaCalendarAlt, FaTint, FaMale, FaFemale, FaPhone, FaEnvelope, FaMapMarkerAlt, FaIdCard, FaPlus, FaEdit, FaSyncAlt, FaExclamationTriangle, FaTimesCircle, FaChartLine, FaChartBar, FaChartArea, FaPlusCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import donorService from '../../services/donorService';

const DonationHistoryPage = () => {
  const [donor, setDonor] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    status: ''
  });

  const [donorId] = useState(() => {
    const path = window.location.pathname;
    const match = path.match(/\/donor-management\/(\d+)\/donation-history/);
    return match ? match[1] : null;
  });

  // Fetch donor and donations data
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

      // Fetch donation history
      const donationResponse = await donorService.getDonationHistory(`donor-${donorId}`);
      if (donationResponse.success) {
        setDonations(donationResponse.data);
      } else {
        console.warn('Failed to load donation history');
        setDonations([]);
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
  }, [donorId, filters]);

  if (!donorId) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="donation-history-page min-vh-100 bg-gray-50"
      >
        <Container>
          <Row className="justify-content-center align-items-center min-vh-75">
            <Col md="6">
              <div className="alert alert-danger">
                <h4>Invalid Donor ID</h4>
                <p>Please provide a valid donor ID to view donation history.</p>
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
        className="donation-history-page min-vh-100 bg-gray-50"
      >
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <div className="text-center py-5">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <h4 className="mt-3">Loading donation history...</h4>
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
        className="donation-history-page min-vh-100 bg-gray-50"
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
        className="donation-history-page min-vh-100 bg-gray-50"
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

  // Helper function to get donation status badge class
  const getDonationStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed': return 'bg-success';
      case 'Deferred': return 'bg-warning';
      case 'Reaction': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  // Filter donations based on filters
  const filteredDonations = donations.filter(donation => {
    if (filters.startDate && new Date(donation.donationDate) < new Date(filters.startDate)) {
      return false;
    }
    if (filters.endDate && new Date(donation.donationDate) > new Date(filters.endDate)) {
      return false;
    }
    if (filters.status && donation.donationStatus !== filters.status) {
      return false;
    }
    return true;
  }).sort((a, b) => new Date(b.donationDate) - new Date(a.donationDate)); // Most recent first

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="donation-history-page min-vh-100 bg-gray-50"
    >
      <Container>
        <Row className="mb-4">
          <Col>
            <h2 className="mb-3">
              Donation History for {donor.firstName} {donor.lastName}
              <span className="ml-2 badge badge-pill bg-light text-dark">
                #{donor.id.slice(-4)}
              </span>
            </h2>
            <p className="text-muted">View all donation records for this donor</p>
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
            <h5 className="mb-0"><FaChartLine /> Donor Overview</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                <ListGroup className="flush">
                  <ListGroup.Item>
                    <strong>Total Donations:</strong> {donor.donationCount}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Last Donation:</strong>
                    {donor.lastDonationDate ? formatDate(donor.lastDonationDate) : <span className="text-muted">Never</span>}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={4}>
                <ListGroup className="flush">
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
              <Col md={4}>
                <ListGroup className="flush">
                  <ListGroup.Item>
                    <strong>Eligibility Status:</strong>
                    <span className={`badge badge-pill ${donor.eligibilityStatus === 'Eligible' ? 'bg-success' : donor.eligibilityStatus === 'Temporarily Deferred' ? 'bg-warning' : 'bg-danger'}`}>
                      {donor.eligibilityStatus}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Gender:</strong> {donor.gender}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Filters Section */}
        <Card className="mb-4 shadow-sm border-0">
          <Card.Header className="bg-white border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0"><FaFilter /> Filters</h5>
            <Button
              variant="link"
              size="sm"
              onClick={() => {
                setFilters({ startDate: '', endDate: '', status: '' });
              }}
              className="text-muted p-0"
            >
              Reset
            </Button>
          </Card.Header>
          <Card.Body>
            <Row>
              {/* Start Date */}
              <Col md={4} sm={6} mb-3>
                <Form.Group controlId="startDate">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                  />
                </Form.Group>
              </Col>

              {/* End Date */}
              <Col md={4} sm={6} mb-3>
                <Form.Group controlId="endDate">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={filters.endDate}
                    onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                  />
                </Form.Group>
              </Col>

              {/* Status */}
              <Col md={4} sm={6} mb-3>
                <Form.Group controlId="status">
                  <Form.Label>Donation Status</Form.Label>
                  <Form.Control
                    as="select"
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  >
                    <option value="">All Statuses</option>
                    <option value="Completed">Completed</option>
                    <option value="Deferred">Deferred</option>
                    <option value="Reaction">Reaction</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Donations List */}
        {filteredDonations.length === 0 ? (
          <Row className="justify-content-center">
            <Col md="8">
              <div className="text-center py-5">
                <h5>No donation records found</h5>
                <p className="text-muted">This donor has not made any donations yet, or no records match the current filters.</p>
                {!donations.length && (
                  <Button variant="outline-primary" as={Link} to={`/donor-management/${donorId}/donation/add`}>
                    Record First Donation
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        ) : (
          <>
            <Row className="mb-4">
              <Col>
                <h4>Donation Records ({filteredDonations.length} total)</h4>
                <p className="text-muted">Reverse chronological order (most recent first)</p>
              </Col>
            </Row>
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
                  <th>Blood Pressure</th>
                  <th>Pulse (bpm)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonations.map(donation => (
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
                    <td>{donation.bloodPressure}</td>
                    <td>{donation.pulseRate}</td>
                    <td>
                      <span className={`badge badge-pill ${getDonationStatusBadgeClass(donation.donationStatus)}`}>
                        {donation.donationStatus}
                      </span>
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

export default DonationHistoryPage;