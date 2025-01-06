import { NextResponse } from "next/server";
import prisma from "../../database";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id: params.id },
    });
    return NextResponse.json(cliente);
  } catch (error) {
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
    const cliente = await prisma.cliente.update({
      where: { id: params.id },
      data: data,
    });
    return NextResponse.json(cliente);
  } catch (error) {
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
    await prisma.cliente.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "Cliente deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting cliente" },
      { status: 500 }
    );
  }
}
