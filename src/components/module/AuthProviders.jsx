import { Button, Stack } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { signIn } from "next-auth/react";

function AuthProviders() {
  const githubHandler = async () => {
    await signIn("github");
  };

  return (
    <Stack direction="column" alignItems="center" spacing={1} mt={3} mb={1}>
      <Button
        variant="outlined"
        onClick={githubHandler}
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
    </Stack>
  );
}

export default AuthProviders;
