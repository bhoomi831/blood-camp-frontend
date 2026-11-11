// src/services/hospitalService.js
const hospitalService = {
  getHospitals: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { id: 'hosp-001', name: 'City General Hospital', address: '150 Broadway', city: 'New York', state: 'NY', zipCode: '10013', phone: '555-0001', email: 'info@citygeneral.org', contactPerson: 'Dr. James Brown', type: 'General', bedCount: 450, isActive: true, bloodBank: true, emergencyDept: true, totalRequests: 45, pendingRequests: 3 },
            { id: 'hosp-002', name: 'St. Mary Medical Center', address: '200 Health Blvd', city: 'Los Angeles', state: 'CA', zipCode: '90001', phone: '555-0002', email: 'info@stmary.org', contactPerson: 'Nurse Amy Lee', type: 'Specialty', bedCount: 320, isActive: true, bloodBank: true, emergencyDept: true, totalRequests: 32, pendingRequests: 1 },
            { id: 'hosp-003', name: 'Children Care Hospital', address: '50 Kids Way', city: 'Chicago', state: 'IL', zipCode: '60601', phone: '555-0003', email: 'info@childrencare.org', contactPerson: 'Dr. Lisa Park', type: 'Pediatric', bedCount: 180, isActive: true, bloodBank: false, emergencyDept: true, totalRequests: 18, pendingRequests: 2 },
            { id: 'hosp-004', name: 'Memorial Cancer Center', address: '75 Hope Ave', city: 'Houston', state: 'TX', zipCode: '77001', phone: '555-0004', email: 'info@memorialcancer.org', contactPerson: 'Dr. Raj Patel', type: 'Oncology', bedCount: 150, isActive: true, bloodBank: true, emergencyDept: false, totalRequests: 28, pendingRequests: 0 },
            { id: 'hosp-005', name: 'County Emergency Hospital', address: '500 Urgent Blvd', city: 'Phoenix', state: 'AZ', zipCode: '85001', phone: '555-0005', email: 'info@countyemergency.org', contactPerson: 'Dr. Maria Torres', type: 'Emergency', bedCount: 40, isActive: true, bloodBank: false, emergencyDept: true, totalRequests: 60, pendingRequests: 5 },
            { id: 'hosp-006', name: 'Veterans Medical Center', address: '800 Patriot Rd', city: 'San Diego', state: 'CA', zipCode: '92101', phone: '555-0006', email: 'info@vamedical.org', contactPerson: 'Dr. John Kemp', type: 'Government', bedCount: 200, isActive: true, bloodBank: true, emergencyDept: true, totalRequests: 22, pendingRequests: 1 },
          ],
          pagination: { page: 1, limit: 10, total: 15, totalPages: 2 }
        });
      }, 500);
    });
  },

  getHospitalById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id, name: 'City General Hospital', address: '123 Broadway', city: 'New York', state: 'NY', zipCode: '10013',
            phone: '555-0001', email: 'info@citygeneral.org', contactPerson: 'Dr. James Brown', contactPhone: '555-1111',
            contactEmail: 'jbrown@citygeneral.org', type: 'General', bedCount: 24, isActive: true, bloodBank: true, emergencyDept: true,
            totalRequests: 45, fulfilledRequests: 42, pendingRequests: 3,
            bloodUsageStats: [
              { group: 'O+', requested: 18, fulfilled: 17 },
              { group: 'A+', requested: 12, fulfilled: 11 },
              { group: 'B+', requested: 10, fulfilled: 9 },
              { group: 'AB+', requested: 3, fulfilled: 3 },
              { group: 'O-', requested: 2, fulfilled: 2 },
            ],
            recentActivity: [
              { date: '2023-06-25T10:00:00Z', action: 'Blood request fulfilled', detail: '3 units O+ dispatched' },
              { date: '2023-06-24T14:30:00Z', action: 'Emergency request created', detail: '2 units B- needed' },
              { date: '2023-06-23T09:00:00Z', action: 'Inventory updated', detail: 'Received 5 units A+' }
            ]
          }
        });
      }, 300);
    });
  },

  createHospital: async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => { resolve({ success: true, data: { id: 'hosp-' + Date.now(), message: 'Hospital registered' } }); }, 500);
    });
  },

  updateHospital: async (id, data) => {
    return new Promise((resolve) => {
      setTimeout(() => { resolve({ success: true, data: { message: 'Hospital updated' } }); }, 500);
    });
  },

  deleteHospital: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => { resolve({ success: true, data: { message: 'Hospital removed' } }); }, 500);
    });
  }
};

export default hospitalService;