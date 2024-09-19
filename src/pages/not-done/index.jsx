import PlusBtn from "@/components/elements/PlusBtn";
import NotDonePage from "@/components/template/NotDonePage";
import { getSession } from "next-auth/react";

function NotDone() {
  return (
    <>
      <NotDonePage />
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
