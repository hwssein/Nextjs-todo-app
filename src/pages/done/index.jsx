import DonePage from "@/components/template/DonePage";
import { getSession } from "next-auth/react";
import React from "react";

function Done() {
  return (
    <>
      <DonePage />
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

export default Done;
export { getServerSideProps };
