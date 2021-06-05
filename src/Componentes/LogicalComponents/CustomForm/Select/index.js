import React from "react";
import FormElementBasic from "../FormElementBasic";

/**
 * @param {Object} props
 * @param {HTMLOptionElement} props.children
 * @param {string} props.name
 * @param {string} props.value
 * @param {string} props.defaultValue
 * @param {boolean} props.checked
 * @param {boolean} props.defaultChecked
 * @param {string} props.type
 * @param {Function} props.innerRef
 * @param {Function} props.setter
 * @param {Function} props.onChange
 * @param {({ castValue, realValue, ref }) => {}} props.validation
 * @param {('number'|'string'|'boolean'|'parse'|'tryparse')} props.cast
 */
function Select({ listOptions, children, ...rest }) {
  return (
    <FormElementBasic {...rest}>
      {(props) => <select {...props}>{children}</select>}
    </FormElementBasic>
  );
}

export default React.memo(Select);
