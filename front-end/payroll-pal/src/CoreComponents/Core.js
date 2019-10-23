import React from 'react';
import Header from './Header';
import Greeting from './Greeting';
import EntriesList from './EntriesList'

const CoreContext = React.createContext({
  payRate: null,
  setPayRate: () => {}
})
class Core extends React.Component {
  state = {
    payRate: "18.00",
    setPayRate: (value) => {
        this.setState({
            payRate: value
        })
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