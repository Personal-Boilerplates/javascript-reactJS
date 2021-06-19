import React from "react";

import { Container } from "./styles";
import Menu from "./Menu";

function BasicLayout({ children, ...rest }) {
  return (
    <Container>
      <Menu />
      <main>{children}</main>
    </Container>
  );
}

export default BasicLayout;
