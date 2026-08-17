import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ adminOnly = false }) => {
  const { user, loading } = useContext(AuthContext);

  // If AuthContext is still reading localStorage, wait
  if (loading) return <div>Loading...</div>;

  // 1. Not logged in? Redirect to /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Needs admin role, but user is a regular customer? Redirect to home
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // 3. Everything checks out? Render the protected page (<Outlet />)
  return <Outlet />;
};

export default ProtectedRoute;