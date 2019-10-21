import React from "react";
import TimeCard from "../TimeCard";

class EntryHeading extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <h1>This Week</h1>
                <TimeCard />
            </div>
        )
    }
}

export default EntryHeading;