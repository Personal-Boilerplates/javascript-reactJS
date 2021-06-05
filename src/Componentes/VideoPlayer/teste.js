import path from "path";

function addNewValue(object, property, value) {
  const thisProperties = Object.getOwnPropertyDescriptor(object, property);

  Object.defineProperty(object, property, { ...thisProperties, value });
}

function setState(object, stateKey) {
  const newValue = {};

  for (const key in object) {
    if (key === stateKey) {
      newValue[key] = true;
    } else {
      newValue[key] = false;
    }
  }
  addNewValue(object, "state", newValue);
}

function setUrl(object, value) {
  addNewValue(object, "url", value);
}

function setChunks(object, value) {
  addNewValue(object, "chunks", value);
}

/**
 * @returns {MediaRecorder}
 */
function getMediaRecorder(object) {
  return Object.getOwnPropertyDescriptor(object, "mediaRecorder").value;
}

class VideoRecorder {
  /**
   * @type {MediaStream}
   */
  stream;
  /**
   * @type {Blob[]}
   */
  chunks = [];
  state = { recording: false, inactive: true, paused: false };
  /**
   * @type {MediaRecorder}
   */
  mediaRecorder;
  /**
   * @type {string}
   */
  url;
  /**
   * @type {BitrateMode}
   */
  audioBitrateMode;
  /**
   * @type {number}
   */
  audioBitsPerSecond;
  /**
   * @type {number}
   */
  videoBitsPerSecond;
  /**
   * @type {string}
   */
  mimeType;
  /**
   * @type {string}
   */
  blobType;

  /**
   * @type {(BlobEvent) => {}}
   */
  onNewDataAvailable;

  /**
   * @type {(MediaRecorderErrorEvent) => {}}
   */
  onError;
  /**
   * @type {EventListener}
   */
  onPause;
  /**
   * @type {EventListener}
   */
  onResume;
  /**
   * @type {EventListener}
   */
  onStart;
  /**
   * @type {EventListener}
   */
  onStop;

  constructor({ mimeType = "video/webm; codecs=vp9", blobType = "video/webm" } = {}) {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: { min: 640, max: 1920 }, height: { min: 480, max: 1080 } },
        // audio: true,
      })
      .then((thisStream) => {
        this.mediaRecorder = new MediaRecorder(thisStream, { mimeType });

        this.mediaRecorder.ondataavailable = (event) => {
          if (typeof this.onNewDataAvailable === "function") {
            this.onNewDataAvailable(event);
          }

          const thisBlob = event?.data;
          if (thisBlob.size > 0) {
            setChunks(this, [...this.chunks, thisBlob]);
            // this.chunks.push(thisBlob);
          }

          const recorder = getMediaRecorder(this);

          if (recorder.state === "inactive") {
            const blob = new Blob(this.chunks, {
              type: blobType,
            });
            setUrl(this, URL.createObjectURL(blob));
          }
        };

        Object.defineProperties(this, {
          stream: { enumerable: true, value: thisStream, configurable: true },
          mediaRecorder: { value: this.mediaRecorder, configurable: true },
          chunks: { enumerable: true, value: this.chunks, configurable: true },
          state: { enumerable: true, value: this.state, configurable: true },
          url: { enumerable: true, value: this.url, configurable: true },
          blobType: { enumerable: true, value: blobType },
          audioBitrateMode: {
            enumerable: true,
            get: () => {
              return this.mediaRecorder.audioBitrateMode;
            },
          },
          audioBitsPerSecond: {
            enumerable: true,
            get: () => {
              return this.mediaRecorder.audioBitsPerSecond;
            },
          },
          videoBitsPerSecond: {
            enumerable: true,
            get: () => {
              return this.mediaRecorder.videoBitsPerSecond;
            },
          },
          mimeType: {
            enumerable: true,
            get: () => {
              return this.mediaRecorder.mimeType;
            },
          },
          onError: {
            set: (event) => {
              if (typeof event === "function") {
                this.mediaRecorder.onerror = event;
              } else {
                throw new Error("onError property must to be a function");
              }
            },
            get: () => {
              return this.mediaRecorder?.onerror?.();
            },
            enumerable: true,
          },
          onPause: {
            set: (event) => {
              if (typeof event === "function") {
                this.mediaRecorder.onpause = event;
              } else {
                throw new Error("onPause property must to be a function");
              }
            },
            get: () => {
              return this.mediaRecorder?.onpause?.();
            },
            enumerable: true,
          },
          onResume: {
            set: (event) => {
              if (typeof event === "function") {
                this.mediaRecorder.onresume = event;
              } else {
                throw new Error("onResume property must to be a function");
              }
            },
            get: () => {
              return this.mediaRecorder?.onresume?.();
            },
            enumerable: true,
          },
          onStart: {
            set: (event) => {
              if (typeof event === "function") {
                this.mediaRecorder.onstart = event;
              } else {
                throw new Error("onStart property must to be a function");
              }
            },
            get: () => {
              return this.mediaRecorder?.onstart?.();
            },
            enumerable: true,
          },
          onStop: {
            set: (event) => {
              if (typeof event === "function") {
                this.mediaRecorder.onstop = event;
              } else {
                throw new Error("onStop property must to be a function");
              }
            },
            get: () => {
              return this.mediaRecorder?.onstop?.();
            },
            enumerable: true,
          },
        });
      })
      .catch((err) => console.log(err));
  }

  requestData() {
    if (!this.state?.inactive) {
      return getMediaRecorder(this)?.requestData();
    }
  }

  stopRecording() {
    if (!this.state?.inactive) {
      const recorder = getMediaRecorder(this);
      recorder.stop();
      setState(this, "inactive");
    }
  }

  startRecording({ miliseconds } = {}) {
    if (this.state?.inactive) {
      const recorder = getMediaRecorder(this);
      recorder.start(miliseconds);
      setChunks(this, []);
      // this.chunks = [];
      window.URL.revokeObjectURL(this.url);
      setUrl(this, undefined);
      // this.url = undefined;
      setState(this, "recording");
    }
  }

  pauseRecording() {
    if (this.state?.inactive) {
      const recorder = getMediaRecorder(this);
      recorder.pause();
      setState(this, "paused");
    }
  }

  resumeRecording() {
    if (this.state?.inactive) {
      const recorder = getMediaRecorder(this);
      recorder.resume();
      setState(this, "recording");
    }
  }

  toggleRecording(options) {
    const { start } = options || {};
    const { miliseconds } = start || {};

    if (this.state?.recording) {
      this.pauseRecording();
    } else if (this.state?.paused) {
      this.resumeRecording();
    } else {
      this.startRecording(miliseconds);
    }
  }

  downloadRecord(name) {
    const a = document.createElement("a");

    let thisName = name;

    if (!thisName) {
      thisName = "webcamrecord.webm";
      // const now = new Date();

      // const d = now.getDate();
      // const m = now.getMonth() + 1;

      // thisName = `webcam_record_${d > 9 ? d : `0${d}`}_${
      //   m > 9 ? m : `0${m}`
      // }_${now.getFullYear()}_${now.getHours()}_${now.getMinutes()}_${now.getSeconds()}.webm`;
    }
    // else if (!path.extname(name)) {
    //   thisName += ".webm";
    // }

    a.href = this.url;
    a.download = thisName;

    a.click();

    // a.remove();
  }
}

export default VideoRecorder;
