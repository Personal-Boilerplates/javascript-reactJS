import isObject from '../isObject';
import splitStringPath from '../splitStringPath';

function insertValueByName(name, object, value) {
  let path = splitStringPath(name);

  if (path.length > 0) {
    const createPath = ([key, ...rest], thisObject) => {
      const { isArray, key: thisKey } = key || {};

      if (isArray && !Array.isArray(thisObject)) {
        thisObject = [];
      } else if (!isArray && !isObject(thisObject)) {
        thisObject = {};
      }

      const handleValue = (v) => {
        const thisKeyIndex = parseInt(thisKey);
        if (isArray && isNaN(thisKeyIndex)) {
          thisObject.push(v);
        } else {
          thisObject[thisKey] = v;
        }
      };

      if (rest.length > 0) {
        handleValue(createPath(rest, thisObject[thisKey]));
      } else {
        handleValue(value);
      }

      return thisObject;
    };

    return createPath(path, object);
  } else {
    return object;
  }
}

export default insertValueByName;
