import React from "react";
import _formCastType from "../Form/utils/_formCastType";
import Validation from "./_Validation";

import { Container } from "./styles";

function isCheck(type) {
  return type === "checkbox" || type === "radio";
}

function checkValue({ checked, type, value }) {
  if (isCheck(type)) {
    return checked ? value : "";
  } else {
    return value;
  }
}

/**
 * @param {Object} props
 * @param {Function} props.children
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
function FormElementBasic({
  innerRef,
  setter,
  notNull,
  children,
  onChange,
  validation,
  cast: castProp,
  value: valueProp,
  defaultValue: defaultValueProp,
  style,
  className,
  ...rest
}) {
  const { name, checked, defaultChecked, type } = rest || {};
  const [loadedValue, setLoadedValue] = React.useState(false);
  const [loadedDefault, setLoadedDefault] = React.useState(false);
  const [childrenRef, setChildrenRef] = React.useState();

  const { cast, value, defaultValue } = React.useMemo(() => {
    const result = {
      cast: castProp,
      value: valueProp,
      defaultValue: defaultValueProp,
    };

    const allowCast =
      castProp === "parse" || castProp === "tryparse" || castProp === undefined;

    const stringfyValue =
      typeof valueProp === "function" || typeof valueProp === "object";
    const stringfyDefaultValue =
      typeof defaultValueProp === "function" ||
      typeof defaultValueProp === "object";

    if (allowCast && (stringfyValue || stringfyDefaultValue)) {
      result.cast = castProp === undefined ? "tryparse" : castProp;
      result.value = stringfyValue ? JSON.stringify(valueProp) : valueProp;
      result.defaultValue = stringfyDefaultValue
        ? JSON.stringify(defaultValueProp)
        : defaultValueProp;
    }

    return result;
  }, [castProp, valueProp, defaultValueProp]);

  const callAllSetters = React.useCallback(
    (thisValue, thisChecked) => {
      const v = _formCastType(
        checkValue({ checked: thisChecked, value: thisValue, type }),
        cast
      );

      // Envia o value
      if (typeof setter === "function") {
        setter(v);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [name, cast]
  );

  // Controle default;
  React.useEffect(() => {
    const validSetValue = !isCheck(type) && defaultValue;
    const validSetChecked = isCheck(type) && defaultChecked;
    if (!loadedDefault && (validSetValue || validSetChecked)) {
      setLoadedDefault(true);
      callAllSetters(value || defaultValue, defaultChecked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultChecked, defaultValue]);

  // Controle de value e checked;
  React.useEffect(() => {
    const validSetValue = !isCheck(type) && value;
    const validSetChecked = isCheck(type) && checked;
    if (loadedValue) {
      callAllSetters(value, checked);
    } else if (!loadedValue && (validSetValue || validSetChecked)) {
      setLoadedValue(true);
    }
  }, [callAllSetters, checked, loadedValue, type, value]);

  /**
   * @param {import("react").ChangeEvent} e
   */
  function handleChange(e) {
    const { value: thisValue, checked: thisChecked } = e.currentTarget;

    if (!loadedValue) {
      callAllSetters(thisValue, thisChecked);
    }

    if (typeof onChange === "function") {
      onChange(e);
    }
  }

  function handleRef(e) {
    setChildrenRef(e);
    if (typeof innerRef === "function") {
      innerRef(e);
    }
  }

  return (
    <Container {...{ style, className }}>
      {children({
        onChange: handleChange,
        ref: handleRef,
        cast,
        value,
        defaultValue,
        ...rest,
      })}
      <Validation {...{ childrenRef, name, validation }} />
    </Container>
  );
}

export default React.memo(FormElementBasic);
