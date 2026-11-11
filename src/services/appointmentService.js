// src/services/appointmentService.js
const appointmentService = {
  getAppointments: async (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { id: 'appt-001', donorName: 'Jane Smith', donorId: 'donor-1', campName: 'City Blood Bank Camp', campId: 'camp-1', appointmentDate: '2026-07-25', timeSlot: '10:00 AM', bloodGroup: 'O+', status: 'Confirmed', type: 'Whole Blood', notes: 'Regular donation', phone: '555-1234', email: 'jane.smith@example.com' },
            { id: 'appt-002', donorName: 'Robert Johnson', donorId: 'donor-2', campName: 'University Blood Drive', campId: 'camp-5', appointmentDate: '2026-07-26', timeSlot: '11:30 AM', bloodGroup: 'A+', status: 'Pending', type: 'Platelets', notes: 'Platelet donation requested', phone: '555-9012', email: 'robert.johnson@example.com' },
            { id: 'appt-003', donorName: 'Emily Davis', donorId: 'donor-3', campName: 'Community Health Center', campId: 'camp-2', appointmentDate: '2026-07-24', timeSlot: '2:00 PM', bloodGroup: 'B-', status: 'Confirmed', type: 'Whole Blood', notes: '', phone: '555-7890', email: 'emily.davis@example.com' },
            { id: 'appt-004', donorName: 'Michael Brown', donorId: 'donor-4', campName: 'High School Drive', campId: 'camp-9', appointmentDate: '2026-07-28', timeSlot: '9:00 AM', bloodGroup: 'O-', status: 'Cancelled', type: 'Whole Blood', notes: 'Rescheduled: donor unwell', phone: '555-4321', email: 'michael.brown@example.com' },
            { id: 'appt-005', donorName: 'Sarah Connor', donorId: 'donor-5', campName: 'City Blood Bank Camp', campId: 'camp-1', appointmentDate: '2026-07-25', timeSlot: '3:30 PM', bloodGroup: 'AB+', status: 'Confirmed', type: 'Plasma', notes: 'Plasma donation', phone: '555-5678', email: 'sarah.connor@example.com' },
            { id: 'appt-006', donorName: 'David Kim', donorId: 'donor-6', campName: 'Religious Center Drive', campId: 'camp-10', appointmentDate: '2026-07-27', timeSlot: '12:00 PM', bloodGroup: 'B+', status: 'Confirmed', type: 'Whole Blood', notes: '', phone: '555-2468', email: 'david.kim@example.com' },
          ],
          pagination: { page: 1, limit: 10, total: 35, totalPages: 4 }
        });
      }, 500);
    });
  },

  getAppointmentById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id, donorName: 'Jane Smith', donorId: 'donor-1', campName: 'City Blood Bank Camp', campId: 'camp-1',
            appointmentDate: '2026-07-25', timeSlot: '10:00 AM', bloodGroup: 'O+', status: 'Confirmed',
            type: 'Whole Blood', notes: 'Regular donor', phone: '555-1234', email: 'jane.smith@example.com',
            createdDate: '2026-07-20', confirmedDate: '2026-07-21', lastDonation: '2026-04-25', eligibility: 'Eligible'
          }
        });
      }, 300);
    });
  },

  createAppointment: async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => { resolve({ success: true, data: { id: 'appt-' + Date.now(), message: 'Appointment created' } }); }, 500);
    });
  },

  updateAppointment: async (id, data) => {
    return new Promise((resolve) => {
      setTimeout(() => { resolve({ success: true, data: { message: 'Appointment updated' } }); }, 500);
    });
  },

  cancelAppointment: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => { resolve({ success: true, data: { message: 'Appointment cancelled' } }); }, 500);
    });
  },

  getAppointmentStats: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            todayAppointments: 12,
            upcomingAppointments: 45,
            completedToday: 8,
            cancellationRate: '5.2%',
            busySlots: ['10:00 AM', '11:30 AM', '2:00 PM'],
            availableSlots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '4:00 PM'],
            byType: { 'Whole Blood': 25, 'Platelets': 5, 'Plasma': 3, 'Double Red': 2 }
          }
        });
      }, 500);
    });
  }
};

export default appointmentService;