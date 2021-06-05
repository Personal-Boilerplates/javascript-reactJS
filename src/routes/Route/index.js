import React from "react";
import { Route as ReactRoute, Redirect } from "react-router-dom";

function Route({ component: Componente, layout: Layout, privado, footer, ...resto }) {
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
