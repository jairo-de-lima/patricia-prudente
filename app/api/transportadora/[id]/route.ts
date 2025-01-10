
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
// import prisma from "../../database"; // Importa o Prisma do local correto

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



//Outro código de exemplo contendo funções pré-definidas 
// Há alguns erros talvez porque não exista ainda as funções para a que foi criada.

// Funções GET, PUT e DELETE:

// Essas funções estão funcionando corretamente, exceto pelo uso da propriedade transportadora que não é reconhecida na interface.

// Problema com a Propriedade transportadora:

// A propriedade transportadora não existe na interface Transportadora. A propriedade correta é razaoSocial.

// Solução:

// Substitua todas as instâncias de data.transportadora por data.razaoSocial.

// Validações e Criação de Dados:

// Certifique-se de que os dados estão sendo validados corretamente e que os campos numéricos estão sendo convertidos apropriadamente.

//Código 

// // Importações necessárias do Next.js e Prisma
// import { NextRequest, NextResponse } from "next/server";
// import prisma from "../../database"; // Certifique-se de que o caminho está correto

// // Função GET para obter uma transportadora específica pelo ID
// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const transportadora = await prisma.transportadora.findUnique({
//       where: {
//         id: params.id, // Busca a transportadora pelo ID
//       },
//     });

//     if (!transportadora) {
//       // Retorna um erro se a transportadora não for encontrada
//       return NextResponse.json(
//         { error: "Transportadora não encontrada" },
//         { status: 404 }
//       );
//     }

//     // Retorna a transportadora encontrada
//     return NextResponse.json(transportadora, { status: 200 });
//   } catch (error) {
//     // Captura e retorna erros de busca
//     console.error("Erro ao buscar transportadora:", error);
//     return NextResponse.json(
//       { error: "Erro ao buscar transportadora" },
//       { status: 500 }
//     );
//   }
// }

// // Função PUT para atualizar uma transportadora pelo ID
// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const data = await request.json();

//     // Validação básica dos campos obrigatórios
//     if (
//       !data.codigo ||
//       !data.razaoSocial || // Alterado de 'transportadora' para 'razaoSocial' para corresponder à interface correta
//       !data.NumeroNF ||
//       !data.quantidade ||
//       !data.valorUn ||
//       !data.ValorTotal
//     ) {
//       return NextResponse.json(
//         { error: "Campos obrigatórios estão faltando" },
//         { status: 400 }
//       );
//     }

//     // Conversão e validação dos campos numéricos
//     const quantidade = parseInt(data.quantidade);
//     const valorTotal = parseFloat(data.ValorTotal);
//     const valorUn = parseFloat(data.valorUn);

//     if (isNaN(quantidade) || isNaN(valorTotal) || isNaN(valorUn)) {
//       return NextResponse.json(
//         { error: "Quantidade, ValorUn e ValorTotal devem ser numéricos" },
//         { status: 400 }
//       );
//     }

//     // Atualização dos dados da transportadora no Prisma
//     const updatedTransportadora = await prisma.transportadora.update({
//       where: {
//         id: params.id, // Atualiza a transportadora pelo ID
//       },
//       data: {
//         codigo: data.codigo,
//         razaoSocial: data.razaoSocial, // Alterado de 'transportadora' para 'razaoSocial'
//         numeroNF: data.NumeroNF,
//         descricao: data.descricao || "", // Permite que a descrição seja opcional
//         quantidade,
//         valorUn,
//         valorTotal,
//         dataSaida: data.DataSaida ? new Date(data.DataSaida) : null,
//       },
//     });

//     // Retorna a transportadora atualizada
//     return NextResponse.json(updatedTransportadora, { status: 200 });
//   } catch (error: any) {
//     // Captura e retorna erros de atualização
//     console.error("Erro ao atualizar transportadora:", error);
//     return NextResponse.json(
//       { error: error.message || "Erro ao atualizar transportadora" },
//       { status: 500 }
//     );
//   }
// }

// // Função DELETE para excluir uma transportadora pelo ID
// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const transportadora = await prisma.transportadora.findUnique({
//       where: {
//         id: params.id, // Busca a transportadora pelo ID para ver se existe
//       },
//     });

//     if (!transportadora) {
//       // Retorna um erro se a transportadora não for encontrada
//       return NextResponse.json(
//         { error: "Transportadora não encontrada" },
//         { status: 404 }
//       );
//     }

//     // Exclui a transportadora encontrada
//     await prisma.transportadora.delete({
//       where: {
//         id: params.id, // Exclui a transportadora pelo ID
//       },
//     });

//     // Retorna uma mensagem de sucesso
//     return NextResponse.json(
//       { message: "Transportadora deletada com sucesso" },
//       { status: 200 }
//     );
//   } catch (error) {
//     // Captura e retorna erros de exclusão
//     console.error("Erro ao deletar transportadora:", error);
//     return NextResponse.json(
//       { error: "Erro ao deletar transportadora" },
//       { status: 500 }
//     );
//   }
// }

 // Alterações feitas:
 // - Corrigido o nome da propriedade de 'transportadora' para 'razaoSocial' nas validações e nos dados enviados ao Prisma.
 // - Assegurada a validação de campos obrigatórios, incluindo a conversão de campos numéricos para evitar erros de tipo.
 // - Mantidos os campos opcionais como 'descricao' com um valor padrão vazio se não fornecido.
 // - Adicionados comentários explicativos para documentar o fluxo de execução do código.

