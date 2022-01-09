import {
  ArrowNarrowUpIcon,
  ArrowNarrowDownIcon,
  XIcon,
} from "@heroicons/react/solid";
import { gql, useQuery, useMutation } from "@apollo/client";

const UpdateFormQuery = gql`
  mutation ($input: UpdateFormInput!, $fields: [UpdateFormFieldInput]) {
    updateForm(input: $input, fields: $fields) {
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

const Aside = ({ form, setForm }) => {
  const [updateForm] = useMutation(UpdateFormQuery);
  const changeName = (e) => {
    setForm((prev) => ({ ...prev, name: e.target.value }));
  };

  const updateName = (e, field) => {
    e.preventDefault();
    setForm((prev) => {
      const newFields = prev.fields.map((iterationField) => {
        if (iterationField.id === field.id)
          return { ...iterationField, label: e.target.value };
        return iterationField;
      });
      return { ...prev, fields: [...newFields] };
    });
  };

  const addField = (e) => {
    e.preventDefault();
    setForm((prev) => ({
      ...prev,
      fields: [
        ...prev.fields,
        {
          label: "",
          sort_index:
            prev.fields.reduce((prev, curr) => {
              return Math.max(prev, curr.sort_index);
            }, 0) + 1,
        },
      ],
    }));
  };

  const removeField = (index) => {
    setForm((prev) => {
      const newFields = prev.fields.filter((field, key) => {
        return key !== index;
      });
      return {
        ...prev,
        fields: newFields,
      };
    });
  };

  const advanceInOrder = (e, index) => {
    e.preventDefault();
    setForm((prev) => {
      let newFieldsOrder = [...prev.fields];
      let bubble = newFieldsOrder[index].sort_index;
      newFieldsOrder[index].sort_index = newFieldsOrder[index - 1].sort_index;
      newFieldsOrder[index - 1].sort_index = bubble;

      return { ...prev, fields: [...newFieldsOrder] };
    });
  };

  const submitUpdate = async (e) => {
    e.preventDefault();
    console.log(form);
    await updateForm({
      variables: {
        input: { id: form.id, name: form.name },
        fields: form.fields.map((field) => ({
          label: field.label,
          id: field.id,
          sort_index: field.sort_index,
        })),
      },
    });
    window.alert("Form saved successfully");
  };

  return (
    <form
      className="min-w-[600px] p-12 flex flex-col items-end"
      onSubmit={submitUpdate}
    >
      <div className="mb-6 w-full">
        <label className="block text-2xl font-bold">Title:</label>
        <input
          type="text"
          value={form.name}
          onChange={changeName}
          className="bg-zinc-200 rounded-md px-2 py-1 text-xl font-semibold"
        />
      </div>
      <div className="w-full">
        <p className="block text-2xl font-bold mb-6">Fields:</p>
        {[...form.fields].map((field, key) => (
          <div
            key={key}
            className="w-full bg-zinc-200 rounded-md flex overflow-hidden mb-4"
          >
            <input
              type="text"
              placeHolder="Label"
              className="bg-zinc-200 border-none outline-0 px-4 py-3 inline-block"
              value={field.label}
              onChange={(e) => {
                updateName(e, field);
              }}
            />
            <button
              className="ml-auto p-2"
              onClick={(e) => {
                advanceInOrder(e, key);
              }}
            >
              <ArrowNarrowUpIcon className="h-5 w-5 mr-2" />
            </button>
            <button className="p-2">
              <ArrowNarrowDownIcon className="h-5 w-5 mr-2" />
            </button>
            <button
              className="p-2"
              onClick={(e) => {
                removeField(key);
              }}
            >
              <XIcon className="h-5 w-5 mr-2 text-orange-700" />
            </button>
          </div>
        ))}
        <button
          className="bg-cyan-600 text-gray-50 px-4 py-2 rounded-md text-lg"
          onClick={addField}
        >
          Add new field
        </button>
      </div>
      <button className="bg-cyan-600 text-gray-50 px-4 py-2 rounded-md text-lg mt-auto">
        Save
      </button>
    </form>
  );
};

export default Aside;
