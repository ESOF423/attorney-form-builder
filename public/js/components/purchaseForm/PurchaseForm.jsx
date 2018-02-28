import React, { Component } from 'react'

function Text(props) {
    return (
        <div>
            <label>{props.label}</label>
            <input type="text"/>
        </div>
    )
}

export default class PurchaseForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            questions: []
        }

        this.getQuestions()
    }

    getQuestions = () => {
        $.ajax({
            url: '/purchaseForm/getQuestions',
            data: {
                formId: 1
            },
            success: (resp) => {
                this.setState({
                    questions: resp.qusetions
                })
            } 
        })
    }

    render() {
        const questionsDom = this.state.questions.map(question => {
            if (question.templateName == "text"){
                return <Text label={questions.label} />
            }
        })

        return (
            <div>
                <h1>Will 2018</h1>
                <div>

                </div>
            </div>
        )
    }
}