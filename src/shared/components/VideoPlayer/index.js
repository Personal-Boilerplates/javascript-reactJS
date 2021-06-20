/* eslint-disable eqeqeq */
import React from 'react';

import { Container } from './styles';

function VideoPlayer({ style, ...rest }) {
  /**
   * @type {[MediaRecorder, React.Dispatch<React.SetStateAction<MediaRecorder>>]}
   */
  const [recorder, setRecorder] = React.useState();
  const [{ recording, inactive, paused }, setStatus] = React.useState({
    recording: false,
    inactive: true,
    paused: false,
  });
  const [chunks, setChunks] = React.useState([]);
  const [isDownloadable, setIsDownloadable] = React.useState(false);

  /**
   * @type {{current: HTMLVideoElement}}
   */
  const ref = React.useRef();

  function stopRecording() {
    if (!inactive) {
      recorder.stop();
      setStatus({ inactive: true });
    }
  }

  async function toggleRecording() {
    if (recording) {
      recorder.pause();
      setStatus({ paused: true });
    } else if (paused) {
      recorder.resume();
      setStatus({ recording: true });
    } else {
      setChunks([]);
      setIsDownloadable(false);
      setStatus({ recording: true });
      recorder.start(1000);
    }
  }

  function download() {
    const blob = new Blob(chunks, {
      // type: "video/webm",
      type: 'video/mp4',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = 'test.webm';
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  }

  React.useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: { min: 640, max: 1920 },
          height: { min: 480, max: 1080 },
        },
        // audio: true,
      })
      .then((thisStream) => {
        const videoElement = ref.current;

        const thisRecorder = new MediaRecorder(thisStream, {
          mimeType: 'video/webm; codecs=vp9',
        });
        thisRecorder.ondataavailable = (event) => {
          const thisBlob = event?.data;
          let haveChunk = thisBlob.size > 0;
          setChunks((prev) => {
            if (prev.length > 0) {
              haveChunk = true;
            }
            if (thisBlob.size > 0) {
              return [...prev, thisBlob];
            }
          });
          if (haveChunk && thisRecorder.state === 'inactive') {
            setIsDownloadable(true);
          }
        };

        console.log(thisRecorder);
        setRecorder(thisRecorder);

        videoElement.srcObject = thisStream;
        videoElement.onloadedmetadata = (e) => {
          e.currentTarget.play();
        };

        return thisStream;
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <video
        controls
        ref={ref}
        style={{
          width: 500,
          height: 350,
          background: '#333',
          margin: 'auto',
          display: 'block',
          ...style,
        }}
        {...rest}
      />
      <button onClick={toggleRecording}>
        {recording ? 'Pause' : 'Record'}
      </button>
      {!inactive && <button onClick={stopRecording}>stop</button>}
      <br />
      {isDownloadable && <button onClick={download}>baixar</button>}
    </Container>
  );
}

export default VideoPlayer;
