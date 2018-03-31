import React, { Component } from 'react';

import AskQuestion from './AskQuestion.jsx'

export default class AskQuestionContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            checked: false
        }
    }

    handleCheck = (e) => {
        this.setState({
            checked: e.target.checked
        })
    }

    render() {
        let questionsDom = []

        if (this.props.questions){
            questionsDom = this.props.questions.map((el, i) => {
                if (el.questions) {
                    // el is a container question
                    return <AskQuestionContainer key={i} label={el.label} questions={el.questions} />
                } else {
                    // el is a regular question
                    return <AskQuestion key={i} label={el.label} type={el.type} />
                }
            })
        }

        
        return (
            <div>
                <input type="checkbox"
                    id={this.props.label}
                    checked={this.state.checked}
                    onChange={this.handleCheck}/>

                <label htmlFor={this.props.label}>{this.props.label}</label>

                {
                    this.state.checked &&
                    <div>
                        {questionsDom}
                    </div>
                }
            </div>
        );
    }
}