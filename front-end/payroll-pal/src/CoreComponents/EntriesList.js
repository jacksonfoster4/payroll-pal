import React, { useContext, useState, useEffect } from "react";
import Entry from "./Entry";
import EntryHeading from "./EntryHeading";
import PayrollPalClient from '../payroll-pal-client'
import {CoreContext} from './Core'

function EntriesList() {
    const coreContext = useContext(CoreContext)
    
    const payPeriodStart = coreContext.payPeriodStart
    const payPeriodEnd = coreContext.payPeriodEnd
    let entries = PayrollPalClient.getEntries(payPeriodStart, payPeriodEnd);

    useEffect( () => {
        entries = PayrollPalClient.getEntries(payPeriodStart, payPeriodEnd)
        coreContext.setTotalHours(entries['totalHours'])
    }, [payPeriodStart, payPeriodEnd]);

    return(
        <div>
            <EntryHeading />
            {
                entries['entries'].map(entry => {
                    return <Entry {...entry} />
                })
            }
        </div>
    )
    
}

export default EntriesList;