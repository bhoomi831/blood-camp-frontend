import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Alert, Button, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import campManagementService from '../services/campManagementService';

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const statusColors = {
  planned: 'secondary', active: 'success', completed: 'primary', cancelled: 'danger', draft: 'secondary',
  'pending approval': 'warning', approved: 'success', rejected: 'danger',
};

export default function CampListPage() {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    campManagementService.getCamps()
      .then(r => { if (r.success) setCamps(r.data); else setError('Failed to load'); })
      .catch(() => setError('Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = camps.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || c.status === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  const stats = [
    { label: 'Total', value: camps.length, color: '#6B7280', key: 'total' },
    { label: 'Active', value: camps.filter(c => c.status === 'active').length, color: '#4CAF50', key: 'active' },
    { label: 'Completed', value: camps.filter(c => c.status === 'completed').length, color: '#2196F3', key: 'completed' },
    { label: 'Planned', value: camps.filter(c => c.status === 'planned').length, color: '#FF9800', key: 'planned' },
    { label: 'Cancelled', value: camps.filter(c => c.status === 'cancelled').length, color: '#E53935', key: 'cancelled' },
  ];

  const statuses = ['All', 'Planned', 'Active', 'Completed', 'Cancelled'];

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  if (loading) return <div className="page-wrapper"><Container><Spinner animation="border" variant="danger" className="d-block mx-auto mt-5" /></Container></div>;
  if (error) return <div className="page-wrapper"><Alert variant="danger">{error} <Button size="sm" variant="outline-danger" onClick={() => window.location.reload()}>Retry</Button></Alert></div>;

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="page-wrapper">
      <Container fluid>
        <motion.div variants={fadeUp} className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div>
            <h1 className="page-title">Camp Management</h1>
            <p className="page-subtitle">Manage blood donation camps</p>
          </div>
          <Button variant="danger" onClick={() => navigate('/camps/create')}>+ Create Camp</Button>
        </motion.div>

        <motion.div variants={fadeUp} className="row g-3 mb-4">
          {stats.map(s => (
            <div key={s.key} className="col">
              <Card className="border-0 shadow-sm text-center p-3">
                <div className="fw-bold" style={{ fontSize: 24, color: s.color }}>{s.value}</div>
                <small className="text-muted">{s.label}</small>
              </Card>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="d-flex gap-3 mb-4 flex-wrap">
          <input className="form-control" placeholder="Search camps..." value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: 320, borderRadius: 10 }} />
          <div className="d-flex gap-2 flex-wrap">
            {statuses.map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`btn btn-sm rounded-pill ${statusFilter === s ? 'btn-danger' : 'btn-outline-secondary'}`}>{s}</button>
            ))}
          </div>
        </motion.div>

        {filtered.length === 0 ? (
          <div className="text-center py-5">
            <div style={{ fontSize: 48, marginBottom: 16 }}>🏕️</div>
            <h5 className="fw-semibold">No camps found</h5>
            <p className="text-muted">{search ? 'Try a different search' : 'Create your first camp to get started'}</p>
            {!search && <Button variant="danger" onClick={() => navigate('/camps/create')}>Create Camp</Button>}
          </div>
        ) : (
          <Row className="g-4">
            {filtered.map((camp, idx) => (
              <Col key={camp.id} md={6} lg={4}>
                <motion.div variants={fadeUp}>
                  <Card className="border-0 shadow-sm h-100" style={{ borderRadius: 14, cursor: 'pointer', transition: 'all 0.3s' }}
                    onClick={() => navigate(`/camps/${camp.id}`)}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = ''; }}>
                    <Card.Body className="p-4">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <h5 className="fw-semibold mb-0">{camp.name}</h5>
                        <Badge bg={statusColors[camp.status] || 'secondary'} className="rounded-pill">{camp.status}</Badge>
                      </div>
                      <p className="text-muted mb-2" style={{ fontSize: 14 }}>📅 {formatDate(camp.startDate)}</p>
                      <p className="text-muted mb-2" style={{ fontSize: 14 }}>📍 {camp.venueName}</p>
                      <p className="mb-1"><strong>Expected:</strong> {camp.expectedDonors} donors</p>
                      <p className="mb-1"><strong>Actual:</strong> {camp.actualDonors ?? '—'} donors</p>
                      {camp.collectedBloodUnits && <p className="mb-0"><strong>Collected:</strong> {camp.collectedBloodUnits} units</p>}
                      <div className="mt-3 d-flex gap-2">
                        <Button size="sm" variant="outline-danger" onClick={(e) => { e.stopPropagation(); navigate(`/camps/${camp.id}`); }}>View</Button>
                        <Button size="sm" variant="outline-secondary" onClick={(e) => { e.stopPropagation(); navigate(`/camps/${camp.id}/edit`); }}>Edit</Button>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </motion.div>
  );
}