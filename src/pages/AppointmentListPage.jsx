import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Row, Col, Card, Spinner, Alert, Badge, Form, InputGroup, Button } from 'react-bootstrap';
import { FaCalendarAlt, FaSearch, FaPlus, FaPhone, FaEnvelope, FaUser, FaTint, FaClock, FaCheckCircle, FaTimesCircle, FaEye } from 'react-icons/fa';
import appointmentService from '../services/appointmentService';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

const statusColors = { 'Confirmed': '#10B981', 'Pending': '#F59E0B', 'Cancelled': '#EF4444', 'Completed': '#3B82F6', 'No Show': '#6B7280' };

export default function AppointmentListPage() {
  const [appts, setAppts] = useState([]);
  const [stats, setStats] = useState(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [apptRes, statsRes] = await Promise.all([
          appointmentService.getAppointments(),
          appointmentService.getAppointmentStats(),
        ]);
        if (apptRes.success) setAppts(apptRes.data);
        if (statsRes.success) setStats(statsRes.data);
      } catch (err) {
        setError('Failed to load appointments');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = appts.filter(a => {
    const matchesSearch = a.donorName?.toLowerCase().includes(search.toLowerCase()) ||
      a.campName?.toLowerCase().includes(search.toLowerCase()) ||
      a.bloodGroup?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'All' || a.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="page-wrapper d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
        <div className="text-center"><Spinner animation="border" variant="danger" /><p className="text-muted mt-3">Loading appointments...</p></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-wrapper"><Alert variant="danger">{error} <Button size="sm" variant="outline-danger" onClick={() => window.location.reload()}>Retry</Button></Alert></div>
    );
  }

  const statCards = [
    { label: 'Today', value: stats?.todayAppointments ?? 0, color: '#E53935', icon: <FaCalendarAlt /> },
    { label: 'Upcoming', value: stats?.upcomingAppointments ?? 0, color: '#3B82F6', icon: <FaClock /> },
    { label: 'Completed Today', value: stats?.completedToday ?? 0, color: '#10B981', icon: <FaCheckCircle /> },
    { label: 'Cancel Rate', value: stats?.cancellationRate ?? '0%', color: '#EF4444', icon: <FaTimesCircle /> },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="page-wrapper">
      {/* Header */}
      <motion.div variants={fadeUp} className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h1 className="page-title"><FaCalendarAlt style={{ marginRight: 8 }} />Appointment Management</h1>
          <p className="page-subtitle">Schedule and manage blood donation appointments</p>
        </div>
        <a href="/appointments/create" className="btn btn-danger d-flex align-items-center gap-2" style={{ borderRadius: 12, padding: '10px 20px' }}>
          <FaPlus /> Book Appointment
        </a>
      </motion.div>

      {/* Stat Cards */}
      <motion.div variants={fadeUp}>
        <Row className="g-3 mb-4">
          {statCards.map((s, i) => (
            <Col key={i} md={3} xs={6}>
              <div className="glass-card p-3 h-100 d-flex align-items-center gap-3">
                <div className="d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 40, height: 40, borderRadius: 10, background: s.color + '15', color: s.color }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }}>{s.value}</div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </motion.div>

      {/* Filters */}
      <motion.div variants={fadeUp} className="glass-card p-3 mb-4">
        <Row className="g-2 align-items-center">
          <Col md={5}>
            <InputGroup>
              <InputGroup.Text style={{ background: '#F8FAFC', border: '1px solid #E5E7EB', borderRight: 'none' }}>
                <FaSearch size={14} color="#94A3B8" />
              </InputGroup.Text>
              <Form.Control placeholder="Search by donor, camp, blood group..." value={search} onChange={(e) => setSearch(e.target.value)}
                style={{ border: '1px solid #E5E7EB', fontSize: '0.88rem' }} />
            </InputGroup>
          </Col>
          <Col md={4}>
            <Form.Select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ fontSize: '0.88rem', border: '1px solid #E5E7EB' }}>
              <option value="All">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <span className="text-muted" style={{ fontSize: '0.82rem' }}>{filtered.length} appointments</span>
          </Col>
        </Row>
      </motion.div>

      {/* Appointments Table */}
      <motion.div variants={fadeUp} className="glass-card" style={{ overflow: 'hidden' }}>
        {filtered.length > 0 ? (
          <div className="table-responsive">
            <table className="table mb-0" style={{ fontSize: '0.88rem' }}>
              <thead style={{ background: '#F8FAFC', borderBottom: '2px solid #E5E7EB' }}>
                <tr>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase' }}>Donor</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase' }}>Blood Group</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase' }}>Camp</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase' }}>Date</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase' }}>Time</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase' }}>Type</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a, i) => (
                  <motion.tr key={a.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                    style={{ borderBottom: '1px solid #F1F5F9', cursor: 'pointer' }}
                    onClick={() => window.location.href = `/appointments/${a.id}`}
                    onMouseEnter={e => e.currentTarget.style.background = '#FEFAFA'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '12px 16px' }}>
                      <div className="d-flex align-items-center gap-3">
                        <div style={{ width: 36, height: 36, borderRadius: 12, background: '#E5393518', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E53935', fontWeight: 600, fontSize: '0.8rem' }}>
                          {a.donorName?.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div style={{ fontWeight: 500, color: '#0F172A' }}>{a.donorName}</div>
                          <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{a.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <Badge style={{ background: '#E5393518', color: '#E53935', fontWeight: 600, padding: '4px 12px', borderRadius: 8 }}>
                        {a.bloodGroup}
                      </Badge>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#475569' }}><FaTint size={10} style={{ marginRight: 4 }} />{a.campName}</td>
                    <td style={{ padding: '12px 16px', color: '#0F172A', fontWeight: 500 }}>{new Date(a.appointmentDate).toLocaleDateString()}</td>
                    <td style={{ padding: '12px 16px', color: '#0F172A', fontWeight: 500 }}>
                      <FaClock size={10} style={{ marginRight: 4, color: '#94A3B8' }} />{a.timeSlot}
                    </td>
                    <td style={{ padding: '12px 16px', color: '#475569' }}>{a.type}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <Badge style={{ background: statusColors[a.status] + '15', color: statusColors[a.status], fontWeight: 500, fontSize: '0.75rem', padding: '4px 12px', borderRadius: 12 }}>
                        {a.status}
                      </Badge>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div className="d-flex gap-1">
                        <Button size="sm" variant="light" style={{ borderRadius: 8, padding: '4px 10px' }} onClick={(e) => { e.stopPropagation(); window.location.href = `/appointments/${a.id}`; }}>
                          <FaEye size={12} color="#64748B" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-5 text-muted">
            <FaCalendarAlt size={48} style={{ opacity: 0.2, marginBottom: 12 }} />
            <p>No appointments found matching your filters</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

