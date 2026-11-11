const donorService = {
  getDonors: async (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { id: 'donor-1', firstName: 'Jane', lastName: 'Smith', dateOfBirth: '1990-05-15', age: 33, gender: 'Female', bloodGroup: 'O+', weight: 68, height: 165, phone: '555-1234', email: 'jane.smith@example.com', address: '123 Main St, New York, NY 10001', city: 'New York', state: 'NY', zipCode: '10001', emergencyContact: { name: 'John Smith', phone: '555-5678', relationship: 'Spouse' }, medicalHistory: { conditions: ['None'], allergies: ['None'], medications: [], surgeries: [], pregnancies: 0 }, registrationDate: '2023-01-15', eligibilityStatus: 'Eligible', isActive: true, donationCount: 5, lastDonationDate: '2023-05-20' },
            { id: 'donor-2', firstName: 'Robert', lastName: 'Johnson', dateOfBirth: '1985-08-22', age: 38, gender: 'Male', bloodGroup: 'A+', weight: 80, height: 180, phone: '555-9012', email: 'robert.johnson@example.com', address: '456 Oak Ave, Los Angeles, CA 90210', city: 'Los Angeles', state: 'CA', zipCode: '90210', emergencyContact: { name: 'Mary Johnson', phone: '555-3456', relationship: 'Spouse' }, medicalHistory: { conditions: ['Mild Hypertension'], allergies: ['Penicillin'], medications: ['Lisinopril 10mg'], surgeries: [], pregnancies: 0 }, registrationDate: '2023-02-20', eligibilityStatus: 'Temporarily Deferred', isActive: true, donationCount: 3, lastDonationDate: '2023-03-10' },
            { id: 'donor-3', firstName: 'Emily', lastName: 'Davis', dateOfBirth: '1995-12-01', age: 28, gender: 'Female', bloodGroup: 'B-', weight: 62, height: 170, phone: '555-7890', email: 'emily.davis@example.com', address: '789 Pine Rd, Chicago, IL 60601', city: 'Chicago', state: 'IL', zipCode: '60601', emergencyContact: { name: 'Mike Davis', phone: '555-2345', relationship: 'Brother' }, medicalHistory: { conditions: ['None'], allergies: ['Latex'], medications: [], surgeries: ['Appendectomy 2019'], pregnancies: 0 }, registrationDate: '2023-03-10', eligibilityStatus: 'Eligible', isActive: true, donationCount: 2, lastDonationDate: '2023-04-15' }
          ],
          pagination: { page: 1, limit: 10, total: 3, totalPages: 1 }
        });
      }, 500);
    });
  },
  getDonorById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: { id: id, firstName: 'Jane', lastName: 'Smith', dateOfBirth: '1990-05-15', age: 33, gender: 'Female', bloodGroup: 'O+', weight: 68, height: 165, phone: '555-1234', email: 'jane.smith@example.com', address: '123 Main St, New York, NY 10001', emergencyContact: { name: 'John Smith', phone: '555-5678', relationship: 'Spouse' }, medicalHistory: { conditions: ['None'], allergies: ['None'], medications: [], surgeries: [], pregnancies: 0 }, registrationDate: '2023-01-15', eligibilityStatus: 'Eligible', isActive: true, donationCount: 5, lastDonationDate: '2023-05-20', nextEligibleDate: '2023-08-20' }
        });
      }, 500);
    });
  },
  createDonor: async (donorData) => {
    return new Promise((resolve) => {
      setTimeout(() => { resolve({ success: true, data: { id: 'donor-new', message: 'Donor created successfully' } }); }, 500);
    });
  },
  updateDonor: async (id, donorData) => {
    return new Promise((resolve) => {
      setTimeout(() => { resolve({ success: true, data: { message: 'Donor updated successfully' } }); }, 500);
    });
  },
  deleteDonor: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => { resolve({ success: true, data: { message: 'Donor deleted successfully' } }); }, 500);
    });
  },
  getDonationHistory: async (donorId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { id: 'donation-1', donationDate: '2023-05-20', donationTime: '10:30', bloodGroup: 'O+', unitsCollected: 1, location: 'City Blood Bank', healthStatus: 'Good', hemoglobin: 14.5, donationStatus: 'Completed' },
            { id: 'donation-2', donationDate: '2023-03-15', donationTime: '11:00', bloodGroup: 'O+', unitsCollected: 1, location: 'Community Health Center', healthStatus: 'Good', hemoglobin: 14.2, donationStatus: 'Completed' },
          ]
        });
      }, 500);
    });
  },
  getMedicalScreenings: async (donorId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { id: 'screen-1', screeningDate: '2023-01-15', screeningTime: '09:30', weight: 68, height: 165, bloodPressure: '120/80', pulseRate: 72, hemoglobin: 14.5, eligibilityStatus: 'Eligible' },
          ]
        });
      }, 500);
    });
  }
};
export default donorService;
