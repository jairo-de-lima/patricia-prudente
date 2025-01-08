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
    if (!data.nome || !data.comissao || !data.dataRecebimento) {
      return NextResponse.json(
        { error: "Campos obrigatórios estão faltando" },
        { status: 400 }
      );
    }

    // Garantir que comissao seja um número e dataRecebimento uma data válida
    const comissao = parseFloat(data.comissao);
    const dataRecebimento = new Date(data.dataRecebimento);

    if (isNaN(comissao) || isNaN(dataRecebimento.getTime())) {
      return NextResponse.json(
        {
          error:
            "Dados inválidos: comissao deve ser numérica e dataRecebimento deve ser uma data válida",
        },
        { status: 400 }
      );
    }

    // Criar o fornecedor no banco de dados
    const fornecedor = await prisma.fornecedor.create({
      data: {
        ...data,
        comissao,
        dataRecebimento,
      },
    });

    return NextResponse.json(fornecedor, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar fornecedor:", error);
    return NextResponse.json(
      { error: "Erro ao criar fornecedor" },
      { status: 500 }
    );
  }
}
