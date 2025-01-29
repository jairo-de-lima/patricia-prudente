import { NextResponse } from "next/server";
import prisma from "../database";

export async function GET() {
  try {
    const fornecedores = await prisma.fornecedor.findMany();
    return NextResponse.json(fornecedores, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar fornecedores:", error);
    return NextResponse.json(
      { error: "Erro ao buscar fornecedores" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validar se os campos obrigatórios estão presentes
    const requiredFields = ["razaoSocial", "cnpj", "ie"];

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

    // Criar o fornecedor no banco de dados
    const fornecedor = await prisma.fornecedor.create({
      data,
    });

    return NextResponse.json(fornecedor, { status: 201 });
  } catch (error) {
    console.error("Error creating fornecedor:", error);
    return NextResponse.json(
      { error: "Error creating fornecedor" },
      { status: 500 }
    );
  }
}
