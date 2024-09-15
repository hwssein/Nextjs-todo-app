import { Button, Stack } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { signIn } from "next-auth/react";

function AuthProviders() {
  return (
    <Stack direction="column" alignItems="center" spacing={1} mt={3} mb={1}>
      <Button
        variant="outlined"
        name="github"
        onClick={() => signIn("github")}
        sx={{
          width: "300px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "8px",
        }}
      >
        ورود با گیت هاب <GitHubIcon />
      </Button>

      <Button
        variant="outlined"
        name="google"
        onClick={() => signIn("google")}
        sx={{
          width: "300px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "8px",
        }}
      >
        ورود با گوگل <GoogleIcon />
      </Button>
    </Stack>
  );
}

export default AuthProviders;
