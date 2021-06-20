import { useContext } from 'react';
import authContext from '~/App/AppContext/AuthProvider/store';

function useAuth() {
  const { dispatch, store } = useContext(authContext);

  function startSession({ email, password }) {
    dispatch((prev) => ({ ...prev, userData: { email, password } }));
  }

  return {
    store,
    startSession,
  };
}

export default useAuth;
