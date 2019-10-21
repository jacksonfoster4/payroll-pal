import React from 'react';
import PayrollPalClient from './payroll-pal-client';

const AuthContext = React.createContext({
    isAuthenticated: () => {},
    authToken: () => {},
    login: (username, password) => {}
    logout: () => {}
})
export default AuthContext;