import React, { Component } from 'react'

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
						<a href="http://www.google.com">Purchase</a>
					</td>
				</tr>
			)
		})

		return (
			<div>
				<h1>Search for Forms</h1>
				<div>
					<input placeholder="Name" name="name" value={this.state.name} onChange={this.handleFilterChange} />
					<input placeholder="Attorney" name="attorney" value={this.state.attorney} onChange={this.handleFilterChange} />
					<input placeholder="Cost" name="cost" value={this.state.cost} onChange={this.handleFilterChange} />
				</div>
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
