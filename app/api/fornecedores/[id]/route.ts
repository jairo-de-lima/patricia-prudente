import { NextResponse } from "next/server";
import prisma from "../../database";
import { addHours } from "date-fns";
import { revalidatePath } from "next/cache";

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
    if (data.dataCad) {
      data.dataCad = addHours(new Date(data.dataCad), 3); // Converte UTC para GMT-3
    }
    if (data.dataRecebimento) {
      data.dataRecebimento = addHours(new Date(data.dataRecebimento), 3); // Converte UTC para GMT-3
    }

    // Verificar se o fornecedor existe antes de tentar atualizá-lo
    const existingFornecedor = await prisma.fornecedor.findUnique({
      where: { id: params.id },
    });

    if (!existingFornecedor) {
      return NextResponse.json(
        { error: "Fornecedor não encontrado para atualização" },
        { status: 404 }
      );
    }

    const fornecedor = await prisma.fornecedor.update({
      where: { id: params.id },
      data: data,
    });
    revalidatePath("/pdf-filter");

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
