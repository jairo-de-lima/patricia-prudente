import { NextRequest, NextResponse } from "next/server";
import prisma from "../../database";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const transportadora = await prisma.transportadora.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!transportadora) {
      return NextResponse.json(
        { error: "Transportadora não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(transportadora);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar transportadora" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const transportadora = await prisma.transportadora.update({
      where: {
        id: params.id,
      },
      data: {
        codigo: data.codigo,
        transportadora: data.transportadora,
        numeroNF: data.NumeroNF,
        descricao: data.descricao,
        quantidade: parseInt(data.quantidade),
        valorUn: data.ValorUn,
        valorTotal: parseFloat(data.ValorTotal),
        dataSaida: data.DataSaida ? new Date(data.DataSaida) : null,
      },
    });
    return NextResponse.json(transportadora);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar transportadora" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.transportadora.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({
      message: "Transportadora deletada com sucesso",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar transportadora" },
      { status: 500 }
    );
  }
}
