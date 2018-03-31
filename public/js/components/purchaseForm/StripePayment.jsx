import React, { Component } from 'react';

import 'css/stripe.css'

export default class StripePayment extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // Create a Stripe client.
        var stripe = Stripe('pk_test_yrTEzaaBauHvjnPFIlBQBwFJ');

        // Create an instance of Elements.
        var elements = stripe.elements();

        // Custom styling can be passed to options when creating an Element.
        // (Note that this demo uses a wider set of styles than the guide below.)
        var style = {
            base: {
                color: '#32325d',
                lineHeight: '18px',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aab7c4'
                }
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a'
            }
        };

        // Create an instance of the card Element.
        var card = elements.create('card', { style: style });

        // Add an instance of the card Element into the `card-element` <div>.
        card.mount('#card-element');

        // Handle real-time validation errors from the card Element.
        card.addEventListener('change', function (event) {
            var displayError = document.getElementById('card-errors');
            if (event.error) {
                displayError.textContent = event.error.message;
            } else {
                displayError.textContent = '';
            }
        });

        // Handle form submission.
        var form = document.getElementById('payment-form');
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            stripe.createToken(card).then(function (result) {
                if (result.error) {
                    // Inform the user if there was an error.
                    var errorElement = document.getElementById('card-errors');
                    errorElement.textContent = result.error.message;
                } else {
                    // Send the token to your server.
                    stripeTokenHandler(result.token);
                }
            });
        });
    }

    render() {
        return (
            <div>
                <form action="/charge" method="post" id="payment-form">
                    <div className="form-row">
                        <label htmlFor="card-element">Credit or debit card</label>
                        <div id="card-element"></div>
                        <div id="card-errors" role="alert"></div>
                    </div>
                    <button>Submit Payment</button>
                </form>
            </div>
        );
    }
}