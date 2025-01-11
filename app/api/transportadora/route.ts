import { NextRequest, NextResponse } from "next/server";
import prisma from "../database";

export async function GET() {
  try {
    const transportadoras = await prisma.transportadora.findMany({
      orderBy: {
        createdAt: "desc", // Ordena por data de criação (descendente)
      },
    });

    return NextResponse.json(transportadoras, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar transportadoras:", error);
    return NextResponse.json(
      { error: "Erro ao buscar transportadoras" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validação básica dos campos obrigatórios
    if (
      !data.codigo ||
      !data.transportadora ||
      !data.NumeroNF ||
      !data.quantidade ||
      !data.valor_unitario ||
      !data.ValorTotal
    ) {
      return NextResponse.json(
        { error: "Campos obrigatórios estão faltando" },
        { status: 400 }
      );
    }

    // Validação e normalização de campos
    const quantidade = parseInt(data.quantidade);
    const valorTotal = parseFloat(data.ValorTotal);
    const dataSaida = data.DataSaida ? new Date(data.DataSaida) : null;

    if (isNaN(quantidade) || isNaN(valorTotal)) {
      return NextResponse.json(
        { error: "Quantidade e ValorTotal devem ser numéricos" },
        { status: 400 }
      );
    }

    const transportadora = await prisma.transportadora.create({
      data: {
        dataCad: new Date(data.dataCad),
        ie: data.ie,
        razaoSocial: data.razaoSocial,
        cnpj: data.cnpj,
        endereco: data.endereco || null,
        cidade: data.cidade || null,
        endNumero: data.endNumero || null,
        cep: data.cep || null,
        estado: data.cidade || null,
        telefoneFixo: data.telefoneFixo || null,
        celular: data.celular || null,
        email: data.email || null,
        emailFina: data.emailFina || null,
        obs: data.obs || null,
        NumeroNF: data.NumeroNF || null,
      },
    });

    return NextResponse.json(transportadora, { status: 201 }); // Retorna 201 para criação bem-sucedida
  } catch (error: any) {
    console.error("Erro ao criar transportadora:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao criar transportadora" },
      { status: 500 }
    );
  }
}
