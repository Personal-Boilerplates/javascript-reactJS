import React from "react";
import FormElementBasic from "../FormElementBasic";

/**
 * @param {(React.InputHTMLAttributes|customFormElementsPropsDoc)} props
 */
function Input(props) {
  return (
    <FormElementBasic {...props}>
      {(thisProps) => <input {...thisProps} />}
    </FormElementBasic>
  );
}

export default React.memo(Input);
