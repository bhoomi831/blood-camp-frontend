import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Form, Spinner, Alert, Table } from 'react-bootstrap';
import { motion } from 'framer-motion';

const mockCamps = [
  { id: 'c1', name: 'Mumbai Mega Camp', date: '2026-08-15', venue: 'City Community Center' },
  { id: 'c2', name: 'Delhi Blood Drive', date: '2026-08-20', venue: 'Town Hall Auditorium' },
  { id: 'c3', name: 'Bangalore Camp', date: '2026-09-01', venue: 'University Sports Complex' },
  { id: 'c4', name: 'Chennai Donation Camp', date: '2026-09-10', venue: 'Public Library Auditorium' },
  { id: 'c5', name: 'Hyderabad Camp', date: '2026-09-15', venue: 'Kalam Memorial Hall' },
];

const mockVolunteers = [
  { id: 'v1', name: 'Arun Sharma', role: 'Coordinator', assignedTo: [] },
  { id: 'v2', name: 'Priya Patel', role: 'Assistant', assignedTo: [] },
  { id: 'v3', name: 'Rahul Singh', role: 'Specialist', assignedTo: [] },
  { id: 'v4', name: 'Neha Gupta', role: 'Crew', assignedTo: [] },
  { id: 'v5', name: 'Ananya Reddy', role: 'Monitor', assignedTo: [] },
  { id: 'v6', name: 'Kavita Menon', role: 'Assistant', assignedTo: [] },
];

const fetchInitialData = () => Promise.all([
  new Promise(res => setTimeout(() => res({ success: true, data: mockCamps }), 400)),
  new Promise(res => setTimeout(() => res({ success: true, data: mockVolunteers }), 400)),
]);

export default function VolunteerAssignmentPage() {
  const [camps, setCamps] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCamp, setSelectedCamp] = useState('');
  const [assignments, setAssignments] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchInitialData().then(([c, v]) => {
      if (c.success) setCamps(c.data);
      if (v.success) setVolunteers(v.data);
    }).catch(() => setError('Failed to load data')).finally(() => setLoading(false));
  }, []);

  const toggleAssignment = (volId) => {
    setAssignments(prev => prev.includes(volId) ? prev.filter(id => id !== volId) : [...prev, volId]);
  };

  const handleSubmit = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  if (loading) return <div className="page-wrapper text-center py-5"><Spinner animation="border" variant="danger" /></div>;
  if (error) return <div className="page-wrapper"><Alert variant="danger">{error} <Button size="sm" variant="outline-danger" onClick={() => window.location.reload()}>Retry</Button></Alert></div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="page-wrapper">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="page-title">Assign Volunteers</h1>
          <p className="page-subtitle">Assign volunteers to camps</p>
        </div>
        <Button variant="outline-danger" href="/volunteers">← Back to Volunteers</Button>
      </div>

      {success && <Alert variant="success" dismissible onClose={() => setSuccess(false)}>Volunteers assigned successfully!</Alert>}

      <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: 14 }}>
        <Card.Body className="p-4">
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Select Camp</Form.Label>
            <Form.Select value={selectedCamp} onChange={e => setSelectedCamp(e.target.value)} style={{ borderRadius: 10 }}>
              <option value="">-- Choose a camp --</option>
              {camps.map(c => <option key={c.id} value={c.id}>{c.name} - {c.date} ({c.venue})</option>)}
            </Form.Select>
          </Form.Group>
        </Card.Body>
      </Card>

      {selectedCamp && (
        <Card className="border-0 shadow-sm" style={{ borderRadius: 14 }}>
          <Card.Body className="p-4">
            <h5 className="fw-semibold mb-3">Select Volunteers ({assignments.length} selected)</h5>
            <Table hover>
              <thead><tr><th style={{ width: 40 }}></th><th>Name</th><th>Role</th><th>Status</th></tr></thead>
              <tbody>
                {volunteers.map(v => (
                  <tr key={v.id} style={{ cursor: 'pointer' }} onClick={() => toggleAssignment(v.id)}>
                    <td><Form.Check checked={assignments.includes(v.id)} onChange={() => toggleAssignment(v.id)} /></td>
                    <td className="fw-medium">{v.name}</td>
                    <td><Badge bg="light" text="dark" className="rounded-pill">{v.role}</Badge></td>
                    <td><Badge bg={assignments.includes(v.id) ? 'success' : 'secondary'} className="rounded-pill">{assignments.includes(v.id) ? 'Assigned' : 'Available'}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-end mt-3">
              <Button variant="danger" disabled={assignments.length === 0} onClick={handleSubmit}>
                Assign {assignments.length} Volunteer{assignments.length !== 1 ? 's' : ''}
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}

      {!selectedCamp && (
        <div className="text-center py-5">
          <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
          <h5 className="fw-semibold">Select a camp to begin</h5>
          <p className="text-muted">Choose a camp above to assign volunteers</p>
        </div>
      )}
    </motion.div>
  );
}