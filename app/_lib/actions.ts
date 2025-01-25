"use server";

import prisma from "../api/database";
import { revalidatePath } from "next/cache";

// Validação de dados para Transportadora
function validateTransportadoraData(data: any) {
  const errors: string[] = [];
  const requiredFields = ["cnpj", "razaoSocial", "ie"];

  requiredFields.forEach((field) => {
    if (!data[field] || String(data[field]).trim() === "") {
      errors.push(`O campo ${field} é obrigatório`);
    }
  });

  return errors;
}

// Validação de dados para Fornecedor
function validateFornecedorData(data: any) {
  const errors: string[] = [];
  const requiredFields = [
    "razaoSocial",
    "cnpj",
    "endereco",
    "ie",
    "cep",
    "emailFin",
  ];

  requiredFields.forEach((field) => {
    if (!data[field] || String(data[field]).trim() === "") {
      errors.push(`O campo ${field} é obrigatório`);
    }
  });

  if (data.comissao && isNaN(parseFloat(data.comissao))) {
    errors.push("O campo comissão deve ser um número válido");
  }

  if (data.dataRecebimento && isNaN(Date.parse(data.dataRecebimento))) {
    errors.push("A data de recebimento deve ser uma data válida");
  }

  return errors;
}

// Validação de dados para Cliente
function validateClienteData(data: any) {
  const errors: string[] = [];
  const requiredFields = [
    "razaoSocial",
    "cnpj",
    "ie",
    "endereco",
    "endNumero",
    "cep",
    "cidade",
    "estado",
    "emailFin",
  ];

  requiredFields.forEach((field) => {
    if (!data[field] || String(data[field]).trim() === "") {
      errors.push(`O campo ${field} é obrigatório`);
    }
  });

  return errors;
}

// Função principal
export async function createRegistration(data: any) {
  try {
    switch (data.type) {
      case "cliente": {
        const validationErrors = validateClienteData(data);
        if (validationErrors.length > 0) {
          throw new Error(validationErrors.join("\n"));
        }

        await prisma.cliente.create({
          data: {
            dataCad: data.dataCad ? new Date(data.dataCad) : new Date(), // Garantir que dataCad seja um Date
            codigo: data.codigo,
            razaoSocial: data.razaoSocial,
            cnpj: data.cnpj,
            ie: data.ie,
            endereco: data.endereco,
            endNumero: data.endNumero,
            cep: data.cep,
            cidade: data.cidade,
            estado: data.estado,
            bairro: data.bairro || null,
            telefoneFixo: data.telefoneFixo || null,
            celular: data.celular || null,
            email: data.email || null,
            emailFin: data.emailFin,
            suframa: data.suframa || null,
            transp: data.transp || null,
            NumeroNF: data.NumeroNF || null,
          },
        });
        break;
      }

      case "fornecedor": {
        const validationErrors = validateFornecedorData(data);
        if (validationErrors.length > 0) {
          throw new Error(validationErrors.join("\n"));
        }

        await prisma.fornecedor.create({
          data: {
            dataCad: data.dataCad ? new Date(data.dataCad) : new Date(), // Garantir que dataCad seja um Date
            codigo: data.codigo || null,
            razaoSocial: data.razaoSocial,
            cnpj: data.cnpj,
            ie: data.ie,
            endereco: data.endereco,
            endNumero: data.endNumero,
            cep: data.cep,
            cidade: data.cidade || null,
            estado: data.estado || null,
            bairro: data.bairro || null,
            telefoneFixo: data.telefoneFixo || null,
            celular: data.celular || null,
            emailPedido: data.emailPedido || null,
            emailFin: data.emailFin,
            comissao: data.comissao ? String(parseFloat(data.comissao)) : null,
            dataRecebimento: data.dataRecebimento
              ? new Date(data.dataRecebimento)
              : null,
            obs: data.obs || null,
            NumeroNF: data.NumeroNF || null,
          },
        });
        break;
      }

      case "transportadora": {
        const validationErrors = validateTransportadoraData(data);
        if (validationErrors.length > 0) {
          throw new Error(validationErrors.join("\n"));
        }

        await prisma.transportadora.create({
          data: {
            dataCad: data.dataCad ? new Date(data.dataCad) : new Date(),
            codigo: data.codigo || null,
            razaoSocial: data.razaoSocial,
            cnpj: data.cnpj,
            ie: data.ie,
            endereco: data.endereco || null,
            endNumero: data.endNumero || null,
            cep: data.cep || null,
            cidade: data.cidade || null,
            estado: data.estado || null,
            bairro: data.bairro || null,
            telefoneFixo: data.telefoneFixo || null,
            celular: data.celular || null,
            email: data.email || null,
            emailFina: data.emailFina || null,
            obs: data.obs || null,
            NumeroNF: data.NumeroNF || null,
            clienteId: data.clienteId || null,
            fornecedorId: data.fornecedorId || null,
          },
        });
        break;
      }

      default:
        throw new Error("Tipo de registro inválido");
    }

    revalidatePath("/");
  } catch (error: any) {
    console.error("Error creating registration:", error);
    throw new Error(error.message || "Falha ao criar registro");
  }
}
