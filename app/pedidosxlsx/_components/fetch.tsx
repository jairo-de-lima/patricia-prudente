// import { useState, useEffect } from "react";
// import { Cliente, Fornecedor, Transportadora } from "@/app/types";
// import OrderXLSXGenerator from "./OrderXLSXGenerator";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/app/_components/ui/card";

// export default function NovoPedido() {
//   const [clientes, setClientes] = useState<Cliente[]>([]);
//   const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
//   const [transportadoras, setTransportadoras] = useState<Transportadora[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function loadData() {
//       try {
//         setLoading(true);

//         // Busca todos os dados necessários em paralelo
//         const [clientesRes, fornecedoresRes, transportadorasRes] =
//           await Promise.all([
//             fetch("/api/clientes"),
//             fetch("/api/fornecedores"),
//             fetch("/api/transportadora"),
//           ]);

//         // Verifica se todas as requisições foram bem-sucedidas
//         if (!clientesRes.ok || !fornecedoresRes.ok || !transportadorasRes.ok) {
//           throw new Error("Erro ao carregar dados");
//         }

//         // Converte as respostas para JSON em paralelo
//         const [clientesData, fornecedoresData, transportadorasData] =
//           await Promise.all([
//             clientesRes.json(),
//             fornecedoresRes.json(),
//             transportadorasRes.json(),
//           ]);

//         // Ordena os dados por razão social
//         const sortByRazaoSocial = (a: any, b: any) =>
//           a.razaoSocial.localeCompare(b.razaoSocial);

//         setClientes(clientesData.sort(sortByRazaoSocial));
//         setFornecedores(fornecedoresData.sort(sortByRazaoSocial));
//         setTransportadoras(transportadorasData.sort(sortByRazaoSocial));

//         setError(null);
//       } catch (err) {
//         console.error("Erro ao carregar dados:", err);
//         setError("Erro ao carregar dados. Por favor, tente novamente.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[200px]">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 bg-red-50 border border-red-200 rounded-md">
//         <p className="text-red-600">{error}</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="mt-2 text-sm text-red-600 hover:text-red-800"
//         >
//           Tentar novamente
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-w-screen  min-h-screen flex justify-center items-center">
//       <Card className="w-[90%] md:w-[60%]">
//         <CardHeader>
//           <CardTitle>Gerar Pedido Excel</CardTitle>{" "}
//         </CardHeader>
//         <CardContent>
//           <OrderXLSXGenerator
//             clientes={clientes}
//             fornecedores={fornecedores}
//             transportadoras={transportadoras}
//             onGenerateXLSX={() => {
//               console.log("Excel gerado com sucesso!");
//             }}
//           />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }