"use client";
import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";
import { FieldConfig } from "./types";
import { useEffect, useState } from "react";
import { applyMask } from "@/app/_components/ApplyMask";

type FormFieldProps = {
  field: FieldConfig;
  defaultValue?: string;
  reset: boolean; // Novo: controle de reset
};

const FormField = ({ field, defaultValue = "", reset }: FormFieldProps) => {
  const [value, setValue] = useState<string>(defaultValue);

  // Reseta o campo quando `reset` mudar para true
  useEffect(() => {
    if (reset) {
      setValue(""); // Reseta o valor
    }
  }, [reset]);

  // Função para lidar com a alteração de valor do campo e aplicar a máscara
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const maskedValue = applyMask(inputValue, field.mask || "");
    setValue(maskedValue);
  };

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor={field.id} className="min-w-[100px] text-purple-800">
        {field.label}:
      </Label>
      <div className="flex-1">
        <Input
          id={field.id}
          name={field.id}
          value={value}
          onChange={handleChange}
          type={field.type}
          required={field.required}
          placeholder={field.prefix || ""}
          className="flex-1"
        />
      </div>
    </div>
  );
};

export default FormField;
