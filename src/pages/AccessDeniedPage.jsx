import { Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const AccessDeniedPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location || {};
  const redirectTo = state?.from?.pathname || '/';

  const handleBack = () => {
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-5 bg-white rounded-lg shadow-md"
        style={{ maxWidth: 400, width: '90%' }}
      >
        <div style={{ fontSize: 60, marginBottom: 20 }}>🔒</div>
        <h2 className="mb-4">Access Denied</h2>
        <p className="text-muted mb-5">
          You don't have permission to access this page. Please contact your administrator
          if you believe this is an error.
        </p>
        <Button
          variant="outline-primary"
          onClick={handleBack}
          className="w-100"
        >
          Go Back
        </Button>
      </motion.div>
    </div>
  );
};

export default AccessDeniedPage;