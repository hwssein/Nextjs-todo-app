import ProfilePage from "@/components/template/ProfilePage";
import { authOption } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

function Profile() {
  return (
    <>
      <ProfilePage />
    </>
  );
}

const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOption);

  if (!session) {
    return {
      redirect: { destination: "/" },
    };
  }

  return {
    props: {
      data: null,
    },
  };
};

export default Profile;
export { getServerSideProps };
