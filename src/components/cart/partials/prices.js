import React from 'react';
import { convertCentsToWholeDollars } from '../../../helpers.js';

const Prices = (props) => {
    console.log(props)
    let percent = props.product.savings / props.product.price * 100
    let percentPlus = ((props.state.savings / props.state.price) * props.state.amount) * 100
    return (
        <div>
        {
            props.product.priceDiscount > 0 ?
                <div className="prices card__field d-flex align-items-center justify-content-between">
                    <div className="prices__original">
                        <p className="label"><span className="b6">Originally:</span> ${convertCentsToWholeDollars(props.product.price)}</p>
                    </div>
                    <div className="prices__discount">
                        <p className="label"><span className="b6">New Price:</span> ${convertCentsToWholeDollars(props.product.priceDiscount)}</p>
                    </div>
                    <div className="prices__savings">
                        <p className="label"><span className="b6">Savings: </span> 
                                <span>${convertCentsToWholeDollars(props.product.savings)} / {parseFloat(percent.toFixed(1))}% <small>per item</small></span>
                        </p>
                    </div>
                </div>
                :
                    <div className="prices__original">
                    <p className="label"><span className="b6">Price:</span> ${convertCentsToWholeDollars(props.product.price)}</p>
                </div>
            }
        </div>
    );
};

export default Prices;