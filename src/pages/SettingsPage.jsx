import { useState } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'Blood Donation Camp Management',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    itemsPerPage: 20,
    emailNotifications: true,
    autoApproveCamps: false,
    requireScreening: true,
    allowRegistration: true,
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (key, value) => setSettings(prev => ({ ...prev, [key]: value }));
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="page-wrapper">
      <div className="mb-4">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Configure system preferences</p>
      </div>

      {saved && <Alert variant="success" dismissible onClose={() => setSaved(false)}>Settings saved successfully!</Alert>}

      <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: 14 }}>
        <Card.Body className="p-4">
          <h5 className="fw-semibold mb-3">General Settings</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <Form.Group><Form.Label className="fw-medium">Site Name</Form.Label><Form.Control value={settings.siteName} onChange={e => handleChange('siteName', e.target.value)} /></Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group><Form.Label className="fw-medium">Timezone</Form.Label><Form.Select value={settings.timezone} onChange={e => handleChange('timezone', e.target.value)}>
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">America/New_York</option>
              </Form.Select></Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group><Form.Label className="fw-medium">Date Format</Form.Label><Form.Select value={settings.dateFormat} onChange={e => handleChange('dateFormat', e.target.value)}>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </Form.Select></Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group><Form.Label className="fw-medium">Items Per Page</Form.Label><Form.Select value={settings.itemsPerPage} onChange={e => handleChange('itemsPerPage', parseInt(e.target.value))}>
                <option value={10}>10</option><option value={20}>20</option><option value={50}>50</option><option value={100}>100</option>
              </Form.Select></Form.Group>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: 14 }}>
        <Card.Body className="p-4">
          <h5 className="fw-semibold mb-3">System Preferences</h5>
          {[
            { key: 'emailNotifications', label: 'Email Notifications', desc: 'Send system emails to users' },
            { key: 'autoApproveCamps', label: 'Auto-approve Camps', desc: 'Skip approval workflow for camp creation' },
            { key: 'requireScreening', label: 'Require Medical Screening', desc: 'Mandatory screening before donation' },
            { key: 'allowRegistration', label: 'Allow Public Registration', desc: 'Let new users register themselves' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="d-flex justify-content-between align-items-center py-3" style={{ borderBottom: '1px solid #f0f0f0' }}>
              <div><div className="fw-semibold">{label}</div><small className="text-muted">{desc}</small></div>
              <Form.Check type="switch" checked={settings[key]} onChange={() => handleChange(key, !settings[key])} style={{ transform: 'scale(1.2)' }} />
            </div>
          ))}
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="light">Reset to Defaults</Button>
        <Button variant="danger" onClick={handleSave}>Save Settings</Button>
      </div>
    </motion.div>
  );
}