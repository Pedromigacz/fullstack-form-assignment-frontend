import Link from "next/link";
import { useForm } from "react-hook-form";

const FormPreview = ({ form }) => {
  const { handleSubmit, register } = useForm();

  const onSubmit = (e) => console.log(e);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-8 mt-2 text-zinc-50">
      <h2 className="text-2xl font-bold mb-8">
        Form preview: &quot;{form.name}&rdquo;
      </h2>

      {form.fields.map((field, key) => (
        <div className="mt-1" key={key}>
          <label className="block font-semibold ml-6">{field.label}:</label>
          <input
            className="border-none bg-zinc-800 rounded-md px-6 py-4 mt-2 mb-4 w-full text-xl font-semibold"
            name={field.label}
            {...register(field.label)}
          />
        </div>
      ))}
      <button
        className="bg-cyan-600 text-gray-50 px-4 py-2 rounded-md text-lg my-6"
        type="submit"
      >
        Submit form
      </button>
    </form>
  );
};

export default FormPreview;
