// ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const isAuthenticated = () => {
    return true;
  };

  return isAuthenticated() ? <Outlet /> : <Navigate to='/login' />;
};
