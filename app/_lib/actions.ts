"use server";

import prisma from "../api/database";
import { revalidatePath } from "next/cache";

function validateFornecedorData(data: any) {
  const errors = [];

  // Lista de campos obrigatórios
  const requiredFields = [
    "codigo",
    "fornecedor",
    "cnpj",
    "endereco",
    "ie",
    "cep",
    "celular",
    "emailFin",
  ];

  // Verifica campos vazios
  requiredFields.forEach((field) => {
    if (!data[field] || data[field].trim() === "") {
      errors.push(`O campo ${field} é obrigatório`);
    }
  });

  // Validações específicas
  if (
    data.comissao !== undefined &&
    data.comissao !== "" &&
    isNaN(parseFloat(data.comissao))
  ) {
    errors.push("O campo comissão deve ser um número válido");
  }

  if (
    data.dataRecebimento !== undefined &&
    data.dataRecebimento !== "" &&
    isNaN(Date.parse(data.dataRecebimento))
  ) {
    errors.push("A data de recebimento deve ser uma data válida");
  }

  return errors;
}

export async function createRegistration(data: any) {
  try {
    if (data.type === "cliente") {
      await prisma.cliente.create({
        data: {
          codigo: data.codigo,
          cliente: data.cliente,
          cnpj: data.cnpj,
          endereco: data.end,
          telefoneFixo: data.telFixo,
          email: data.email,
          suframa: data.suframa,
          transportadora: data.transportadora,
          inscEstad: data.ie,
          cep: data.cep,
          celular: data.cel,
          emailFin: data.emailFinan,
        },
      });
    } else {
      // Valida os dados antes de prosseguir
      const validationErrors = validateFornecedorData(data);

      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join("\n"));
      }

      const fornecedorData = {
        codigo: data.codigo,
        fornecedor: data.fornecedor,
        cnpj: data.cnpj,
        endereco: data.endereco,
        telefoneFixo: data.telefoneFixo,
        emailPedido: data.emailPedido,
        inscEstad: data.ie,
        cep: data.cep,
        celular: data.celular,
        emailFin: data.emailFin,
        comissao: parseFloat(data.comissao || "0"),
        dataRecebimento: new Date(data.dataRecebimento || null),
      };

      await prisma.fornecedor.create({
        data: fornecedorData,
      });
    }
    revalidatePath("/");
  } catch (error: any) {
    console.error("Error creating registration:", error);
    throw new Error(error.message || "Falha ao criar registro");
  }
}
