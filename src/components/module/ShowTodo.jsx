import { Box, Button, Typography } from "@mui/material";

function ShowTodo({ data }) {
  return (
    <>
      <Box
        component="div"
        sx={{
          width: "100%",
          border: "1px solid var(--secondary)",
          borderRadius: "8px",
          padding: "8px",
          display: "flex",
          flexFlow: "column nowrap",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: "8px",
        }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            flexFlow: "row nowrap",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: "8px",
          }}
        >
          <Typography component="p" variant="p">
            عنوان:
          </Typography>

          <Typography component="p" variant="p">
            {data.title}
          </Typography>
        </Box>

        <Box
          component="div"
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="contained" size="small">
            تغییر وضعیت
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default ShowTodo;
