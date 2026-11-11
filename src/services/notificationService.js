// src/services/notificationService.js
export const notificationService = {
  getAllNotifications: async (userId, filters) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            {
              id: 1,
              userId: userId,
              title: 'Donation Reminder',
              message: 'You are eligible to donate blood again in 2 days!',
              type: 'reminder',
              isRead: false,
              createdAt: '2023-06-20T09:00:00Z'
            },
            {
              id: 2,
              userId: userId,
              title: 'Thank You for Your Donation',
              message: 'Your O+ donation has been sent to City General Hospital.',
              type: 'thankyou',
              isRead: true,
              createdAt: '2023-06-18T14:30:00Z'
            },
            {
              id: 3,
              userId: userId,
              title: 'Blood Request Match',
              message: 'Your B+ blood type matches an urgent request at St. Mary Medical Center.',
              type: 'match',
              isRead: false,
              createdAt: '2023-06-20T11:15:00Z'
            }
          ],
          pagination: {
            page: 1,
            limit: 10,
            total: 3,
            totalPages: 1
          }
        });
      }, 500);
    });
  },

  getNotificationById: async (id) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: id,
            userId: 'user123',
            title: 'Donation Reminder',
            message: 'You are eligible to donate blood again in 2 days!',
            type: 'reminder',
            isRead: false,
            createdAt: '2023-06-20T09:00:00Z'
          }
        });
      }, 500);
    });
  },

  markAsRead: async (id) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            message: 'Notification marked as read'
          }
        });
      }, 500);
    });
  },

  markAllAsRead: async (userId) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            message: 'All notifications marked as read'
          }
        });
      }, 500);
    });
  },

  deleteNotification: async (id) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            message: 'Notification deleted successfully'
          }
        });
      }, 500);
    });
  },

  createNotification: async (notificationData) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: 4,
            message: 'Notification created successfully'
          }
        });
      }, 500);
    });
  },

  getUnreadCount: async (userId) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            count: 2
          }
        });
      }, 500);
    });
  },

  getNotificationStats: async (userId) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            total: 25,
            unread: 5,
            lastMonth: 18,
            thisMonth: 7,
            byType: {
              reminder: 8,
              thankyou: 12,
              match: 3,
              update: 2
            }
          }
        });
      }, 500);
    });
  }
};