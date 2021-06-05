export default function _formSplitStringPath(str) {
  if (typeof str === "string") {
    let path = String(str).replaceAll("[", ".[").split(".");

    if (path?.[0] === "") {
      path.shift();
    }

    return path?.map((thisKey) => {
      const isArray =
        thisKey?.[0] === "[" && thisKey?.[thisKey.length - 1] === "]";
      const key = isArray
        ? thisKey?.replace?.("[", "")?.replace?.("]", "")
        : thisKey;

      return { isArray, key };
    });
  } else {
    return undefined;
  }
}
