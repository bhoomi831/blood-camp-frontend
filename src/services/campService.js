// src/services/campService.js
export const campService = {
  getAllCamps: async (filters) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            {
              id: 1,
              name: 'City Blood Bank',
              address: '123 Main St, Downtown',
              city: 'New York',
              state: 'NY',
              zipCode: '10001',
              contactNumber: '555-1234',
              email: 'info@citybloodbank.org',
              latitude: 40.7128,
              longitude: -74.0060,
              isActive: true,
              createdAt: '2023-01-15T08:00:00Z',
              updatedAt: '2023-01-15T08:00:00Z'
            },
            {
              id: 2,
              name: 'Community Health Center',
              address: '456 Oak Ave, Uptown',
              city: 'Los Angeles',
              state: 'CA',
              zipCode: '90210',
              contactNumber: '555-5678',
              email: 'info@communityhealth.org',
              latitude: 34.0522,
              longitude: -118.2437,
              isActive: true,
              createdAt: '2023-02-20T09:30:00Z',
              updatedAt: '2023-02-20T09:30:00Z'
            }
          ],
          pagination: {
            page: 1,
            limit: 10,
            total: 2,
            totalPages: 1
          }
        });
      }, 500);
    });
  },

  getCampById: async (id) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: id,
            name: 'City Blood Bank',
            address: '123 Main St, Downtown',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            contactNumber: '555-1234',
            email: 'info@citybloodbank.org',
            latitude: 40.7128,
            longitude: -74.0060,
            isActive: true,
            createdAt: '2023-01-15T08:00:00Z',
            updatedAt: '2023-01-15T08:00:00Z'
          }
        });
      }, 500);
    });
  },

  createCamp: async (campData) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: 3,
            message: 'Camp created successfully'
          }
        });
      }, 500);
    });
  },

  updateCamp: async (id, campData) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            message: 'Camp updated successfully'
          }
        });
      }, 500);
    });
  },

  deleteCamp: async (id) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            message: 'Camp deleted successfully'
          }
        });
      }, 500);
    });
  },

  getCampStats: async () => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            totalCamps: 25,
            activeCamps: 22,
            inactiveCamps: 3,
            totalDonationsThisMonth: 1250,
            totalDonorsThisMonth: 890
          }
        });
      }, 500);
    });
  }
};