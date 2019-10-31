import React from 'react';
import Header from './Header';
import Greeting from './Greeting';
import EntriesList from './EntriesList'
import PayrollPalClient from '../payroll-pal-client';

const CoreContext = React.createContext({})

class Core extends React.Component {
  entries = PayrollPalClient.getEntries();
  state = {
    payRate: this.entries['payRate'],
    setPayRate: (value) => {
        this.setState({
            payRate: value
        })
    },
    payPeriodStart: this.entries['payPeriodStart'],
    setPayPeriodStart: (value) => {
      this.setState({
        payPeriodStart: value
      })
    },
    payPeriodEnd: this.entries['payPeriodEnd'],
    setPayPeriodEnd: (value) => {
      this.setState({
        payPeriodEnd: value
      })
    },
    totalHours: this.entries['totalHours'],
    setTotalHours: (value) => {
      this.setState({
        totalHours: value
      })
    },
    allApproved: false,
    approveAll: () => {
      this.setState({allApproved: true})
      PayrollPalClient.approveAll()
    }
  }

  render(){

    return (
      <CoreContext.Provider value={this.state}>
        <div className="App">
          <Header />
          <div className="App-body">
            <Greeting />
            <EntriesList />
          </div> 
        </div>
      </CoreContext.Provider>
    );

  }
}

export default Core;
export { CoreContext };