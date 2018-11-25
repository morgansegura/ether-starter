import React, { Component } from 'react';
import uuid from 'uuid/v4';
import moment from 'moment';
import OptionsFormContainer from './cart/options-form-container';
import Cart from './cart/cart';


// import { convertWholeDollarsToCents } from '../helpers'

class ShoppingCart extends Component {

    constructor(props) {
        super(props);
        
        const product = this.props.product

        this.state = {
            product: product,
            cart: {
                id: "",
                date: "",
                items: []
            }
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.removeAllFromCart = this.removeAllFromCart.bind(this);
    }

    handleFormSubmit(product) {
        const items = [...this.state.cart.items, product];

        this.setState({
            cart: {
                id: uuid(),
                date: moment().format('MMMM Do YYYY, h:mm:ss a'),
                items
            }
        });
    }

    removeFromCart(productId) {
        let items = [];

        if (this.state.cart.items.length > 1) {
            items = this.state.cart.items.filter(item => item.id !== productId);
        }

        this.setState({
            cart: {
                id: uuid(),
                date: moment().format('MMMM Do YYYY, h:mm:ss a'),
                items
            }
        })
    }

    removeAllFromCart() {
        this.setState({
            cart: {
                id: '',
                date: '',
                items: []
            }
        })
    }    

    render() {

        return (
            <div>
                <OptionsFormContainer
                    product={this.state.product}
                    onFormSubmit={this.handleFormSubmit}                   
                />
                <Cart
                    cart={this.state.cart}
                    product={this.state.product}
                    removeFromCart={this.removeFromCart}
                    removeAllFromCart={this.removeAllFromCart}
                />
            </div>
        );
    }
}

export default ShoppingCart;