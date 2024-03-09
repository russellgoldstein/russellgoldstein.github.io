import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function AuthSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // const hashParams = new URLSearchParams(location.hash.substring(1));
    // const accessToken = hashParams.get('access_token');

    // if (accessToken) {
    //   localStorage.setItem('feathers-jwt', accessToken);

    //   navigate('/');
    // }
    // console.log(location);
    navigate('/');
  }, [location, navigate]);

  return <div>Authentication successful! Redirecting...</div>;
}

export default AuthSuccess;
