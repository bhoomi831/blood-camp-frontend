// src/services/campManagementService.js
const campManagementService = {
  getCamps: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock data for camps
        const mockCamps = Array.from({length: 30}, (_, i) => ({
          id: `camp-${i + 1}`,
          name: `Blood Donation Camp ${i + 1}`,
          description: `Join us for a life-saving blood donation event. Help save lives in our community.`,
          venueId: `venue-${((i % 15) + 1)}`,
          venueName: `Venue ${((i % 15) + 1)}`,
          startDate: new Date(Date.now() + Math.floor(Math.random() * 60 * 24 * 60 * 60 * 1000) - 30 * 24 * 60 * 60 * 1000).toISOString(),
          endDate: new Date(Date.now() + Math.floor(Math.random() * 60 * 24 * 60 * 60 * 1000) + Math.floor(Math.random() * 3 * 24 * 60 * 60 * 1000)).toISOString(),
          expectedDonors: Math.floor(Math.random() * 200) + 50,
          actualDonors: Math.floor(Math.random() * 200) + 50,
          status: ['planned', 'active', 'completed', 'cancelled'][Math.floor(Math.random() * 4)],
          urgencyLevel: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
          bloodTypeGoals: {
            'A+': Math.floor(Math.random() * 30),
            'A-': Math.floor(Math.random() * 10),
            'B+': Math.floor(Math.random() * 25),
            'B-': Math.floor(Math.random() * 10),
            'AB+': Math.floor(Math.random() * 15),
            'AB-': Math.floor(Math.random() * 5),
            'O+': Math.floor(Math.random() * 40),
            'O-': Math.floor(Math.random() * 20)
          },
          collectedBloodUnits: Math.floor(Math.random() * 150) + 30,
          organizer: `Organizer ${Math.floor(Math.random() * 20) + 1}`,
          contactEmail: `camp${i + 1}@blooddonation.org`,
          contactPhone: `555-${Math.floor(Math.random() * 9000 + 1000)}`,
          isActive: Math.random() > 0.2,
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)).toISOString(),
          updatedAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString()
        }));
        resolve({
          success: true,
          data: mockCamps
        });
      }, 500);
    });
  },

  getCampById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Find camp by ID in mock data
        const mockCamps = Array.from({length: 30}, (_, i) => ({
          id: `camp-${i + 1}`,
          name: `Blood Donation Camp ${i + 1}`,
          description: `Join us for a life-saving blood donation event. Help save lives in our community.`,
          venueId: `venue-${((i % 15) + 1)}`,
          venueName: `Venue ${((i % 15) + 1)}`,
          startDate: new Date(Date.now() + Math.floor(Math.random() * 60 * 24 * 60 * 60 * 1000) - 30 * 24 * 60 * 60 * 1000).toISOString(),
          endDate: new Date(Date.now() + Math.floor(Math.random() * 60 * 24 * 60 * 60 * 1000) + Math.floor(Math.random() * 3 * 24 * 60 * 60 * 1000)).toISOString(),
          expectedDonors: Math.floor(Math.random() * 200) + 50,
          actualDonors: Math.floor(Math.random() * 200) + 50,
          status: ['planned', 'active', 'completed', 'cancelled'][Math.floor(Math.random() * 4)],
          urgencyLevel: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
          bloodTypeGoals: {
            'A+': Math.floor(Math.random() * 30),
            'A-': Math.floor(Math.random() * 10),
            'B+': Math.floor(Math.random() * 25),
            'B-': Math.floor(Math.random() * 10),
            'AB+': Math.floor(Math.random() * 15),
            'AB-': Math.floor(Math.random() * 5),
            'O+': Math.floor(Math.random() * 40),
            'O-': Math.floor(Math.random() * 20)
          },
          collectedBloodUnits: Math.floor(Math.random() * 150) + 30,
          organizer: `Organizer ${Math.floor(Math.random() * 20) + 1}`,
          contactEmail: `camp${parseInt(id.split('-')[1])}@blooddonation.org`,
          contactPhone: `555-${Math.floor(Math.random() * 9000 + 1000)}`,
          isActive: Math.random() > 0.2,
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)).toISOString(),
          updatedAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString()
        }));

        const camp = mockCamps.find(c => c.id === id);
        if (camp) {
          resolve({
            success: true,
            data: camp
          });
        } else {
          resolve({
            success: false,
            error: 'Camp not found'
          });
        }
      }, 300);
    });
  },

  createCamp: async (campData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCamp = {
          id: `camp-${Date.now()}`,
          ...campData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        // In a real app, we would save to database
        resolve({
          success: true,
          data: newCamp
        });
      }, 500);
    });
  },

  updateCamp: async (id, campData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, we would update in database
        const updatedCamp = {
          id,
          ...campData,
          updatedAt: new Date().toISOString()
        };
        resolve({
          success: true,
          data: updatedCamp
        });
      }, 500);
    });
  },

  deleteCamp: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, we would delete from database
        resolve({
          success: true
        });
      }, 300);
    });
  },

  getVenues: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock data for venues
        const mockVenues = Array.from({length: 15}, (_, i) => ({
          id: `venue-${i + 1}`,
          name: [`City Community Center`, `Town Hall Annex`, `University Sports Hall`, `High School Gymnasium`, `Religious Center Hall`, `Corporate Conference Center`, `Public Library Auditorium`, `Health Clinic Waiting Area`, `Shopping Mall Community Space`, `Recreation Center Gym`, `Fire Department Community Room`, `Police Station Meeting Room`, `Post Office Lobby`, `Bank Conference Room`, `Restaurant Private Dining Area`][i],
          address: `${Math.floor(Math.random() * 1000 + 1)} Main St`,
          city: [`New York`, `Los Angeles`, `Chicago`, `Houston`, `Phoenix`, `Philadelphia`, `San Antonio`, `San Diego`, `Dallas`, `San Jose`][i % 10],
          state: [`NY`, `CA`, `IL`, `TX`, `AZ`, `PA`, `TX`, `CA`, `TX`, `CA`][i % 10],
          zipCode: `${Math.floor(Math.random() * 90000 + 10000)}`,
          capacity: Math.floor(Math.random() * 200) + 50,
          facilities: [`Parking`, `Restrooms`, `Tables`, `Chairs`, `Electricity`, `Water`][Math.floor(Math.random() * 6)],
          contactPerson: `Contact ${i + 1}`,
          contactPhone: `555-${Math.floor(Math.random() * 9000 + 1000)}`,
          isActive: Math.random() > 0.2
        }));
        resolve({
          success: true,
          data: mockVenues
        });
      }, 500);
    });
  },

  getVenueById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Find venue by ID in mock data
        const mockVenues = Array.from({length: 15}, (_, i) => ({
          id: `venue-${i + 1}`,
          name: [`City Community Center`, `Town Hall Annex`, `University Sports Hall`, `High School Gymnasium`, `Religious Center Hall`, `Corporate Conference Center`, `Public Library Auditorium`, `Health Clinic Waiting Area`, `Shopping Mall Community Space`, `Recreation Center Gym`, `Fire Department Community Room`, `Police Station Meeting Room`, `Post Office Lobby`, `Bank Conference Room`, `Restaurant Private Dining Area`][i],
          address: `${Math.floor(Math.random() * 1000 + 1)} Main St`,
          city: [`New York`, `Los Angeles`, `Chicago`, `Houston`, `Phoenix`, `Philadelphia`, `San Antonio`, `San Diego`, `Dallas`, `San Jose`][i % 10],
          state: [`NY`, `CA`, `IL`, `TX`, `AZ`, `PA`, `TX`, `CA`, `TX`, `CA`][i % 10],
          zipCode: `${Math.floor(Math.random() * 90000 + 10000)}`,
          capacity: Math.floor(Math.random() * 200) + 50,
          facilities: [`Parking`, `Restrooms`, `Tables`, `Chairs`, `Electricity`, `Water`][Math.floor(Math.random() * 6)],
          contactPerson: `Contact ${i + 1}`,
          contactPhone: `555-${Math.floor(Math.random() * 9000 + 1000)}`,
          isActive: Math.random() > 0.2
        }));

        const venue = mockVenues.find(v => v.id === id);
        if (venue) {
          resolve({
            success: true,
            data: venue
          });
        } else {
          resolve({
            success: false,
            error: 'Venue not found'
          });
        }
      }, 300);
    });
  },

  getVolunteers: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock data for volunteers
        const mockVolunteers = Array.from({length: 50}, (_, i) => ({
          id: `volunteer-${i + 1}`,
          firstName: [`James`, `Mary`, `John`, `Patricia`, `Robert`, `Jennifer`, `Michael`, `Linda`, `William`, `Elizabeth`, `David`, `Barbara`, `Richard`, `Susan`, `Joseph`, `Jessica`, `Thomas`, `Sarah`, `Charles`, `Karen`][i % 20],
          lastName: [`Smith`, `Johnson`, `Williams`, `Brown`, `Jones`, `Garcia`, `Miller`, `Davis`, `Rodriguez`, `Martinez`, `Hernandez`, `Lopez`, `Gonzalez`, `Wilson`, `Anderson`, `Thomas`, `Taylor`, `Moore`, `Jackson`, `Martin`][i % 20],
          email: `volunteer${i + 1}@example.com`,
          phone: `555-${Math.floor(Math.random() * 9000 + 1000)}`,
          role: [`Volunteer Coordinator`, `Registration Assistant`, `Donor Care Specialist`, `Refreshment Attendant`, `Setup Crew`, `Cleanup Crew`, `Information Desk`, `Mobile Unit Assistant`, `Blood Type Screener`, `Post-Donation Monitor`][i % 10],
          bloodGroup: [`A+`, `A-`, `B+`, `B-`, `AB+`, `AB-`, `O+`, `O-`][i % 8],
          joinedDate: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
          city: [`New York`, `Los Angeles`, `Chicago`, `Houston`, `Phoenix`, `Philadelphia`, `San Antonio`, `San Diego`, `Dallas`, `San Jose`][i % 10],
          state: [`NY`, `CA`, `IL`, `TX`, `AZ`, `PA`, `TX`, `CA`, `TX`, `CA`][i % 10],
          isActive: Math.random() > 0.1,
          totalHours: Math.floor(Math.random() * 200),
          lastDonation: Math.random() > 0.3 ? new Date(Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0] : null
        }));
        resolve({
          success: true,
          data: mockVolunteers
        });
      }, 500);
    });
  },

  getVolunteerById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id,
            firstName: `VolunteerFirstName${id.split('-')[1]}`,
            lastName: `VolunteerLastName${id.split('-')[1]}`,
            email: `volunteer${id.split('-')[1]}@example.com`,
            phone: `555-${Math.floor(Math.random() * 9000 + 1000)}`,
            role: ['Volunteer Coordinator', 'Registration Assistant', 'Donor Care Specialist'][Math.floor(Math.random() * 3)],
            bloodGroup: ['A+', 'B+', 'O+'][Math.floor(Math.random() * 3)],
            joinedDate: '2023-01-15',
            city: 'New York',
            state: 'NY',
            isActive: true,
            totalHours: 25,
            lastDonation: '2023-06-01'
          }
        });
      }, 300);
    });
  },

  assignVolunteerToCamp: async (campId, volunteerId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, this would update a join table
        resolve({
          success: true,
          message: 'Volunteer assigned to camp successfully'
        });
      }, 300);
    });
  },

  getCampVolunteers: async (campId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return a random subset of volunteers assigned to this camp
        const assignedCount = Math.floor(Math.random() * 20) + 5;
        const assignedVolunteers = Array.from({length: assignedCount}, (_, i) => ({
          id: `volunteer-${Math.floor(Math.random() * 50) + 1}`,
          firstName: [`James`, `Mary`, `John`, `Patricia`, `Robert`][i % 5],
          lastName: [`Smith`, `Johnson`, `Williams`, `Brown`, `Jones`][i % 5],
          role: [`Volunteer Coordinator`, `Registration Assistant`, `Donor Care Specialist`][i % 3],
          bloodGroup: [`A+`, `B+`, `O+`][i % 3]
        }));
        resolve({
          success: true,
          data: assignedVolunteers
        });
      }, 300);
    });
  },

  getUpcomingCamps: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockCamps = Array.from({length: 10}, (_, i) => ({
          id: `upcoming-camp-${i + 1}`,
          name: `Upcoming Blood Donation Camp ${i + 1}`,
          description: `Join us for an upcoming life-saving blood donation event.`,
          venueId: `venue-${((i % 5) + 1)}`,
          venueName: `Venue ${((i % 5) + 1)}`,
          startDate: new Date(Date.now() + Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
          endDate: new Date(Date.now() + Math.floor(Math.random() * 60 * 24 * 60 * 60 * 1000)).toISOString(),
          expectedDonors: Math.floor(Math.random() * 150) + 50,
          status: 'planned',
          urgencyLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)]
        }));
        resolve({
          success: true,
          data: mockCamps
        });
      }, 300);
    });
  },

  getActiveCamps: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockCamps = Array.from({length: 5}, (_, i) => ({
          id: `active-camp-${i + 1}`,
          name: `Active Blood Donation Camp ${i + 1}`,
          description: `Currently active blood donation event.`,
          venueId: `venue-${((i % 3) + 1)}`,
          venueName: `Venue ${((i % 3) + 1)}`,
          startDate: new Date(Date.now() - Math.floor(Math.random() * 5 * 24 * 60 * 60 * 1000)).toISOString(),
          endDate: new Date(Date.now() + Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000)).toISOString(),
          expectedDonors: Math.floor(Math.random() * 200) + 50,
          actualDonors: Math.floor(Math.random() * 180) + 30,
          status: 'active',
          urgencyLevel: ['medium', 'high'][Math.floor(Math.random() * 2)]
        }));
        resolve({
          success: true,
          data: mockCamps
        });
      }, 300);
    });
  },

  getPastCamps: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockCamps = Array.from({length: 8}, (_, i) => ({
          id: `past-camp-${i + 1}`,
          name: `Past Blood Donation Camp ${i + 1}`,
          description: `Completed blood donation event.`,
          venueId: `venue-${((i % 4) + 1)}`,
          venueName: `Venue ${((i % 4) + 1)}`,
          startDate: new Date(Date.now() - Math.floor(Math.random() * 60 * 24 * 60 * 60 * 1000) - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
          endDate: new Date(Date.now() - Math.floor(Math.random() * 60 * 24 * 60 * 60 * 1000) - Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000)).toISOString(),
          expectedDonors: Math.floor(Math.random() * 200) + 50,
          actualDonors: Math.floor(Math.random() * 200) + 50,
          collectedBloodUnits: Math.floor(Math.random() * 150) + 30,
          status: 'completed'
        }));
        resolve({
          success: true,
          data: mockCamps
        });
      }, 300);
    });
  }
};

export default campManagementService;