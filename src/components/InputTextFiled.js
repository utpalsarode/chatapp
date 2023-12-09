import React from 'react'
// ** Reactstrap Imports
import { FormFeedback, Input } from 'reactstrap'
// import InvoiceTooltip from '../InvoiceTooltip'

const InputTextField = ({ height, value, placeholder, name, id, handleChange, label, secondHandleBlur, handleBlur, autoComplete, disabled, onKeyDown, toUpperCase, onKeyUp, type, onKeyPress, autoFocus, maxLength, minLength, invalid, min, max, errors, touched, tooltipText, handleFocus, isRequired, className }) => {

    return (
        <>
            <Input
                className={className}
                value={value}
                placeholder={placeholder}
                name={name}
                id={id}
                onChange={(e) => handleChange(name, toUpperCase ? (e.target.value).toUpperCase() : e.target.value)}
                onBlur={secondHandleBlur ? () => { handleBlur(name); secondHandleBlur() } : () => handleBlur(name)}
                autoComplete={autoComplete}
                type={type}
                autoFocus={autoFocus}
                disabled={disabled}
                onFocus={handleFocus}
                onKeyPress={(event) => {
                    if (onKeyPress && !onKeyPress.test(event.key)) {
                        event.preventDefault()
                    }
                }}
                height={height}
                maxLength={maxLength}
                minLength={minLength}
                min={min}
                max={max}
                invalid={invalid}
                onKeyDown={onKeyDown}



            />
            {errors && touched && (
                <FormFeedback tooltip={true} className='text-start'>
                    {errors}
                </FormFeedback>
            )}

        </>
    )
}

export default InputTextField
