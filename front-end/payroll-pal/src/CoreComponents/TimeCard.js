import React from "react";
import * as $ from 'jquery';

class TimeCard extends React.Component {
    
    componentDidMount(){
        this.setCurrentPayPeriodInputs(
            this.props.payPeriodStart, 
            this.props.payPeriodEnd
        )
    }
    componentDidUpdate(){
        this.setCurrentPayPeriodInputs(
            this.props.payPeriodStart, 
            this.props.payPeriodEnd
        )
    }
    setCurrentPayPeriodInputs = (start, end) => {
        document.getElementById("start").value = start
        document.getElementById("end").value = end
    }
    updateFields = (e) => {
        e.preventDefault();
        let start = document.getElementById("start").value
        let end = document.getElementById("end").value
        this.props.updatePayPeriodStart(start)
        this.props.updatePayPeriodEnd(end)
    }
    render(){
        return(
            <div className="modal fade" id="time-card" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">New Entry</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <form onSubmit={this.updateFields}>
                            <div className="modal-body" id="new">
                                <input id="start" type="text" placeholder="start"/><br></br>
                                <input id="end" type="text" placeholder="end"/>
                            </div>
                            <div className="modal-footer">
                            <button type="submit" name="save" className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default TimeCard