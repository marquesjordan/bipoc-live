import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ redirectPath = '/login', children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

export default PrivateRoute;
