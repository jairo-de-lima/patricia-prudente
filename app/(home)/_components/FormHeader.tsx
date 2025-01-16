"use client";
import Image from "next/image";
import FormSelector from "./FormSelector";

type FormHeaderProps = {
  formType: string;
  setFormType: (type: string) => void;
};

const FormHeader = ({ formType, setFormType }: FormHeaderProps) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <Image
        src="/logo.svg"
        alt="logo"
        width={80}
        height={50}
        className="rounded-md"
      />
      <FormSelector value={formType} onValueChange={setFormType} />
    </div>
    <h2 className="text-center text-2xl font-bold font-serif italic">
      Patrícia Prudente - Representante Comercial
    </h2>

    <div className="text-center text-lg text-gray-600"></div>
  </div>
);

export default FormHeader;