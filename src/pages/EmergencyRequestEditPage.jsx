// src/pages/EmergencyRequestEditPage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner, FormLabel } from 'react-bootstrap';
import { FaUser, FaCalendarAlt, FaTint, FaMale, FaFemale, FaTransgenderAlt, FaIdCard, FaPhone, FaEnvelope, FaMapMarkerAlt, FaIdCardAlt, FaPlusCircle, FaCheckCircle, FaExclamationTriangle, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import emergencyService from '../services/emergencyService';

const EmergencyRequestEditPage = () => {
  const [formData, setFormData] = useState({
    hospitalName: '',
    patientName: '',
    bloodGroupNeeded: '',
    unitsRequired: '',
    urgencyLevel: '',
    dateNeededBy: '',
    hospitalAddress: '',
    city: '',
    state: '',
    zipCode: '',
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true); // Start with loading to fetch data
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const urgencyLevels = ['Low', 'Medium', 'High', 'Critical'];

  // Get request ID from URL
  const [requestId] = useState(() => {
    const path = window.location.pathname;
    const match = path.match(/\/emergency-request\/(\d+)\/edit/);
    return match ? match[1] : null;
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  // Handle select change
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user makes a selection
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.hospitalName.trim()) {
      newErrors.hospitalName = 'Hospital name is required';
    }

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required';
    }

    if (!formData.bloodGroupNeeded) {
      newErrors.bloodGroupNeeded = 'Blood group is required';
    }

    if (!formData.unitsRequired || isNaN(parseInt(formData.unitsRequired)) || parseInt(formData.unitsRequired) <= 0) {
      newErrors.unitsRequired = 'Please enter a valid number of units (1 or more)';
    }

    if (!formData.urgencyLevel) {
      newErrors.urgencyLevel = 'Urgency level is required';
    }

    if (!formData.dateNeededBy) {
      newErrors.dateNeededBy = 'Date needed by is required';
    } else {
      const selectedDate = new Date(formData.dateNeededBy);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.dateNeededBy = 'Date needed by cannot be in the past';
      }
    }

    if (!formData.hospitalAddress.trim()) {
      newErrors.hospitalAddress = 'Hospital address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid 5-digit ZIP code';
    }

    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = 'Contact person is required';
    }

    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = 'Contact phone is required';
    } else if (!/^\d{3}-\d{4}$/.test(formData.contactPhone)) {
      newErrors.contactPhone = 'Please enter a valid phone number in format 555-1234';
    }

    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Contact email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Fetch request data for editing
  const fetchRequestData = async () => {
    if (!requestId) return;

    try {
      const response = await emergencyService.getRequestById(`req-${requestId}`);
      if (response.success) {
        const request = response.data;
        setFormData({
          hospitalName: request.hospitalName,
          patientName: request.patientName,
          bloodGroupNeeded: request.bloodGroupNeeded,
          unitsRequired: request.unitsRequired.toString(),
          urgencyLevel: request.urgencyLevel,
          dateNeededBy: request.dateNeededBy.split('T')[0], // Extract date part for input
          hospitalAddress: request.address,
          city: request.city,
          state: request.state,
          zipCode: request.zipCode,
          contactPerson: request.contactPerson,
          contactPhone: request.contactPhone,
          contactEmail: request.contactEmail,
          notes: request.notes === 'None of the above' ? '' : request.notes
        });
      } else {
        setError(response.error || 'Failed to load request for editing');
      }
    } catch (err) {
      setError('An error occurred while loading request data');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSaving(true);
      setError(null);
      setSuccess(null);

      try {
        const requestData = {
          hospitalName: formData.hospitalName,
          patientName: formData.patientName,
          bloodGroupNeeded: formData.bloodGroupNeeded,
          unitsRequired: parseInt(formData.unitsRequired),
          urgencyLevel: formData.urgencyLevel,
          dateNeededBy: formData.dateNeededBy,
          hospitalAddress: formData.hospitalAddress,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          contactPerson: formData.contactPerson,
          contactPhone: formData.contactPhone,
          contactEmail: formData.contactEmail,
          notes: formData.notes || 'None of the above'
          // Note: We're not updating the status here - that would be a separate action
        };

        const response = await emergencyService.updateRequest(`req-${requestId}`, requestData);
        if (response.success) {
          setSuccess('Emergency request updated successfully!');

          // Redirect to request details after a brief delay
          setTimeout(() => {
            window.location.href = `/emergency-request/${requestId}`;
          }, 1500);
        } else {
          setError(response.error || 'Failed to update emergency request');
        }
      } catch (err) {
        setError('An error occurred while updating the emergency request');
      } finally {
        setIsSaving(false);
      }
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
        className="emergency-request-edit-page min-vh-100 bg-gray-50"
      >
        <Container>
          <Row className="justify-content-center align-items-center min-vh-75">
            <Col md="6">
              <div className="alert alert-danger">
                <h4>Invalid Request ID</h4>
                <p>Please provide a valid request ID to edit.</p>
                <Button color="link" as={Link} to="/emergency-requests">
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
        className="emergency-request-edit-page min-vh-100 bg-gray-50"
      >
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <div className="text-center py-5">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <h4 className="mt-3">Loading request data...</h4>
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
        className="emergency-request-edit-page min-vh-100 bg-gray-50"
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="emergency-request-edit-page min-vh-100 bg-gray-50"
    >
      <Container>
        <Row className="justify-content-center mt-4">
          <Col md={8} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="animate__animated animate__fadeInUp"
            >
              <Card className="shadow-sm border-0">
                <Card.Header className="bg-white border-bottom">
                  <h4 className="mb-0">
                    <FaEdit /> Edit Emergency Blood Request
                    <span className="ms-2 badge bg-light text-dark">
                      #{requestId}
                    </span>
                  </h4>
                </Card.Header>
                <Card.Body>
                  {error && (
                    <Alert variant="danger">
                      {error}
                    </Alert>
                  )}
                  {success && (
                    <Alert variant="success">
                      {success}
                      <br />
                      <Link to={`/emergency-request/${requestId}`} className="alert-link">View Request Details</Link>
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    {/* Hospital Information */}
                    <Row className="mb-4">
                      <Col md={6}>
                        <Form.Group controlId="hospitalName">
                          <Form.Label>Hospital Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="hospitalName"
                            value={formData.hospitalName}
                            onChange={handleChange}
                            isInvalid={!!errors.hospitalName}
                            placeholder="Enter hospital name"
                          />
                          {errors.hospitalName && (
                            <Form.Control.Feedback type="invalid">
                              {errors.hospitalName}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="patientName">
                          <Form.Label>Patient Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="patientName"
                            value={formData.patientName}
                            onChange={handleChange}
                            isInvalid={!!errors.patientName}
                            placeholder="Enter patient name"
                          />
                          {errors.patientName && (
                            <Form.Control.Feedback type="invalid">
                              {errors.patientName}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-4">
                      <Col md={6}>
                        <Form.Group controlId="bloodGroupNeeded">
                          <Form.Label>Blood Group Needed *</Form.Label>
                          <Form.Control
                            as="select"
                            name="bloodGroupNeeded"
                            value={formData.bloodGroupNeeded}
                            onChange={handleSelectChange}
                            isInvalid={!!errors.bloodGroupNeeded}
                          >
                            <option value="">Select blood group</option>
                            {bloodGroups.map(bg => (
                              <option key={bg} value={bg}>
                                {bg}
                              </option>
                            ))}
                          </Form.Control>
                          {errors.bloodGroupNeeded && (
                            <Form.Control.Feedback type="invalid">
                              {errors.bloodGroupNeeded}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="unitsRequired">
                          <Form.Label>Units Required *</Form.Label>
                          <Form.Control
                            type="number"
                            name="unitsRequired"
                            value={formData.unitsRequired}
                            onChange={handleChange}
                            isInvalid={!!errors.unitsRequired}
                            min="1"
                            max="10"
                            placeholder="Enter number of units"
                          />
                          {errors.unitsRequired && (
                            <Form.Control.Feedback type="invalid">
                              {errors.unitsRequired}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-4">
                      <Col md={6}>
                        <Form.Group controlId="urgencyLevel">
                          <Form.Label>Urgency Level *</Form.Label>
                          <Form.Control
                            as="select"
                            name="urgencyLevel"
                            value={formData.urgencyLevel}
                            onChange={handleSelectChange}
                            isInvalid={!!errors.urgencyLevel}
                          >
                            <option value="">Select urgency level</option>
                            {urgencyLevels.map(level => (
                              <option key={level} value={level}>
                                {level}
                              </option>
                            ))}
                          </Form.Control>
                          {errors.urgencyLevel && (
                            <Form.Control.Feedback type="invalid">
                              {errors.urgencyLevel}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="dateNeededBy">
                          <Form.Label>Date Needed By *</Form.Label>
                          <Form.Control
                            type="date"
                            name="dateNeededBy"
                            value={formData.dateNeededBy}
                            onChange={handleChange}
                            isInvalid={!!errors.dateNeededBy}
                            min={new Date().toISOString().split('T')[0]}
                          />
                          {errors.dateNeededBy && (
                            <Form.Control.Feedback type="invalid">
                              {errors.dateNeededBy}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Hospital Address */}
                    <Row className="mb-4">
                      <Col md={6}>
                        <Form.Group controlId="hospitalAddress">
                          <Form.Label>Hospital Address *</Form.Label>
                          <Form.Control
                            type="text"
                            name="hospitalAddress"
                            value={formData.hospitalAddress}
                            onChange={handleChange}
                            isInvalid={!!errors.hospitalAddress}
                            placeholder="Enter hospital address"
                          />
                          {errors.hospitalAddress && (
                            <Form.Control.Feedback type="invalid">
                              {errors.hospitalAddress}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="city">
                          <Form.Label>City *</Form.Label>
                          <Form.Control
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            isInvalid={!!errors.city}
                            placeholder="Enter city"
                          />
                          {errors.city && (
                            <Form.Control.Feedback type="invalid">
                              {errors.city}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-4">
                      <Col md={4}>
                        <Form.Group controlId="state">
                          <Form.Label>State *</Form.Label>
                          <Form.Control
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            isInvalid={!!errors.state}
                            placeholder="Enter state"
                          />
                          {errors.state && (
                            <Form.Control.Feedback type="invalid">
                              {errors.state}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group controlId="zipCode">
                          <Form.Label>ZIP Code *</Form.Label>
                          <Form.Control
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            isInvalid={!!errors.zipCode}
                            placeholder="Enter ZIP code"
                          />
                          {errors.zipCode && (
                            <Form.Control.Feedback type="invalid">
                              {errors.zipCode}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group controlId="hospitalPhone">
                          <Form.Label>Hospital Phone (Optional)</Form.Label>
                          <Form.Control
                            type="tel"
                            name="hospitalPhone"
                            value={formData.hospitalPhone || ''}
                            onChange={handleChange}
                            placeholder="Enter hospital phone number"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Contact Information */}
                    <Row className="mb-4">
                      <Col md={6}>
                        <Form.Group controlId="contactPerson">
                          <Form.Label>Contact Person *</Form.Label>
                          <Form.Control
                            type="text"
                            name="contactPerson"
                            value={formData.contactPerson}
                            onChange={handleChange}
                            isInvalid={!!errors.contactPerson}
                            placeholder="Enter contact person name"
                          />
                          {errors.contactPerson && (
                            <Form.Control.Feedback type="invalid">
                              {errors.contactPerson}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="contactPhone">
                          <Form.Label>Contact Phone *</Form.Label>
                          <Form.Control
                            type="tel"
                            name="contactPhone"
                            value={formData.contactPhone}
                            onChange={handleChange}
                            isInvalid={!!errors.contactPhone}
                            placeholder="Enter contact phone (format: 555-1234)"
                          />
                          {errors.contactPhone && (
                            <Form.Control.Feedback type="invalid">
                              {errors.contactPhone}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-4">
                      <Col md={6}>
                        <Form.Group controlId="contactEmail">
                          <Form.Label>Contact Email *</Form.Label>
                          <Form.Control
                            type="email"
                            name="contactEmail"
                            value={formData.contactEmail}
                            onChange={handleChange}
                            isInvalid={!!errors.contactEmail}
                            placeholder="Enter contact email"
                          />
                          {errors.contactEmail && (
                            <Form.Control.Feedback type="invalid">
                              {errors.contactEmail}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="preferredContactTime">
                          <Form.Label>Preferred Contact Time (Optional)</Form.Label>
                          <Form.Control
                            type="text"
                            name="preferredContactTime"
                            value={formData.preferredContactTime || ''}
                            onChange={handleChange}
                            placeholder="e.g., 9am-5pm"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Additional Notes */}
                    <Form.Group className="mb-4" controlId="notes">
                      <Form.Label>Additional Notes</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Enter any additional notes or requirements"
                      />
                      <Form.Text className="text-muted">
                        Examples: Patient undergoing surgery tomorrow, Patient with rare blood type, Emergency transfusion needed after accident
                      </Form.Text>
                    </Form.Group>

                    {/* Submit Button */}
                    <div className="d-grid gap-2">
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                            <span className="ms-2">Updating Request...</span>
                          </>
                        ) : (
                          <>
                            <FaSave /> Update Request
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline-link"
                        type="button"
                        onClick={() => window.location.href = `/emergency-request/${requestId}`}
                      >
                        <FaTimes /> Cancel and Return to Details
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
                <Card.Footer className="bg-white border-top">
                  <small className="text-muted">
                    * Required fields. Changes will be saved to the existing request.
                  </small>
                </Card.Footer>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default EmergencyRequestEditPage;