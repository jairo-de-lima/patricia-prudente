"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
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
  const [formType, setFormType] = useState<
    "cliente" | "fornecedor" | "transportadora"
  >("cliente");
  const [codigo, setCodigo] = useState("");
  const { toast } = useToast();
  const [transportadoraData, setTransportadoraData] = useState({
    razaoSocial: "",
    telefone: "",
  });
  const config = formConfigs[formType];

  const fetchCodigo = async () => {
    try {
      // Criando um mapeamento para os valores corretos dos endpoints
      const endpointMapping = {
        cliente: "clientes", // 'cliente' mapeado para 'clientes'
        fornecedor: "fornecedores", // 'fornecedor' mapeado para 'fornecedores'
        transportadora: "transportadora", // 'transportadora' já está correto
      };

      // Usando o mapeamento para garantir o endpoint correto
      const endpoint = endpointMapping[formType];

      if (!endpoint) {
        throw new Error("Tipo de cadastro inválido");
      }

      // Fazendo a requisição com o endpoint correto
      const response = await fetch(`/api/${endpoint}/count`);

      if (!response.ok) {
        throw new Error("Erro ao buscar o código");
      }

      const data = await response.json();
      setCodigo((data + 1).toString()); // Define o próximo código
    } catch (error) {
      console.error("Erro ao buscar o código:", error);
    }
  };

  useEffect(() => {
    const fetchCodigo = async () => {
      try {
        // Criando um mapeamento para os valores corretos dos endpoints
        const endpointMapping = {
          cliente: "clientes", // 'cliente' mapeado para 'clientes'
          fornecedor: "fornecedores", // 'fornecedor' mapeado para 'fornecedores'
          transportadora: "transportadora", // 'transportadora' já está correto
        };

        // Usando o mapeamento para garantir o endpoint correto
        const endpoint = endpointMapping[formType];

        if (!endpoint) {
          throw new Error("Tipo de cadastro inválido");
        }

        // Fazendo a requisição com o endpoint correto
        const response = await fetch(`/api/${endpoint}/count`);

        if (!response.ok) {
          throw new Error("Erro ao buscar o código");
        }

        const data = await response.json();
        setCodigo((data + 1).toString()); // Define o próximo código
      } catch (error) {
        console.error("Erro ao buscar o código:", error);
      }
    };
    fetchCodigo();
  }, [formType]);

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
      const dataToSend = {
        type: formType,
        ...data,
        codigo,
        ...(formType === "cliente"
          ? {
              transp: transportadoraData.razaoSocial, // razãoSocial vai para 'transp'
              tel: transportadoraData.telefone, // telefone vai para 'tel'
            }
          : {}),
      };
      await createRegistration(dataToSend);
      e.target.reset();
      toast({
        title: "Sucesso",
        description: "Cadastro realizado com sucesso",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao realizar cadastro",
        duration: 4000,
      });
      console.error("Error submitting form:", error);
    }
    fetchCodigo();
  };
  const handleTransportadoraChange = (data: {
    razaoSocial: string;
    telefone: string;
  }) => {
    setTransportadoraData((prev) => ({
      ...prev,
      ...data,
    }));
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
          <AnimatePresence mode="wait">
            <motion.div
              key={formType}
              variants={formVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <FormContent
                config={config}
                initialData={initialData}
                clientCod={{ codigo: codigo }}
                onSubmit={handleSubmit} // Passando a função
                onTransportadoraChange={handleTransportadoraChange} // Nova função
              />
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RegistrationForm;
