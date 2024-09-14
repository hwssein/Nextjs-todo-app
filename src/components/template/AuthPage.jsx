import { useState } from "react";

import SignIn from "@/components/template/SignIn";
import SignUp from "@/components/template/SignUp";

import { Box, Button, Typography } from "@mui/material";
function AuthPage() {
  const [entryStatus, setEntryStatus] = useState("signIn");

  return (
    <>
      <Box
        component="div"
        sx={{
          width: "100%",
          maxWidth: "800px",
          display: "flex",
          flexFlow: "column nowrap",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "var(--card-bg-color)",
          borderRadius: "8px",
          marginTop: "4px",
          padding: "4px",
        }}
      >
        <Box
          component="div"
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <Typography
            component="h6"
            variant="h6"
            sx={{
              borderBottom: "2px solid var(--primary)",
              padding: "4px",
            }}
          >
            ابتدا وارد حساب خود شوید
          </Typography>
        </Box>

        <Box
          component="div"
          sx={{
            width: "100%",
            display: "flex",
            flexFlow: "row nowrap",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
            gap: "8px",
          }}
        >
          <Button
            onClick={() => setEntryStatus("signIn")}
            variant="contained"
            sx={{
              backgroundColor:
                entryStatus === "signIn"
                  ? "var(--primary)"
                  : "var(--secondary)",
            }}
          >
            ورود
          </Button>
          <Button
            onClick={() => setEntryStatus("signUp")}
            variant="contained"
            sx={{
              backgroundColor:
                entryStatus === "signUp"
                  ? "var(--primary)"
                  : "var(--secondary)",
            }}
          >
            ایجاد حساب
          </Button>
        </Box>

        {entryStatus === "signUp" ? (
          <SignUp setEntryStatus={setEntryStatus} />
        ) : (
          <SignIn />
        )}
      </Box>
    </>
  );
}

export default AuthPage;
