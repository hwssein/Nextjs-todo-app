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

      <footer>
        <Container
          maxWidth="lg"
          sx={{
            width: "100%",
            display: "flex",
            flexFlow: "column nowrap",
            alignItems: "center",
            justifyContent: "flex-start",
            marginBottom: "48px",
          }}
        >
          <Link href="https://github.com/hwssein" target="_blank">
            <Box
              component="div"
              sx={{
                borderBottom: "2px solid var(--tertiary)",
                borderRadius: "4px",
              }}
            >
              <Typography
                component="p"
                variant="p"
                textAlign="center"
                p={1}
                mt={2}
              >
                Developed By hwssein
              </Typography>
            </Box>
          </Link>
        </Container>
      </footer>
    </>
  );
}

export default Layout;
