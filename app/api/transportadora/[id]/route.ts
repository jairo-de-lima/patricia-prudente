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

    return NextResponse.json(transportadora, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar transportadora:", error);
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

    // Validação básica
    if (
      !data.codigo ||
      !data.transportadora ||
      !data.NumeroNF ||
      !data.quantidade ||
      !data.valorUn ||
      !data.ValorTotal
    ) {
      return NextResponse.json(
        { error: "Campos obrigatórios estão faltando" },
        { status: 400 }
      );
    }

    const quantidade = parseInt(data.quantidade);
    const valorTotal = parseFloat(data.ValorTotal);
    const valorUn = parseFloat(data.valorUn);

    if (isNaN(quantidade) || isNaN(valorTotal) || isNaN(valorUn)) {
      return NextResponse.json(
        { error: "Quantidade, ValorUn e ValorTotal devem ser numéricos" },
        { status: 400 }
      );
    }

    const updatedTransportadora = await prisma.transportadora.update({
      where: {
        id: params.id,
      },
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

    return NextResponse.json(updatedTransportadora, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao atualizar transportadora:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao atualizar transportadora" },
      { status: 500 }
    );
  }
}

export async function DELETE(
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

    await prisma.transportadora.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(
      { message: "Transportadora deletada com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao deletar transportadora:", error);
    return NextResponse.json(
      { error: "Erro ao deletar transportadora" },
      { status: 500 }
    );
  }
}
