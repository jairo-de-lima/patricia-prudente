"use server";

import prisma from "../api/database";
import { revalidatePath } from "next/cache";

function validateTransportadoraData(data: any) {
  const errors: string[] = [];

  const requiredFields = ["codigo", "transportadora", "NumeroNF"];

  requiredFields.forEach((field) => {
    if (!data[field] || String(data[field]).trim() === "") {
      errors.push(`O campo ${field} é obrigatório`);
    }
  });

  return errors;
}

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
    switch (data.type) {
      case "cliente":
        await prisma.cliente.create({
          data: {
            codigo: data.codigo,
            cliente: data.cliente,
            cnpj: data.cnpj,
            endereco: data.end,
            telefoneFixo: data.telFixo || null,
            email: data.email,
            suframa: data.suframa || null,
            transportadora: data.transportadora || null,
            inscEstad: data.ie,
            cep: data.cep,
            celular: data.cel,
            emailFin: data.emailFinan,
          },
        });
        break;

      case "fornecedor":
        const validationErrors = validateFornecedorData(data);
        if (validationErrors.length > 0) {
          throw new Error(validationErrors.join("\n"));
        }

        await prisma.fornecedor.create({
          data: {
            codigo: data.codigo,
            fornecedor: data.fornecedor,
            cnpj: data.cnpj,
            endereco: data.endereco,
            telefoneFixo: data.telefoneFixo || null,
            emailPedido: data.emailPedido || null,
            inscEstad: data.ie,
            cep: data.cep,
            celular: data.celular,
            emailFin: data.emailFin,
            comissao: data.comissao ? parseFloat(data.comissao) : null,
            dataRecebimento: data.dataRecebimento
              ? new Date(data.dataRecebimento)
              : null,
          },
        });
        break;

      case "transportadora":
        const transportadoraErrors = validateTransportadoraData(data);
        if (transportadoraErrors.length > 0) {
          throw new Error(transportadoraErrors.join("\n"));
        }

        await prisma.transportadora.create({
          data: {
            codigo: data.codigo,
            transportadora: data.transportadora,
            numeroNF: data.NumeroNF,
            descricao: data.descricao || null,
            quantidade: data.quantidade ? parseInt(data.quantidade) : 0,
            valorUn: data.ValorUn ? parseFloat(data.ValorUn) : 0,
            valorTotal: data.ValorTotal ? parseFloat(data.ValorTotal) : 0,
            dataSaida: data.DataSaida ? new Date(data.DataSaida) : null,
          },
        });
        break;

      default:
        throw new Error("Tipo de registro inválido");
    }

    revalidatePath("/");
  } catch (error: any) {
    console.error("Error creating registration:", error);
    throw new Error(error.message || "Falha ao criar registro");
  }
}
