import type { NextPage } from "next";
import Header from "../shared/Header";
import FormList from "./FormList";

const HomePageLayout: NextPage = () => (
  <>
    <Header />
    <FormList />
  </>
);

export default HomePageLayout;
