import React, { useContext } from "react";
import {Link} from 'react-router-dom'
import AuthContext from '../AuthContext'
import { CoreContext } from './Core'
let LogoSmall = require('../assets/Payroll-Pal-Logo Small.svg');


function Header() {
    const coreContext = useContext(CoreContext);
    const authContext = useContext(AuthContext)

    const logout = () => {
        authContext.logout()
    }
    const updatePay = (event) => {
        coreContext.setPayRate(event.target.value)
    }
    const approveAll = () => {
        coreContext.approveAll()
    }

    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                <a className="ml-3 navbar-brand" href="/core"><img alt="Payroll Pal" src={LogoSmall}/></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse justify-content-end navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                    <li className="px-2 nav-item">
                        <div onClick={approveAll} className="pt-mono nav-link">Approve All</div>
                    </li>
                    <li className="px-2 nav-item">
                        <div className="pt-mono pay-rate-container nav-link" >Pay Rate: $<input className="pay-rate-input"onChange={updatePay} value={coreContext.payRate} type="number"></input></div>
                    </li>
                    <li className="px-2 nav-item">
                        <Link to="/login" className="pt-mono nav-link" onClick={logout}>Logout</Link>
                    </li>
                    </ul>
                </div>
            </nav>
        </div> 
    )
    
}

export default Header;