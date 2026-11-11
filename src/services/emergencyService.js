const emergencyService = {
  getAllRequests: async (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { id: 'req-1', hospitalName: 'City General Hospital', patientName: 'Sarah Williams', bloodGroupNeeded: 'O+', unitsRequired: 3, urgencyLevel: 'Critical', dateNeededBy: '2023-06-25', datePosted: '2023-06-20T08:00:00Z', address: '150 Broadway', city: 'New York', state: 'NY', zipCode: '10013', contactPerson: 'Dr. James Brown', contactPhone: '555-1111', contactEmail: 'jbrown@citygeneral.org', status: 'Active', postedBy: 'Dr. James Brown', notes: 'Patient in critical condition after car accident', hospitalPhone: '555-0001', hospitalEmail: 'info@citygeneral.org', preferredContactTime: '9am-5pm' },
            { id: 'req-2', hospitalName: 'St. Mary Medical Center', patientName: 'Michael Chen', bloodGroupNeeded: 'A-', unitsRequired: 2, urgencyLevel: 'High', dateNeededBy: '2023-06-28', datePosted: '2023-06-19T10:30:00Z', address: '200 Health Blvd', city: 'Los Angeles', state: 'CA', zipCode: '90001', contactPerson: 'Nurse Amy Lee', contactPhone: '555-2222', contactEmail: 'alee@stmary.org', status: 'Searching', postedBy: 'Nurse Amy Lee', notes: 'Scheduled surgery requiring A- blood', hospitalPhone: '555-0002', hospitalEmail: 'info@stmary.org', preferredContactTime: 'Anytime' }
          ],
          pagination: { page: 1, limit: 10, total: 2, totalPages: 1 }
        });
      }, 500);
    });
  },
  getRequestById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: { id: id, hospitalName: 'City General Hospital', patientName: 'Sarah Williams', bloodGroupNeeded: 'O+', unitsRequired: 3, urgencyLevel: 'Critical', dateNeededBy: '2023-06-25T00:00:00Z', datePosted: '2023-06-20T08:00:00Z', address: '150 Broadway', city: 'New York', state: 'NY', zipCode: '10013', contactPerson: 'Dr. James Brown', contactPhone: '555-1111', contactEmail: 'jbrown@citygeneral.org', hospitalPhone: '555-0001', hospitalEmail: 'info@citygeneral.org', preferredContactTime: '9am-5pm', emergencyContact: 'Not provided', status: 'Active', postedBy: 'Dr. James Brown', notes: 'Patient in critical condition after car accident', matchingDonors: 12, nearbyCamps: 3, assignedVolunteers: 2 }
        });
      }, 500);
    });
  },
  createRequest: async (requestData) => {
    return new Promise((resolve) => {
      setTimeout(() => { resolve({ success: true, data: { id: 'req-new', message: 'Request created successfully' } }); }, 500);
    });
  },
  updateRequest: async (id, requestData) => {
    return new Promise((resolve) => {
      setTimeout(() => { resolve({ success: true, data: { message: 'Request updated successfully' } }); }, 500);
    });
  },
  deleteRequest: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => { resolve({ success: true, data: { message: 'Request deleted successfully' } }); }, 500);
    });
  }
};
export default emergencyService;
