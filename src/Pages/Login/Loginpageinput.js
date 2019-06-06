import React from 'react';

const Loginpageinput = (props) => {

    const { inputTitle, inputName, inputType, handleInput, value } = props

    
    return(
        <div>
            <label htmlFor={inputName}>{inputTitle}</label>
            <input onChange={handleInput} value={value} type={inputType} name={inputName}></input>
            {props.children}
        </div>
    )
}

export default Loginpageinput;