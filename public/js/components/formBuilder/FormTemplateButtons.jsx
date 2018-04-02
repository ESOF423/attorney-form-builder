import React, { Component } from 'react'

import 'css/pure.min.css'
import 'css/gravitons.css'
import 'css/components/question.scss'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default class FormTemplate extends Component {
	constructor(props) {
		super(props)
	}

	copyToClipboard = str => {
		const el = document.createElement('textarea')
		el.value = str
		el.setAttribute('readonly', '')
		el.style.position = 'absolute'
		el.style.left = '-9999px'
		document.body.appendChild(el)
		el.select()
		document.execCommand('copy')
		document.body.removeChild(el)
	}

	copyVariable = () => {
		let varName = $('#variableSelect')
			.find(':selected')
			.text()
		this.copyToClipboard(`{${varName}}`)
		$('#variableCopiedText')
			.fadeIn(100)
			.delay(2000)
			.fadeOut(100)
	}

	copyContainer = () => {
		let contName = $('#containerSelect')
			.find(':selected')
			.text()
		this.copyToClipboard(`[${contName}\n\n]`)
		$('#containerCopiedText')
			.fadeIn(100)
			.delay(2000)
			.fadeOut(100)
	}

	getVariables = questions => {
		let foundVariables = []
		questions.forEach(question => {
			if (question.hasOwnProperty('questions')) {
				foundVariables = foundVariables.concat(
					this.getVariables(question.questions)
				)
			} else {
                if (question.label){
                    foundVariables.push(question.label)
                }
			}
		})

		return foundVariables
	}

	getContainers = questions => {
		let foundContainers = []
		questions.forEach(question => {
			if (question.hasOwnProperty('questions')) {
                if (question.label){
                    foundContainers.push(question.label)
                }
				
				foundContainers = foundContainers.concat(
					this.getContainers(question.questions)
				)
			}
		})

		return foundContainers
	}

	render() {
        let variables = this.getVariables(this.props.questions).map((el, i) => {
			return <option key={i}>{el}</option>
		})

		let containers = this.getContainers(this.props.questions).map(
			(el, i) => {
				return <option key={i}>{el}</option>
			}
		)

		return (
			<div>
				{variables.length > 0 && (
					<div>
						<label>Variable</label>
						<select id="variableSelect">{variables}</select>
						<input
							type="button"
							value="Copy"
							onClick={this.copyVariable}
						/>
						<span id="variableCopiedText" className="copiedText">
							Copied to clipboard!
						</span>
					</div>
				)}

				{containers.length > 0 && (
					<div>
						<label>Container</label>
						<select id="containerSelect">{containers}</select>
						<input
							type="button"
							value="Copy"
							onClick={this.copyContainer}
						/>
						<span id="containerCopiedText" className="copiedText">
							Copied to clipboard!
						</span>
					</div>
                )}
			</div>
		)
	}
}
