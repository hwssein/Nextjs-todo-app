import AuthPage from "@/components/template/authPage";
import { Stack } from "@mui/material";
import { getSession } from "next-auth/react";

function HomePage() {
  return (
    <Stack flexDirection="row" alignItems="center" justifyContent="center">
      <AuthPage />
    </Stack>
  );
}

const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/not-done",
        permanent: false,
      },
    };
  }

  return {
    props: {
      data: null,
    },
  };
};

export default HomePage;
export { getServerSideProps };
