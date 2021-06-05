function getRandomIndex(array) {
  const size = array?.length;
  if (Array.isArray(array) && size > 0) {
    const random = Math.floor(Math.random() * size);

    if (random < 0) {
      return 0;
    } else if (random >= size) {
      return size - 1;
    } else {
      return random;
    }
  } else {
    return -1;
  }
}

export default getRandomIndex;
