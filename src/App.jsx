import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/variables.css';
import './styles/globals.css';
import './index.css';

import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ProtectedRole from './components/ProtectedRole.jsx';
import LandingPage from './pages/Landing/Landing.jsx';
import AccessDeniedPage from './pages/AccessDeniedPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import ChangePasswordPage from './pages/ChangePasswordPage.jsx';
import RoleSelectionPage from './pages/RoleSelectionPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';

import DashboardPage from './pages/DashboardPage.jsx';
import CampListPage from './pages/CampListPage.jsx';
import CampDetailsPage from './pages/CampDetailPage.jsx';
import CampCreatePage from './pages/CampCreatePage.jsx';
import CampEditPage from './pages/CampEditPage.jsx';

import VenueManagementPage from './pages/VenueManagementPage.jsx';

// Inventory Management
import InventoryListPage from './pages/InventoryListPage.jsx';
import InventoryDetailPage from './pages/InventoryDetailPage.jsx';
import AddBloodUnitPage from './pages/AddBloodUnitPage.jsx';

// Hospital Management
import HospitalListPage from './pages/HospitalListPage.jsx';
import HospitalDetailPage from './pages/HospitalDetailPage.jsx';

// Appointment Management
import AppointmentListPage from './pages/AppointmentListPage.jsx';
import AppointmentCreatePage from './pages/AppointmentCreatePage.jsx';
import AppointmentDetailPage from './pages/AppointmentDetailPage.jsx';

import DonorListPage from './pages/donor-management/DonorListPage.jsx';
import DonorDetailsPage from './pages/donor-management/DonorDetailsPage.jsx';
import DonorProfilePage from './pages/donor-management/DonorProfilePage.jsx';
import DonorRegisterPage from './pages/donor-management/DonorRegisterPage.jsx';
import EditDonorProfilePage from './pages/donor-management/EditDonorProfilePage.jsx';
import MedicalScreeningPage from './pages/donor-management/MedicalScreeningPage.jsx';
import MedicalScreeningAddPage from './pages/donor-management/MedicalScreeningAddPage.jsx';
import DonationHistoryPage from './pages/donor-management/DonationHistoryPage.jsx';
import EligibilityStatusPage from './pages/donor-management/EligibilityStatusPage.jsx';

import EmergencyRequestListPage from './pages/EmergencyRequestListPage.jsx';
import EmergencyRequestCreatePage from './pages/EmergencyRequestCreatePage.jsx';
import EmergencyRequestDetailPage from './pages/EmergencyRequestDetailPage.jsx';
import EmergencyRequestEditPage from './pages/EmergencyRequestEditPage.jsx';

