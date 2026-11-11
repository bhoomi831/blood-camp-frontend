import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Form, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Motion variants                                                    */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

const getInitials = (name) =>
  name
    ? name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

/* ------------------------------------------------------------------ */
/*  Mock data                                                           */
/* ------------------------------------------------------------------ */

const MOCK_USER = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  bloodGroup: 'O+',
  role: 'Volunteer',
  address: '123 Main St, Anytown, USA 12345',
};

const MOCK_STATS = {
  totalDonations: 12,
  campsParticipated: 8,
  yearsActive: 3,
  badgesEarned: 5,
};

/* ------------------------------------------------------------------ */
/*  Stat card config                                                    */
/* ------------------------------------------------------------------ */

const STAT_CARDS = [
  { label: 'Total Donations', value: 0, icon: '🩸', key: 'totalDonations' },
  { label: 'Camps Participated', value: 0, icon: '🏕️', key: 'campsParticipated' },
  { label: 'Years Active', value: 0, icon: '📅', key: 'yearsActive' },
  { label: 'Badges Earned', value: 0, icon: '🏅', key: 'badgesEarned' },
];

/* ================================================================== */
/*  Component                                                           */
/* ================================================================== */

const ProfilePage = () => {
  /* ----- state ----- */
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null); // { type: 'success'|'danger', text }

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [theme, setTheme] = useState(() =>
    document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light',
  );

  /* ----- fetch mock data ----- */
  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      // Simulate a rare failure
      // throw new Error('Network error');
      setUser(MOCK_USER);
      setStats(MOCK_STATS);
      setForm({
        name: MOCK_USER.name,
        email: MOCK_USER.email,
        phone: MOCK_USER.phone,
        address: MOCK_USER.address,
      });
    } catch (err) {
      setError(err.message || 'Failed to load profile.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  /* ----- form helpers ----- */
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveMessage(null);
    try {
      // Simulate API save
      await new Promise((r) => setTimeout(r, 1200));
      setUser((prev) => ({ ...prev, ...form }));
      setSaveMessage({ type: 'success', text: 'Profile updated successfully!' });
      setEditMode(false);
    } catch {
      setSaveMessage({ type: 'danger', text: 'Failed to save changes. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
    });
    setSaveMessage(null);
    setEditMode(false);
  };

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  /* ----- loading state ----- */
  if (loading) {
    return (
      <div className="page-wrapper">
        <Container>
          <div className="text-center py-5" style={{ minHeight: '60vh' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Spinner animation="border" variant="danger" role="status" style={{ width: 48, height: 48 }} />
              <p className="mt-3" style={{ color: 'var(--gray-500, #64748B)' }}>
                Loading profile...
              </p>
            </motion.div>
          </div>
        </Container>
      </div>
    );
  }

  /* ----- error state ----- */
  if (error) {
    return (
      <div className="page-wrapper">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Alert variant="danger" className="glass-card text-center p-4" style={{ maxWidth: 480, border: 'none' }}>
              <div style={{ fontSize: '2rem', marginBottom: 8 }}>⚠️</div>
              <Alert.Heading as="h5" style={{ color: 'var(--danger, #EF4444)' }}>
                Unable to load profile
              </Alert.Heading>
              <p style={{ color: 'var(--gray-600, #475569)', marginBottom: 16, fontSize: '0.9rem' }}>
                {error}
              </p>
              <Button variant="outline-danger" size="sm" onClick={fetchProfile}>
                Retry
              </Button>
            </Alert>
          </motion.div>
        </Container>
      </div>
    );
  }

  /* ----- empty state (unlikely but handled) ----- */
  if (!user) {
    return (
      <div className="page-wrapper">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div className="glass-card text-center p-4" style={{ maxWidth: 400, border: 'none' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>🧑</div>
              <h5 style={{ color: 'var(--gray-700, #334155)' }}>No profile data</h5>
              <p style={{ color: 'var(--gray-500, #64748B)', fontSize: '0.9rem', marginBottom: 16 }}>
                We could not find any profile information for this account.
              </p>
              <Button variant="outline-danger" size="sm" onClick={fetchProfile}>
                Reload
              </Button>
            </div>
          </motion.div>
        </Container>
      </div>
    );
  }

  /* ================================================================== */
  /*  Main render                                                        */
  /* ================================================================== */

  return (
    <motion.div
      className="page-wrapper"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs={12} lg={10} xl={8}>

            {/* ============================================================ */}
            {/*  Profile Header                                                */}
            {/* ============================================================ */}
            <motion.div variants={itemVariants}>
              <div
                className="glass-card p-4 p-md-5 mb-4"
                style={{
                  border: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* subtle decorative gradient blob */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-40%',
                    right: '-10%',
                    width: 280,
                    height: 280,
                    borderRadius: '50%',
                    background:
                      'radial-gradient(circle, rgba(229,57,53,0.10) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-30%',
                    left: '-5%',
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    background:
                      'radial-gradient(circle, rgba(229,57,53,0.07) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />

                <Row className="align-items-center g-4 position-relative">
                  {/* Avatar */}
                  <Col xs="auto">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }}
                    >
                      <div
                        style={{
                          width: 88,
                          height: 88,
                          borderRadius: '50%',
                          background: 'var(--blood-gradient, linear-gradient(135deg, #E53935, #C62828))',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.75rem',
                          fontWeight: 700,
                          color: '#fff',
                          boxShadow: '0 4px 16px rgba(229,57,53,0.3)',
                          userSelect: 'none',
                        }}
                      >
                        {getInitials(user.name)}
                      </div>
                    </motion.div>
                  </Col>

                  {/* Name / Role / Email / Blood group */}
                  <Col>
                    <h1
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: 'var(--dark, #1E293B)',
                        marginBottom: 2,
                      }}
                    >
                      {user.name}
                    </h1>
                    <p
                      style={{
                        color: 'var(--gray-500, #64748B)',
                        fontSize: '0.9rem',
                        marginBottom: 4,
                      }}
                    >
                      {user.role}
                    </p>
                    <p
                      style={{
                        color: 'var(--gray-500, #64748B)',
                        fontSize: '0.85rem',
                        marginBottom: 0,
                      }}
                    >
                      {user.email}
                    </p>
                  </Col>

                  {/* Blood group badge */}
                  <Col xs="auto">
                    <Badge
                      bg="danger"
                      style={{
                        background: 'var(--blood-gradient, linear-gradient(135deg, #E53935, #C62828))',
                        padding: '6px 16px',
                        borderRadius: 'var(--radius-full, 9999px)',
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        letterSpacing: '0.02em',
                        boxShadow: '0 2px 8px rgba(229,57,53,0.25)',
                      }}
                    >
                      {user.bloodGroup}
                    </Badge>
                  </Col>
                </Row>
              </div>
            </motion.div>

            {/* ============================================================ */}
            {/*  Stats Row                                                     */}
            {/* ============================================================ */}
            <motion.div variants={itemVariants}>
              <Row className="g-3 mb-4">
                {STAT_CARDS.map((card) => {
                  const val = stats?.[card.key] ?? 0;
                  return (
                    <Col key={card.key} xs={6} md={3}>
                      <div
                        className="glass-card stat-card text-center"
                        style={{ border: 'none', height: '100%' }}
                      >
                        <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{card.icon}</div>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }}
                        >
                          <p
                            style={{
                              fontSize: '1.75rem',
                              fontWeight: 700,
                              color: 'var(--primary, #E53935)',
                              marginBottom: 0,
                              lineHeight: 1.2,
                            }}
                          >
                            {val}
                          </p>
                        </motion.div>
                        <p
                          style={{
                            fontSize: '0.8rem',
                            color: 'var(--gray-500, #64748B)',
                            marginBottom: 0,
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            fontWeight: 500,
                          }}
                        >
                          {card.label}
                        </p>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </motion.div>

            {/* ============================================================ */}
            {/*  Profile Details Form                                          */}
            {/* ============================================================ */}
            <motion.div variants={itemVariants}>
              <div
                className="glass-card p-4 p-md-5 mb-4"
                style={{ border: 'none' }}
              >
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5
                    style={{
                      fontWeight: 600,
                      color: 'var(--dark, #1E293B)',
                      marginBottom: 0,
                    }}
                  >
                    Profile Details
                  </h5>
                  {!editMode ? (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => setEditMode(true)}
                      style={{
                        borderRadius: 'var(--radius-sm, 6px)',
                        borderColor: 'var(--primary, #E53935)',
                        color: 'var(--primary, #E53935)',
                      }}
                    >
                      Edit
                    </Button>
                  ) : (
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                  )}
                </div>

                {/* Success / Error message */}
                {saveMessage && (
                  <motion.div
                    variants={fadeSlideUp}
                    initial="hidden"
                    animate="show"
                    style={{ marginBottom: 16 }}
                  >
                    <Alert
                      variant={saveMessage.type}
                      dismissible
                      onClose={() => setSaveMessage(null)}
                      style={{
                        borderRadius: 'var(--radius-md, 10px)',
                        border: 'none',
                        fontSize: '0.9rem',
                      }}
                    >
                      {saveMessage.text}
                    </Alert>
                  </motion.div>
                )}

                <Form onSubmit={handleSave}>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group controlId="profile-name">
                        <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--gray-600, #475569)' }}>
                          Full Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          disabled={!editMode || saving}
                          plaintext={!editMode}
                          readOnly={!editMode}
                          style={
                            !editMode
                              ? { paddingLeft: 0 }
                              : {
                                  borderRadius: 'var(--radius-sm, 6px)',
                                  borderColor: 'var(--gray-300, #CBD5E1)',
                                }
                          }
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group controlId="profile-email">
                        <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--gray-600, #475569)' }}>
                          Email
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          disabled={!editMode || saving}
                          plaintext={!editMode}
                          readOnly={!editMode}
                          style={
                            !editMode
                              ? { paddingLeft: 0 }
                              : {
                                  borderRadius: 'var(--radius-sm, 6px)',
                                  borderColor: 'var(--gray-300, #CBD5E1)',
                                }
                          }
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group controlId="profile-phone">
                        <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--gray-600, #475569)' }}>
                          Phone
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          disabled={!editMode || saving}
                          plaintext={!editMode}
                          readOnly={!editMode}
                          style={
                            !editMode
                              ? { paddingLeft: 0 }
                              : {
                                  borderRadius: 'var(--radius-sm, 6px)',
                                  borderColor: 'var(--gray-300, #CBD5E1)',
                                }
                          }
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group controlId="profile-bloodGroup">
                        <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--gray-600, #475569)' }}>
                          Blood Group
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={user.bloodGroup}
                          disabled
                          plaintext
                          style={{ paddingLeft: 0, color: 'var(--primary, #E53935)', fontWeight: 600 }}
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12}>
                      <Form.Group controlId="profile-address">
                        <Form.Label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--gray-600, #475569)' }}>
                          Address
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          name="address"
                          value={form.address}
                          onChange={handleChange}
                          disabled={!editMode || saving}
                          plaintext={!editMode}
                          readOnly={!editMode}
                          style={
                            !editMode
                              ? { paddingLeft: 0, resize: 'none' }
                              : {
                                  borderRadius: 'var(--radius-sm, 6px)',
                                  borderColor: 'var(--gray-300, #CBD5E1)',
                                  resize: 'none',
                                }
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Save button — visible only in edit mode */}
                  {editMode && (
                    <motion.div
                      variants={fadeSlideUp}
                      initial="hidden"
                      animate="show"
                      className="mt-4"
                    >
                      <Button
                        type="submit"
                        disabled={saving}
                        style={{
                          background: 'var(--blood-gradient, linear-gradient(135deg, #E53935, #C62828))',
                          border: 'none',
                          borderRadius: 'var(--radius-sm, 6px)',
                          padding: '10px 32px',
                          fontWeight: 600,
                          minWidth: 140,
                        }}
                      >
                        {saving ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              className="me-2"
                            />
                            Saving...
                          </>
                        ) : (
                          'Save Changes'
                        )}
                      </Button>
                    </motion.div>
                  )}
                </Form>
              </div>
            </motion.div>

            {/* ============================================================ */}
            {/*  Account Settings                                              */}
            {/* ============================================================ */}
            <motion.div variants={itemVariants}>
              <div
                className="glass-card p-4 p-md-5"
                style={{ border: 'none' }}
              >
                <h5
                  style={{
                    fontWeight: 600,
                    color: 'var(--dark, #1E293B)',
                    marginBottom: 20,
                  }}
                >
                  Account Settings
                </h5>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                  }}
                >
                  {/* Change password */}
                  <Link
                    to="/change-password"
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      className="d-flex align-items-center justify-content-between px-3 py-3"
                      style={{
                        borderRadius: 'var(--radius-md, 10px)',
                        background: 'rgba(229,57,53,0.04)',
                        transition: 'background 0.2s',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(229,57,53,0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(229,57,53,0.04)';
                      }}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <span style={{ fontSize: '1.2rem' }}>🔑</span>
                        <div>
                          <p
                            style={{
                              marginBottom: 0,
                              fontWeight: 500,
                              fontSize: '0.9rem',
                              color: 'var(--dark, #1E293B)',
                            }}
                          >
                            Change Password
                          </p>
                          <p
                            style={{
                              marginBottom: 0,
                              fontSize: '0.8rem',
                              color: 'var(--gray-500, #64748B)',
                            }}
                          >
                            Update your account password
                          </p>
                        </div>
                      </div>
                      <span style={{ color: 'var(--gray-400, #94A3B8)', fontSize: '1rem' }}>&rsaquo;</span>
                    </div>
                  </Link>

                  {/* Notification settings */}
                  <Link
                    to="/notification-settings"
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      className="d-flex align-items-center justify-content-between px-3 py-3"
                      style={{
                        borderRadius: 'var(--radius-md, 10px)',
                        background: 'rgba(229,57,53,0.04)',
                        transition: 'background 0.2s',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(229,57,53,0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(229,57,53,0.04)';
                      }}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <span style={{ fontSize: '1.2rem' }}>🔔</span>
                        <div>
                          <p
                            style={{
                              marginBottom: 0,
                              fontWeight: 500,
                              fontSize: '0.9rem',
                              color: 'var(--dark, #1E293B)',
                            }}
                          >
                            Notification Settings
                          </p>
                          <p
                            style={{
                              marginBottom: 0,
                              fontSize: '0.8rem',
                              color: 'var(--gray-500, #64748B)',
                            }}
                          >
                            Manage your notification preferences
                          </p>
                        </div>
                      </div>
                      <span style={{ color: 'var(--gray-400, #94A3B8)', fontSize: '1rem' }}>&rsaquo;</span>
                    </div>
                  </Link>

                  {/* Theme toggle */}
                  <div
                    className="d-flex align-items-center justify-content-between px-3 py-3"
                    style={{
                      borderRadius: 'var(--radius-md, 10px)',
                      background: 'rgba(229,57,53,0.04)',
                      cursor: 'pointer',
                    }}
                    onClick={toggleTheme}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleTheme(); }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <span style={{ fontSize: '1.2rem' }}>{theme === 'light' ? '🌙' : '☀️'}</span>
                      <div>
                        <p
                          style={{
                            marginBottom: 0,
                            fontWeight: 500,
                            fontSize: '0.9rem',
                            color: 'var(--dark, #1E293B)',
                          }}
                        >
                          Theme
                        </p>
                        <p
                          style={{
                            marginBottom: 0,
                            fontSize: '0.8rem',
                            color: 'var(--gray-500, #64748B)',
                          }}
                        >
                          Switch to {theme === 'light' ? 'dark' : 'light'} mode
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        width: 44,
                        height: 24,
                        borderRadius: 12,
                        background: theme === 'light' ? 'var(--gray-300, #CBD5E1)' : 'var(--primary, #E53935)',
                        position: 'relative',
                        transition: 'background 0.25s ease',
                      }}
                    >
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: '50%',
                          background: '#fff',
                          position: 'absolute',
                          top: 3,
                          left: theme === 'light' ? 3 : 23,
                          transition: 'left 0.25s ease',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default ProfilePage;