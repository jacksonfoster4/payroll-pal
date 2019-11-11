import React, { useContext, useEffect, useState } from "react";
import Entry from "./Entry";
import EntryHeading from "./EntryHeading";
import PayrollPalClient from '../payroll-pal-client'
import { CoreContext } from './Core'

function EntriesList() {
    const coreContext = useContext(CoreContext)

    const payPeriodStart = coreContext.payPeriodStart
    const payPeriodEnd = coreContext.payPeriodEnd
    

    useEffect( () => {
        PayrollPalClient.getEntries().then(
            (result) => {
                coreContext.setEntries(result['entries'])
                coreContext.setFirstName(result['firstName'])
                coreContext.setPayRate(result['payRate'])
                coreContext.setTotalHours(result['totalHours'])
            }
        )
    }, [payPeriodStart, payPeriodEnd]);
    return(
        <div>
            <EntryHeading />
            { coreContext['entries'] ? coreContext['entries'].map((entry, index) => {
                return <Entry {...entry} index={index} key={index} /> 
            }) : null}

        </div>
    )
}

export default EntriesList;