import { NextResponse } from "next/server";
import prisma from "../database";

// Função GET para listar todos os clientes
export async function GET() {
  try {
    const clientes = await prisma.cliente.findMany();
    return NextResponse.json(clientes, { status: 200 });
  } catch (error) {
    console.error("Error fetching clientes:", error);
    return NextResponse.json(
      { error: "Error fetching clientes" },
      { status: 500 }
    );
  }
}

// Função POST para criar um cliente
export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validação básica para verificar se os campos obrigatórios estão presentes
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

    const missingFields = requiredFields.filter(
      (field) => !data[field] || String(data[field]).trim() === ""
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: `Os campos obrigatórios estão faltando: ${missingFields.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    // Contar quantos clientes já estão cadastrados
    const totalClientes = await prisma.cliente.count();

    // Adicionar o campo código automaticamente (incrementando em 1)
    const codigo = (totalClientes + 1).toString();

    // Adicionar o campo código ao objeto data
    const clienteData = {
      ...data,
      codigo,
    };

    // Criar o cliente no banco de dados
    const cliente = await prisma.cliente.create({
      data: clienteData,
    });

    return NextResponse.json(cliente, { status: 201 });
  } catch (error) {
    console.error("Error creating cliente:", error);
    return NextResponse.json(
      { error: "Error creating cliente" },
      { status: 500 }
    );
  }
}
