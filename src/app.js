import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Routes from "./routes";

import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "./styles";
import Context from "./Context";

function App() {
  return (
    <Context>
      <ToastContainer />
      <BrowserRouter>
        <GlobalStyle />
        <Routes />
      </BrowserRouter>
    </Context>
  );
}

export default App;
