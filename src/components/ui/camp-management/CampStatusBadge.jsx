// src/components/ui/camp-management/CampStatusBadge.jsx
import React from 'react';
import { Badge } from 'react-bootstrap';

const CampStatusBadge = ({ status }) => {
  const getVariant = (status) => {
    switch (status) {
      case 'planned': return 'warning';
      case 'active': return 'success';
      case 'completed': return 'info';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <Badge variant={getVariant(status)} className="me-1">
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default CampStatusBadge;