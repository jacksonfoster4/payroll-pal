import React, { useContext } from "react";
import TimeCard from "./TimeCard";
import { CoreContext } from './Core'

function EntryHeading(props) {
    let coreContext = useContext(CoreContext)
    let monthMap = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return(
        <div className="entries-heading-container container-fluid">
            <div className="row">
                <div className="col-12">
                    <h1 className="entries-heading inline ">This Week</h1>
                    <button data-toggle="modal" data-target="#time-card" className="btn pt-mono inline btn-primary pill pay-period-btn">
                        <div id="pay-period-start"className="inline">{monthMap[ coreContext.payPeriodStart[0]-1 ]} {coreContext.payPeriodStart[1]}</div>
                        <span className="inline yellow-text">  -  </span>
                        <div id="pay-period-end"className="inline">{monthMap[ coreContext.payPeriodEnd[0]-1 ]} {coreContext.payPeriodEnd[1]}</div>
                    </button>
                </div>
            </div>

            <TimeCard />
        </div>
    )
    
    
}

export default EntryHeading;
