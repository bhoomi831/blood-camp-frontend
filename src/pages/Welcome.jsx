import React from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';

const WelcomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="welcome-page min-vh-100 bg-body"
    >
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md="8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-5"
            >
              <h1 className="display-4 fw-bold mb-4" style={{ color: '#E53935' }}>
                Welcome to BLOODCONNECT
              </h1>
              <p className="lead mb-5" style={{ fontSize: '1.25rem', color: '#64748b' }}>
                The comprehensive blood donation camp management system with premium glassmorphic UI
              </p>

              <div className="row g-4 mb-5">
                <div className="col-md-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="h-100 glass-card p-4"
                  >
                    <div className="mb-3" style={{ fontSize: '2.5rem' }}>
                      🩸
                    </div>
                    <h5 className="fw-semibold mb-3">Donor Management</h5>
                    <p className="text-muted mb-0">
                      Register donors, track medical history, manage eligibility, and maintain donation records
                    </p>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      href="/donors"
                      className="d-block"
                    >
                      Explore Donor Features
                    </Button>
                  </motion.div>
                </div>

                <div className="col-md-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="h-100 glass-card p-4"
                  >
                    <div className="mb-3" style={{ fontSize: '2.5rem' }}>
                      🏕️
                    </div>
                    <h5 className="fw-semibold mb-3">Camp Management</h5>
                    <p className="text-muted mb-0">
                      Create, schedule, approve, and monitor blood donation camps with full lifecycle tracking
                    </p>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      href="/camps"
                      className="d-block"
                    >
                      Explore Camp Features
                    </Button>
                  </motion.div>
                </div>

                <div className="col-md-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="h-100 glass-card p-4"
                  >
                    <div className="mb-3" style={{ fontSize: '2.5rem' }}>
                      🚨
                    </div>
                    <h5 className="fw-semibold mb-3">Emergency Response</h5>
                    <p className="text-muted mb-0">
                      Handle urgent blood requests, notify eligible donors, and coordinate rapid responses
                    </p>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      href="/emergency-requests"
                      className="d-block"
                    >
                      Explore Emergency Features
                    </Button>
                  </motion.div>
                </div>
              </div>

              <Col md={12}>
              <div className="text-center mt-4">
                <Button
                  variant="danger"
                  size="lg"
                  href="/dashboard"
                >
                  Live Dashboard
                </Button>
                <Button
                  variant="outline-danger"
                  size="lg"
                  href="/register"
                  className="ms-3"
                >
                  Create Account
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </motion.div>
    );
  };

export default WelcomePage;