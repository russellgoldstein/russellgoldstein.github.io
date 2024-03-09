// App.js
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AuthSuccess from './components/AuthSuccess'; // Component to handle successful authentication
import { ProtectedRoute } from './components/ProtectedRoute';
import LoginPage from './components/LoginPage';
import './css/style.css';
import './charts/ChartjsConfig';
import MatchupSelector from './components/MatchupSelector';

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]); // triggered on route change
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/auth/success' element={<AuthSuccess />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<MatchupSelector />} />
      </Route>
    </Routes>
  );
}

export default App;
