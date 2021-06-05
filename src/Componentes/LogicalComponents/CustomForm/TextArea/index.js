import React from "react";
import FormElementBasic from "../FormElementBasic";

/**
 * @param {Object} props
 * @param {string} props.placeholder
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
function TextArea(props) {
  return (
    <FormElementBasic {...props}>
      {(props) => <textarea {...props} />}
    </FormElementBasic>
  );
}

export default React.memo(TextArea);
