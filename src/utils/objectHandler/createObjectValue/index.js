import splitStringPath from "../splitStringPath";

function createObjectValue(name, object, value) {
  if (name) {
    function isObj(dataCheck) {
      return Object.prototype.toString.call(dataCheck) === "[object Object]";
    }

    let path = splitStringPath(name);

    function createPath([key, ...rest], thisObject) {
      const { isArray, key: thisKey } = key || {};

      if (isArray && !Array.isArray(thisObject)) {
        thisObject = [];
      } else if (!isArray && !isObj(thisObject)) {
        thisObject = {};
      }

      function handleValue(v) {
        const thisKeyIndex = isArray && Number(thisKey);
        if (
          isArray &&
          (!thisKey ||
            thisKey === "" ||
            isNaN(thisKeyIndex) ||
            thisKeyIndex < 0)
        ) {
          thisObject.push(v);
        } else {
          thisObject[thisKey] = v;
        }
      }

      if (rest.length > 0) {
        handleValue(createPath(rest, thisObject[thisKey]));
      } else {
        handleValue(value);
      }

      return thisObject;
    }

    return createPath(path, object);
  }

  return object;
}

export default createObjectValue;
