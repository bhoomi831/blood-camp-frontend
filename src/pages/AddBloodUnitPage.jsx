import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Row, Col, Form, Alert, Spinner, Button as BsBtn } from 'react-bootstrap';
import { FaArrowLeft, FaTint, FaSave, FaFlask, FaCalendarAlt, FaUser } from 'react-icons/fa';
import inventoryService from '../services/inventoryService';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

export default function AddBloodUnitPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    bloodGroup: '', units: 1, donationDate: new Date().toISOString().split('T')[0],
    expiryDate: '', source: '', donorName: '', donorId: '', storageLocation: '',
    temperature: '4.0', hbLevel: '', plateletCount: '', wbcCount: '', notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null); setSuccess(null);

    if (!form.bloodGroup || !form.donorName || !form.source || !form.storageLocation) {
      setError('Please fill all required fields.');
      setLoading(false);
      return;
    }

    try {
      const res = await inventoryService.addBloodUnit(form);
      if (res.success) {
        setSuccess('Blood unit added successfully!');
        setTimeout(() => navigate('/inventory'), 1000);
      }
    } catch (err) {
      setError('Failed to add blood unit');
    } finally {
      setLoading(false);
    }
  };

  const bloodGroups = ['A+','A-','B+','B-','AB+','AB-','O+','O-'];
  const locations = ['Fridge A - Shelf 1', 'Fridge A - Shelf 2', 'Fridge A - Shelf 3', 'Fridge B - Shelf 1', 'Fridge B - Shelf 2', 'Fridge B - Shelf 3', 'Fridge C - Shelf 1', 'Fridge C - Shelf 2', 'Fridge D - Shelf 1', 'Fridge D - Shelf 2'];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="page-wrapper">
      <motion.div variants={fadeUp} className="mb-4">
        <button onClick={() => navigate('/inventory')} className="btn btn-light d-flex align-items-center gap-2 mb-3" style={{ borderRadius: 8, fontSize: '0.88rem' }}>
          <FaArrowLeft /> Back to Inventory
        </button>
        <h1 className="page-title"><FaTint style={{ marginRight: 8 }} />Add Blood Unit</h1>
        <p className="page-subtitle">Register a new blood unit into the inventory system</p>
      </motion.div>

      {error && <Alert variant="danger" dismissible onClose={() => setError(null)} style={{ borderRadius: 12 }}>{error}</Alert>}
      {success && <Alert variant="success" style={{ background: '#D1FAE5', border: '1px solid #A7F3D0', color: '#065F46', borderRadius: 12 }}>{success}</Alert>}

      <motion.div variants={fadeUp} className="glass-card p-4">
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            {/* Blood Group */}
            <Col md={4}>
              <Form.Group>
                <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#0F172A' }}>
                  Blood Group <span style={{ color: '#E53935' }}>*</span>
                </Form.Label>
                <Form.Select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} required style={{ borderRadius: 10, border: '1px solid #E5E7EB', padding: '10px 14px', fontSize: '0.9rem' }}>
                  <option value="">Select blood group</option>
                  {bloodGroups.map(g => <option key={g} value={g}>{g}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Units */}
            <Col md={2}>
              <Form.Group>
                <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#0F172A' }}>Units <span style={{ color: '#E53935' }}>*</span></Form.Label>
                <Form.Control type="number" name="units" value={form.units} onChange={handleChange} min="1" required placeholder="1" style={{ borderRadius: 10, border: '1px solid #E5E7EB', padding: '10px 14px' }} />
              </Form.Group>
            </Col>

            {/* Donation Date */}
            <Col md={3}>
              <Form.Group>
                <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#0F172A' }}>
                  <FaCalendarAlt size={12} style={{ marginRight: 4 }} /> Donation Date
                </Form.Label>
                <Form.Control type="date" name="donationDate" value={form.donationDate} onChange={handleChange} style={{ borderRadius: 10, border: '1px solid #E5E7EB', padding: '10px 14px' }} />
              </Form.Group>
            </Col>

            {/* Expiry Date */}
            <Col md={3}>
              <Form.Group>
                <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#0F172A' }}>
                  <FaCalendarAlt size={12} style={{ marginRight: 4 }} /> Expiry Date <span style={{ color: '#E53935' }}>*</span>
                </Form.Label>
                <Form.Control type="date" name="expiryDate" value={form.expiryDate} onChange={handleChange} required style={{ borderRadius: 10, border: '1px solid #E5E7EB', padding: '10px 14px' }} />
              </Form.Group>
            </Col>

            {/* Donor Name */}
            <Col md={4}>
              <Form.Group>
                <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#0F172A' }}>
                  <FaUser size={12} style={{ marginRight: 4 }} /> Donor Name <span style={{ color: '#E53935' }}>*</span>
                </Form.Label>
                <Form.Control type="text" name="donorName" value={form.donorName} onChange={handleChange} placeholder="Enter donor full name" required style={{ borderRadius: 10, border: '1px solid #E5E7EB', padding: '10px 14px' }} />
              </Form.Group>
            </Col>

            {/* Donor ID */}
            <Col md={4}>
              <Form.Group>
                <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#0F172A' }}>Donor ID</Form.Label>
                <Form.Control type="text" name="donorId" value={form.donorId} onChange={handleChange} placeholder="e.g. donor-1" style={{ borderRadius: 10, border: '1px solid #E5E7EB', padding: '10px 14px' }} />
              </Form.Group>
            </Col>

            {/* Source Camp */}
            <Col md={4}>
              <Form.Group>
                <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#0F172A' }}>Source Camp <span style={{ color: '#E53935' }}>*</span></Form.Label>
                <Form.Control type="text" name="source" value={form.source} onChange={handleChange} placeholder="e.g. City Blood Bank Camp" required style={{ borderRadius: 10, border: '1px solid #E5E7EB', padding: '10px 14px' }} />
              </Form.Group>
            </Col>

            {/* Storage */}
            <Col md={4}>
              <Form.Group>
                <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#0F172A' }}>Storage Location <span style={{ color: '#E53935' }}>*</span></Form.Label>
                <Form.Select name="storageLocation" value={form.storageLocation} onChange={handleChange} required style={{ borderRadius: 10, border: '1px solid #E5E7EB', padding: '10px 14px', fontSize: '0.9rem' }}>
                  <option value="">Select location</option>
                  {locations.map(l => <option key={l} value={l}>{l}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Temperature */}
            <Col md={4}>
              <Form.Group>
                <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#0F172A' }}>Temperature (°C)</Form.Label>
                <Form.Control type="text" name="temperature" value={form.temperature} onChange={handleChange} placeholder="4.0°C" style={{ borderRadius: 10, border: '1px solid #E5E7EB', padding: '10px 14px' }} />
              </Form.Group>
            </Col>

            {/* Hb Level */}
            <Col md={4}>
              <Form.Group>
                <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#0F172A' }}>
                  <FaFlask size={12} style={{ marginRight: 4 }} /> Hemoglobin (g/dL)
                </Form.Label>
                <Form.Control type="text" name="hbLevel" value={form.hbLevel} onChange={handleChange} placeholder="14.5" style={{ borderRadius: 10, border: '1px solid #E5E7EB', padding: '10px 14px' }} />
              </Form.Group>
            </Col>

            {/* Tested For */}
            <Col md={4}>
              <Form.Group>
                <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#0F172A' }}>Safety Tests Passed</Form.Label>
                <div className="d-flex flex-wrap gap-2">
                  {['HIV','Hepatitis B','Hepatitis C','Syphilis','Malaria'].map(t => (
                    <Form.Check key={t} type="checkbox" label={t} id={`test-${t}`} checked defaultChecked style={{ fontSize: '0.82rem', color: '#475569' }} />
                  ))}
                </div>
              </Form.Group>
            </Col>

            {/* Notes */}
            <Col xs={12}>
              <Form.Group>
                <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#0F172A' }}>Notes</Form.Label>
                <Form.Control as="textarea" rows={2} name="notes" value={form.notes} onChange={handleChange} placeholder="Additional notes..." style={{ borderRadius: 10, border: '1px solid #E5E7EB', padding: '10px 14px' }} />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex gap-3 mt-4">
            <button type="submit" disabled={loading} className="btn btn-danger d-flex align-items-center gap-2" style={{ borderRadius: 12, padding: '12px 28px', fontWeight: 600 }}>
              {loading ? <Spinner animation="border" size="sm" style={{ width: 18, height: 18 }} /> : <FaSave />}
              {loading ? 'Adding...' : 'Add Blood Unit'}
            </button>
            <button type="button" onClick={() => navigate('/inventory')} className="btn btn-light" style={{ borderRadius: 12, padding: '12px 28px' }}>Cancel</button>
          </div>
        </Form>
      </motion.div>
    </motion.div>
  );
}