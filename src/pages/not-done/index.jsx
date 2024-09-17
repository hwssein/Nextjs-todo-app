import PlusBtn from "@/components/elements/PlusBtn";
import { getSession } from "next-auth/react";

function NotDone() {
  return (
    <>
      <PlusBtn />
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

export default NotDone;
export { getServerSideProps };
