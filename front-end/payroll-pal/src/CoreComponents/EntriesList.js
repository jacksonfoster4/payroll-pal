import React, { useState, useEffect } from "react";
import Entry from "./Entry";
import EntryHeading from "./EntryHeading";
import PayrollPalClient from '../payroll-pal-client'

function EntriesList() {
    const [payPeriodStart, updatePayPeriodStart] = useState('test')
    const [payPeriodEnd, updatePayPeriodEnd] = useState('test2')

    useEffect( () => {
        PayrollPalClient.getEntries(payPeriodStart, payPeriodEnd);
    });

    return(
        <div>
            <EntryHeading 
                    payPeriodStart={payPeriodStart} 
                    payPeriodEnd={payPeriodEnd} 
                    updatePayPeriodStart={updatePayPeriodStart} 
                    updatePayPeriodEnd={updatePayPeriodEnd}
            />
            <Entry />
        </div>
    )
    
}

export default EntriesList;