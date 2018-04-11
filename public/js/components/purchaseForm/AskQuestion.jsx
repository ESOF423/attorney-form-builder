import React, { Component } from 'react';

export default class AskQuestion extends Component {
    constructor(props) {
        super(props)
    }

    onChange = (e) => {
        this.props.onChange({
            answer: e.target.value,
            formQuestionId: this.props.formQuestionId
        })
    }

    render() {
        return (
            <div>
                <label>{this.props.label}</label><br/>
                <input type="text" onChange={this.onChange} />
            </div>
        );
    }
}