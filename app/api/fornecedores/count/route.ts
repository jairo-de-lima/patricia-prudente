import { NextResponse } from "next/server";
import prisma from "../../database";

export async function GET() {
  try {
    const totalFornecedor = await prisma.fornecedor.count();
    return NextResponse.json(totalFornecedor, { status: 200 });
  } catch (error) {
    console.error("Erro ao contar os transportadoras:", error);
    return NextResponse.json(
      { error: "Erro ao contar os transportadoras" },
      { status: 500 }
    );
  }
}
