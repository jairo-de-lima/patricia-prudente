"use client";
import { motion } from "framer-motion";
import FormField from "./FormField";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { FormConfig } from "./types";

type FormContentProps = {
  config: FormConfig;
  initialData?: Record<string, string>;
};

const FormContent = ({ config, initialData = {} }: FormContentProps) => {
  const renderFields = (field: any) => {
    if (field.isRow) {
      return (
        <div key={field.id} className="flex flex-wrap gap-4 md:flex md:gap-4">
          {field.fields.map((subField: any) => (
            <div key={subField.id} className="md:flex-1 w-full sm:w-1/2">
              <FormField
                field={subField}
                defaultValue={initialData[subField.id]}
              />
            </div>
          ))}
        </div>
      );
    }

    return (
      <FormField
        key={field.id}
        field={field}
        defaultValue={initialData[field.id]}
      />
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header com título e data */}
      <div className="flex items-center justify-between pt-4">
        <h1 className="text-xl font-semibold">{config.title}</h1>
        {config.dataCad && (
          <div className="flex items-center gap-2">
            <Label>DATA CAD:</Label>
            <Input
              type="date"
              className="w-36"
              name="dataCad"
              defaultValue={initialData.dataCad || ""}
            />
          </div>
        )}
      </div>

      {/* Campo de código se existir */}
      {config.codLabel && (
        <div className="flex items-center gap-2">
          <Label htmlFor="codigo">{config.codLabel}:</Label>
          <Input
            className="w-40"
            id="codigo"
            name="codigo"
            defaultValue={initialData.codigo || ""}
          />
        </div>
      )}

      {/* Campos do formulário */}
      <div className="space-y-4">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {config.fields.leftColumn.map(renderFields)}
        </motion.div>

        {/* Campos extras se existirem */}
        {config.fields.extras && (
          <motion.div
            className="mt-4 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {config.fields.extras.map(renderFields)}
          </motion.div>
        )}

        {/* Campo de observações se existir */}
        {config.fields.obs && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <FormField
              field={{
                id: "obs",
                label: "OBS",
                type: "text",
                required: false,
                prefix: "",
                value: "",
              }}
              defaultValue={initialData.obs}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default FormContent;