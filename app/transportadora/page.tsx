import Footer from "../_components/Footer";
import Navbar from "../_components/Navbar";
import TransportadoraExport from "./_components/carrier";
import CarrierPage from "./_components/carrier";

// array de fornecedores para depuracao
const fornecedores = [
  {
    nome: "Fornecedor A",
    cnpj: "12.345.678/0001-99",
    endereco: "Rua dos Fornecedores, 123",
    telefone: "11 98765-4321",
    email: "fornecedorA@email.com",
  },
  {
    nome: "Fornecedor B",
    cnpj: "98.765.432/0001-10",
    endereco: "Avenida dos Fornecedores, 456",
    telefone: "11 91234-5678",
    email: "fornecedorB@email.com",
  },
];

// Array de clientes para depuracao
const clientes = [
  {
    nome: "Cliente X",
    cnpj: "23.456.789/0001-11",
    endereco: "Rua dos Clientes, 789",
    telefone: "21 99876-5432",
    email: "clienteX@email.com",
  },
  {
    nome: "Cliente Y",
    cnpj: "87.654.321/0001-22",
    endereco: "Avenida dos Clientes, 321",
    telefone: "21 93456-7890",
    email: "clienteY@email.com",
  },
];
// Dados de transportadora (exemplo)
const transportadora = {
  nome: "Transportadora Z",
  codigo: "TRANS123",
  nf: "NF-456789",
  dataSaida: "2025-01-05",
  descricao: "Transporte de mercadorias",
  quantidade: 10,
  unitario: 50,
  valorTotal: 500,
};

const Carrier = () => {
  return (
    <div>
      <Navbar />
      <TransportadoraExport />
      <Footer />
    </div>
  );
};

export default Carrier;
