import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="text-center px-4">
        <div style={{ fontSize: 96, fontWeight: 800, color: '#E53935', lineHeight: 1 }}>404</div>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🩸</div>
        <h3 className="fw-semibold mb-2">Page Not Found</h3>
        <p className="text-muted mb-4" style={{ maxWidth: 400 }}>
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="d-flex gap-3 justify-content-center">
          <Button variant="danger" as={Link} to="/dashboard">Go to Dashboard</Button>
          <Button variant="outline-secondary" as={Link} to="/">Back to Home</Button>
        </div>
      </div>
    </motion.div>
  );
}