import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Alert, Button, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';

const mockVolunteers = [
  { id: 'v1', name: 'Arun Sharma', email: 'arun@example.com', phone: '+91-9876543201', role: 'Volunteer Coordinator', bloodGroup: 'A+', city: 'Mumbai', state: 'Maharashtra', isActive: true, assignedCamps: 4, totalHours: 120, joinedDate: '2024-01-15', skills: ['First Aid', 'Counseling'], availability: 'Both' },
  { id: 'v2', name: 'Priya Patel', email: 'priya@example.com', phone: '+91-9876543202', role: 'Registration Assistant', bloodGroup: 'B+', city: 'Delhi', state: 'Delhi', isActive: true, assignedCamps: 3, totalHours: 85, joinedDate: '2024-02-20', skills: ['Data Entry'], availability: 'Weekends' },
  { id: 'v3', name: 'Rahul Singh', email: 'rahul@example.com', phone: '+91-9876543203', role: 'Donor Care Specialist', bloodGroup: 'O+', city: 'Bangalore', state: 'Karnataka', isActive: true, assignedCamps: 5, totalHours: 150, joinedDate: '2024-01-10', skills: ['First Aid', 'Blood Collection', 'Counseling'], availability: 'Both' },
  { id: 'v4', name: 'Neha Gupta', email: 'neha@example.com', phone: '+91-9876543204', role: 'Setup Crew', bloodGroup: 'AB+', city: 'Chennai', state: 'Tamil Nadu', isActive: true, assignedCamps: 2, totalHours: 45, joinedDate: '2024-03-05', skills: ['Logistics'], availability: 'Weekdays' },
  { id: 'v5', name: 'Vikram Joshi', email: 'vikram@example.com', phone: '+91-9876543205', role: 'Information Desk', bloodGroup: 'A-', city: 'Hyderabad', state: 'Telangana', isActive: false, assignedCamps: 1, totalHours: 30, joinedDate: '2024-04-12', skills: ['Counseling'], availability: 'Weekends' },
  { id: 'v6', name: 'Ananya Reddy', email: 'ananya@example.com', phone: '+91-9876543206', role: 'Post-Donation Monitor', bloodGroup: 'O-', city: 'Pune', state: 'Maharashtra', isActive: true, assignedCamps: 3, totalHours: 90, joinedDate: '2024-02-28', skills: ['First Aid', 'Blood Collection'], availability: 'Both' },
  { id: 'v7', name: 'Suresh Nair', email: 'suresh@example.com', phone: '+91-9876543207', role: 'Cleanup Crew', bloodGroup: 'B-', city: 'Kolkata', state: 'West Bengal', isActive: true, assignedCamps: 2, totalHours: 40, joinedDate: '2024-05-01', skills: ['Logistics'], availability: 'Weekdays' },
  { id: 'v8', name: 'Kavita Menon', email: 'kavita@example.com', phone: '+91-9876543208', role: 'Mobile Unit Assistant', bloodGroup: 'AB-', city: 'Ahmedabad', state: 'Gujarat', isActive: true, assignedCamps: 4, totalHours: 110, joinedDate: '2024-01-22', skills: ['First Aid', 'Data Entry', 'Counseling'], availability: 'Both' },
  { id: 'v9', name: 'Deepak Verma', email: 'deepak@example.com', phone: '+91-9876543209', role: 'Registration Assistant', bloodGroup: 'A+', city: 'Mumbai', state: 'Maharashtra', isActive: true, assignedCamps: 3, totalHours: 75, joinedDate: '2024-03-18', skills: ['Data Entry'], availability: 'Weekends' },
  { id: 'v10', name: 'Lakshmi Iyer', email: 'lakshmi@example.com', phone: '+91-9876543210', role: 'Volunteer Coordinator', bloodGroup: 'O+', city: 'Bangalore', state: 'Karnataka', isActive: true, assignedCamps: 6, totalHours: 200, joinedDate: '2024-01-05', skills: ['First Aid', 'Counseling', 'Blood Collection', 'Logistics'], availability: 'Both' },
  { id: 'v11', name: 'Rohan Desai', email: 'rohan@example.com', phone: '+91-9876543211', role: 'Donor Care Specialist', bloodGroup: 'B+', city: 'Pune', state: 'Maharashtra', isActive: true, assignedCamps: 3, totalHours: 95, joinedDate: '2024-04-10', skills: ['Counseling', 'Blood Collection'], availability: 'Weekdays' },
  { id: 'v12', name: 'Meera Kurian', email: 'meera@example.com', phone: '+91-9876543212', role: 'Setup Crew', bloodGroup: 'A+', city: 'Delhi', state: 'Delhi', isActive: false, assignedCamps: 1, totalHours: 20, joinedDate: '2024-06-01', skills: ['Logistics'], availability: 'Weekends' },
];

