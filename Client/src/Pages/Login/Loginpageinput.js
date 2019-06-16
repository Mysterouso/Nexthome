import React from 'react';

const Loginpageinput = (props) => {

    const { inputTitle, inputName, inputType, handleInput, value } = props
    
    return(
        <React.Fragment>
        { props.blur ? (
             <div>
                <label htmlFor={inputName}>{inputTitle}</label>
                <input onChange={handleInput} value={value} type={inputType} name={inputName}
                onBlur={props.blur}
                onFocus={props.focus}></input>
                {props.children}
            </div>
        ):( <div>
                <label htmlFor={inputName}>{inputTitle}</label>
                <input onChange={handleInput} value={value} type={inputType} name={inputName}
                ></input>
                {props.children}
            </div>)
    }
    </React.Fragment>
       
    )
}

export default Loginpageinput;