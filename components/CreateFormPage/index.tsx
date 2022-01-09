import { useState, useEffect } from "react";
import Header from "../shared/Header";
import Aside from "./Aside";
import FormPreview from "../shared/FormPreview";

const CreateFormPageLayout = () => {
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

  const [form, setForm] = useState<formType>({
    name: "add a name to your form",
    fields: [],
  });

  return (
    <div className="flex min-h-screen">
      <main className="bg-zinc-900 grow">
        <Header darkTheme={true} />
        <FormPreview form={form} />
      </main>
      <Aside form={form} setForm={setForm} />
    </div>
  );
};

export default CreateFormPageLayout;
