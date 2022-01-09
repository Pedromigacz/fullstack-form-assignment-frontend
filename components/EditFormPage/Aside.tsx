import {
  ArrowNarrowUpIcon,
  ArrowNarrowDownIcon,
  XIcon,
} from "@heroicons/react/solid";

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
      <p className="block text-2xl font-bold mb-6">Fields:</p>
      {[...form.fields]
        .sort((prev, curr) => prev.sort_index - curr.sort_index)
        .map((field, key) => (
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
            <button className="ml-auto p-2">
              <ArrowNarrowUpIcon className="h-5 w-5 mr-2" />
            </button>
            <button className="p-2">
              <ArrowNarrowDownIcon className="h-5 w-5 mr-2" />
            </button>
            <button className="p-2">
              <XIcon className="h-5 w-5 mr-2 text-orange-700" />
            </button>
          </div>
        ))}
    </aside>
  );
};

export default Aside;
