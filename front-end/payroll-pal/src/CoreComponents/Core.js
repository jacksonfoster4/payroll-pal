import React from 'react';
import Header from './Header';
import Greeting from './Greeting';
import EntriesList from './EntriesList'
import PayrollPalClient, { Heartbeat } from '../payroll-pal-client';
import { withRouter, Redirect } from 'react-router-dom'
import AuthContext from '../AuthContext';

const CoreContext = React.createContext({})

class Core extends React.Component {
 
  componentDidMount(){
    let self = this
    let hb = setInterval(function () {
      Heartbeat().catch(
        (error) => {
          clearInterval(hb)
          self.props.context.logout()
        }
      )
    }, 30000)

    PayrollPalClient.getEntries()
    .then((result) => {
        if(result.error){
          if(result.status_code === 401){
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
        
      })
  }

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
      this.setState({ allApproved: true })
      PayrollPalClient.approveAll()
    },
    setFirstName: (value) => {
      this.setState({ firstName: value })
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