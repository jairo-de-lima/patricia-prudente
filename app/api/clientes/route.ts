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

    // Adicionar o campo código ao objeto data

    // Criar o cliente no banco de dados
    const cliente = await prisma.cliente.create({
      data,
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
