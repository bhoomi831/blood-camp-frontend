import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';

const mockVenues = [
  { id: 'venue-1', name: 'City Community Center', address: '123 MG Road', city: 'Mumbai', state: 'Maharashtra', capacity: 200, facilities: ['Parking', 'AC', 'Wheelchair Access', 'Cafeteria'], contactPerson: 'Rajesh Kumar', contactPhone: '+91-9876543210', isAvailable: true },
  { id: 'venue-2', name: 'Town Hall Auditorium', address: '45 Connaught Place', city: 'Delhi', state: 'Delhi', capacity: 350, facilities: ['Parking', 'AC', 'Stage', 'Sound System'], contactPerson: 'Priya Singh', contactPhone: '+91-9876543211', isAvailable: true },
  { id: 'venue-3', name: 'University Sports Complex', address: 'Indira Nagar', city: 'Bangalore', state: 'Karnataka', capacity: 500, facilities: ['Parking', 'AC', 'Cafeteria', 'Medical Room'], contactPerson: 'Dr. Suresh', contactPhone: '+91-9876543212', isAvailable: true },
  { id: 'venue-4', name: 'Community Health Center', address: 'Sector 17', city: 'Chandigarh', state: 'Punjab', capacity: 150, facilities: ['AC', 'Medical Equipment', 'Parking'], contactPerson: 'Neha Gupta', contactPhone: '+91-9876543213', isAvailable: true },
  { id: 'venue-5', name: 'Exhibition Ground', address: 'Bandra Kurla Complex', city: 'Mumbai', state: 'Maharashtra', capacity: 800, facilities: ['Parking', 'Cafeteria', 'Medical Room', 'Generator'], contactPerson: 'Vikram Joshi', contactPhone: '+91-9876543214', isAvailable: false },
  { id: 'venue-6', name: 'Public Library Auditorium', address: 'Anna Salai', city: 'Chennai', state: 'Tamil Nadu', capacity: 250, facilities: ['AC', 'Parking', 'Sound System'], contactPerson: 'Lakshmi Narayanan', contactPhone: '+91-9876543215', isAvailable: true },
  { id: 'venue-7', name: 'Kalam Memorial Hall', address: 'Hi Tech City', city: 'Hyderabad', state: 'Telangana', capacity: 300, facilities: ['AC', 'Parking', 'Cafeteria', 'Wheelchair Access'], contactPerson: 'Ananya Reddy', contactPhone: '+91-9876543216', isAvailable: true },
  { id: 'venue-8', name: 'Sports Club Ground', address: 'FC Road', city: 'Pune', state: 'Maharashtra', capacity: 600, facilities: ['Parking', 'Cafeteria', 'Medical Room'], contactPerson: 'Rohan Desai', contactPhone: '+91-9876543217', isAvailable: false },
];

