import React, { useContext } from "react";
import { CoreContext } from "./Core"

function Greeting() {
   const coreContext = useContext(CoreContext)
   return(
        <div className="greeting-container">
            <h1 className="greeting">Hi { coreContext.firstName }!</h1>
            <div className="greeting-content pt-mono">
                You've worked {coreContext.totalHours} hours.<br></br>That equals <span className="orange-text">$</span>{ coreContext.totalHours * coreContext.payRate}!
            </div>
        </div>
    )
}

export default Greeting;