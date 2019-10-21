import React from "react";
import {BrowserRouter as Router, Link} from 'react-router-dom'
import AuthContext from '../AuthContext'
class Header extends React.Component {
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
    }
    logout(){
        this.props.context.logout()
    }
    render(){
        return (
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <Link to="/login" className="nav-link" onClick={this.logout}>Logout</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/core">Test Again</Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
                </li>
            </ul>
        )
    }
}

export default (props) => (
    <AuthContext.Consumer>
        {(context) => <Header {...props} context={context} />}
    </AuthContext.Consumer>
)