import VolunteerListPage from './pages/VolunteerListPage.jsx';
import VolunteerAssignmentPage from './pages/VolunteerAssignmentPage.jsx';
import NotificationCenterPage from './pages/NotificationCenterPage.jsx';
import NotificationSettingsPage from './pages/NotificationSettingsPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';
import AuditLogPage from './pages/AuditLogPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/role-selection" element={<RoleSelectionPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/access-denied" element={<AccessDeniedPage />} />

          {/* Authenticated Routes with Layout */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <DashboardPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Camp Management - Accessible to Admin, Hospital Staff, Volunteers */}
          <Route
            path="/camps"
            element={
              <ProtectedRole roles={['Super Admin', 'Hospital Admin', 'Volunteer', 'Donor']}>
                <MainLayout>
                  <CampListPage />
                </MainLayout>
              </ProtectedRole>
            }
          />
          <Route
            path="/camps/create"
            element={
              <ProtectedRole roles={['Super Admin', 'Hospital Admin', 'Volunteer']}>
                <MainLayout>
                  <CampCreatePage />
                </MainLayout>
              </ProtectedRole>
            }
          />
          <Route
            path="/camps/:id"
            element={
              <ProtectedRole roles={['Super Admin', 'Hospital Admin', 'Volunteer', 'Donor']}>
                <MainLayout>
                  <CampDetailsPage />
                </MainLayout>
              </ProtectedRole>
            }
          />
          <Route
            path="/camps/:id/edit"
            element={
              <ProtectedRole roles={['Super Admin', 'Hospital Admin', 'Volunteer']}>
                <MainLayout>
                  <CampEditPage />
                </MainLayout>
              </ProtectedRole>
            }
          />

          {/* Venue Management - Admin and Hospital Staff */}
          <Route
            path="/venues"
            element={
              <ProtectedRole roles={['Super Admin', 'Hospital Admin']}>
                <MainLayout>
                  <VenueManagementPage />
                </MainLayout>
              </ProtectedRole>
            }
          />

          {/* Blood Inventory Management - Admin, Hospital Staff, Donors */}
          <Route
            path="/inventory"
            element={
              <ProtectedRole roles={['Super Admin', 'Hospital Admin', 'Donor']}>
                <MainLayout>
                  <InventoryListPage />
                </MainLayout>
              </ProtectedRole>
            }
          />
          <Route
            path="/inventory/:id"
            element={
              <ProtectedRole roles={['Super Admin', 'Hospital Admin', 'Donor']}>
                <MainLayout>
                  <InventoryDetailPage />
                </MainLayout>
              </ProtectedRole>
            }
          />
          <Route
            path="/inventory/add"
            element={
              <ProtectedRole roles={['Super Admin', 'Hospital Admin']}>
                <MainLayout>
                  <AddBloodUnitPage />
                </MainLayout>
              </ProtectedRole>
            }
          />

          {/* Hospital Management - Admin and Hospital Staff */}
          <Route
            path="/hospitals"
            element={
              <ProtectedRole roles={['Super Admin', 'Hospital Admin']}>
                <MainLayout>
                  <HospitalListPage />
                </MainLayout>
              </ProtectedRole>
            }
          />
          <Route
            path="/hospitals/:id"
            element={
              <ProtectedRole roles={['Super Admin', 'Hospital Admin']}>
                <MainLayout>
                  <HospitalDetailPage />
                </MainLayout>
              </ProtectedRole>
            }
          />

          {/* Appointment Management - All authenticated users */}
          <Route
            path="/appointments"
            element={
              <ProtectedRole>
                <MainLayout>
                  <AppointmentListPage />
                </MainLayout>
              </ProtectedRole>
            }
          />
          <Route
            path="/appointments/create"
            element={
              <ProtectedRole>
                <MainLayout>
                  <AppointmentCreatePage />
                </MainLayout>
              </ProtectedRole>
            }
          />
          <Route
            path="/appointments/:id"
            element={
              <ProtectedRole>
                <MainLayout>
                  <AppointmentDetailPage />
                </MainLayout>
              </ProtectedRole>
            }
          />

          {/* Donor Management - Donors and Admin/Staff */}
          <Route
            path="/donors"
            element={
              <ProtectedRole roles={['Super Admin', 'Hospital Admin', 'Donor']}>
                <MainLayout>
                  <DonorListPage />
                </MainLayout>
              </ProtectedRole>
            }
          />
          <Route
            path="/donors/register"
            element={
              <ProtectedRole>
                <MainLayout>
                  <DonorRegisterPage />
                </MainLayout>
              </ProtectedRole>
            }
          />
          <Route
            path="/donors/:id"
            element={
              <ProtectedRole roles={['Super Admin', 'Hospital Admin', 'Donor']}>
                <MainLayout>
                  <DonorDetailsPage />
                </MainLayout>
              </ProtectedRole>
            }
          />
          <Route
            path="/donors/:id/profile"
            element={
              <ProtectedRole roles={['Super Admin', 'Hospital Admin', 'Donor']}>
                <MainLayout>
                  <DonorProfilePage />
                </MainLayout>
              </ProtectedRole>
            }
          />
          <Route
            path="/donors/:id/edit"
            element={
              <ProtectedRole roles={['Super Admin', 'Hospital Admin', 'Donor']}>
                <MainLayout>
                  <EditDonorProfilePage />
                </MainLayout>
              </ProtectedRole>
            }
          />
          <Route
            path="/donors/:id/medical-screening"
            element={
              <ProtectedRole roles={['Super Admin', 'Hospital Admin', 'Donor']}>
                <MainLayout>
                  <MedicalScreeningPage />
                </MainLayout>
              </ProtectedRole>
            }
          />
          <Route
            path="/donors/:id/medical-screening/add"
            element={
              <ProtectedRole roles={['Super Admin', 'Hospital Admin', 'Donor']}>
                <MainLayout>
                  <MedicalScreeningAddPage />
                </MainLayout>
              </ProtectedRole>
            }
          />
          <Route
            path="/donors/:id/donation-history"
            element={
              <ProtectedRole roles={['Super Admin', 'Hospital Admin', 'Donor']}>
                <MainLayout>
                  <DonationHistoryPage />
                </MainLayout>
              </ProtectedRole>
            }
          />
          <Route
            path="/donors/:id/eligibility"
            element={
              <ProtectedRole roles={['Super Admin', 'Hospital Admin', 'Donor']}>
                <MainLayout>
                  <EligibilityStatusPage />
                </MainLayout>
              </ProtectedRole>
            }
          />

          {/* Emergency Requests - All authenticated users */}
          <Route
            path="/emergency-requests"
            element={
              <ProtectedRole>
                <MainLayout>
                  <EmergencyRequestListPage />
                </MainLayout>
              </ProtectedRole>
            }
          />
          <Route
            path="/emergency-requests/create"
            element={
              <ProtectedRole>
                <MainLayout>
                  <EmergencyRequestCreatePage />
                </MainLayout>
              </ProtectedRole>
            }
          />
          <Route
            path="/emergency-requests/:id"
            element={
              <ProtectedRole>
                <MainLayout>
                  <EmergencyRequestDetailPage />
                </MainLayout>
              </ProtectedRole>
            }
          />
          <Route
            path="/emergency-requests/:id/edit"
            element={
              <ProtectedRole>
                <MainLayout>
                  <EmergencyRequestEditPage />
                </MainLayout>
              </ProtectedRole>
            }
          />

          {/* Volunteers - Admin and Volunteer Coordinators */}
          <Route
            path="/volunteers"
            element={
              <ProtectedRole roles={['Super Admin', 'Hospital Admin', 'Volunteer']}>
                <MainLayout>
                  <VolunteerListPage />
                </MainLayout>
              </ProtectedRole>
            }
          />
          <Route
            path="/volunteers/assign"
            element={
              <ProtectedRole roles={['Super Admin', 'Hospital Admin', 'Volunteer']}>
                <MainLayout>
                  <VolunteerAssignmentPage />
                </MainLayout>
              </ProtectedRole>
            }
          />

          {/* Notifications - All authenticated users */}
          <Route
            path="/notifications"
            element={
              <ProtectedRole>
                <MainLayout>
                  <NotificationCenterPage />
                </MainLayout>
              </ProtectedRole>
            }
          />
          <Route
            path="/notifications/settings"
            element={
              <ProtectedRole>
                <MainLayout>
                  <NotificationSettingsPage />
                </MainLayout>
              </ProtectedRole>
            }
          />

          {/* Reports - Admin and Staff */}
          <Route
            path="/reports"
            element={
              <ProtectedRole roles={['Super Admin', 'Hospital Admin', 'Volunteer']}>
                <MainLayout>
                  <ReportsPage />
                </MainLayout>
              </ProtectedRole>
            }
          />

          {/* Audit Logs - Admin only */}
          <Route
            path="/audit-logs"
            element={
              <ProtectedRole roles={['Super Admin']}>
                <MainLayout>
                  <AuditLogPage />
                </MainLayout>
              </ProtectedRole>
            }
          />

          {/* Profile & Settings - All authenticated users */}
          <Route
            path="/profile"
            element={
              <ProtectedRole>
                <MainLayout>
                  <ProfilePage />
                </MainLayout>
              </ProtectedRole>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRole>
                <MainLayout>
                  <SettingsPage />
                </MainLayout>
              </ProtectedRole>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
