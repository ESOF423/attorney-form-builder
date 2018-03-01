import React, { Component } from 'react'

import '../../../css/pure.min.css'

export default class FormSearch extends Component {
	constructor(props) {
		super(props)

		this.state = {
			forms: [],
			name: '',
			attorney: '',
			cost: ''
		}

		this.getForms()
	}

	getForms = () => {
		$.ajax({
			url: 'formSearch/getForms',
			data: {
				name: this.state.name,
				attorney: this.state.attorney,
				cost: this.state.cost
			},
			success: (resp) => {
				console.log(resp)
				this.setState({
					forms: resp.forms
				})
			}
		})
	}

	handleFilterChange = (e) => {
		const target = e.target
		this.setState({
			[target.name]: target.value
		}, () => {
			this.getForms()
		})
	}

	render() {
		const forms = this.state.forms.map((form, i) => {
			return (
				<tr key={i}>
					<td>{form.formName}</td>
					<td>{form.cost}</td>
					<td>{form.attorneyName}</td>
					<td>
						<a href={`/purchaseForm?formId=${form.formId}`}>Purchase</a>
					</td>
				</tr>
			)
		})

		return (
			<div>
				<h1>Search for Forms</h1>
				<table className="pure-table">
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
