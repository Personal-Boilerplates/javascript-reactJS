import React from "react";

import { Container, SpanLabel } from "./styles";

/**
 * @param {(HTMLInputElement| {title: String, as: import("react").FunctionComponent})} props
 */
function LabeledInput({
  style,
  onFocus,
  onBlur,
  title,
  className,
  placeholder,
  innerRef,
  ...rest
}) {
  const [focused, setFocuses] = React.useState(false);

  return (
    <Container {...{ style, className }}>
      {typeof title === "string" && (
        <SpanLabel focused={focused ? "true" : undefined}>{title}</SpanLabel>
      )}
      <input
        {...rest}
        ref={innerRef}
        onFocus={(e) => {
          setFocuses(true);
          typeof onFocus === "function" && onFocus(e);
        }}
        onBlur={(e) => {
          const thisVal = e.currentTarget.value;
          if (!thisVal || thisVal === "") {
            setFocuses(false);
          }
          typeof onBlur === "function" && onBlur(e);
        }}
      />
    </Container>
  );
}

export default LabeledInput;
