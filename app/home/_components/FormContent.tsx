"use client";
import { motion } from "framer-motion";
import FormField from "./FormField";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { FormConfig } from "./types";
import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import TransportadoraSection from "./TransportadoraSection";

type FormContentProps = {
  config: FormConfig;
  initialData?: Record<string, string>;
  clientCod: { codigo: string };
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onTransportadoraChange: (data: {
    razaoSocial: string;
    telefone: string;
  }) => void;
  reset?: boolean;
};

const FormContent = ({
  config,
  initialData,
  clientCod,
  onSubmit,
  onTransportadoraChange,
}: FormContentProps) => {
  const [reset, setReset] = useState(false);

  const handleReset = () => {
    setReset(true);
    setTimeout(() => setReset(false), 0);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita recarregar a página

    try {
      onSubmit(event); // Aguarda o envio dos dados
      handleReset(); // Reseta o formulário somente após sucesso
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    }
  };

  const renderFields = (field: any) => {
    if (field.isRow) {
      return (
        <div key={field.id} className="flex flex-wrap gap-4 md:flex md:gap-4">
          {field.fields.map((subField: any) => (
            <div key={subField.id} className="md:flex-1 w-full sm:w-1/2">
              <FormField
                field={subField}
                defaultValue={initialData?.[subField.id]}
                reset={reset}
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
        defaultValue={initialData?.[field.id]}
        reset={reset}
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between pt-4">
          <h1 className="text-xl font-semibold">{config.title}</h1>
          {config.dataCad && (
            <div className="flex items-center gap-2">
              <Label>DATA CAD:</Label>
              <Input
                type="date"
                className="w-36"
                name="dataCad"
                defaultValue={initialData?.dataCad || ""}
              />
            </div>
          )}
        </div>

        {config.codLabel && (
          <div className="flex items-center gap-2">
            <Label htmlFor="codigo">{config.codLabel}:</Label>
            <Input
              id="codigo"
              name="codigo"
              value={clientCod.codigo}
              disabled
              className="w-14"
            />
          </div>
        )}

        {config.clientLabel && (
          <div className="flex items-center gap-2">
            <Label htmlFor="codigo">{config.clientLabel}:</Label>
            <Input
              id="codigo"
              name="codigo"
              value={clientCod.codigo}
              disabled
              className="w-14"
            />
          </div>
        )}

        <div className="space-y-4">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {config.fields.leftColumn.map(renderFields)}
          </motion.div>

          {config.fields.extras && (
            <motion.div
              className="mt-4 flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {config.fields.extras.map(renderFields)}
            </motion.div>
          )}

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
                defaultValue={initialData?.obs}
                reset={reset}
              />
            </motion.div>
          )}
          {config.title === "Cadastro de Cliente" && (
            <TransportadoraSection
              onTransportadoraChange={onTransportadoraChange}
              reset={reset}
            />
          )}
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" type="reset" onClick={handleReset}>
            Limpar
          </Button>
          <Button type="submit">Cadastrar</Button>
        </div>
      </form>
    </motion.div>
  );
};

export default FormContent;
