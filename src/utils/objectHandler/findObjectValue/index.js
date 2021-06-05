import splitStringPath from "../splitStringPath";

/**
 * @param {string} name
 * @param {Array|Object} object
 * @param {Object} options
 * @param {boolean} options.parent
 */
export default function findObjectValue(name, object, options) {
  const { parent } = options || {};
  if (name && object) {
    function isObj(data) {
      return Object.prototype.toString.call(data) === "[object Object]";
    }

    let path = splitStringPath(name);

    function findValue([key, ...rest], thisObject) {
      const { isArray, key: thisKey } = key || {};

      if (isArray && !Array.isArray(thisObject)) {
        return undefined;
      } else if (!isArray && !isObj(thisObject)) {
        return;
      } else if (rest.length > 0) {
        return findValue(rest, thisObject[thisKey]);
      } else {
        if (parent) {
          return thisObject;
        } else {
          return thisObject[thisKey];
        }
      }
    }

    return findValue(path, object);
  }
  return object;
}
