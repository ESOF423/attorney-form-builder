import React, { Component } from 'react'

import 'css/pure.min.css'
import 'css/gravitons.css'
import 'css/components/formBuilder.scss'

import Question from './Question.jsx'
import QuestionContainer from './QuestionContainer.jsx'
import StateSelect from '../shared/StateSelect.jsx'
import FormTemplate from './FormTemplate.jsx'

export default class FormBuilder extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			cost: '',
			state: '',
			questions: [],
			template: ''
		}
	}

	onQuestionsChange = (newQuestions) => {
		this.setState({
			questions: newQuestions
		})
	}

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	submit = () => {
		$.ajax({
			url: '/formBuilder/submitForm',
			method: 'post',
			data: {
				name: this.state.name,
				cost: this.state.cost,
				state: this.state.state,
				questions: JSON.stringify(this.state.questions),
				template: this.state.template
			},
            success: (resp) => {
                alert('success')
            }
		})
	}

	render() {

		
		return (
			<div className="form-builder-container">
				<h1>Form Builder</h1>

				<h2>General Information</h2>
				
				<form className="pure-form df">
					<div className="mr1">
						<label>Form Name</label>
						<input 
							type="text"
							placeholder="Form Name"
							name="name"
							value={this.state.name} 
							onChange={this.onChange}/>
					</div>
					
					<div className="mr1">
						<label>Form Cost</label>
						<input type="number"
							placeholder="Form Cost"
							name="cost"
							min="0"
							step="0.25"
							value={this.state.cost}
							onChange={this.onChange}/>
					</div>

					<div>
						<label>State</label>
						<StateSelect name="state" value={this.state.state} onChange={this.onChange}/>
					</div>
				</form>

				<form className="pure-form my2">
					<h2>Questions to be asked</h2>
					<p>
						Before purchasing your form, the customer will fill out these questions.
					</p>
					<QuestionContainer isRoot={true} questions={this.state.questions} onChange={this.onQuestionsChange}/>

					<h2>Document to be displayed</h2>
					<p>
						This is where you enter your form legal language with the variables or containers specified above.
					</p>

					<FormTemplate value={this.state.template} onChange={this.onChange} questions={this.state.questions}/>
				</form>

				
				
				<div className="mt1">
					<input type="button" className="pure-button pure-button-primary" value="Submit" onClick={this.submit}/>
				</div>
			</div>
		)
	}
}
