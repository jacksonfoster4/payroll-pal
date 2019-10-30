import React from 'react';
import Header from './Header';
import Greeting from './Greeting';
import EntriesList from './EntriesList'
import PayrollPalClient from '../payroll-pal-client';

const CoreContext = React.createContext({})

class Core extends React.Component {
  state = {
    payRate: "18.00",
    setPayRate: (value) => {
        this.setState({
            payRate: value
        })
    },
    payPeriodStart: [10,21,19],
    payPeriodEnd: [10,25,19],
    setPayPeriodStart: (value) => {
      this.setState({
        payPeriodStart: value
      })
    },
    setPayPeriodEnd: (value) => {
      this.setState({
        payPeriodEnd: value
      })
    },
    setTotalHours: (value) => {
      this.setState({
        totalHours: value
      })
    },
    approveAll: () => {
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