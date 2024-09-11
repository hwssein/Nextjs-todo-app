import { SessionProvider } from "next-auth/react";
import theme from "@/config/theme";
import Layout from "@/components/layout/Layout";

import "@/styles/globals.css";
import { Container, ThemeProvider } from "@mui/material";

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <SessionProvider session={pageProps.session}> */}
      <ThemeProvider theme={theme}>
        <Layout>
          <Container maxWidth="lg">
            <Component {...pageProps} />
          </Container>
        </Layout>
      </ThemeProvider>
      {/* </SessionProvider> */}
    </>
  );
}
