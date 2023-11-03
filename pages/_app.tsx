import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import "../styles/index.css";
import { Provider } from "react-redux";
import { persistor, store } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import ProtectedRoute from "../components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const noAuthRequired = ["/auth/login", "/auth/signup"];

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {noAuthRequired.includes(router.pathname) ? (
            <>{getLayout(<Component {...pageProps} />)}</>
          ) : (
            // <ProtectedRoute>
              getLayout(<Component {...pageProps} />)
            // </ProtectedRoute>
          )}
          <ToastContainer />
        </PersistGate>
      </Provider>
  );
}
