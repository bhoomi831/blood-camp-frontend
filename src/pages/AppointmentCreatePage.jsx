import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Row, Col, Form, Alert, Spinner } from 'react-bootstrap';
import { FaArrowLeft, FaCalendarAlt, FaClock, FaUser, FaTint, FaSave } from 'react-icons/fa';
import appointmentService from '../services/appointmentService';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

export default function AppointmentCreatePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    donorName: '', donorId: '', phone: '', email: '', bloodGroup: '',
    campName: '', campId: '', appointmentDate: '', timeSlot: '', type: 'Whole Blood', notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null); setSuccess(null);

    if (!form.donorName || !form.bloodGroup || !form.campName || !form.appointmentDate || !form.timeSlot) {
      setError('Please fill all required fields.');
      setLoading(false);
      return;
    }

    try {
      const res = await appointmentService.createAppointment(form);
      if (res.success) {
        setSuccess('Appointment booked successfully!');
        setTimeout(() => navigate('/appointments'), 1000);
      }
    } catch (err) {
      setError('Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  const bloodGroups = ['A+','A-','B+','B-','AB+','AB-','O+','O-'];
  const timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
  const donationTypes = ['Whole Blood', 'Platelets', 'Plasma', 'Double Red'];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="page-wrapper">
      <motion.div variants={fadeUp} className="mb-4">
        <button onClick={() => navigate('/appointments')} className="btn btn-light d-flex align-items-center gap-2 mb-3" style={{ borderRadius: 8, fontSize: '0.88rem' }}>
          <FaArrowLeft /> Back to Appointments
        </button>
        <h1 className="page-title"><FaCalendarAlt style={{ marginRight: 8 }} />Book Appointment</h1>
        <p className="page-subtitle">Schedule a blood donation appointment</p>
      </motion.div>

      {error && <Alert variant="danger" dismissible onClose={() => setError(null)} style={{ borderRadius: 12 }}>{error}</Alert>}
      {success && <Alert variant="success" style={{ background: '#D1FAE5', border: '1px solid #A7F3D0', color: '#065F46', borderRadius: 12 }}>{success}</Alert>}

      <motion.div variants={fadeUp} className="glass-card p-4">
        <Form onSubmit={handleSubmit}>
          {/* Donor Section */}
          <h5 className="fw-semibold mb-3" style={{ color: '#0F172A' }}>
            <FaUser style={{ marginRight: 6, color: '#E53935' }} /> Donor Information
          </h5>
          <Row className="g-3 mb-4">
            <Col md={4}>
              <Form.Group>
                <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#0F172A' }}>
                  Donor Name <span style={{ color: '#E53935' }}>*</span>
                </Form.Label>
                <Form.Control type="text" name="donorName" value={form.donorName} onChange={handleChange} placeholder="Full name" required
                  style={{ borderRadius: 10, border: '1px solid #E5E7EB', padding: '10px 14px' }} />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#0F172A' }}>Donor ID</Form.Label>
                <Form.Control type="text" name="donorId" value={form.donorId} onChange={handleChange} placeholder="e.g. donor-1"
                  style={{ borderRadius: 10, border: '1px solid #E5E7EB', padding: '10px 14px' }} />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#0F172A' }}>
                  Blood Group <span style={{ color: '#E53935' }}>*</span>
                </Form.Label>
                <Form.Select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} required
                  style={{ borderRadius: 10, border: '1px solid #E5E7EB', padding: '10px 14px', fontSize: '0.9rem' }}>
                  <option value="">Select</option>
                  {bloodGroups.map(g => <option key={g} value={g}>{g}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#0F172A' }}>Donation Type</Form.Label>
                <Form.Select name="type" value={form.type} onChange={handleChange}
                  style={{ borderRadius: 10, border: '1px solid #E5E7EB', padding: '10px 14px', fontSize: '0.9rem' }}>
                  {donationTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#0F172A' }}>Phone</Form.Label>
                <Form.Control type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="555-1234"
                  style={{ borderRadius: 10, border: '1px solid #E5E7EB', padding: '10px 14px' }} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#0F172A' }}>Email</Form.Label>
                <Form.Control type="email" name="email" value={form.email} onChange={handleChange} placeholder="donor@example.com"
                  style={{ borderRadius: 10, border: '1px solid #E5E7EB', padding: '10px 14px' }} />
              </Form.Group>
            </Col>
          </Row>

          {/* Camp Section */}
          <h5 className="fw-semibold mb-3" style={{ color: '#0F172A' }}>
            <FaTint style={{ marginRight: 6, color: '#E53935' }} /> Camp & Schedule
          </h5>
          <Row className="g-3 mb-4">
            <Col md={4}>
              <Form.Group>
                <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#0F172A' }}>
                  Camp <span style={{ color: '#E53935' }}>*</span>
                </Form.Label>
                <Form.Control type="text" name="campName" value={form.campName} onChange={handleChange} placeholder="Camp name"
                  required style={{ borderRadius: 10, border: '1px solid #E5E7EB', padding: '10px 14px' }} />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#0F172A' }}>Camp ID</Form.Label>
                <Form.Control type="text" name="campId" value={form.campId} onChange={handleChange} placeholder="camp-id"
                  style={{ borderRadius: 10, border: '1px solid #E5E7EB', padding: '10px 14px' }} />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#0F172A' }}>
                  <FaCalendarAlt size={12} style={{ marginRight: 4 }} /> Date <span style={{ color: '#E53935' }}>*</span>
                </Form.Label>
                <Form.Control type="date" name="appointmentDate" value={form.appointmentDate} onChange={handleChange} required
                  style={{ borderRadius: 10, border: '1px solid #E5E7EB', padding: '10px 14px' }} />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#0F172A' }}>
                  <FaClock size={12} style={{ marginRight: 4 }} /> Time Slot <span style={{ color: '#E53935' }}>*</span>
                </Form.Label>
                <Form.Select name="timeSlot" value={form.timeSlot} onChange={handleChange} required
                  style={{ borderRadius: 10, border: '1px solid #E5E7EB', padding: '10px 14px', fontSize: '0.9rem' }}>
                  <option value="">Select time</option>
                  {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* Notes */}
          <Form.Group className="mb-4">
            <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#0F172A' }}>Notes</Form.Label>
            <Form.Control as="textarea" name="notes" value={form.notes} onChange={handleChange} rows={2}
              placeholder="Any special notes for the appointment..." style={{ borderRadius: 10, border: '1px solid #E5E7EB', padding: '10px 14px' }} />
          </Form.Group>

          <div className="d-flex gap-3">
            <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="btn btn-danger d-flex align-items-center gap-2" style={{ borderRadius: 12, padding: '12px 28px', fontWeight: 600 }}>
              {loading ? <Spinner animation="border" size="sm" style={{ width: 18, height: 18 }} /> : <FaCalendarAlt />}
              {loading ? 'Booking...' : 'Book Appointment'}
            </motion.button>
            <button type="button" onClick={() => navigate('/appointments')} className="btn btn-light" style={{ borderRadius: 12, padding: '12px 28px' }}>Cancel</button>
          </div>
        </Form>
      </motion.div>
    </motion.div>
  );
}