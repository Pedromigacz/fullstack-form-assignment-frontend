import type { NextPage } from "next";
import { gql, useQuery, useMutation } from "@apollo/client";
import HomePage from "../components/HomePage";

const AllLinksQuery = gql`
  query {
    forms {
      id
      name
      fields {
        id
      }
    }
  }
`;

const Home: NextPage = () => {
  const { data } = useQuery(AllLinksQuery);

  return <HomePage data={data} />;
};

export default Home;
