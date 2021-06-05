import React from "react";

import { Container } from "./styles";
import Menu from "./Menu";

function Principal({ children, ...rest }) {
  return (
    <Container>
      <Menu />
      <main>{children}</main>
    </Container>
  );
}

export default Principal;
