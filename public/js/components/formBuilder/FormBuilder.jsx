import React, { Component } from 'react'

import 'css/pure.min.css'

import Question from './Question.jsx'
import ConditionalQuestion from './ConditionalQuestion.jsx'

export default class FormBuilder extends Component {
	constructor(props) {
		super(props)

		this.state = {
			questions: []
		}
	}

	addQuestion = () => {
		this.setState({
			questions: this.state.questions.concat({
				label: '',
				type: null
			})
		})
	}

	addConditional = () => {
		this.setState({
			questions: this.state.questions.concat({
				conditional: true,
				label: '',
				questions: []
			})
		})
	}

	render() {
		let questions = this.state.questions.map((questionData, i) => {
			if (questionData.conditional){
				return <ConditionalQuestion key={i} label={questionData.label}/>
			} else {
				return <Question key={i} />
			}
			
		})

		return (
			<div>
				<h1>Form Builder</h1>

				<div>{questions}</div>
				<input type="button" value="New Question" className="pure-button" onClick={this.addQuestion}/>
				<input type="button" value="New Conditional" className="pure-button" onClick={this.addConditional}/>
			</div>
		)
	}
}
