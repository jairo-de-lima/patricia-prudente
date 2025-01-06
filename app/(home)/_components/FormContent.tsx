import { motion } from "framer-motion";
import FormField from "./FormField";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";

type FormContentProps = {
  config: FormConfig;
  initialData?: Record<string, string>;
};

const FormContent = ({ config, initialData = {} }: FormContentProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="space-y-6"
  >
    <div className="pt-4 text-center text-xl font-semibold">
      <h1>{config.title}</h1>
      <div className="flex items-center justify-center gap-2">
        <Label htmlFor="codigo">{config.codLabel}:</Label>
        <Input
          className="w-[30%]"
          id="codigo"
          name="codigo"
          defaultValue={initialData.codigo || ""}
        />
      </div>
    </div>

    <div className="grid gap-6 md:grid-cols-2">
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        {config.fields.leftColumn.map((field) => (
          <FormField
            key={field.id}
            field={field}
            defaultValue={initialData[field.id]}
          />
        ))}
      </motion.div>

      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        {config.fields.rightColumn.map((field) => (
          <FormField
            key={field.id}
            field={field}
            defaultValue={initialData[field.id]}
          />
        ))}
      </motion.div>
    </div>
  </motion.div>
);

export default FormContent;
