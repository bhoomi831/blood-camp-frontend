import React from 'react';
import { Card, Badge, ListGroup } from 'react-bootstrap';
import { FaTint, FaUserPlus, FaCalendarAlt, FaMale, FaFemale, FaTransgenderAlt, FaIdCard } from 'react-icons/fa';

const DonorCard = ({ donor, onClick }) => {
  const getEligibilityBadge = (status) => {
    switch (status) {
      case 'Eligible': return 'bg-success';
      case 'Temporarily Deferred': return 'bg-warning';
      case 'Permanently Deferred': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return 'N/A';
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="donor-card cursor-pointer hover-shadow" onClick={onClick}>
      <Card className="h-100 border-0 shadow-sm">
        <Card.Body className="d-flex flex-column">
          <div className="mb-3">
            <h5 className="card-title">
              {donor.firstName} {donor.lastName}
              <span className="ml-2 badge bg-light text-dark">
                #{donor.id.slice(-4)}
              </span>
            </h5>
            <div className="d-flex justify-content-between mb-2">
              <span className="badge badge-pill mr-1">
                {donor.bloodGroup}
              </span>
              <span className={`badge badge-pill ${getEligibilityBadge(donor.eligibilityStatus)}`}>
                {donor.eligibilityStatus}
              </span>
              <span className="badge badge-pill">
                {donor.gender}
              </span>
            </div>
          </div>
          <ListGroup className="flex-grow-1 mb-3 flush">
            <ListGroup.Item>
              <small className="text-muted">
                <FaCalendarAlt /> {new Date(donor.dateOfBirth).toLocaleDateString()}
                ({calculateAge(donor.dateOfBirth)} years)
              </small>
            </ListGroup.Item>
            <ListGroup.Item>
              <small className="text-muted">
                <FaPhone /> {donor.phone}
              </small>
            </ListGroup.Item>
            <ListGroup.Item>
              <small className="text-muted">
                <FaEnvelope /> {donor.email}
              </small>
            </ListGroup.Item>
          </ListGroup>
          {donor.lastDonationDate && (
            <div className="mt-auto text-center">
              <small className="text-muted">
                Last donation: {new Date(donor.lastDonationDate).toLocaleDateString()}
              </small>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default DonorCard;