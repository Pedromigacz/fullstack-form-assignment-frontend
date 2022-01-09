import { useState, useEffect } from "react";
import Header from "../shared/Header";
import Aside from "./Aside";
import PuppetForm from "../shared/PuppetForm";
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

  interface field {
    id?: string;
    label?: string;
    sort_index?: number;
  }

  interface formType {
    id?: string;
    label?: string;
    fields?: {
      [key: string]: field;
    };
  }

  const [form, setForm] = useState<formType>({ name: "", id: "", fields: [] });

  useEffect(() => {
    if (data)
      setForm((prev) => ({
        ...data.form,
        fields: [...data.form.fields].sort(
          (prev, curr) => prev.sort_index - curr.sort_index
        ),
      }));
  }, [loading, setForm]);

  return loading || !form ? (
    <p className="text-2xl font-bold">Loading...</p>
  ) : (
    <div className="flex min-h-screen">
      <main className="bg-zinc-900 grow">
        <Header darkTheme={true} />
        <PuppetForm form={form} />
      </main>
      <Aside form={form} setForm={setForm} />
    </div>
  );
};

export default EditFormPageLayout;
