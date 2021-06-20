import { createContext } from 'react';

/**
 * @typedef {Object} storeType
 * @property {Record<string, any>} userData
 */

/**
 * @type {storeType}
 */
export const authContextStoreDefaultValue = {
  userData: undefined,
};

const authContext = createContext({
  store: authContextStoreDefaultValue,
  /**
   * @param {storeType | (prev: storeType) => storeType} _data
   */
  dispatch: (data) => data,
});

export const { Consumer, Provider, displayName } = authContext;

export default authContext;
