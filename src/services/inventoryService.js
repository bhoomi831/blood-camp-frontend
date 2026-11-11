// src/services/inventoryService.js
const inventoryService = {
  getInventory: async (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { id: 'unit-001', bloodGroup: 'A+', units: 25, donationDate: '2023-06-15', expiryDate: '2023-07-15', source: 'City Blood Bank Camp', status: 'Available', storageLocation: 'Fridge A - Shelf 2', temperature: '4°C', hbLevel: 14.2, testedFor: ['HIV', 'Hepatitis B', 'Hepatitis C', 'Syphilis'], allClear: true },
            { id: 'unit-002', bloodGroup: 'A-', units: 8, donationDate: '2023-06-10', expiryDate: '2023-07-10', source: 'Community Health Center', status: 'Available', storageLocation: 'Fridge A - Shelf 3', temperature: '4°C', hbLevel: 13.8, testedFor: ['HIV', 'Hepatitis B', 'Hepatitis C', 'Syphilis'], allClear: true },
            { id: 'unit-003', bloodGroup: 'B+', units: 30, donationDate: '2023-06-18', expiryDate: '2023-07-18', source: 'City Blood Bank Camp', status: 'Available', storageLocation: 'Fridge B - Shelf 1', temperature: '3.5°C', hbLevel: 14.5, testedFor: ['HIV', 'Hepatitis B', 'Hepatitis C', 'Syphilis'], allClear: true },
            { id: 'unit-004', bloodGroup: 'B-', units: 5, donationDate: '2023-06-05', expiryDate: '2023-07-05', source: 'County Medical Center', status: 'Low Stock', storageLocation: 'Fridge B - Shelf 3', temperature: '4°C', hbLevel: 13.5, testedFor: ['HIV', 'Hepatitis B', 'Hepatitis C', 'Syphilis'], allClear: true },
            { id: 'unit-005', bloodGroup: 'AB+', units: 12, donationDate: '2023-06-20', expiryDate: '2023-07-20', source: 'University Blood Drive', status: 'Available', storageLocation: 'Fridge C - Shelf 1', temperature: '3.8°C', hbLevel: 14.0, testedFor: ['HIV', 'Hepatitis B', 'Hepatitis C', 'Syphilis'], allClear: true },
            { id: 'unit-006', bloodGroup: 'AB-', units: 2, donationDate: '2023-05-28', expiryDate: '2023-06-28', source: 'City Blood Bank Camp', status: 'Critical', storageLocation: 'Fridge C - Shelf 2', temperature: '4.2°C', hbLevel: 13.9, testedFor: ['HIV', 'Hepatitis B', 'Hepatitis C', 'Syphilis'], allClear: true },
            { id: 'unit-007', bloodGroup: 'O+', units: 40, donationDate: '2023-06-22', expiryDate: '2023-07-22', source: 'Community Health Center', status: 'Available', storageLocation: 'Fridge D - Shelf 1', temperature: '3.9°C', hbLevel: 14.6, testedFor: ['HIV', 'Hepatitis B', 'Hepatitis C', 'Syphilis'], allClear: true },
            { id: 'unit-008', bloodGroup: 'O-', units: 10, donationDate: '2023-06-08', expiryDate: '2023-07-08', source: 'City Blood Bank Camp', status: 'Low Stock', storageLocation: 'Fridge D - Shelf 2', temperature: '4°C', hbLevel: 14.1, testedFor: ['HIV', 'Hepatitis B', 'Hepatitis C', 'Syphilis'], allClear: true },
            { id: 'unit-009', bloodGroup: 'A+', units: 15, donationDate: '2023-06-25', expiryDate: '2023-07-25', source: 'High School Blood Drive', status: 'Available', storageLocation: 'Fridge A - Shelf 1', temperature: '4.1°C', hbLevel: 13.7, testedFor: ['HIV', 'Hepatitis B', 'Hepatitis C', 'Syphilis'], allClear: true },
            { id: 'unit-010', bloodGroup: 'O+', units: 20, donationDate: '2023-06-12', expiryDate: '2023-07-12', source: 'Religious Center Drive', status: 'Available', storageLocation: 'Fridge D - Shelf 3', temperature: '3.9°C', hbLevel: 14.3, testedFor: ['HIV', 'Hepatitis B', 'Hepatitis C', 'Syphilis'], allClear: true },
          ],
          pagination: { page: 1, limit: 10, total: 45, totalPages: 5 }
        });
      }, 500);
    });
  },

  getInventoryById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id, bloodGroup: 'O+', units: 40, donationDate: '2023-06-22', expiryDate: '2023-07-22',
            donorName: 'Jane Smith', donorId: 'donor-1', source: 'City Blood Bank Camp',
            status: 'Available', storageLocation: 'Fridge D - Shelf 1', temperature: '3.9°C',
            hbLevel: 14.6, plateletCount: '250K', wbcCount: '5.5K',
            testedFor: ['HIV', 'Hepatitis B', 'Hepatitis C', 'Syphilis', 'Malaria', 'West Nile Virus'],
            allClear: true, processedBy: 'Med Tech Thompson', processedDate: '2023-06-22T14:30:00Z',
            transfusionHistory: [
              { date: '2023-06-25', hospital: 'City General Hospital', unitsIssued: 2, patient: 'Sarah Williams', reason: 'Emergency Surgery' },
              { date: '2023-06-28', hospital: 'St. Mary Medical Center', unitsIssued: 1, patient: 'Michael Chen', reason: 'Scheduled Surgery' }
            ]
          }
        });
      }, 500);
    });
  },

  addBloodUnit: async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => { resolve({ success: true, data: { id: 'unit-' + Date.now(), message: 'Blood unit added successfully' } }); }, 500);
    });
  },

  updateBloodUnit: async (id, data) => {
    return new Promise((resolve) => {
      setTimeout(() => { resolve({ success: true, data: { message: 'Blood unit updated successfully' } }); }, 500);
    });
  },

  deleteBloodUnit: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => { resolve({ success: true, data: { message: 'Blood unit removed successfully' } }); }, 500);
    });
  },

  getExpiringUnits: async (days = 7) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { id: 'unit-004', bloodGroup: 'B-', units: 5, expiryDate: '2023-07-05', daysLeft: 2 },
            { id: 'unit-006', bloodGroup: 'AB-', units: 2, expiryDate: '2023-06-28', daysLeft: 0 },
            { id: 'unit-008', bloodGroup: 'O-', units: 10, expiryDate: '2023-07-08', daysLeft: 5 },
          ]
        });
      }, 500);
    });
  },

  getInventoryStats: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            totalUnits: 167,
            availableUnits: 142,
            reservedUnits: 12,
            expiredUnits: 3,
            expiringUnits: 10,
            criticalBloodGroups: [
              { group: 'B-', units: 5, status: 'low' },
              { group: 'AB-', units: 2, status: 'critical' }
            ],
            storageByFridge: {
              'Fridge A': { capacity: 50, used: 33 },
              'Fridge B': { capacity: 50, used: 35 },
              'Fridge C': { capacity: 50, used: 14 },
              'Fridge D': { capacity: 50, used: 50 }
            },
            temperatureAlerts: 0
          }
        });
      }, 500);
    });
  },

  getBloodRequests: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { id: 'br-001', hospitalName: 'City General Hospital', bloodGroup: 'O+', units: 5, urgency: 'critical', status: 'Pending', requestedBy: 'Dr. Sharma', requestedDate: '2023-06-25', requiredDate: '2023-06-26' },
            { id: 'br-002', hospitalName: 'Memorial Hospital', bloodGroup: 'A-', units: 3, urgency: 'high', status: 'Processing', requestedBy: 'Dr. Patel', requestedDate: '2023-06-24', requiredDate: '2023-06-27' },
            { id: 'br-003', hospitalName: 'Children Care', bloodGroup: 'B+', units: 4, urgency: 'normal', status: 'Approved', requestedBy: 'Dr. Lee', requestedDate: '2023-06-23', requiredDate: '2023-06-29' },
          ]
        });
      }, 500);
    });
  },

  fulfillBloodRequest: async (requestId, unitIds) => {
    return new Promise((resolve) => {
      setTimeout(() => { resolve({ success: true, data: { message: 'Blood request fulfilled' } }); }, 500);
    });
  }
};

export default inventoryService;