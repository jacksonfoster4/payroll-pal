import React from 'react';

const AuthContext = React.createContext({
    isAuthenticated: () => {},
    authToken: () => {},
    logout: () => {},
})
export default AuthContext;