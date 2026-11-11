import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Spinner, InputGroup, FormControl, Form, DropdownButton, Dropdown, Badge, Alert } from 'react-bootstrap';
import { FaSearch, FaFilter, FaSort, FaTimes, FaTable, FaThLarge, FaUserPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import emergencyService from '../services/emergencyService';

const EmergencyRequestListPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    bloodGroup: '',
    hospital: '',
    urgencyLevel: '',
    status: '',
    location: '',
    page: 1,
    limit: 10
  });
  const [sortBy, setSortBy] = useState('datePosted');
  const [sortDirection, setSortDirection] = useState('desc');
  const [viewMode, setViewMode] = useState('cards');
  const [totalPages, setTotalPages] = useState(1);

  // Blood group options for filter
  const bloodGroupOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  // Urgency level options
  const urgencyLevelOptions = ['Low', 'Medium', 'High', 'Critical'];
  // Status options
  const statusOptions = ['Draft', 'Pending Verification', 'Active', 'Searching', 'Donors Contacted', 'Blood Arranged', 'Completed', 'Cancelled', 'Expired'];

  // Fetch requests from service
  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await emergencyService.getAllRequests({
        ...filters,
        sortBy,
        sortDirection
      });
      if (response.success) {
        setRequests(response.data);
        setTotalPages(response.pagination.totalPages);
      } else {
        setError(response.error || 'Failed to load emergency requests');
      }
    } catch (err) {
      setError('An error occurred while loading emergency requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [filters, sortBy, sortDirection]);

  const handleResetFilters = () => {
    setFilters({
      search: '',
      bloodGroup: '',
      hospital: '',
      urgencyLevel: '',
      status: '',
      location: '',
      page: 1,
      limit: 10
    });
    setSortBy('datePosted');
    setSortDirection('desc');
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, page }));
    window.scrollTo(0, 0);
  };

  const handleSearchChange = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }));
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
      page: 1
    }));
  };

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  // Helper functions for badges
  const getUrgencyBadgeVariant = (level) => {
    switch (level.toLowerCase()) {
      case 'low': return 'bg-success';
      case 'medium': return 'bg-warning';
      case 'high': return 'bg-danger';
      case 'critical': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  const getUrgencyBadgeTextClass = (level) => {
    return 'text-dark';
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Draft': return 'bg-secondary';
      case 'Pending Verification': return 'bg-info';
      case 'Active': return 'bg-primary';
      case 'Searching': return 'bg-warning';
      case 'Donors Contacted': return 'bg-info';
      case 'Blood Arranged': return 'bg-success';
      case 'Completed': return 'bg-dark';
      case 'Cancelled': return 'bg-danger';
      case 'Expired': return 'bg-secondary';
      default: return 'bg-secondary';
    }
  };

  const getStatusBadgeTextClass = (status) => {
    if (status === 'Completed') {
      return 'text-white';
    }
    return 'text-dark';
  };

  const getBloodBadgeClasses = (bloodGroup) => {
    switch (bloodGroup) {
      case 'A+': return 'bg-success text-dark';
      case 'A-': return 'bg-info text-dark';
      case 'B+': return 'bg-warning text-dark';
      case 'B-': return 'bg-danger text-dark';
      case 'AB+': return 'bg-primary text-dark';
      case 'AB-': return 'bg-light text-dark';
      case 'O+': return 'bg-danger text-dark';
      case 'O-': return 'bg-dark text-white';
      default: return 'bg-secondary text-dark';
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="emergency-request-list-page min-vh-100 bg-gray-50"
      >
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <div className="text-center py-5">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <h4 className="mt-3">Loading emergency requests...</h4>
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
        className="emergency-request-list-page min-vh-100 bg-gray-50"
      >
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <div className="alert alert-danger">{error}</div>
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
      className="emergency-request-list-page min-vh-100 bg-gray-50"
    >
      <Container>
        <Row className="mb-4">
          <Col>
            <h2 className="mb-3">
              Emergency Blood Requests
              <Badge bg="light" text="dark" className="ms-2">
                {requests.length} active requests
              </Badge>
            </h2>
            <p className="text-muted">Manage and view emergency blood requests</p>
          </Col>
          <Col className="text-end">
            <Button variant="outline-primary" size="sm" as={Link} to="/emergency-request/create">
              <FaUserPlus /> New Request
            </Button>
          </Col>
        </Row>

        {/* Alerts */}
        {error && (
          <Row className="mb-4">
            <Col>
              <div className="alert alert-danger">{error}</div>
            </Col>
          </Row>
        )}

        {/* Filters Section */}
        <Card className="mb-4 shadow-sm border-0">
          <Card.Header className="bg-white border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
              <FaFilter /> Filters
            </h5>
            <Button
              variant="link"
              size="sm"
              onClick={handleResetFilters}
              className="text-muted p-0"
            >
              Reset
            </Button>
          </Card.Header>
          <Card.Body>
            <Row>
              {/* Search */}
              <Col md={2} sm={6} mb-3>
                <Form.Group controlId="search-filter">
                  <Form.Label>Search</Form.Label>
                  <InputGroup>
                    <FormControl
                      type="text"
                      placeholder="Search by patient name, hospital..."
                      value={filters.search}
                      onChange={handleSearchChange}
                    />
                    <InputGroup.Append>
                      <Button variant="outline-secondary" onClick={() => setFilters({ ...filters, search: '', page: 1 })}>
                        <FaTimes aria-label="Clear search" />
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
              </Col>

              {/* Blood Group */}
              <Col md={2} sm={6} mb-3>
                <Form.Group controlId="bloodGroup-filter">
                  <Form.Label>Blood Group</Form.Label>
                  <DropdownButton
                    title={filters.bloodGroup || 'Blood Group'}
                    variant="outline-secondary"
                    size="sm"
                  >
                    {bloodGroupOptions.map(bg => (
                      <Dropdown.Item
                        key={bg}
                        active={filters.bloodGroup === bg}
                        onClick={() => handleFilterChange('bloodGroup', bg)}
                      >
                        {bg}
                      </Dropdown.Item>
                    ))}
                    <Dropdown.Item divider />
                    <Dropdown.Item onClick={() => handleFilterChange('bloodGroup', '')}>
                      Clear
                    </Dropdown.Item>
                  </DropdownButton>
                </Form.Group>
              </Col>

              {/* Hospital */}
              <Col md={2} sm={6} mb-3>
                <Form.Group controlId="hospital-filter">
                  <Form.Label>Hospital</Form.Label>
                  <InputGroup>
                    <FormControl
                      type="text"
                      placeholder="Hospital name..."
                      value={filters.hospital || ''}
                      onChange={(e) => handleFilterChange('hospital', e.target.value)}
                    />
                    <InputGroup.Append>
                      <Button variant="outline-secondary" onClick={() => handleFilterChange('hospital', '')}>
                        <FaTimes aria-label="Clear hospital filter" />
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
              </Col>

              {/* Urgency Level */}
              <Col md={2} sm={6} mb-3>
                <Form.Group controlId="urgencyLevel-filter">
                  <Form.Label>Urgency</Form.Label>
                  <DropdownButton
                    title={filters.urgencyLevel || 'Urgency'}
                    variant="outline-secondary"
                    size="sm"
                  >
                    {urgencyLevelOptions.map(level => (
                      <Dropdown.Item
                        key={level}
                        active={filters.urgencyLevel === level}
                        onClick={() => handleFilterChange('urgencyLevel', level)}
                      >
                        {level}
                      </Dropdown.Item>
                    ))}
                    <Dropdown.Item divider />
                    <Dropdown.Item onClick={() => handleFilterChange('urgencyLevel', '')}>
                      Clear
                    </Dropdown.Item>
                  </DropdownButton>
                </Form.Group>
              </Col>

              {/* Status */}
              <Col md={2} sm={6} mb-3>
                <Form.Group controlId="status-filter">
                  <Form.Label>Status</Form.Label>
                  <DropdownButton
                    title={filters.status || 'Status'}
                    variant="outline-secondary"
                    size="sm"
                  >
                    {statusOptions.map(status => (
                      <Dropdown.Item
                        key={status}
                        active={filters.status === status}
                        onClick={() => handleFilterChange('status', status)}
                      >
                        {status}
                      </Dropdown.Item>
                    ))}
                    <Dropdown.Item divider />
                    <Dropdown.Item onClick={() => handleFilterChange('status', '')}>
                      Clear
                    </Dropdown.Item>
                  </DropdownButton>
                </Form.Group>
              </Col>

              {/* Location */}
              <Col md={2} sm={6} mb-3>
                <Form.Group controlId="location-filter">
                  <Form.Label>Location</Form.Label>
                  <InputGroup>
                    <FormControl
                      type="text"
                      placeholder="City, area..."
                      value={filters.location || ''}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                    />
                    <InputGroup.Append>
                      <Button variant="outline-secondary" onClick={() => handleFilterChange('location', '')}>
                        <FaTimes aria-label="Clear location filter" />
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
              </Col>

              {/* Sort and View Options */}
              <Col md={4} sm={12} mb-3 className="d-flex flex-wrap gap-2">
                <DropdownButton
                  title={sortBy === 'datePosted' ? 'Sort by Date' :
                     sortBy === 'bloodGroup' ? 'Sort by Blood Group' :
                     sortBy === 'hospital' ? 'Sort by Hospital' :
                     sortBy === 'urgencyLevel' ? 'Sort by Urgency' :
                     sortBy === 'status' ? 'Sort by Status' : 'Sort By'}
                  variant="outline-secondary"
                  size="sm"
                >
                  <Dropdown.Item
                    active={sortBy === 'datePosted' && sortDirection === 'asc'}
                    onClick={() => handleSortChange('datePosted')}
                  >
                    Date Posted (Oldest)
                  </Dropdown.Item>
                  <Dropdown.Item
                    active={sortBy === 'datePosted' && sortDirection === 'desc'}
                    onClick={() => handleSortChange('datePosted')}
                  >
                    Date Posted (Newest)
                  </Dropdown.Item>
                  <Dropdown.Item divider />
                  <Dropdown.Item
                    active={sortBy === 'bloodGroup' && sortDirection === 'asc'}
                    onClick={() => handleSortChange('bloodGroup')}
                  >
                    Blood Group (A-Z)
                  </Dropdown.Item>
                  <Dropdown.Item
                    active={sortBy === 'bloodGroup' && sortDirection === 'desc'}
                    onClick={() => handleSortChange('bloodGroup')}
                  >
                    Blood Group (Z-A)
                  </Dropdown.Item>
                  <Dropdown.Item divider />
                  <Dropdown.Item
                    active={sortBy === 'hospital' && sortDirection === 'asc'}
                    onClick={() => handleSortChange('hospital')}
                  >
                    Hospital (A-Z)
                  </Dropdown.Item>
                  <Dropdown.Item
                    active={searchBy === 'hospital' && searchDirection === 'desc'}
                    onClick={() => handleSortChange('hospital')}
                  >
                    Hospital (Z-A)
                  </Dropdown.Item>
                  <Dropdown.Item divider />
                  <Dropdown.Item
                    active={searchBy === 'urgencyLevel' && searchDirection === 'asc'}
                    onClick={() => handleSortChange('urgencyLevel')}
                  >
                    Urgency (Low-High)
                  </Dropdown.Item>
                  <Dropdown.Item
                    active={searchBy === 'urgencyLevel' && searchDirection === 'desc'}
                    onClick={() => handleSortChange('urgencyLevel')}
                  >
                    Urgency (High-Low)
                  </Dropdown.Item>
                  <Dropdown.Item divider />
                  <Dropdown.Item
                    active={searchBy === 'status' && searchDirection === 'asc'}
                    onClick={() => handleSortChange('status')}
                  >
                    Status (A-Z)
                  </Dropdown.Item>
                  <Dropdown.Item
                    active={searchBy === 'status' && searchDirection === 'desc'}
                    onClick={() => handleSortChange('status')}
                  >
                    Status (Z-A)
                  </Dropdown.Item>
                </DropdownButton>

                <div className="d-flex gap-2">
                  <Button
                    variant={viewMode === 'cards' ? 'primary' : 'outline-secondary'}
                    size="sm"
                    onClick={() => handleViewModeChange('cards')}
                  >
                    <FaThLarge /> Cards
                  </Button>
                  <Button
                    variant={viewMode === 'table' ? 'primary' : 'outline-secondary'}
                    size="sm"
                    onClick={() => handleViewModeChange('table')}
                  >
                    <FaTable /> Table
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Requests List */}
        {loading ? (
          <Row className="justify-content-center">
            <Col md="8">
              <div className="text-center py-5">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <h4 className="mt-3">Loading emergency requests...</h4>
              </div>
            </Col>
          </Row>
        ) : error ? (
          <Row className="justify-content-center">
            <Col md="8">
              <div className="alert alert-danger">{error}</div>
            </Col>
          </Row>
        ) : requests.length === 0 ? (
          <Row className="justify-content-center">
            <Col md="8">
              <div className="text-center py-5">
                <h5>No emergency requests found</h5>
                <p className="text-muted">Try adjusting your filters or create a new request.</p>
                <Button variant="outline-primary" as={Link} to="/emergency-request/create">
                  Create New Request
                </Button>
              </div>
            </Col>
          </Row>
        ) : (
          <>
            {viewMode === 'cards' ? (
              <Row className="g-4">
                {requests.map(request => (
                  <Col md={6} lg={4} xl={3} key={request.id}>
                    <Card className="h-100 shadow-sm border-0">
                      <Card.Body className="d-flex flex-column">
                        <h5 className="card-title">
                          {request.patientName}
                          <span className={getBloodBadgeClasses(request.bloodGroupNeeded)}>{request.bloodGroupNeeded}</span>
                        </h5>

                        <div className="mb-3">
                          <div className="d-flex justify-content-between mb-1">
                            <small className="text-muted">Hospital:</small>
                            <small>{request.hospitalName}</small>
                          </div>
                          <div className="d-flex justify-content-between mb-1">
                            <small className="text-muted">Location:</small>
                            <small>{request.location}</small>
                          </div>
                          <div className="d-flex justify-content-between mb-1">
                            <small className="text-muted">Units Needed:</small>
                            <small>{request.unitsRequired}</small>
                          </div>
                        </div>

                        <div className="mt-2 pt-2 border-top">
                          <div className="d-flex justify-content-between mb-1">
                            <small className="text-muted">Urgency:</small>
                            <span className={getUrgencyBadgeVariant(request.urgencyLevel)}>{request.urgencyLevel}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-1">
                            <small className="text-muted">Status:</small>
                            <span className={getStatusBadgeVariant(request.status)}>{request.status}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-1">
                            <small className="text-muted">Posted:</small>
                            <small>{request.datePosted ? new Date(request.datePosted).toLocaleDateString() : 'N/A'}</small>
                          </div>
                        </div>

                        <Card.Footer className="text-center pt-3">
                          <ButtonGroup className="w-100">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              as={Link}
                              to={`/emergency-request/${request.id}`}
                            >
                              View Details
                            </Button>
                            <Button
                              variant="outline-success"
                              size="sm"
                              as={Link}
                              to="/donate"
                            >
                              Donate Blood
                            </Button>
                            {request.status !== 'Completed' && request.status !== 'Cancelled' && request.status !== 'Expired' && (
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => {
                                  if (window.confirm(`Are you sure you want to cancel this request for ${request.patientName}?`)) {
                                    // In a real app, we would call the update API here to cancel the request
                                  }
                                }}
                              >
                                Cancel Request
                              </Button>
                            )}
                          </ButtonGroup>
                        </Card.Footer>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="table-responsive">
                <Table className="table table-hover table-sm">
                  <thead className="bg-light">
                    <tr>
                      <th>
                        <button onClick={() => handleSortChange('patientName')} className="text-decoration-none">
                          Patient Name
                          {sortBy === 'patientName' && (
                            <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                          )}
                        </button>
                      </th>
                      <th>
                        <button onClick={() => handleSortChange('bloodGroupNeeded')} className="text-decoration-none">
                          Blood Group
                          {sortBy === 'bloodGroupNeeded' && (
                            <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                          )}
                        </button>
                      </th>
                      <th>
                        <button onClick={() => handleSortChange('unitsRequired')} className="text-decoration-none">
                          Units Required
                          {sortBy === 'unitsRequired' && (
                            <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                          )}
                        </button>
                      </th>
                      <th>
                        <button onClick={() => handleSortChange('hospitalName')} className="text-decoration-none">
                          Hospital
                          {sortBy === 'hospitalName' && (
                            <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                          )}
                        </button>
                      </th>
                      <th>
                        <button onClick={() => handleSearchChange('location')} className="text-decoration-none">
                          Location
                          {sortBy === 'location' && (
                            <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                          )}
                        </button>
                      </th>
                      <th>
                        <button onClick={() => handleSortChange('urgencyLevel')} className="text-decoration-none">
                          Urgency Level
                          {sortBy === 'urgencyLevel' && (
                            <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                          )}
                        </button>
                      </th>
                      <th>
                        <button onClick={() => handleSortChange('status')} className="text-decoration-none">
                          Status
                          {sortBy === 'status' && (
                            <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                          )}
                        </button>
                      </th>
                      <th>
                        <button onClick={() => handleSortChange('datePosted')} className="text-decoration-none">
                          Date Posted
                          {sortBy === 'datePosted' && (
                            <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                          )}
                        </button>
                      </th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map(request => (
                      <tr key={request.id}>
                        <td>{request.patientName}</td>
                        <td>
                          <span className={getBloodBadgeClasses(request.bloodGroupNeeded)}>
                            {request.bloodGroupNeeded}
                          </span>
                        </td>
                        <td>{request.unitsRequired}</td>
                        <td>{request.hospitalName}</td>
                        <td>{request.location}</td>
                        <td>
                          <Badge variant={getUrgencyBadgeVariant(request.urgencyLevel)}>
                            {request.urgencyLevel}
                          </Badge>
                        </td>
                        <td>
                          <Badge variant={getStatusBadgeVariant(request.status)}>
                            {request.status}
                          </Badge>
                        </td>
                        <td>
                          {request.datePosted ? new Date(request.datePosted).toLocaleDateString() : 'N/A'}
                        </td>
                        <td>
                          <ButtonGroup size="sm" className="d-grid">
                            <Button
                              variant="outline-primary"
                              as={Link}
                              to={`/emergency-request/${request.id}`}
                              size="sm"
                            >
                              View Details
                            </Button>
                            <Button
                              variant="outline-success"
                              as={Link}
                              to="/donate"
                              size="sm"
                            >
                              Donate Blood
                            </Button>
                            {request.status !== 'Completed' && request.status !== 'Cancelled' && request.status !== 'Expired' && (
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => {
                                  if (window.confirm(`Are you sure you want to cancel this request for ${request.patientName}?`)) {
                                    // In a real app, we would call the update API here to cancel the request
                                  }
                                }}
                              >
                                Cancel Request
                              </Button>
                            )}
                          </ButtonGroup>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Row className="mt-4">
                <Col>
                  <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center">
                      <li className={`page-item ${filters.page === 1 ? 'disabled' : ''}`}>
                        <a
                          className="page-link"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (filters.page > 1) handlePageChange(filters.page - 1);
                          }}
                        >
                          Previous
                        </a>
                      </li>
                      {[...Array(totalPages)].map((_, i) => i + 1).map(page => (
                        <li key={page} className={`page-item ${page === filters.page ? 'active' : ''}`}>
                          <a className="page-link" href="#" onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(page);
                          }}>
                            {page}
                          </a>
                        </li>
                      ))}
                      <li className={`page-item ${filters.page === totalPages ? 'disabled' : ''}`}>
                        <a
                          className="page-link"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (filters.page < totalPages) handlePageChange(filters.page + 1);
                          }}
                        >
                          Next
                        </a>
                      </li>
                    </ul>
                  </nav>
                </Col>
              </Row>
            )}
          </>
        )}
      </Container>
    </motion.div>
  );
};

export default EmergencyRequestListPage;