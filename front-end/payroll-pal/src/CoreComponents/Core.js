import React from 'react';
import Header from './Header';
import Greeting from './Greeting';
import EntriesList from './EntriesList'
import AuthContext from '../AuthContext';
class Core extends React.Component {
  render(){
    return (
    <div className="App">
        <Header />
        <Greeting />
        <EntriesList />
    </div>
    );
  }
}

export default (props) => (
    <AuthContext.Consumer>
        {(context) => <Core {...props} context={context} />}
    </AuthContext.Consumer>
)