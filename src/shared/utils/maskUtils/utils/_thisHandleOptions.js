function thisHandleOptions(newValue, ref, options) {
  const { setRef = true, maxLength } = options || {};
  const { target, current } = ref || {};

  if (maxLength && newValue.length > maxLength) {
    newValue = newValue.slice(0, maxLength);
  }

  if (setRef) {
    if (target) target.value = newValue;
    if (current) current.value = newValue;
  }
}

export default thisHandleOptions;
