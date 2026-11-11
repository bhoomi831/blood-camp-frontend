import { useState } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function NotificationSettingsPage() {
  const [settings, setSettings] = useState({
    pushEnabled: true,
    emailEnabled: true,
    campUpdates: true,
    emergencyAlerts: true,
    reportReady: true,
    systemAnnouncements: false,
    quietHours: false,
    quietStart: '22:00',
    quietEnd: '08:00',
  });
  const [saved, setSaved] = useState(false);

  const toggle = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  const SwitchRow = ({ label, desc, value, onChange, disabled }) => (
    <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
      <div>
        <div className="fw-semibold">{label}</div>
        <small className="text-muted">{desc}</small>
      </div>
      <Form.Check type="switch" checked={value} onChange={onChange} disabled={disabled}
        style={{ transform: 'scale(1.2)' }} />
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="page-wrapper min-vh-100 bg-gray-50">
      <div className="mb-4">
        <h1 className="page-title">Notification Settings</h1>
        <p className="page-subtitle">Customize your notification preferences</p>
      </div>

      {saved && <Alert variant="success" dismissible onClose={() => setSaved(false)}>Settings saved successfully!</Alert>}

      <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: 14 }}>
        <Card.Body className="p-4">
          <h5 className="fw-semibold mb-3">Delivery Methods</h5>
          <SwitchRow label="Push Notifications" desc="Receive notifications in the app" value={settings.pushEnabled} onChange={() => toggle('pushEnabled')} />
          <SwitchRow label="Email Notifications" desc="Receive notifications via email" value={settings.emailEnabled} onChange={() => toggle('emailEnabled')} />
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: 14 }}>
        <Card.Body className="p-4">
          <h5 className="fw-semibold mb-3">Notification Types</h5>
          <SwitchRow label="Camp Updates" desc="Camp registrations, approvals, completions" value={settings.campUpdates} onChange={() => toggle('campUpdates')} />
          <SwitchRow label="Emergency Alerts" desc="Urgent blood requests and shortages" value={settings.emergencyAlerts} onChange={() => toggle('emergencyAlerts')} disabled={!settings.pushEnabled} />
          <SwitchRow label="Report Ready" desc="Monthly and weekly reports" value={settings.reportReady} onChange={() => toggle('reportReady')} />
          <SwitchRow label="System Announcements" desc="Maintenance, updates, and announcements" value={settings.systemAnnouncements} onChange={() => toggle('systemAnnouncements')} />
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: 14 }}>
        <Card.Body className="p-4">
          <h5 className="fw-semibold mb-3">Quiet Hours</h5>
          <SwitchRow label="Enable Quiet Hours" desc="Mute notifications during specified hours" value={settings.quietHours} onChange={() => toggle('quietHours')} />
          {settings.quietHours && (
            <div className="d-flex gap-3 mt-3">
              <Form.Group>
                <Form.Label>From</Form.Label>
                <Form.Control type="time" value={settings.quietStart} onChange={e => setSettings(prev => ({ ...prev, quietStart: e.target.value }))} />
              </Form.Group>
              <Form.Group>
                <Form.Label>To</Form.Label>
                <Form.Control type="time" value={settings.quietEnd} onChange={e => setSettings(prev => ({ ...prev, quietEnd: e.target.value }))} />
              </Form.Group>
            </div>
          )}
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="outline-secondary" as={Link} to="/notifications">Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save Preferences</Button>
      </div>
    </motion.div>
  );
}