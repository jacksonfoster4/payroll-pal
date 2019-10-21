import React from 'react';
import "../css/Login.css"
import '../css/App.css';
import { Redirect, withRouter } from 'react-router-dom'
import AuthContext from '../AuthContext';
import PayrollPalClient from '../payroll-pal-client'

class LoginForm extends React.Component {
    constructor(props){
        super(props)
        this.login = this.login.bind(this)
        this.props.history.push = this.props.history.push.bind(this)
    }
    login = (e) => {
        e.preventDefault();

        let username;
        let password;
        PayrollPalClient.login(username, password);

        this.props.history.push("/core") 
    }
    render(){
        return(
            <div className="pt-4 login-form">
                <div className="row">
                    <div className="col-12">
                        <h1 className="pt-mono">Login</h1>
                    </div>
                    <div className="col-md-12">
                        <form onSubmit={this.login}>    
                            <div className="row">
                                <div className="py-3 col-12">
                                    <input className="mb-4" type="text" placeholder="Username" />
                                </div>
                                <div className="col-12">
                                    <input type="password" placeholder="Password" />
                                </div>
                            </div>
                            <button type="submit" className="btn mt-4 btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default withRouter((props) => (
    <AuthContext.Consumer>
        {
            (context) => <LoginForm {...props} context={context} />
        }
    </AuthContext.Consumer>
))