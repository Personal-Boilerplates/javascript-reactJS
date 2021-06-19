function cloneData(data) {
  if (data instanceof Date) {
    return new Date(data.getTime());
  } else {
    return JSON.parse(JSON.stringify(data));
  }
}

export default cloneData;
