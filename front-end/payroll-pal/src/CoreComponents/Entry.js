import React, { useState, useEffect, useContext } from "react";
import EditEntry from './EditEntry'
import PayrollPalClient from "../payroll-pal-client";
import {CoreContext} from './Core'

function Entry(props) {
    let monthMap = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [entry, setEntry] = useState(props)
    const [approved, setApproved] = useState(false)
    const coreContext = useContext(CoreContext)

    useEffect(() => {
        if(coreContext.allApproved){
            let tmp = Object.assign({}, entry)
            tmp.approved=true
            setEntry(tmp)
        }
    }, [coreContext.allApproved])
    
    const updateEntry = (updatedEntry) => {
        setEntry(updatedEntry);
        PayrollPalClient.updateEntry(updatedEntry)
    }

    return(
        <div>
            <div data-toggle="modal" data-target={`#edit-entry-${props.index}`} className="row entry">
                <div className="col-8 p-4 entry-left">
                    {props.day}{ entry.approved ? <div className="badge badge-success">&#10003;</div> : <div className="badge badge-warning">&#10007;</div> }<br/>
                    {monthMap[ props.date[0]-1 ]} {props.date[1]} {props.date[2]}
                </div>
                <div className="col-4 p-4 entry-right text-center">
                    {props.hours}<br/>
                    hours
                </div>
            </div>
            <EditEntry 
                entry={entry}
                approved={approved}
                setApproved={setApproved}
                setEntry={setEntry}
                updateEntry={updateEntry}
                entryIndex={props.index}
            />
        </div>
    )
}

export default Entry;