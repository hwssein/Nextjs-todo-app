import Link from "next/link";
import ResMenu from "../module/ResMenu";

import { Box, Container, Typography } from "@mui/material";

function Layout({ children }) {
  return (
    <>
      <header>
        <Box
          component="div"
          sx={{
            width: "100%",
            height: "2px",
            backgroundColor: "var(--tertiary)",
            marginBottom: "8px",
          }}
        ></Box>
      </header>

      <main>{children}</main>

      <aside>
        <Container maxWidth="lg">
          <ResMenu />
        </Container>
      </aside>

      <footer></footer>
    </>
  );
}

export default Layout;
