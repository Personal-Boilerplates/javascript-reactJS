import React from "react";
import Form from "~/Componentes/LogicalComponents/CustomForm/Form";
import Input from "~/Componentes/LogicalComponents/CustomForm/Input";
import ShadowBox from "~/Componentes/styledComponents/divs/ShadowBox";
import VideoPlayer from "~/Componentes/VideoPlayer";
import VideoRecorder from "~/Componentes/VideoPlayer/teste";

import { Container } from "./styles";

function Home() {
  const [teste, setTeste] = React.useState(false);
  // const [recorder, setRecorder] = React.useState(new VideoRecorder());

  React.useEffect(() => {
    const recorder = new VideoRecorder();

    function tryDownload() {
      if (recorder.url) {
        console.log("asduahds");
        recorder.downloadRecord();
      } else {
        setTimeout(() => {
          tryDownload();
        }, 500);
      }
    }

    function testRecord() {
      if (recorder.stream) {
        recorder.startRecording();

        setTimeout(() => {
          recorder.stopRecording();
          tryDownload();
        }, 2000);
      } else {
        setTimeout(() => {
          testRecord();
        }, 1000);
      }
    }
    testRecord();
  }, []);

  return (
    <Container>
      <ShadowBox
        style={{
          minWidth: "10em",
          minHeight: "10em",
          margin: "5em",
          padding: "1em",
          maxWidth: "100%",
        }}
      >
        {/* <VideoPlayer /> */}
      </ShadowBox>
    </Container>
  );
}

export default Home;
