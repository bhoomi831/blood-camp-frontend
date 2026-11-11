import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { FaUser, FaCalendarAlt, FaTint, FaMale, FaFemale, FaTransgenderAlt, FaIdCard, FaPhone, FaEnvelope, FaMapMarkerAlt, FaIdCardAlt, FaPlusCircle, FaCheckCircle, FaExclamationTriangle, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import donorService from '../../services/donorService';

const DonorRegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    weight: '',
    height: '',
    phone: '',
    email: '',
    address: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
    medicalConditions: '',
    allergies: '',
    medications: '',
    surgeries: '',
    pregnancies: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const genders = ['Male', 'Female', 'Other', 'Prefer not to say'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.dateOfBirth ||
        !formData.gender || !formData.bloodGroup || !formData.phone ||
        !formData.email || !formData.address) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      // Calculate age from date of birth
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      // Prepare donor data for submission
      const donorData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        age: age,
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        weight: parseInt(formData.weight) || 0,
        height: parseInt(formData.height) || 0,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        emergencyContact: {
          name: formData.emergencyContactName,
          phone: formData.emergencyContactPhone,
          relationship: formData.emergencyContactRelationship
        },
        medicalHistory: {
          conditions: formData.medicalConditions ? [formData.medicalConditions] : [],
          allergies: formData.allergies ? [formData.allergies] : [],
          medications: formData.medications ? [formData.medications] : [],
          surgeries: formData.surgeries ? [formData.surgeries] : [],
          pregnancies: formData.pregnancies ? parseInt(formData.pregnancies) : 0
        },
        registrationDate: new Date().toISOString().split('T')[0],
        eligibilityStatus: 'Pending', // Initial status, will be updated after medical screening
        isActive: true,
        donationCount: 0
      };

      const response = await donorService.createDonor(donorData);

      if (response.success) {
        setSuccess('Donor registered successfully! Please complete medical screening to determine eligibility.');
        // Reset form after successful submission
        setFormData({
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          gender: '',
          bloodGroup: '',
          weight: '',
          height: '',
          phone: '',
          email: '',
          address: '',
          emergencyContactName: '',
          emergencyContactPhone: '',
          emergencyContactRelationship: '',
          medicalConditions: '',
          allergies: '',
          medications: '',
          surgeries: '',
          pregnancies: ''
        });
      } else {
        setError(response.error || 'Failed to register donor');
      }
    } catch (err) {
      setError('An error occurred while registering the donor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="donor-register-page min-vh-100 bg-gray-50"
    >
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={8} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="animate__animated animate__fadeInUp"
            >
              <Card className="shadow-sm border-0">
                <Card.Header className="bg-white border-bottom">
                  <h4 className="mb-0">
                    <FaUserPlus /> Register New Donor
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
                      <Link to="/donor-management" className="alert-link">View Donor List</Link>
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="firstName">
                          <Form.Label>First Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            placeholder="Enter first name"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="lastName">
                          <Form.Label>Last Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            placeholder="Enter last name"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="dateOfBirth">
                          <Form.Label>Date of Birth *</Form.Label>
                          <Form.Control
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            required
                            max={new Date().toISOString().split('T')[0]}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="gender">
                          <Form.Label>Gender *</Form.Label>
                          <Form.Control
                            as="select"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select Gender</option>
                            {genders.map(gender => (
                              <option key={gender} value={gender}>
                                {gender}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="bloodGroup">
                          <Form.Label>Blood Group *</Form.Label>
                          <Form.Control
                            as="select"
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select Blood Group</option>
                            {bloodGroups.map(bg => (
                              <option key={bg} value={bg}>
                                {bg}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="weight">
                          <Form.Label>Weight (kg)</Form.Label>
                          <Form.Control
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            min="30"
                            max="200"
                            placeholder="Enter weight in kg"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="height">
                          <Form.Label>Height (cm)</Form.Label>
                          <Form.Control
                            type="number"
                            name="height"
                            value={formData.height}
                            onChange={handleChange}
                            min="100"
                            max="250"
                            placeholder="Enter height in cm"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="phone">
                          <Form.Label>Phone Number *</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="Enter phone number"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="email">
                          <Form.Label>Email Address *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter email address"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="address">
                          <Form.Label>Address *</Form.Label>
                          <Form.Control
                            type="textarea"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            rows="3"
                            placeholder="Enter full address"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4" controlId="emergencyContact">
                      <Form.Label>Emergency Contact Information</Form.Label>
                      <Row>
                        <Col md={4}>
                          <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="emergencyContactName"
                              value={formData.emergencyContactName}
                              onChange={handleChange}
                              placeholder="Emergency contact name"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                              type="tel"
                              name="emergencyContactPhone"
                              value={formData.emergencyContactPhone}
                              onChange={handleChange}
                              placeholder="Emergency contact phone"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group className="mb-3">
                            <Form.Label>Relationship</Form.Label>
                            <Form.Control
                              type="text"
                              name="emergencyContactRelationship"
                              value={formData.emergencyContactRelationship}
                              onChange={handleChange}
                              placeholder="Relationship to donor"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="medicalHistory">
                      <Form.Label>Medical History</Form.Label>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Medical Conditions</Form.Label>
                            <Form.Control
                              type="textarea"
                              name="medicalConditions"
                              value={formData.medicalConditions}
                              onChange={handleChange}
                              rows="2"
                              placeholder="e.g., Diabetes, Hypertension"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Allergies</Form.Label>
                            <Form.Control
                              type="textarea"
                              name="allergies"
                              value={formData.allergies}
                              onChange={handleChange}
                              rows="2"
                              placeholder="e.g., Penicillin, Latex"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Current Medications</Form.Label>
                            <Form.Control
                              type="textarea"
                              name="medications"
                              value={formData.medications}
                              onChange={handleChange}
                              rows="2"
                              placeholder="e.g., Aspirin, Lisinopril"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Past Surgeries</Form.Label>
                            <Form.Control
                              type="textarea"
                              name="surgeries"
                              value={formData.surgeries}
                              onChange={handleChange}
                              rows="2"
                              placeholder="e.g., Appendectomy, Hernia repair"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Number of Pregnancies (if applicable)</Form.Label>
                            <Form.Control
                              type="number"
                              name="pregnancies"
                              value={formData.pregnancies}
                              onChange={handleChange}
                              min="0"
                              max="20"
                              placeholder="Number of pregnancies"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Form.Group>

                    <div className="d-grid gap-2">
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                            <span className="ms-2">Registering...</span>
                          </>
                        ) : (
                          <>
                            <FaUserPlus /> Register Donor
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline-secondary"
                        type="button"
                        onClick={() => {
                          // Reset form
                          setFormData({
                            firstName: '',
                            lastName: '',
                            dateOfBirth: '',
                            gender: '',
                            bloodGroup: '',
                            weight: '',
                            height: '',
                            phone: '',
                            email: '',
                            address: '',
                            emergencyContactName: '',
                            emergencyContactPhone: '',
                            emergencyContactRelationship: '',
                            medicalConditions: '',
                            allergies: '',
                            medications: '',
                            surgeries: '',
                            pregnancies: ''
                          });
                        }}
                      >
                        Reset Form
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
                <Card.Footer className="bg-white border-top">
                  <small className="text-muted">
                    * Required fields. After registration, donors will need to complete a medical screening
                    to determine their eligibility for blood donation.
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

export default DonorRegisterPage;