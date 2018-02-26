import React, { Component } from 'react'

export default class FormSearch extends Component {
	constructor(props) {
		super(props)

		this.state = {
			forms: [{
                name: 'Will 2018',
                cost: '2$',
                attorney: 'Bill Waterson'
			}]
		}
	}

	render() {
		const forms = this.state.forms.map(form => {
			return (
				<tr>
					<td>{form.name}</td>
					<td>{form.cost}</td>
					<td>{form.attorney}</td>
					<td>
						<a href="http://www.google.com">Purchase</a>
					</td>
				</tr>
			)
		})

		return (
			<div>
				<h1>Search for Forms</h1>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Cost</th>
							<th>Attorney</th>
							<th>Purchase</th>
						</tr>
					</thead>
					<tbody>{forms}</tbody>
				</table>
			</div>
		)
	}
}
