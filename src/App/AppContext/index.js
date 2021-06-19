import React from 'react';
import AuthProvider from './AuthProvider';

function AppContext({children}) {
  return <AuthProvider>
      {children}
  </AuthProvider>;
}

export default AppContext;