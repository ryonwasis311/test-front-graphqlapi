import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import "../styles/index.css";
import { persistor, store } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import ProtectedRoute from "../components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

const noAuthRequired = ["/auth/login", "/auth/signup"];

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ApolloProvider client={client}>
      <PersistGate loading={null} persistor={persistor}>
        {noAuthRequired.includes(router.pathname) ? (
          <>{getLayout(<Component {...pageProps} />)}</>
        ) : (
          // <ProtectedRoute>
          getLayout(<Component {...pageProps} />)
          //  </ProtectedRoute>
        )}
        <ToastContainer />
      </PersistGate>
    </ApolloProvider>
  );
}
