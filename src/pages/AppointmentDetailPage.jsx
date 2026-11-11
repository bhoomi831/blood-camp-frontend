import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Row, Col, Card, Spinner, Alert, Badge, Button } from 'react-bootstrap';
import { FaArrowLeft, FaCalendarAlt, FaClock, FaUser, FaTint, FaPhone, FaEnvelope, FaCheckCircle, FaTimesCircle, FaEdit, FaCampground } from 'react-icons/fa';
import appointmentService from '../services/appointmentService';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

const statusColors = { 'Confirmed': '#10B981', 'Pending': '#F59E0B', 'Completed': '#3B82F6', 'Cancelled': '#EF4444', 'No Show': '#6B7280' };

export default function AppointmentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appt, setAppt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await appointmentService.getAppointmentById(id);
        if (res.success) setAppt(res.data);
        else setError('Appointment not found');
      } catch (err) {
        setError('Failed to load appointment');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="page-wrapper d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
        <div className="text-center"><Spinner animation="border" variant="danger" /><p className="text-muted mt-3">Loading appointment details...</p></div>
      </div>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="page-wrapper">
      <motion.div variants={fadeUp} className="mb-4">
        <button onClick={() => navigate('/appointments')} className="btn btn-light d-flex align-items-center gap-2 mb-3" style={{ borderRadius: 8, fontSize: '0.88rem' }}>
          <FaArrowLeft /> Back to Appointments
        </button>
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <h1 className="page-title">Appointment #{id}</h1>
            <p className="page-subtitle">Blood donation appointment details</p>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-danger d-flex align-items-center gap-2" style={{ borderRadius: 8 }} onClick={() => navigate(`/appointments/${id}/edit`)}>
              <FaEdit /> Edit
            </button>
          </div>
        </div>
      </motion.div>

      {error && <Alert variant="danger">{error}</Alert>}

      {appt && (
        <Row className="g-4">
          <Col lg={8}>
            {/* Status Banner */}
            <motion.div variants={fadeUp} className="glass-card p-4 mb-4">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #E53935, #C62828)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.3rem', fontWeight: 700, boxShadow: '0 4px 16px rgba(229,57,53,0.3)' }}>
                    {appt.donorName?.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, margin: 0, color: '#0F172A' }}>{appt.donorName}</h4>
                    <div style={{ color: '#64748B', fontSize: '0.88rem' }}><FaUser size={10} style={{ marginRight: 4 }} />{appt.donorId || 'N/A'}</div>
                  </div>
                </div>
                <Badge className="d-flex align-items-center gap-2 px-4 py-2" style={{ background: statusColors[appt.status] + '15', color: statusColors[appt.status], fontWeight: 600, fontSize: '0.85rem', borderRadius: 12 }}>
                  {appt.status === 'Confirmed' ? <FaCheckCircle /> : appt.status === 'Cancelled' ? <FaTimesCircle /> : null}
                  {appt.status}
                </Badge>
              </div>
            </motion.div>

            {/* Details */}
            <motion.div variants={fadeUp} className="glass-card p-4 mb-4">
              <h5 className="fw-semibold mb-3" style={{ color: '#0F172A' }}><FaCalendarAlt size={14} style={{ marginRight: 6, color: '#E53935' }} />Appointment Details</h5>
              <Row className="g-3">
                {[
                  { label: 'Blood Group', value: appt.bloodGroup, icon: <FaTint size={12} />, highlight: true },
                  { label: 'Donation Type', value: appt.type, icon: <FaTint size={12} /> },
                  { label: 'Date', value: new Date(appt.appointmentDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }), icon: <FaCalendarAlt size={12} /> },
                  { label: 'Time Slot', value: appt.timeSlot, icon: <FaClock size={12} /> },
                  { label: 'Camp', value: appt.campName, icon: <FaCampground size={12} /> },
                  { label: 'Phone', value: appt.phone, icon: <FaPhone size={12} /> },
                  { label: 'Email', value: appt.email, icon: <FaEnvelope size={12} /> },
                  { label: 'Last Donation', value: appt.lastDonation ? new Date(appt.lastDonation).toLocaleDateString() : 'N/A', icon: <FaCalendarAlt size={12} /> },
                  { label: 'Eligibility', value: appt.eligibility, icon: <FaCheckCircle size={12} />, highlight: appt.eligibility === 'Eligible' },
                  { label: 'Created', value: new Date(appt.createdDate).toLocaleDateString(), icon: <FaCalendarAlt size={12} /> },
                  { label: 'Confirmed', value: appt.confirmedDate ? new Date(appt.confirmedDate).toLocaleDateString() : 'Pending', icon: <FaCheckCircle size={12} /> },
                ].map((d, i) => (
                  <Col key={i} sm={6} md={4}>
                    <div className="p-2 rounded-2" style={{ background: '#F8FAFC', border: '1px solid #E5E7EB' }}>
                      <div style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
                        {d.icon} {d.label}
                      </div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: d.highlight ? '#E53935' : '#0F172A' }}>
                        {d.value}
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
              {appt.notes && (
                <div className="mt-3 p-3 rounded-2" style={{ background: '#ffEBEE', fontSize: '0.85rem', color: '#C62828' }}>
                  📝 {appt.notes}
                </div>
              )}
            </motion.div>
          </Col>

          <Col lg={4}>
            <motion.div variants={fadeUp} className="glass-card p-4 mb-4">
              <h5 className="fw-semibold mb-3" style={{ color: '#0F172A' }}>Quick Actions</h5>
              <div className="d-flex flex-column gap-2">
                {appt.status === 'Confirmed' && (
                  <button className="btn btn-success w-100 text-start d-flex align-items-center gap-2" style={{ borderRadius: 8 }}>
                    <FaCheckCircle /> Mark as Completed
                  </button>
                )}
                {(appt.status === 'Confirmed' || appt.status === 'Pending') && (
                  <button className="btn btn-outline-danger w-100 text-start d-flex align-items-center gap-2" style={{ borderRadius: 8 }}>
                    <FaTimesCircle /> Cancel Appointment
                  </button>
                )}
                <button className="btn btn-outline-danger w-100 text-start d-flex align-items-center gap-2" style={{ borderRadius: 8 }}>
                  <FaEdit /> Reschedule
                </button>
                <button className="btn btn-outline-secondary w-100 text-start d-flex align-items-center gap-2" style={{ borderRadius: 8 }}>
                  <FaEnvelope /> Send Reminder
                </button>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="glass-card p-4">
              <h5 className="fw-semibold mb-3" style={{ color: '#0F172A' }}>Donor Summary</h5>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex justify-content-between align-items-center p-2" style={{ background: '#F8FAFC', borderRadius: 8 }}>
                  <span style={{ color: '#64748B', fontSize: '0.85rem' }}>Blood Group</span>
                  <Badge style={{ background: '#E5393518', color: '#E53935', fontWeight: 600 }}>{appt.bloodGroup}</Badge>
                </div>
                <div className="d-flex justify-content-between align-items-center p-2" style={{ background: '#F8FAFC', borderRadius: 8 }}>
                  <span style={{ color: '#64748B', fontSize: '0.85rem' }}>Eligibility</span>
                  <Badge style={{ background: appt.eligibility === 'Eligible' ? '#10B98118' : '#EF444418', color: appt.eligibility === 'Eligible' ? '#10B981' : '#EF4444' }}>
                    {appt.eligibility}
                  </Badge>
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>
      )}
    </motion.div>
  );
}