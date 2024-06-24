// components/PrivateRoute.js

import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  // Replace with your actual authentication logic (e.g., check localStorage)
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
