import React, { useState } from "react";
import EditEntry from './EditEntry'
import PayrollPalClient from "../payroll-pal-client";

function Entry(props) {
    let monthMap = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [entry, setEntry] = useState(props)

    const updateEntry = (updatedEntry) => {
        setEntry(updatedEntry);
        PayrollPalClient.updateEntry(entry)
    } 
    return(
        <div>
            <div data-toggle="modal" data-target={`#edit-entry-${props.index}`} className="row entry">
                <div className="col-8 p-4 entry-left">
                    {props.day}<br/>
                    {monthMap[ props.date[0]-1 ]} {props.date[1]} {props.date[2]}
                </div>
                <div className="col-4 p-4 entry-right text-center">
                    {props.hours}<br/>
                    hours
                </div>
            </div>
            <EditEntry entry={entry} updateEntry={updateEntry} entryIndex={props.index}/>
        </div>
    )
}

export default Entry;