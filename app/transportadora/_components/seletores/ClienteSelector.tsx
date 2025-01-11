// "use client";
// import React from "react";
// import { Cliente } from '../interfaces/Cliente';
// import { Card, CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";

// interface ClienteSelectorProps {
//   clientes: Cliente[];
//   selectedCliente: Cliente | null;
//   setSelectedCliente: React.Dispatch<React.SetStateAction<Cliente | null>>;
// }

// const ClienteSelector: React.FC<ClienteSelectorProps> = ({
//   clientes,
//   selectedCliente,
//   setSelectedCliente
// }) => {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Cliente</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <select
//           className="w-full p-2 border rounded-md"
//           value={selectedCliente?.razaoSocial || ""}
//           onChange={(e) =>
//             setSelectedCliente(
//               clientes.find((c) => c.id === e.target.value) || null
//             )
//           }
//         >
//           <option value="">Selecione um cliente</option>
//           {clientes.map((cliente) => (
//             <option key={cliente.id} value={cliente.id}>
//               {cliente.razaoSocial} - {cliente.codigo}
//             </option>
//           ))}
//         </select>
//       </CardContent>
//     </Card>
//   );
// };

// export default ClienteSelector;
