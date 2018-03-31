import React, { Component } from 'react';

export default class AskQuestion extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <label>{this.props.label}</label><br/>
                <input type="text" />
            </div>
        );
    }
}