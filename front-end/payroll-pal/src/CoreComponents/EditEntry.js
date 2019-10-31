import React, { useState, useContext, useEffect } from "react";
import { CoreContext } from './Core'

function EditEntry(props) {
    const [entry, setEntry] = useState(props.entry)
    const [punchCounter, setPunchCounter] = useState(entry.punches ? entry.punches.length : 0);
    const [approved, setApproved] = useState(props.approved)
    const coreContext = useContext(CoreContext)

    const Punch = (props) => {
        return (
            <div>
                <select name="punch-type" className="punchType" onChange={updatePunch} defaultValue={props.type} id={props.punchIndex}>
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
                <input defaultValue={props.start} onChange={updatePunch} id={props.punchIndex} className="start" type="text" placeholder="Start"name="start" />
                <input defaultValue={props.end} onChange={updatePunch} id={props.punchIndex} className="end" type="text" placeholder="End"name="end" />
                <div id={props.punchIndex} onClick={deletePunch} className="btn btn-danger"> X </div>
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
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="pt-mono display-4 modal-title" id="exampleModalLabel">Edit Entry</h5>
                        { entry.approved ? <div className="badge badge-success">Approved</div> :  <div className="badge badge-warning">Not Approved</div>}
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div id={`edit-entry-body-${props.index}`}className="modal-body">

                        { entry.punches ? entry.punches.map((punch, i) => { return <Punch entryIndex={props.entryIndex} type={punch[0]} start={punch[1]} end={punch[2]} punchIndex={i} key={i} /> }) : null }

                        <div onClick={appendPunch} className="btn pill btn-dark">Add punch</div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={approve} type="button" name="approve" className="btn pill px-3 btn-info">Approve</button>
                        <button onClick={updateEntry} type="button" data-dismiss="modal" name="save" className="btn pill px-3 btn-success">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditEntry;