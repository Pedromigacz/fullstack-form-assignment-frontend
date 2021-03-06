import type { NextPage } from "next";
import { PencilIcon, XIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { gql, useQuery, useMutation } from "@apollo/client";

const AllFormsQuery = gql`
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

const RemoveFormQuery = gql`
  mutation ($where: FormWhereUniqueInput!) {
    removeForm(where: $where) {
      id
      name
    }
  }
`;

const FormList: NextPage = () => {
  const { data, refetch } = useQuery(AllFormsQuery);

  const [removeForm] = useMutation(RemoveFormQuery);

  const deleteForm = async (id: string) => {
    await removeForm({ variables: { where: { id } } });
    window.alert("Form deleted successfully");
    refetch();
  };

  return (
    <main className="p-8 flex flex-col gap-4">
      {data ? (
        data.forms.map((form, key) => (
          <div
            key={key}
            className="inline-flex w-full bg-zinc-900 px-8 py-3 drop-shadow-lg text-2xl"
          >
            <p className="text-zinc-50 font-bold mr-auto">{`${form.name} (${form.fields.length} fields)`}</p>
            <Link href={`/editForm/${form.id}`}>
              <a>
                <button className="text-gray-50 font-semibold flex items-center rounded-md px-2 mr-4 hover:bg-zinc-700 transition">
                  <PencilIcon className="h-5 w-5 mr-2" />
                  Edit
                </button>
              </a>
            </Link>
            <button
              className="text-orange-700 font-semibold flex items-center rounded-md px-2 hover:bg-orange-900 transition"
              onClick={() => {
                deleteForm(form.id);
              }}
            >
              <XIcon className="h-6 w-6 mr-1 pt-1" />
              Delete
            </button>
          </div>
        ))
      ) : (
        <p className="text-2xl font-bold">Loading...</p>
      )}
    </main>
  );
};

export default FormList;
