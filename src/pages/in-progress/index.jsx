import InProgressPage from "@/components/template/InProgressPage";
import { getSession } from "next-auth/react";
import React from "react";

function InProgress() {
  return (
    <>
      <InProgressPage />
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

export default InProgress;
export { getServerSideProps };
