import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function AuthSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hashParams = new URLSearchParams(location.hash.substring(1));
    const accessToken = hashParams.get('token');

    if (accessToken) {
      localStorage.setItem('baseball-sim-jwt', accessToken);

      navigate('/');
    }
    navigate('/');
  }, [location, navigate]);

  return <div>Authentication successful! Redirecting...</div>;
}

export default AuthSuccess;
