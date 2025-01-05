"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";

// Configurações para diferentes tipos de formulários
const formConfigs = {
  cliente: {
    title: "Cadastro de Clientes",
    codLabel: "Cod. Cliente",
    fields: {
      leftColumn: [
        { id: "cliente", label: "Cliente", type: "text" },
        { id: "cnpj", label: "CNPJ", type: "text" },
        { id: "end", label: "End", type: "text" },
        { id: "telFixo", label: "Tel Fixo", type: "text" },
        { id: "email", label: "Email", type: "email" },
        { id: "suframa", label: "Suframa", type: "text" },
        { id: "transportadora", label: "Transportadora", type: "text" },
      ],
      rightColumn: [
        { id: "ie", label: "I.E.", type: "text" },
        { id: "cep", label: "CEP", type: "text" },
        { id: "cel", label: "Cel", type: "text" },
        { id: "emailFinan", label: "Email Final", type: "email" },
      ],
    },
  },
  fornecedor: {
    title: "Cadastro de Fornecedores",
    codLabel: "Cod. Fornecedor",
    fields: {
      leftColumn: [
        { id: "fornecedor", label: "Fornecedor", type: "text" },
        { id: "cnpj", label: "CNPJ", type: "text" },
        { id: "endereco", label: "Endereço", type: "text" },
        { id: "telFixo", label: "Tel Fixo", type: "text" },
        { id: "emailPedido", label: "Email Pedido", type: "email" },
      ],
      rightColumn: [
        { id: "ie", label: "I.E.", type: "text" },
        { id: "cep", label: "CEP", type: "text" },
        { id: "celular", label: "Celular", type: "text" },
        { id: "comissao", label: "Comissão", type: "number" },
        { id: "dataRecebimento", label: "Data de Recebimento", type: "date" },
      ],
    },
  },
};

const RegistrationForm = ({ onSubmit, initialData = {} }) => {
  const [formType, setFormType] = useState("cliente");
  const config = formConfigs[formType];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    onSubmit({ type: formType, ...data });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-6xl">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">P/P logo</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-[200px]">
                    <Select value={formType} onValueChange={setFormType}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o tipo de cadastro" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cliente">
                          Cadastro de Cliente
                        </SelectItem>
                        <SelectItem value="fornecedor">
                          Cadastro de Fornecedor
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Selecione o tipo de cadastro</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <CardTitle className="text-center text-2xl font-bold">
            Ass: Patrícia Prudente
          </CardTitle>
          <div className="text-center text-lg text-gray-600">
            Representante Comercial
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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
              {/* Coluna Esquerda */}
              <div className="space-y-4">
                {config.fields.leftColumn.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label htmlFor={field.id}>{field.label}:</Label>
                    <Input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      defaultValue={initialData[field.id] || ""}
                    />
                  </div>
                ))}
              </div>

              {/* Coluna Direita */}
              <div className="space-y-4">
                {config.fields.rightColumn.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label htmlFor={field.id}>{field.label}:</Label>
                    <Input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      defaultValue={initialData[field.id] || ""}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <Button variant="outline" type="button">
                Cancelar
              </Button>
              <Button type="submit">Enviar</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationForm;
