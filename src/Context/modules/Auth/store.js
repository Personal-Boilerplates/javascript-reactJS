import { createContext } from "react";

const authContext = createContext({
  store: {},
  dispatch: () => {},
});

export const { Consumer, Provider, displayName } = authContext;

export default authContext;
