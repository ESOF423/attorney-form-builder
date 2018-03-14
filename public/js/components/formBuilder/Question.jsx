import React, { Component } from 'react'

import 'css/components/question.scss'

export default class Question extends Component {
	constructor(props) {
		super(props)
	}

	onChange = (e) => {
		this.props.onChange({
			[e.target.name]: e.target.value
		})
	}

	onDelete = (e) => {
		this.props.onDelete()
	}

	render() {
		return (
			<div>
				<input 
					type="text"
					name="label" 
					value={this.props.label} 
					onChange={this.onChange} 
					placeholder="Label"
				/>

                <select name="type" value={this.props.type} onChange={this.onChange}>
                    <option value="" disabled>Type</option>
                    <option>Textbox</option>
				</select>

				<span onClick={this.onDelete}>
					<i className="fas fa-minus-circle delete-button"></i>
				</span>
				
			</div>
		)
	}
}
