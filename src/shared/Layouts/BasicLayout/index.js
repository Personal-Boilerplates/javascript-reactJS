import React from 'react';

import { Container } from './styles';
import Menu from './Menu';

function BasicLayout({ children, ...props }) {
  return (
    <Container {...props}>
      <Menu />
      <main>{children}</main>
    </Container>
  );
}

export default BasicLayout;
