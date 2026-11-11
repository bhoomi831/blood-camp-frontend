// src/services/authService.js
export const authService = {
  login: async (credentials) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate successful login
        resolve({
          success: true,
          data: {
            token: 'mock-jwt-token',
            user: {
              id: 1,
              name: 'John Doe',
              email: 'john@example.com',
              role: 'admin'
            }
          }
        });
      }, 500);
    });
  },

  register: async (userData) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            message: 'Registration successful'
          }
        });
      }, 500);
    });
  },

  logout: async () => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true
        });
      }, 500);
    });
  },

  getCurrentUser: async () => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            role: 'admin'
          }
        });
      }, 500);
    });
  },

  updateProfile: async (userData) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            message: 'Profile updated successfully'
          }
        });
      }, 500);
    });
  },

  changePassword: async (passwordData) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            message: 'Password changed successfully'
          }
        });
      }, 500);
    });
  }
};