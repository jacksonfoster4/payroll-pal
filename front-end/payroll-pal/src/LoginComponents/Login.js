import React from "react";
import { Redirect, withRouter } from 'react-router-dom';
import AuthContext from "../AuthContext";
import LoginForm from './LoginForm'
import '../css/Login.css';
import '../css/App.css';
import PayrollPalClient from "../payroll-pal-client";

let LogoLarge = require('../assets/Payroll-Pal-Logo Large.svg');

class Login extends React.Component {
   demoLogin = () => {
       if(PayrollPalClient.login({demo: true})){
         this.props.history.push("/core") 
       }
   }
    render(){
        if(this.props.context.isAuthenticated()){
            return (
                <Redirect to="/core" />
            )
        }
        else {
            return(
                <div className="container login-container">
                    <div className="row">
                        <div className="login-logo-container pt-4 col-12">
                            <img alt="Payroll Pal" src={LogoLarge} width={300} height={300} />
                        </div>
                    </div>
                    <LoginForm />
                    <div onClick={this.demoLogin} className="btn pill mt-4 btn-warning">View Demo</div>
                </div>
            )
        }
    }
}

export default (props) => (
    <AuthContext.Consumer>
        {
            (context) => <Login {...props} context={context} />
        }
    </AuthContext.Consumer>
);