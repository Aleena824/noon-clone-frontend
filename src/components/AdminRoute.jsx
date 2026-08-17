import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Prevents blank flash while reading localStorage/token
  }

  // If user logged out or is not admin, push to Home page
  if (!user || (user.role !== 'admin' && !user.isAdmin)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;