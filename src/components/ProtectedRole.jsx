import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRole = ({ children, roles = [] }) => {
  const { user, loading } = useAuth();

  // Show loading state while checking auth
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if not authenticated or user object is invalid
  if (!user || !user.role) {
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }

  // If no roles specified, allow access to any authenticated user
  if (roles.length === 0) {
    return children;
  }

  // Check if user has any of the required roles
  const hasRequiredRole = roles.some(role => user.role === role);

  if (!hasRequiredRole) {
    return <Navigate to="/access-denied" replace state={{ from: window.location.pathname }} />;
  }

  return children;
};

export default ProtectedRole;