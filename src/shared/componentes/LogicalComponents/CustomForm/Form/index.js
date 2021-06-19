import React from "react";
import formStore from "./store";
import _formCastType from "./utils/_formCastType";
import _formCreateNamePath from "./utils/_formCreateNamePath";

/**
 * @param {(HTMLFormElement|{innerRef: () => {}, notNull: false, isFormData: false, keepFormOnUnmount: false})} props
 */
function Form({ children, innerRef, notNull, isFormData, onSubmit, keepFormOnUnmount, ...rest }) {
  const [validations, setValidations] = React.useState({});
  const [ref, setRef] = React.useState();

  function handleValue(key, val) {
    /**
     * @type {HTMLElement}
     */
    const elRef = ref?.[key];
    let thisVal = val;
    const cast = elRef?.[0]?.getAttribute?.("cast") || elRef?.getAttribute?.("cast");

    if (typeof cast === "string") {
      if (notNull && (!thisVal || thisVal === "")) {
        thisVal = "";
      } else {
        thisVal = _formCastType(thisVal, cast);
      }
    }

    if (elRef?.type === "file" && thisVal.size && !thisVal?.size > 0) {
      thisVal = "";
    }

    return thisVal;
  }

  /**
   *
   * @param {import("react").FormEvent} event
   */
  async function handleSubmit(event) {
    event.preventDefault();
    if (typeof onSubmit === "function") {
      const fd = new FormData(ref);

      let valid = true;
      const validArray = Object.entries(validations);

      if (validArray.length > 0) {
        for (const [k, v] of validArray) {
          const elRef = ref?.[k];
          const realValue = fd.get(k);
          const castValue = handleValue(k, realValue);

          const thisValidation = elRef ? await v?.({ castValue, realValue }) : true;

          valid = !(thisValidation === false || typeof thisValidation === "string");

          if (valid === false) {
            break;
          }
        }
      }

      if (valid) {
        if (isFormData) {
          onSubmit(fd, event);
        } else {
          let jsonFd;
          fd.forEach((v, name) => {
            const thisValue = handleValue(name, v);
            if (!notNull || thisValue === false || thisValue?.length > 0) {
              jsonFd = _formCreateNamePath(name, jsonFd, thisValue);
            }
          });
          onSubmit(jsonFd, event);
        }
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      ref={(e) => {
        if (e) {
          setRef(e);
        }
        if (typeof innerRef === "function") {
          innerRef(e);
        }
      }}
      {...rest}
    >
      <formStore.Provider
        value={{
          setValidations: (name, validation) => setValidations((prev) => ({ ...prev, [name]: validation })),
          getKeyValue: (name) => {
            const fd = new FormData(ref);
            const realValue = fd.get(name);
            const castValue = handleValue(name, realValue);

            return { realValue, castValue };
          },
        }}
      >
        {children}
      </formStore.Provider>
    </form>
  );
}

export default React.memo(Form);
