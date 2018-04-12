import React, { Component } from 'react'

import StateSelect from '../shared/StateSelect.jsx'

import 'css/pure.min.css'
import 'css/gravitons.css'
import 'css/components/question.scss'

export default class FormSearch extends Component {
	constructor(props) {
		super(props)

		this.state = {
			forms: [],
			filters: {
				formName: '',
				formCost: 0,
				attorneyName: '',
				state: ''
			}
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

	onFilterChange = (e) => {

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

				<div className="df pure-form">
					<div>
						<label>Form Name</label>
						<input type="text" 
							placeholder="Form Name" 
							value={this.filters.formName} 
							name="formName"
							onChange={this.onFilterChange}/>
					</div>
					<div>
						<label>Form Cost</label>
						<input type="number" 
							placeholder="Form Cost"
							value={this.filters.formCost}
							name="formCost"
							onChange={this.onFilterChange}/>
					</div>
					<div>
						<label>Attorney Name</label>
						<input type="text" 
							placeholder="Attorney Name"
							value={this.filters.attorneyName}
							name="attorneyName"
							onChange={this.onFilterChange}/>
					</div>
					<div>
						<label>State</label>
						<StateSelect 
							allStatesOption={true}
							value={this.filters.state}
							name="state"
							onChange={this.onFilterChange}/>
					</div>
				</div>

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
