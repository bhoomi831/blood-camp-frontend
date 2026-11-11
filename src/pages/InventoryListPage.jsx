import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Spinner, InputGroup, FormControl, Form, DropdownButton, Dropdown, Badge, Alert, ButtonGroup } from 'react-bootstrap';
import { FaSearch, FaFilter, FaSort, FaTimes, FaTable, FaThLarge, FaTintSlash, FaTint, FaCalendarAlt, FaChartBar, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import inventoryService from '../services/inventoryService';

const InventoryListPage = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    bloodGroup: '',
    minUnits: '',
    maxUnits: '',
    status: '',
    expiryDays: '',
    page: 1,
    limit: 12
  });
  const [sortBy, setSortBy] = useState('lastUpdated');
  const [sortDirection, setSortDirection] = useState('desc');
  const [viewMode, setViewMode] = useState('cards');
  const [totalPages, setTotalPages] = useState(1);

  // Blood group options for filter
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  // Status options
  const statusOptions = ['Critical', 'Low', 'Normal', 'Good', 'Excellent'];
  // Expiry filter options (days until expiry)
  const expiryOptions = [
    { label: 'Expiring Today', value: 0 },
    { label: 'Expiring in 2 Days', value: 2 },
    { label: 'Expiring in 3 Days', value: 3 },
    { label: 'Expiring in 1 Week', value: 7 },
    { label: 'Expiring in 2 Weeks', value: 14 },
    { label: 'Expiring in 1 Month', value: 30 }
  ];

  // Fetch inventory from service
  const fetchInventory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await inventoryService.getInventorySummary({
        ...filters,
        sortBy,
        sortDirection
      });
      if (response.success) {
        setInventory(response.data);
        setTotalPages(response.pagination.totalPages);
      } else {
        setError(response.error || 'Failed to load inventory');
      }
    } catch (err) {
      setError('An error occurred while loading inventory');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, [filters, sortBy, sortDirection]);

  const handleResetFilters = () => {
    setFilters({
      search: '',
      bloodGroup: '',
      minUnits: '',
      maxUnits: '',
      status: '',
      expiryDays: '',
      page: 1,
      limit: 12
    });
    setSortBy('lastUpdated');
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

  // Helper function to get status text and badge class based on units available
  const getBloodStatus = (units) => {
    if (units === 0) return { text: 'Out of Stock', variant: 'bg-danger' };
    if (units <= 5) return { text: 'Critical', variant: 'bg-danger' };
    if (units <= 15) return { text: 'Low', variant: 'bg-warning' };
    if (units <= 30) return { text: 'Normal', variant: 'bg-info' };
    if (units <= 50) return { text: 'Good', variant: 'bg-success' };
    return { text: 'Excellent', variant: 'bg-success' };
  };

  // Helper function to get badge classes for blood group
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

  // Helper function to calculate expiry status
  const getExpiryStatus = (expiryDate) => {
    if (!expiryDate) return { text: 'No Expiry Date', variant: 'bg-secondary' };

    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { text: 'Expired', variant: 'bg-danger' };
    if (diffDays === 0) return { text: 'Expires Today', variant: 'bg-danger' };
    if (diffDays <= 2) return { text: `Expires in ${diffDays} Days`, variant: 'bg-warning' };
    if (diffDays <= 7) return { text: `Expiring in ${diffDays} Days`, variant: 'bg-info' };
    return { text: `Expiring in ${diffDays} Days`, variant: 'bg-success' };
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inventory-list-page min-vh-100 bg-gray-50"
      >
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <div className="text-center py-5">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <h4 className="mt-3">Loading blood inventory...</h4>
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
        className="inventory-list-page min-vh-100 bg-gray-50"
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
      className="inventory-list-page min-vh-100 bg-gray-50"
    >
      <Container>
        <Row className="mb-4">
          <Col>
            <h2 className="mb-3">
              Blood Inventory Management
              <Badge bg="light" text="dark" className="ms-2">
                {inventory.reduce((total, item) => total + (item.unitsAvailable || 0), 0)} units available
              </Badge>
            </h2>
            <p className="text-muted">Monitor and manage blood inventory levels</p>
          </Col>
          <Col className="text-end">
            <Button variant="outline-primary" size="sm" as={Link} to="/donate">
              <FaTint /> Record Donation
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

        {/* Statistics Summary */}
        {inventory.length > 0 && (
          <Row className="mb-4">
            <Col md={3} sm={6} className="mb-3">
                <Card className="text-center bg-primary text-white border-0">
                  <Card.Body>
                    <h5 className="card-title">Total Units</h5>
                    <h2 className="display-5">
                      {inventory.reduce((total, item) => total + (item.unitsAvailable || 0), 0)}
                    </h2>
                    <p className="card-text">Available</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} sm={6} className="mb-3">
                <Card className="text-center bg-success text-white border-0">
                  <Card.Body>
                    <h5 className="card-title">Blood Types</h5>
                    <h2 className="display-5">{inventory.length}</h2>
                    <p className="card-text">Types in Stock</p>
                  </Card.Body>
                </Card>
            </Col>
              <Col md={3} sm={6} className="mb-3">
                <Card className="text-center bg-warning text-dark border-0">
                  <Card.Body>
                    <h5 className="card-title">{'Critical (<5)'}</h5>
                    <h2 className="display-5">
                      {inventory.filter(item => (item.unitsAvailable || 0) <= 5).length}
                    </h2>
                    <p className="card-text">Blood Types</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} sm={6} className="mb-3">
                <Card className="text-center bg-info text-white border-0">
                  <Card.Body>
                    <h5 className="card-title">Expired/Useless</h5>
                    <h2 className="display-5">
                      {inventory.filter(item => (item.unitsAvailable || 0) === 0).length}
                    </h2>
                    <p className="card-text">Units</p>
                  </Card.Body>
                </Card>
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
              <Col md={2} sm={6} className="mb-3">
                <Form.Group controlId="search-filter">
                  <Form.Label>Search</Form.Label>
                  <InputGroup>
                    <FormControl
                      type="text"
                      placeholder="Search by blood group..."
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
              <Col md={2} sm={6} className="mb-3">
                <Form.Group controlId="bloodGroup-filter">
                  <Form.Label>Blood Group</Form.Label>
                  <DropdownButton
                    title={filters.bloodGroup || 'Blood Group'}
                    variant="outline-secondary"
                    size="sm"
                  >
                    {bloodGroups.map(bg => (
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

              {/* Status */}
              <Col md={2} sm={6} className="mb-3">
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

              {/* Units Range */}
              <Col md={2} sm={6} className="mb-3">
                <Form.Group controlId="minUnits-filter">
                  <Form.Label>Min Units</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Min"
                    min="0"
                    value={filters.minUnits || ''}
                    onChange={(e) => handleFilterChange('minUnits', e.target.value)}
                    className="form-control-sm"
                  />
                </Form.Group>
              </Col>
              <Col md={2} sm={6} mb-3>
                <Form.Group controlId="maxUnits-filter">
                  <Form.Label>Max Units</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Max"
                    min="0"
                    value={filters.maxUnits || ''}
                    onChange={(e) => handleFilterChange('maxUnits', e.target.value)}
                    className="form-control-sm"
                  />
                </Form.Group>
              </Col>

              {/* Expiry Filter */}
              <Col md={2} sm={6} mb-3>
                <Form.Group controlId="expiryDays-filter">
                  <Form.Label>Expiring In</Form.Label>
                  <DropdownButton
                    title={filters.expiryDays ? `In ${filters.expiryDays} Days` : 'Expiry'}
                    variant="outline-secondary"
                    size="sm"
                  >
                    {expiryOptions.map(option => (
                      <Dropdown.Item
                        key={option.value}
                        active={filters.expiryDays == option.value}
                        onClick={() => handleFilterChange('expiryDays', option.value)}
                      >
                        {option.label}
                      </Dropdown.Item>
                    ))}
                    <Dropdown.Item divider />
                    <Dropdown.Item onClick={() => handleFilterChange('expiryDays', '')}>
                      Clear
                    </Dropdown.Item>
                  </DropdownButton>
                </Form.Group>
              </Col>

              {/* Sort and View Options */}
              <Col md={4} sm={12} className="mb-3 d-flex flex-wrap gap-2">
                <DropdownButton
                  title={sortBy === 'lastUpdated' ? 'Sort by Updated' :
                         sortBy === 'bloodGroup' ? 'Sort by Blood Group' :
                         sortBy === 'unitsAvailable' ? 'Sort by Units' : 'Sort By'}
                  variant="outline-secondary"
                  size="sm"
                >
                  <Dropdown.Item
                    active={sortBy === 'lastUpdated' && sortDirection === 'asc'}
                    onClick={() => handleSortChange('lastUpdated')}
                  >
                    Last Updated (Oldest)
                  </Dropdown.Item>
                  <Dropdown.Item
                    active={sortBy === 'lastUpdated' && sortDirection === 'desc'}
                    onClick={() => handleSortChange('lastUpdated')}
                  >
                    Last Updated (Newest)
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
                    active={sortBy === 'unitsAvailable' && sortDirection === 'asc'}
                    onClick={() => handleSortChange('unitsAvailable')}
                  >
                    Units (Low-High)
                  </Dropdown.Item>
                  <Dropdown.Item
                    active={sortBy === 'unitsAvailable' && sortDirection === 'desc'}
                    onClick={() => handleSortChange('unitsAvailable')}
                  >
                    Units (High-Low)
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

        {/* Inventory Summary Chart */}
        {inventory.length > 0 && (
          <Card className="mb-4 shadow-sm border-0">
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0">
                <FaChartBar /> Inventory Overview
              </h5>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="row g-0">
                {inventory.map((item, index) => {
                  const { text, variant } = getBloodStatus(item.unitsAvailable || 0);
                  const expiryStatus = getExpiryStatus(item.expiryDate);
                  return (
                    <Col key={item.bloodGroup} md={3} sm={6} className="p-3 border-end border-bottom">
                      <div className="d-flex w-100 justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1">
                            <span className={getBloodBadgeClasses(item.bloodGroup)}>{item.bloodGroup}</span>
                          </h6>
                          <p className="mb-2">{item.unitsAvailable || 0} units available</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={variant} className="mb-2">
                            {text}
                          </Badge>
                          {item.expiryDate && (
                            <small className="text-muted d-block">
                              {expiryStatus.text}
                            </small>
                          )}
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </div>
            </Card.Body>
          </Card>
        )}

        {/* Inventory List */}
        {loading ? (
          <Row className="justify-content-center">
            <Col md="8">
              <div className="text-center py-5">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <h4 className="mt-3">Loading blood inventory...</h4>
              </div>
            </Col>
          </Row>
        ) : error ? (
          <Row className="justify-content-center">
            <Col md="8">
              <div className="alert alert-danger">{error}</div>
            </Col>
          </Row>
        ) : inventory.length === 0 ? (
          <Row className="justify-content-center">
            <Col md="8">
              <div className="text-center py-5">
                <h5>No inventory data found</h5>
                <p className="text-muted">Try adjusting your filters or add new inventory records.</p>
                <Button variant="outline-primary" as={Link} to="/donate">
                  Record Donation
                </Button>
              </div>
            </Col>
          </Row>
        ) : (
          <>
            {viewMode === 'cards' ? (
              <Row className="g-4">
                {inventory.map(item => (
                  <Col key={item.bloodGroup} md={6} lg={4} xl={3}>
                    <Card className="h-100 shadow-sm border-0">
                      <Card.Body className="d-flex flex-column">
                        <h5 className="card-title">
                          <span className={getBloodBadgeClasses(item.bloodGroup)}>{item.bloodGroup}</span>
                        </h5>

                        <div className="grow mb-3">
                          <div className="mb-2">
                            <h4 className="display-4 fw-bold mb-0">{item.unitsAvailable || 0}</h4>
                            <p className="mb-0 text-muted">Units Available</p>
                          </div>

                          <div className="d-flex justify-content-between">
                            <span>Last Updated:</span>
                            <small className="text-muted">
                              {item.lastUpdated ? new Date(item.lastUpdated).toLocaleDateString() : 'N/A'}
                            </small>
                          </div>
                        </div>

                        <Card.Footer className="text-center pt-3">
                          <ButtonGroup className="w-100">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              as={Link}
                              to={`/inventory/${item.bloodGroup}`}
                            >
                              View Details
                            </Button>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              as={Link}
                              to="/donate"
                            >
                              Add Units
                            </Button>
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
                        <button onClick={() => handleSortChange('bloodGroup')} className="text-decoration-none">
                          Blood Group
                          {sortBy === 'bloodGroup' && (
                            <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                          )}
                        </button>
                      </th>
                      <th>
                        <button onClick={() => handleSortChange('unitsAvailable')} className="text-decoration-none">
                          Units Available
                          {sortBy === 'unitsAvailable' && (
                            <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                          )}
                        </button>
                      </th>
                      <th>
                        <button onClick={() => handleSortChange('lastUpdated')} className="text-decoration-none">
                          Last Updated
                          {sortBy === 'lastUpdated' && (
                            <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                          )}
                        </button>
                      </th>
                      <th>
                        <button onClick={() => handleSortChange('expiryDate')} className="text-decoration-none">
                          Expiry Date
                          {sortBy === 'expiryDate' && (
                            <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                          )}
                        </button>
                      </th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map(item => {
                      const status = getBloodStatus(item.unitsAvailable || 0);
                      const expiryStatus = getExpiryStatus(item.expiryDate);

                      return (
                        <tr key={item.bloodGroup}>
                          <td>
                            <span className={getBloodBadgeClasses(item.bloodGroup)}>
                              {item.bloodGroup}
                            </span>
                          </td>
                          <td>{item.unitsAvailable || 0}</td>
                          <td>
                            {item.lastUpdated ? new Date(item.lastUpdated).toLocaleDateString() : 'N/A'}
                          </td>
                          <td>
                            {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : 'N/A'}
                          </td>
                          <td>
                            <Badge variant={status.variant} className="text-white">
                              {status.text}
                            </Badge>
                          </td>
                          <td>
                            <ButtonGroup size="sm" className="d-grid">
                              <Button
                                variant="outline-primary"
                                as={Link}
                                to={`/inventory/${item.bloodGroup}`}
                                size="sm"
                              >
                                Details
                              </Button>
                              <Button
                                variant="outline-secondary"
                                as={Link}
                                to="/donate"
                                size="sm"
                              >
                                Add Units
                              </Button>
                            </ButtonGroup>
                          </td>
                        </tr>
                      );
                    })}
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

export default InventoryListPage;