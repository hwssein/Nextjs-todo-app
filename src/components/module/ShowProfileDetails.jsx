import { Box, Stack, Divider, Typography } from "@mui/material";

function ShowProfileDetails({ data }) {
  return (
    <>
      <Stack
        direction="column"
        spacing={1}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        <Box
          component="div"
          sx={{
            width: "100%",
            display: "flex",
            flexFlow: "row nowrap",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "8px",
          }}
        >
          <Typography component="h6" variant="h6" color="primary">
            نام:
          </Typography>
          <Typography component="h6" variant="h6" color="secondary">
            {data.name}
          </Typography>
        </Box>

        <Box
          component="div"
          sx={{
            width: "100%",
            display: "flex",
            flexFlow: "row nowrap",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "8px",
          }}
        >
          <Typography component="h6" variant="h6" color="primary">
            نام خانوادگی:
          </Typography>
          <Typography component="h6" variant="h6" color="secondary">
            {data.lastName}
          </Typography>
        </Box>
      </Stack>
    </>
  );
}

export default ShowProfileDetails;
