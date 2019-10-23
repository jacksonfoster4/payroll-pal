import React from "react";
import {BrowserRouter as Router, Link} from 'react-router-dom'
import AuthContext from '../AuthContext'
let LogoSmall = require('../assets/Payroll-Pal-Logo Small.svg');

class Header extends React.Component {
    logout = () => {
        this.props.context.logout()
    }
    render(){
        return (
            <div>
                <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                    <a className="ml-3 navbar-brand" href="#"><img src={LogoSmall}/></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse justify-content-end navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                        <li className="px-2 nav-item">
                            <Link className="pt-mono nav-link" to="/core">Approve All</Link>
                        </li>
                        <li className="px-2 nav-item">
                            <Link to="/login" className="pt-mono nav-link" onClick={this.logout}>Pay Rate: $18.00</Link>
                        </li>
                        <li className="px-2 nav-item">
                            <Link to="/login" className="pt-mono nav-link" onClick={this.logout}>Logout</Link>
                        </li>
                        </ul>
                    </div>
                </nav>
            </div> 
        )
    }
}

export default (props) => (
    <AuthContext.Consumer>
        {
            (context) => <Header {...props} context={context} />
        }
    </AuthContext.Consumer>
)