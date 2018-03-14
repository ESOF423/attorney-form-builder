import React, { Component } from 'react'

import 'css/components/question.scss'

import Question from './Question.jsx'

export default class QuestionContainer extends Component {
	constructor(props) {
		super(props)
	}

	onChange = (data) => {
		
		// if we are at the root, only return questions (root doesnt have a label)
		if (this.props.isRoot){
			this.props.onChange(this.props.questions)
		} else {
			this.props.onChange(data)
		}
	}

	labelChanged = (e) => {
		this.onChange({
			questions: this.props.questions,
			label: e.target.value
		})
	}

	addQuestion = () => {
		let questions = this.props.questions

		questions.push({
			label: '',
			type: ''
		})

		this.onChange({
			questions: questions,
			label: this.props.label
		})
	}

	addQuestionContainer = () => {
		let questions = this.props.questions

		questions.push({
			label: '',
			questions: []
		})

		this.onChange({
			label: this.props.label,
			questions: questions
		})
	}

	questionContainerChanged = (i, data) => {
		debugger
		
		let questions = this.props.questions

		questions[i] = data

		this.onChange(data)
	}

	render() {
		
		var questions = this.props.questions.map((item, i) => {
			if (item.hasOwnProperty('questions')) { // check to see if this question has questions. If this is the case, it is a question container
				return <QuestionContainer 
					key={i} 
					label={item.label} 
					questions={item.questions}
					onChange={(data) => {
						this.questionContainerChanged(i, data)
					}}
				/>
			} else {
				return <Question 
					key={i} 
					label={item.label}
					type={item.type}
					onChange={(data) => {
						this.questionChanged(i, data)
					}}
				/>
			}
		})
		
		return (
			<div>
				{ !this.props.isRoot &&
					<input 
						type="text" 
						name="label" 
						placeholder="Label" 
						value={this.props.label} 
						onChange={this.labelChanged} />
				}
				
				<div className={!this.props.isRoot ? 'ml1' : ''}>
					{questions}
				</div>

				<div>
					<input type="button" value="Add Question" onClick={this.addQuestion}/>
					<input type="button" value="Add Container" onClick={this.addQuestionContainer}/>
				</div>
				
			</div>
		)
	}
}
