import React, { Component } from 'react';
import uuid from 'uuid/v4';
import moment from 'moment';
import PreviewCompatibleImage from '../PreviewCompatibleImage'
import OptionsForm from './options-form';

class OptionsFormContainer extends Component {
    
    constructor(props) {
        super(props);

        // console.log(props)
        const mainImage = props.product.mainImage
        const gallery = props.product.gallery
        const product = this.props.data

        this.state = {
            mainImage,
            gallery,
            product: product,
            cart: {
                id: "",
                date: "",
                items: []
            }            
        };

        this.updateImage = this.updateImage.bind(this);
    }

    updateImage(color) {
        const newImage = this.props.product.images.find(image => image.file.url.includes(color));

        this.setState({
            url: newImage.file.url,
            alt: newImage.description
        });
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
            <div className="container">
                <div className="row content">
                    <div className="col-6">
                        <PreviewCompatibleImage className="main-image__item" imageInfo={this.state.mainImage} />                    
                        <div className="row">
                            {this.state.gallery.map((img, i) => (
                                <div key={i} className="col gallery__item">
                                    <PreviewCompatibleImage imageInfo={img} />
                                </div>
                            ))}                                  
                        </div>                      
                    </div>    
                    <div className="col-6">
                        <h2>{this.props.product.title}</h2>
                        <hr />
                        <p>{this.props.product.description}</p>
                        <p>{this.props.product.description}</p>
                        <OptionsForm
                            product={this.props.product}                        
                            onFormSubmit={this.props.onFormSubmit}
                        // onColorChange={this.updateImage}
                        />
                        {/*
                        <h2>Your Cart (Should be in the header)</h2>
                        <p>This is an instant purchase option</p>
                        <Checkout
                            cart={this.state.cart}
                            product={this.props.product}
                            removeFromCart={this.removeFromCart}
                            removeAllFromCart={this.removeAllFromCart}
                            onFormSubmit={this.handleFormSubmit} 
                        />   */}                     
                    </div>                                
                </div>            
            </div>
        )
    }
}

export default OptionsFormContainer;