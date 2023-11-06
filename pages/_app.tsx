import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import "../styles/index.css";
import { persistor, store } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import ProtectedRoute from "../components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query-devtools'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: typeof window !== 'undefined' ? localStorage.getItem("auth-token") || "" : ""
  }
});

const noAuthRequired = ["/auth/login", "/auth/signup"];

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page) => page);
  const queryClient = new QueryClient();

  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        {noAuthRequired.includes(router.pathname) ? (
          <>{getLayout(<Component {...pageProps} />)}</>
        ) : (
          // <ProtectedRoute>
          getLayout(<Component {...pageProps} />)
          //  </ProtectedRoute>
        )}
        <ToastContainer />
      </QueryClientProvider>
    </ApolloProvider>
  );
}
