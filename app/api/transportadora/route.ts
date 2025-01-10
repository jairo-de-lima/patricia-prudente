import { NextRequest, NextResponse } from "next/server";
import prisma from "./../database";

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
      !data.transportadora || // Aqui está o problema, a propriedade 'transportadora' não existe no tipo esperado
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
        codigo: data.codigo,
        transportadora: data.transportadora, // Aqui está o problema, a propriedade 'transportadora' não existe no tipo esperado
        numeroNF: data.NumeroNF,
        descricao: data.descricao || "", // Permite que a descrição seja opcional
        quantidade,
        valorUn,
        valorTotal,
        dataSaida: data.DataSaida ? new Date(data.DataSaida) : null,
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



//Error:
// O literal de objeto pode especificar apenas propriedades conhecidas e 'transportadora' não existe no tipo '(Without<TransportadoraUpdateInput, TransportadoraUncheckedUpdateInput> & TransportadoraUncheckedUpdateInput) | (Without<...> & TransportadoraUpdateInput)'.ts(2353)
// index.d.ts(4375, 5): O tipo esperado vem da propriedade 'data', que é declarada aqui no tipo '{ select?: TransportadoraSelect<DefaultArgs> | null | undefined; include?: TransportadoraInclude<DefaultArgs> | null | undefined; data: (Without<...> & TransportadoraUncheckedUpdateInput) | (Without<...> & TransportadoraUpdateInput); where: TransportadoraWhereUniqueInput; }'
// (property) transportadora: any

//Resolves código abaixo 

// // Importações necessárias do Next.js e Prisma
// import { NextRequest, NextResponse } from "next/server";
// import { Transportadora } from "@/app/filter/_components/types"; // Importa a interface correta
// import prisma from "./../database"; // Importa o Prisma do local correto

// // Função GET para obter todas as transportadoras
// export async function GET() {
//   try {
//     const transportadoras = await prisma.transportadora.findMany({
//       orderBy: {
//         createdAt: "desc", // Ordena por data de criação (descendente)
//       },
//     });

//     // Retorna todas as transportadoras encontradas
//     return NextResponse.json(transportadoras, { status: 200 });
//   } catch (error) {
//     // Captura e retorna erros de busca
//     console.error("Erro ao buscar transportadoras:", error);
//     return NextResponse.json(
//       { error: "Erro ao buscar transportadoras" },
//       { status: 500 }
//     );
//   }
// }

// // Função POST para criar uma nova transportadora
// export async function POST(request: NextRequest) {
//   try {
//     const data = await request.json();

//     // Validação básica dos campos obrigatórios
//     if (
//       !data.codigo ||
//       !data.transportadora || // Propriedade incorreta usada anteriormente
//       !data.NumeroNF ||
//       !data.quantidade ||
//       !data.valor_unitario ||
//       !data.ValorTotal
//     ) {
//       return NextResponse.json(
//         { error: "Campos obrigatórios estão faltando" },
//         { status: 400 }
//       );
//     }

//     // Validação e normalização de campos
//     const quantidade = parseInt(data.quantidade);
//     const valorTotal = parseFloat(data.ValorTotal);
//     const dataSaida = data.DataSaida ? new Date(data.DataSaida) : null;

//     if (isNaN(quantidade) || isNaN(valorTotal)) {
//       return NextResponse.json(
//         { error: "Quantidade e ValorTotal devem ser numéricos" },
//         { status: 400 }
//       );
//     }

//     // Dados para criação da transportadora
//     const transportadoraData: Transportadora = {
//       id: "", // ou defina conforme sua necessidade
//       dataCad: new Date(),
//       codigo: data.codigo,
//       razaoSocial: data.transportadora, // Alterado para 'razaoSocial' na interface correta
//       cnpj: "", // ou defina conforme sua necessidade
//       ie: "", // ou defina conforme sua necessidade
//       endereco: "",
//       endNumero: "",
//       cep: "",
//       cidade: "",
//       estado: "",
//       telefoneFixo: "",
//       celular: "",
//       email: "",
//       emailFina: "",
//       obs: "",
//       NumeroNF: data.NumeroNF,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };

//     // Criação da nova transportadora no Prisma
//     const transportadora = await prisma.transportadora.create({
//       data: transportadoraData,
//     });

//     // Retorna a transportadora criada com sucesso
//     return NextResponse.json(transportadora, { status: 201 });
//   } catch (error: any) {
//     // Captura e retorna erros de criação
//     console.error("Erro ao criar transportadora:", error);
//     return NextResponse.json(
//       { error: error.message || "Erro ao criar transportadora" },
//       { status: 500 }
//     );
//   }
// }