import AuthPage from "@/components/template/AuthPage";
import { Stack } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOption } from "./api/auth/[...nextauth]";

function HomePage() {
  return (
    <Stack flexDirection="row" alignItems="center" justifyContent="center">
      <AuthPage />
    </Stack>
  );
}

const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOption);

  if (session) {
    return {
      redirect: {
        destination: "/add-todo",
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
