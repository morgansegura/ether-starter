import React from 'react';
import PreviewCompatibleImage from '../PreviewCompatibleImage'
import {
    convertWholeDollarsToCents,
    convertCentsToWholeDollars,
    pluralize,
    calculateProductTotals
} from '../../helpers.js';

let stripeHandler = undefined;

class Cart extends React.Component {
    constructor(props) {
        super(props);

        const mainImage = props.product.mainImage
        const gallery = props.product.gallery

        this.state = {
            mainImage,
            gallery
        }

        this.renderStatus = this.renderStatus.bind(this);
        this.renderCartItems = this.renderCartItems.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.openStripeCheckout = this.openStripeCheckout.bind(this);
        console.log(this.props)
    }

    componentDidMount() {
        stripeHandler = window.StripeCheckout.configure({
            key: 'pk_test_U78fJAAuXr0aN5ETF5qSNR1n',
            // key: 'pk_live_ts7XFZ2zJkFd1qvStBtdiqW2',
            locale: 'auto',
        });
    }

    openStripeCheckout(event) {
        event.preventDefault();

        // const image = this.props.product.images.find(image => image.file.url.includes('black'));
        const image = this.props.product.images.find(image => image.file.url.includes('black'));
        const imageUrl = image.file.url;
        const cartItems = this.props.cart.items;
        const totals = calculateProductTotals(cartItems);

        stripeHandler.open({
            name: 'Unicorn Mart',
            image: imageUrl,
            description: `${totals.amount} unicorn${pluralize(totals.amount)}`,
            zipCode: true,
            billingAddress: true,
            shippingAddress: true,
            amount: convertWholeDollarsToCents(totals.price),
            token: (token, args) => {
                fetch('https://exec.clay.run/njosefbeck/stripe-checkout', {
                    method: 'POST',
                    body: JSON.stringify({
                        token,
                        args,
                        cart: this.props.cart,
                        charge: {
                            amount: totals.price,
                            currency: 'USD'
                        },
                    })
                })
                .then(response => response.json())
                .then(json => {
                    this.props.removeAllFromCart();
                    return console.log(json);
                })
                .catch(error => {
                    console.log('Fetch failed:' + error);
                });
            }
        });
    }

    renderStatus() {
        const cartItems = this.props.cart.items;
        let status = "Nothing in your cart yet :(.";

        if (cartItems.length) {
            const totals = calculateProductTotals(cartItems);
            status = `It looks like you're buying <strong>${totals.amount} unicorns</strong> for a grand total of <strong>$${convertCentsToWholeDollars(totals.price)}</strong>. Sweet!`;
        }

        return { __html: status };
    }

    removeFromCart(id) {
        this.props.removeFromCart(id);
    }

    renderCartItems() {
        return this.props.cart.items.map(item => {

            // // Render proper image
            // const image = this.props.product.images.find(image => image.file.url.includes(item.color));

            return (
                <li className="cart-item" key={item.id}>
                    <div className="btn btn--tiny btn__grey-outline btn__round cancel" onClick={(e) => this.removeFromCart(item.id)}> <i className="fas fa-times"></i>remove</div>
                    <PreviewCompatibleImage className="main-image__item" imageInfo={this.state.mainImage} /> 
                    <p className="description">{item.amount} {item.size}, {item.color} <br /> unicorns</p>
                    <p className="price">${item.price}</p>
                </li>
            );
        });
    }

    render() {
        if (!this.props.cart.items.length) {

            return <p className="status" dangerouslySetInnerHTML={this.renderStatus()} />;

        } else {

            return (
                <div>
                    <p className="status" dangerouslySetInnerHTML={this.renderStatus()} />
                    <div className="btn__block">
                        <button className="btn btn--sm btn__cta btn__sm-round buy mr-5 my-10" name="buy" onClick={(e) => this.openStripeCheckout(e)}>Buy Now!</button>
                        <button className="btn btn--sm btn__grey-outline btn__sm-round clear-cart ml-5 my-10" name="clear-cart" onClick={this.props.removeAllFromCart}>Clear All</button>
                    </div>
                    <ul className="cart-items">
                        {this.renderCartItems()}
                    </ul>
                </div>
            );
        }
    }
}

export default Cart;