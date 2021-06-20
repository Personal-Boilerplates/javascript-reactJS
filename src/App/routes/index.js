import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import * as pages from '../../pages';
import { RegisterRouterObject } from './registerRoute';

const routes = [];

/**
 * @param {RegisterRouterObject} route
 * @param {string} parentPath
 */
function recursiveRoute(route, parentPath) {
  if (!(route instanceof RegisterRouterObject)) {
    throw new Error('All exported pages must be registered');
  }
  const { subRoutes, path: partialPath, ...props } = route;

  function handlePath(str) {
    if (str?.[0] === '/') {
      return str;
    } else if (str) {
      return '/' + str;
    } else {
      return '';
    }
  }

  const path = handlePath(parentPath) + handlePath(partialPath);

  console.log({ path, parentPath, partialPath });

  routes.push(<Route {...{ ...props, path }} />);
  subRoutes.forEach(recursiveRoute, path);
}

Object.values(pages).forEach((page) => recursiveRoute(page));

export default function Routes() {
  return <Switch>{routes}</Switch>;
}
