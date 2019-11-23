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
    message: null,
    setMessage: (value) => {
      this.setState({ message: value })
    },
    setError: (value) => {
      this.setState({ error: value })
    },
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

    setLoading: (value) => {
      this.setState({loading: value })
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
  
  componentDidUpdate(){
    if(this.state.message || this.state.error) {
      let self = this
      setTimeout(
        function(){ 
          self.setState({
            error: null,
            message: null
          }); 
      }, 3000);
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

            { this.state.message ?  
              <div className="alert mx-4 alert-success" role="alert">
                { this.state.message }
              </div> : <div></div> } 
              
              { this.state.error ?  
              <div className="alert mx-4 alert-danger" role="alert">
                { this.state.error }
              </div> : <div></div> } 

              <div>
               <div className={ this.state.loading ? '': "d-none" }> <h5 className="display-4">Loading...</h5></div>
              <div className={ this.state.loading ? 'd-none': "" }>
                <Greeting />
                <EntriesList />
              </div>
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