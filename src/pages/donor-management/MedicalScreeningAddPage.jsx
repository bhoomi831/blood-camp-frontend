import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { FaUser, FaCalendarAlt, FaTint, FaStethoscope, FaIdCard, FaPlusCircle, FaCheckCircle, FaTimesCircle, FaClipboardCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import donorService from '../../services/donorService';

const MedicalScreeningAddPage = () => {
  const [formData, setFormData] = useState({
    screeningDate: '',
    screeningTime: '',
    weight: '',
    height: '',
    bloodPressure: '',
    pulseRate: '',
    temperature: '',
    hemoglobin: '',
    hematocrit: '',
    platelets: '',
    whiteBloodCells: '',
    redBloodCells: '',
    fastingGlucose: '',
    cholesterolTotal: '',
    hdlCholesterol: '',
    ldlCholesterol: '',
    triglycerides: '',
    hepatitisBSurface: '',
    hepatitisCAntibody: '',
    hiv12: '',
    syphilis: '',
    eligibilityStatus: '',
    deferralReason: '',
    deferralUntil: '',
    performedBy: '',
    facility: '',
    nextScreeningDue: '',
    consentGiven: false,
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [donorId] = useState(() => {
    const path = window.location.pathname;
    const match = path.match(/\/donor-management\/(\d+)\/medical-screening\/add/);
    return match ? match[1] : null;
  });

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
    if (!formData.screeningDate || !formData.screeningTime ||
        !formData.weight || !formData.height || !formData.bloodPressure ||
        !formData.eligibilityStatus === 'undefined' ||
        formData.eligibilityStatus === '') {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const screeningData = {
        donorId: `donor-${donorId}`,
        screeningDate: formData.screeningDate,
        screeningTime: formData.screeningTime,
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height),
        bloodPressure: formData.bloodPressure,
        pulseRate: parseInt(formData.pulseRate),
        temperature: parseFloat(formData.temperature),
        hemoglobin: parseFloat(formData.hemoglobin),
        hematocrit: parseFloat(formData.hematocrit),
        platelets: parseInt(formData.platelets),
        whiteBloodCells: parseInt(formData.whiteBloodCells),
        redBloodCells: parseFloat(formData.redBloodCells),
        fastingGlucose: formData.fastingGlucose ? parseFloat(formData.fastingGlucose) : null,
        cholesterolTotal: formData.cholesterolTotal ? parseFloat(formData.cholesterolTotal) : null,
        hdlCholesterol: formData.hdlCholesterol ? parseFloat(formData.hdlCholesterol) : null,
        ldlCholesterol: formData.ldlCholesterol ? parseFloat(formData.ldlCholesterol) : null,
        triglycerides: formData.triglycerides ? parseFloat(formData.triglycerides) : null,
        hepatitisBSurface: formData.hepatitisBSurface,
        hepatitisCAntibody: formData.hepatitisCAntibody,
        hiv12: formData.hiv12,
        syphilis: formData.syphilis,
        eligibilityStatus: formData.eligibilityStatus,
        deferralReason: formData.deferralReason || null,
        deferralUntil: formData.deferralUntil || null,
        performedBy: formData.performedBy,
        facility: formData.facility,
        nextScreeningDue: formData.nextScreeningDue,
        consentGiven: formData.consentGiven,
        notes: formData.notes
      };

      const response = await donorService.addMedicalScreening(screeningData);

      if (response.success) {
        setSuccess('Medical screening recorded successfully!');
        // Reset form
        setFormData({
          screeningDate: '',
          screeningTime: '',
          weight: '',
          height: '',
          bloodPressure: '',
          pulseRate: '',
          temperature: '',
          hemoglobin: '',
          hematocrit: '',
          platelets: '',
          whiteBloodCells: '',
          redBloodCells: '',
          fastingGlucose: '',
          cholesterolTotal: '',
          hdlCholesterol: '',
          ldlCholesterol: '',
          triglycerides: '',
          hepatitisBSurface: '',
          hepatitisCAntibody: '',
          hiv12: '',
          syphilis: '',
          eligibilityStatus: '',
          deferralReason: '',
          deferralUntil: '',
          performedBy: '',
          facility: '',
          nextScreeningDue: '',
          consentGiven: false,
          notes: ''
        });
      } else {
        setError(response.error || 'Failed to record medical screening');
      }
    } catch (err) {
      setError('An error occurred while recording the medical screening');
    } finally {
      setLoading(false);
    }
  };

  if (!donorId) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="medical-screening-add-page min-vh-100 bg-gray-50"
      >
        <Container>
          <Row className="justify-content-center align-items-center min-vh-75">
            <Col md="6">
              <div className="alert alert-danger">
                <h4>Invalid Donor ID</h4>
                <p>Please provide a valid donor ID to add a medical screening.</p>
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
        className="medical-screening-add-page min-vh-100 bg-gray-50"
      >
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <div className="text-center py-5">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <h4 className="mt-3">Loading form...</h4>
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
        className="medical-screening-add-page min-vh-100 bg-gray-50"
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
      className="medical-screening-add-page min-vh-100 bg-gray-50"
    >
      <Container>
        <Row className="mb-4">
          <Col>
            <h2 className="mb-3">
              Add Medical Screening
              <span className="ml-2 badge badge-pill bg-light text-dark">
                Donor ID: {donorId}
              </span>
            </h2>
            <p className="text-muted">Record a new medical screening for this donor</p>
          </Col>
          <Col className="text-end">
            <Button variant="outline-primary" size="sm" as={Link} to={`/donor-management/${donorId}/medical-screening`}>
              <FaTimesCircle /> Back to Screenings
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
        {success && (
          <Row className="mb-4">
            <Col>
              <div className="alert alert-success">{success}</div>
            </Col>
          </Row>
        )}

        <Form onSubmit={handleSubmit}>
          <Card className="mb-4 shadow-sm border-0">
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0"><FaStethoscope /> Screening Information</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="screeningDate">
                    <Form.Label>Screening Date *</Form.Label>
                    <Form.Control
                      type="date"
                      name="screeningDate"
                      value={formData.screeningDate}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="screeningTime">
                    <Form.Label>Screening Time *</Form.Label>
                    <Form.Control
                      type="time"
                      name="screeningTime"
                      value={formData.screeningTime}
                      onChange={handleChange}
                      required
                      step="900" /* 15 minutes */
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="weight">
                    <Form.Label>Weight (kg) *</Form.Label>
                    <Form.Control
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      required
                      min="20"
                      max="300"
                      placeholder="Enter weight in kg"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="height">
                    <Form.Label>Height (cm) *</Form.Label>
                    <Form.Control
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      required
                      min="50"
                      max="250"
                      placeholder="Enter height in cm"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="bloodPressure">
                    <Form.Label>Blood Pressure (mmHg) *</Form.Label>
                    <Form.Control
                      type="text"
                      name="bloodPressure"
                      value={formData.bloodPressure}
                      onChange={handleChange}
                      required
                      placeholder="e.g., 120/80"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="pulseRate">
                    <Form.Label>Pulse Rate (bpm) *</Form.Label>
                    <Form.Control
                      type="number"
                      name="pulseRate"
                      value={formData.pulseRate}
                      onChange={handleChange}
                      required
                      min="30"
                      max="200"
                      placeholder="Enter pulse rate"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="temperature">
                    <Form.Label>Temperature (°C)</Form.Label>
                    <Form.Control
                      type="number"
                      name="temperature"
                      value={formData.temperature}
                      onChange={handleChange}
                      step="0.1"
                      min="30"
                      max="45"
                      placeholder="Enter temperature"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="hemoglobin">
                    <Form.Label>Hemoglobin (g/dL)</Form.Label>
                    <Form.Control
                      type="number"
                      name="hemoglobin"
                      value={formData.hemoglobin}
                      onChange={handleChange}
                      step="0.1"
                      min="0"
                      max="25"
                      placeholder="Enter hemoglobin"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="hematocrit">
                    <Form.Label>Hematocrit (%)</Form.Label>
                    <Form.Control
                      type="number"
                      name="hematocrit"
                      value={formData.hematocrit}
                      onChange={handleChange}
                      step="0.1"
                      min="0"
                      max="100"
                      placeholder="Enter hematocrit"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="platelets">
                    <Form.Label>Platelets (per μL)</Form.Label>
                    <Form.Control
                      type="number"
                      name="platelets"
                      value={formData.platelets}
                      onChange={handleChange}
                      min="0"
                      max="1000000"
                      placeholder="Enter platelets count"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="whiteBloodCells">
                    <Form.Label>White Blood Cells (per μL)</Form.Label>
                    <Form.Control
                      type="number"
                      name="whiteBloodCells"
                      value={formData.whiteBloodCells}
                      onChange={handleChange}
                      min="0"
                      max="100000"
                      placeholder="Enter WBC count"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="redBloodCells">
                    <Form.Label>Red Blood Cells (million/μL)</Form.Label>
                    <Form.Control
                      type="number"
                      name="redBloodCells"
                      value={formData.redBloodCells}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      max="10"
                      placeholder="Enter RBC count"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="mb-4 shadow-sm border-0">
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0"><FaClipboardList /> Blood Tests</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="fastingGlucose">
                    <Form.Label>Fasting Glucose (mg/dL)</Form.Label>
                    <Form.Control
                      type="number"
                      name="fastingGlucose"
                      value={formData.fastingGlucose}
                      onChange={handleChange}
                      step="0.1"
                      min="0"
                      max="500"
                      placeholder="Enter fasting glucose"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="cholesterolTotal">
                    <Form.Label>Total Cholesterol (mg/dL)</Form.Label>
                    <Form.Control
                      type="number"
                      name="cholesterolTotal"
                      value={formData.cholesterolTotal}
                      onChange={handleChange}
                      step="0.1"
                      min="0"
                      max="500"
                      placeholder="Enter total cholesterol"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="hdlCholesterol">
                    <Form.Label>HDL Cholesterol (mg/dL)</Form.Label>
                    <Form.Control
                      type="number"
                      name="hdlCholesterol"
                      value={formData.hdlCholesterol}
                      onChange={handleChange}
                      step="0.1"
                      min="0"
                      max="200"
                      placeholder="Enter HDL cholesterol"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="ldlCholesterol">
                    <Form.Label>LDL Cholesterol (mg/dL)</Form.Label>
                    <Form.Control
                      type="number"
                      name="ldlCholesterol"
                      value={formData.ldlCholesterol}
                      onChange={handleChange}
                      step="0.1"
                      min="0"
                      max="200"
                      placeholder="Enter LDL cholesterol"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="triglycerides">
                    <Form.Label>Triglycerides (mg/dL)</Form.Label>
                    <Form.Control
                      type="number"
                      name="triglycerides"
                      value={formData.triglycerides}
                      onChange={handleChange}
                      step="0.1"
                      min="0"
                      max="500"
                      placeholder="Enter triglycerides"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="hepatitisBSurface">
                    <Form.Label>Hepatitis B Surface</Form.Label>
                    <Form.Control
                      as="select"
                      name="hepatitisBSurface"
                      value={formData.hepatitisBSurface}
                      onChange={handleChange}
                    >
                      <option value="">Select Result</option>
                      <option value="Negative">Negative</option>
                      <option value="Positive">Positive</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="hepatitisCAntibody">
                    <Form.Label>Hepatitis C Antibody</Form.Label>
                    <Form.Control
                      as="select"
                      name="hepatitisCAntibody"
                      value={formData.hepatitisCAntibody}
                      onChange={handleChange}
                    >
                      <option value="">Select Result</option>
                      <option value="Negative">Negative</option>
                      <option value="Positive">Positive</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="hiv12">
                    <Form.Label>HIV 1&2</Form.Label>
                    <Form.Control
                      as="select"
                      name="hiv12"
                      value={formData.hiv12}
                      onChange={handleChange}
                    >
                      <option value="">Select Result</option>
                      <option value="Negative">Negative</option>
                      <option value="Positive">Positive</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="syphilis">
                    <Form.Label>Syphilis</Form.Label>
                    <Form.Control
                      as="select"
                      name="syphilis"
                      value={formData.syphilis}
                      onChange={handleChange}
                    >
                      <option value="">Select Result</option>
                      <option value="Negative">Negative</option>
                      <option value="Positive">Positive</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="mb-4 shadow-sm border-0">
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0"><FaCheckCircle /> Eligibility & Notes</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="eligibilityStatus">
                    <Form.Label>Eligibility Status *</Form.Label>
                    <Form.Control
                      as="select"
                      name="eligibilityStatus"
                      value={formData.eligibilityStatus}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="Eligible">Eligible</option>
                      <option value="Temporarily Deferred">Temporarily Deferred</option>
                      <option value="Permanently Deferred">Permanently Deferred</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="deferralReason">
                    <Form.Label>Deferral Reason (if applicable)</Form.Label>
                    <Form.Control
                      type="textarea"
                      name="deferralReason"
                      value={formData.deferralReason}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Reason for deferral"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="deferralUntil">
                    <Form.Label>Deferral Until (if temporarily deferred)</Form.Label>
                    <Form.Control
                      type="date"
                      name="deferralUntil"
                      value={formData.deferralUntil}
                      onChange={handleChange}
                      placeholder="Date until which donor is deferred"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="performedBy">
                    <Form.Label>Performed By</Form.Label>
                    <Form.Control
                      type="text"
                      name="performedBy"
                      value={formData.performedBy}
                      onChange={handleChange}
                      placeholder="Name of medical professional"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="facility">
                    <Form.Label>Facility</Form.Label>
                    <Form.Control
                      type="text"
                      name="facility"
                      value={formData.facility}
                      onChange={handleChange}
                      placeholder="Name of facility"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="nextScreeningDue">
                    <Form.Label>Next Screening Due</Form.Label>
                    <Form.Control
                      type="date"
                      name="nextScreeningDue"
                      value={formData.nextScreeningDue}
                      onChange={handleChange}
                      placeholder="Date for next screening"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3" controlId="consentGiven">
                    <Form.Check
                      type="checkbox"
                      label="Consent Given for Screening and Data Storage"
                      name="consentGiven"
                      checked={formData.consentGiven}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3" controlId="notes">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control
                      type="textarea"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Additional notes"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <div className="d-grid gap-2">
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                  <span className="ms-2">Recording...</span>
                </>
              ) : (
                <>
                  <FaCheckCircle /> Record Screening
                </>
              )}
            </Button>
            <Button
              variant="outline-secondary"
              type="button"
              as={Link}
              to={`/donor-management/${donorId}/medical-screening`}
            >
              <FaTimesCircle /> Cancel
            </Button>
          </div>
        </Form>
      </Container>
    </motion.div>
  );
};

export default MedicalScreeningAddPage;