// src/services/auditService.js
export const auditService = {
  getAuditLogs: async (filters) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            {
              id: 1,
              timestamp: '2023-06-20T10:30:00Z',
              userId: 'admin001',
              userName: 'System Administrator',
              action: 'CREATE',
              entityType: 'USER',
              entityId: 'user123',
              entityName: 'Jane Smith',
              description: 'Created new user account',
              ipAddress: '192.168.1.100',
              userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            {
              id: 2,
              timestamp: '2023-06-20T09:15:00Z',
              userId: 'staff002',
              userName: 'Medical Technician',
              action: 'UPDATE',
              entityType: 'DONATION',
              entityId: 'donation456',
              entityName: 'Blood Donation #456',
              description: 'Updated donation status to COMPLETED',
              ipAddress: '192.168.1.105',
              userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            },
            {
              id: 3,
              timestamp: '2023-06-20T08:45:00Z',
              userId: 'donor003',
              userName: 'Robert Johnson',
              action: 'READ',
              entityType: 'PROFILE',
              entityId: 'donor003',
              entityName: 'Robert Johnson',
              description: 'Viewed own profile',
              ipAddress: '192.168.1.200',
              userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X)'
            }
          ],
          pagination: {
            page: 1,
            limit: 10,
            total: 157,
            totalPages: 16
          }
        });
      }, 500);
    });
  },

  getAuditLogById: async (id) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: id,
            timestamp: '2023-06-20T10:30:00Z',
            userId: 'admin001',
            userName: 'System Administrator',
            action: 'CREATE',
            entityType: 'USER',
            entityId: 'user123',
            entityName: 'Jane Smith',
            description: 'Created new user account',
            ipAddress: '192.168.1.100',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
      }, 500);
    });
  },

  getUserActivity: async (userId, filters) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            {
              id: 101,
              timestamp: '2023-06-20T08:45:00Z',
              action: 'READ',
              entityType: 'PROFILE',
              entityId: userId,
              description: 'Viewed own profile'
            },
            {
              id: 102,
              timestamp: '2023-06-19T14:20:00Z',
              action: 'UPDATE',
              entityType: 'PROFILE',
              entityId: userId,
              description: 'Updated contact information'
            },
            {
              id: 103,
              timestamp: '2023-06-18T09:10:00Z',
              action: 'CREATE',
              entityType: 'DONATION',
              entityId: 'donation789',
              description: 'Recorded blood donation'
            }
          ],
          pagination: {
            page: 1,
            limit: 10,
            total: 24,
            totalPages: 3
          }
        });
      }, 500);
    });
  },

  getSystemEvents: async (filters) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            {
              id: 201,
              timestamp: '2023-06-20T07:00:00Z',
              eventType: 'SYSTEM_BACKUP',
              description: 'Daily database backup completed successfully',
              status: 'SUCCESS',
              details: 'Backup size: 2.4 GB, Duration: 12 minutes'
            },
            {
              id: 202,
              timestamp: '2023-06-19T14:30:00Z',
              eventType: 'SECURITY_ALERT',
              description: 'Multiple failed login attempts detected',
              status: 'RESOLVED',
              details: 'IP 192.168.1.50 blocked after 5 failed attempts'
            }
          ],
          pagination: {
            page: 1,
            limit: 10,
            total: 45,
            totalPages: 5
          }
        });
      }, 500);
    });
  },

  exportAuditLogs: async (format, filters) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            fileName: `audit-log-${new Date().toISOString().slice(0,10)}.${format}`,
            downloadUrl: `/api/audit/export/${format}?token=mock-token-123`,
            message: `Audit logs exported in ${format.toUpperCase()} format`
          }
        });
      }, 500);
    });
  },

  getAuditStats: async () => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            totalEvents: 1250,
            todayEvents: 45,
            thisWeek: 280,
            thisMonth: 1120,
            byActionType: {
              CREATE: 320,
              READ: 450,
              UPDATE: 280,
              DELETE: 90,
              LOGIN: 110
            },
            byEntityType: {
              USER: 200,
              DONOR: 300,
              DONATION: 250,
              CAMP: 100,
              REQUEST: 150,
              APPOINTMENT: 150,
              INVENTORY: 100
            },
            topUsers: [
              { userId: 'admin001', username: 'systemadmin', actions: 85 },
              { userId: 'staff002', username: 'medtech', actions: 72 },
              { userId: 'staff003', username: 'frontdesk', actions: 68 }
            ]
          }
        });
      }, 500);
    });
  }
};