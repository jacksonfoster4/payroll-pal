import React from 'react';

const AuthContext = React.createContext({
    isAuthenticated: () => {},
    authToken: () => {},
    logout: () => {},
    client: null
})
export default AuthContext;