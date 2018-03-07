import React, { Component } from 'react'

export default class ConditionalQuestion extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<input type="text" placeholder="Label" />
                <input type="button" value="Delete"/>
			</div>
		)
	}
}
