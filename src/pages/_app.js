import { SessionProvider } from "next-auth/react";
import theme from "@/config/theme";
import Layout from "@/components/layout/Layout";

import "@/styles/globals.css";
import { Container, ThemeProvider } from "@mui/material";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Container maxWidth="lg">
              <Component {...pageProps} />
              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
            </Container>
          </Layout>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}
