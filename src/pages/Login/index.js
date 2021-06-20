import React from 'react';
import { Link } from 'react-router-dom';
import registerRoute from '~/App/routes/registerRoute';

import * as S from './styles';

function Login() {
  return (
    <S.Container>
      <h1>Login</h1>
      <br />
      <Link to="/">Home</Link>
    </S.Container>
  );
}

export default registerRoute({
  component: Login,
  path: '/login',
});
