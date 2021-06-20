import React from 'react';
import { Link } from 'react-router-dom';
import registerRoute from '~/App/routes/registerRoute';
import BasicLayout from '~/shared/Layouts/BasicLayout';

import * as S from './styles';

function Home() {
  return (
    <S.Container>
      <h1>Home</h1>
      <br />
      <Link to="/login">Login</Link>
    </S.Container>
  );
}

export default registerRoute({
  component: Home,
  layout: BasicLayout,
  exact: true,
  path: '/',
});
