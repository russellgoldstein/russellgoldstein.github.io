import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const isAuthenticated = () => {
    const jwt = localStorage.getItem('baseball-sim-jwt');
    return jwt ? true : false;
  };

  return isAuthenticated() ? <Outlet /> : <Navigate to='/login' />;
};
