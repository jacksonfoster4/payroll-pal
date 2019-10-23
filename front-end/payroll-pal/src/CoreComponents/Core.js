import React from 'react';
import Header from './Header';
import Greeting from './Greeting';
import EntriesList from './EntriesList'

class Core extends React.Component {
  render(){
    return (
    <div className="App">
        <Header />
        <div className="App-body">
          <Greeting />
          <EntriesList />
        </div> 
    </div>
    );
  }
}

export default Core;