const fetchVenues = () => new Promise(res => setTimeout(() => res({ success: true, data: mockVenues }), 600));

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function VenueManagementPage() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editVenue, setEditVenue] = useState(null);

  useEffect(() => {
    fetchVenues().then(r => {
      if (r.success) setVenues(r.data);
      else setError('Failed to load venues');
    }).catch(() => setError('Failed to load venues')).finally(() => setLoading(false));
  }, []);

  const filtered = venues.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.city.toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    { label: 'Total Venues', value: venues.length, color: '#E53935' },
    { label: 'Available', value: venues.filter(v => v.isAvailable).length, color: '#4CAF50' },
    { label: 'Total Capacity', value: venues.reduce((s, v) => s + v.capacity, 0), color: '#FF9800' },
    { label: 'Active Venues', value: venues.filter(v => v.isAvailable).length, color: '#2196F3' },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: form.venueName.value,
      address: form.address.value,
      city: form.city.value,
      state: form.state.value,
      capacity: parseInt(form.capacity.value),
      contactPerson: form.contactPerson.value,
      contactPhone: form.contactPhone.value,
      isAvailable: form.isAvailable.checked,
      facilities: form.facilities.value.split(',').map(f => f.trim()).filter(Boolean),
    };
    if (editVenue) {
      setVenues(prev => prev.map(v => v.id === editVenue.id ? { ...v, ...data } : v));
    } else {
      setVenues(prev => [...prev, { id: `venue-${Date.now()}`, ...data }]);
    }
    setShowModal(false);
    setEditVenue(null);
  };

  const openEdit = (venue) => { setEditVenue(venue); setShowModal(true); };

  if (loading) return <div className="page-wrapper text-center py-5"><Spinner animation="border" variant="danger" /></div>;
  if (error) return <div className="page-wrapper"><Alert variant="danger">{error} <Button size="sm" variant="outline-danger" onClick={() => window.location.reload()}>Retry</Button></Alert></div>;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="page-wrapper">
      <motion.div variants={item} className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h1 className="page-title">Venue Management</h1>
          <p className="page-subtitle">Manage blood donation camp venues</p>
        </div>
        <Button variant="danger" onClick={() => { setEditVenue(null); setShowModal(true); }}>+ Add Venue</Button>
      </motion.div>

      <motion.div variants={item} className="row g-3 mb-4">
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

      <motion.div variants={item} className="mb-4">
        <input className="form-control" placeholder="Search venues by name or city..." value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: 400, borderRadius: 10 }} />
      </motion.div>

      {filtered.length === 0 ? (
        <div className="text-center py-5">
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏛️</div>
          <h5 className="fw-semibold">No venues found</h5>
          <p className="text-muted">{search ? 'Try a different search term' : 'Add your first venue to get started'}</p>
        </div>
      ) : (
        <Row className="g-4">
          {filtered.map((venue) => (
            <Col key={venue.id} md={6} lg={4}>
              <motion.div variants={item}>
                <Card className="border-0 shadow-sm h-100 venue-card" style={{ borderRadius: 14, cursor: 'default', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = ''; }}>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5 className="mb-0 fw-semibold">{venue.name}</h5>
                      <Badge bg={venue.isAvailable ? 'success' : 'secondary'} className="rounded-pill">{venue.isAvailable ? 'Available' : 'Unavailable'}</Badge>
                    </div>
                    <p className="text-muted mb-2" style={{ fontSize: 14 }}>📍 {venue.address}, {venue.city}, {venue.state}</p>
                    <p className="mb-1"><strong>Capacity:</strong> {venue.capacity} people</p>
                    <p className="mb-2"><strong>Contact:</strong> {venue.contactPerson} ({venue.contactPhone})</p>
                    <div className="mb-3">
                      {venue.facilities.map((f, i) => (
                        <Badge key={i} bg="light" text="dark" className="me-1 mb-1 rounded-pill" style={{ fontWeight: 400 }}>{f}</Badge>
                      ))}
                    </div>
                    <Button variant="outline-danger" size="sm" onClick={() => openEdit(venue)}>Edit</Button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      )}

      <Modal show={showModal} onHide={() => { setShowModal(false); setEditVenue(null); }} centered>
        <Modal.Header closeButton style={{ border: 'none', paddingBottom: 0 }}>
          <Modal.Title className="fw-semibold">{editVenue ? 'Edit Venue' : 'Add Venue'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSave}>
          <Modal.Body>
            <Row className="g-3">
              <Col md={12}><Form.Group><Form.Label>Venue Name</Form.Label><Form.Control name="venueName" required defaultValue={editVenue?.name} /></Form.Group></Col>
              <Col md={8}><Form.Group><Form.Label>Address</Form.Label><Form.Control name="address" required defaultValue={editVenue?.address} /></Form.Group></Col>
              <Col md={4}><Form.Group><Form.Label>City</Form.Label><Form.Control name="city" required defaultValue={editVenue?.city} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>State</Form.Label><Form.Control name="state" required defaultValue={editVenue?.state} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Capacity</Form.Label><Form.Control name="capacity" type="number" required defaultValue={editVenue?.capacity} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Contact Person</Form.Label><Form.Control name="contactPerson" required defaultValue={editVenue?.contactPerson} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Contact Phone</Form.Label><Form.Control name="contactPhone" required defaultValue={editVenue?.contactPhone} /></Form.Group></Col>
              <Col md={12}><Form.Group><Form.Label>Facilities (comma separated)</Form.Label><Form.Control name="facilities" defaultValue={editVenue?.facilities?.join(', ')} /></Form.Group></Col>
              <Col md={12}><Form.Check type="switch" name="isAvailable" label="Available for booking" defaultChecked={editVenue ? editVenue.isAvailable : true} /></Col>
            </Row>
          </Modal.Body>
          <Modal.Footer style={{ border: 'none' }}>
            <Button variant="light" onClick={() => { setShowModal(false); setEditVenue(null); }}>Cancel</Button>
            <Button variant="danger" type="submit">{editVenue ? 'Save Changes' : 'Add Venue'}</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </motion.div>
  );
}