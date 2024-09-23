import ProfilePage from "@/components/template/ProfilePage";
import { getSession } from "next-auth/react";

function Profile() {
  return (
    <>
      <ProfilePage />
    </>
  );
}

const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: { destination: "/", permanent: false },
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
