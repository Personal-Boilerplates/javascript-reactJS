import React from 'react';
import { Route as ReactRoute } from 'react-router-dom';

function Route({ component: Componente, Layout, footer, ...props }) {
  // const { store } = React.useContext(authContext);

  // if (!logado && private) {
  //   return <Redirect to="/" />;
  // }

  return (
    <ReactRoute
      {...props}
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
