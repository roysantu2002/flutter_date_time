import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import TopHeader from "../components/layout/TopHeader";
import Header from "../components/layout/Header";
import AppFooter from "../components/layout/AppFooter";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../constants/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from "react-redux";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import InitialLoading from "../components/loading/InitialLoading";
import { firebase, firestore } from "../utils/firebase";
import { newStore } from "../store";
import "react-toastify/dist/ReactToastify.css";
import throttle from "lodash/throttle";
import { saveState } from "../utils/helpers";
import { Container } from "@material-ui/core";
import { createFirestoreInstance } from "redux-firestore";

const ReactReduxFirebaseProvider = dynamic(() =>
  import("react-redux-firebase").then((mod) => mod.ReactReduxFirebaseProvider)
);

function MyApp({ Component, pageProps }) {
  const [value, setValue] = useState(false);

  const rrfConfig = {
    userProfile: "users",
    useFirestoreForProfile: true,
    updateProfileOnLogin: false,
  };

  const store = newStore();
  const rrfProps = {
    firebase,
    firestore,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
  };
  // console.log(store.getState())

  store.subscribe(
    throttle(() => {
      saveState(store.getState().storeItems);
    }, 1000)
  );

  function AuthIsLoaded({ children }) {
    // const firebase = useSelector((state) => state.firebase);
    const auth = useSelector((state) => state.firebase.auth);

    // const auth = false
    if (!isLoaded(auth)) return <InitialLoading />;
    // if (!auth) return <InitialLoading />;

    var condition = navigator.onLine ? "online" : "offline";
    if (condition === "online") {
      if (!isLoaded(auth)) return <InitialLoading />;
      return children;
    } else {
      return <InitialLoading />;
    }
  }
  // return children;

  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        {/* <GlobalStyles/> */}
        <CssBaseline />
        <Provider store={store}>
          <ReactReduxFirebaseProvider {...rrfProps}>
            <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
              <AuthIsLoaded>
                <TopHeader />

                <Header value={value} setValue={setValue} />

                <Component {...pageProps} />
                <AppFooter />
              </AuthIsLoaded>
            </Container>
          </ReactReduxFirebaseProvider>
        </Provider>
      </ThemeProvider>
    </Layout>
  );
}

export default MyApp;
