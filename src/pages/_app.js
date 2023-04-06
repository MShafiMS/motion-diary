import "@component/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Footer from "./Components/shared/Footer";
import Nav from "./Components/shared/Nav";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Nav />
        <div className="min-h-screen">
          {Component.PageLayout ? (
            <Component.PageLayout>
              <Component {...pageProps} />
            </Component.PageLayout>
          ) : (
            <Component {...pageProps} />
          )}
        </div>
        <Footer />
      </>
    </QueryClientProvider>
  );
}
