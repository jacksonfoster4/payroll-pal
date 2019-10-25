import React from "react";

class Entry extends React.Component {
    constructor(props){
        super(props)

    }
    render(){
        return(
            <div>
                {this.props.date}<br/>
                {this.props.day}<br/>
                {this.props.hours}<br/>
                <hr/>
            </div>  
        )
    }
}

export default Entry;