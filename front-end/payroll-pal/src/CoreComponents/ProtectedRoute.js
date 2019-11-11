import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../AuthContext'

class ProtectedRoute extends React.Component {

    render(){
        if(this.props.context.isAuthenticated){
            return (
                <Route {...this.props} />
            )
        }
        else {
            console.log("redirected from protected route")
            return(
                <Redirect to={{
                    pathname: '/login',
                    state: { error: "Whoops! You need to be logged in!" }
                }} />
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