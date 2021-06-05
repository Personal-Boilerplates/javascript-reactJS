import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

import * as unsigned from "~/pages/unsigned";
import * as signed from "~/pages/signed";
import * as layouts from "~/Componentes/Layouts";

export default function Routes() {
  return (
    <Switch>
      <Route path="/login" exact component={unsigned.Login} />

      <Route
        path="/"
        exact
        layout={layouts.Principal}
        component={signed.Home}
      />

      {/* <Route path="/sistema" component={Sistema} privado /> */}
    </Switch>
  );
}
