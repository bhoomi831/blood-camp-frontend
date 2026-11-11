import React, { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';

/* ── password strength helper (0–4) ── */
const getStrength = (pw) => {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[a-z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
};

const strengthMeta = [
  { label: 'Very Weak', color: '#e53935', pct: 20 },
  { label: 'Weak',     color: '#ef6c00', pct: 40 },
  { label: 'Fair',     color: '#f9a825', pct: 60 },
  { label: 'Strong',   color: '#43a047', pct: 80 },
  { label: 'Very Strong', color: '#2e7d32', pct: 100 },
];

/* ── floating decorative blobs ── */
const blobs = [
  { size: 320, x: '-10%', y: '-8%',  delay: 0 },
  { size: 240, x: '70%',  y: '12%',  delay: 3 },
  { size: 180, x: '50%',  y: '60%',  delay: 6 },
  { size: 260, x: '-5%',  y: '75%',  delay: 2 },
];

/* ── icon-eye toggle ── */
const EyeIcon = ({ visible }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round">
    {visible ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
        <path d="M14.12 14.12a3 3 0 11-4.24-4.24" />
      </>
    )}
  </svg>
);

const ChangePasswordPage = () => {
  const navigate = useNavigate();

  /* ── state ── */
  const [form, setForm]           = useState({ current: '', newPw: '', confirm: '' });
  const [show, setShow]           = useState({ current: false, newPw: false, confirm: false });
  const [loading, setLoading]     = useState(false);
  const [message, setMessage]     = useState(null);   // { text, variant }
  const [touched, setTouched]     = useState({ current: false, newPw: false, confirm: false });

  /* ── helpers ── */
  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));
  const toggle = (key) => () => setShow((p) => ({ ...p, [key]: !p[key] }));
  const blur = (key) => () => setTouched((p) => ({ ...p, [key]: true }));

  const strength = getStrength(form.newPw);
  const sMeta    = strengthMeta[Math.min(strength, 4)];

  /* ── validation ── */
  const validate = useCallback(() => {
    if (!form.current || !form.newPw || !form.confirm) {
      return 'Please fill in all fields.';
    }
    if (form.newPw.length < 8) {
      return 'New password must be at least 8 characters.';
    }
    if (form.newPw !== form.confirm) {
      return 'New passwords do not match.';
    }
    if (form.newPw === form.current) {
      return 'New password must differ from your current password.';
    }
    return null;
  }, [form]);

  /* ── submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ current: true, newPw: true, confirm: true });

    const err = validate();
    if (err) { setMessage({ text: err, variant: 'danger' }); return; }

    setLoading(true);
    setMessage(null);

    // mock API
    await new Promise((r) => setTimeout(r, 1500));

    setLoading(false);
    setMessage({ text: 'Password changed successfully!', variant: 'success' });
    setTimeout(() => navigate('/profile'), 1500);
  };

  /* ── field config ── */
  const fields = [
    { key: 'current', label: 'Current Password',  placeholder: 'Enter current password',  showKey: 'current' },
    { key: 'newPw',   label: 'New Password',      placeholder: 'Enter new password',      showKey: 'newPw' },
    { key: 'confirm', label: 'Confirm New Password', placeholder: 'Confirm new password', showKey: 'confirm' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #0f0c29 0%, #1a1a3e 40%, #2d1b4e 70%, #1a1a3e 100%)',
    }}>
      {/* ── animated backdrop blobs ── */}
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          aria-hidden
          style={{
            position: 'absolute',
            width: b.size,
            height: b.size,
            borderRadius: '50%',
            left: b.x,
            top: b.y,
            background: 'radial-gradient(circle, rgba(229,57,53,0.25) 0%, rgba(229,57,53,0) 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
          animate={{
            scale: [1, 1.12, 0.95, 1.08, 1],
            opacity: [0.3, 0.5, 0.25, 0.45, 0.3],
          }}
          transition={{ duration: 12 + b.delay, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
        />
      ))}

      {/* ── grid overlay ── */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none', zIndex: 1,
      }} />

      <Container className="position-relative" style={{ zIndex: 2, minHeight: '100vh' }}>
        <Row className="align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
          {/* ── LEFT HERO ── */}
          <Col lg={5} className="d-none d-lg-flex flex-column align-items-center text-center pe-lg-5">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: 120, height: 120,
                  borderRadius: '50%',
                  background: 'rgba(229,57,53,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 2rem',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(229,57,53,0.3)',
                }}
              >
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none"
                     stroke="#e53935" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                  <circle cx="12" cy="16" r="1.5" fill="#e53935" />
                </svg>
              </motion.div>

              <h1 style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '0.75rem',
                letterSpacing: '-0.02em',
              }}>
                Security First
              </h1>
              <p style={{
                color: 'rgba(255,255,255,0.65)',
                fontSize: '1.05rem',
                lineHeight: 1.7,
                maxWidth: 360,
                margin: '0 auto',
              }}>
                Update your password regularly to keep your account secure.
              </p>

              {/* trust badges */}
              <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                {[
                  { icon: '🔒', label: 'Encrypted' },
                  { icon: '🛡️', label: 'Protected' },
                  { icon: '✅', label: 'Verified' },
                ].map((b) => (
                  <motion.div
                    key={b.label}
                    whileHover={{ y: -3 }}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem',
                      color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 500,
                      letterSpacing: '0.04em', textTransform: 'uppercase',
                    }}
                  >
                    <span style={{ fontSize: '1.6rem' }}>{b.icon}</span>
                    {b.label}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Col>

          {/* ── RIGHT GLASS CARD ── */}
          <Col xs={12} sm={9} md={7} lg={5}>
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                borderRadius: 24,
                border: '1px solid rgba(255,255,255,0.10)',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
                padding: 'clamp(1.8rem, 4vw, 2.8rem)',
              }}
            >
              {/* mobile hero */}
              <div className="d-lg-none text-center mb-4">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    width: 72, height: 72,
                    borderRadius: '50%',
                    background: 'rgba(229,57,53,0.18)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 0.75rem',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(229,57,53,0.25)',
                  }}
                >
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none"
                       stroke="#e53935" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                    <circle cx="12" cy="16" r="1.5" fill="#e53935" />
                  </svg>
                </motion.div>
                <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '1.4rem', margin: 0 }}>
                  Security First
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', margin: '0.2rem 0 0' }}>
                  Update your password regularly
                </p>
              </div>

              {/* ── header ── */}
              <div className="d-flex align-items-center gap-2 mb-4">
                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
                <span style={{
                  color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem',
                  fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
                }}>
                  Change Password
                </span>
                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
              </div>

              {/* ── alert ── */}
              <AnimatePresence>
                {message && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginBottom: '1rem' }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  >
                    <Alert
                      variant={message.variant}
                      dismissible
                      onClose={() => setMessage(null)}
                      style={{
                        background: message.variant === 'success'
                          ? 'rgba(67,160,71,0.15)'
                          : 'rgba(229,57,53,0.15)',
                        border: `1px solid ${
                          message.variant === 'success'
                            ? 'rgba(67,160,71,0.3)'
                            : 'rgba(229,57,53,0.3)'
                        }`,
                        color: message.variant === 'success' ? '#a5d6a7' : '#ef9a9a',
                        borderRadius: 12, fontSize: '0.9rem',
                      }}
                    >
                      {message.variant === 'success' ? '✓ ' : '✕ '}
                      {message.text}
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── form ── */}
              <Form noValidate onSubmit={handleSubmit}>
                {fields.map((f) => (
                  <Form.Group className="mb-3" key={f.key} controlId={`pw-${f.key}`}>
                    <Form.Label style={{
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.82rem', fontWeight: 500, marginBottom: '0.35rem',
                    }}>
                      {f.label}
                    </Form.Label>
                    <div style={{ position: 'relative' }}>
                      <Form.Control
                        type={show[f.showKey] ? 'text' : 'password'}
                        value={form[f.key]}
                        onChange={set(f.key)}
                        onBlur={blur(f.key)}
                        placeholder={f.placeholder}
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.10)',
                          borderRadius: 12,
                          padding: '0.75rem 2.8rem 0.75rem 1rem',
                          color: '#fff',
                          fontSize: '0.92rem',
                          transition: 'border-color 0.2s, box-shadow 0.2s',
                          boxShadow: 'none',
                        }}
                        className="glass-input"
                      />
                      <Button
                        variant="link"
                        onClick={toggle(f.showKey)}
                        tabIndex={-1}
                        style={{
                          position: 'absolute', right: 12, top: '50%',
                          transform: 'translateY(-50%)',
                          padding: 0, border: 0, color: 'rgba(255,255,255,0.35)',
                          textDecoration: 'none', display: 'flex',
                        }}
                        aria-label={show[f.showKey] ? 'Hide password' : 'Show password'}
                      >
                        <EyeIcon visible={show[f.showKey]} />
                      </Button>
                    </div>

                    {/* strength bar */}
                    {f.key === 'newPw' && form.newPw.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ marginTop: '0.6rem' }}
                      >
                        <div style={{
                          height: 4,
                          borderRadius: 4,
                          background: 'rgba(255,255,255,0.06)',
                          overflow: 'hidden',
                        }}>
                          <motion.div
                            layout
                            style={{
                              height: '100%',
                              width: `${sMeta.pct}%`,
                              borderRadius: 4,
                              background: sMeta.color,
                              transition: 'width 0.35s ease, background 0.35s ease',
                            }}
                          />
                        </div>
                        <span style={{
                          fontSize: '0.72rem',
                          color: sMeta.color,
                          fontWeight: 600,
                          marginTop: '0.2rem',
                          display: 'inline-block',
                        }}>
                          {sMeta.label}
                        </span>
                      </motion.div>
                    )}

                    {/* confirm mismatch hint */}
                    {f.key === 'confirm' && touched.confirm && form.confirm.length > 0 && form.newPw !== form.confirm && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ fontSize: '0.72rem', color: '#ef9a9a', marginTop: '0.2rem', display: 'inline-block' }}
                      >
                        Passwords do not match
                      </motion.span>
                    )}
                  </Form.Group>
                ))}

                {/* ── submit ── */}
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} style={{ marginTop: '1.2rem' }}>
                  <Button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0',
                      borderRadius: 12,
                      border: 'none',
                      background: 'linear-gradient(135deg, #e53935 0%, #c62828 100%)',
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      letterSpacing: '0.02em',
                      boxShadow: '0 4px 20px rgba(229,57,53,0.35)',
                      transition: 'box-shadow 0.3s',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 6px 28px rgba(229,57,53,0.5)'}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 20px rgba(229,57,53,0.35)'}
                  >
                    {loading && <Spinner animation="border" size="sm" />}
                    {loading ? 'Changing Password…' : 'Change Password'}
                  </Button>
                </motion.div>
              </Form>

              {/* ── back link ── */}
              <motion.div
                className="text-center mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  to="/profile"
                  style={{
                    color: 'rgba(255,255,255,0.45)',
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#e53935'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  Back to Profile
                </Link>
              </motion.div>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* ── global input focus styles ── */}
      <style>{`
        .glass-input:focus {
          outline: none !important;
          border-color: rgba(229,57,53,0.5) !important;
          box-shadow: 0 0 0 3px rgba(229,57,53,0.15) !important;
          background: rgba(255,255,255,0.08) !important;
        }
        .glass-input::placeholder {
          color: rgba(255,255,255,0.25);
        }
        .btn-close {
          filter: invert(1) brightness(0.6);
        }
      `}</style>
    </div>
  );
};

export default ChangePasswordPage;