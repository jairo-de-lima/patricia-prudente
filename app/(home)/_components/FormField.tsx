import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";

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
          <Input
            id={field.id}
            name={field.id}
            type={field.type}
            required={field.required}
            defaultValue={field.value || defaultValue}
            placeholder={field.prefix}
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
          className="flex-1"
        />
      )}
    </div>
  </div>
);

export default FormField;
