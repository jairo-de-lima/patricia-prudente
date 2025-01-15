import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";
import { applyMask } from "@/app/_components/ApplyMask";

type FormFieldProps = {
  field: FieldConfig;
  defaultValue?: string;
};

const FormField = ({ field, defaultValue = "" }: FormFieldProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (field.maskType) {
      e.target.value = applyMask(value, field.maskType); // Aplica a máscara
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor={field.id} className="min-w-[100px] text-purple-800">
        {field.label}:
      </Label>
      <div className="flex-1">
        {field.prefix ? (
          <div className="flex items-center">
            <Input
              id={field.id}
              name={field.id}
              type={field.type}
              required={field.required}
              defaultValue={field.value || defaultValue}
              placeholder={field.prefix}
              onChange={handleInputChange} // Adiciona o evento de mudança
              className="flex-1"
            />
          </div>
        ) : (
          <Input
            id={field.id}
            name={field.id}
            type={field.type}
            required={field.required}
            defaultValue={field.value || defaultValue}
            onChange={handleInputChange} // Adiciona o evento de mudança
            className="flex-1"
          />
        )}
      </div>
    </div>
  );
};

export default FormField;
