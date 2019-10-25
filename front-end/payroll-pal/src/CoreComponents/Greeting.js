import React, { useContext } from "react";
import { CoreContext } from "./Core"

function Greeting() {
   const coreContext = useContext(CoreContext)
   return(
        <div className="greeting-container">
            <h1 className="greeting">Hi Jackson!</h1>
            <div className="greeting-content pt-mono">
                You've worked {coreContext.totalHours} hours this week. That equals <span className="orange-text">$</span>{ coreContext.totalHours * coreContext.payRate}!
                <div className="take-home">
                    Your take home pay will be approximately <span className="orange-text">$</span>361.
                </div>
            </div>
        </div>
    )
}

export default Greeting;