import React from "react";
import formStore from "../../Form/store";

import { Container } from "./styles";

/**
 * @param {Object} props
 * @param {HTMLElement} props.childrenRef
 * @param {string} props.name
 * @param {Function} props.validation
 */
function _Validation({ childrenRef, name, validation }) {
  const [showValidation, setShowValidation] = React.useState(false);
  const [loadedValidation, setLoadedValidation] = React.useState(false);
  const { setValidations } = React.useContext(formStore);

  React.useEffect(() => {
    if (!loadedValidation && childrenRef && typeof validation === "function") {
      setLoadedValidation(true);
    }
  }, [childrenRef, loadedValidation, validation]);

  React.useEffect(() => {
    if (loadedValidation && name && typeof setValidations === "function") {
      setValidations(
        name,
        typeof validation === "function"
          ? async (v, options = {}) => {
              const result = await validation({ ...v, ref: childrenRef });
              if (typeof result === "string") {
                setShowValidation({ message: result, ...options });
                const oldColor = getComputedStyle(childrenRef).borderColor;
                childrenRef.style.borderColor = "#f44336";

                setTimeout(() => {
                  setShowValidation(false);
                  childrenRef.style.borderColor = oldColor;
                }, 1500);
              } else {
                setShowValidation(false);
              }
              return result;
            }
          : undefined
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedValidation, name, validation]);

  return (
    <>
      {showValidation?.message &&
        (showValidation?.float ? (
          <Container childrenref={childrenRef || undefined}>
            {showValidation.message}
          </Container>
        ) : (
          <p>{showValidation.message}</p>
        ))}
    </>
  );
}

export default _Validation;
