import React from 'react';

const OptionField = (props) => {

    return (       
        
        <div className="form__options">             
        {props.field === 'color' && props.product.color.style && props.product.color.style === 'radioList' ?
            <div className="card__field">            
                <p className="label"><span className="b6">Color:</span> {props.state.color}</p>
                <div className="d-flex">
                    {props.product.color.color.map((c, i) => {
                        return (
                        <div key={i} className="mr-5 my-5 radio__color">
                            <input
                                className={`radio__color-${c.color.toLowerCase()}`}
                                style={{ backgroundColor: c.hex }}
                                type="radio"
                                checked={props.state.color === c.color}
                                onChange={props.handleInputChange}
                                name="color"
                                value={c.color}
                            />
                            <label>{c.color}</label>
                        </div>
                        )
                    })}
                </div>             
            </div>           
        : 
            <div className="card__field">
                <p className="label"><span className="b6">Color:</span> </p>
                <select
                    multiple={false}
                    name="color"
                    onChange={props.handleInputChange}
                    defaultValue={props.product.color.color[0]}
                    className="my-5"
                >
                    {props.product.color.map((c, i) => (
                        <option key={i} name="color" value={c.color}>{c.color}</option>
                    ))}
                </select>            
            </div>
        }
        {props.field && props.field === 'size' && props.product.size.style && props.product.size.style === 'radioList' ?
            <div className="card__field">
                <p className="label"><span className="b6">Size:</span> {props.state.size}</p>
                <div className="d-flex">
                    {props.product.size.size.map((c, i) => {
                        return (
                            <div key={i} className={c.amount === 0 ? `radio__size mr-5 mb-5 disabled` : `radio__size mr-5 mb-5`}>
                                <input
                                    type="radio"
                                    checked={props.state.size === c.size}
                                    onChange={props.handleInputChange}
                                    name="size"
                                    placeholder={c.short}
                                    value={c.size}
                                    disabled={c.amount === 0 ? true : false}
                                />
                                <label>{c.short}</label>
                                <label className="sold-out">Sold Out</label>
                            </div>
                        )
                    })}
                </div>   
            </div>        
        : 
            <div className="card__field">
                <p className="label"><span className="b6">Size:</span> </p>
                <select
                    multiple={false}
                    name="size"
                    onChange={props.handleInputChange}
                    defaultValue={props.product.size.size[0]}
                    className="my-5"
                >
                    {props.product.size.size.map((c, i) => (
                        <option key={i} name="size" value={c.size}>{c.size}</option>
                    ))}
                </select>
            </div>
        }
        </div>
    )
}

export default OptionField;