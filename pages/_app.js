import React from "react";
import '../styles/globals.css'
import '../styles/Landing.css'
import { Provider } from "react-redux";
import { store } from "./../redux/store";

function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || (({ children }) => <>{children}</>);
  return (
    <Provider store={store}>
      <React.Fragment>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </React.Fragment>
    </Provider>
  )
}

export default MyApp
