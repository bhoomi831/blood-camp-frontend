import { useState, useEffect } from 'react';
import { Badge, Button, Spinner, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';

const mockNotifications = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: ['Camp Registration Open', 'Emergency: O+ Blood Needed', 'Donor Appreciation Day', 'Camp Completed', 'Report Ready', 'New Volunteer Added', 'Blood Stock Alert', 'Camp Approved', 'Donor Eligibility Update', 'System Maintenance'][i % 10],
  message: [
    'Registration for Blood Donation Camp at City Community Center is now open. Sign up today!',
    'Urgent: O+ blood required at City General Hospital. Please come forward to donate.',
    'Join us for Donor Appreciation Day on Aug 20th. Certificates and refreshments provided.',
    'The camp at Town Hall has been completed successfully. 150 units collected.',
    'Monthly donation report for July 2026 is now available in the Reports section.',
    'Rahul Verma has been added as a new volunteer. Welcome aboard!',
    'Blood stock for A- is running low. Consider organizing a camp soon.',
    'Your camp "Mega Blood Drive" has been approved by the admin.',
    'Your eligibility status has been updated. Please check your profile.',
    'Scheduled maintenance on Aug 25, 2-4 AM. Some features may be unavailable.',
  ][i % 10],
  type: ['camp', 'emergency', 'camp', 'camp', 'report', 'system', 'emergency', 'camp', 'system', 'system'][i % 10],
  isRead: i % 3 === 0,
  createdAt: new Date(Date.now() - i * 3600000 - Math.random() * 86400000).toISOString(),
  link: ['/camps', '/emergency-requests', '/camps', '/camps', '/reports', '/volunteers', '/dashboard', '/camps', '/profile', '/settings'][i % 10],
}));

const fetchNotifications = () => new Promise(res => setTimeout(() => res({ success: true, data: mockNotifications }), 500));

const typeIcons = { camp: '🩸', emergency: '🚨', report: '📊', system: '⚙️' };
const typeColors = { camp: '#E53935', emergency: '#FF9800', report: '#2196F3', system: '#6B7280' };

const timeAgo = (date) => {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString();
};

export default function NotificationCenterPage() {
  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchNotifications().then(r => {
      if (r.success) setNotifs(r.data);
      else setError('Failed to load');
    }).catch(() => setError('Failed to load')).finally(() => setLoading(false));
  }, []);

  const unreadCount = notifs.filter(n => !n.isRead).length;
  const tabs = ['All', 'Unread', 'Camp', 'Emergency', 'Report', 'System'];

  const filtered = filter === 'All' ? notifs : filter === 'Unread' ? notifs.filter(n => !n.isRead) : notifs.filter(n => n.type === filter.toLowerCase());

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, isRead: true })));

  const toggleRead = (id) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, isRead: !n.isRead } : n));

  if (loading) return <div className="page-wrapper text-center py-5"><Spinner animation="border" variant="danger" /></div>;
  if (error) return <div className="page-wrapper"><Alert variant="danger">{error} <Button size="sm" variant="outline-danger" onClick={() => window.location.reload()}>Retry</Button></Alert></div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="page-wrapper">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <div className="d-flex align-items-center gap-2">
            <h1 className="page-title mb-0">Notifications</h1>
            {unreadCount > 0 && <Badge bg="danger" className="rounded-pill">{unreadCount}</Badge>}
          </div>
          <p className="page-subtitle mb-0">Stay updated with latest activities</p>
        </div>
        <div className="d-flex gap-2">
          {unreadCount > 0 && <Button variant="outline-danger" size="sm" onClick={markAllRead}>Mark All Read</Button>}
          <Button variant="outline-secondary" size="sm" href="/notifications/settings">⚙️ Settings</Button>
        </div>
      </div>

      <div className="d-flex gap-2 mb-4 flex-wrap">
        {tabs.map(t => (
          <button key={t} onClick={() => setFilter(t)}
            className={`btn btn-sm rounded-pill ${filter === t ? 'btn-danger' : 'btn-outline-secondary'}`}
            style={{ fontWeight: filter === t ? 600 : 400 }}>
            {t}{t === 'All' ? ` (${notifs.length})` : ''}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-5">
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔔</div>
          <h5 className="fw-semibold">No notifications</h5>
          <p className="text-muted">You're all caught up!</p>
        </div>
      ) : (
        <div className="d-flex flex-column gap-2">
          {filtered.map((n, idx) => (
            <motion.div key={n.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.02 }}>
              <div className="card border-0 shadow-sm" style={{ borderRadius: 12, cursor: 'pointer', borderLeft: `4px solid ${n.isRead ? 'transparent' : typeColors[n.type]}` }}
                onClick={() => setExpandedId(expandedId === n.id ? null : n.id)}>
                <div className="card-body p-3">
                  <div className="d-flex align-items-start gap-3">
                    <div className="fs-4 flex-shrink-0">{typeIcons[n.type]}</div>
                    <div className="flex-grow-1 min-w-0">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <span className="fw-semibold" style={{ color: n.isRead ? '#6B7280' : '#1A1A2E' }}>{n.title}</span>
                          {!n.isRead && <span className="ms-2 badge rounded-pill" style={{ background: typeColors[n.type], fontSize: 10 }}>NEW</span>}
                        </div>
                        <small className="text-muted flex-shrink-0 ms-2">{timeAgo(n.createdAt)}</small>
                      </div>
                      <p className={`mb-0 mt-1 ${expandedId === n.id ? '' : 'text-truncate'}`} style={{ color: '#6B7280', fontSize: 14 }}>{n.message}</p>
                      {expandedId === n.id && (
                        <div className="mt-2">
                          <Button size="sm" variant="link" className="p-0 me-2" href={n.link}>View Details →</Button>
                          <Button size="sm" variant="link" className="p-0 text-secondary" onClick={(e) => { e.stopPropagation(); toggleRead(n.id); }}>
                            {n.isRead ? 'Mark Unread' : 'Mark Read'}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}