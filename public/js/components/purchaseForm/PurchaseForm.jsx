import React, { Component } from 'react'

// import StripePayment from './StripePayment.jsx'
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
            answers: {}
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
                this.setState({
                    questions: resp.questions,
                    formName: resp.formName
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
        $.ajax({
            url: '/purchaseForm/purchaseForm',
            method: 'post',
            data: {
                answers: JSON.stringify(this.state.answers),
                formId: this.formId
            },
            success: () => {
                window.location = '/user'
            }
        })
    }


    render() {
        // const questionsDom = this.state.questions.map((question, i) => {
        //     if (question.templateName.toLowerCase() == "textbox"){
        //         return (
        //             <div key={i}>
        //                 <label>{question.label}</label><br/>
        //                 <input type="text" name={question.formQuestionId} onChange={this.formQuestionChanged}/>
        //             </div>
        //         )
        //     }
        // })


        const questionsDom = this.state.questions.map((el, i) => {
            if (el.questions) {
                // el is a container question
                return <AskQuestionContainer key={i} label={el.label} questions={el.questions} />
            } else {
                // el is a regular question
                return <AskQuestion key={i} label={el.label} type={el.type} />
            }
        })


        return (
            <div>
                <h1>{this.state.formName}</h1>
                <form className="pure-form">
                    {questionsDom}
                    {/* <StripePayment /> */}
                    <input type="button" className="pure-button pure-button-primary" value="Purchase Form" onClick={this.purchaseForm} />
                </form>
            </div>
        )
    }
}