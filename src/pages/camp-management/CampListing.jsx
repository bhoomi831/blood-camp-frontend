// src/pages/camp-management/CampListing.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, InputGroup, Form, Dropdown, Modal, Spinner } from 'react-bootstrap';
import { FaSearch, FaFilter, FaSort, FaTrashAlt, FaEdit, FaCheck, FaTimes, FaPlus, FaFileExport, FaClone } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import campManagementService from '../services/campManagementService';

const CampListing = () => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [venueFilter, setVenueFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [organizerFilter, setOrganizerFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedCampId, setSelectedCampId] = useState(null);
  const [venues, setVenues] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [venuesLoading, setVenuesLoading] = useState(true);
  const [organizersLoading, setOrganizersLoading] = useState(true);

  // Fetch camps
  const fetchCamps = async () => {
    setLoading(true);
    try {
      const response = await campManagementService.getCamps();
      if (response.success) {
        setCamps(response.data);
        setError(null);
      } else {
        setError(response.error || 'Failed to load camps');
      }
    } catch (err) {
      setError('An error occurred while loading camps');
    } finally {
      setLoading(false);
    }
  };

  // Fetch venues for filter
  const fetchVenues = async () => {
    setVenuesLoading(true);
    try {
      const response = await campManagementService.getVenues();
      if (response.success) {
        setVenues(response.data);
      } else {
        setError(response.error || 'Failed to load venues');
      }
    } catch (err) {
      setError('An error occurred while loading venues');
    } finally {
      setVenuesLoading(false);
    }
  };

  // Extract unique organizers from camps
  const extractOrganizers = () => {
    const uniqueOrgs = [...new Set(camps.map(camp => camp.organizer))];
    setOrganizers(uniqueOrgs.sort());
    setOrganizersLoading(false);
  };

  useEffect(() => {
    fetchCamps();
    fetchVenues();
  }, []);

  useEffect(() => {
    if (camps.length > 0) {
      extractOrganizers();
    }
  }, [camps]);

  // Filter camps
  const filteredCamps = camps.filter(camp => {
    // Search filter
    if (searchTerm && !camp.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !camp.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Status filter
    if (statusFilter !== 'all' && camp.status !== statusFilter) {
      return false;
    }

    // Venue filter
    if (venueFilter !== 'all' && camp.venueId !== venueFilter) {
      return false;
    }

    // Organizer filter
    if (organizerFilter !== 'all' && camp.organizer !== organizerFilter) {
      return false;
    }

    // Date filter
    const now = new Date();
    const campStartDate = new Date(camp.startDate);
    if (dateFilter === 'upcoming' && campStartDate <= now) {
      return false;
    }
    if (dateFilter === 'ongoing' && (campStartDate > now || new Date(camp.endDate) < now)) {
      return false;
    }
    if (dateFilter === 'past' && new Date(camp.endDate) >= now) {
      return false;
    }

    return true;
  });

  // Sort camps
  const sortedCamps = [...filteredCamps].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'date':
        comparison = new Date(a.startDate) - new Date(b.startDate);
        break;
      case 'expectedDonors':
        comparison = a.expectedDonors - b.expectedDonors;
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
      default:
        comparison = new Date(a.startDate) - new Date(b.startDate);
    }
    return sortOrder === 'desc' ? -comparison : comparison;
  });

  // Pagination
  const totalPages = Math.ceil(sortedCamps.length / itemsPerPage);
  const paginatedCamps = sortedCamps.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDeleteConfirm = (campId) => {
    setSelectedCampId(campId);
    setDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setSelectedCampId(null);
    setDeleteModalOpen(false);
  };

  const handleDeleteConfirmYes = async () => {
    if (selectedCampId) {
      try {
        await campManagementService.deleteCamp(selectedCampId);
        setDeleteModalOpen(false);
        setSelectedCampId(null);
        // Remove deleted camp from list
        setCamps(prevCamps => prevCamps.filter(camp => camp.id !== selectedCampId));
      } catch (err) {
        setError('Failed to delete camp');
      }
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="camp-listing-page min-vh-100 bg-gray-50"
      >
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <h4 className="mt-3">Loading camps...</h4>
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
        className="camp-listing-page min-vh-100 bg-gray-50"
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
      className="camp-listing-page min-vh-100 bg-gray-50"
    >
      <Container>
        <Row>
          <Col>
            <h2 className="mb-4">Camp Management</h2>
            <p className="text-muted mb-4">Overview of all blood donation camps</p>
          </Row>

          {/* Filters */}
          <Row className="mb-4">
            <Col md={12} lg={3}>
              <Form.Control
                type="text"
                placeholder="Search camps..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-3"
              />
            </Col>
            <Col md={12} lg={2}>
              <Select.Menu as={Dropdown} show>
                <Select.Toggle variant="outline-secondary" id="dropdown-status-filter">
                  Status: {statusFilter === 'all' ? 'All' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                </Select.Toggle>
                <Select.Menu>
                  <Select.Item onClick={() => setStatusFilter('all')}>All</Select.Item>
                  <Select.Item onClick={() => setStatusFilter('planned')}>Planned</Select.Item>
                  <Select.Item onClick={() => setStatusFilter('active')}>Active</Select.Item>
                  <Select.Item onClick={() => setStatusFilter('completed')}>Completed</Select.Item>
                  <Select.Item onClick={() => setStatusFilter('cancelled')}>Cancelled</Select.Item>
                </Select.Menu>
              </Select.Menu>
            </Col>
            <Col md={12} lg={2}>
              <Select.Menu as={Dropdown} show>
                <Select.Toggle variant="outline-secondary" id="dropdown-date-filter">
                  Date: {dateFilter === 'all' ? 'All' : dateFilter.charAt(0).toUpperCase() + dateFilter.slice(1)}
                </Select.Toggle>
                <Select.Menu>
                  <Select.Item onClick={() => setDateFilter('all')}>All</Select.Item>
                  <Select.Item onClick={() => setDateFilter('upcoming')}>Upcoming</Select.Item>
                  <Select.Item onClick={() => setDateFilter('ongoing')}>Ongoing</Select.Item>
                  <Select.Item onClick={() => setDateFilter('past')}>Past</Select.Item>
                </Select.Menu>
              </Select.Menu>
            </Col>
            <Col md={12} lg={2}>
              <Select.Menu as={Dropdown} show>
                <Select.Toggle variant="outline-secondary" id="dropdown-venue-filter">
                  Venue: {venueFilter === 'all' ? 'All' : venues.find(v => v.id === venueFilter)?.name || 'Select'}
                </Select.Toggle>
                <Select.Menu>
                  <Select.Item onClick={() => setVenueFilter('all')}>All</Select.Item>
                  {venues.map(venue => (
                    <Select.Item key={venue.id} onClick={() => setVenueFilter(venue.id)}>
                      {venue.name}
                    </Select.Item>
                  ))}
                </Select.Menu>
              </Select.Menu>
            </Col>
            <Col md={12} lg={2}>
              <Select.Menu as={Dropdown} show>
                <Select.Toggle variant="outline-secondary" id="dropdown-organizer-filter">
                  Organizer: {organizerFilter === 'all' ? 'All' : organizerFilter}
                </Select.Toggle>
                <Select.Menu>
                  <Select.Item onClick={() => setOrganizerFilter('all')}>All</Select.Item>
                  {organizers.map(org => (
                    <Select.Item key={org} onClick={() => setOrganizerFilter(org)}>
                      {org}
                    </Select.Item>
                  ))}
                </Select.Menu>
              </Select.Menu>
            </Col>
            <Col md={12} lg={1}>
              <Select.Menu as={Dropdown} show>
                <Select.Toggle variant="outline-secondary" id="dropdown-sort">
                  Sort: {sortBy === 'date' ? 'Date' : sortBy.charAt(0).toUpperCase() + sortBy.slice(1)} {sortOrder === 'desc' ? '▼' : '▲'}
                </Select.Toggle>
                <Select.Menu>
                  <Select.Item onClick={() => { setSortBy('name'); setSortOrder('asc'); }}>Name A-Z</Select.Item>
                  <Select.Item onClick={() => { setSortBy('name'); setSortOrder('desc'); }}>Name Z-A</Select.Item>
                  <Select.Item onClick={() => { setSortBy('date'); setSortOrder('desc'); }}>Date Newest</Select.Item>
                  <Select.Item onClick={() => { setSortBy('date'); setSortOrder('asc'); }}>Date Oldest</Select.Item>
                  <Select.Item onClick={() => { setSortBy('expectedDonors'); setSortOrder('desc'); }}>Most Expected</Select.Item>
                  <Select.Item onClick={() => { setSortBy('status'); setSortOrder('asc'); }}>Status</Select.Item>
                </Select.Menu>
              </Select.Menu>
            </Col>
          </Row>

          {/* Add Camp Button */}
          <Row className="mb-4">
            <Col>
              <Link to="/camps/create">
                <Button variant="outline-primary" className="float-end">
                  <FaPlus /> New Camp
                </Button>
              </Link>
            </Col>
          </Row>

          {/* Camps Table/Card View Toggle */}
          <Row className="mb-3">
            <Col>
              <ButtonGroup aria-label="View toggle">
                <Button variant="outline-secondary" active>Cards</Button>
                <Button variant="outline-secondary">Table</Button>
              </ButtonGroup>
            </Col>
          </Row>

          {/* Camps Display */}
          {paginatedCamps.length === 0 ? (
            <Row>
              <Col>
                <div className="text-center py-5">
                  <h5>No camps found</h5>
                  <p className="text-muted">Try adjusting your filters or search criteria</p>
                </div>
              </Col>
            </Row>
          ) : (
            <>
              {/* Cards View */}
              <Row className="g-4">
                {paginatedCamps.map(camp => (
                  <Col key={camp.id} md={6} lg={4} xl={3}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="camp-card h-100"
                    >
                      <Card className="h-100 border-0 shadow-sm">
                        <Card.Body className="d-flex flex-column">
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <div>
                              <h5 className="card-title mb-1">{camp.name}</h5>
                              <p className="card-text text-muted small mb-0">{camp.venueName}</p>
                            </div>
                            <span className={`badge bg-${getStatusColor(camp.status)} px-3 py-2`}>
                              {camp.status.charAt(0).toUpperCase() + camp.status.slice(1)}
                            </span>
                          </div>

                          <div className="flex-grow-1 mb-3">
                            <p className="card-text text-muted">{camp.description}</p>
                            <div className="mt-2">
                              <small className="text-muted me-3">
                                <i className="fas fa-calendar me-1"></i>
                                {new Date(camp.startDate).toLocaleDateString()} - {new Date(camp.endDate).toLocaleDateString()}
                              </small>
                              <small className="text-muted">
                                <i className="fas fa-tint me-1"></i>
                                {camp.expectedDonors} expected donors
                              </small>
                            </div>
                          </div>

                          <div className="d-flex justify-content-between mt-3">
                            <Link to={`/camps/${camp.id}`}>
                              <Button variant="outline-primary" size="sm">
                                <FaEye /> View
                              </Button>
                            </Link>
                            <div className="d-flex gap-2">
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => window.location.href = `/camps/${camp.id}/edit`}
                              >
                                <FaEdit /> Edit
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDeleteConfirm(camp.id)}
                              >
                                <FaTrashAlt /> Delete
                              </Button>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </motion.div>
                  </Col>
                ))}
              </Row>

              {/* Pagination */}
              {totalPages > 1 && (
                <Row className="mt-5">
                  <Col>
                    <nav aria-label="Page navigation">
                      <ul className="pagination justify-content-center">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                          <button className="page-link" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                            Previous
                          </button>
                        </li>
                        {[...Array(totalPages)].map((_, i) => i + 1).map(page => (
                          <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(page)}>
                              {page}
                            </button>
                          </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                          <button className="page-link" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
                    <p className="text-center mt-2 text-muted">
                      Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, sortedCamps.length)} of {sortedCamps.length} camps
                    </p>
                  </Col>
                </Row>
              )}
            </>
          )}

          {/* Delete Confirmation Modal */}
          <Modal show={deleteModalOpen} onHide={handleDeleteCancel} centered>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to delete this camp?</p>
              <p><strong>This action cannot be undone.</strong></p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleDeleteCancel}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteConfirmYes}>
                Delete Camp
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </motion.div>
    );
};

// Helper functions
const getStatusColor = (status) => {
  switch (status) {
    case 'planned': return 'warning';
    case 'active': return 'success';
    case 'completed': return 'info';
    case 'cancelled': return 'danger';
    default: return 'secondary';
  }
};

export default CampListing;