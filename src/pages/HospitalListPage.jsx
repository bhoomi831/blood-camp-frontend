import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Row, Col, Spinner, Alert, Badge, Form, InputGroup, Button } from 'react-bootstrap';
import { FaHospital, FaSearch, FaPlus, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBuilding, FaProcedures, FaEye, FaTint } from 'react-icons/fa';
import hospitalService from '../services/hospitalService';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

const typeColors = { 'General': '#3B82F6', 'Specialty': '#8B5CF6', 'Pediatric': '#EC4899', 'Oncology': '#F59E0B', 'Emergency': '#EF4444', 'Government': '#10B981' };

export default function HospitalListPage() {
  const [hospitals, setHospitals] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await hospitalService.getHospitals();
        if (res.success) setHospitals(res.data);
        else setError('Failed to load hospitals');
      } catch (err) {
        setError('Failed to load hospital data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = hospitals.filter(h => {
    const matchesSearch = h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.city.toLowerCase().includes(search.toLowerCase()) ||
      h.contactPerson?.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'All' || h.type === filterType;
    return matchesSearch && matchesType;
  });

  const typeList = ['General', 'Specialty', 'Pediatric', 'Oncology', 'Emergency', 'Government'];

  if (loading) {
    return (
      <div className="page-wrapper d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
        <div className="text-center"><Spinner animation="border" variant="danger" /><p className="text-muted mt-3">Loading hospitals...</p></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-wrapper"><Alert variant="danger">{error} <Button size="sm" variant="outline-danger" onClick={() => window.location.reload()}>Retry</Button></Alert></div>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="page-wrapper">
      <motion.div variants={fadeUp} className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h1 className="page-title"><FaBuilding style={{ marginRight: 8 }} />Hospital Management</h1>
          <p className="page-subtitle">Manage partner hospitals and blood request recipients</p>
        </div>
        <a href="/hospitals/add" className="btn btn-danger d-flex align-items-center gap-2" style={{ borderRadius: 12, padding: '10px 20px' }}>
          <FaPlus /> Register Hospital
        </a>
      </motion.div>

      {/* Filters */}
      <motion.div variants={fadeUp} className="glass-card p-3 mb-4">
        <Row className="g-2 align-items-center">
          <Col md={5}>
            <InputGroup>
              <InputGroup.Text style={{ background: '#F8FAFC', border: '1px solid #E5E7EB', borderRight: 'none' }}>
                <FaSearch size={14} color="#94A3B8" />
              </InputGroup.Text>
              <Form.Control placeholder="Search by name, city, contact person..." value={search} onChange={e => setSearch(e.target.value)}
                style={{ border: '1px solid #E5E7EB', fontSize: '0.88rem' }} />
            </InputGroup>
          </Col>
          <Col md={4}>
            <Form.Select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ fontSize: '0.88rem', border: '1px solid #E5E7EB' }}>
              <option value="All">All Types</option>
              {typeList.map(t => <option key={t} value={t}>{t}</option>)}
            </Form.Select>
          </Col>
          <Col md={3}>
            <span className="text-muted" style={{ fontSize: '0.82rem' }}>{filtered.length} hospitals found</span>
          </Col>
        </Row>
      </motion.div>

      {/* Hospital Cards Grid */}
      <div className="row g-4">
        {filtered.length > 0 ? filtered.map((h, i) => (
          <Col key={h.id} md={6} lg={4}>
            <motion.div variants={fadeUp} whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
              <div className="glass-card p-4 h-100" style={{ cursor: 'pointer' }} onClick={() => window.location.href = `/hospitals/${h.id}`}>
                {/* Header */}
                <div className="d-flex align-items-start gap-3 mb-3">
                  <div className="d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 48, height: 48, borderRadius: 14, background: '#E5393510', color: '#E53935', fontSize: 22 }}>
                    <FaBuilding />
                  </div>
                  <div className="flex-grow-1 min-w-0">
                    <h6 className="fw-semibold mb-1" style={{ color: '#0F172A', fontSize: '0.95rem' }}>{h.name}</h6>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#94A3B8', fontSize: '0.78rem' }}>
                      <FaMapMarkerAlt size={10} /> {h.city}, {h.state}
                    </div>
                  </div>
                  <Badge style={{ background: typeColors[h.type] + '18', color: typeColors[h.type], fontWeight: 600, fontSize: '0.7rem', padding: '4px 10px', borderRadius: 8 }}>
                    {h.type}
                  </Badge>
                </div>

                {/* Details */}
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <span className="d-flex align-items-center gap-1 px-3 py-1 rounded-pill" style={{ background: '#F1F5F9', fontSize: '0.75rem', color: '#475569' }}>
                    <FaProcedures size={10} />{h.bedCount} beds
                  </span>
                  <span className="d-flex align-items-center gap-1 px-3 py-1 rounded-pill" style={{ background: h.bloodBank ? '#10B98110' : '#FEF2F2', fontSize: '0.75rem', color: h.bloodBank ? '#10B981' : '#EF4444' }}>
                    <FaTint size={10} />{h.bloodBank ? 'Blood Bank' : 'No BB'}
                  </span>
                  <span className="d-flex align-items-center gap-1 px-3 py-1 rounded-pill" style={{ background: h.emergencyDept ? '#FEF2F2' : '#F1F5F9', fontSize: '0.75rem', color: h.emergencyDept ? '#EF4444' : '#94A3B8' }}>
                    {h.emergencyDept ? '🚨 ER' : 'No ER'}
                  </span>
                </div>

                {/* Contact */}
                <div className="d-flex flex-column gap-1 mb-3" style={{ fontSize: '0.8rem', color: '#64748B' }}>
                  <div className="d-flex align-items-center gap-2"><FaPhone size={10} />{h.phone}</div>
                  <div className="d-flex align-items-center gap-2"><FaEnvelope size={10} />{h.email}</div>
                  <div className="d-flex align-items-center gap-2"><FaBuilding size={10} />Contact: {h.contactPerson}</div>
                </div>

                {/* Stats */}
                <div className="d-flex justify-content-between align-items-center pt-2" style={{ borderTop: '1px solid #F1F5F9' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Total Requests</span>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0F172A' }}>{h.totalRequests}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Pending</span>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: h.pendingRequests > 0 ? '#EF4444' : '#10B981' }}>{h.pendingRequests}</div>
                  </div>
                  <a href={`/hospitals/${h.id}`} className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1" style={{ borderRadius: 8, fontSize: '0.78rem' }}>
                    <FaEye size={10} />View
                  </a>
                </div>
              </div>
            </motion.div>
          </Col>
        )) : (
          <Col xs={12}>
            <div className="glass-card text-center py-5 text-muted">
              <FaBuilding size={40} style={{ opacity: 0.3, marginBottom: 12 }} />
              <p>No hospitals found matching your filters</p>
            </div>
          </Col>
        )}
      </div>
    </motion.div>
  );
}