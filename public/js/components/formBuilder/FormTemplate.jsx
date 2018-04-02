import React, { Component } from 'react'

import 'css/pure.min.css'
import 'css/gravitons.css'
import 'css/components/question.scss'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default class FormTemplate extends Component {
	constructor(props) {
		super(props)

		this.state = {
			text: ''
		}

		this.modules = {
			toolbar: [
				[{ header: [1, 2, false] }],
				['bold', 'italic', 'underline'],
				['clean']
			]
		}
	}

	handleChange = value => {
		this.setState({
			text: value
		})
	}

	getVariables = (questions) => {
		let foundVariables = []
		questions.forEach(question => {
			if (question.hasOwnProperty("questions")){
				foundVariables = foundVariables.concat(this.getVariables(question.questions))
			} else {
				foundVariables.push(question.label)
			}
		})

		return foundVariables
	}

	getContainers = (questions) => {
		let foundContainers = []
		questions.forEach(question => {
			if (question.hasOwnProperty("questions")){
				foundContainers.push(question.label)
				foundContainers = foundContainers.concat(this.getContainers(question.questions))
			}
		})

		return foundContainers
	}

	render() {
		
		let variables = this.getVariables(this.props.questions).map((el, i) => {
			return <option key={i}>{el}</option>
		})

		let containers = this.getContainers(this.props.questions).map((el, i) => {
			return <option key={i}>{el}</option>
		})

		return (
			<div>			
				<div>
					<div>
						<label>Variable</label>
						<select>{variables}</select>
						<input type="button" value="Copy" onClick={this.copyVariable}/>
					</div>
					<div>
						<label>Container</label>
						<select>
							{containers}
						</select>
						<input type="button" value="Copy"/>
					</div>
				</div>

				<ReactQuill
					value={this.state.text}
					onChange={this.handleChange}
					modules={this.modules}
				/>
			</div>
		)
	}
}
