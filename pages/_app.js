import '../styles/globals.css'
import '../styles/Landing.css'
import { Provider } from "react-redux";
import { store, persistor } from "./../redux/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
