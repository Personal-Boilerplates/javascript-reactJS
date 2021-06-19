function thisGetValue(value) {
  const { target, current } = value || {};
  if (target) {
    return String(target.value) || "";
  } else if (current) {
    return String(current.value) || "";
  } else if (typeof value === "string" || typeof value === "number") {
    return String(value) || "";
  } else {
    return "";
  }
}

export default thisGetValue;
