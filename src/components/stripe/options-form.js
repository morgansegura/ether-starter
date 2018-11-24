// https://github.com/njosefbeck/unicorn-mart/blob/master/src/pages/index.js

import React, { Component } from 'react';
import uuid from 'uuid/v4';
import OptionField from '../partials/optionField';
import { pluralize, convertCentsToWholeDollars } from '../../helpers.js';

class OptionsForm extends Component {
    constructor(props) {
        super(props);

        // const options = this.props.product.options

        this.state = {
            amount: 0,
            price: 0,
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

        this.setState({
            amount,
            price: amount * this.props.product.price,
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

        if (isNaN(this.state.amount)) {
            return this.setState({
                error: 'Amount still can\'t be blank!'
            });
        }

        const product = {
            id: uuid(),
            productId: this.props.product.productId,
            amount: this.state.amount,
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
            colors: this.state.color,
            size: this.state.size
        });
    }

    render() {
        let itemList = this.props.product
        // console.log(itemList.color)

        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <div className="form-element">
                    <p className="error">{this.state.error}</p>
                    <label>
                        <p className="label"><span>Quantity:</span> 
                        <input
                            type="number"
                            name="amount"
                            min="0"
                            value={this.state.amount}
                            onChange={this.handleAmountChange}
                            /></p>
                    </label>
                </div>

                {itemList.color && itemList.color !== null ?  
                <div className="form-element">                    
                    <OptionField handleInputChange={this.handleInputChange} state={this.state} field="color" product={itemList} />
                </div>
                :  
                <div className="form-element">                    
                    <OptionField handleInputChange={this.handleInputChange} state={this.state} field="size" product={itemList} />
                </div>
                }

                <h4 className="t-center my-20">{`Add ${isNaN(this.state.amount) ? '__' : this.state.amount}, ${this.state.size}, ${this.state.color}, ${this.props.product.title}${pluralize(this.state.amount)} for $${isNaN(convertCentsToWholeDollars(this.state.price)) ? '__' : convertCentsToWholeDollars(this.state.price)} to your cart?`}</h4>                 
                <div className="btn__block justify-content-end">
                    <button className="btn btn--md btn__sm-round btn__submit" type="submit" name="submit">
                        Buy Now
                    </button>                    
                </div>
            </form>
        );

    }
}

export default OptionsForm;
