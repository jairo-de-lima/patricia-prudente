"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import { useToast } from "@/app/_hooks/use-toast";
import { createRegistration } from "@/app/_lib/actions";
import FormHeader from "./FormHeader";
import FormContent from "./FormContent";
import { formConfigs } from "./FormsConfgs";

// Animações do Framer Motion
const formVariants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const RegistrationForm = ({ initialData = {} }) => {
  const [formType, setFormType] = useState("cliente");
  const { toast } = useToast();
  const config = formConfigs[formType];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const config = formConfigs[formType];
    const allFields = [...config.fields.leftColumn];

    const requiredFields = allFields
      .filter((field) => field.required && !data[field.id])
      .map((field) => field.label);

    if (requiredFields.length > 0) {
      toast({
        title: "Erro de validação",
        description: `Os seguintes campos são obrigatórios: ${requiredFields.join(
          ", "
        )}`,
        duration: 4000,
      });
      return;
    }

    try {
      await createRegistration({ type: formType, ...data });
      e.target.reset();
      toast({
        title: "Sucesso",
        description: "Cadastro realizado com sucesso",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao realizar cadastro",
        duration: 4000,
      });
      console.error("Error submitting form:", error);
    }
  };

  return (
    <motion.div
      initial="enter"
      animate="center"
      exit="exit"
      className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4"
    >
      <Card className="w-full max-w-6xl">
        <CardHeader>
          <FormHeader formType={formType} setFormType={setFormType} />
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={formType}
                variants={formVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <FormContent config={config} initialData={initialData} />
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" type="reset">
                Limpar
              </Button>
              <Button type="submit">Cadastrar</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RegistrationForm;