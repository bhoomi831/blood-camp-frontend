import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Spinner, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

// ── Glassmorphism color tokens ──
const BRAND_RED = '#E53935';
const BRAND_RED_DARK = '#B71C1C';
const BRAND_RED_LIGHT = '#FFEBEE';

// ── Framer Motion variants ──
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 16 },
  },
};

const heroVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 80, damping: 14, delay: 0.3 },
  },
};

const formVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 80, damping: 14, delay: 0.3 },
  },
};

// ── Pulse animation for the heartbeat icon ──
const pulseVariants = {
  animate: {
    scale: [1, 1.08, 1],
    transition: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' },
  },
};

// ── Stats data ──
const stats = [
  { label: 'Lives Saved', value: '12,400+' },
  { label: 'Active Donors', value: '4,800+' },
  { label: 'Camps Organized', value: '320+' },
];

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Mock validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock user data - in a real app, this would come from your backend
    // For demo, we'll assign roles based on email
    let role = 'Donor'; // Default role
    if (email.includes('admin')) {
      role = 'Super Admin';
    } else if (email.includes('hospital')) {
      role = 'Hospital Admin';
    } else if (email.includes('volunteer')) {
      role = 'Volunteer';
    }

    const mockUser = {
      id: Math.floor(Math.random() * 1000),
      email: email,
      name: email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      role: role,
      avatar: 'https://via.placeholder.com/40'
    };

    // Login using auth context
    login(mockUser);

    setSuccess('Login successful!');
    setLoading(false);

    // Redirect to dashboard after success
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  // ── Page background with subtle gradient and floating circles ──
  const pageStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(145deg, #0B0C10 0%, #1A1C23 50%, #0B0C10 100%)',
    position: 'relative',
    overflow: 'hidden',
    padding: '24px',
  };

  // ── Decorative floating circles ──
  const circles = [
    { top: '10%', left: '5%', size: 260, opacity: 0.08, delay: 0 },
    { bottom: '15%', right: '8%', size: 320, opacity: 0.06, delay: 1.5 },
    { top: '50%', right: '30%', size: 180, opacity: 0.05, delay: 0.8 },
    { bottom: '30%', left: '50%', size: 140, opacity: 0.04, delay: 2.2 },
  ];

  return (
    <div style={pageStyle}>
      {/* Floating decorative circles */}
      {circles.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: c.opacity, scale: 1 }}
          transition={{ duration: 1.8, delay: c.delay, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            ...(c.top ? { top: c.top } : {}),
            ...(c.bottom ? { bottom: c.bottom } : {}),
            ...(c.left ? { left: c.left } : {}),
            ...(c.right ? { right: c.right } : {}),
            width: c.size,
            height: c.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${BRAND_RED}66 0%, transparent 70%)`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      ))}

      {/* Main card container — glassmorphism */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 1100,
          borderRadius: 32,
          overflow: 'hidden',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(229, 57, 53, 0.25)',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        }}
      >
        <Row className="g-0">
          {/* ── LEFT: Hero Section ── */}
          <Col
            md={6}
            as={motion.div}
            variants={heroVariants}
            style={{
              background: 'linear-gradient(135deg, rgba(229,57,53,0.15) 0%, rgba(183,28,28,0.25) 100%)',
              padding: '60px 48px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              minHeight: 500,
            }}
          >
            {/* Accent line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: 4,
                background: `linear-gradient(90deg, ${BRAND_RED}, ${BRAND_RED_LIGHT}, ${BRAND_RED})`,
              }}
            />

            {/* Blood drop / heartbeat icon */}
            <motion.div
              variants={pulseVariants}
              animate="animate"
              style={{ marginBottom: 32, fontSize: 72, lineHeight: 1 }}
            >
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M40 75C54.3594 75 66 63.3594 66 49C66 30.5 40 5 40 5C40 5 14 30.5 14 49C14 63.3594 25.6406 75 40 75Z"
                  fill="url(#bloodGradient)"
                  stroke={BRAND_RED}
                  strokeWidth="2"
                />
                <path
                  d="M30 49L35 44L40 52L45 42L50 49"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="40" cy="49" r="2" fill="white" />
                <defs>
                  <linearGradient id="bloodGradient" x1="40" y1="5" x2="40" y2="75" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#EF5350" />
                    <stop offset="1" stopColor="#B71C1C" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Tagline */}
            <motion.h1
              variants={itemVariants}
              style={{
                fontSize: 40,
                fontWeight: 800,
                color: '#FFFFFF',
                marginBottom: 8,
                letterSpacing: '-0.5px',
                lineHeight: 1.2,
              }}
            >
              Save Lives.
              <br />
              <span style={{ color: BRAND_RED }}>Donate Blood.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              style={{
                fontSize: 16,
                color: 'rgba(255,255,255,0.7)',
                marginBottom: 40,
                lineHeight: 1.7,
                maxWidth: 380,
              }}
            >
              Join thousands of heroes who make a difference every day. Your single
              donation can save up to three lives.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              style={{
                display: 'flex',
                gap: 32,
                flexWrap: 'wrap',
              }}
            >
              {stats.map((s, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: BRAND_RED,
                      lineHeight: 1.2,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.5)',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Bottom decorative glow */}
            <div
              style={{
                position: 'absolute',
                bottom: -40,
                right: -40,
                width: 200,
                height: 200,
                borderRadius: '50%',
Background: 'radial-gradient(circle, #E5393522 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />
          </Col>

          {/* ── RIGHT: Login Form ── */}
          <Col
            md={6}
            as={motion.div}
            variants={formVariants}
            style={{
              padding: '60px 48px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minHeight: 500,
            }}
          >
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              {/* Form header */}
              <motion.div variants={itemVariants} style={{ marginBottom: 32 }}>
                <h2
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: '#FFFFFF',
                    marginBottom: 4,
                    letterSpacing: '-0.3px',
                  }}
                >
                  Welcome Back
                </h2>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                  Sign in to manage blood donation camps
                </p>
              </motion.div>

              {/* Success Alert */}
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
                      background: 'rgba(46, 125, 50, 0.15)',
                      border: '1px solid rgba(46, 125, 50, 0.3)',
                      backdropFilter: 'blur(10px)',
                      color: '#A5D6A7',
                      borderRadius: 12,
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    {success}
                  </Alert>
                </motion.div>
              )}

              {/* Error Alert */}
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
                      background: 'rgba(229, 57, 53, 0.15)',
                      border: '1px solid rgba(229, 57, 53, 0.3)',
                      backdropFilter: 'blur(10px)',
                      color: '#EF9A9A',
                      borderRadius: 12,
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    {error}
                  </Alert>
                </motion.div>
              )}

              {/* Form */}
              <Form onSubmit={handleSubmit} noValidate>
                {/* Email */}
                <motion.div variants={itemVariants} style={{ marginBottom: 20 }}>
                  <Form.Label
                    style={{
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: 13,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginBottom: 8,
                    }}
                  >
                    Email Address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 12,
                      padding: '14px 16px',
                      color: '#FFFFFF',
                      fontSize: 15,
                      outline: 'none',
                      boxShadow: 'none',
                      transition: 'all 0.25s ease',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = BRAND_RED;
                      e.target.style.background = 'rgba(229,57,53,0.08)';
                      e.target.style.boxShadow = `0 0 0 3px ${BRAND_RED}22`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                      e.target.style.background = 'rgba(255,255,255,0.06)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </motion.div>

                {/* Password */}
                <motion.div variants={itemVariants} style={{ marginBottom: 20, position: 'relative' }}>
                  <Form.Label
                    style={{
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: 13,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginBottom: 8,
                    }}
                  >
                    Password
                  </Form.Label>
                  <div style={{ position: 'relative' }}>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 12,
                        padding: '14px 48px 14px 16px',
                        color: '#FFFFFF',
                        fontSize: 15,
                        outline: 'none',
                        boxShadow: 'none',
                        transition: 'all 0.25s ease',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = BRAND_RED;
                        e.target.style.background = 'rgba(229,57,53,0.08)';
                        e.target.style.boxShadow = `0 0 0 3px ${BRAND_RED}22`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                        e.target.style.background = 'rgba(255,255,255,0.06)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                      style={{
                        position: 'absolute',
                        top: '50%',
                        right: 14,
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255,255,255,0.4)',
                        cursor: 'pointer',
                        fontSize: 13,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.3px',
                        padding: '4px 8px',
                        borderRadius: 8,
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.target.style.color = BRAND_RED)}
                      onMouseLeave={(e) => (e.target.style.color = 'rgba(255,255,255,0.4)')}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </motion.div>

                {/* Remember Me & Forgot Password */}
                <motion.div
                  variants={itemVariants}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 28,
                  }}
                >
                  <Form.Check
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    label={
                      <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
                        Remember me
                      </span>
                    }
                    style={{ userSelect: 'none' }}
                    custom
                  />
                  <a
                    href="/forgot-password"
                    style={{
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: 13,
                      fontWeight: 500,
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = BRAND_RED)}
                    onMouseLeave={(e) => (e.target.style.color = 'rgba(255,255,255,0.5)')}
                  >
                    Forgot Password?
                  </a>
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '14px 24px',
                      background: loading
                        ? `linear-gradient(135deg, ${BRAND_RED_DARK}, ${BRAND_RED})`
                        : `linear-gradient(135deg, ${BRAND_RED}, #EF5350)`,
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: 12,
                      fontSize: 16,
                      fontWeight: 700,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      letterSpacing: '0.3px',
                      transition: 'all 0.3s ease',
                      boxShadow: loading
                        ? 'none'
                        : `0 8px 24px ${BRAND_RED}44`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = `0 12px 32px ${BRAND_RED}55`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!loading) {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = `0 8px 24px ${BRAND_RED}44`;
                      }
                    }}
                  >
                    {loading && (
                      <Spinner
                        animation="border"
                        size="sm"
                        style={{ width: 18, height: 18, borderWidth: 2 }}
                      />
                    )}
                    {loading ? 'Signing In...' : 'Sign In'}
                  </button>
                </motion.div>

                {/* Register link */}
                <motion.div
                  variants={itemVariants}
                  style={{ textAlign: 'center', marginTop: 24 }}
                >
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginBottom: 6 }}>
                    Don't have an account?{' '}
                    <a
                      href="/register"
                      style={{
                        color: BRAND_RED,
                        fontWeight: 600,
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.target.style.color = '#EF5350')}
                      onMouseLeave={(e) => (e.target.style.color = BRAND_RED)}
                    >
                      Sign Up
                    </a>
                  </p>
                  <a
                    href="/"
                    style={{
                      color: 'rgba(255,255,255,0.3)',
                      fontSize: 13,
                      fontWeight: 500,
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = 'rgba(255,255,255,0.6)')}
                    onMouseLeave={(e) => (e.target.style.color = 'rgba(255,255,255,0.3)')}
                  >
                    &larr; Back to Home
                  </a>
                </motion.div>
              </Form>
            </motion.div>
          </Col>
        </Row>
      </motion.div>
    </div>
  );
};

export default LoginPage;
