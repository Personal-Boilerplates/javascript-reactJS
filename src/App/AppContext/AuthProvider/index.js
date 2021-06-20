import React from 'react';
import { Provider, authContextStoreDefaultValue } from './store';

function AuthProvider({ children }) {
  const [store, dispatch] = React.useState(authContextStoreDefaultValue);

  return <Provider value={{ store, dispatch }}>{children}</Provider>;
}

export default AuthProvider;
