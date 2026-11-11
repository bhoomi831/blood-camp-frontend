import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, loading } = useAuth();

  // Show loading state while checking auth
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }

  // If roles are specified and user doesn't have any of them, redirect to access denied
  if (roles.length > 0 && !user.role) {
    return <Navigate to="/access-denied" replace state={{ from: window.location.pathname }} />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/access-denied" replace state={{ from: window.location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute;