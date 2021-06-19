/**
 * Split strings by dots (".") or brackets ("[]").
 * If the value is splited by a dot, it assumes that the text at the right side of the dot is a property
 * from the text of the left side. The same is for the brackets, but, i will assume that the value is a
 * index of a array.
 * @param {string} str
 */
function splitStringPath(str) {
  /**
   * @type {{ isArray: boolean, key: string }[]}
   */
  const result = [];
  if (typeof str === "string") {
    /**
     * @type {string[]}
     */
    let path = String(str).replaceAll("[", ".[").split(".");

    if (path?.[0] === "") {
      path.shift();
    }

    path?.forEach((thisKey) => {
        let key = thisKey
        const isArray =
        key?.[0] === "[" && key?.[key.length - 1] === "]";

        if (isArray) {
          key = key.slice(1,-1)
        }

        result.push({ isArray, key })
    });
  } else {
    return result;
  }
}

export default splitStringPath;
