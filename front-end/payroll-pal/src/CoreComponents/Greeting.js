import React, { useContext } from "react";

function Greeting() {
   
    return(
        <div className="greeting-container">
            <h1 className="greeting">Hi Jackson!</h1>
            <div className="greeting-content pt-mono">
                You've worked 24.5 hours this week. That equals <span className="orange-text">$</span>441!
                <div className="take-home">
                    Your take home pay will be approximately <span className="orange-text">$</span>361.
                </div>
            </div>
        </div>
    )

}

export default Greeting;