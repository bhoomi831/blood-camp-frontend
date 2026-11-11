// src/services/reportService.js
export const reportService = {
  getDonationReport: async (filters) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            period: {
              start: '2023-01-01',
              end: '2023-06-30'
            },
            summary: {
              totalDonations: 1542,
              totalDonors: 980,
              totalUnits: 1542,
              averageDonationsPerDonor: 1.57
            },
            monthlyData: [
              { month: 'Jan', donations: 120 },
              { month: 'Feb', donations: 135 },
              { month: 'Mar', donations: 142 },
              { month: 'Apr', donations: 138 },
              { month: 'May', donations: 145 },
              { month: 'Jun', donations: 162 }
            ],
            bloodGroupDistribution: {
              'A+': 280,
              'A-': 55,
              'B+': 220,
              'B-': 45,
              'AB+': 75,
              'AB-': 20,
              'O+': 420,
              'O-': 85
            },
            donationTypeBreakdown: {
              'Whole Blood': 1200,
              'Platelets': 200,
              'Plasma': 100,
              'Double Red': 42
            },
            topDonatingCamps: [
              { name: 'City Blood Bank', donations: 420 },
              { name: 'Community Health Center', donations: 380 },
              { name: 'County Medical Center', donations: 310 }
            ]
          }
        });
      }, 500);
    });
  },

  getDonorReport: async (filters) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            period: {
              start: '2023-01-01',
              end: '2023-06-30'
            },
            summary: {
              totalDonors: 980,
              newDonors: 245,
              activeDonors: 735,
              lapsedDonors: 245
            },
            growthRate: {
              monthly: 12.5,
              quarterly: 18.2,
              yearly: 45.8
            },
            donorDemographics: {
              ageGroups: {
                '18-25': 120,
                '26-35': 250,
                '36-45': 280,
                '46-55': 180,
                '56-65': 100,
                '65+': 50
              },
              gender: {
                Male: 520,
                Female: 460
              }
            },
            donationFrequency: {
              'First-time': 245,
              '2-5 times': 420,
              '6-10 times': 200,
              '11+ times': 115
            }
          }
        });
      }, 500);
    });
  },

  getInventoryReport: async (filters) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            currentInventory: {
              'A+': 25,
              'A-': 8,
              'B+': 30,
              'B-': 5,
              'AB+': 12,
              'AB-': 2,
              'O+': 40,
              'O-': 10
            },
            unitsByExpiry: {
              '0-3 days': 15,
              '4-7 days': 35,
              '8-14 days': 60,
              '15+ days': 50
            },
            dailyUsageAverage: {
              'A+': 8,
              'A-': 2,
              'B+': 10,
              'B-': 2,
              'AB+': 3,
              'AB-': 1,
              'O+': 15,
              'O-': 4
            },
            daysOfSupply: {
              'A+': 3.1,
              'A-': 4.0,
              'B+': 3.0,
              'B-': 2.5,
              'AB+': 4.0,
              'AB-': 2.0,
              'O+': 2.7,
              'O-': 2.5
            },
            alerts: [
              { bloodGroup: 'B-', units: 5, status: 'low' },
              { bloodGroup: 'AB-', units: 2, status: 'critical' }
            ]
          }
        });
      }, 500);
    });
  },

  getCampPerformanceReport: async (filters) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            period: {
              start: '2023-01-01',
              end: '2023-06-30'
            },
            camps: [
              {
                id: 1,
                name: 'City Blood Bank',
                totalDonations: 420,
                uniqueDonors: 280,
                repeatDonationRate: 33.3,
                collectionEfficiency: 95.2,
                goalAchievement: 105.0
              },
              {
                id: 2,
                name: 'Community Health Center',
                totalDonations: 380,
                uniqueDonors: 250,
                repeatDonationRate: 34.2,
                collectionEfficiency: 92.8,
                goalAchievement: 95.0
              },
              {
                id: 3,
                name: 'County Medical Center',
                totalDonations: 310,
                uniqueDonors: 200,
                repeatDonationRate: 35.5,
                collectionEfficiency: 89.5,
                goalAchievement: 77.5
              }
            ],
            summary: {
              totalCamps: 25,
              averageDonationsPerCamp: 308,
              totalDonations: 7700,
              averageCollectionEfficiency: 92.5
            }
          }
        });
      }, 500);
    });
  },

  createCustomReport: async (reportConfig) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: 5,
            name: reportConfig.name,
            createdAt: new Date().toISOString(),
            message: 'Custom report created successfully'
          }
        });
      }, 500);
    });
  },

  getScheduledReports: async () => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            {
              id: 1,
              name: 'Monthly Donation Summary',
              frequency: 'monthly',
              nextRun: '2023-07-01T08:00:00Z',
              recipients: ['admin@blooddonation.org', 'manager@blooddonation.org'],
              isActive: true
            },
            {
              id: 2,
              name: 'Weekly Inventory Alert',
              frequency: 'weekly',
              nextRun: '2023-06-25T09:00:00Z',
              recipients: ['inventory@blooddonation.org'],
              isActive: true
            }
          ]
        });
      }, 500);
    });
  }
};