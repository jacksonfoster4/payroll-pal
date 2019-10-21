import React from "react";
import Entry from "./Entry";
import EntryHeading from "./EntryHeading";

class EntriesList extends React.Component {
    constructor(props){
        super(props)

    }
    render() {
        return(
            <div>
                <EntryHeading />
                <Entry />
            </div>
        )
    }
}

export default EntriesList;