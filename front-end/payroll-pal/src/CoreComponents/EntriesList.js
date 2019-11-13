import React, { useContext, useEffect, useState } from "react";
import Entry from "./Entry";
import EntryHeading from "./EntryHeading";
import PayrollPalClient, { Heartbeat } from '../payroll-pal-client'
import { CoreContext } from './Core'
import AuthContext from '../AuthContext'

function EntriesList() {
    const coreContext = useContext(CoreContext)
    const authContext = useContext(AuthContext)
    const payPeriodStart = coreContext.payPeriodStart
    const payPeriodEnd = coreContext.payPeriodEnd
    const [loading, setLoading] = useState(true)

    useEffect( () => {

        let hb = setInterval(function () {
        Heartbeat().catch(
            (error) => {
                clearInterval(hb)
                authContext.logout()
            }
        )
        }, 30000)

    PayrollPalClient.getEntries()
    .then((result) => {
        if(result.error){
          if(result.status_code === 401){
            coreContext.setError({error: "Whoops! You are not logged in!"})
            authContext.logout()
          }
          else {
            coreContext.setError({error: result.error})
            authContext.logout()
          }
        }
        else {
          coreContext.setState({
            loading: false,
            entries: result['entries'],
            firstName: result['firstName'],
            payPeriodStart: result['payPeriodStart'],
            payPeriodEnd: result['payPeriodEnd'],
            payRate: result['payRate'],
            totalHours: result['totalHours'],
            allApproved: false,
          })
        }
      })
    }, [])

    useEffect( () => {
        setLoading(true)
        PayrollPalClient.getEntries(payPeriodStart, payPeriodEnd).then(
            (result) => {
                coreContext.setEntries(result['entries'])
                coreContext.setFirstName(result['firstName'])
                coreContext.setPayRate(result['payRate'])
                coreContext.setTotalHours(result['totalHours'])
                setLoading(false)
            },
        )
    }, [payPeriodStart, payPeriodEnd]);

    return(

        <div>
            {
                coreContext.payPeriodStart ? <EntryHeading /> : <div></div>
            }
            <div className={ loading ? "container-fluid px-4" : "d-none"}> 
                <h5 className="display-4">Loading...</h5>
            </div>
            <div className={ loading ? "d-none" : ""}>
                { coreContext['entries'] ? coreContext['entries'].map((entry, index) => {
                    return <Entry {...entry} index={index} key={index} /> 
                }) : null}
            </div>

        </div>
    )
}

export default EntriesList;