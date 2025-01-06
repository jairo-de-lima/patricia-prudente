import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";

type FormFieldProps = {
  field: FieldConfig;
  defaultValue?: string;
};

const FormField = ({ field, defaultValue = "" }: FormFieldProps) => (
  <div className="space-y-2">
    <Label htmlFor={field.id}>{field.label}:</Label>
    <Input
      id={field.id}
      name={field.id}
      type={field.type}
      required={field.required}
      step={field.step}
      defaultValue={defaultValue}
    />
  </div>
);

export default FormField;
