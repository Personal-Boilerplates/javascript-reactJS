import isObject from '../isObject';
import splitStringPath from '../splitStringPath';

/**
 * @param {string} name
 * @param {Array|Object} object
 */
export default function findValueByName(name, object) {
  /**
   * @type {{parent: any, key: string | null, value: any}}
   */
  let result = {
    parent: null,
    key: null,
    value: null,
  };

  if (name && object) {
    let path = splitStringPath(name);

    const findValue = ([key, ...rest], thisObject) => {
      const { isArray, key: thisKey } = key || {};

      if (isArray && !Array.isArray(thisObject)) {
        return undefined;
      } else if (!isArray && !isObject(thisObject)) {
        return undefined;
      } else if (rest.length > 0) {
        return findValue(rest, thisObject[thisKey]);
      } else {
        result = {
          parent: thisObject,
          key,
          value: thisObject?.[thisKey],
        };
      }
    };

    findValue(path, object);
  }

  return result;
}
