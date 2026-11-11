import { useState, useEffect } from 'react';
import { Card, Badge, Button, Spinner, Alert, Table, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';

const mockLogs = Array.from({ length: 50 }, (_, i) => {
  const actions = ['Created Camp', 'Updated Camp', 'Deleted Camp', 'Approved Request', 'Rejected Request', 'Registered Donor', 'Updated Profile', 'Assigned Volunteer', 'Generated Report', 'Changed Password', 'Logged In', 'Logged Out', 'Created Emergency Request', 'Fulfilled Request', 'Updated Settings'];
  const roles = ['Super Admin', 'Hospital Admin', 'Volunteer', 'Donor'];
  const users = ['Dr. Arjun Mehta', 'Priya Sharma', 'Rahul Verma', 'Ananya Patel', 'Sunil Kumar', 'Meera Iyer', 'Vikram Singh'];
  return {
    id: i + 1,
    timestamp: new Date(Date.now() - i * 7200000 - Math.random() * 86400000).toISOString(),
    user: users[i % users.length],
    userId: `user-${(i % users.length) + 1}`,
    role: roles[i % roles.length],
    action: actions[i % actions.length],
    details: `Performed ${actions[i % actions.length].toLowerCase()} in the system`,
    remarks: i % 4 === 0 ? 'Via admin panel' : i % 4 === 1 ? 'Automated' : '',
    ip: `192.168.1.${(i % 254) + 1}`,
  };
});

const fetchLogs = () => new Promise(res => setTimeout(() => res({ success: true, data: mockLogs }), 500));

const ITEMS_PER_PAGE = 10;

const roleColors = { 'Super Admin': '#E53935', 'Hospital Admin': '#FF9800', 'Volunteer': '#2196F3', 'Donor': '#4CAF50' };

export default function AuditLogPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchLogs().then(r => {
      if (r.success) setLogs(r.data);
      else setError('Failed to load');
    }).catch(() => setError('Failed to load')).finally(() => setLoading(false));
  }, []);

  const filtered = logs.filter(l => {
    const matchSearch = !search || l.user.toLowerCase().includes(search.toLowerCase()) || l.action.toLowerCase().includes(search.toLowerCase()) || l.details.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'All' || l.role === roleFilter;
    return matchSearch && matchRole;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const roles = ['All', ...new Set(logs.map(l => l.role))];

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const formatTime = (d) => new Date(d).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  if (loading) return <div className="page-wrapper text-center py-5"><Spinner animation="border" variant="danger" /></div>;
  if (error) return <div className="page-wrapper"><Alert variant="danger">{error} <Button size="sm" variant="outline-danger" onClick={() => window.location.reload()}>Retry</Button></Alert></div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="page-wrapper">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h1 className="page-title">Audit Logs</h1>
          <p className="page-subtitle">Track all system activities and changes</p>
        </div>
        <Badge bg="light" text="dark" className="rounded-pill px-3 py-2">{filtered.length} entries</Badge>
      </div>

      <div className="d-flex gap-3 mb-4 flex-wrap">
        <input className="form-control" placeholder="Search user, action, details..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} style={{ maxWidth: 350, borderRadius: 10 }} />
        <Form.Select value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setPage(1); }} style={{ maxWidth: 180, borderRadius: 10 }}>
          {roles.map(r => <option key={r} value={r}>{r}</option>)}
        </Form.Select>
      </div>

      {paginated.length === 0 ? (
        <div className="text-center py-5">
          <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
          <h5 className="fw-semibold">No audit logs found</h5>
          <p className="text-muted">Try adjusting your search or filters</p>
        </div>
      ) : (
        <>
          <Card className="border-0 shadow-sm" style={{ borderRadius: 14 }}>
            <div className="table-responsive">
              <Table hover className="mb-0" style={{ minWidth: 700 }}>
                <thead className="table-light">
                  <tr><th className="ps-4">Date & Time</th><th>User</th><th>Role</th><th>Action</th><th>Details</th><th className="pe-4">IP Address</th></tr>
                </thead>
                <tbody>
                  {paginated.map((log, idx) => (
                    <motion.tr key={log.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.03 }}>
                      <td className="ps-4"><div className="fw-medium">{formatDate(log.timestamp)}</div><small className="text-muted">{formatTime(log.timestamp)}</small></td>
                      <td className="fw-medium">{log.user}</td>
                      <td><Badge style={{ background: roleColors[log.role], fontWeight: 500 }} className="rounded-pill">{log.role}</Badge></td>
                      <td>{log.action}</td>
                      <td><small className="text-muted">{log.details}</small></td>
                      <td className="pe-4"><code>{log.ip}</code></td>
                    </motion.tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <small className="text-muted">Page {page} of {totalPages}</small>
            <div className="d-flex gap-2">
              <Button size="sm" variant="outline-secondary" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>← Previous</Button>
              <Button size="sm" variant="outline-secondary" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Next →</Button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}