import React, { Component } from 'react'

export default class Question extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<input type="text" placeholder="Label" />
                <select>
                    <option value="" disabled selected>Type</option>
                    <option>Textbox</option>
                </select>
                <input type="button" value="Delete"/>
			</div>
		)
	}
}
