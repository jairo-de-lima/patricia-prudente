import { NextRequest, NextResponse } from "next/server";
import prisma from "../database";

export async function GET() {
  try {
    const transportadoras = await prisma.transportadora.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(transportadoras);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar transportadoras" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const transportadora = await prisma.transportadora.create({
      data: {
        codigo: data.codigo,
        transportadora: data.transportadora,
        numeroNF: data.NumeroNF,
        descricao: data.descricao,
        quantidade: parseInt(data.quantidade),
        valorUn: data.valor_unitario,
        valorTotal: parseFloat(data.ValorTotal),
        dataSaida: data.DataSaida ? new Date(data.DataSaida) : null,
      },
    });
    return NextResponse.json(transportadora);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Erro ao criar transportadora" },
      { status: 500 }
    );
  }
}
