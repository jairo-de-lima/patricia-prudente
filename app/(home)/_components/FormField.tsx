"use client";
import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";
import { FieldConfig } from "./types";
import InputMask from "react-input-mask"; // Importando o InputMask

type FormFieldProps = {
  field: FieldConfig;
  defaultValue?: string;
};

const FormField = ({ field, defaultValue = "" }: FormFieldProps) => (
  <div className="flex items-center gap-2">
    <Label htmlFor={field.id} className="min-w-[100px] text-purple-800">
      {field.label}:
    </Label>
    <div className="flex-1">
      {field.prefix ? (
        <div className="flex items-center">
          <InputMask
            id={field.id}
            name={field.id}
            mask={field.mask || ""}
            defaultValue={field.value || defaultValue}
          >
            {(inputProps) => (
              <Input
                {...inputProps}
                type={field.type}
                required={field.required}
                placeholder={field.prefix}
                className="flex-1"
              />
            )}
          </InputMask>
        </div>
      ) : (
        <InputMask
          id={field.id}
          name={field.id}
          mask={field.mask || ""}
          defaultValue={field.value || defaultValue}
        >
          {(inputProps) => (
            <Input
              {...inputProps}
              type={field.type}
              required={field.required}
              className="flex-1"
            />
          )}
        </InputMask>
      )}
    </div>
  </div>
);

export default FormField;