import React from "react";
import { Auth } from "./modules";

function Context({ children }) {
  return <Auth>{children}</Auth>;
}

export default Context;
