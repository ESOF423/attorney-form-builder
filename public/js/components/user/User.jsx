import React, { Component } from 'react'


export default class User extends Component {
    constructor(props) {
        super(props)

        this.state = {
            purchasedForms: [{
                name: 'Will 2018',
                cost: '$2',
                date: '02/4/2018',
                downloadLink: 'http://www.google.com'
            }]
        }
    }

    render() {
        const usersForms = this.state.purchasedForms.map((formData) => {
            return (
                <tr>
                    <td>{formData.name}</td>
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