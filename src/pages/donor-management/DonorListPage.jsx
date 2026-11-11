import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Spinner, InputGroup, FormControl, Form, DropdownButton, Dropdown, Badge, Alert, ButtonGroup } from 'react-bootstrap';
import { FaSearch, FaFilter, FaSort, FaTimes, FaSyncAlt, FaUser, FaCalendarAlt, FaPlus, FaTrashAlt, FaEdit, FaChalkboardTeacher, FaMale, FaFemale, FaMapMarkerAlt, FaFilter as FaFilterIcon, FaExchangeAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import donorService from '../../services/donorService';

const DonorListPage = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    bloodGroup: '',
    eligibility: '',      // Eligible, Not Eligible, Pending
    gender: '',           // Male, Female, Other
    location: '',         // City, area
    minAge: '',           // Minimum age
    maxAge: '',           // Maximum age
    registrationDate: '', // Registration date filter
    page: 1,
    limit: 12
  });
  const [sortBy, setSortBy] = useState('registrationDate'); // registrationDate, name, age, bloodGroup, lastDonation
  const [sortDirection, setSortDirection] = useState('desc'); // asc, desc
  const [viewMode, setViewMode] = useState('cards'); // cards or table
  const [totalPages, setTotalPages] = useState(1);

  // Filter options
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const eligibilityOptions = ['Eligible', 'Not Eligible', 'Pending'];
  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];

  // Fetch donors from service
  const fetchDonors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await donorService.getDonors({
        ...filters,
        sortBy,
        sortDirection
      });
      if (response.success) {
        setDonors(response.data);
        setTotalPages(response.pagination.totalPages);
      } else {
        setError(response.error || 'Failed to load donors');
      }
    } catch (err) {
      setError('An error occurred while loading donors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, [filters, sortBy, sortDirection]);

  const handleResetFilters = () => {
    setFilters({
      search: '',
      bloodGroup: '',
      eligibility: '',
      gender: '',
      location: '',
      minAge: '',
      maxAge: '',
      registrationDate: '',
      page: 1,
      limit: 12
    });
    setSortBy('registrationDate');
    setSortDirection('desc');
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, page }));
    window.scrollTo(0, 0); // Scroll to top when changing pages
  };

  const handleSearchChange = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }));
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
      page: 1 // Reset to first page when filtering
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

  // Helper function to determine donation eligibility
  const getEligibilityStatus = (donor) => {
    // Simple eligibility logic - in a real app this would be more complex
    const age = new Date().getFullYear() - new Date(donor.dateOfBirth).getFullYear();
    const lastDonation = donor.lastDonationDate ? new Date(donor.lastDonationDate) : null;
    const lastDonationDaysAgo = lastDonation ? (Date.now() - lastDonation) / (1000 * 60 * 60 * 24) : Infinity;

    const isAgeEligible = age >= 18 && age <= 65;
    const isWeightEligible = donor.weight >= 50; // kg
    const isHealthEligible = !donor.hasChronicIllnesses && !donor.isOnMedication;
    const isFrequencyEligible = lastDonationDaysAgo >= 56 || lastDonation === null; // 8 weeks minimum

    return isAgeEligible && isWeightEligible && isHealthEligible && isFrequencyEligible ? 'Eligible' : 'Not Eligible';
  };

  // Helper function to calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return 'N/A';
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Helper function to get badge variant based on blood group
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

  // Helper function to get eligibility badge variant
  const getEligibilityBadgeVariant = (status) => {
    switch (status) {
      case 'Eligible': return 'bg-success';
      case 'Not Eligible': return 'bg-danger';
      case 'Pending': return 'bg-warning';
      default: return 'bg-secondary';
    }
  };

  // Helper function to get gender icon
  const getGenderIcon = (gender) => {
    switch (gender.toLowerCase()) {
      case 'male': return <FaMale />;
      case 'female': return <FaFemale />;
      case 'other': return <FaChalkboardTeacher />; // Using as neutral option
      default: return <FaUser />;
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="donor-list-page min-vh-100 bg-gray-50"
      >
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <div className="text-center py-5">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <h4 className="mt-3">Loading donors...</h4>
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
        className="donor-list-page min-vh-100 bg-gray-50"
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
      className="donor-list-page min-vh-100 bg-gray-50"
    >
      <Container>
        <Row className="mb-4">
          <Col>
            <h2 className="mb-3">
              Donor Management
              <Badge bg="light" text="dark" className="ms-2">
                {donors.length} registered donors
              </Badge>
            </h2>
            <p className="text-muted">Manage and search through registered blood donors</p>
          </Col>
          <Col className="text-end">
            <Button variant="outline-primary" size="sm" as={Link} to="/donor/register">
              <FaPlus /> Register Donor
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
                      placeholder="Search by name, email, phone..."
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

              {/* Eligibility */}
              <Col md={2} sm={6} mb-3>
                <Form.Group controlId="eligibility-filter">
                  <Form.Label>Eligibility</Form.Label>
                  <DropdownButton
                    title={filters.eligibility || 'Eligibility'}
                    variant="outline-secondary"
                    size="sm"
                  >
                    {eligibilityOptions.map(option => (
                      <Dropdown.Item
                        key={option}
                        active={filters.eligibility === option}
                        onClick={() => handleFilterChange('eligibility', option)}
                      >
                        {option}
                      </Dropdown.Item>
                    ))}
                    <Dropdown.Item divider />
                    <Dropdown.Item onClick={() => handleFilterChange('eligibility', '')}>
                      Clear
                    </Dropdown.Item>
                  </DropdownButton>
                </Form.Group>
              </Col>

              {/* Gender */}
              <Col md={2} sm={6} mb-3>
                <Form.Group controlId="gender-filter">
                  <Form.Label>Gender</Form.Label>
                  <DropdownButton
                    title={filters.gender || 'Gender'}
                    variant="outline-secondary"
                    size="sm"
                  >
                    {genderOptions.map(option => (
                      <Dropdown.Item
                        key={option}
                        active={filters.gender === option}
                        onClick={() => handleFilterChange('gender', option)}
                      >
                        {option}
                      </Dropdown.Item>
                    ))}
                    <Dropdown.Item divider />
                    <Dropdown.Item onClick={() => handleFilterChange('gender', '')}>
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

              {/* Age Range */}
              <Col md={2} sm={6} mb-3>
                <Form.Group controlId="minAge-filter">
                  <Form.Label>Min Age</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Min"
                    min="18"
                    max="100"
                    value={filters.minAge || ''}
                    onChange={(e) => handleFilterChange('minAge', e.target.value)}
                    className="form-control-sm"
                  />
                </Form.Group>
              </Col>
              <Col md={2} sm={6} mb-3>
                <Form.Group controlId="maxAge-filter">
                  <Form.Label>Max Age</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Max"
                    min="18"
                    max="100"
                    value={filters.maxAge || ''}
                    onChange={(e) => handleFilterChange('maxAge', e.target.value)}
                    className="form-control-sm"
                  />
                </Form.Group>
              </Col>

              {/* Registration Date */}
              <Col md={2} sm={6} mb-3>
                <Form.Group controlId="registrationDate-filter">
                  <Form.Label>Reg. Date</Form.Label>
                  <InputGroup>
                    <FormControl
                      type="date"
                      value={filters.registrationDate || ''}
                      onChange={(e) => handleFilterChange('registrationDate', e.target.value)}
                    />
                    <InputGroup.Append>
                      <Button variant="outline-secondary" onClick={() => handleFilterChange('registrationDate', '')}>
                        <FaTimes aria-label="Clear date filter" />
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
              </Col>

              {/* Sort and View Options */}
              <Col md={4} sm={12} mb-3 className="d-flex flex-wrap gap-2">
                <DropdownButton
                  title={sortBy === 'registrationDate' ? 'Sort by Reg.Date' : sortBy === 'name' ? 'Sort by Name' : sortBy === 'age' ? 'Sort by Age' : sortBy === 'bloodGroup' ? 'Sort by Blood Group' : sortBy === 'lastDonation' ? 'Sort by Last Donation' : 'Sort By'}
                  variant="outline-secondary"
                  size="sm"
                >
                  <Dropdown.Item
                    active={sortBy === 'registrationDate' && sortDirection === 'asc'}
                    onClick={() => handleSortChange('registrationDate')}
                  >
                    Registration Date (Oldest)
                  </Dropdown.Item>
                  <Dropdown.Item
                    active={sortBy === 'registrationDate' && sortDirection === 'desc'}
                    onClick={() => handleSortChange('registrationDate')}
                  >
                    Registration Date (Newest)
                  </Dropdown.Item>
                  <Dropdown.Item divider />
                  <Dropdown.Item
                    active={sortBy === 'name' && sortDirection === 'asc'}
                    onClick={() => handleSortChange('name')}
                  >
                    Name (A-Z)
                  </Dropdown.Item>
                  <Dropdown.Item
                    active={sortBy === 'name' && sortDirection === 'desc'}
                    onClick={() => handleSortChange('name')}
                  >
                    Name (Z-A)
                  </Dropdown.Item>
                  <Dropdown.Item divider />
                  <Dropdown.Item
                    active={sortBy === 'age' && sortDirection === 'asc'}
                    onClick={() => handleSortChange('age')}
                  >
                    Age (Youngest)
                  </Dropdown.Item>
                  <Dropdown.Item
                    active={sumBy === 'age' && sortDirection === 'desc'}
                    onClick={() => handleSortChange('age')}
                  >
                    Age (Oldest)
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
                    active={sortBy === 'lastDonation' && sortDirection === 'asc'}
                    onClick={() => handleSortChange('lastDonation')}
                  >
                    Last Donation (Oldest)
                  </Dropdown.Item>
                  <Dropdown.Item
                    active={sortBy === 'lastDonation' && sortDirection === 'desc'}
                    onClick={() => handleSortChange('lastDonation')}
                  >
                    Last Donation (Most Recent)
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

        {/* Donors List */}
        {loading ? (
          <Row className="justify-content-center">
            <Col md="8">
              <div className="text-center py-5">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <h4 className="mt-3">Loading donors...</h4>
              </div>
            </Col>
          </Row>
        ) : error ? (
          <Row className="justify-content-center">
            <Col md="8">
              <div className="alert alert-danger">{error}</div>
            </Col>
          </Row>
        ) : donors.length === 0 ? (
          <Row className="justify-content-center">
            <Col md="8">
              <div className="text-center py-5">
                <h5>No donors found</h5>
                <p className="text-muted">Try adjusting your filters or register a new donor.</p>
                <Button variant="outline-primary" as={Link} to="/donor/register">
                  Register Donor
                </Button>
              </div>
            </Col>
          </Row>
        ) : (
          <>
            {viewMode === 'cards' ? (
              <Row className="g-4">
                {donors.map(donor => (
                  <Col md={6} lg={4} xl={3} key={donor.id}>
                    <Card className="h-100 shadow-sm border-0">
                      <Card.Body className="d-flex flex-column">
                        <h5 className="card-title">
                          {donor.firstName} {donor.lastName}
                          <span className={getBloodBadgeClasses(donor.bloodGroup)}>{donor.bloodGroup}</span>
                        </h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {calculateAge(donor.dateOfBirth)} years • {donor.gender}
                        </h6>

                        <div className="mb-3">
                          <div className="d-flex justify-content-between mb-1">
                            <small className="text-muted">Email:</small>
                            <small>{donor.email}</small>
                          </div>
                          <div className="d-flex justify-content-between mb-1">
                            <small className="text-muted">Phone:</small>
                            <small>{donor.phone}</small>
                          </div>
                          <div className="d-flex justify-content-between mb-1">
                            <small className="text-muted">Location:</small>
                            <small>{donor.city}, {donor.state}</small>
                          </div>
                        </div>

                        <div className="mt-2 pt-2 border-top">
                          <div className="d-flex justify-content-between mb-1">
                            <small className="text-muted">Last Donation:</small>
                            <small>{donor.lastDonationDate ? new Date(donor.lastDonationDate).toLocaleDateString() : 'Never'}</small>
                          </div>
                          <div className="d-flex justify-content-between mb-1">
                            <small className="text-muted">Eligibility:</small>
                            <span className={getEligibilityBadgeVariant(getEligibilityStatus(donor))}>
                              {getEligibilityStatus(donor)}
                            </span>
                          </div>
                        </div>

                        <Card.Footer className="text-center pt-3">
                          <ButtonGroup className="w-100">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              as={Link}
                              to={`/donor/${donor.id}`}
                            >
                              View Details
                            </Button>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              as={Link}
                              to={`/donor/${donor.id}/edit`}
                            >
                              Edit
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
                        <button onClick={() => handleSortChange('name')} className="text-decoration-none">
                          Name
                          {sortBy === 'name' && (
                            <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                          )}
                        </button>
                      </th>
                      <th>
                        <button onClick={() => handleSortChange('bloodGroup')} className="text-decoration-none">
                          Blood Group
                          {sortBy === 'bloodGroup' && (
                            <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                          )}
                        </button>
                      </th>
                      <th>
                        <button onClick={() => handleSortChange('age')} className="text-decoration-none">
                          Age
                          {sortBy === 'age' && (
                            <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                          )}
                        </button>
                      </th>
                      <th>
                        <button onClick={() => handleSortChange('gender')} className="text-decoration-none">
                          Gender
                          {sortBy === 'gender' && (
                            <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                          )}
                        </button>
                      </th>
                      <th>
                        <button onClick={() => handleSortChange('email')} className="text-decoration-none">
                          Email
                          {sortBy === 'email' && (
                            <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                          )}
                        </button>
                      </th>
                      <th>
                        <button onClick={() => handleSortChange('phone')} className="text-decoration-none">
                          Phone
                          {sortBy === 'phone' && (
                            <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                          )}
                        </button>
                      </th>
                      <th>
                        <button onClick={() => handleSortChange('lastDonation')} className="text-decoration-none">
                          Last Donation
                          {sortBy === 'lastDonation' && (
                            <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                          )}
                        </button>
                      </th>
                      <th>Eligibility</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donors.map(donor => {
                      const age = calculateAge(donor.dateOfBirth);
                      const eligibility = getEligibilityStatus(donor);
                      const eligibilityVariant = getEligibilityBadgeVariant(eligibility);

                      return (
                        <tr key={donor.id}>
                          <td>{donor.firstName} {donor.lastName}</td>
                          <td>
                            <span className={getBloodBadgeClasses(donor.bloodGroup)}>
                              {donor.bloodGroup}
                            </span>
                          </td>
                          <td>{age}</td>
                          <td>{donor.gender}</td>
                          <td>{donor.email}</td>
                          <td>{donor.phone}</td>
                          <td>
                            {donor.lastDonationDate ? new Date(donor.lastDonationDate).toLocaleDateString() : 'Never'}
                          </td>
                          <td>
                            <Badge variant={eligibilityVariant}>
                              {eligibility}
                            </Badge>
                          </td>
                          <td>
                            <ButtonGroup size="sm" className="d-grid">
                              <Button
                                variant="outline-primary"
                                as={Link}
                                to={`/donor/${donor.id}`}
                                size="sm"
                              >
                                View
                              </Button>
                              <Button
                                variant="outline-secondary"
                                as={Link}
                                to={`/donor/${donor.id}/edit`}
                                size="sm"
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => {
                                  if (window.confirm(`Are you sure you want to delete ${donor.firstName} ${donor.lastName}?`)) {
                                    // In a real app, we would call the delete API here
                                  }
                                }}
                              >
                                Delete
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

export default DonorListPage;