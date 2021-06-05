import React from "react";
import { Provider } from "./store";

function Auth({ children }) {
  const [store, dispatch] = React.useState({});

  return <Provider value={{ store, dispatch }}>{children}</Provider>;
}

export default Auth;
