import { NextResponse } from "next/server";
import prisma from "../../database";

export async function GET() {
  try {
    const totalClientes = await prisma.cliente.count();
    return NextResponse.json(totalClientes, { status: 200 });
  } catch (error) {
    console.error("Erro ao contar os clientes:", error);
    return NextResponse.json(
      { error: "Erro ao contar os clientes" },
      { status: 500 }
    );
  }
}
