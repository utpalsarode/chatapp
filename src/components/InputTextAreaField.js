import React from 'react'
// ** Reactstrap Imports
import { FormFeedback, Input, Label } from 'reactstrap'

const InputTextAreaField = ({ value, placeholder, name, handleChange, label, handleBlur, autoComplete, disabled, autoFocus, maxLength, minLength, invalid, min, max, errors, touched, tooltipText, rows, isRequired }) => {

    return (
        <>
            <div className='identix-max-charat'>
                {label ? <Label className={`form-label ${tooltipText ? 'd-flex align-items-center' : ''} ${isRequired === true ? 'required-star' : ''}`} for={label}>
                    {label}
                </Label> : ''}
                <Input
                    value={value}
                    placeholder={placeholder}
                    name={name}
                    id='identix-text-area'
                    onChange={(e) => handleChange(name, e.target.value)}
                    onBlur={() => handleBlur(name)}
                    autoComplete={autoComplete}
                    type='textarea'
                    rows={rows}
                    autoFocus={autoFocus}
                    disabled={disabled}
                    maxLength={maxLength}
                    minLength={minLength}
                    min={min}
                    max={max}
                    invalid={invalid}
                />
                {errors && touched && (
                    <FormFeedback tooltip={true}>
                        {errors}
                    </FormFeedback>
                )}
                {maxLength && value? <div className='max-charat'>{maxLength - value.length}</div> : ''}
            </div>
        </>
    )
}

export default InputTextAreaField
