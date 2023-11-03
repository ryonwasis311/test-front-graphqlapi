import { useRouter } from "next/router";
import { useEffect } from "react";
import MainLayout from "../layouts/MainLayout";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/users");
  }, []);

  return null;
};

HomePage.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
export default HomePage;
