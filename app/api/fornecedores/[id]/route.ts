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
    return NextResponse.json(fornecedor);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching fornecedor" },
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
    const fornecedor = await prisma.fornecedor.update({
      where: { id: params.id },
      data: {
        ...data,
        comissao: parseFloat(data.comissao),
        dataRecebimento: new Date(data.dataRecebimento),
      },
    });
    return NextResponse.json(fornecedor);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating fornecedor" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.fornecedor.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "Fornecedor deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting fornecedor" },
      { status: 500 }
    );
  }
}
