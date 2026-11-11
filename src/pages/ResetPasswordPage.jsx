import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Container, Row, Col, Form, Alert, Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';

const RED = '#E53935';
const RED_DARK = '#C62828';

const getStrength = (pw) => {
  if (!pw) return { label: '', pct: 0, color: RED };
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[a-z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  const labels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
  const colors = ['#EF4444', '#F59E0B', '#FBBF24', '#10B981', '#059669'];
  return { label: labels[s], pct: ((s + 1) / 5) * 100, color: colors[s] };
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const EyeOpen = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeClosed = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A7F3D0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.state?.token || '';

  const strength = getStrength(newPassword);
  const pwMatch = confirmPassword.length === 0 || newPassword === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      setLoading(false);
      return;
    }

    await new Promise((r) => setTimeout(r, 1500));
    setSuccess('Password has been reset successfully!');
    setLoading(false);
    setTimeout(() => navigate('/login'), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 40%, #0F172A 100%)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative blobs */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(229,57,53,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-8%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(229,57,53,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '40%',
          right: '30%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container style={{ position: 'relative', zIndex: 1 }}>
        <Row className="align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
          {/* ---------- LEFT HERO ---------- */}
          <Col lg={5} className="d-none d-lg-flex flex-column justify-content-center text-white pe-5">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants} style={{ marginBottom: 32 }}>
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 20,
                    background: 'linear-gradient(135deg, #E53935, #C62828)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 36,
                    boxShadow: '0 8px 32px rgba(229,57,53,0.3)',
                    marginBottom: 24,
                  }}
                >
                  🔄
                </div>
                <h1
                  style={{
                    fontSize: '2.6rem',
                    fontWeight: 700,
                    lineHeight: 1.2,
                    marginBottom: 16,
                  }}
                >
                  Reset Your
                  <br />
                  <span style={{ color: RED }}>Password</span>
                </h1>
                <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.65)', maxWidth: 400 }}>
                  Choose a strong password for your account. Make sure it's at least 8
                  characters with a mix of letters, numbers, and symbols.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div
                  style={{
                    display: 'flex',
                    gap: 16,
                    marginBottom: 12,
                    alignItems: 'center',
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '0.9rem',
                  }}
                >
                  <span style={{ fontSize: 18 }}>🛡️</span>
                  <span>End-to-end encrypted</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: 16,
                    alignItems: 'center',
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '0.9rem',
                  }}
                >
                  <span style={{ fontSize: 18 }}>⚡</span>
                  <span>Instant confirmation</span>
                </div>
              </motion.div>
            </motion.div>
          </Col>

          {/* ---------- RIGHT GLASS CARD ---------- */}
          <Col xs={12} sm={10} md={8} lg={5} xl={4}>
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.10)',
                  borderRadius: 24,
                  padding: '40px 36px',
                  boxShadow: '0 8px 48px rgba(0, 0, 0, 0.25)',
                }}
              >
                {/* Mobile hero */}
                <div className="d-lg-none text-center mb-4">
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 16,
                      background: 'linear-gradient(135deg, #E53935, #C62828)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 28,
                      margin: '0 auto 12px',
                      boxShadow: '0 8px 24px rgba(229,57,53,0.3)',
                    }}
                  >
                    🔄
                  </div>
                  <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '1.5rem', marginBottom: 4 }}>
                    Reset Password
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', margin: 0 }}>
                    Choose a strong password for your account
                  </p>
                </div>

                {/* Alerts */}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{ marginBottom: 20 }}
                  >
                    <Alert
                      variant="success"
                      dismissible
                      onClose={() => setSuccess(null)}
                      style={{
                        background: 'rgba(16,185,129,0.15)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(16,185,129,0.25)',
                        color: '#A7F3D0',
                        borderRadius: 12,
                        fontSize: '0.9rem',
                      }}
                    >
                      {success}
                    </Alert>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{ marginBottom: 20 }}
                  >
                    <Alert
                      variant="danger"
                      dismissible
                      onClose={() => setError(null)}
                      style={{
                        background: 'rgba(239,68,68,0.15)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(239,68,68,0.25)',
                        color: '#FCA5A5',
                        borderRadius: 12,
                        fontSize: '0.9rem',
                      }}
                    >
                      {error}
                    </Alert>
                  </motion.div>
                )}

                <Form onSubmit={handleSubmit} noValidate>
                  {/* New Password */}
                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        marginBottom: 6,
                      }}
                    >
                      New Password <span style={{ color: RED }}>*</span>
                    </Form.Label>
                    <div style={{ position: 'relative' }}>
                      <Form.Control
                        type={showNew ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        style={{
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.10)',
                          borderRadius: 12,
                          padding: '12px 44px 12px 16px',
                          color: '#fff',
                          fontSize: '0.95rem',
                          outline: 'none',
                          boxShadow: 'none',
                          transition: 'border-color 0.2s',
                        }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = RED; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'; }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        tabIndex={-1}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          right: 14,
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          color: 'rgba(255,255,255,0.35)',
                          cursor: 'pointer',
                          padding: 0,
                          display: 'flex',
                        }}
                        aria-label={showNew ? 'Hide password' : 'Show password'}
                      >
                        {showNew ? <EyeClosed /> : <EyeOpen />}
                      </button>
                    </div>

                    {/* Password strength bar */}
                    {newPassword.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ marginTop: 10 }}
                      >
                        <div
                          style={{
                            height: 4,
                            borderRadius: 4,
                            background: 'rgba(255,255,255,0.08)',
                            overflow: 'hidden',
                          }}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${strength.pct}%` }}
                            transition={{ duration: 0.35, ease: 'easeOut' }}
                            style={{
                              height: '100%',
                              borderRadius: 4,
                              background: strength.color,
                            }}
                          />
                        </div>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            marginTop: 4,
                            display: 'block',
                            color: strength.color,
                          }}
                        >
                          {strength.label}
                        </span>
                      </motion.div>
                    )}
                  </Form.Group>

                  {/* Confirm Password */}
                  <Form.Group className="mb-4">
                    <Form.Label
                      style={{
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        marginBottom: 6,
                      }}
                    >
                      Confirm Password <span style={{ color: RED }}>*</span>
                    </Form.Label>
                    <div style={{ position: 'relative' }}>
                      <Form.Control
                        type={showConfirm ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        style={{
                          background: 'rgba(255,255,255,0.06)',
                          border: `1px solid ${
                            confirmPassword.length > 0 && !pwMatch
                              ? '#EF4444'
                              : confirmPassword.length > 0 && pwMatch
                              ? 'rgba(16,185,129,0.4)'
                              : 'rgba(255,255,255,0.10)'
                          }`,
                          borderRadius: 12,
                          padding: '12px 44px 12px 16px',
                          color: '#fff',
                          fontSize: '0.95rem',
                          outline: 'none',
                          boxShadow: 'none',
                          transition: 'border-color 0.2s',
                        }}
                        onFocus={(e) => {
                          if (!confirmPassword.length || pwMatch)
                            e.currentTarget.style.borderColor = RED;
                        }}
                        onBlur={(e) => {
                          if (!confirmPassword.length || pwMatch)
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)';
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        tabIndex={-1}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          right: 14,
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          color: 'rgba(255,255,255,0.35)',
                          cursor: 'pointer',
                          padding: 0,
                          display: 'flex',
                        }}
                        aria-label={showConfirm ? 'Hide password' : 'Show password'}
                      >
                        {showConfirm ? <EyeClosed /> : <EyeOpen />}
                      </button>
                    </div>
                    {confirmPassword.length > 0 && !pwMatch && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: '0.75rem', color: '#FCA5A5', marginTop: 4 }}
                      >
                        Passwords do not match
                      </motion.div>
                    )}
                    {confirmPassword.length > 0 && pwMatch && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          fontSize: '0.75rem',
                          color: '#A7F3D0',
                          marginTop: 4,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                        }}
                      >
                        <CheckIcon />
                        Passwords match
                      </motion.div>
                    )}
                  </Form.Group>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={!loading ? { scale: 1.02 } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                    style={{
                      width: '100%',
                      padding: '13px 0',
                      border: 'none',
                      borderRadius: 12,
                      background: loading
                        ? 'linear-gradient(135deg, #B71C1C, #C62828)'
                        : 'linear-gradient(135deg, #E53935, #C62828)',
                      color: '#fff',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      opacity: loading ? 0.7 : 1,
                      transition: 'opacity 0.2s',
                      boxShadow: '0 4px 20px rgba(229,57,53,0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                    }}
                  >
                    {loading && (
                      <Spinner
                        animation="border"
                        size="sm"
                        style={{ width: 18, height: 18, borderWidth: 2 }}
                      />
                    )}
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </motion.button>

                  {/* Back to Login */}
                  <div style={{ textAlign: 'center', marginTop: 24 }}>
                    <Link
                      to="/login"
                      style={{
                        color: 'rgba(255,255,255,0.5)',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        transition: 'color 0.2s',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = RED)}
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')
                      }
                    >
                      <ArrowLeft />
                      Back to Login
                    </Link>
                  </div>
                </Form>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default ResetPasswordPage;