import React from 'react';

const OptionField = (props) => {

    console.log(props)

    if (props.product.style === 'radioList') {
        console.log('this checks out')
    }

    return (       
        <div> 
            {props.field && props.field === 'color' && props.product.color.style && props.product.color.style === 'radioList' ?
            <div>            
                <span className="label">Color: {props.state.color}</span>
                <div className="d-flex">
                    {props.product.color.color.map((c, i) => {
                        return (
                        <div key={i} className="color-input mr-5 mb-5">
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
            <select
                multiple={false}
                name="color"
                onChange={props.handleInputChange}
                defaultValue={props.product.color.color[0]}
            >
                {props.product.color.color.map((c, i) => (
                    <option key={i} name="color" value={c.color}>{c.color}</option>
                ))}
            </select>
        }
        {props.field && props.field === 'color' && props.product.style && props.product.size.style === 'radioList' ?

            <div className="d-flex">
                {props.product.size.size.map((c, i) => {
                    return (
                        <div key={i} className="d-flex align-items-center color-input mr-5 mb-5">
                            <input
                                type="radio"
                                checked={props.state.size === c.size}
                                onChange={props.handleInputChange}
                                name="color"
                                value={c.size}
                            />
                            <label>{c.short}</label>
                        </div>
                    )
                })}
            </div>           
        : 
            <div className="d-flex">
                <select
                    multiple={false}
                    name={props.state.size}
                    onChange={props.handleInputChange}
                    defaultValue={props.product.size.size[0]}
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