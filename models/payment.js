const stripe = require("stripe")(
    "sk_test_F0ujkgtxvSMdQroDCahdAhGI"
);

module.exports = {
    makePayment: (amount, source, description) => {
        return new Promise((resolve, reject) => {
            stripe.charges.create({
                amount: parseInt(amount),
                currency: "usd",
                source: source, // obtained with Stripe.js
                description: description
            }, function (err, charge) {
                if (err) {
                    throw err
                } else {
                    resolve()
                }
            });
        })
    }
}