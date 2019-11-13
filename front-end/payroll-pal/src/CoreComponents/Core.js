import React from 'react';
import Header from './Header';
import Greeting from './Greeting';
import EntriesList from './EntriesList'
import PayrollPalClient from '../payroll-pal-client';
import { Redirect } from 'react-router-dom'
import AuthContext from '../AuthContext';

const CoreContext = React.createContext({})

class Core extends React.Component {
  
  state = {
    loading: true,
    error: null,
    error401: null,
    setEntries: (value) => {
      this.setState({ entries: value })
    },
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
      PayrollPalClient.approveAll(this.state.payPeriodStart, this.state.payPeriodEnd).then( 
        (result) => {
          this.setState(result)
          this.setState({ allApproved: true })
        }
      )
    },
    setFirstName: (value) => {
      this.setState({ firstName: value })
    },
    setState: (values) => {
      this.setState({ ...values })
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
              <div>
                <Greeting />
                <EntriesList />
              </div>
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