import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Row, Col, Card, Spinner, Alert, Badge, Button, Table } from 'react-bootstrap';
import { FaArrowLeft, FaTint, FaThermometer, FaFlask, FaCheckCircle, FaTimesCircle, FaEdit, FaBuilding, FaCalendarAlt, FaTemperatureHigh } from 'react-icons/fa';
import inventoryService from '../services/inventoryService';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

export default function InventoryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [unit, setUnit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await inventoryService.getInventoryById(id);
        if (res.success) setUnit(res.data);
        else setError('Unit not found');
      } catch (err) {
        setError('Failed to load blood unit details');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="page-wrapper d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
        <div className="text-center"><Spinner animation="border" variant="danger" /><p className="text-muted mt-3">Loading blood unit details...</p></div>
      </div>
    );
  }

  const daysLeft = unit ? Math.ceil((new Date(unit.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="page-wrapper">
      <motion.div variants={fadeUp} className="mb-4">
        <button onClick={() => navigate('/inventory')} className="btn btn-light d-flex align-items-center gap-2 mb-3" style={{ borderRadius: 8, fontSize: '0.88rem' }}>
          <FaArrowLeft /> Back to Inventory
        </button>
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <h1 className="page-title">Blood Unit Detail</h1>
            <p className="page-subtitle">{unit?.bloodGroup} — Unit #{id}</p>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-danger d-flex align-items-center gap-2" style={{ borderRadius: 8 }} onClick={() => navigate(`/inventory/${id}/edit`)}>
              <FaEdit /> Edit
            </button>
            <button className="btn btn-outline-secondary d-flex align-items-center gap-2" style={{ borderRadius: 8 }}>
              <FaTrash /> Remove
            </button>
          </div>
        </div>
      </motion.div>

      {error && <Alert variant="danger">{error}</Alert>}

      {unit && (
        <Row className="g-4">
          {/* Main Info */}
          <Col lg={8}>
            <motion.div variants={fadeUp} className="glass-card p-4 mb-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div style={{ width: 64, height: 64, borderRadius: 16, background: 'linear-gradient(135deg, #E53935, #C62828)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.5rem', fontWeight: 700, boxShadow: '0 4px 16px rgba(229,57,53,0.3)' }}>
                  {unit.bloodGroup}
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, margin: 0, color: '#0F172A' }}>Blood Group {unit.bloodGroup}</h4>
                  <div className="d-flex gap-2 mt-1">
                    <Badge style={{ background: '#10B98118', color: '#10B981', fontSize: '0.75rem', padding: '4px 12px', borderRadius: 8 }}>
                      {unit.status}
                    </Badge>
                    {unit.allClear ? (
                      <Badge style={{ background: '#10B98118', color: '#10B981', fontSize: '0.75rem', padding: '4px 12px', borderRadius: 8 }}>
                        <FaCheck size={10} /> Tests Clear
                      </Badge>
                    ) : (
                      <Badge style={{ background: '#EF444418', color: '#EF4444', fontSize: '0.75rem', padding: '4px 12px', borderRadius: 8 }}>
                        <FaTimesCircle size={10} /> Tests Pending
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <Row className="g-3">
                <Col sm={6}>
                  <div style={{ fontSize: '0.78rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 500, marginBottom: 4 }}>Available Units</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0F172A' }}>{unit.units}</div>
                </Col>
                <Col sm={6}>
                  <div style={{ fontSize: '0.78rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 500, marginBottom: 4 }}>Donor</div>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#475569' }}>{unit.donorName}{unit.donorId && <span style={{ fontSize: '0.75rem', opacity: 0.6, marginLeft: 6 }}>({unit.donorId})</span>}</div>
                </Col>
                <Col sm={6}>
                  <div style={{ fontSize: '0.78rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 500, marginBottom: 4 }}>Source Camp</div>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#475569' }}>{unit.source}</div>
                </Col>
                <Col sm={6}>
                  <div style={{ fontSize: '0.78rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 500, marginBottom: 4 }}>Storage Location</div>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#475569' }}>{unit.storageLocation}</div>
                </Col>
                <Col sm={6}>
                  <div style={{ fontSize: '0.78rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 500, marginBottom: 4 }}>
                    <FaCalendarAlt size={12} style={{ marginRight: 4 }} /> Donation Date
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#0F172A' }}>{new Date(unit.donationDate).toLocaleDateString()}</div>
                </Col>
                <Col sm={6}>
                  <div style={{ fontSize: '0.78rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 500, marginBottom: 4 }}>
                    <FaCalendarAlt size={12} style={{ marginRight: 4 }} /> Expiry Date
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: daysLeft <= 7 ? '#EF4444' : '#10B981' }}>
                    {new Date(unit.expiryDate).toLocaleDateString()}
                    <span style={{ fontSize: '0.78rem', marginLeft: 6 }}>({daysLeft} days left)</span>
                  </div>
                </Col>
              </Row>
            </motion.div>

            {/* Lab Results */}
            <motion.div variants={fadeUp} className="glass-card p-4 mb-4">
              <h5 className="fw-semibold mb-3" style={{ color: '#0F172A' }}>
                <FaFlask size={14} style={{ marginRight: 8, color: '#E53935' }} />Laboratory Test Results
              </h5>
              <Row className="g-3">
                {[
                  { label: 'Hemoglobin', value: `${unit.hbLevel} g/dL`, status: 'normal' },
                  { label: 'Platelet Count', value: unit.plateletCount, status: 'normal' },
                  { label: 'WBC Count', value: unit.wbcCount, status: 'normal' },
                  { label: 'Temperature', value: unit.temperature, status: 'normal' },
                ].map((test, i) => (
                  <Col sm={3} key={i}>
                    <div className="p-2 rounded-3" style={{ background: '#F8FAFC', border: '1px solid #E5E7EB', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 500 }}>{test.label}</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0F172A' }}>{test.value}</div>
                    </div>
                  </Col>
                ))}
              </Row>
              <div className="mt-3">
                <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 500, marginBottom: 6 }}>Tested For</div>
                <div className="d-flex flex-wrap gap-2">
                  {unit.testedFor.map((test, i) => (
                    <Badge key={i} className="px-3 py-2 d-flex align-items-center gap-1" style={{ background: '#10B98115', color: '#10B981', fontWeight: 500, borderRadius: 8 }}>
                      <CheckIcon size={12} /> {test}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="#mt-2">
                <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 500 }}>Processed By: <span style={{ color: '#0F172A' }}>{unit.processedBy}</span> on <span style={{ color: '#0F172A' }}>{new Date(unit.processedDate).toLocaleString()}</span></div>
              </div>
            </motion.div>

            {/* Transfusion History */}
            {unit.transfusionHistory && unit.transfusionHistory.length > 0 && (
              <motion.div variants={fadeUp} className="glass-card p-4">
                <h5 className="fw-semibold mb-3" style={{ color: '#0F172A' }}>
                  <FaBuilding size="14" style={{ marginRight: 6, color: '#E53935' }} /> Transfusion History
                </h5>
                <Table className="mb-0" size="sm" style={{ fontSize: '0.85rem' }}>
                  <thead style={{ background: '#F8FAFC' }}>
                    <tr>
                      <th style={{ padding: '8px 12px' }}>Date</th>
                      <th style={{ padding: '8px 12px' }}>Hospital</th>
                      <th style={{ padding: '8px 12px' }}>Patient</th>
                      <th style={{ padding: '8px 12px' }}>Units</th>
                      <th style={{ padding: '8px 12px' }}>Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unit.transfusionHistory.map((t, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '8px 12px', color: '#475569' }}>{new Date(t.date).toLocaleDateString()}</td>
                        <td style={{ padding: '8px 12px', fontWeight: 500, color: '#0F172A' }}>{t.hospital}</td>
                        <td style={{ padding: '8px 12px', color: '#475569' }}>{t.patient}</td>
                        <td style={{ padding: '8px 12px' }}><Badge style={{ background: '#E5393518', color: '#E53935' }}>{t.unitsIssued}</Badge></td>
                        <td style={{ padding: '8px 12px', color: '#64748B' }}>{t.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </motion.div>
            )}
          </Col>

          {/* Sidebar */}
          <Col lg={4}>
            <motion.div variants={fadeUp} className="glass-card p-4 mb-4">
              <h5 className="fw-semibold mb-3" style={{ color: '#0F172A' }}>Quick Actions</h5>
              <div className="d-flex flex-column gap-2">
                <button className="btn btn-outline-danger w-100 text-start d-flex align-items-center gap-2" style={{ borderRadius: 8 }}>
                  <FaBuilding /> Request Inventory Check
                </button>
                <button className="btn btn-outline-danger w-100 text-start d-flex align-items-center gap-2" style={{ borderRadius: 8 }}>
                  <FaTint /> Dispatch to Hospital
                </button>
                <button className="btn btn-outline-secondary w-100 text-start d-flex align-items-center Gap-2" style={{ borderRadius: 8 }}>
                  <FaArrowLeft /> Transfer Units
                </button>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="glass-card p-4">
              <h5 className="fw-semibold mb-3" style={{ color: '#0F172A' }}>Storage Details</h5>
              <div style={{ background: '#F8FAFC', borderRadius: 12, padding: 16 }}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span style={{ color: '#64748B', fontSize: '0.85rem' }}><FaThermometer size={12} style={{ marginRight: 6 }} /> Location</span>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>{unit.storageLocation}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span style={{ color: '#64748B', fontSize: '0.85rem' }}><FaTemperatureHigh size={12} style={{ marginRight: 6 }} /> Temperature</span>
                  <span style={{ fontWeight: 600, color: '#10B981' }}>{unit.temperature}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span style={{ color: '#64748B', fontSize: '0.85rem' }}><FaCalendarAlt size={12} style={{ marginRight: 6 }} /> Processed</span>
                  <span style={{ fontWeight: 500, color: '#475569' }}>{new Date(unit.processedDate).toLocaleDateString()}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span style={{ color: '#64748B', fontSize: '0.85rem' }}><CheckIcon size={12} style={{ marginRight: 6 }} /> Safety Tests</span>
                  <Badge style={{ background: '#10B98118', color: '#10B981' }}>{unit.testedFor?.length || 0} passed</Badge>
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>
      )}
    </motion.div>
  );
}

// Helper SVG icons inline
const CheckIcon = ({size=12}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);