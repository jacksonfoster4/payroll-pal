import React from 'react';
import "../css/Login.css"
import '../css/App.css';
import { withRouter } from 'react-router-dom'
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
                    </div>
                    <div className="p-4 login-form-container">
                    <h1 className="">Login</h1>
                        <form id="form" onSubmit={this.login}>    
                            <div className="row">
                                <div className="pt-3 col-12">
                                    <input className="mb-4 pt-mono" type="text" placeholder="Username" />
                                </div>
                                <div className="col-12">
                                    <input className="pt-mono"type="password" placeholder="Password" />
                                </div>
                            </div>
                            <button type="submit" className="btn px-3 mt-4 pt-mono pill btn-orange">Login</button>
                        </form>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default withRouter(LoginForm)