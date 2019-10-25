import React from "react";
import TimeCard from "./TimeCard";

class EntryHeading extends React.Component {
    render(){
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
    
                <TimeCard />
            </div>
        )
    }
    
}

export default EntryHeading;
