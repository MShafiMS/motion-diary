import { BlogsProvider } from "@component/Hooks/BlogsContext";
import "@component/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Footer from "./Components/shared/Footer";
import Nav from "./Components/shared/Nav";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <BlogsProvider>
        <Nav />
        <>
          {Component.PageLayout ? (
            <Component.PageLayout>
              <Component {...pageProps} />
            </Component.PageLayout>
          ) : (
            <Component {...pageProps} />
          )}
        </>
        <Footer />
      </BlogsProvider>
    </QueryClientProvider>
  );
}
