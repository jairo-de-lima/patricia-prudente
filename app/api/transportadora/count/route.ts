import { NextResponse } from "next/server";
import prisma from "../../database";

export async function GET() {
  try {
    const totalTransportadora = await prisma.transportadora.count();
    return NextResponse.json(totalTransportadora, { status: 200 });
  } catch (error) {
    console.error("Erro ao contar os transportadoras:", error);
    return NextResponse.json(
      { error: "Erro ao contar os transportadoras" },
      { status: 500 }
    );
  }
}
