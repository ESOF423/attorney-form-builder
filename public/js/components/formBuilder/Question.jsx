import React, { Component } from 'react'

import 'css/components/question.scss'

export default class Question extends Component {
	constructor(props) {
		super(props)
	}

	onChange = (e) => {
		this.props.onChange(Object.assign({
			label: this.props.label,
			type: this.props.type
		}, {
			[e.target.name]: e.target.value
		}))
	}

	render() {
		return (
			<div className="m1">
				<input 
					type="text"
					name="label" 
					value={this.props.label} 
					onChange={this.onChange} 
					placeholder="Label"
					className="mr1"
				/>

                <select name="type" value={this.props.type} onChange={this.onChange} className="mr1">
                    <option value="" disabled>Type</option>
                    <option>Textbox</option>
				</select>

				<span onClick={this.props.onDelete}>
					<i className="fas fa-minus-circle delete-button"></i>
				</span>
				
			</div>
		)
	}
}
