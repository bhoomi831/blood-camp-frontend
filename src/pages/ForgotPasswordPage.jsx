import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  SVG Blood Drop icon (inline, so no external asset is needed)      */
/* ------------------------------------------------------------------ */
const BloodDropIcon = ({ size = 80 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2.69l5.66 5.66a8 8 0 11-11.32 0L12 2.69z"
      fill="url(#bloodGradient)"
      opacity={0.9}
    />
    <path
      d="M12 2.69l5.66 5.66a8 8 0 11-11.32 0L12 2.69z"
      fill="#ffffff"
      opacity={0.15}
    />
    <path
      d="M12 4.1l4.95 4.95a6.5 6.5 0 11-9.9 0L12 4.1z"
      fill="url(#bloodHighlight)"
      opacity={0.4}
    />
    <defs>
      <linearGradient id="bloodGradient" x1="12" y1="2.69" x2="12" y2="20">
        <stop stopColor="#EF5350" />
        <stop offset="1" stopColor="#C62828" />
      </linearGradient>
      <linearGradient id="bloodHighlight" x1="12" y1="4.1" x2="12" y2="15">
        <stop stopColor="#FF8A80" />
        <stop offset="1" stopColor="#E53935" />
      </linearGradient>
    </defs>
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Framer Motion variants                                            */
/* ------------------------------------------------------------------ */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: 'beforeChildren', staggerChildren: 0.12 },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 80, damping: 20 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 70, damping: 18 },
  },
};

const formItemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.35 + i * 0.08, duration: 0.4 },
  }),
};

const successVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
  exit: { opacity: 0, scale: 0.9, y: -10, transition: { duration: 0.2 } },
};

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    // Mock API call (always succeeds after 1.5 s)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    setSuccess(true);
  };

  const handleBack = () => navigate('/login');

  /* ---- Inline styles (kept here so the file is self-contained) ---- */
  const styles = {
    page: {
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      fontFamily: "var(--font-family, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)",
      background: 'linear-gradient(145deg, #FFF5F5 0%, #FCE4EC 40%, #F8BBD0 100%)',
    },
    /* ---------- Background decorative blobs ---------- */
    blob: {
      position: 'absolute',
      borderRadius: '50%',
      filter: 'blur(80px)',
      opacity: 0.18,
      pointerEvents: 'none',
    },
    blob1: {
      width: '500px',
      height: '500px',
      background: '#E53935',
      top: '-150px',
      right: '-100px',
    },
    blob2: {
      width: '400px',
      height: '400px',
      background: '#C62828',
      bottom: '-120px',
      left: '-80px',
    },
    blob3: {
      width: '300px',
      height: '300px',
      background: '#EF5350',
      top: '40%',
      left: '55%',
      opacity: 0.1,
    },
    /* ---------- Hero (left) ---------- */
    heroCol: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '2rem 2.5rem',
      color: '#1A1A2E',
    },
    bloodIconWrapper: {
      display: 'inline-flex',
      marginBottom: '1.5rem',
      filter: 'drop-shadow(0 4px 12px rgba(229,57,53,0.3))',
    },
    heroTitle: {
      fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
      fontWeight: 700,
      lineHeight: 1.2,
      marginBottom: '0.75rem',
      color: '#1A1A2E',
    },
    heroSubtitle: {
      fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
      color: '#475569',
      lineHeight: 1.6,
      maxWidth: 420,
    },
    /* ---------- Glass card (right) ---------- */
    cardCol: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    glassWrapper: {
      width: '100%',
      maxWidth: 420,
      padding: '0.5rem',
    },
    glassCard: {
      background: 'rgba(255, 255, 255, 0.65)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.35)',
      borderRadius: '20px',
      padding: '2.5rem 2rem',
      boxShadow: '0 8px 40px rgba(0,0,0,0.06), 0 2px 10px rgba(229,57,53,0.04)',
    },
    cardTitle: {
      fontSize: '1.35rem',
      fontWeight: 600,
      marginBottom: '0.35rem',
      color: '#1A1A2E',
    },
    cardSubtitle: {
      fontSize: '0.9rem',
      color: '#64748B',
      marginBottom: '1.75rem',
    },
    /* ---------- Email field ---------- */
    inputWrapper: {
      position: 'relative',
    },
    input: {
      width: '100%',
      padding: '0.75rem 1rem 0.75rem 2.6rem',
      fontSize: '0.95rem',
      border: '1.5px solid rgba(229,57,53,0.12)',
      borderRadius: '12px',
      background: 'rgba(255,255,255,0.7)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      outline: 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      fontFamily: 'inherit',
      color: '#1A1A2E',
    },
    inputIcon: {
      position: 'absolute',
      left: '0.85rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#94A3B8',
      fontSize: '1rem',
      lineHeight: 1,
      display: 'flex',
      alignItems: 'center',
    },
    /* ---------- Button ---------- */
    submitBtn: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: 'none',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #E53935 0%, #C62828 100%)',
      color: '#fff',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'box-shadow 0.25s, transform 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      boxShadow: '0 4px 16px rgba(229,57,53,0.25)',
    },
    /* ---------- Back link ---------- */
    backLink: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.4rem',
      color: '#64748B',
      fontSize: '0.88rem',
      fontWeight: 500,
      cursor: 'pointer',
      border: 'none',
      background: 'none',
      padding: 0,
      fontFamily: 'inherit',
      transition: 'color 0.2s',
    },
  };

  return (
    <motion.div
      style={styles.page}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background blobs */}
      <div style={{ ...styles.blob, ...styles.blob1 }} />
      <div style={{ ...styles.blob, ...styles.blob2 }} />
      <div style={{ ...styles.blob, ...styles.blob3 }} />

      <Container fluid style={{ position: 'relative', zIndex: 1, padding: '1.5rem' }}>
        <Row className="align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 3rem)' }}>
          {/* ========== LEFT – Hero ========== */}
          <Col xs={12} lg={6} style={styles.heroCol}>
            <motion.div variants={heroItemVariants} style={styles.bloodIconWrapper}>
              <BloodDropIcon size={72} />
            </motion.div>

            <motion.h1 variants={heroItemVariants} style={styles.heroTitle}>
              Forgot Your Password?
            </motion.h1>

            <motion.p variants={heroItemVariants} style={styles.heroSubtitle}>
              No worries. Enter your registered email and we&rsquo;ll send you a secure link
              to reset your password in just a few seconds.
            </motion.p>

            {/* Decorative subtle stats line (purely visual) */}
            <motion.div
              variants={heroItemVariants}
              style={{
                display: 'flex',
                gap: '1.5rem',
                marginTop: '2rem',
                flexWrap: 'wrap',
              }}
            >
              {[
                { label: 'Secure', desc: '256-bit encryption' },
                { label: 'Fast', desc: 'Delivered in seconds' },
                { label: 'Reliable', desc: '99.9% uptime' },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#1A1A2E' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>{item.desc}</div>
                </div>
              ))}
            </motion.div>
          </Col>

          {/* ========== RIGHT – Glass form card ========== */}
          <Col xs={12} lg={6} style={styles.cardCol}>
            <motion.div style={styles.glassWrapper} variants={cardVariants}>
              <div style={styles.glassCard}>
                {/* Card heading */}
                <motion.div custom={0} variants={formItemVariants} initial="hidden" animate="visible">
                  <h2 style={styles.cardTitle}>Reset Password</h2>
                  <p style={styles.cardSubtitle}>
                    Enter the email associated with your account.
                  </p>
                </motion.div>

                {/* ---------- Success state ---------- */}
                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div
                      key="success"
                      variants={successVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Alert
                        variant="success"
                        style={{
                          borderRadius: '12px',
                          border: 'none',
                          background: 'rgba(16,185,129,0.1)',
                          backdropFilter: 'blur(6px)',
                          color: '#065F46',
                          fontSize: '0.92rem',
                          padding: '1.25rem 1rem',
                          marginBottom: '1.5rem',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="2" />
                            <path d="M8 12l3 3 5-5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span style={{ fontWeight: 500 }}>Check your email for the reset link.</span>
                        </div>
                      </Alert>

                      <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                        If an account with that email exists, you&rsquo;ll receive the link shortly.
                        Didn&rsquo;t receive anything? Check your spam folder or{' '}
                        <button
                          type="button"
                          onClick={() => { setSuccess(false); setError(''); setEmail(''); }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#E53935',
                            fontWeight: 600,
                            cursor: 'pointer',
                            padding: 0,
                            fontFamily: 'inherit',
                            fontSize: 'inherit',
                            textDecoration: 'underline',
                          }}
                        >
                          try again
                        </button>
                        .
                      </p>

                      <button
                        type="button"
                        onClick={handleBack}
                        style={styles.backLink}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 18 9 12 15 6" />
                        </svg>
                        Back to Login
                      </button>
                    </motion.div>
                  ) : (
                    /* ---------- Form ---------- */
                    <motion.div key="form">
                      <Form noValidate onSubmit={handleSubmit}>
                        {/* Email input */}
                        <motion.div
                          custom={1}
                          variants={formItemVariants}
                          initial="hidden"
                          animate="visible"
                          style={{ ...styles.inputWrapper, marginBottom: '1.25rem' }}
                        >
                          <span style={styles.inputIcon}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="2" y="4" width="20" height="16" rx="2" />
                              <polyline points="2,4 12,13 22,4" />
                            </svg>
                          </span>
                          <Form.Control
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (error) setError('');
                            }}
                            isInvalid={!!error}
                            style={styles.input}
                            autoFocus
                          />
                          <Form.Control.Feedback type="invalid" style={{ fontSize: '0.8rem', paddingLeft: '0.25rem' }}>
                            {error}
                          </Form.Control.Feedback>
                        </motion.div>

                        {/* Error Alert */}
                        <AnimatePresence>
                          {error && (
                            <motion.div
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.2 }}
                              style={{ marginBottom: '1rem' }}
                            >
                              <Alert
                                variant="danger"
                                style={{
                                  borderRadius: '10px',
                                  border: 'none',
                                  background: 'rgba(239,68,68,0.08)',
                                  color: '#991B1B',
                                  fontSize: '0.85rem',
                                  padding: '0.65rem 1rem',
                                  marginBottom: 0,
                                }}
                              >
                                {error}
                              </Alert>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Submit button */}
                        <motion.div
                          custom={2}
                          variants={formItemVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <button
                            type="submit"
                            disabled={loading}
                            style={{
                              ...styles.submitBtn,
                              opacity: loading ? 0.75 : 1,
                              cursor: loading ? 'not-allowed' : 'pointer',
                            }}
                            onMouseEnter={(e) => {
                              if (!loading) {
                                e.currentTarget.style.boxShadow = '0 6px 24px rgba(229,57,53,0.35)';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.boxShadow = '0 4px 16px rgba(229,57,53,0.25)';
                              e.currentTarget.style.transform = 'translateY(0)';
                            }}
                          >
                            {loading && (
                              <Spinner
                                animation="border"
                                size="sm"
                                style={{ width: '1rem', height: '1rem' }}
                              />
                            )}
                            {loading ? 'Sending...' : 'Send Reset Link'}
                          </button>
                        </motion.div>

                        {/* Back to login */}
                        <motion.div
                          custom={3}
                          variants={formItemVariants}
                          initial="hidden"
                          animate="visible"
                          style={{ textAlign: 'center', marginTop: '1.5rem' }}
                        >
                          <button
                            type="button"
                            onClick={handleBack}
                            style={styles.backLink}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="15 18 9 12 15 6" />
                            </svg>
                            Back to Login
                          </button>
                        </motion.div>
                      </Form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default ForgotPasswordPage;