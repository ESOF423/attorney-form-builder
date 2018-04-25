import React, { Component } from 'react'

import StripePayment from './StripePayment.jsx'
import AskQuestion from './AskQuestion.jsx'
import AskQuestionContainer from './AskQuestionContainer.jsx'

import 'js/lib/dentist.min.js'
import 'css/pure.min.css'
import 'css/general.css'
import 'css/gravitons.css'

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
        this.isAttorney = (urlParts && urlParts.attorney) ? urlParts.attorney == "true" : false
        
        this.getFormData()
    }

    getFormData = () => {
        $.ajax({
            url: '/purchaseForm/getFormData',
            data: {
                formId: this.formId
            },
            success: (resp) => {
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

    purchaseForm = (stripeToken) => {
        // moves answers from a key value format to an array of rows format
        let transformedAnswers = Object.keys(this.state.answers).map(key => {
            return {
                answer: this.state.answers[key],
                formQuestionId: key
            }
        })

        if (this.isAttorney) {
            $("#attorneySubmitForm").submit()
        } else {
            $.ajax({
                url: '/purchaseForm/purchaseForm',
                method: 'post',
                data: {
                    answers: JSON.stringify(transformedAnswers),
                    formId: this.formId,
                    stripeToken: stripeToken
                },
                success: (er) => {
                    window.location = '/user'
                }
            })
        }
        
    }

    handleChange = (e) => {
        let newAnswers = this.state.answers
        
        if (this.isAttorney){
            newAnswers[e.label] = {
                answer: e.answer,
                containerLabel: e.containerLabel
            }
        } else {
            newAnswers[e.formQuestionId] = e.answer
        }

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
            <div className="container">
                <h1>{this.state.formName}</h1>
                <h2>This form costs: ${this.state.formCost}</h2>
                <div className="pure-form">
                    {questionsDom}
                    {this.isAttorney}
                    {
                        !this.isAttorney &&
                        <StripePayment onSubmit={this.purchaseForm} isAttorney={this.isAttorney}/>
                    } 
                </div>
                

            {
                this.isAttorney &&
                <form id="attorneySubmitForm" action="/purchaseForm/purchaseForm" method="POST">
                    <input type="submit" className="pure-button" value="Download Form"/>
                    <input type="hidden" name="formId" value={this.formId}/>
                    <input type="hidden" name="answers" value={JSON.stringify(Object.keys(this.state.answers).map(key => {
                        return {
                            answer: this.state.answers[key].answer,
                            questionLabel: key,
                            containerLabel: this.state.answers[key].containerLabel
                        }
                    }))}/>
                    <input type="hidden" name="isAttorney" value="true"/>
                </form>
            }
            </div>
        )
    }
}