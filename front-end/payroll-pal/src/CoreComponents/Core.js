import React from 'react';
import Header from './Header';
import Greeting from './Greeting';
import EntriesList from './EntriesList'
import PayrollPalClient from '../payroll-pal-client';
import { withRouter, Redirect } from 'react-router-dom'
import AuthContext from '../AuthContext';

const CoreContext = React.createContext({})

class Core extends React.Component {
  

  componentDidMount(){
    PayrollPalClient.getEntries()
    .then((result) => {
        if(result.error){
          if(result.status_code === 401){
            console.log('test')
            this.setState({error401: true})
            this.props.context.logout()
          }
          else {
            this.setState({error: true})
            this.props.context.logout()
          }
        }
        else {
          this.setState({
            loading: false,
            entries: result['entries'],
            firstName: result['firstName'],
            payPeriodStart: result['payPeriodStart'],
            payPeriodEnd: result['payPeriodEnd'],
            payRate: result['payRate'],
            totalHours: result['totalHours'],
            allApproved: false,
          })
        }
        
      }).catch(error => {
        
      })
  }

  state = {
    loading: true,
    error: null,
    error401: null,
    setPayRate: (value) => {
        this.setState({ payRate: value })
    },

    setPayPeriodStart: (value) => {
      this.setState({ payPeriodStart: value })
    },

    setPayPeriodEnd: (value) => {
      this.setState({ payPeriodEnd: value })
    },

    setTotalHours: (value) => {
      this.setState({ totalHours: value })
    },

    approveAll: () => {
      this.setState({ allApproved: true })
      PayrollPalClient.approveAll()
    }
  }

  render(){
    if(this.state.error401){
      return <Redirect to={{
        pathname: '/login',
        state: { error: "Whoops! You'll need to login again!" }
    }} />
    }
    else {
      return (
        <CoreContext.Provider value={this.state}>
          <div className="App">
            <Header />
            <div className="App-body">
            { this.state.loading ? 
              <div className="text-center container-fluid">
                <div className="display-4 loading">Loading...</div>
                </div> : 
              <div>
                <Greeting />
                <EntriesList />
              </div>
              }
            </div> 
          </div>
        </CoreContext.Provider>
      );
    }
  }
}

export default (props) => (
  <AuthContext.Consumer>
   { (context) => { return <Core context={context} {...props } /> } }
  </AuthContext.Consumer>
);
export { CoreContext };