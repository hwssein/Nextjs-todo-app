import fetcher from "@/utils/fetcher";
import ProfileDetailsForm from "../module/ProfileDetailsForm";
import ShowProfileDetails from "../module/ShowProfileDetails";

import useSWR from "swr";
import { useRouter } from "next/router";

import Loader from "../elements/Loader";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

function ProfilePage() {
  const { data, error, isLoading } = useSWR("/api/profile", fetcher);

  const signOutHandler = () => {
    const confirmQuestion = confirm("خارج می شوید؟");

    if (confirmQuestion) signOut();
  };

  const deleteHandler = async () => {
    const password = prompt("برای حذف حساب رمز عبور خود را وارد کنید");

    const res = await fetch("/api/profile", {
      method: "DELETE",
      body: JSON.stringify({ password }),
      headers: { "Content-type": "application/json" },
    });
    const data = await res.json();

    if (data.status === "failed") toast.error(data.notification);

    if (data.status === "success") {
      toast.success(data.notification);
      signOut();
    }
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

      <Box
        component="div"
        sx={{
          width: "100",
          display: "flex",
          flexFlow: "row nowrap",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "24px",
        }}
      >
        <Button
          variant="contained"
          size="small"
          onClick={signOutHandler}
          sx={{
            width: "100px",
          }}
        >
          خروج
        </Button>

        <Button
          variant="contained"
          size="small"
          onClick={deleteHandler}
          color="error"
          sx={{
            width: "100px",
          }}
        >
          حذف حساب
        </Button>
      </Box>
    </>
  );
}

export default ProfilePage;
