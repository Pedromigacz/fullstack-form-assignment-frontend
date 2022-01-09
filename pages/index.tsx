import type { NextPage } from "next";
import { gql, useQuery, useMutation } from "@apollo/client";

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
  const { data, loading, error } = useQuery(AllLinksQuery);

  if (loading) return <h1>Loading.....</h1>;
  if (error) return <h1>Ops! Something went wrong</h1>;

  console.log(data);

  return <h1>Landing page</h1>;
};

export default Home;
