import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Row, Col, Card, Spinner, Alert, Badge, Button, Table } from 'react-bootstrap';
import { FaArrowLeft, FaBuilding, FaPhone, FaEnvelope, FaMapMarkerAlt, FaProcedures, FaTint, FaExclamationTriangle, FaEdit, FaCalendarAlt } from 'react-icons/fa';
import hospitalService from '../services/hospitalService';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

export default function HospitalDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await hospitalService.getHospitalById(id);
        if (res.success) setHospital(res.data);
        else setError('Hospital not found');
      } catch (err) {
        setError('Failed to load hospital data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="page-wrapper d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
        <div className="text-center"><Spinner animation="border" variant="danger" /><p className="text-muted mt-3">Loading hospital details...</p></div>
      </div>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="page-wrapper">
      <motion.div variants={fadeUp} className="mb-4">
        <button onClick={() => navigate('/hospitals')} className="btn btn-light d-flex align-items-center gap-2 mb-3" style={{ borderRadius: 8, fontSize: '0.88rem' }}>
          <FaArrowLeft /> Back to Hospitals
        </button>
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <h1 className="page-title">{hospital?.name}</h1>
            <p className="page-subtitle"><FaMapMarker size={12} style={{marginRight:4}} />{hospital?.address}, {hospital?.city}, {hospital?.state}</p>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-danger d-flex align-items-center gap-2" style={{ borderRadius: 8 }} onClick={() => navigate(`/hospitals/${id}/edit`)}>
              <FaEdit /> Edit
            </button>
          </div>
        </div>
      </motion.div>

      {error && <Alert variant="danger">{error}</Alert>}

      {hospital && (
        <Row className="g-4">
          {/* Main Info */}
          <Col lg={8}>
            <motion.div variants={fadeUp} className="glass-card p-4 mb-4">
              <div className="d-flex align-items-start gap-3 mb-4">
                <div style={{ width: 72, height: 72, borderRadius: 16, background: 'linear-gradient(135deg, #E53935, #C62828)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.8rem', boxShadow: '0 4px 16px rgba(229,57,53,0.3)' }}>
                  <FaBuilding />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, margin: 0, color: '#0F172A' }}>{hospital.name}</h4>
                  <div style={{ color: '#64748B', fontSize: '0.88rem', marginTop: 4 }}>{hospital.type}</div>
                  <div className="d-flex gap-2 mt-2">
                    <Badge style={{ background: hospital.isActive ? '#10B98118' : '#EF444418', color: hospital.isActive ? '#10B981' : '#EF4444', fontSize: '0.75rem', padding: '4px 12px', borderRadius: 8 }}>
                      {hospital.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                    {hospital.bloodBank && <Badge style={{ background: '#E5393518', color: '#E53935', fontSize: '0.75rem', padding: '4px 12px', borderRadius: 8 }}><FaTint size={10} style={{marginRight:4}} />Blood Bank</Badge>}
                    {hospital.emergencyDept && <Badge style={{ background: '#EF444415', color: '#EF4444', fontSize: '0.75rem', padding: '4px 12px', borderRadius: 8 }}>🚨 Emergency Dept</Badge>}
                  </div>
                </div>
              </div>

              <Row className="g-3">
                <Col sm={6}>
                  <div className="p-3 rounded-3" style={{ background: '#F8FAFC', border: '1px solid #E5E7EB' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 500, textTransform: 'uppercase' }}>Contact Person</div>
                    <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '0.95rem' }}>{hospital.contactPerson}</div>
                    <div style={{ fontSize: '0.82rem', color: '#475569' }}>{hospital.contactPhone} | {hospital.contactEmail}</div>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="p-3 rounded-3" style={{ background: '#F8FAFC', border: '1px solid #E5E7EB' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase' }}>Hospital Info</div>
                    <div className="d-flex gap-3">
                      <div><span style={{ fontSize: '0.72rem', color:'#94A3B8' }}>Beds</span><div style={{fontWeight:600, color:'#0F172A'}}>{hospital.bedCount}</div></div>
                      <div><span style={{ fontSize: '0.72rem', color:'#94A3B8' }}>Phone</span><div style={{fontWeight:600, color:'#0F172A'}}>{hospital.phone}</div></div>
                      <div><span style={{ fontSize: '0.72rem', color:'#94A3B8' }}>Email</span><div style={{fontWeight:600, color:'#0F172A'}}>{hospital.email}</div></div>
                    </div>
                  </div>
                </Col>
              </Row>
            </motion.div>

            {/* Blood Usage Stats */}
            {hospital.bloodUsageStats && (
              <motion.div variants={fadeUp} className="glass-card p-4 mb-4">
                <h5 className="fw-semibold mb-3" style={{ color: '#0F172A' }}>
                  <FaTint size={14} style={{ marginRight: 6, color: '#E53935' }} /> Blood Usage Statistics
                </h5>
                <Table size="sm" className="mb-0" style={{ fontSize: '0.85rem' }}>
                  <thead style={{ background: '#F8FAFC' }}>
                    <tr>
                      <th style={{ padding: '8px 12px' }}>Blood Group</th>
                      <th style={{ padding: '8px 12px' }}>Requested</th>
                      <th style={{ padding: '8px 12px' }}>Fulfilled</th>
                      <th style={{ padding: '8px 12px' }}>Fulfillment Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hospital.bloodUsageStats.map((blood, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '8px 12px' }}>
                          <Badge style={{ background: '#E5393518', color: '#E53935', fontWeight: 600, borderRadius: 6 }}>
                            {blood.group}
                          </Badge>
                        </td>
                        <td style={{ padding: '8px 12px', color: '#475569' }}>{blood.requested}</td>
                        <td style={{ padding: '8px 12px', fontWeight: 600, color: '#10B981' }}>{blood.fulfilled}</td>
                        <td style={{ padding: '8px 12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ flex: 1, height: 4, background: '#E5E7EB', borderRadius: 4, overflow: 'hidden' }}>
                              <div style={{ width: `${(blood.fulfilled / blood.requested) * 100}%`, height: '100%', background: '#10B981', borderRadius: 4 }} />
                            </div>
                            <span style={{ fontSize: '0.75rem', color: '#475569', minWidth: 40 }}>{Math.round((blood.fulfilled/blood.requested)*100)}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </motion.div>
            )}

            {/* Recent Activity */}
            {hospital.recentActivity && (
              <motion.div variants={fadeUp} className="glass-card p-4">
                <h5 className="fw-semibold mb-3" style={{ color: '#0F172A' }}>
                  <FaCalendarAlt size={14} style={{ marginRight: 6, color: '#E53935' }} /> Recent Activity
                </h5>
                <div>
                  {hospital.recentActivity.map((a, i) => (
                    <div key={i} className="d-flex align-items-start gap-3 py-2" style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <div className="d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 32, height: 32, borderRadius: 8, background: '#E5393510', color: '#E53935' }}>
                        <FaBuilding size={14} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 500, color: '#0F172A' }}>{a.action}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{a.detail}</div>
                        <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{new Date(a.date).toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </Col>

          {/* Sidebar */}
          <Col lg={4}>
            <motion.div variants={fadeUp} className="glass-card p-4 mb-4">
              <h5 className="fw-semibold mb-3" style={{ color: '#0F172A' }}>Quick Actions</h5>
              <div className="d-flex flex-column gap-2">
                <button className="btn btn-danger w-100 text-start d-flex align-items-center gap-2" style={{ borderRadius: 8, fontSize: '0.88rem' }}>
                  <FaTint /> Request Blood Units
                </button>
                <button className="btn btn-outline-danger w-100 text-start d-flex align-items-center gap-2" style={{ borderRadius: 8, fontSize: '0.88rem' }}>
                  <FaExclamationTriangle /> Emergency Request
                </button>
                <button className="btn btn-outline-secondary w-100 text-start d-flex align-items-center gap-2" style={{ borderRadius: 8, fontSize: '0.88rem' }}>
                  <FaCalendarAlt /> Schedule Blood Delivery
                </button>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="glass-card p-4">
              <h5 className="fw-semibold mb-3" style={{ color: '#0F172A' }}>Stats Overview</h5>
              <div className="d-flex flex-column gap-3">
                {[
                  { label: 'Total Requests', value: hospital.totalRequests, color: '#E53935' },
                  { label: 'Fulfilled', value: hospital.fulfilledRequests, color: '#10B981' },
                  { label: 'Pending', value: hospital.pendingRequests, color: '#F59E0B' },
                  { label: 'Beds', value: hospital.bedCount, color: '#3B82F6' },
                ].map((s, i) => (
                  <div key={i} className="d-flex justify-content-between align-items-center p-2" style={{ background: '#F8FAFC', borderRadius: 8 }}>
                    <span style={{ color: '#64748B', fontSize: '0.85rem' }}>{s.label}</span>
                    <span style={{ fontWeight: 700, color: s.color, fontSize: '1rem' }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </Col>
        </Row>
      )}
    </motion.div>
  );
}