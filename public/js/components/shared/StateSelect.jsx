import React, { Component } from 'react';

export default class SelectState extends Component {
    constructor(props) {
        super(props)

        this.state = {
            states: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
        }
    }

    render() {
        let states = this.state.states.map((state, i) => {
            return <option key={i} value={state}>{state}</option>
        })

        return (
            <select name={this.props.name} value={this.props.value} onChange={this.props.onChange}>
                {this.props.allStatesOption &&
                    <option>All States</option>
                }
                {states}
            </select>
        );
    }
}