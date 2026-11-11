import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { FaRegCalendarPlus, FaUserPlus, FaBuilding, FaMapMarkerAlt, FaClock, FaUsers, FaTint, FaPhone, FaEnvelope, FaIdCard, FaUtensils } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import campManagementService from '../services/campManagementService';

const CampCreatePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    venueId: '',
    venueName: '',
    startDate: '',
    endDate: '',
    expectedDonors: '',
    status: 'planned',
    urgencyLevel: 'medium',
    bloodTypeGoals: {
      'A+': '',
      'A-': '',
      'B+': '',
      'B-': '',
      'AB+': '',
      'AB-': '',
      'O+': '',
      'O-': ''
    },
    organizer: '',
    contactEmail: '',
    contactPhone: '',
    isActive: true
  });
  const [venues, setVenues] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [venuesLoading, setVenuesLoading] = useState(true);
  const [organizationsLoading, setOrganizationsLoading] = useState(true);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle blood type goal change
  const handleBloodTypeChange = (bloodType, e) => {
    setFormData(prev => ({
      ...prev,
      bloodTypeGoals: {
        ...prev.bloodTypeGoals,
        [bloodType]: e.target.value
      }
    }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      venueId: '',
      venueName: '',
      startDate: '',
      endDate: '',
      expectedDonors: '',
      status: 'planned',
      urgencyLevel: 'medium',
      bloodTypeGoals: {
        'A+': '',
        'A-': '',
        'B+': '',
        'B-': '',
        'AB+': '',
        'AB-': '',
        'O+': '',
        'O-': ''
      },
      organizer: '',
      contactEmail: '',
      contactPhone: '',
      isActive: true
    });
    setError(null);
    setSuccess(false);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Prepare data for submission
      const campData = {
        ...formData,
        bloodTypeGoals: {
          'A+': parseInt(formData.bloodTypeGoals['A+']) || 0,
          'A-': parseInt(formData.bloodTypeGoals['A-']) || 0,
          'B+': parseInt(formData.bloodTypeGoals['B+']) || 0,
          'B-': parseInt(formData.bloodTypeGoals['B-']) || 0,
          'AB+': parseInt(formData.bloodTypeGoals['AB+']) || 0,
          'AB-': parseInt(formData.bloodTypeGoals['AB-']) || 0,
          'O+': parseInt(formData.bloodTypeGoals['O+']) || 0,
          'O-': parseInt(formData.bloodTypeGoals['O-']) || 0
        }
      };

      const response = await campManagementService.createCamp(campData);
      if (response.success) {
        setSuccess('Camp created successfully!');
        resetForm();
      } else {
        setError(response.error || 'Failed to create camp');
      }
    } catch (err) {
      setError('An error occurred while creating the camp');
    } finally {
      setLoading(false);
    }
  };

  // Fetch venues for dropdown
  const fetchVenues = async () => {
    setVenuesLoading(true);
    try {
      const response = await campManagementService.getVenues();
      if (response.success) {
        setVenues(response.data);
      } else {
        setError(response.error || 'Failed to load venues');
      }
    } catch (err) {
      setError('An error occurred while loading venues');
    } finally {
      setVenuesLoading(false);
    }
  };

  // Fetch organizations (for now, we'll use a static list or from a service)
  const fetchOrganizations = async () => {
    setOrganizationsLoading(true);
    try {
      // In a real app, this would come from an organization service
      // For now, we'll use a static list
      const orgs = [
        { id: 'org-1', name: 'Organization 1' },
        { id: 'org-2', name: 'Organization 2' },
        { id: 'org-3', name: 'Organization 3' },
        { id: 'org-4', name: 'Organization 4' },
        { id: 'org-5', name: 'Organization 5' }
      ];
      setOrganizations(orgs);
    } catch (err) {
      setError('An error occurred while loading organizations');
    } finally {
      setOrganizationsLoading(false);
    }
  };

  // Load data on component mount
  React.useEffect(() => {
    fetchVenues();
    fetchOrganizations();
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="create-camp-page min-vh-100 bg-gray-50"
      >
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <h4 className="mt-3">Loading form...</h4>
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
      className="create-camp-page min-vh-100 bg-gray-50"
    >
      <Container>
        <Row>
          <Col>
            <h2 className="mb-4">Create New Blood Donation Camp</h2>
            <p className="text-muted">Fill in the details below to create a new blood donation camp</p>
          </Col>
        </Row>

        {/* Success/Error Messages */}
        {success && (
          <Row className="mb-4">
            <Col>
              <Alert variant="success">
                {success}
              </Alert>
            </Col>
          </Row>
        )}
        {error && (
          <Row className="mb-4">
            <Col>
              <Alert variant="danger">
                {error}
              </Alert>
            </Col>
          </Row>
        )}

        <Form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <Card className="mb-4 shadow-sm border-0">
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0"><FaRegCalendarPlus /> Basic Information</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="campName">
                    <Form.Label>Camp Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter camp name"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="organizer">
                    <Form.Label>Organizer *</Form.Label>
                    <Form.Control
                      as="select"
                      name="organizer"
                      value={formData.organizer}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Organization</option>
                      {organizationsLoading ? (
                        <option>Loading...</option>
                      ) : (
                        organizations.map(org => (
                          <option key={org.id} value={org.name}>
                            {org.name}
                          </option>
                        ))
                      )}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe the camp, its purpose, and any special details"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="status">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      as="select"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="planned">Planned</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Venue & Schedule */}
          <Card className="mb-4 shadow-sm border-0">
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0"><FaBuilding /> Venue & Schedule</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="venue">
                    <Form.Label>Venue *</Form.Label>
                    <Form.Control
                      as="select"
                      name="venueId"
                      value={formData.venueId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Venue</option>
                      {venuesLoading ? (
                        <option>Loading...</option>
                      ) : (
                        venues.map(venue => (
                          <option key={venue.id} value={venue.id}>
                            {venue.name}
                          </option>
                        ))
                      )}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="expectedDonors">
                    <Form.Label>Expected Donors *</Form.Label>
                    <Form.Control
                      type="number"
                      name="expectedDonors"
                      value={formData.expectedDonors}
                      onChange={handleChange}
                      required
                      min="1"
                      placeholder="Expected number of donors"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="startDate">
                    <Form.Label>Start Date & Time *</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="endDate">
                    <Form.Label>End Date & Time *</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Contact Information */}
          <Card className="mb-4 shadow-sm border-0">
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0"><FaUserPlus /> Contact Information</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="organizerContact">
                    <Form.Label>Organizer Contact Person</Form.Label>
                    <Form.Control
                      type="text"
                      name="organizer"
                      value={formData.organizer} // Note: This is reusing organizer field for simplicity
                      onChange={handleChange}
                      placeholder="Contact person name"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="contactEmail">
                    <Form.Label>Contact Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      placeholder="contact@example.com"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="contactPhone">
                    <Form.Label>Contact Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      placeholder="Phone number"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="isActive">
                    <Form.Check
                      type="checkbox"
                      label="Active"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Blood Group Requirements */}
          <Card className="mb-4 shadow-sm border-0">
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0"><FaTint /> Blood Group Requirements</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>A+</Form.Label>
                    <Form.Control
                      type="number"
                      name="bloodTypeGoals.A+"
                      value={formData.bloodTypeGoals['A+']}
                      onChange={(e) => handleBloodTypeChange('A+', e)}
                      placeholder="0"
                      min="0"
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>A-</Form.Label>
                    <Form.Control
                      type="number"
                      name="bloodTypeGoals.A-"
                      value={formData.bloodTypeGoals['A-']}
                      onChange={(e) => handleBloodTypeChange('A-', e)}
                      placeholder="0"
                      min="0"
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>B+</Form.Label>
                    <Form.Control
                      type="number"
                      name="bloodTypeGoals.B+"
                      value={formData.bloodTypeGoals['B+']}
                      onChange={(e) => handleBloodTypeChange('B+', e)}
                      placeholder="0"
                      min="0"
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>B-</Form.Label>
                    <Form.Control
                      type="number"
                      name="bloodTypeGoals.B-"
                      value={formData.bloodTypeGoals['B-']}
                      onChange={(e) => handleBloodTypeChange('B-', e)}
                      placeholder="0"
                      min="0"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>AB+</Form.Label>
                    <Form.Control
                      type="number"
                      name="bloodTypeGoals.AB+"
                      value={formData.bloodTypeGoals['AB+']}
                      onChange={(e) => handleBloodTypeChange('AB+', e)}
                      placeholder="0"
                      min="0"
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>AB-</Form.Label>
                    <Form.Control
                      type="number"
                      name="bloodTypeGoals.AB-"
                      value={formData.bloodTypeGoals['AB-']}
                      onChange={(e) => handleBloodTypeChange('AB-', e)}
                      placeholder="0"
                      min="0"
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>O+</Form.Label>
                    <Form.Control
                      type="number"
                      name="bloodTypeGoals.O+"
                      value={formData.bloodTypeGoals['O+']}
                      onChange={(e) => handleBloodTypeChange('O+', e)}
                      placeholder="0"
                      min="0"
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>O-</Form.Label>
                    <Form.Control
                      type="number"
                      name="bloodTypeGoals.O-"
                      value={formData.bloodTypeGoals['O-']}
                      onChange={(e) => handleBloodTypeChange('O-', e)}
                      placeholder="0"
                      min="0"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Form Actions */}
          <Row className="justify-content-end">
            <Col md="auto">
              <Button variant="outline-secondary" type="button" onClick={resetForm}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                    <span className="ms-2">Creating...</span>
                  </>
                ) : (
                  'Create Camp'
                )}
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </motion.div>
  );
};

export default CampCreatePage;