import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  // Get auth state from context
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation(); // Current location for redirect after login

  // Show loading state while auth status is being determined
  if (isLoading) {
    return <div>Loading...</div>;
  } // if loading, show spinner

  // If not authenticated, redirect to login with state
  if (!isAuthenticated) {
    return (
      // redirect to login
      <Navigate
        to="/login"
        state={{
          from: location,
          message: "You must be logged in to access that page.",
        }}
        replace
      />
    );
  }
  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;
