import React, { Component } from 'react'

import 'css/pure.min.css'
import 'css/gravitons.css'
import 'css/components/question.scss'

import FormTemplateButtons from './FormTemplateButtons.jsx'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default class FormTemplate extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<FormTemplateButtons questions={this.props.questions}/>
				<textarea
					name="template"
					className="template-textarea"
					value={this.props.text} 
					onChange={this.props.onChange}></textarea>
			</div>
		)
	}
}
