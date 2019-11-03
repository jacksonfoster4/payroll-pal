import React, { useContext } from "react";
import { CoreContext } from "./Core";

function TimeCard(props) {
    const coreContext = useContext(CoreContext)

    const updateFields = () => {
        let start = [document.getElementById("start-month").value, document.getElementById("start-day").value, document.getElementById("start-year").value] 
        let end = [document.getElementById("end-month").value, document.getElementById("end-day").value, document.getElementById("end-year").value] 
        coreContext.setPayPeriodStart(start)
        coreContext.setPayPeriodEnd(end)
    }

    return(
        <div className="modal fade" id="time-card" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content p-3 border-radius-15">
                    <div className="modal-header border-0">
                    <h1 className="pt-mono modal-title" id="exampleModalLabel">Time Card</h1>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div className="modal-body container-fluid" id="new">
                        <div className="pt-mono orange-text">Start:</div>
                        <div className="row">
                            <div className="col-4 px-1">
                                <select defaultValue={coreContext.payPeriodStart[0]} id="start-month">
                                    <option value="1">January</option>
                                    <option value="2">February</option>
                                    <option value="3">March</option>
                                    <option value="4">April</option>
                                    <option value="5">May</option>
                                    <option value="6">June</option>
                                    <option value="7">July</option>
                                    <option value="8">August</option>
                                    <option value="9">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                            </div>
                            <div className="col-4 px-1">
                                <input defaultValue={coreContext.payPeriodStart[1]} id="start-day" type="number" placeholder="Day"/>
                            </div>
                            <div className="col-4 px-1">
                                <input defaultValue={coreContext.payPeriodStart[2]} id="start-year" type="number" placeholder="Year"/>
                            </div>
                        </div>
                        <div className="mt-3 pt-mono orange-text">End:</div>

                        <div className="row">
                            <div className="col-4 px-1">
                                <select defaultValue={coreContext.payPeriodEnd[0]} id="end-month">
                                    <option value="1">January</option>
                                    <option value="2">February</option>
                                    <option value="3">March</option>
                                    <option value="4">April</option>
                                    <option value="5">May</option>
                                    <option value="6">June</option>
                                    <option value="7">July</option>
                                    <option value="8">August</option>
                                    <option value="9">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                            </div>
                            <div className="col-4 px-1">
                                <input defaultValue={coreContext.payPeriodEnd[1]} id="end-day" type="number" placeholder="Day"/>
                            </div>
                            <div className="col-4 px-1">
                                <input defaultValue={coreContext.payPeriodEnd[2]} id="end-year" type="number" placeholder="Year"/>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer border-0 d-block text-center">
                        <button type="button" data-dismiss="modal" name="save" className="btn pill px-3 btn-secondary">Cancel</button>
                        <button onClick={updateFields} type="button" data-dismiss="modal" name="save" className="btn pill px-3 time-card-save">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimeCard;