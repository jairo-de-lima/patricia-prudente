import { NextResponse } from "next/server";
import prisma from "../../database";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const fornecedor = await prisma.fornecedor.findUnique({
      where: { id: params.id },
    });

    if (!fornecedor) {
      return NextResponse.json(
        { error: "Fornecedor não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(fornecedor, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar fornecedor:", error);
    return NextResponse.json(
      { error: "Erro ao buscar fornecedor" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();

    // Validar se os campos obrigatórios estão presentes
    if (!data.comissao || !data.dataRecebimento) {
      return NextResponse.json(
        { error: "Campos obrigatórios estão faltando" },
        { status: 400 }
      );
    }

    // Validar tipos de dados
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

    const fornecedor = await prisma.fornecedor.update({
      where: { id: params.id },
      data: {
        ...data,
        comissao,
        dataRecebimento,
      },
    });

    return NextResponse.json(fornecedor, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar fornecedor:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar fornecedor" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const fornecedor = await prisma.fornecedor.findUnique({
      where: { id: params.id },
    });

    if (!fornecedor) {
      return NextResponse.json(
        { error: "Fornecedor não encontrado" },
        { status: 404 }
      );
    }

    await prisma.fornecedor.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: "Fornecedor deletado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao deletar fornecedor:", error);
    return NextResponse.json(
      { error: "Erro ao deletar fornecedor" },
      { status: 500 }
    );
  }
}