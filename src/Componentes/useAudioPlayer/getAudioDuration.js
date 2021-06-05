async function getAudioDuration(src) {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.src = src;

    audio.onloadeddata = () => {
      const duration = audio.duration;
      resolve(duration);
      audio.remove();
    };

    audio.onerror = reject;
  });
}

export default getAudioDuration;
