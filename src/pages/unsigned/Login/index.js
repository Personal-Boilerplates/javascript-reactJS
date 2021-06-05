import React from "react";
import Form from "~/Componentes/LogicalComponents/CustomForm/Form";
import { ClearButton } from "~/Componentes/styledComponents/buttons/ClearButton";
import SubmitButton from "~/Componentes/styledComponents/buttons/SubmitButton";
import LightInput from "~/Componentes/styledComponents/Inputs/LightInput";

import { Container, Content } from "./styles";

function Login() {
  return (
    <Container>
      <Content>
        <h2>Login</h2>
        <Form style={{ display: "flex", flexDirection: "column" }} onSubmit={console.log}>
          <LightInput required placeholder="E-mail" name="email" />
          <LightInput required placeholder="Senha" name="senha" />

          <ClearButton type="button" className="Home_recSenha">
            Esqueci minha senha
          </ClearButton>
          <SubmitButton>Entrar</SubmitButton>
        </Form>
      </Content>
    </Container>
  );
}

export default Login;
