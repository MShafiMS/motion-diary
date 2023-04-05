import "@component/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Nav from "./Components/shared/Nav";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Nav />
        {Component.PageLayout ? (
          <Component.PageLayout>
            <Component {...pageProps} />
          </Component.PageLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </div>
    </QueryClientProvider>
  );
}
