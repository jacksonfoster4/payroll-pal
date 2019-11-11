import React from 'react';
import Header from './Header';
import Greeting from './Greeting';
import EntriesList from './EntriesList'
import PayrollPalClient from '../payroll-pal-client';
import { withRouter } from 'react-router-dom'

const CoreContext = React.createContext({})

class Core extends React.Component {
  

  componentDidMount(){
    let entries;
    PayrollPalClient.getEntries().then(result => {
        console.log(result)
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
      })
  }

  state = {
    loading: true,
    
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
    console.log(this.state)
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

export default withRouter(Core);
export { CoreContext };