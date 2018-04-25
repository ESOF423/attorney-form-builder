import React, { Component } from 'react'

import 'css/pure.min.css'
import 'css/general.css'

export default class Attorney extends Component {
    constructor(props) {
        super(props)

        this.state = {
            forms: []
        }

        this.getForms()
    }

    getForms = () => {
        $.ajax({
            url: '/attorney/getForms',
            success: (resp) => {
                this.setState({forms: resp.forms})
            }
        })
    }

    render() {

        const attorneyForms = this.state.forms.map((formData, i) => {
            return (
                <tr key={i}>
                    <td>{formData.formName}</td>
                    <td>{parseFloat(formData.cost)/100}</td>
                    <td><a href={'/purchaseForm?attorney=true&formId='+formData.formId}>Download</a></td>
                </tr>
            )
        })

        return (
            <div className="container">
            <h1>Attorney Page</h1>

            <table className="pure-table">
                <thead>
                    <tr>
                        <th>Form Name</th>
                        <th>Cost</th>
                        <th>Download</th>
                    </tr>
                </thead>
                <tbody>
                    {attorneyForms}
                </tbody>
            </table>

            <a href="/formBuilder">New Form</a>
            </div>
        )
    }
}