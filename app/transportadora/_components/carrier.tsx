// "use client";
// import React, { useState, useEffect } from "react";
// import { Cliente } from './interfaces/Cliente';
// import { Fornecedor } from './interfaces/Fornecedor';
// import { Transportadora } from './interfaces/Transportadora';
// import FornecedorSelector from "./seletores/FornecedorSelector";
// import ClienteSelector from "./seletores/ClienteSelector";
// import TransportadoraSelector from "./seletores/TransportadoraSelector";
// import DadosSelecionados from "./seletores/DadosSelecionados";
//  // Importa componentes dos botões
// import PreviewButton from "./botoesDeExportaçãoDoc/PreviewButton";
// import ExportPDFButton from "./botoesDeExportaçãoDoc/ExportPDFButton";
// import ExportXLSXButton from "./botoesDeExportaçãoDoc/ExportXLSXButton";

// const TransportadoraExport: React.FC = () => {
//   const [clientes, setClientes] = useState<Cliente[]>([]);
//   const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
//   const [transportadoras, setTransportadoras] = useState<Transportadora[]>([]);

//   const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
//   const [selectedFornecedor, setSelectedFornecedor] =
//     useState<Fornecedor | null>(null);
//   const [selectedTransportadora, setSelectedTransportadora] =
//     useState<Transportadora | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [clientesRes, fornecedoresRes, transportadorasRes] =
//           await Promise.all([
//             fetch("/api/clientes"),
//             fetch("/api/fornecedores"),
//             fetch("/api/transportadora"),
//           ]);

//         const clientesData = await clientesRes.json();
//         const fornecedoresData = await fornecedoresRes.json();
//         const transportadorasData = await transportadorasRes.json();

//         setClientes(clientesData);
//         setFornecedores(fornecedoresData);
//         setTransportadoras(transportadorasData);
//       } catch (error) {
//         console.error("Erro ao buscar dados:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="p-6 min-h-screen">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         <FornecedorSelector 
//           fornecedores={fornecedores} 
//           selectedFornecedor={selectedFornecedor} 
//           setSelectedFornecedor={setSelectedFornecedor} 
//         />
//         <ClienteSelector 
//           clientes={clientes} 
//           selectedCliente={selectedCliente} 
//           setSelectedCliente={setSelectedCliente} 
//         />
//         <TransportadoraSelector 
//           transportadoras={transportadoras} 
//           selectedTransportadora={selectedTransportadora} 
//           setSelectedTransportadora={setSelectedTransportadora} 
//         />
//       </div>

//       {/* Área de Visualização dos Dados Selecionados */}
//       <DadosSelecionados
//         selectedCliente={selectedCliente}
//         selectedFornecedor={selectedFornecedor}
//         selectedTransportadora={selectedTransportadora}
//       />

//       {/* Botões de Exportação */}
//       <div className="flex gap-4 justify-end">
//         <PreviewButton 
//           selectedCliente={selectedCliente}
//           selectedFornecedor={selectedFornecedor}
//           selectedTransportadora={selectedTransportadora}
//         />
//         <ExportPDFButton 
//           selectedCliente={selectedCliente}
//           selectedFornecedor={selectedFornecedor}
//           selectedTransportadora={selectedTransportadora}
//         />
//       </div>
//       <ExportXLSXButton 
//         selectedCliente={selectedCliente}
//         selectedFornecedor={selectedFornecedor}
//         selectedTransportadora={selectedTransportadora}
//       />
//     </div>
//   );
// };

// export default TransportadoraExport;
