import _formSplitStringPath from "./_formSplitStringPath";

/**
 * @param {string} name
 * @param {Array|Object} object
 * @param {Object} options
 * @param {boolean} options.parent
 */
export default function _formFindKeyValue(name, object, options) {
  const { parent } = options || {};
  if (name) {
    function isObj(data) {
      return Object.prototype.toString.call(data) === "[object Object]";
    }

    let path = _formSplitStringPath(name);

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
