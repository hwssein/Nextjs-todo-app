import { Box, Typography } from "@mui/material";

function NotFoundTodos() {
  return (
    <>
      <Box
        component="div"
        sx={{
          width: "100%",
          display: "flex",
          flexFlow: "row nowrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          component="h6"
          variant="h6"
          p={1}
          sx={{ borderBottom: "2px solid var(--primary)" }}
        >
          موردی یافت نشد!
        </Typography>
      </Box>
    </>
  );
}

export default NotFoundTodos;
