import type { NextPage } from "next";
import Header from "../shared/Header";
import FormList from "./FormList";

const HomePageLayout: NextPage = ({ data }) => {
  return (
    <>
      <Header />
      <FormList formList={data} />
    </>
  );
};

export default HomePageLayout;
