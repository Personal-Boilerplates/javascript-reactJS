import React from "react";
import { Route as ReactRoute } from "react-router-dom";

function Route({ component: Componente, Layout, privado, footer, ...resto }) {
  // const { store } = React.useContext(authContext);

  // if (!logado && privado) {
  //   return <Redirect to="/" />;
  // }

  return (
    <ReactRoute
      {...resto}
      render={(props) =>
        Layout ? (
          <Layout footer={footer}>
            <Componente {...props} />
          </Layout>
        ) : (
          <Componente {...props} />
        )
      }
    />
  );
}

export default Route;
