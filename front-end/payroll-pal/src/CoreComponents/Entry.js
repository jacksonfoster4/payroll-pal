import React, { useState, useEffect, useContext } from "react";
import EditEntry from './EditEntry'
import PayrollPalClient from "../payroll-pal-client";
import {CoreContext} from './Core'

function Entry(props) {
    const monthMap = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const colorMap = {
        'Monday': ['monday-left', 'monday-right'],
        'Tuesday': ['tuesday-left', 'tuesday-right'],
        'Wednesday': ['wednesday-left', 'wednesday-right'],
        'Thursday': ['thursday-left', 'thursday-right'],
        'Friday': ['friday-left', 'friday-right'],
        'Saturday': ['saturday-left', 'saturday-right'],
        'Sunday': ['sunday-left', 'sunday-right'],
    }
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
        setEntry(PayrollPalClient.updateEntry(updatedEntry))
    }

    return(
        <div>
            <div data-toggle="modal" data-target={`#edit-entry-${props.index}`} className="row entry">
                <div className={`col-8 p-4 entry-left ${ colorMap[props.day][0] } `}>
                    <div className="day">{props.day}</div>{ entry.approved ? <div className="ml-2 badge badge-success approval">&#10003;</div> : <div className="ml-2 badge badge-warning approval">&#10007;</div> }<br/>
                    <div className="date pt-mono">{monthMap[ props.date[0]-1 ]} {props.date[1]} {props.date[2]}</div>
                </div>
                <div className={`col-4 p-4 entry-right text-center ${ colorMap[props.day][1] }`}>
                    <div className="hours">{props.hours}</div>
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