import React from 'react';
import { useAuth } from '../context/AuthContext';
import SignIn from '../pages/SignIn';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <SignIn />;
  }
  
  return children;
};

export default ProtectedRoute;