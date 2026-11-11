import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const roles = [
  {
    id: 'super_admin',
    title: 'Super Administrator',
    description:
      'Full system access with all administrative privileges. Manage hospitals, users, and system settings.',
    icon: '👑',
    accent: 'var(--bs-danger)',
    gradient: 'linear-gradient(135deg, rgba(220,53,69,0.15), rgba(220,53,69,0.05))',
    borderColor: 'rgba(220,53,69,0.4)',
    glowColor: 'rgba(220,53,69,0.25)',
  },
  {
    id: 'hospital_admin',
    title: 'Hospital Administrator',
    description:
      'Manage hospital operations, blood inventory, and staff within your healthcare facility.',
    icon: '🏥',
    accent: 'var(--bs-success)',
    gradient: 'linear-gradient(135deg, rgba(40,167,69,0.15), rgba(40,167,69,0.05))',
    borderColor: 'rgba(40,167,69,0.4)',
    glowColor: 'rgba(40,167,69,0.25)',
  },
  {
    id: 'volunteer',
    title: 'Volunteer',
    description:
      'Help organize blood drives, assist donors, and support community outreach programs.',
    icon: '🤝',
    accent: 'var(--bs-warning)',
    gradient: 'linear-gradient(135deg, rgba(255,193,7,0.15), rgba(255,193,7,0.05))',
    borderColor: 'rgba(255,193,7,0.4)',
    glowColor: 'rgba(255,193,7,0.25)',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

const RoleSelectionPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleSelectRole = (role) => {
    setSelectedRole(role.id);
  };

  const handleContinue = () => {
    if (selectedRole) {
      localStorage.setItem('selectedRole', selectedRole);
      navigate('/register', { state: { role: selectedRole } });
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #fff5f5 0%, #ffffff 50%, #fff0f0 100%)',
        position: 'relative',
        overflow: 'hidden',
        padding: '2rem 1rem',
      }}
    >
      {/* Decorative background blobs */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220,53,69,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220,53,69,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Glass card container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          width: '100%',
          maxWidth: '960px',
          background: 'rgba(255, 255, 255, 0.55)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '32px',
          border: '1px solid rgba(255, 255, 255, 0.7)',
          boxShadow: `
            0 8px 32px rgba(220, 53, 69, 0.08),
            0 2px 8px rgba(0, 0, 0, 0.04),
            inset 0 1px 0 rgba(255, 255, 255, 0.8)
          `,
          padding: '3rem 2.5rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 120 }}
            style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}
          >
            🩸
          </motion.div>
          <h1
            style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
              fontWeight: 700,
              color: '#1a1a2e',
              marginBottom: '0.5rem',
              letterSpacing: '-0.02em',
            }}
          >
            Choose Your Role
          </h1>
          <p
            style={{
              color: '#6b7280',
              fontSize: '1rem',
              maxWidth: '420px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Select how you'd like to participate in our blood donation network and help save lives.
          </p>
        </div>

        {/* Role cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Row className="g-4 justify-content-center">
            {roles.map((role) => {
              const isSelected = selectedRole === role.id;

              return (
                <Col key={role.id} xs={12} md={4}>
                  <motion.div
                    variants={cardVariants}
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ height: '100%' }}
                  >
                    <Card
                      onClick={() => handleSelectRole(role)}
                      style={{
                        height: '100%',
                        cursor: 'pointer',
                        background: isSelected
                          ? role.gradient
                          : 'rgba(255, 255, 255, 0.5)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        borderRadius: '20px',
                        border: isSelected
                          ? `2px solid ${role.borderColor}`
                          : '1px solid rgba(255, 255, 255, 0.6)',
                        boxShadow: isSelected
                          ? `0 0 0 4px ${role.glowColor}, 0 8px 24px rgba(0,0,0,0.06)`
                          : '0 4px 16px rgba(0,0,0,0.04)',
                        transition: 'box-shadow 0.3s ease',
                        padding: '1.75rem 1.25rem',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                      className="role-card"
                    >
                      {/* Selected check badge */}
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                          style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: '#dc3545',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            fontWeight: 700,
                            boxShadow: '0 2px 8px rgba(220,53,69,0.4)',
                            zIndex: 2,
                          }}
                        >
                          ✓
                        </motion.div>
                      )}

                      {/* Top sheen on hover - purely decorative */}
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '4px',
                          background: isSelected
                            ? role.accent
                            : 'transparent',
                          transition: 'background 0.3s ease',
                        }}
                      />

                      {/* Icon */}
                      <div
                        style={{
                          fontSize: '3.25rem',
                          lineHeight: 1,
                          marginBottom: '1rem',
                          display: 'inline-block',
                        }}
                      >
                        {role.icon}
                      </div>

                      {/* Title */}
                      <h3
                        style={{
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          color: '#1a1a2e',
                          marginBottom: '0.75rem',
                        }}
                      >
                        {role.title}
                      </h3>

                      {/* Description */}
                      <p
                        style={{
                          fontSize: '0.85rem',
                          color: '#6b7280',
                          lineHeight: 1.6,
                          marginBottom: 0,
                        }}
                      >
                        {role.description}
                      </p>
                    </Card>
                  </motion.div>
                </Col>
              );
            })}
          </Row>
        </motion.div>

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          style={{ textAlign: 'center', marginTop: '2.5rem' }}
        >
          <Button
            variant={selectedRole ? 'danger' : 'outline-secondary'}
            size="lg"
            disabled={!selectedRole}
            onClick={handleContinue}
            style={{
              minWidth: '240px',
              borderRadius: '50px',
              padding: '0.75rem 2rem',
              fontWeight: 600,
              fontSize: '1.05rem',
              border: selectedRole ? 'none' : undefined,
              background: selectedRole
                ? 'linear-gradient(135deg, #dc3545, #c82333)'
                : undefined,
              boxShadow: selectedRole
                ? '0 4px 16px rgba(220,53,69,0.35)'
                : undefined,
              transition: 'all 0.3s ease',
              opacity: selectedRole ? 1 : 0.5,
            }}
            onMouseEnter={(e) => {
              if (selectedRole) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 24px rgba(220,53,69,0.45)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedRole) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 16px rgba(220,53,69,0.35)';
              }
            }}
          >
            {selectedRole ? 'Continue to Registration →' : 'Select a Role to Continue'}
          </Button>

          <div style={{ marginTop: '1rem' }}>
            <Button
              variant="link"
              onClick={() => navigate('/')}
              style={{
                color: '#6b7280',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
              }}
            >
              ← Back to Home
            </Button>
          </div>
        </motion.div>
      </motion.div>

      {/* Inline style for hover card lift */}
      <style>{`
        .role-card:hover {
          box-shadow: 0 12px 32px rgba(0,0,0,0.08) !important;
        }
      `}</style>
    </div>
  );
};

export default RoleSelectionPage;