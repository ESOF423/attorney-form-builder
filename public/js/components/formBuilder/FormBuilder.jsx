import React, { Component } from 'react'

import 'css/pure.min.css'

import Question from './Question.jsx'
import QuestionContainer from './QuestionContainer.jsx'

export default class FormBuilder extends Component {
	constructor(props) {
		super(props)

		this.state = {
			questions: []
		}
	}

	onChange = (newQuestions) => {
		console.log(newQuestions)
		this.setState({
			questions: newQuestions
		})
	}

	render() {
		
		return (
			<div>
				<h1>Form Builder</h1>

				<form className="pure-form">
					<QuestionContainer isRoot={true} questions={this.state.questions} onChange={this.onChange}/>
				</form>
			</div>
		)
	}
}
