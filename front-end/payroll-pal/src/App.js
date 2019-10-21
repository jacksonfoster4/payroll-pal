import React, { useContext } from 'react';
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
    login: (username, password) => {
      PayrollPalClient.login(username, password);
    },
    logout: () => {
      let ppc = new PayrollPalClient()
      ppc.logout();
    },
    updateIsAuthenticated: (val) => {
      this.setState({
        isAuthenticated: val
      })
    },
    updateAuthToken: (token) => {
      this.setState({
        authToken: token
      })
    },
  }

  render(){
    return(
      <AuthContext.Provider value={this.state}>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <ProtectedRoute path="/core" component={Core} />
          </Switch>
        </Router> 
      </AuthContext.Provider>
    )
  }
}

export default App
