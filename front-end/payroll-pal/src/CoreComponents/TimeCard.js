import React, { useContext } from "react";
import { CoreContext } from "./Core";

function TimeCard(props) {
    const coreContext = useContext(CoreContext)

    const updateFields = () => {
        let start = document.getElementById("start").value
        let end = document.getElementById("end").value
        coreContext.setPayPeriodStart(start)
        coreContext.setPayPeriodEnd(end)
    }
    const handleChange = (event) => {
        document.getElementById(event.target.id).value = event.target.value
    }

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
                    <div className="modal-body" id="new">
                        <input id="start" type="text" onChange={handleChange} placeholder="start"/><br></br>
                        <input id="end" type="text" value={coreContext.payPeriodEnd} placeholder="end"/>
                    </div>
                    <div className="modal-footer">
                    <button onClick={updateFields} type="button" data-dismiss="modal" name="save" className="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimeCard