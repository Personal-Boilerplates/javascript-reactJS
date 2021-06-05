import React from "react";

const formStore = React.createContext({
  // formState: {},
  // formProps: { keepFormOnUnmount: Boolean },
  setValidations: (name, validation) => {},
  getKeyValue: (name) => ({ realValue: undefined, castValue: undefined }),
  // get: (name) => {},
  // removeKey: (name) => {},
  // setFormValue: (name, value) => {},
});

export default formStore;
