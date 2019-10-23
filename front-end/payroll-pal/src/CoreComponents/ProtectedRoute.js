import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../AuthContext'

class ProtectedRoute extends React.Component {

    render(){
        if(this.props.context.isAuthenticated()){
            return (
                <Route {...this.props} />
            )
        }
        else {
            return(
                <Redirect to="/login" />
            )
        }
    }
    
}

export default (props) => (
    <AuthContext.Consumer>
        {
            (context) => <ProtectedRoute {...props} context={context} />
        }
    </AuthContext.Consumer>
);