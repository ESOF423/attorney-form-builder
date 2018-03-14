import React, { Component } from 'react'
import swal from 'sweetalert2'

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

	questionChanged = (i, data) => {
		let questions = this.props.questions

		questions[i] = data

		this.onChange({
			label: this.props.label,
			questions: questions
		})
	}

	deleteQuestion = (i) => {
		let questions = this.props.questions

		questions.splice(i, 1)

		this.onChange({
			label: this.props.label,
			questions: questions
		})
	}

	deleteQuestionContainer = (i) => {
		swal({
			type: 'warning',
			title: 'Are you sure?',
			text: 'Deleting a question container will delete ALL of its children questions',
			showCancelButton: true
		}).then((result) => {
			if (result.value){
				this.deleteQuestion(i)
			}
		})
	}

	render() {
		
		var questions = this.props.questions.map((item, i) => {
			if (item.hasOwnProperty('questions')) { // check to see if this question has questions. If this is the case, it is a question container
				return <QuestionContainer 
					key={i} 
					label={item.label} 
					questions={item.questions}
					onChange={(data) => {
						this.questionChanged(i, data)
					}}
					onDelete={() => {
						this.deleteQuestionContainer(i)
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
					onDelete={() => {
						this.deleteQuestion(i)
					}}
				/>
			}
		})
		
		return (
			<div className={`question-container ${!this.props.isRoot ? 'ml1' : ''}`}>
				{ !this.props.isRoot &&
					<div>
						<textarea cols="40" rows="1"
							name="label" 
							placeholder="Condition text" 
							value={this.props.label} 
							onChange={this.labelChanged}
							className="mr1"></textarea>

						<span onClick={this.props.onDelete}>
							<i className="fas fa-minus-circle delete-button"></i>
						</span>
					</div>
				}
				
				<div className={`${!this.props.isRoot ? 'ml2' : ''}`}>
					{questions}
				</div>

				<div className="mt1">
					<input type="button" className="pure-button mr1" value="Add Question"  onClick={this.addQuestion}/>
					<input type="button" className="pure-button" value="Add Container" onClick={this.addQuestionContainer}/>
				</div>
				
			</div>
		)
	}
}
