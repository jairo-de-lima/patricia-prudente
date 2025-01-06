import { NextResponse } from "next/server";
import prisma from "../database";

export async function GET() {
  try {
    const fornecedores = await prisma.fornecedor.findMany();
    return NextResponse.json(fornecedores);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching fornecedores" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Convert comissao to float and dataRecebimento to Date
    const fornecedor = await prisma.fornecedor.create({
      data: {
        ...data,
        comissao: parseFloat(data.comissao),
        dataRecebimento: new Date(data.dataRecebimento),
      },
    });
    return NextResponse.json(fornecedor);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating fornecedor" },
      { status: 500 }
    );
  }
}
