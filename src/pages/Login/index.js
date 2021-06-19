import React from "react";
import registerRoute from "~/App/routes/registerRoute";

import * as S from "./styles";

function Login() {
  return (
    <S.Container>Login</S.Container>
  );
}

export default registerRoute({
  component: Login,
  path: '/',
});
