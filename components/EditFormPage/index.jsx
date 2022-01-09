import Header from "../shared/Header";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const FormQuery = gql`
  query ($where: FormWhereUniqueInput!) {
    form(where: $where) {
      id
      name
      fields {
        id
        sort_index
        label
      }
    }
  }
`;

const EditFormPageLayout = () => {
  const router = useRouter();

  const { data, refetch } = useQuery(FormQuery, {
    variables: { where: { id: router.query.formId } },
  });

  console.log(data);
  return (
    <div className="flex">
      <main className="bg-zinc-900 ">
        <Header darkTheme={true} />
      </main>
      <aside></aside>
    </div>
  );
};

export default EditFormPageLayout;
