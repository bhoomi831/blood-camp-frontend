// src/components/ui/dashboard/BloodInventoryCard.jsx
import React, { useEffect, useState } from 'react';
import emergencyService from '../../../services/emergencyService';
import './BloodInventoryCard.css';

const BloodInventoryCard = () => {
  const [inventory, setInventory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        // In a real app, this would come from a blood inventory service
        // For now, we'll simulate based on hospital capacities from emergency service
        const response = await emergencyService.getHospitals();
        if (response.success) {
          const hospitals = response.data;

          // Calculate total blood inventory from all hospitals
          const bloodGroups = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
          const totalInventory = {};
          const totalCapacity = {};

          bloodGroups.forEach(bg => {
            totalInventory[bg] = 0;
            totalCapacity[bg] = 0;
          });

          hospitals.forEach(hospital => {
            if (hospital.bloodBankCapacity) {
              Object.keys(hospital.bloodBankCapacity).forEach(bg => {
                if (bloodGroups.includes(bg)) {
                  totalInventory[bg] += hospital.bloodBankCapacity[bg];
                  totalCapacity[bg] += hospital.bloodBankCapacity[bg] * 1.5; // Assume 1.5x current as capacity
                }
              });
            }
          });

          setInventory({
            bloodGroups: bloodGroups.map(bg => ({
              bloodGroup: bg,
              units: totalInventory[bg] || 0,
              capacity: totalCapacity[bg] || 0,
              percentage: totalCapacity[bg] > 0 ? Math.min(100, Math.round((totalInventory[bg] / totalCapacity[bg]) * 100)) : 0
            })),
            totalUnits: Object.values(totalInventory).reduce((sum, val) => sum + val, 0),
            totalCapacity: Object.values(totalCapacity).reduce((sum, val) => sum + val, 0)
          });
        } else {
          setError('Failed to load blood inventory data');
        }
      } catch (err) {
        setError('An error occurred while fetching blood inventory');
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  if (loading) {
    return (
      <div className="blood-inventory-card">
        <div className="d-flex justify-content-between mb-3">
          <h3 className="h5 mb-0">Blood Inventory Levels</h3>
          <small className="text-muted">Updated just now</small>
        </div>
        <div className="inventory-item skeleton mb-2">
          <div className="blood-type skeleton-text-line" style={{ width: '40px' }}></div>
          <div className="units skeleton-text-line" style={{ width: '60px' }}></div>
          <div className="progress skeleton" style={{ width: '100%', height: '8px' }}></div>
        </div>
        <div className="inventory-item skeleton mb-2">
          <div className="blood-type skeleton-text-line" style={{ width: '40px' }}></div>
          <div className="units skeleton-text-line" style={{ width: '60px' }}></div>
          <div className="progress skeleton" style={{ width: '100%', height: '8px' }}></div>
        </div>
        <div className="inventory-item skeleton mb-2">
          <div className="blood-type skeleton-text-line" style={{ width: '40px' }}></div>
          <div className="units skeleton-text-line" style={{ width: '60px' }}></div>
          <div className="progress skeleton" style={{ width: '100%', height: '8px' }}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blood-inventory-card">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="blood-inventory-card">
      <div className="d-flex justify-content-between mb-3">
        <h3 className="h5 mb-0">Blood Inventory Levels</h3>
        {inventory && (
          <small className="text-muted">
            Total Units: {inventory.totalUnits.toLocaleString()}
          </small>
        )}
      </div>
      <div className="inventory-list">
        {inventory && inventory.bloodGroups.map((item, index) => (
          <div key={index} className="inventory-item mb-2">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="blood-type">{item.bloodGroup}</span>
              <span className="units">{item.units}</span>
            </div>
            <div className="progress">
              <div className={`progress-bar bg-${getBloodGroupColor(item.bloodGroup)}`}
                      style={{ width: `${item.percentage}%` }}></div>
            </div>
            <small className="text-muted d-block">
              {item.percentage}% of capacity ({item.units}/{item.capacity} units)
            </small>
          </div>
        ))}
      </div>
      {inventory && (
        <div className="card-footer text-center">
          <button className="btn btn-outline-primary btn-sm">
            View Detailed Report
          </button>
        </div>
      )}
    </div>
  );
};

// Helper function to get appropriate background color for blood groups
const getBloodGroupColor = (bloodGroup) => {
  const colors = {
    'O+': 'danger',
    'O-': 'dark',
    'A+': 'warning',
    'A-': 'info',
    'B+': 'success',
    'B-': 'info',
    'AB+': 'secondary',
    'AB-': 'dark'
  };
  return colors[bloodGroup] || 'secondary';
};

export default BloodInventoryCard;