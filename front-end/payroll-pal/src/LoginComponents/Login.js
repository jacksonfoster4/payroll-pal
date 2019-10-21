import React from "react";
import { Link, Redirect } from 'react-router-dom';
import AuthContext from "../AuthContext";
import LoginForm from './LoginForm'
import '../css/Login.css';
import '../css/App.css';

let LogoLarge = require('../assets/Payroll-Pal-Logo Large.svg');

class Login extends React.Component {
    constructor(props){
        super(props)
        this.login = this.login.bind(this)
    }
    login(){
        this.props.context.login()
        return (
            <Redirect to="/core" />
        )
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
                        <div class="login-logo-container pt-4 col-12">
                            <img src={LogoLarge} width={300} height={300} />
                        </div>
                    </div>
                    <LoginForm />
                </div>
            )
        }
    }
}

export default (props) => (
    <AuthContext.Consumer>
        {(context) => <Login {...props} context={context} />}
    </AuthContext.Consumer>
);