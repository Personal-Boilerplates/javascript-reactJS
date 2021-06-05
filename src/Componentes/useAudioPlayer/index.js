import { useState, useEffect, useCallback } from "react";
import getRandomIndex from "~/utils/arrayHandler/getRandomIndex";
import { findObjectValue } from "~/utils/objectHandler";
import getAudioDuration from "./getAudioDuration";

function getTimeString(thisDuration) {
  const hour = Math.floor(thisDuration / 60 / 60);
  const hourSec = hour * 60 * 60;
  const min = Math.floor((thisDuration - hourSec) / 60);
  const minSec = min * 60;
  const sec = Math.floor(thisDuration - minSec);

  function t(numb) {
    return numb > 9 ? numb : `0${numb}`;
  }

  return `${hour > 0 ? `${t(hour)}:${t(min)}` : t(min)}:${t(sec)}`;
}

function useAudioPlayer(options) {
  const {
    defaultSrc,
    srcPath,
    uniqueKeyPath,
    durationName,
    durationStringName,
    repeat,
    shuffle,
    playNext,
  } = options || {};

  const [audio] = useState(new Audio());
  const [loaded, setLoaded] = useState();
  const [srcObject, setSrcObject] = useState({ src: undefined });
  const [srcArray, setSrcArray] = useState([]);
  const [buffer, setBuffer] = useState({ loaded: 0, played: 0 });
  const [loadedDefaultSrc, setLoadedDefaultSrc] = useState(false);
  const [duration, setDuration] = useState();
  const [durationString, setDurationString] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [isPlaying, setPlay] = useState(false);

  useEffect(() => {
    const setEndedAudio = () => {
      const currentId = uniqueKeyPath
        ? findObjectValue(uniqueKeyPath, srcObject)
        : srcObject?.id;

      let nextIndex;
      if (shuffle) {
        nextIndex = getRandomIndex(srcArray);
      } else {
        const thisIndex = srcArray.findIndex((e) => {
          const thisId = uniqueKeyPath
            ? findObjectValue(uniqueKeyPath, e)
            : e?.id;

          return thisId === currentId;
        });

        if (thisIndex >= 0) {
          nextIndex = thisIndex >= srcArray.length - 1 ? 0 : thisIndex + 1;
        }
      }

      if (!repeat && !shuffle && nextIndex === 0) {
        setPlay(false);
      }

      setSrcObject({
        ...(srcArray?.[nextIndex] || srcArray?.[0] || { src: undefined }),
      });
    };

    audio.addEventListener("ended", setEndedAudio);

    return () => {
      audio.removeEventListener("ended", setEndedAudio);
    };
  }, [audio, playNext, repeat, shuffle, srcArray, srcObject, uniqueKeyPath]);

  const handleSetSrcArray = useCallback(
    (newSrc) => {
      const thisArray = Array.isArray(newSrc) ? newSrc : [newSrc];
      const result = [];
      thisArray.forEach((thisSrc, i) => {
        function addDurations(src, obj) {
          if (!obj.durationString || typeof durationStringName === "string") {
            obj[durationStringName || "durationString"] = "00:00";
            getAudioDuration(src).then((r) => {
              obj[durationStringName || "durationString"] = getTimeString(r);
            });
          }
          if (!obj.duration || typeof durationName === "string") {
            obj[durationName || "duration"] = undefined;
            getAudioDuration(src).then((r) => {
              obj[durationName || "duration"] = r;
            });
          }
        }

        if (srcPath) {
          const thisVal = findObjectValue(srcPath, thisSrc);
          if (typeof thisVal === "string") {
            result.push(thisSrc);
            addDurations(thisVal, thisSrc);
          }
        } else {
          if (typeof thisSrc === "string") {
            const thisData = {
              [uniqueKeyPath || "id"]: i,
              src: thisSrc,
            };

            result.push(thisData);
            addDurations(thisSrc, thisData);
          }
        }
      });

      setSrcObject(result?.[0] || { src: undefined });
      setSrcArray(result);
    },
    [durationName, durationStringName, srcPath, uniqueKeyPath]
  );

  useEffect(() => {
    if (!loadedDefaultSrc) {
      setLoadedDefaultSrc(true);
      handleSetSrcArray(defaultSrc);
    }
  }, [defaultSrc, handleSetSrcArray, loadedDefaultSrc]);

  useEffect(() => {
    setLoaded(false);
    const newSrc = srcPath
      ? findObjectValue(srcPath, srcObject)
      : srcObject?.src;

    if (newSrc !== audio.src || audio.ended.valueOf()) {
      audio.src = newSrc;
      audio.load();
    }
  }, [audio, playNext, srcObject, srcPath]);

  useEffect(() => {
    if (loaded) {
      const isPaused = audio.paused.valueOf();
      if (isPlaying && isPaused) {
        audio.play();
      } else if (!isPlaying && !isPaused) {
        audio.pause();
      }
    }
  }, [audio, loaded, isPlaying]);

  useEffect(() => {
    const setAudioData = () => {
      const thisDuration = audio.duration;

      setDurationString(getTimeString(thisDuration));
      setDuration(thisDuration);
      setCurrentTime(audio.currentTime);
      setLoaded(true);
    };

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);

      if (audio.buffered.length > 0) {
        let bcount = 0;
        const buffers = [];
        while (bcount < audio.buffered.length) {
          buffers.push({
            start: audio.buffered.start(bcount),
            end: audio.buffered.end(bcount),
          });
          bcount++;
        }

        setBuffer(buffers);
      }
    };

    audio.addEventListener("loadeddata", setAudioData);

    audio.addEventListener("timeupdate", setAudioTime);

    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    };
  }, [audio]);

  return {
    currentTime,
    duration,
    isPlaying,
    durationString,
    stop: () => {
      setPlay(false);
      audio.currentTime = 0;
    },
    setPlay: (bool) => setPlay(!!bool),
    currentSrc: audio.src,
    currentSrcObj: srcObject,
    srcArray,
    buffer,
    setCurrentTime: (numb) => {
      const thisVal = Number(numb);
      if (isNaN(thisVal) || numb === "" || typeof numb === "boolean") {
        audio.currentTime = 0;
      } else if (thisVal > duration) {
        audio.currentTime = duration;
      } else if (thisVal < 0) {
        audio.currentTime = 0;
      } else {
        audio.currentTime = thisVal;
      }
    },
    setSrc: handleSetSrcArray,
  };
}

export default useAudioPlayer;
