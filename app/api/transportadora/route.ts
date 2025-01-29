import { NextRequest, NextResponse } from "next/server";
import prisma from "../database";

export async function GET() {
  try {
    const transportadoras = await prisma.transportadora.findMany({
      orderBy: {
        createdAt: "desc", // Ordena por data de criação (descendente)
      },
    });

    return NextResponse.json(transportadoras, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar transportadoras:", error);
    return NextResponse.json(
      { error: "Erro ao buscar transportadoras" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validação básica dos campos obrigatórios
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

    // Criar a transportadora no banco de dados
    const transportadora = await prisma.transportadora.create({
      data,
    });

    return NextResponse.json(transportadora, { status: 201 });
  } catch (error) {
    console.error("Error creating transportadora:", error);
    return NextResponse.json(
      { error: "Error creating transportadora" },
      { status: 500 }
    );
  }
}
