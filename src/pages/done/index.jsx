import { getSession } from "next-auth/react";
import React from "react";

function Done() {
  return <div>Done</div>;
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
