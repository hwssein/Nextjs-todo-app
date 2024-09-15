import { getSession } from "next-auth/react";
import React from "react";

function NotDone() {
  return <div>NotDone</div>;
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

export default NotDone;
export { getServerSideProps };
