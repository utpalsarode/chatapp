import React, { useState } from "react";
import Select from "react-select";
import { FormFeedback } from "reactstrap";
const CustomSelect = (props = null) => {
  let [inputValue, setInputValue] = useState('')
  const value = props.options.map((element) => {
    if (element.value === props.values) {
      return element;
    }
  });
  
  const handleChange = (values) => {
    // this is going to call setFieldValue and manually update values.topcis
    props.handleChange(props.name, values.value);
  };
  const onInputChange = (values) => {
    setInputValue(values.slice(0, 10))
  }

  return (
    <>
      <Select
        id={props.name}
        onChange={handleChange}
        // onMenuOpen={onMenuOpenHandler}
        onInputChange={onInputChange}
        onBlur={props.handleBlur && (() => props.handleBlur(props.name))}
        options={props.options}
        placeholder={props.placeholder && props.placeholder}
        autoFocus={props.autoFocus}
        value={value}
        tabSelectsValue={false}
        isDisabled={props.disabled}
        ariaLabel={props.label}
        className="react-select"
        classNamePrefix="select"
        inputValue={inputValue}
        isOptionDisabled={(option) => option.isdisabled}
      />
      {props.errors && props.touched && (
        <FormFeedback tooltip={true} className="d-block">{props.errors}</FormFeedback>
      )}
    </>
  );
};

export default CustomSelect;
