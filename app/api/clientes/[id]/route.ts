import { NextResponse } from "next/server";
import prisma from "../../database";
import { revalidatePath } from "next/cache";
import { addHours } from "date-fns";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id: params.id },
    });

    if (!cliente) {
      return NextResponse.json(
        { error: "Cliente não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(cliente, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar cliente:", error);
    return NextResponse.json(
      { error: "Erro ao buscar cliente" },
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

    // Verificar se o cliente existe antes de tentar atualizá-lo
    const existingCliente = await prisma.cliente.findUnique({
      where: { id: params.id },
    });

    if (!existingCliente) {
      return NextResponse.json(
        { error: "Cliente não encontrado para atualização" },
        { status: 404 }
      );
    }

    const cliente = await prisma.cliente.update({
      where: { id: params.id },
      data: data,
    });
    revalidatePath("/pdf-filter");

    return NextResponse.json(cliente, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar cliente" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar se o cliente existe antes de tentar excluí-lo
    const existingCliente = await prisma.cliente.findUnique({
      where: { id: params.id },
    });

    if (!existingCliente) {
      return NextResponse.json(
        { error: "Cliente não encontrado para exclusão" },
        { status: 404 }
      );
    }

    await prisma.cliente.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: "Cliente deletado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao deletar cliente:", error);
    return NextResponse.json(
      { error: "Erro ao deletar cliente" },
      { status: 500 }
    );
  }
}
