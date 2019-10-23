import React, { useState, useEffect } from "react";
import TimeCard from "./TimeCard";
import AuthContext from "../AuthContext";
import PayrollPalClient from "../payroll-pal-client";

function EntryHeading(props) {
    const [payPeriodStart, updatePayPeriodStart] = useState(null)
    const [payPeriodEnd, updatePayPeriodEnd] = useState(null)

    useEffect( () => {
        PayrollPalClient.getEntries(payPeriodStart, payPeriodEnd)
    })
    return(
        <div className="entries-heading-container container-fluid">
            <div className="row">
                <div className="col-12">
                    <h1 className="entries-heading inline ">This Week</h1>
                    <button data-toggle="modal" data-target="#time-card" className="btn pt-mono inline btn-primary pill pay-period-btn">
                        <div id="pay-period-start"className="inline">October 21</div>
                        <span className="inline yellow-text">  -  </span>
                        <div id="pay-period-end"className="inline">October 25</div>
                    </button>
                </div>
            </div>

            <TimeCard 
                payPeriodStart={payPeriodStart} 
                payPeriodEnd={payPeriodEnd} 
                updatePayPeriodStart={updatePayPeriodStart} 
                updatePayPeriodEnd={updatePayPeriodEnd}
            />
        </div>
    )
}

export default (props) => (
    <AuthContext.Consumer>
        {
            (context) => <EntryHeading {...props} context={context} />
        }
    </AuthContext.Consumer>
);
