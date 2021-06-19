import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";
import * as pages from '../../pages';
import { RegisterRouterObject } from "./registerRoute";

const routes = [];

/**
 * @param {RegisterRouterObject} route 
 */
function recursiveRoute(route) {
  if (!(route instanceof RegisterRouterObject)) {
    throw new Error("All exported pages must be registered")
  };
  const {id, subRoutes, Layout, component, exact, path} = route;
  routes.push(<Route key={id} {...{ Layout, component, exact, path }} />)
  subRoutes.forEach(recursiveRoute)
}

Object.values(pages).forEach(recursiveRoute)

export default function Routes() {
  return (
    <Switch>
      {routes}
    </Switch>
  );
}
