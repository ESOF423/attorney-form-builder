import React, { Component } from 'react'
import 'css/pure.min.css'
import 'css/gravitons.css'
import 'css/components/question.scss'

import Question from './Question.jsx'
import QuestionContainer from './QuestionContainer.jsx'
import FormBuilder from './FormBuilder.jsx'
import StateSelect from '../shared/StateSelect.jsx'

export default class FormTemplate extends Component {
	constructor(props) {
		super(props)

		this.state = {
			questions: []
			labels: []
			let insertLabel = QuestionContainer.label()
		}
		
		addLabel = () => {
			let labels = this.props.labels
			labels.push ({
				labels: ' ',
				labels: []
			})
			this.onChange({
				labels: labels,
				labels.this.props.labels
			})
		}

		changeLabel = (i, data) => {
			let labels = this.props.labels
			label[i] = data
			this.onChange({
				labels.this.props.labels
				labels: labels
			})
		}

		deleteLabel = (i, data) => {
			let labels = this.props.labels
			labels.splice(i, 1)

			this.onChange({
			lables: this.props.labels
			labels:labels
			})
		}



	}