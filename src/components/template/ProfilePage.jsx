import fetcher from "@/utils/fetcher";
import ProfileDetailsForm from "../module/ProfileDetailsForm";
import ShowProfileDetails from "../module/ShowProfileDetails";

import useSWR from "swr";

import Loader from "../elements/Loader";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { signOut } from "next-auth/react";

function ProfilePage() {
  const { data, error, isLoading } = useSWR("/api/profile", fetcher);

  const signOutHandler = () => {
    const confirmQuestion = confirm("آیا خارج می شوید؟");

    if (confirmQuestion) signOut();
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Stack
        direction="column"
        spacing={1}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        {!data.data.name || !data.data.lastName ? (
          <ProfileDetailsForm />
        ) : (
          <ShowProfileDetails data={data.data} />
        )}

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
            ایمیل:
          </Typography>
          <Typography component="h6" variant="h6" color="secondary">
            {data.data.email}
          </Typography>
        </Box>
      </Stack>

      <Button
        variant="contained"
        size="small"
        onClick={signOutHandler}
        sx={{
          width: "100px",
          marginTop: "16px",
          display: "block",
          float: "left",
        }}
      >
        خروج
      </Button>
    </>
  );
}

export default ProfilePage;
