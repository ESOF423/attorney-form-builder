import React, { Component } from 'react'

import StripePayment from './StripePayment.jsx'
import AskQuestion from './AskQuestion.jsx'
import AskQuestionContainer from './AskQuestionContainer.jsx'

import 'js/lib/dentist.min.js'
import 'css/pure.min.css'

function Text(props) {
    return (
        <div>
            <label>{props.label}</label>
            <input type="text" />
        </div>
    )
}

export default class PurchaseForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            questions: [],
            answers: {},
            cost: 0
        }

        let urlParts = document.URL.extract()
        this.formId = urlParts ? urlParts.formId : null

        this.getFormData()
    }

    getFormData = () => {
        $.ajax({
            url: '/purchaseForm/getFormData',
            data: {
                formId: this.formId
            },
            success: (resp) => {
                debugger
                this.setState({
                    questions: resp.questions,
                    formName: resp.formName,
                    formCost: resp.formCost
                })
            }
        })
    }

    formQuestionChanged = (e) => {
        let name = e.target.name
        let value = e.target.value

        this.setState({
            answers: Object.assign(this.state.answers, {
                [name]: value
            })
        })
    }

    purchaseForm = () => {
        // moves answers from a key value format to an array of rows format
        let transformedAnswers = Object.keys(this.state.answers).map(key => {
            return {
                answer: this.state.answers[key],
                formQuestionId: key
            }
        })

        $.ajax({
            url: '/purchaseForm/purchaseForm',
            method: 'post',
            data: {
                answers: JSON.stringify(transformedAnswers),
                formId: this.formId
            },
            success: () => {
                window.location = '/user'
            }
        })
    }

    handleChange = (e) => {
        let newAnswers = this.state.answers
        newAnswers[e.formQuestionId] = e.answer

        this.setState({
            answers: newAnswers
        })
    }


    render() {
        const questionsDom = this.state.questions.map((el, i) => {
            if (el.questions) {
                // el is a container question
                return <AskQuestionContainer 
                            key={i}
                            label={el.label} 
                            questions={el.questions}
                            onChange={this.handleChange} />
            } else {
                // el is a regular question
                return <AskQuestion 
                            key={i} 
                            label={el.label} 
                            type={el.type}
                            formQuestionId={el.formQuestionId}
                            onChange={this.handleChange}/>
            }
        })


        return (
            <div>
                <h1>{this.state.formName}</h1>
                <h2>This form costs: ${this.state.formCost}</h2>
                <div className="pure-form">
                    {questionsDom}
                    <StripePayment />
                    <input type="button" className="pure-button pure-button-primary" value="Purchase Form" onClick={this.purchaseForm} />
                </div>
            </div>
        )
    }
}