import React, { useState } from 'react';
import { Container, Row, Col, Form, Spinner, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

/* ── brand palette ── */
const RED = '#E53935';
const RED_DARK = '#C62828';
const RED_GLOW = 'rgba(229, 57, 53, 0.25)';

/* ── reusable glass card style ── */
const glassCard = {
  background: 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(229, 57, 53, 0.25)',
  borderRadius: 24,
  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(229,57,53,0.08)',
};

/* ── Framer Motion variants ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 16 } },
};

const statCardVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.4 + i * 0.12, type: 'spring', stiffness: 80, damping: 14 },
  }),
};

/* ── inline style factories ── */
const inputStyle = (hasError) => ({
  background: 'rgba(255,255,255,0.70)',
  backdropFilter: 'blur(4px)',
  WebkitBackdropFilter: 'blur(4px)',
  border: hasError ? `1.5px solid ${RED}` : '1px solid rgba(229,57,53,0.18)',
  borderRadius: 12,
  padding: '12px 16px',
  fontSize: '0.95rem',
  color: '#1a1a2e',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  boxShadow: hasError ? `0 0 0 3px ${RED_GLOW}` : 'none',
});

const labelStyle = {
  fontWeight: 600,
  fontSize: '0.85rem',
  color: '#1a1a2e',
  marginBottom: 6,
  letterSpacing: 0.3,
};

const asterisk = { color: RED, marginLeft: 2 };

/* ───────────────────────────────────────────────
   COMPONENT
   ─────────────────────────────────────────────── */
const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    address: '',
    password: '',
    confirmPassword: '',
    role: '',
    termsAccepted: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);

  /* ── helpers ── */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const e = {};
    if (!formData.fullName.trim()) e.fullName = 'Full name is required';
    if (!formData.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Invalid email address';
    if (!formData.phone.trim()) e.phone = 'Phone number is required';
    if (!formData.dateOfBirth) e.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) e.gender = 'Please select a gender';
    if (!formData.bloodGroup) e.bloodGroup = 'Please select a blood group';
    if (!formData.address.trim()) e.address = 'Address is required';
    if (!formData.password) e.password = 'Password is required';
    else if (formData.password.length < 8) e.password = 'Password must be at least 8 characters';
    if (!formData.confirmPassword) e.confirmPassword = 'Please confirm your password';
    else if (formData.confirmPassword !== formData.password) e.confirmPassword = 'Passwords do not match';
    if (!formData.role) e.role = 'Please select a role';
    if (!formData.termsAccepted) e.termsAccepted = 'You must accept the terms';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setErrors({});
    setSuccess(null);
    await new Promise((r) => setTimeout(r, 2000));
    setSuccess('Registration successful! Please check your email to verify your account.');
    setLoading(false);
    setTimeout(() => navigate('/login'), 2000);
  };

  /* ── select option data ── */
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const genders = ['Male', 'Female', 'Other'];
  const roles = [
    { value: 'donor', label: 'Blood Donor' },
    { value: 'volunteer', label: 'Volunteer' },
    { value: 'hospital_admin', label: 'Hospital Administrator' },
    { value: 'super_admin', label: 'System Administrator' },
  ];

  /* ── render form field helper ── */
  const renderField = (name, labelText, type, placeholder, opts = {}) => {
    const val = formData[name];
    const err = errors[name];
    const colClass = opts.col || 'col-12';

    let control;
    if (type === 'select') {
      const options = opts.options || [];
      control = (
        <Form.Select
          name={name}
          value={val}
          onChange={handleChange}
          style={inputStyle(err)}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => {
            const optVal = typeof opt === 'string' ? opt : opt.value;
            const optLabel = typeof opt === 'string' ? opt : opt.label;
            return (
              <option key={optVal} value={optVal}>
                {optLabel}
              </option>
            );
          })}
        </Form.Select>
      );
    } else if (type === 'textarea') {
      control = (
        <Form.Control
          as="textarea"
          rows={3}
          name={name}
          value={val}
          onChange={handleChange}
          placeholder={placeholder}
          style={inputStyle(err)}
        />
      );
    } else {
      control = (
        <Form.Control
          type={type}
          name={name}
          value={val}
          onChange={handleChange}
          placeholder={placeholder}
          style={inputStyle(err)}
        />
      );
    }

    return (
      <motion.div className={colClass} variants={itemVariants}>
        <Form.Group>
          <Form.Label style={labelStyle}>
            {labelText}
            <span style={asterisk}>*</span>
          </Form.Label>
          {control}
          {err && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ color: RED, fontSize: '0.78rem', marginTop: 4, fontWeight: 500 }}
            >
              {err}
            </motion.div>
          )}
        </Form.Group>
      </motion.div>
    );
  };

  /* ─────────────────────────────────────────────
     RENDER
     ───────────────────────────────────────────── */
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0f0c29 0%, #1a1a3e 30%, #2d1b3a 60%, #1a1a3e 100%)',
        position: 'relative',
        overflow: 'hidden',
        padding: '40px 0',
      }}
    >
      {/* ── animated background orbs ── */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], rotate: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(229,57,53,0.20) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{
          position: 'absolute',
          bottom: '-8%',
          right: '-3%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(229,57,53,0.13) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [0, 8, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        style={{
          position: 'absolute',
          top: '40%',
          right: '15%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(106,13,173,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container fluid="lg" style={{ position: 'relative', zIndex: 1 }}>
        <Row className="align-items-stretch g-0 justify-content-center">
          {/* ─────────── LEFT COLUMN — HERO ─────────── */}
          <Col
            lg={5}
            className="d-none d-lg-flex flex-column justify-content-center p-5"
            style={{
              background: 'linear-gradient(145deg, rgba(229,57,53,0.12) 0%, rgba(106,13,173,0.08) 100%)',
              borderRadius: '24px 0 0 24px',
              borderRight: '1px solid rgba(229,57,53,0.15)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* icon */}
              <div
                style={{
                  fontSize: 72,
                  lineHeight: 1,
                  marginBottom: 16,
                  filter: 'drop-shadow(0 4px 12px rgba(229,57,53,0.35))',
                }}
              >
                🩸
              </div>

              <h1
                style={{
                  fontSize: '2.4rem',
                  fontWeight: 800,
                  color: '#fff',
                  marginBottom: 8,
                  letterSpacing: -0.5,
                }}
              >
                Join Our Mission
              </h1>
              <p
                style={{
                  fontSize: '1.05rem',
                  color: 'rgba(255,255,255,0.7)',
                  maxWidth: 380,
                  lineHeight: 1.7,
                  marginBottom: 48,
                }}
              >
                Every drop counts. Register today and become part of a global
                community saving lives through blood donation.
              </p>

              {/* stat cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { value: '500+', label: 'Camps Organized' },
                  { value: '50K+', label: 'Donors Registered' },
                  { value: '100K+', label: 'Lives Saved' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={statCardVariants}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      background: 'rgba(255,255,255,0.06)',
                      borderRadius: 16,
                      padding: '14px 22px',
                      border: '1px solid rgba(229,57,53,0.15)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: `linear-gradient(135deg, ${RED}, ${RED_DARK})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                        color: '#fff',
                        fontWeight: 700,
                        boxShadow: `0 4px 12px ${RED_GLOW}`,
                        flexShrink: 0,
                      }}
                    >
                      {['🏕', '🫂', '❤️'][i]}
                    </div>
                    <div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
                        {stat.value}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)' }}>
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* testimonial */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                style={{
                  marginTop: 40,
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  paddingTop: 24,
                }}
              >
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', fontStyle: 'italic', lineHeight: 1.6 }}>
                  "Registering took less than 2 minutes. A week later I donated
                  and saved three lives. It's the simplest heroic act you can do."
                </p>
              </motion.div>
            </motion.div>
          </Col>

          {/* ─────────── RIGHT COLUMN — FORM ─────────── */}
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={7}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                width: '100%',
                maxWidth: 640,
                padding: '32px 28px',
                margin: '0 auto',
                ...glassCard,
              }}
            >
              {/* heading */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                style={{ textAlign: 'center', marginBottom: 28 }}
              >
                <h2 style={{ fontWeight: 800, color: '#1a1a2e', fontSize: '1.6rem', marginBottom: 4 }}>
                  Create Account
                </h2>
                <p style={{ color: '#6b7280', fontSize: '0.92rem', margin: 0 }}>
                  Join{' '}
                  <span style={{ color: RED, fontWeight: 700 }}>50,000+</span> lifesavers
                </p>
              </motion.div>

              {/* success alert */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ marginBottom: 20 }}
                >
                  <Alert
                    variant="success"
                    dismissible
                    onClose={() => setSuccess(null)}
                    style={{
                      borderRadius: 12,
                      border: '1px solid rgba(16,185,129,0.25)',
                      background: 'rgba(16,185,129,0.08)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {success}
                  </Alert>
                </motion.div>
              )}

              {/* form */}
              <Form onSubmit={handleSubmit} noValidate>
                <motion.div
                  className="row g-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Full Name — full width */}
                  {renderField('fullName', 'Full Name', 'text', 'Enter your full name')}

                  {/* Email — full width */}
                  {renderField('email', 'Email Address', 'email', 'you@example.com')}

                  {/* Phone + DOB side by side */}
                  {renderField('phone', 'Phone Number', 'tel', '+1 (555) 000-0000', { col: 'col-md-6' })}
                  {renderField('dateOfBirth', 'Date of Birth', 'date', '', { col: 'col-md-6' })}

                  {/* Gender + Blood Group side by side */}
                  {renderField('gender', 'Gender', 'select', 'Select gender', {
                    col: 'col-md-6',
                    options: genders,
                  })}
                  {renderField('bloodGroup', 'Blood Group', 'select', 'Select blood group', {
                    col: 'col-md-6',
                    options: bloodGroups,
                  })}

                  {/* Address — full width */}
                  {renderField('address', 'Address', 'textarea', 'Street, city, state, zip')}

                  {/* Password + Confirm Password side by side */}
                  {renderField('password', 'Password', 'password', 'Min. 8 characters', { col: 'col-md-6' })}
                  {renderField('confirmPassword', 'Confirm Password', 'password', 'Re-enter password', { col: 'col-md-6' })}

                  {/* Role — full width */}
                  {renderField('role', 'Role', 'select', 'Select your role', {
                    options: roles,
                  })}

                  {/* Terms checkbox */}
                  <motion.div className="col-12" variants={itemVariants}>
                    <Form.Group>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 10,
                          padding: '12px 16px',
                          background: 'rgba(229,57,53,0.04)',
                          borderRadius: 12,
                          border: errors.termsAccepted
                            ? `1.5px solid ${RED}`
                            : '1px solid rgba(229,57,53,0.10)',
                          transition: 'border-color 0.2s, box-shadow 0.2s',
                          boxShadow: errors.termsAccepted ? `0 0 0 3px ${RED_GLOW}` : 'none',
                        }}
                      >
                        <Form.Check
                          type="checkbox"
                          id="termsAccepted"
                          name="termsAccepted"
                          checked={formData.termsAccepted}
                          onChange={handleChange}
                          isInvalid={!!errors.termsAccepted}
                          style={{ marginTop: 2 }}
                        />
                        <Form.Label htmlFor="termsAccepted" style={{ margin: 0, fontSize: '0.85rem', color: '#374151' }}>
                          I agree to the{' '}
                          <Link to="#" style={{ color: RED, fontWeight: 600, textDecoration: 'none' }}>
                            Terms &amp; Conditions
                          </Link>{' '}
                          and{' '}
                          <Link to="#" style={{ color: RED, fontWeight: 600, textDecoration: 'none' }}>
                            Privacy Policy
                          </Link>
                        </Form.Label>
                      </div>
                      {errors.termsAccepted && (
                        <div style={{ color: RED, fontSize: '0.78rem', marginTop: 4, fontWeight: 500 }}>
                          {errors.termsAccepted}
                        </div>
                      )}
                    </Form.Group>
                  </motion.div>

                  {/* Submit */}
                  <motion.div className="col-12" variants={itemVariants}>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={loading ? {} : { scale: 1.02 }}
                      whileTap={loading ? {} : { scale: 0.98 }}
                      style={{
                        width: '100%',
                        padding: '14px 0',
                        borderRadius: 14,
                        border: 'none',
                        background: loading
                          ? `linear-gradient(135deg, ${RED_DARK}, ${RED})`
                          : `linear-gradient(135deg, ${RED}, ${RED_DARK})`,
                        color: '#fff',
                        fontSize: '1rem',
                        fontWeight: 700,
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1,
                        boxShadow: `0 8px 24px ${RED_GLOW}`,
                        transition: 'opacity 0.2s, transform 0.15s',
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
                          role="status"
                          style={{ borderWidth: 2 }}
                        />
                      )}
                      {loading ? 'Creating Account…' : 'Create Account'}
                    </motion.button>
                  </motion.div>

                  {/* login link */}
                  <motion.div className="col-12" variants={itemVariants}>
                    <div style={{ textAlign: 'center', marginTop: 8 }}>
                      <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                        Already have an account?{' '}
                      </span>
                      <Link
                        to="/login"
                        style={{
                          color: RED,
                          fontWeight: 700,
                          textDecoration: 'none',
                          fontSize: '0.9rem',
                        }}
                      >
                        Sign In
                      </Link>
                    </div>
                  </motion.div>
                </motion.div>
              </Form>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterPage;