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
         this.props.context.authenticate()
         this.props.history.push("/core") 
       }
   }
   state = {
       error: false
   }
    render(){
        if(this.props.context.isAuthenticated){
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
                    { this.props.location.state && this.props.location.state.error ? <div className="alert mx-5 alert-danger">{this.props.location.state.error}</div> : <div></div> }
                    <LoginForm />
                    <div onClick={this.demoLogin} className="btn pill mt-4 btn-warning">View Demo</div>
                    <br></br>
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