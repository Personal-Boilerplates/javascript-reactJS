/**
 * @typedef instanceType
 * @property {string} path
 * @property {React.FC} component
 * @property {React.FC} layout
 * @property {RegisterRouterObject[]} subRoutes
 * @property {boolean} exact
 */

let lastKey = 0;

export class RegisterRouterObject {
  /**
   * @param {instanceType} arg0
   */
  constructor({ path, component, Layout, subRoutes, exact }) {
    const notEmptyString = (str) => typeof str !== 'string' || str === '';

    const validPath = Array.isArray(path)
      ? path.some((p) => notEmptyString(p))
      : notEmptyString(path);

    if (validPath || typeof component !== 'function') {
      throw new Error(
        'You must inform a path and component to register a route'
      );
    } else if (
      subRoutes &&
      subRoutes.some((e) => !(e instanceof RegisterRouterObject))
    ) {
      throw new Error(
        'subRoute type must be instance of RegisterRouterObject or undefined'
      );
    }
    lastKey++;

    /**
     * @type {RegisterRouterObject[]}
     */
    this.subRoutes = subRoutes || [];
    this.key = String(lastKey);
    this.path = path;
    this.component = component;
    this.Layout = Layout;
    this.exact = exact;
  }
}

/**
 * @param {instanceType} pageData
 */
export default function registerRoute(pageData) {
  return new RegisterRouterObject(pageData);
}
