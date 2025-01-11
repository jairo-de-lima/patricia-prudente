// "use client";
// import React from "react";
// import { Cliente } from '../interfaces/Cliente';
// import { Fornecedor } from '../interfaces/Fornecedor';
// import { Transportadora } from '../interfaces/Transportadora';
// import { Card, CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
// import { format } from "date-fns";

// interface DadosSelecionadosProps {
//   selectedCliente: Cliente | null;
//   selectedFornecedor: Fornecedor | null;
//   selectedTransportadora: Transportadora | null;
// }

// const DadosSelecionados: React.FC<DadosSelecionadosProps> = ({
//   selectedCliente,
//   selectedFornecedor,
//   selectedTransportadora
// }) => {
//   return (
//     <Card className="mb-6 ">
//       <CardHeader>
//         <CardTitle>Dados Selecionados</CardTitle>
//       </CardHeader>

//       <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {selectedFornecedor && (
//           <Card>
//             <CardHeader>
//               <CardTitle>Fornecedor:</CardTitle>
//             </CardHeader>

//             <CardContent>
//               <p>{selectedFornecedor.razaoSocial}</p>
//               <p>Código: {selectedFornecedor.codigo}</p>
//               <p>CNPJ: {selectedFornecedor.cnpj}</p>
//             </CardContent>
//           </Card>
//         )}

//         {selectedCliente && (
//           <Card>
//             <CardHeader>
//               <CardTitle>Cliente:</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p>{selectedCliente.razaoSocial}</p>
//               <p>Código: {selectedCliente.codigo}</p>
//               <p>CNPJ: {selectedCliente.cnpj}</p>
//             </CardContent>
//           </Card>
//         )}
//         {selectedTransportadora && (
//           <Card>
//             <CardHeader>
//               <CardTitle>Transportadora:</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p>{selectedTransportadora.razaoSocial}</p>
//               <p>{selectedTransportadora.NumeroNF}</p>
//               <p>
//                 Data:{" "}
//                 {selectedTransportadora.dataCad
//                   ? format(
//                       new Date(selectedTransportadora.dataCad),
//                       "dd/MM/yyyy"
//                     )
//                   : "Não definida"}
//               </p>
//             </CardContent>
//           </Card>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default DadosSelecionados;
