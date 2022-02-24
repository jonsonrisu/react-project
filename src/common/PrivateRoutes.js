import React from 'react';
import {  Navigate  } from 'react-router-dom';

import AuthService from '../services/auth.service';

function PrivateRoute({ children }) {
    const auth = AuthService.getCurrentUser();
    return auth ? children : <Navigate to="/login" />;
  }
 
  export default PrivateRoute;