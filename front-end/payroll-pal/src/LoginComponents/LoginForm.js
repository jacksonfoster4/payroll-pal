import React from 'react';
import "../css/Login.css"
import '../css/App.css';
import { withRouter } from 'react-router-dom'
import PayrollPalClient from '../payroll-pal-client'

class LoginForm extends React.Component {
    
    login = (e) => {
        e.preventDefault();

        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        if(PayrollPalClient.login({username: username, password: password})) {
            this.props.history.push("/core") 
        }

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
                                    <input className="mb-4 pt-mono" id="username" type="text" placeholder="Username" />
                                </div>
                                <div className="col-12">
                                    <input className="pt-mono" id="password" type="password" placeholder="Password" />
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