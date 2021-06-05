function cloneValue(data) {
  if (data instanceof Date) {
    return new Date(data.getTime());
  } else {
    try {
      return JSON.parse(JSON.stringify(data));
    } catch {
      return data;
    }
  }
}

export default cloneValue;
