import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";

import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "./styles";
import Context from "./AppContext";

function MainApp() {
  return (
    <Context>
      <BrowserRouter>
        <GlobalStyle />
        <Routes />
      </BrowserRouter>
    </Context>
  );
}

export default MainApp;