const fetchVolunteers = () => new Promise(res => setTimeout(() => res({ success: true, data: mockVolunteers }), 600));

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function VolunteerListPage() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [availFilter, setAvailFilter] = useState('All');

  useEffect(() => {
    fetchVolunteers().then(r => {
      if (r.success) setVolunteers(r.data);
      else setError('Failed to load');
    }).catch(() => setError('Failed to load')).finally(() => setLoading(false));
  }, []);

  const roles = ['All', ...new Set(volunteers.map(v => v.role))];
  const filtered = volunteers.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'All' || v.role === roleFilter;
    const matchAvail = availFilter === 'All' || v.availability === availFilter;
    return matchSearch && matchRole && matchAvail;
  });

  const stats = [
    { label: 'Total Volunteers', value: volunteers.length, color: '#E53935' },
    { label: 'Active', value: volunteers.filter(v => v.isActive).length, color: '#4CAF50' },
    { label: 'Available Both', value: volunteers.filter(v => v.availability === 'Both').length, color: '#FF9800' },
    { label: 'Total Hours', value: volunteers.reduce((s, v) => s + v.totalHours, 0), color: '#2196F3' },
  ];

  if (loading) return <div className="page-wrapper text-center py-5"><Spinner animation="border" variant="danger" /></div>;
  if (error) return <div className="page-wrapper"><Alert variant="danger">{error} <Button size="sm" variant="outline-danger" onClick={() => window.location.reload()}>Retry</Button></Alert></div>;

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="page-wrapper">
      <motion.div variants={fadeUp} className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h1 className="page-title">Volunteers</h1>
          <p className="page-subtitle">Manage volunteers and their assignments</p>
        </div>
        <Button variant="danger" href="/volunteers/assign">+ Assign Volunteer</Button>
      </motion.div>

      <motion.div variants={fadeUp} className="row g-3 mb-4">
        {stats.map((s, i) => (
          <div key={i} className="col-md-3 col-6">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="d-flex align-items-center gap-3">
                <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 48, height: 48, background: s.color + '15' }}>
                  <span style={{ color: s.color, fontWeight: 700, fontSize: 18 }}>{s.value}</span>
                </div>
                <div>
                  <div style={{ fontSize: 13, color: '#6B7280' }}>{s.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#1A1A2E' }}>{s.value}</div>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="d-flex gap-3 mb-4 flex-wrap">
        <input className="form-control" placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: 320, borderRadius: 10 }} />
        <Form.Select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} style={{ maxWidth: 220, borderRadius: 10 }}>
          {roles.map(r => <option key={r} value={r}>{r}</option>)}
        </Form.Select>
        <Form.Select value={availFilter} onChange={e => setAvailFilter(e.target.value)} style={{ maxWidth: 160, borderRadius: 10 }}>
          <option value="All">All Availability</option>
          <option value="Weekdays">Weekdays</option>
          <option value="Weekends">Weekends</option>
          <option value="Both">Both</option>
        </Form.Select>
      </motion.div>

      {filtered.length === 0 ? (
        <div className="text-center py-5">
          <div style={{ fontSize: 48, marginBottom: 16 }}>👥</div>
          <h5 className="fw-semibold">No volunteers found</h5>
          <p className="text-muted">{search || roleFilter !== 'All' ? 'Try adjusting your filters' : 'No volunteers registered yet'}</p>
        </div>
      ) : (
        <Row className="g-3">
          {filtered.map(vol => (
            <Col key={vol.id} md={6} lg={4}>
              <motion.div variants={fadeUp}>
                <Card className="border-0 shadow-sm h-100" style={{ borderRadius: 14, transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = ''; }}>
                  <Card.Body>
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style={{ width: 48, height: 48, background: '#E53935', fontSize: 18 }}>
                        {vol.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-0 fw-semibold">{vol.name}</h6>
                        <small className="text-muted">{vol.email}</small>
                      </div>
                      <Badge bg={vol.isActive ? 'success' : 'secondary'} className="rounded-pill">{vol.isActive ? 'Active' : 'Inactive'}</Badge>
                    </div>
                    <div className="mb-2" style={{ fontSize: 14 }}>
                      <div className="mb-1"><strong>Role:</strong> {vol.role}</div>
                      <div className="mb-1"><strong>Blood Group:</strong> {vol.bloodGroup}</div>
                      <div className="mb-1"><strong>City:</strong> {vol.city}, {vol.state}</div>
                      <div className="mb-1"><strong>Camps Assigned:</strong> {vol.assignedCamps}</div>
                      <div className="mb-1"><strong>Total Hours:</strong> {vol.totalHours}h</div>
                      <div className="mb-1"><strong>Availability:</strong> {vol.availability}</div>
                    </div>
                    <div className="mb-3">
                      {vol.skills.map((s, i) => (
                        <Badge key={i} bg="light" text="dark" className="me-1 mb-1 rounded-pill" style={{ fontWeight: 400, fontSize: 12 }}>{s}</Badge>
                      ))}
                    </div>
                    <div className="d-flex gap-2">
                      <Button variant="outline-danger" size="sm">View Profile</Button>
                      <Button variant="outline-primary" size="sm">Assign to Camp</Button>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      )}
    </motion.div>
  );
}