import { useState, useEffect } from "react";
import Header from "../shared/Header";
import Aside from "./Aside";
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

  const { data, refetch, loading } = useQuery(FormQuery, {
    variables: { where: { id: router.query.formId } },
  });

  const [form, setForm] = useState();

  useEffect(() => {
    if (data) setForm(data.form);
  }, [loading, setForm]);

  return loading || !form ? (
    <p className="text-2xl font-bold">Loading...</p>
  ) : (
    <div className="flex min-h-screen">
      <main className="bg-zinc-900 grow">
        <Header darkTheme={true} />
      </main>
      <Aside form={form} setForm={setForm} />
    </div>
  );
};

export default EditFormPageLayout;
