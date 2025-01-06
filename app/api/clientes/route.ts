import { NextResponse } from "next/server";
import prisma from "../database";

export async function GET() {
  try {
    const clientes = await prisma.cliente.findMany();
    return NextResponse.json(clientes);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching clientes" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const cliente = await prisma.cliente.create({
      data: data,
    });
    return NextResponse.json(cliente);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating cliente" },
      { status: 500 }
    );
  }
}
