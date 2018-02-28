import React, { Component } from 'react'


export default class User extends Component {
    constructor(props) {
        super(props)

        this.state = {
            purchasedForms: []
        }

        this.getForms()
    }

    getForms = () => {
        $.ajax({
            url: "/user/getForms",
            success: (resp) => {
                this.setState({
                    purchasedForms: resp.forms
                })
            }
        })
    }

    render() {
        const usersForms = this.state.purchasedForms.map((formData, i) => {
            return (
                <tr key={i}>
                    <td>{formData.formName}</td>
                    <td>{formData.cost}</td>
                    <td>{formData.date}</td>
                    <td><a href={formData.downloadLink}>Download</a></td>
                </tr>
            )
        })
        return (
            <div>
                <h1>User Page</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Date</th>
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersForms}
                    </tbody>
                </table>

                <a href="/formSearch">Search for Forms</a>
            </div>
        )
    }
}