import React from 'react';

const OptionField = (props) => {

    if (props.field === 'color') {
        const options = props.product.color
        const optionRow = options.color
        const stateOption = props.state.color

    } else if (props.field === 'size') {
        const options = props.product.size.size
    }

    
    return (
        
        <div>
            <span className="label">Color: {stateOption}</span>
            <div className="d-flex">
                {options.map((c, i) => {
                    return (
                    <div key={i} className="d-flex align-items-center color-input mr-5 mb-5">
                        <input
                            className={`radio__color-${c.color.toLowerCase()}`}
                            style={{ backgroundColor: c.hex }}
                            type="radio"
                                checked={stateOption === c.color}
                            onChange={this.handleInputChange}
                            name="color"
                            value={c.color}
                        />
                        <label>{c.color}</label>
                    </div>
                    )
                })}
            </div>
            :
            <div className="d-flex">
                <select
                    multiple={false}
                    name={'options.title'}
                    onChange={this.handleInputChange}
                    defaultValue={'this.state.options[i]'}
                >
                    {options.map((c, i) => (
                        <option key={i} name="color" value={c.color}>{c.color}</option>
                    ))}
                </select>
            </div>            
        </div>

    );
};

export default OptionField;