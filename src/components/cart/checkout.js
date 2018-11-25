import React, { Component } from "react"

// hardcoded amount (in US cents) to charge users
// you could set this variable dynamically to charge different amounts
const amount = 2500

const buttonStyles = {
    fontSize: "13px",
    textAlign: "center",
    color: "#fff",
    outline: "none",
    padding: "12px 60px",
    boxShadow: "2px 5px 10px rgba(0,0,0,.1)",
    backgroundColor: "rgb(255, 178, 56)",
    borderRadius: "6px",
    letterSpacing: "1.5px",
}

const Checkout = class extends Component {

    state = {
        disabled: false,
        buttonText: "BUY NOW",
        paymentMessage: "",
        amount: 'this.props.product.priceDiscount',
        productTitle: 'this.props.data.title'
    }

    resetButton() {
        this.setState({ disabled: false, buttonText: "BUY NOW" })
    }

    componentDidMount() {
        this.stripeHandler = window.StripeCheckout.configure({
            // You’ll need to add your own Stripe public key to the `checkout.js` file.
            // key: 'pk_test_STRIPE_PUBLISHABLE_KEY',
            key: "pk_test_kuhbxb0MMZsp6fj6aTNDnxUu",
            closed: () => {
                this.resetButton()
            },
        })
    }
    
    openStripeCheckout(event) {
        event.preventDefault()
        this.setState({ disabled: true, buttonText: "WAITING..." })
        this.stripeHandler.open({
            name: this.state.productTitle,
            amount: this.state.amount,
            description: this.state.productTitle,
            token: token => {
                fetch(`AWS_LAMBDA_URL`, {
                    method: "POST",
                    mode: "no-cors",
                    body: JSON.stringify({
                        token,
                        amount,
                    }),
                    headers: new Headers({
                        "Content-Type": "application/json",
                    }),
                })
                    .then(res => {
                        console.log("Transaction processed successfully")
                        this.resetButton()
                        this.setState({ paymentMessage: "Payment Successful!" })
                        return res
                    })
                    .catch(error => {
                        console.error("Error:", error)
                        this.setState({ paymentMessage: "Payment Failed" })
                    })
            },
        })
    }

    render() {
        console.log(this.props)
        // console.log(this.state)
        return (
            <div>
                <h4>Spend your Money!</h4>
                <p>
                    Use any email, 4242 4242 4242 4242 as the credit card number, any 3
                    digit number, and any future date of expiration.
                </p>
                <button
                    style={buttonStyles}
                    onClick={event => this.openStripeCheckout(event)}
                    disabled={this.state.disabled}
                >
                    {this.state.buttonText}
                </button>
                {this.state.paymentMessage}
            </div>
        )
    }
}

export default Checkout