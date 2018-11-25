// https://github.com/njosefbeck/unicorn-mart/blob/master/src/pages/index.js

import React, { Component } from 'react';
import uuid from 'uuid/v4';
import OptionField from './partials/optionField';
import Prices from './partials/prices';
import { pluralize, convertCentsToWholeDollars } from '../../helpers.js';

class OptionsForm extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            amount: 0,
            price: 0,
            savings: 0,
            error: '',
            color: 'White',
            size: 'Small'
        };

        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        this.setState({

        })
    }

    handleAmountChange(event) {
        const amount = parseInt(event.target.value, 10);
        let error = '';

        if (isNaN(amount)) {
            error = 'Amount can\'t be blank!';
        }

        const discount = this.props.product.priceDiscount
        let price = this.props.product.price
        price = discount && discount > 0 ? discount : price

        let savings = this.props.product.savings
        savings = savings && savings > 0 ? savings : 0

        this.setState({
            amount,
            price: amount * price,
            savings: savings * amount,
            error
        });
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (isNaN(this.state.amount)) {
            return this.setState({
                error: 'Amount still can\'t be blank!'
            });
        }

        const product = {
            id: uuid(),
            productId: this.props.product.productId,
            amount: this.state.amount,
            savings: this.state.savings,
            price: this.state.price,
            color: this.state.color,
            size: this.state.state,
        };

        this.props.onFormSubmit(product);

        // Reset form values
        this.setState({
            amount: 0,
            price: 0,
            error: '',
            savings: 0,
            colors: this.state.color,
            size: this.state.size
        });
    }

    render() {
        let itemList = this.props.product

        return (
            <form className="form form__product" onSubmit={this.handleSubmit}>

                <Prices state={this.state} product={this.props.product} />

                <div className="card__field">
                    <p className="error">{this.state.error}</p>
                    <p className="label"><span className="b6">Quantity:</span> 
                    <input
                        type="number"
                        name="amount"
                        min="0"
                        value={this.state.amount}
                        onChange={this.handleAmountChange}
                    /></p>
                </div>

                {itemList.color && itemList.color !== null ?  
                <div className="form__element">                    
                    <OptionField handleInputChange={this.handleInputChange} state={this.state} field="color" product={itemList} />
                </div>
                :  
                <div className="form__element">                    
                    <OptionField handleInputChange={this.handleInputChange} state={this.state} field="size" product={itemList} />
                </div>
                }

                <h4 className="t-center my-20">{`Add ${isNaN(this.state.amount) ? '__' : this.state.amount}, ${this.state.size}, ${this.state.color}, ${this.props.product.title}${pluralize(this.state.amount)} for $${isNaN(convertCentsToWholeDollars(this.state.price)) ? '__' : convertCentsToWholeDollars(this.state.price)} to your cart?`}</h4>                 
                <div className="btn__block justify-content-end">
                    <button className="btn btn--sm btn__sm-round btn__submit" type="submit" name="submit">
                        Add to Cart
                    </button>                    
                </div>
            </form>
        );

    }
}

export default OptionsForm;
