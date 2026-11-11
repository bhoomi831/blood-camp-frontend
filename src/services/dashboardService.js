// src/services/dashboardService.js
export const dashboardService = {
  getDashboardStats: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            totalDonors: 1250,
            activeDonors: 890,
            totalCamps: 25,
            activeCamps: 15,
            totalDonations: 5420,
            donationsThisMonth: 420,
            bloodUnitsAvailable: 160,
            eligibleDonors: 735,
          }
        });
      }, 500);
    });
  },

  getBloodGroupDistribution: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            'A+': 280, 'A-': 55, 'B+': 220, 'B-': 45,
            'AB+': 75, 'AB-': 20, 'O+': 420, 'O-': 85
          }
        });
      }, 500);
    });
  },

  getDonationTrends: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { month: 'Jan', donations: 120 },
            { month: 'Feb', donations: 135 },
            { month: 'Mar', donations: 142 },
            { month: 'Apr', donations: 138 },
            { month: 'May', donations: 145 },
            { month: 'Jun', donations: 162 }
          ]
        });
      }, 500);
    });
  },

  getNotifications: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { id: 1, title: 'Donation Reminder', message: 'You are eligible to donate blood again in 2 days!', type: 'reminder', isRead: false, createdAt: '2023-06-20T09:00:00Z' },
            { id: 2, title: 'Thank You', message: 'Your O+ donation has been sent to City General Hospital.', type: 'thankyou', isRead: true, createdAt: '2023-06-18T14:30:00Z' },
          ]
        });
      }, 500);
    });
  }
};
