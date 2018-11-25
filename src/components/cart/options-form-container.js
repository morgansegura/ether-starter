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
    // handleFormSubmit(product) {
    //     const items = [...this.state.cart.items, product];
    //     this.setState({
    //         cart: {
    //             id: uuid(),
    //             date: moment().format('MMMM Do YYYY, h:mm:ss a'),
    //             items
    //         }
    //     });
    // }
    // removeFromCart(productId) {
    //     let items = [];

    //     if (this.state.cart.items.length > 1) {
    //         items = this.state.cart.items.filter(item => item.id !== productId);
    //     }

    //     this.setState({
    //         cart: {
    //             id: uuid(),
    //             date: moment().format('MMMM Do YYYY, h:mm:ss a'),
    //             items
    //         }
    //     })
    // }

    // removeAllFromCart() {
    //     this.setState({
    //         cart: {
    //             id: '',
    //             date: '',
    //             items: []
    //         }
    //     })
    // }


    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <h1 className="product__title">
                        {this.props.product.title}
                    </h1>
                    <p className="product__paragraph">
                        {this.props.product.description}
                    </p>                
                </div>
                <div className="col-12 col-md-8">
                    <div className="product__main-image">
                        <PreviewCompatibleImage imageInfo={this.state.mainImage} />
                    </div>
                    
                    <div className="row">
                        {this.state.gallery.map((img, i) => (
                            <div key={i} className="col product__gallery-image">
                                <PreviewCompatibleImage imageInfo={img} />
                            </div>
                        ))}                                  
                    </div>                      
                </div>    
                <div className="col-12 col-md-4">
                    <OptionsForm
                        product={this.props.product}
                        onFormSubmit={this.props.onFormSubmit}
                    // onColorChange={this.updateImage}
                    />                    
                </div>
            </div>            
        )
    }
}

export default OptionsFormContainer;