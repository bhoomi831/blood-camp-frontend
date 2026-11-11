// src/pages/camp-management/CampApproval.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Spinner, Modal } from 'react-bootstrap';
import { FaClipboardList, FaCheck, FaTimes, FaPen, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import campManagementService from '../services/campManagementService';

const CampApproval = () => {
  const [pendingCamps, setPendingCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [remarks, setRemarks] = useState('');

  useEffect(() => {
    const fetchPendingCamps = async () => {
      setLoading(true);
      try {
        // In a real app, we would have a specific endpoint for pending approvals
        // For now, we'll filter camps by status 'planned' (assuming planned camps need approval)
        const response = await campManagementService.getCamps();
        if (response.success) {
          const pending = response.data.filter(camp => camp.status === 'planned');
          setPendingCamps(pending);
        } else {
          setError(response.error || 'Failed to load camps');
        }
      } catch (err) {
        setError('An error occurred while loading camps');
      } finally {
        setLoading(false);
      }
    };

    fetchPendingCamps();
  }, []);

  const handleApprove = async () => {
    if (selectedCamp) {
      try {
        // In a real app, we would update the camp status to 'active' or approved state
        // For now, we'll simulate by updating the camp
        const updatedCamp = {
          ...selectedCamp,
          status: 'active', // Assuming approval changes status to active
          updatedAt: new Date().toISOString()
        };
        await campManagementService.updateCamp(selectedCamp.id, updatedCamp);
        setApprovalModalOpen(false);
        setSelectedCamp(null);
        setRemarks('');
        // Update the list
        setPendingCamps(prev => prev.filter(camp => camp.id !== selectedCamp.id));
      } catch (err) {
        setError('Failed to approve camp');
      }
    }
  };

  const handleReject = async () => {
    if (selectedCamp) {
      try {
        // In a real app, we might update status to 'rejected' or 'cancelled'
        const updatedCamp = {
          ...selectedCamp,
          status: 'cancelled', // Assuming rejection cancels the camp
          updatedAt: new Date().toISOString()
        };
        await campManagementService.updateCamp(selectedCamp.id, updatedCamp);
        setApprovalModalOpen(false);
        setSelectedCamp(null);
        setRemarks('');
        // Update the list
        setPendingCamps(prev => prev.filter(camp => camp.id !== selectedCamp.id));
      } catch (err) {
        setError('Failed to reject camp');
      }
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="camp-approval-page min-vh-100 bg-gray-50"
      >
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <h4 className="mt-3">Loading pending camps...</h4>
              </div>
            </Col>
          </Row>
        </Container>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="camp-approval-page min-vh-100 bg-gray-50"
      >
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <div className="alert alert-danger">
                {error}
              </div>
            </Col>
          </Row>
        </Container>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="camp-approval-page min-vh-100 bg-gray-50"
    >
      <Container>
        <Row>
          <Col>
            <h2 className="mb-4">Camp Approval Queue</h2>
            <p className="text-muted">Review and approve/reject pending camps</p>
          </Col>
        </Row>

        {pendingCamps.length === 0 ? (
          <Row>
            <Col>
              <div className="text-center py-5">
                <h5>No pending camps for approval</h5>
                <p className="text-muted">All camps are either approved, active, or rejected.</p>
              </div>
            </Col>
          </Row>
        ) : (
          <>
            <Table className="table table-hover">
              <thead>
                <tr>
                  <th>Camp Name</th>
                  <th>Organizer</th>
                  <th>Venue</th>
                  <th>Date</th>
                  <th>Expected Donors</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingCamps.map(camp => (
                  <tr key={camp.id}>
                    <td>{camp.name}</td>
                    <td>{camp.organizer}</td>
                    <td>{camp.venueName}</td>
                    <td>
                      {new Date(camp.startDate).toLocaleDateString()} - {new Date(camp.endDate).toLocaleDateString()}
                    </td>
                    <td>{camp.expectedDonors}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => {
                            setSelectedCamp(camp);
                            setApprovalModalOpen(false); // Close if open
                            setApprovalModalOpen(true);
                          }}
                        >
                          <FaEye /> View
                        </Button>
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => {
                            setSelectedCamp(camp);
                            setApprovalModalOpen(false);
                            setApprovalModalOpen(true);
                          }}
                        >
                          <FaCheck /> Approve
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => {
                            setSelectedCamp(camp);
                            setApprovalModalOpen(false);
                            setApprovalModalOpen(true);
                          }}
                        >
                          <FaTimes /> Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}

        {/* Approval/Rejection Modal */}
        <Modal show={approvalModalOpen} onHide={() => {
          setApprovalModalOpen(false);
          setSelectedCamp(null);
          setRemarks('');
        }} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedCamp ? `Review Camp: ${selectedCamp.name}` : 'Review Camp'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedCamp && (
              <>
                <div className="mb-4">
                  <h5>{selectedCamp.name}</h5>
                  <p className="text-muted">{selectedCamp.description}</p>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Organizer:</strong> {selectedCamp.organizer}
                  </div>
                  <div className="col-md-6">
                    <strong>Venue:</strong> {selectedCamp.venueName}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Date:</strong> {new Date(selectedCamp.startDate).toLocaleDateString()} - {new Date(selectedCamp.endDate).toLocaleDateString()}
                  </div>
                  <div className="col-md-6">
                    <strong>Time:</strong> {new Date(selectedCamp.startDate).toLocaleTimeString()} - {new Date(selectedCamp.endDate).toLocaleTimeString()}
                  </div>
                </div>
                <div className="mb-3">
                  <strong>Expected Donors:</strong> {selectedCamp.expectedDonors}
                </div>
                <div className="mb-3">
                  <strong>Blood Group Goals:</strong>
                  <div class="row">
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bloodType => (
                      <div key={bloodType} className="col-md-3">
                        <span className="me-2">{bloodType}:</span> {selectedCamp.bloodTypeGoals[bloodType] || 0}
                      </div>
                    ))}
                  </div>
                </div>
              )}}
            </div>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => {
                setApprovalModalOpen(false);
                setSelectedCamp(null);
                setRemarks('');
              }}>
                Cancel
              </Button>
              <Button
                variant="success"
                onClick={handleApprove}
                disabled={!selectedCamp || !remarks.trim()}
              >
                Approve
              </Button>
              <Button
                variant="danger"
                onClick={handleReject}
                disabled={!selectedCamp}
              >
                Reject
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </motion.div>
    );
};

export default CampApproval;

