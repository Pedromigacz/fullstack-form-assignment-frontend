import { PencilIcon } from "@heroicons/react/solid";

const Aside = ({ form, setForm }) => {
  const changeName = (e) => {
    setForm((prev) => ({ ...prev, name: e.target.value }));
  };

  const updateName = (e, field) => {
    setForm((prev) => {
      const newFields = prev.fields.map((iterationField) => {
        if (iterationField.id === field.id)
          return { ...iterationField, label: e.target.value };
        return iterationField;
      });
      return { ...prev, fields: [...newFields] };
    });
  };

  return (
    <aside className="min-w-[600px] p-12">
      <div className="mb-6">
        <label className="block text-2xl font-bold">Title:</label>
        <input
          type="text"
          value={form.name}
          onChange={changeName}
          className="bg-zinc-200 rounded-md px-2 py-1 text-xl font-semibold"
        />
      </div>
      <p className="block text-2xl font-bold">Fields:</p>
      {[...form.fields]
        .sort((prev, curr) => prev.sort_index - curr.sort_index)
        .map((field, key) => (
          <div key={key}>
            <input
              type="text"
              placeHolder="Label"
              value={field.label}
              onChange={(e) => {
                updateName(e, field);
              }}
            />
          </div>
        ))}
    </aside>
  );
};

export default Aside;
