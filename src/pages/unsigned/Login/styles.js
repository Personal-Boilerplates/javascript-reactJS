import styled from "styled-components";
import SubmitButton from "~/Componentes/styledComponents/buttons/SubmitButton";
import ShadowBox from "~/Componentes/styledComponents/divs/ShadowBox";
import { background, letter } from "~/config/styles/colors";

export const Container = styled.div`
  background: ${`linear-gradient(130deg, ${
    background.default || "#B2DFDB"
  } 60%, #fff 40%)`};

  overflow-x: hidden;
  width: 100vw;
  flex: 1;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled(ShadowBox)`
  padding: 1.5em 1em;

  h2 {
    font-weight: 500;
    text-align: center;
    margin-bottom: 0.5em;
  }

  input {
    margin: 0.5em auto;
    width: 100%;
  }

  .Home_recSenha {
    text-align: center;
    color: ${letter.lighter || "#9E9E9E"};
    margin: 0.5em auto;
  }

  button {
    display: block;
    width: 100%;
  }
`;

export const EnterButton = styled(SubmitButton)`
  margin: auto !important;
`;
