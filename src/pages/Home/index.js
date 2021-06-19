import React from "react";
import registerRoute from "~/App/routes/registerRoute";
import BasicLayout from "~/shared/Layouts/BasicLayout";

import * as S from "./styles";

function Home() {
  return <S.Container>Home</S.Container>
}

export default registerRoute({
  component: Home,
  layout: BasicLayout,
  exact: true,
  path: '/',
});
