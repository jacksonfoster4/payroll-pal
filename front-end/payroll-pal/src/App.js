import React from 'react';
import './css/App.css';
import Login from './LoginComponents/Login'
import Core from './CoreComponents/Core';
import AuthContext from './AuthContext'
import ProtectedRoute from './CoreComponents/ProtectedRoute'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PayrollPalClient from './payroll-pal-client';

class App extends React.Component {
  state = {
    isAuthenticated: () => {
      return PayrollPalClient.getIsAuthenticated()
    },
    authToken: () => {
      return PayrollPalClient.getAuthToken()
    },
    logout: () => {
      PayrollPalClient.logout();
    },
  }

  render(){
    return(
      <AuthContext.Provider value={this.state}>
        <Router>
          <Switch>
            <ProtectedRoute path="/core" component={Core} />
            <Route path={["/login", "/"]} component={Login} />
          </Switch>
        </Router> 
      </AuthContext.Provider>
    )
  }
}

export default App
