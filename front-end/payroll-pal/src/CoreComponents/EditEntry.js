import React, { useState, useContext, useEffect } from "react";
import { CoreContext } from './Core'

function EditEntry(props) {
    const [entry, setEntry] = useState(props.entry)
    const [punchCounter, setPunchCounter] = useState(entry.punches ? entry.punches.length : 0);
    const coreContext = useContext(CoreContext)
    const colorMap = {
        'Monday': 'monday',
        'Tuesday': 'tuesday',
        'Wednesday': 'wednesday',
        'Thursday': 'thursday',
        'Friday': 'friday',
        'Saturday': 'saturday',
        'Sunday': 'sunday',
    }
    const monthMap = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const Punch = (props) => {
        return (
            <div className="punch container-fluid my-4">
                <div className="row text-center px-2">
                    <div className="col-4 px-1">
                        <select name="punch-type" className="pt-mono punchType" onChange={updatePunch} defaultValue={props.type} id={props.punchIndex}>
                            <option value="work" >Work</option>
                            <option value="meal" >Meal</option>
                            <option value="bereavment" >Bereavement</option>
                            <option value="holiday" >Holiday</option>
                            <option value="jury_duty" >Jury Duty</option>
                            <option value="personal_time_off" >Personal Time Off</option>
                            <option value="sick" >Sick</option>
                            <option value="unpaid_time" >Unpaid Time</option>
                            <option value="vacation" >Vacation</option>
                        </select>
                    </div>
                    <div className="col-4 px-1"><input defaultValue={props.start} onChange={updatePunch} id={props.punchIndex} className="pt-mono start" type="text" placeholder="Start"name="start" /></div>
                    <div className="col-4 px-1 d-inline">
                        <input defaultValue={props.end} onChange={updatePunch} id={props.punchIndex} className="pt-mono end" type="text" placeholder="End"name="end" />
                        <div id={props.punchIndex} onClick={deletePunch} className="delete d-inline text-center"> X </div>
                    </div>
                </div>   
            </div>
            
        )
    }

    useEffect(() => {
        let tmp = Object.assign({}, entry)
        tmp.approved=props.entry.approved;
        setEntry(tmp)
    }, [props.entry])

    const appendPunch = () => {
        entry.punches.push(['work', null, null])
        setPunchCounter(punchCounter + 1) // to trigger rerender
    }

    const updatePunch = (e) => {
        let punchIndex = e.target.id
        switch(e.target.name) {
            case 'punch-type':
                entry.punches[punchIndex][0] = e.target.value
                break;
            case 'start':
                entry.punches[punchIndex][1] = e.target.value
                break;
            case 'end':
                entry.punches[punchIndex][2] = e.target.value
                break;
        }
    }

    const deletePunch = (e) => {
        let punchIndex = e.target.id
        entry.punches.splice(punchIndex, 1)
        setPunchCounter(punchCounter - 1) // to trigger rerender
    }

    const updateEntry = (e) => {
        props.updateEntry(entry)
    }

    const approve = (e) => {
        let tmp = Object.assign({}, entry)
        if(tmp.approved){
            tmp.approved=false;
            coreContext.allApproved=false;
        }
        else {
            tmp.approved=true;
            props.setApproved(true)
        }
        setEntry(tmp)
        props.setEntry(tmp)
    }

    return(
        <div className="modal fade" id={`edit-entry-${props.entryIndex}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content border-radius-15 p-2">
                    <div className="modal-header d-block edit-entry-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h5 className={`display-4 modal-title ${ colorMap[props.entry.day]}`} id="exampleModalLabel">{ props.entry.day }</h5>
                        <h5 className={`${ colorMap[props.entry.day]} pt-mono d-inline`} id="exampleModalLabel">{monthMap[ props.entry.date[0]-1 ]} {props.entry.date[1]} {props.entry.date[2]}</h5>
                        { entry.approved ? <div className="badge ml-2 d-inline badge-success">Approved</div> :  <div className="badge ml-2 d-inline badge-warning">Not Approved</div>}
                       
                    </div>
                    <div id={`edit-entry-body-${props.entryIndex}`}className="pt-4 modal-body">
                        <div className="px-3 container-fluid">
                            <div className="row px-3">
                                <div className="punch-title col-4 w-85 px-1 text-center pt-mono black">
                                    Punch Type
                                </div>
                                <div className="punch-title col-4 w-85 px-1 text-center pt-mono black">
                                    Start
                                </div>
                                <div className="punch-title col-4 w-85 text-center pt-mono black">
                                    End
                                </div>
                            </div>
                        </div>

                        { entry.punches ? entry.punches.map((punch, i) => { return <Punch entryIndex={props.entryIndex} type={punch[0]} start={punch[1]} end={punch[2]} punchIndex={i} key={i} /> }) : null }

                        <div onClick={appendPunch} className="btn pill btn-dark mt-2 add-punch">Add punch</div>
                    </div>
                    <div className="modal-footer pt-4 edit-entry-footer">
                        { entry.approved ? <button onClick={approve} type="button" name="approve" className="btn pill px-3 btn-warning">Unapprove</button> :  <button onClick={approve} type="button" name="approve" className="btn pill px-3 approve-button">Approve</button>}
                        
                        <button onClick={updateEntry} type="button" data-dismiss="modal" name="save" className="btn pill px-3 save">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditEntry;